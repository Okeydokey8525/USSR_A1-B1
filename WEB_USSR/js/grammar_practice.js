/**
 * WEB_USSR - Interactive Grammar & Verb Aspects Practice Engine
 */
const GrammarPracticeModule = (() => {
  let verbsData = null;
  let practiceQuestions = [];
  let currentQIndex = 0;
  let score = 0;
  let currentMode = 'cases'; // 'cases', 'aspects', 'motion'

  const builtInPracticeQuestions = {
    cases: [
      {
        id: "c1",
        ru_sentence: "Вчера мы долго гуляли в красивом ... (парк).",
        options: ["парке", "парка", "парку", "парком"],
        correct: 0,
        explanation: "Sau giới từ 'в' chỉ địa điểm (Где? Trong công viên) chia Cách 6: парке.",
        audio: "Вчера мы долго гуляли в красивом парке."
      },
      {
        id: "c2",
        ru_sentence: "Антон позвонил своей ... (мама).",
        options: ["маму", "маме", "мамой", "мамы"],
        correct: 1,
        explanation: "Động từ 'позвонить кому' (gọi điện cho ai) đi với Cách 3: маме.",
        audio: "Антон позвонил своей маме."
      },
      {
        id: "c3",
        ru_sentence: "Я купил интересную ... (книга) в магазине.",
        options: ["книгу", "книги", "книге", "книгой"],
        correct: 0,
        explanation: "Bổ ngữ trực tiếp của động từ 'купить' chia Cách 4: интересную книгу.",
        audio: "Я купил интересную книгу в магазине."
      },
      {
        id: "c4",
        ru_sentence: "Мой друг хочет стать известным ... (врач).",
        options: ["врача", "врачу", "врачом", "враче"],
        correct: 2,
        explanation: "Sau động từ 'стать кем' (trở thành ai) chia Cách 5: известным врачом.",
        audio: "Мой друг хочет стать известным врачом."
      },
      {
        id: "c5",
        ru_sentence: "Сегодня на улице нет сильного ... (ветер).",
        options: ["ветра", "ветру", "ветром", "ветре"],
        correct: 0,
        explanation: "Cấu trúc phủ định 'нет' đi với Cách 2: сильного ветра.",
        audio: "Сегодня на улице нет сильного ветра."
      }
    ],
    aspects: [
      {
        id: "a1",
        ru_sentence: "Каждый вечер я ... (читать / прочитать) русские новости.",
        options: ["читаю", "прочитаю", "прочитал"],
        correct: 0,
        explanation: "Dấu hiệu 'каждый вечер' (mỗi buổi tối) chỉ hành động lặp đi lặp lại thường xuyên -> dùng thể Chưa hoàn thành (НСВ): читаю.",
        audio: "Каждый вечер я читаю русские новости."
      },
      {
        id: "a2",
        ru_sentence: "Вчера я наконец ... (писать / написать) сложное эссе.",
        options: ["писал", "написал", "буду писать"],
        correct: 1,
        explanation: "Dấu hiệu 'наконец' (cuối cùng) nhấn mạnh kết quả đạt được trọn vẹn -> dùng thể Hoàn thành (СВ): написал.",
        audio: "Вчера я наконец написал сложное эссе."
      },
      {
        id: "a3",
        ru_sentence: "Студент долго ... (решать / решить) эту задачу.",
        options: ["решал", "решил", "решит"],
        correct: 0,
        explanation: "Dấu hiệu 'долго' (lâu, trong thời gian dài) chỉ quá trình diễn tiến -> dùng thể Chưa hoàn thành (НСВ): решал.",
        audio: "Студент долго решал эту задачу."
      },
      {
        id: "a4",
        ru_sentence: "Пожалуйста, ... (открывать / открыть) окно, здесь душно.",
        options: ["открывайте", "откройте", "открыли"],
        correct: 1,
        explanation: "Lời yêu cầu thực hiện một hành động cụ thể dứt khoát tại thời điểm nói -> dùng mệnh lệnh thức thể Hoàn thành (СВ): откройте.",
        audio: "Пожалуйста, откройте окно, здесь душно."
      }
    ],
    motion: [
      {
        id: "m1",
        ru_sentence: "Куда ты сейчас ... (идти / ходить)? — В библиотеку.",
        options: ["идёшь", "ходишь", "пошёл"],
        correct: 0,
        explanation: "Hành động đang diễn ra tại thời điểm nói hướng về một đích đến cụ thể (сейчас) -> dùng 'идти': идёшь.",
        audio: "Куда ты сейчас идёшь? — В библиотеку."
      },
      {
        id: "m2",
        ru_sentence: "Каждое лето мы ... (ехать / ездить) на море в Сочи.",
        options: ["едем", "ездим", "поедем"],
        correct: 1,
        explanation: "Hành động lặp đi lặp lại hàng năm bằng phương tiện giao thông (каждое лето) -> dùng 'ездить': ездим.",
        audio: "Каждое лето мы ездим на море в Сочи."
      },
      {
        id: "m3",
        ru_sentence: "Поезд быстро ... (приехать / уехать) из Москвы в Петербург.",
        options: ["приехал", "вошёл", "перешёл"],
        correct: 0,
        explanation: "Tàu hỏa đến nơi (đi bằng phương tiện đến đích) dùng tiền tố при-: приехал.",
        audio: "Поезд быстро приехал из Москвы в Петербург."
      },
      {
        id: "m4",
        ru_sentence: "Студент ... (войти / выйти) в аудиторию и поздоровался.",
        options: ["вошёл", "вышел", "отошёл"],
        correct: 0,
        explanation: "Đi vào bên trong phòng học (в аудиторию) dùng tiền tố в-/во-: вошёл.",
        audio: "Студент вошёл в аудиторию и поздоровался."
      }
    ]
  };

  async function init() {
    try {
      const resp = await fetch('data/verbs_aspects.json');
      verbsData = await resp.json();
      setupModeButtons();
      renderVerbsAspectsReference();
      startPractice('cases');
    } catch (e) {
      console.error('Failed to load grammar data:', e);
    }
  }

  function setupModeButtons() {
    const btns = document.querySelectorAll('.practice-mode-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('active', 'bg-blue-600', 'text-white', 'shadow-md');
          b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        });
        btn.classList.add('active', 'bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        startPractice(btn.dataset.mode);
      });
    });
  }

  function startPractice(mode) {
    currentMode = mode;
    practiceQuestions = [...builtInPracticeQuestions[mode]];
    currentQIndex = 0;
    score = 0;
    renderQuestion();
  }

  function renderQuestion() {
    const container = document.getElementById('practice-card-container');
    if (!container) return;

    if (currentQIndex >= practiceQuestions.length) {
      renderCompletedSummary();
      return;
    }

    const q = practiceQuestions[currentQIndex];
    const progress = Math.round(((currentQIndex) / practiceQuestions.length) * 100);

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
        <!-- Progress Bar -->
        <div>
          <div class="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
            <span>Câu hỏi ${currentQIndex + 1} / ${practiceQuestions.length}</span>
            <span>Điểm hiện tại: <strong class="text-blue-600">${score}</strong></span>
          </div>
          <div class="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div class="h-full bg-blue-600 transition-all duration-300" style="width: ${progress}%"></div>
          </div>
        </div>

        <!-- Question Title -->
        <div class="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/40 text-center">
          <p class="text-lg sm:text-xl font-bold text-slate-800 dark:text-white font-cyrillic leading-relaxed">
            ${q.ru_sentence}
          </p>
        </div>

        <!-- Options -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="practice-options-grid">
          ${q.options.map((opt, idx) => `
            <button class="practice-opt-btn w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 bg-white dark:bg-slate-800 hover:bg-blue-50/40 dark:hover:bg-slate-700 text-left font-bold text-slate-800 dark:text-slate-200 font-cyrillic text-base transition-all flex items-center justify-between"
                    onclick="GrammarPracticeModule.checkAnswer(${idx})">
              <span>${opt}</span>
              <span class="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs text-slate-400 font-mono">
                ${String.fromCharCode(65 + idx)}
              </span>
            </button>
          `).join('')}
        </div>

        <!-- Explanation Container (Hidden initially) -->
        <div id="practice-explanation" class="hidden p-5 rounded-2xl space-y-3">
          <div id="explanation-text" class="text-sm"></div>
          <div class="flex items-center justify-between pt-2">
            <button class="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    onclick="RussianSpeech.speak('${q.audio}')">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              Nghe phát âm chuẩn
            </button>
            <button class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-colors"
                    onclick="GrammarPracticeModule.nextQuestion()">
              Tiếp tục →
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function checkAnswer(selectedIdx) {
    const q = practiceQuestions[currentQIndex];
    const optButtons = document.querySelectorAll('.practice-opt-btn');
    const explanationDiv = document.getElementById('practice-explanation');
    const explanationText = document.getElementById('explanation-text');

    optButtons.forEach(btn => btn.disabled = true);

    const isCorrect = selectedIdx === q.correct;
    if (isCorrect) {
      score++;
      optButtons[selectedIdx].classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/40', 'text-emerald-700');
      explanationDiv.className = 'p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-3';
      explanationText.innerHTML = `<p class="font-bold text-emerald-700 dark:text-emerald-300">✓ Chính xác!</p><p class="text-xs sm:text-sm mt-1">${q.explanation}</p>`;
      App.triggerConfetti();
    } else {
      optButtons[selectedIdx].classList.add('border-rose-500', 'bg-rose-50', 'dark:bg-rose-950/40', 'text-rose-700');
      optButtons[q.correct].classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/40', 'text-emerald-700');
      explanationDiv.className = 'p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 space-y-3';
      explanationText.innerHTML = `<p class="font-bold text-rose-700 dark:text-rose-300">✗ Chưa đúng!</p><p class="text-xs sm:text-sm mt-1">${q.explanation}</p>`;
    }

    explanationDiv.classList.remove('hidden');
    RussianSpeech.speak(q.audio);
  }

  function nextQuestion() {
    currentQIndex++;
    renderQuestion();
  }

  function renderCompletedSummary() {
    const container = document.getElementById('practice-card-container');
    if (!container) return;

    const total = practiceQuestions.length;
    const percent = Math.round((score / total) * 100);

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-6">
        <div class="w-20 h-20 mx-auto rounded-full ${percent >= 70 ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600' : 'bg-amber-100 dark:bg-amber-900/50 text-amber-600'} flex items-center justify-center text-3xl">
          ${percent >= 70 ? '🏆' : '📚'}
        </div>
        <div>
          <h3 class="text-2xl font-bold text-slate-800 dark:text-white">Hoàn thành phần luyện tập!</h3>
          <p class="text-slate-500 text-sm mt-1">Kết quả của bạn:</p>
        </div>
        <div class="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
          ${score} / ${total} <span class="text-lg font-normal text-slate-400">(${percent}%)</span>
        </div>
        <div class="flex justify-center gap-3">
          <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors"
                  onclick="GrammarPracticeModule.startPractice('${currentMode}')">
            Luyện tập lại
          </button>
        </div>
      </div>
    `;
  }

  function renderVerbsAspectsReference() {
    const container = document.getElementById('verbs-reference-table');
    if (!container || !verbsData) return;

    container.innerHTML = `
      <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        <table class="w-full text-left text-xs sm:text-sm">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th class="p-3">Ý nghĩa</th>
              <th class="p-3 text-blue-600 dark:text-blue-400">Chưa hoàn thành (НСВ)</th>
              <th class="p-3 text-emerald-600 dark:text-emerald-400">Hoàn thành (СВ)</th>
              <th class="p-3">Quản cách</th>
              <th class="p-3">Ví dụ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60 font-mono">
            ${verbsData.aspect_pairs.map(pair => `
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <td class="p-3 font-sans font-bold text-slate-800 dark:text-white">${pair.meaning}</td>
                <td class="p-3 font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline" onclick="RussianSpeech.speak('${pair.nsv}')">${pair.nsv}</td>
                <td class="p-3 font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer hover:underline" onclick="RussianSpeech.speak('${pair.sv}')">${pair.sv}</td>
                <td class="p-3 text-slate-500 font-sans">${pair.governance}</td>
                <td class="p-3 text-slate-600 dark:text-slate-400 font-sans text-xs italic">${pair.example}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  return {
    init,
    startPractice,
    checkAnswer,
    nextQuestion
  };
})();

window.GrammarPracticeModule = GrammarPracticeModule;
