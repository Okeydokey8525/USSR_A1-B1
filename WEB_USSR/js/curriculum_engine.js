/**
 * WEB_USSR - Russian Curriculum OS Engine
 * Sequential Guided Learning Pathway (Pre-A1 to B1.1)
 */
const CurriculumEngine = (() => {
  let curriculumData = null;
  let activeModuleId = 'mod_pre_a1';
  let activeLessonId = 'les_0_1';
  let completedLessons = {}; // { lesson_id: { score: 100, completedAt: ... } }

  async function init() {
    try {
      const resp = await fetch('data/curriculum_tree.json');
      curriculumData = await resp.json();

      loadProgress();
      renderCurriculumOverview();
      renderActiveLesson();
    } catch (e) {
      console.error('Failed to load curriculum data:', e);
    }
  }

  function loadProgress() {
    try {
      const saved = localStorage.getItem('ussr_curriculum_progress');
      if (saved) {
        completedLessons = JSON.parse(saved);
      }
      const savedActiveLesson = localStorage.getItem('ussr_active_lesson');
      if (savedActiveLesson) {
        activeLessonId = savedActiveLesson;
        // find its module
        for (const mod of curriculumData.modules) {
          if (mod.lessons.some(l => l.id === activeLessonId)) {
            activeModuleId = mod.module_id;
            break;
          }
        }
      }
    } catch (e) {}
  }

  function saveProgress() {
    localStorage.setItem('ussr_curriculum_progress', JSON.stringify(completedLessons));
    localStorage.setItem('ussr_active_lesson', activeLessonId);
  }

  function startFromZero() {
    activeModuleId = 'mod_pre_a1';
    activeLessonId = 'les_0_1';
    saveProgress();
    App.switchTab('tab-curriculum');
    renderCurriculumOverview();
    renderActiveLesson();
  }

  function selectLesson(lessonId) {
    activeLessonId = lessonId;
    for (const mod of curriculumData.modules) {
      if (mod.lessons.some(l => l.id === lessonId)) {
        activeModuleId = mod.module_id;
        break;
      }
    }
    saveProgress();
    renderCurriculumOverview();
    renderActiveLesson();

    // scroll to active lesson container
    const el = document.getElementById('active-lesson-container');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderCurriculumOverview() {
    const container = document.getElementById('curriculum-roadmap-list');
    if (!container || !curriculumData) return;

    let totalLessons = 0;
    let finishedLessons = 0;

    curriculumData.modules.forEach(m => {
      totalLessons += m.lessons.length;
      m.lessons.forEach(l => {
        if (completedLessons[l.id]) finishedLessons++;
      });
    });

    const overallPct = Math.round((finishedLessons / totalLessons) * 100);

    // Update Top Progress Bar
    const progressText = document.getElementById('curriculum-overall-pct');
    const progressBar = document.getElementById('curriculum-overall-bar');
    if (progressText) progressText.textContent = `${overallPct}% Hoàn thành (${finishedLessons}/${totalLessons} bài)`;
    if (progressBar) progressBar.style.width = `${overallPct}%`;

    container.innerHTML = curriculumData.modules.map((mod, mIdx) => {
      const isModActive = mod.module_id === activeModuleId;
      const modCompletedCount = mod.lessons.filter(l => completedLessons[l.id]).length;
      const modPct = Math.round((modCompletedCount / mod.lessons.length) * 100);

      return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <!-- Module Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-700">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 text-[11px] font-extrabold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                  ${mod.level}
                </span>
                <span class="text-xs text-slate-400 font-bold">${modPct}% Hoàn thành</span>
              </div>
              <h3 class="text-lg font-bold text-slate-800 dark:text-white mt-1">${mod.title}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${mod.description}</p>
            </div>
          </div>

          <!-- Lessons Grid in Module -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${mod.lessons.map(les => {
              const isCurrent = les.id === activeLessonId;
              const isDone = !!completedLessons[les.id];
              return `
                <button class="p-4 rounded-2xl border text-left transition-all ${
                  isCurrent 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg ring-2 ring-blue-400' 
                    : isDone
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-800 dark:text-slate-200'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-800 dark:text-slate-200'
                }" onclick="CurriculumEngine.selectLesson('${les.id}')">
                  <div class="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span class="font-bold opacity-75">${les.objective_code}</span>
                    <span>${isDone ? '✓ Đã học' : isCurrent ? '▶ Đang học' : 'Chưa học'}</span>
                  </div>
                  <h4 class="font-bold text-sm leading-snug line-clamp-2">${les.title}</h4>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderActiveLesson() {
    const container = document.getElementById('active-lesson-container');
    if (!container || !curriculumData) return;

    let currentLesson = null;
    let currentModule = null;

    for (const mod of curriculumData.modules) {
      const found = mod.lessons.find(l => l.id === activeLessonId);
      if (found) {
        currentLesson = found;
        currentModule = mod;
        break;
      }
    }

    if (!currentLesson) return;

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl space-y-8 max-w-4xl mx-auto">
        <!-- Step 1 & 2: Header, Objective & Why Learn -->
        <div class="pb-6 border-b border-slate-100 dark:border-slate-700 space-y-3">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
              ${currentModule.level} • ${currentLesson.objective_code}
            </span>
            <span class="text-xs text-slate-400 font-bold">Quy trình học 10 bước</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-cyrillic">
            ${currentLesson.title}
          </h2>
          <div class="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs sm:text-sm text-blue-950 dark:text-blue-200 space-y-1">
            <strong>🎯 Tại sao bạn cần học bài này?</strong>
            <p>${currentLesson.why_learn}</p>
          </div>
          <p class="text-xs text-slate-400 italic">
            <strong>Kiến thức tiên quyết:</strong> ${currentLesson.prerequisites}
          </p>
        </div>

        <!-- Step 4: Core Theory -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Lý thuyết cốt lõi (Теория):</h4>
          <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 font-cyrillic whitespace-pre-line">
            ${currentLesson.theory_markdown}
          </div>
        </div>

        <!-- Step 5: Contextual Examples -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Ví dụ ngữ cảnh thực tế (Примеры):</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${currentLesson.context_examples.map(ex => `
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h5 class="text-base font-bold text-slate-800 dark:text-white font-cyrillic">${ex.ru}</h5>
                  ${ex.phonetic ? `<span class="text-xs text-blue-600 font-mono block">${ex.phonetic}</span>` : ''}
                  <span class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">${ex.vi}</span>
                </div>
                <button class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors flex-shrink-0 ml-2"
                        onclick="RussianSpeech.speak('${ex.ru}')">
                  🔊
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Step 6: Interactive Practice -->
        <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <h4 class="text-base font-bold text-slate-800 dark:text-white">Luyện tập kiểm tra hiểu bài (Практика):</h4>
          ${currentLesson.practice_exercises.map((ex, exIdx) => `
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
              <p class="font-bold text-sm text-slate-800 dark:text-slate-200 font-cyrillic">${exIdx + 1}. ${ex.q}</p>
              <div class="space-y-2">
                ${ex.options.map((opt, oIdx) => `
                  <button class="lesson-quiz-opt w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 bg-white dark:bg-slate-800 text-xs sm:text-sm font-semibold transition-all"
                          onclick="CurriculumEngine.checkLessonAnswer('${currentLesson.id}', ${exIdx}, ${oIdx}, this)">
                    ${opt}
                  </button>
                `).join('')}
              </div>
              <div id="lesson-why-${currentLesson.id}-${exIdx}" class="hidden p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-xs text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                <strong>💡 Giải thích:</strong> ${ex.why}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Step 7 & 8: Integrated Skills -->
        <div class="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-3">
          <h4 class="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Kỹ năng liên kết (Multi-Skill Integration):</h4>
          <div class="flex flex-wrap gap-2">
            ${currentLesson.integrated_speaking_phrase ? `
              <button class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 hover:border-blue-400"
                      onclick="RussianSpeech.speak('${currentLesson.integrated_speaking_phrase}')">
                <span>🎙️ Luyện nói câu: "${currentLesson.integrated_speaking_phrase.substring(0, 25)}..."</span>
              </button>
            ` : ''}
            ${currentLesson.integrated_reading_id ? `
              <button class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 hover:border-blue-400"
                      onclick="App.switchTab('tab-reading')">
                <span>📖 Xem bài đọc liên kết trong Reading Lab</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Step 10: Complete Lesson & Unlock Next -->
        <div class="pt-6 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button class="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-500/20 transition-all text-sm flex items-center justify-center gap-2"
                  onclick="CurriculumEngine.completeCurrentLesson()">
            <span>Hoàn thành bài học & Mở bài tiếp theo ✓</span>
          </button>
        </div>
      </div>
    `;
  }

  function checkLessonAnswer(lessonId, exIdx, oIdx, btnEl) {
    let currentLesson = null;
    for (const mod of curriculumData.modules) {
      const found = mod.lessons.find(l => l.id === lessonId);
      if (found) { currentLesson = found; break; }
    }
    if (!currentLesson) return;

    const ex = currentLesson.practice_exercises[exIdx];
    const parent = btnEl.closest('.space-y-3');
    const allBtns = parent.querySelectorAll('.lesson-quiz-opt');
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = oIdx === ex.correct;
    if (isCorrect) {
      btnEl.classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/40', 'text-emerald-700', 'font-bold');
      App.triggerConfetti();
    } else {
      btnEl.classList.add('border-rose-500', 'bg-rose-50', 'dark:bg-rose-950/40', 'text-rose-700');
      allBtns[ex.correct].classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/40', 'text-emerald-700', 'font-bold');
      if (window.AdaptiveLearningOS) {
        AdaptiveLearningOS.recordError('GRAMMAR_LESSON', currentLesson.title);
      }
    }

    const whyEl = document.getElementById(`lesson-why-${lessonId}-${exIdx}`);
    if (whyEl) whyEl.classList.remove('hidden');
  }

  function completeCurrentLesson() {
    completedLessons[activeLessonId] = {
      completedAt: Date.now(),
      score: 100
    };

    App.triggerConfetti();
    App.showToast('Chúc mừng bạn đã hoàn thành bài học!', 'success');

    // Find next lesson
    let allLessons = [];
    curriculumData.modules.forEach(m => {
      allLessons.push(...m.lessons);
    });

    const currentIndex = allLessons.findIndex(l => l.id === activeLessonId);
    if (currentIndex < allLessons.length - 1) {
      activeLessonId = allLessons[currentIndex + 1].id;
    }

    saveProgress();
    renderCurriculumOverview();
    renderActiveLesson();

    // Update Daily Mission
    if (window.AdaptiveLearningOS) {
      AdaptiveLearningOS.dailyState.grammarDone++;
      AdaptiveLearningOS.saveDailyState();
    }
  }

  return {
    init,
    startFromZero,
    selectLesson,
    checkLessonAnswer,
    completeCurrentLesson
  };
})();

window.CurriculumEngine = CurriculumEngine;
