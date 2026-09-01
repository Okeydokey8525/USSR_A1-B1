/**
 * WEB_USSR - TRKI Official Standard Mock Exam Simulator
 */
const TRKIExamModule = (() => {
  let examData = [];
  let currentExam = null;
  let userAnswers = {};
  let timerInterval = null;
  let remainingSeconds = 0;
  let currentQuestionIdx = 0;
  let isExamSubmitted = false;

  async function init() {
    try {
      const resp = await fetch('data/trki_mock_tests.json');
      const data = await resp.json();
      examData = data.levels;

      setupLevelButtons();
      selectExamLevel('A1');
    } catch (e) {
      console.error('Failed to load TRKI exam data:', e);
    }
  }

  function setupLevelButtons() {
    const btns = document.querySelectorAll('.exam-level-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('active', 'bg-blue-600', 'text-white', 'shadow-md');
          b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        });
        btn.classList.add('active', 'bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        selectExamLevel(btn.dataset.level);
      });
    });
  }

  function selectExamLevel(level) {
    const found = examData.find(e => e.level === level);
    if (!found) return;

    currentExam = found;
    userAnswers = {};
    currentQuestionIdx = 0;
    isExamSubmitted = false;
    stopTimer();

    renderExamIntro();
  }

  function renderExamIntro() {
    const container = document.getElementById('exam-main-container');
    if (!container) return;

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-6 max-w-2xl mx-auto">
        <div class="w-20 h-20 mx-auto rounded-3xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/10">
          📜
        </div>
        <div>
          <span class="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            Khung chuẩn Quốc gia Nga TRKI / TORFL
          </span>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white mt-3 font-cyrillic">
            ${currentExam.title}
          </h3>
        </div>

        <div class="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 dark:border-slate-700">
          <div>
            <span class="block text-xs text-slate-400 font-medium">Số lượng câu</span>
            <span class="text-xl font-bold text-slate-800 dark:text-white">${currentExam.questions.length} câu</span>
          </div>
          <div>
            <span class="block text-xs text-slate-400 font-medium">Thời gian thi</span>
            <span class="text-xl font-bold text-slate-800 dark:text-white">${currentExam.time_minutes} phút</span>
          </div>
          <div>
            <span class="block text-xs text-slate-400 font-medium">Điểm đạt chuẩn</span>
            <span class="text-xl font-bold text-emerald-600 dark:text-emerald-400">≥ ${currentExam.pass_score}%</span>
          </div>
        </div>

        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Bài thi mô phỏng chính xác cấu trúc đề thi chính thức của Viện Ngôn ngữ Quốc gia Pushkin và Đại học Tổng hợp Saint Petersburg (СПбГУ). Sau khi nộp bài, hệ thống sẽ tự động chấm điểm và hiển thị đáp án giải thích chi tiết.
        </p>

        <button class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-2xl shadow-xl shadow-blue-500/25 transition-all text-base transform hover:-translate-y-0.5"
                onclick="TRKIExamModule.startExam()">
          Bắt đầu làm bài thi ⏱️
        </button>
      </div>
    `;
  }

  function startExam() {
    remainingSeconds = currentExam.time_minutes * 60;
    isExamSubmitted = false;
    userAnswers = {};
    currentQuestionIdx = 0;

    startTimer();
    renderExamInterface();
  }

  function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
      remainingSeconds--;
      updateTimerDisplay();
      if (remainingSeconds <= 0) {
        stopTimer();
        submitExam();
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const timerEl = document.getElementById('exam-countdown-timer');
    if (!timerEl) return;

    const m = Math.floor(remainingSeconds / 60);
    const s = remainingSeconds % 60;
    timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    if (remainingSeconds <= 300) { // last 5 minutes
      timerEl.classList.add('text-rose-500', 'animate-pulse');
    }
  }

  function renderExamInterface() {
    const container = document.getElementById('exam-main-container');
    if (!container) return;

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Question Area (Left 3 cols) -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Top Bar -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                ${currentExam.level} • ${currentExam.questions[currentQuestionIdx].section}
              </span>
              <span class="font-bold text-slate-800 dark:text-white text-sm">Câu hỏi ${currentQuestionIdx + 1} / ${currentExam.questions.length}</span>
            </div>
            <div class="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl">
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span id="exam-countdown-timer" class="font-mono font-bold text-slate-800 dark:text-white text-base">--:--</span>
            </div>
          </div>

          <!-- Question Card -->
          <div id="exam-question-card" class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <!-- Dynamic Question Content -->
          </div>

          <!-- Nav buttons -->
          <div class="flex items-center justify-between">
            <button class="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onclick="TRKIExamModule.prevQuestion()">
              ← Câu trước
            </button>
            <div class="flex gap-2">
              <button class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors"
                      onclick="TRKIExamModule.nextQuestion()">
                Câu tiếp theo →
              </button>
            </div>
          </div>
        </div>

        <!-- Question Matrix Navigator (Right 1 col) -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 sticky top-24">
            <h4 class="font-bold text-sm text-slate-800 dark:text-white">Bảng danh sách câu hỏi</h4>
            <div class="grid grid-cols-5 gap-2" id="exam-matrix-grid">
              <!-- Matrix items -->
            </div>
            
            <div class="pt-4 border-t border-slate-100 dark:border-slate-700">
              <button class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
                      onclick="TRKIExamModule.confirmSubmit()">
                Nộp bài thi 📝
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    renderQuestionDetail();
    renderMatrixGrid();
    updateTimerDisplay();
  }

  function renderQuestionDetail() {
    const card = document.getElementById('exam-question-card');
    if (!card) return;

    const q = currentExam.questions[currentQuestionIdx];
    const selectedOption = userAnswers[currentQuestionIdx];

    card.innerHTML = `
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
        <p class="font-bold text-slate-800 dark:text-white text-base sm:text-lg whitespace-pre-line font-cyrillic leading-relaxed">
          ${q.question}
        </p>
      </div>

      <div class="space-y-3">
        ${q.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          return `
            <button class="exam-option-btn w-full p-4 rounded-2xl border-2 text-left font-semibold text-slate-800 dark:text-slate-200 text-base font-cyrillic transition-all flex items-center justify-between ${
              isSelected 
                ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-sm' 
                : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 bg-white dark:bg-slate-800'
            }" onclick="TRKIExamModule.selectAnswer(${idx})">
              <span>${opt}</span>
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 dark:border-slate-600'}">
                ${isSelected ? '✓' : ''}
              </div>
            </button>
          `;
        }).join('')}
      </div>
    `;

    renderMatrixGrid();
  }

  function renderMatrixGrid() {
    const grid = document.getElementById('exam-matrix-grid');
    if (!grid) return;

    grid.innerHTML = currentExam.questions.map((q, idx) => {
      const isCurrent = idx === currentQuestionIdx;
      const isAnswered = userAnswers[idx] !== undefined;

      let style = 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600';
      if (isAnswered) {
        style = 'bg-blue-600 text-white border-blue-600 font-bold';
      }
      if (isCurrent) {
        style += ' ring-2 ring-blue-400 ring-offset-2 dark:ring-offset-slate-800';
      }

      return `
        <button class="w-10 h-10 rounded-xl border text-xs flex items-center justify-center transition-all ${style}"
                onclick="TRKIExamModule.jumpToQuestion(${idx})">
          ${idx + 1}
        </button>
      `;
    }).join('');
  }

  function selectAnswer(optIdx) {
    userAnswers[currentQuestionIdx] = optIdx;
    renderQuestionDetail();
  }

  function prevQuestion() {
    if (currentQuestionIdx > 0) {
      currentQuestionIdx--;
      renderQuestionDetail();
    }
  }

  function nextQuestion() {
    if (currentQuestionIdx < currentExam.questions.length - 1) {
      currentQuestionIdx++;
      renderQuestionDetail();
    }
  }

  function jumpToQuestion(idx) {
    currentQuestionIdx = idx;
    renderQuestionDetail();
  }

  function confirmSubmit() {
    const answeredCount = Object.keys(userAnswers).length;
    const total = currentExam.questions.length;
    if (answeredCount < total) {
      if (!confirm(`Bạn mới làm ${answeredCount}/${total} câu. Bạn có chắc chắn muốn nộp bài thi không?`)) {
        return;
      }
    }
    submitExam();
  }

  function submitExam() {
    stopTimer();
    isExamSubmitted = true;

    let correctCount = 0;
    currentExam.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const total = currentExam.questions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const isPassed = percentage >= currentExam.pass_score;

    if (isPassed) {
      App.triggerConfetti();
    }

    renderExamResults(correctCount, total, percentage, isPassed);
  }

  function renderExamResults(correctCount, total, percentage, isPassed) {
    const container = document.getElementById('exam-main-container');
    if (!container) return;

    container.innerHTML = `
      <div class="space-y-8 max-w-4xl mx-auto">
        <!-- Certificate Summary Card -->
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 border-2 ${isPassed ? 'border-emerald-500 shadow-emerald-500/10' : 'border-rose-500 shadow-rose-500/10'} shadow-2xl text-center space-y-6">
          <div class="w-24 h-24 mx-auto rounded-full ${isPassed ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600'} flex items-center justify-center text-4xl shadow-inner">
            ${isPassed ? '🏆' : '⚠️'}
          </div>

          <div>
            <span class="px-3.5 py-1 text-xs font-extrabold rounded-full uppercase tracking-wider ${isPassed ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300'}">
              ${isPassed ? 'ТЕСТ СДАН • ĐẠT CHUẨN' : 'ТЕСТ НЕ СДАН • CHƯA ĐẠT'}
            </span>
            <h3 class="text-3xl font-extrabold text-slate-800 dark:text-white mt-3 font-cyrillic">
              Kết Quả Bài Thi TRKI ${currentExam.level}
            </h3>
          </div>

          <div class="flex justify-center items-baseline gap-2">
            <span class="text-5xl font-black ${isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
              ${percentage}%
            </span>
            <span class="text-slate-400 font-semibold text-lg">(${correctCount}/${total} câu đúng)</span>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            ${isPassed 
              ? 'Xin chúc mừng! Bạn đã vượt qua chuẩn đánh giá quốc gia TRKI với số điểm xuất sắc.' 
              : `Rất tiếc! Bạn cần đạt tối thiểu ${currentExam.pass_score}% để được cấp chứng chỉ TRKI. Hãy xem lại phần giải thích bên dưới để củng cố kiến thức.`}
          </div>

          <div class="flex justify-center gap-3">
            <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                    onclick="TRKIExamModule.startExam()">
              Thi lại đề này 🔄
            </button>
          </div>
        </div>

        <!-- Detailed Breakdown -->
        <div class="space-y-4">
          <h4 class="text-xl font-bold text-slate-800 dark:text-white">Xem lại đáp án và giải thích chi tiết</h4>
          ${currentExam.questions.map((q, idx) => {
            const userChoice = userAnswers[idx];
            const isCorrect = userChoice === q.correct;
            return `
              <div class="p-6 rounded-3xl bg-white dark:bg-slate-800 border-2 ${isCorrect ? 'border-emerald-500/40' : 'border-rose-500/40'} shadow-sm space-y-4">
                <div class="flex items-start justify-between">
                  <span class="text-xs font-bold px-2.5 py-1 rounded-md ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
                    Câu ${idx + 1}: ${isCorrect ? '✓ Đúng' : '✗ Sai'}
                  </span>
                  <span class="text-xs text-slate-400">${q.section}</span>
                </div>

                <p class="font-bold text-slate-800 dark:text-white font-cyrillic text-base whitespace-pre-line">${q.question}</p>

                <div class="space-y-2 text-sm font-cyrillic">
                  ${q.options.map((opt, oIdx) => {
                    let optStyle = 'p-3 rounded-xl border border-slate-200 dark:border-slate-700';
                    if (oIdx === q.correct) {
                      optStyle = 'p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 font-bold text-emerald-800 dark:text-emerald-200';
                    } else if (oIdx === userChoice && !isCorrect) {
                      optStyle = 'p-3 rounded-xl border-2 border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 font-bold text-rose-800 dark:text-rose-200';
                    }
                    return `<div class="${optStyle}">${opt} ${oIdx === q.correct ? '★ (Đáp án chuẩn)' : (oIdx === userChoice ? '← Bạn chọn' : '')}</div>`;
                  }).join('')}
                </div>

                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
                  <strong class="text-blue-600 dark:text-blue-400 block mb-1">💡 Giải thích ngữ pháp:</strong>
                  ${q.explanation}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  return {
    init,
    selectExamLevel,
    startExam,
    selectAnswer,
    prevQuestion,
    nextQuestion,
    jumpToQuestion,
    confirmSubmit
  };
})();

window.TRKIExamModule = TRKIExamModule;
