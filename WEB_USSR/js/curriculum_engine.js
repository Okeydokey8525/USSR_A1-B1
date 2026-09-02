/**
 * WEB_USSR - Russian Curriculum OS Engine
 * 17-Point Pedagogical Template & 4-Tier Practice Progression Ladder
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

    const progressText = document.getElementById('curriculum-overall-pct');
    const progressBar = document.getElementById('curriculum-overall-bar');
    if (progressText) progressText.textContent = `${overallPct}% Hoàn thành (${finishedLessons}/${totalLessons} bài)`;
    if (progressBar) progressBar.style.width = `${overallPct}%`;

    container.innerHTML = curriculumData.modules.map((mod, mIdx) => {
      const isModActive = mod.module_id === activeModuleId;
      const modCompletedCount = mod.lessons.filter(l => completedLessons[l.id]).length;
      const modPct = Math.round((modCompletedCount / mod.lessons.length) * 100);

      return `
        <div class="rounded-3xl border ${isModActive ? 'border-blue-500/80 bg-blue-50/20 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'} p-5 sm:p-6 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                  ${mod.level}
                </span>
                <span class="text-xs text-slate-400 font-bold">${modCompletedCount}/${mod.lessons.length} bài hoàn thành</span>
              </div>
              <h3 class="text-lg font-extrabold text-slate-900 dark:text-white">${mod.title}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${mod.description}</p>
            </div>
            
            <div class="w-full sm:w-28 flex flex-col items-end gap-1">
              <span class="text-xs font-mono font-bold text-blue-600">${modPct}%</span>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div class="bg-blue-600 h-full rounded-full transition-all" style="width: ${modPct}%"></div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            ${mod.lessons.map(les => {
              const isDone = Boolean(completedLessons[les.id]);
              const isCurrent = les.id === activeLessonId;

              return `
                <button class="text-left p-4 rounded-2xl border transition-all ${
                  isCurrent 
                    ? 'border-blue-600 bg-blue-600 text-white shadow-md' 
                    : isDone 
                      ? 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200' 
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
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

    const ctrlExercises = currentLesson.controlled_practice || currentLesson.practice_exercises || [];
    const meanExercises = currentLesson.meaningful_practice || [];
    const transDrills = currentLesson.transformation_drills || [];

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl space-y-8 max-w-4xl mx-auto">
        
        <!-- Step 1, 2, 3: Header, Objective, Why Learn & Prerequisites -->
        <div class="pb-6 border-b border-slate-100 dark:border-slate-700 space-y-3">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
              ${currentModule.level} • ${currentLesson.objective_code}
            </span>
            <span class="text-xs text-slate-400 font-bold">Khung chuẩn 17 bước sư phạm & Thang 4 bậc thực hành</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-cyrillic">
            ${currentLesson.title}
          </h2>
          
          <!-- Adaptive Prerequisite Check Alert -->
          ${(() => {
            if (window.AdaptiveLearningOS) {
              const check = AdaptiveLearningOS.checkPrerequisite(currentModule.level);
              if (check && check.needsReview) {
                return `
                  <div class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 text-xs text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <strong>⚠️ Đề xuất ôn tập nhanh (Review Before New):</strong>
                      <p>${check.reason}</p>
                    </div>
                    <button class="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl flex-shrink-0"
                            onclick="App.switchTab('${check.actionTab}')">
                      Ôn 3 phút ➔
                    </button>
                  </div>
                `;
              }
            }
            return '';
          })()}

          <div class="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs sm:text-sm text-blue-950 dark:text-blue-200 space-y-1">
            <strong>🎯 Зачем мне это? (Tại sao bạn cần học bài này?):</strong>
            <p>${currentLesson.why_learn}</p>
          </div>
          <p class="text-xs text-slate-400 italic">
            <strong>Kiến thức tiên quyết (Prerequisites):</strong> ${currentLesson.prerequisites}
          </p>
        </div>

        <!-- Step 4: New Vocabulary -->
        ${currentLesson.new_vocab ? `
          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">04. Từ vựng trọng tâm (Новые слова):</h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              ${currentLesson.new_vocab.map(v => `
                <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span class="font-bold text-sm text-slate-900 dark:text-white font-cyrillic">${v.word}</span>
                    <span class="text-[11px] text-blue-600 dark:text-blue-400 font-mono block">${v.phonetic || ''}</span>
                    <span class="text-xs text-slate-500 dark:text-slate-400">${v.meaning}</span>
                  </div>
                  <button class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs hover:bg-blue-600 hover:text-white transition-colors"
                          onclick="RussianSpeech.speak('${v.word}')">🔊</button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Step 5: Grammar Discovery Patterns -->
        ${currentLesson.grammar_discovery ? `
          <div class="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 space-y-2">
            <span class="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">05. Phát hiện quy luật ngữ pháp (Grammar Discovery):</span>
            <div class="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              ${currentLesson.grammar_discovery.map(gd => `
                <div class="flex items-start gap-2">
                  <span class="font-bold text-indigo-600 dark:text-indigo-400 font-cyrillic">${gd.ru}</span>
                  <span class="text-slate-500">➔ ${gd.note}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Step 6: Core Theory Markdown -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">06. Giải thích ngữ pháp cốt lõi (Объяснение):</h4>
          <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 font-cyrillic whitespace-pre-line">
            ${currentLesson.theory_markdown}
          </div>
        </div>

        <!-- Step 7: Contextual Examples -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">07. Ví dụ mẫu câu thực tế (Примеры):</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${(currentLesson.context_examples || []).map(ex => `
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

        <!-- ==================== 4-TIER PRACTICE PROGRESSION ==================== -->
        
        <!-- Tier 1: Controlled Practice (5-8 Questions) -->
        <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] font-bold text-blue-600 uppercase">Thang thực hành • Bậc 1 / 4</span>
              <h4 class="text-base font-bold text-slate-800 dark:text-white">08. Bài tập nhận diện có kiểm soát (Controlled Practice — ${ctrlExercises.length} câu):</h4>
            </div>
            <span class="text-xs text-slate-400 font-mono font-bold">Quy tắc chuẩn</span>
          </div>

          ${ctrlExercises.map((ex, exIdx) => `
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
              <p class="font-bold text-sm text-slate-800 dark:text-slate-200 font-cyrillic">${exIdx + 1}. ${ex.q}</p>
              <div class="space-y-2">
                ${ex.options.map((opt, oIdx) => `
                  <button class="lesson-quiz-opt w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 bg-white dark:bg-slate-800 text-xs sm:text-sm font-semibold transition-all font-cyrillic"
                          onclick="CurriculumEngine.checkLessonAnswer('${currentLesson.id}', 'ctrl', ${exIdx}, ${oIdx}, this)">
                    ${opt}
                  </button>
                `).join('')}
              </div>
              <div id="lesson-why-${currentLesson.id}-ctrl-${exIdx}" class="hidden p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-xs text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                <strong>💡 Giải thích chi tiết:</strong> ${ex.why}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Tier 2: Meaningful Practice (3-5 Questions) -->
        ${meanExercises.length > 0 ? `
          <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-indigo-600 uppercase">Thang thực hành • Bậc 2 / 4</span>
                <h4 class="text-base font-bold text-slate-800 dark:text-white">09. Luyện tập có ý nghĩa & Phản xạ ngữ cảnh (Meaningful Practice — ${meanExercises.length} câu):</h4>
              </div>
              <span class="text-xs text-slate-400 font-mono font-bold">Giao tiếp thực tế</span>
            </div>

            ${meanExercises.map((ex, exIdx) => `
              <div class="p-5 rounded-2xl bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
                <p class="font-bold text-sm text-slate-800 dark:text-slate-200 font-cyrillic">${exIdx + 1}. ${ex.q}</p>
                <div class="space-y-2">
                  ${ex.options.map((opt, oIdx) => `
                    <button class="lesson-quiz-opt w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 bg-white dark:bg-slate-800 text-xs sm:text-sm font-semibold transition-all font-cyrillic"
                            onclick="CurriculumEngine.checkLessonAnswer('${currentLesson.id}', 'mean', ${exIdx}, ${oIdx}, this)">
                      ${opt}
                    </button>
                  `).join('')}
                </div>
                <div id="lesson-why-${currentLesson.id}-mean-${exIdx}" class="hidden p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-xs text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
                  <strong>💡 Ngữ cảnh giao tiếp:</strong> ${ex.why}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Tier 3: Transformation Drills (2-3 Drills) -->
        ${transDrills.length > 0 ? `
          <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-purple-600 uppercase">Thang thực hành • Bậc 3 / 4</span>
                <h4 class="text-base font-bold text-slate-800 dark:text-white">10. Bài tập biến đổi cấu trúc (Transformation Drills — ${transDrills.length} bài):</h4>
              </div>
              <span class="text-xs text-slate-400 font-mono font-bold">Biến cách & Chuyển đổi</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${transDrills.map((td, tIdx) => `
                <div class="p-4 rounded-2xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-2">
                  <span class="text-[11px] font-bold text-purple-700 dark:text-purple-300 block">${tIdx + 1}. ${td.instruction}</span>
                  <p class="font-bold text-sm text-slate-800 dark:text-slate-200 font-cyrillic">${td.prompt}</p>
                  
                  <div class="pt-2 flex items-center justify-between">
                    <button class="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
                            onclick="document.getElementById('trans-ans-${currentLesson.id}-${tIdx}').classList.toggle('hidden')">
                      Xem đáp án mẫu ➔
                    </button>
                    <span id="trans-ans-${currentLesson.id}-${tIdx}" class="hidden text-sm font-bold text-emerald-600 font-cyrillic">
                      ${td.answer}
                    </span>
                  </div>
                  <span class="text-[11px] text-slate-400 block">${td.why}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Tier 4 & Point 10-13: Integrated Reading, Listening & Guided Production -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <!-- Reading Snippet -->
          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">11. Đoạn đọc ứng dụng (Чтение):</span>
            <p class="text-sm font-cyrillic text-slate-800 dark:text-slate-200 leading-relaxed font-bold">
              ${currentLesson.reading_snippet || 'Đoạn đọc mẫu đang được cập nhật.'}
            </p>
          </div>

          <!-- Listening Snippet with Interactive Replay -->
          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">12. Hội thoại luyện nghe (Аудио):</span>
              <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold"
                      onclick="RussianSpeech.speak('${currentLesson.listening_snippet || ''}')">
                🔊 Nghe (0.85x/1.0x)
              </button>
            </div>
            <p class="text-sm font-cyrillic text-slate-800 dark:text-slate-200 leading-relaxed italic">
              ${currentLesson.listening_snippet || 'Đoạn nghe đang được cập nhật.'}
            </p>
          </div>
        </div>

        <!-- Tier 4: Guided Micro-Production -->
        <div class="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800/60 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] font-bold text-blue-600 uppercase">Thang thực hành • Bậc 4 / 4</span>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white">13. Sản sinh ngôn ngữ có hướng dẫn (Guided Micro-Production Task):</h4>
            </div>
            <span class="text-xs text-blue-600 font-bold">Nói & Viết</span>
          </div>
          
          <div class="space-y-2 text-xs">
            <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span class="font-bold text-blue-600 block">🎙️ Luyện Nói (Speaking Production):</span>
              <p class="text-slate-700 dark:text-slate-300 mt-0.5">${currentLesson.speaking_prompt || 'Hãy nói 1 câu hoàn chỉnh áp dụng cấu trúc vừa học.'}</p>
            </div>

            <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span class="font-bold text-indigo-600 block">✍️ Luyện Viết (Writing Production):</span>
              <p class="text-slate-700 dark:text-slate-300 mt-0.5">${currentLesson.production_prompt || 'Hãy viết 2-3 câu áp dụng ngữ pháp của bài.'}</p>
            </div>
          </div>
        </div>

        <!-- Step 14: Mistake Remediation -->
        ${currentLesson.mistake_remediation ? `
          <div class="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-950 dark:text-amber-200 space-y-1">
            <strong>⚠️ 14. Lỗi sai phổ biến & Cách phòng tránh:</strong>
            <p>${currentLesson.mistake_remediation}</p>
          </div>
        ` : ''}

        <!-- Step 16 & 17: Complete Lesson & Unlock Next -->
        <div class="pt-6 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-xs text-slate-500">
            ${completedLessons[currentLesson.id] ? '✓ Bạn đã hoàn thành bài học này.' : 'Hoàn thành các bậc bài tập để đánh dấu tiến độ.'}
          </div>
          <button class="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-500/20 transition-all text-sm flex items-center justify-center gap-2"
                  onclick="CurriculumEngine.completeCurrentLesson()">
            <span>Hoàn thành bài học & Mở bài tiếp theo ✓</span>
          </button>
        </div>
      </div>
    `;
  }

  function checkLessonAnswer(lessonId, type, exIdx, oIdx, btnEl) {
    let currentLesson = null;
    for (const mod of curriculumData.modules) {
      const found = mod.lessons.find(l => l.id === lessonId);
      if (found) { currentLesson = found; break; }
    }
    if (!currentLesson) return;

    const list = type === 'mean' ? (currentLesson.meaningful_practice || []) : (currentLesson.controlled_practice || currentLesson.practice_exercises || []);
    const ex = list[exIdx];
    if (!ex) return;

    const parent = btnEl.closest('.space-y-2') || btnEl.closest('.space-y-3');
    const allBtns = parent.querySelectorAll('.lesson-quiz-opt');
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = oIdx === ex.correct;

    if (isCorrect) {
      btnEl.classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/40', 'text-emerald-700', 'font-bold');
      App.triggerConfetti();
      if (window.AdaptiveLearningOS) {
        AdaptiveLearningOS.dailyState.grammarDone = (AdaptiveLearningOS.dailyState.grammarDone || 0) + 1;
        AdaptiveLearningOS.saveDailyState();
      }
    } else {
      btnEl.classList.add('border-rose-500', 'bg-rose-50', 'dark:bg-rose-950/40', 'text-rose-700');
      allBtns[ex.correct].classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/40', 'text-emerald-700');

      if (window.AdaptiveLearningOS) {
        AdaptiveLearningOS.recordMistake({
          type: 'GRAMMAR_LESSON',
          question: ex.q,
          userAnswer: ex.options[oIdx],
          correctAnswer: ex.options[ex.correct],
          why: ex.why,
          lessonId: lessonId
        });
      }
    }

    const whyBox = document.getElementById(`lesson-why-${lessonId}-${type}-${exIdx}`);
    if (whyBox) whyBox.classList.remove('hidden');
  }

  function completeCurrentLesson() {
    completedLessons[activeLessonId] = {
      completedAt: new Date().toISOString(),
      score: 100
    };
    saveProgress();
    App.triggerConfetti();
    App.showToast('Chúc mừng bạn đã hoàn thành bài học! 🎉', 'success');

    let currentLesson = null;
    for (const mod of curriculumData.modules) {
      const found = mod.lessons.find(l => l.id === activeLessonId);
      if (found) { currentLesson = found; break; }
    }

    if (currentLesson && currentLesson.next_lesson_id) {
      selectLesson(currentLesson.next_lesson_id);
    } else {
      renderCurriculumOverview();
      renderActiveLesson();
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
