/**
 * WEB_USSR - Diagnostic Placement Test (Тест на определение уровня)
 */
const PlacementModule = (() => {
  let questions = [];
  let currentIdx = 0;
  let userAnswers = {};
  let isFinished = false;

  async function init() {
    try {
      const resp = await fetch('data/placement_questions.json');
      const data = await resp.json();
      questions = data.questions;
      currentIdx = 0;
      userAnswers = {};
      isFinished = false;

      renderTest();
    } catch (e) {
      console.error('Failed to load placement test:', e);
    }
  }

  function renderTest() {
    const container = document.getElementById('placement-test-container');
    if (!container) return;

    if (isFinished) {
      renderResults(container);
      return;
    }

    const q = questions[currentIdx];
    if (!q) return;

    const progressPct = Math.round(((currentIdx + 1) / questions.length) * 100);

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm max-w-2xl mx-auto space-y-6">
        <!-- Progress Bar -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Câu hỏi ${currentIdx + 1} / ${questions.length}</span>
            <span class="text-blue-600 dark:text-blue-400 font-extrabold">${q.skill} (${q.level})</span>
          </div>
          <div class="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div class="bg-blue-600 h-full rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
          </div>
        </div>

        <!-- Question Prompt -->
        <div class="py-4">
          <h3 class="text-lg sm:text-xl font-bold text-slate-800 dark:text-white font-cyrillic leading-relaxed">
            ${q.question}
          </h3>
        </div>

        <!-- Options -->
        <div class="space-y-2.5">
          ${q.options.map((opt, oIdx) => `
            <button class="w-full text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 transition-all"
                    onclick="PlacementModule.selectAnswer(${oIdx})">
              <span class="inline-block w-6 text-slate-400 font-mono">${String.fromCharCode(65 + oIdx)}.</span>
              <span class="font-cyrillic">${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function selectAnswer(optionIdx) {
    userAnswers[currentIdx] = optionIdx;
    if (currentIdx < questions.length - 1) {
      currentIdx++;
      renderTest();
    } else {
      isFinished = true;
      renderTest();
    }
  }

  function renderResults(container) {
    let totalScore = 0;
    let maxScore = 0;
    let skillScores = {};

    questions.forEach((q, idx) => {
      const weight = q.weight || 1;
      maxScore += weight;
      if (!skillScores[q.skill]) {
        skillScores[q.skill] = { correct: 0, total: 0 };
      }
      skillScores[q.skill].total += weight;

      if (userAnswers[idx] === q.correct) {
        totalScore += weight;
        skillScores[q.skill].correct += weight;
      }
    });

    const scorePct = Math.round((totalScore / maxScore) * 100);
    let estimatedLevel = 'Pre-A1 (Mới bắt đầu)';
    let recommendation = 'Bắt đầu ngay với Lộ trình 7 ngày: Bảng chữ cái Cyrillic, quy tắc trọng âm và đọc âm tiết ghép vần.';

    if (scorePct >= 85) {
      estimatedLevel = 'B1.1 (Trung cấp)';
      recommendation = 'Trình độ rất tốt! Bạn nên tập trung hoàn thiện các đề thi thử TRKI-1 và bài báo khoa học trong Reading Lab.';
    } else if (scorePct >= 65) {
      estimatedLevel = 'A2.2 (Sơ cấp nâng cao)';
      recommendation = 'Bạn đã nắm vững nền tảng A1. Hãy tập trung luyện Động từ chuyển động có tiền tố và thể động từ phức hợp.';
    } else if (scorePct >= 40) {
      estimatedLevel = 'A1.2 (Sơ cấp cơ bản)';
      recommendation = 'Bạn đã biết từ vựng cơ bản. Hãy chú trọng luyện Ma trận 6 Cách (Case Trainer) và đuôi biến cách danh từ/tính từ.';
    }

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl max-w-2xl mx-auto text-center space-y-6">
        <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-3xl flex items-center justify-center mx-auto text-3xl">
          🎯
        </div>

        <div>
          <span class="text-xs font-extrabold uppercase tracking-widest text-slate-400">Kết quả đánh giá trình độ tiếng Nga</span>
          <h3 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            ${estimatedLevel}
          </h3>
          <p class="text-sm text-blue-600 dark:text-blue-400 font-bold mt-1">
            Điểm số tổng quát: ${totalScore} / ${maxScore} (${scorePct}%)
          </p>
        </div>

        <!-- Granular Skills Breakdown -->
        <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left space-y-3">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Đánh giá theo từng nhóm kỹ năng:</h4>
          <div class="space-y-2">
            ${Object.entries(skillScores).map(([skill, data]) => {
              const pct = Math.round((data.correct / data.total) * 100);
              return `
                <div class="space-y-1">
                  <div class="flex items-center justify-between text-xs font-bold">
                    <span class="text-slate-700 dark:text-slate-300">${skill}</span>
                    <span class="text-blue-600 font-mono">${pct}%</span>
                  </div>
                  <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div class="bg-blue-600 h-full rounded-full" style="width: ${pct}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 text-xs sm:text-sm border border-blue-200 dark:border-blue-800 text-left">
          <strong>💡 Đề xuất lộ trình học:</strong> ${recommendation}
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button class="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg transition-colors text-sm"
                  onclick="App.switchTab('tab-alphabet')">
            Vào học theo lộ trình 🚀
          </button>
          <button class="w-full sm:w-auto px-6 py-3.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-2xl transition-colors text-sm"
                  onclick="PlacementModule.init()">
            Làm lại bài kiểm tra 🔄
          </button>
        </div>
      </div>
    `;

    App.triggerConfetti();
  }

  return {
    init,
    selectAnswer
  };
})();

window.PlacementModule = PlacementModule;
