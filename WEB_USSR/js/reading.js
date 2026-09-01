/**
 * WEB_USSR - Reading Lab (Лаборатория чтения)
 */
const ReadingModule = (() => {
  let readingTexts = [];
  let currentLevel = 'all';
  let activeTextId = null;

  async function init() {
    try {
      const resp = await fetch('data/reading_data.json');
      const data = await resp.json();
      readingTexts = data.texts;
      activeTextId = readingTexts[0]?.id || null;

      setupLevelFilters();
      renderTextList();
      renderActiveText();
    } catch (e) {
      console.error('Failed to load reading data:', e);
    }
  }

  function setupLevelFilters() {
    const btns = document.querySelectorAll('.reading-level-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('active', 'bg-blue-600', 'text-white');
          b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        });
        btn.classList.add('active', 'bg-blue-600', 'text-white');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        currentLevel = btn.dataset.level;
        renderTextList();
      });
    });
  }

  function renderTextList() {
    const listContainer = document.getElementById('reading-texts-list');
    if (!listContainer) return;

    let filtered = readingTexts;
    if (currentLevel !== 'all') {
      filtered = readingTexts.filter(t => t.level === currentLevel);
    }

    listContainer.innerHTML = filtered.map(t => {
      const isActive = t.id === activeTextId;
      return `
        <button class="w-full text-left p-4 rounded-2xl border transition-all ${
          isActive 
            ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-800 dark:text-slate-200'
        }" onclick="ReadingModule.selectText('${t.id}')">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-extrabold px-2 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'}">
              ${t.level}
            </span>
            <span class="text-xs opacity-75">${t.category}</span>
          </div>
          <h4 class="font-bold text-sm truncate">${t.title}</h4>
        </button>
      `;
    }).join('');
  }

  function selectText(id) {
    activeTextId = id;
    renderTextList();
    renderActiveText();
  }

  function renderActiveText() {
    const container = document.getElementById('reading-active-content');
    if (!container) return;

    const item = readingTexts.find(t => t.id === activeTextId);
    if (!item) return;

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-700">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">${item.level}</span>
              <span class="text-xs text-slate-400 font-medium">${item.category}</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">${item.title}</h3>
          </div>
          <button class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-colors flex-shrink-0"
                  onclick="RussianSpeech.speak('${item.audio_text}')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            Nghe phát âm chuẩn
          </button>
        </div>

        <!-- Russian Passage -->
        <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 space-y-4">
          <p class="text-base sm:text-lg font-bold text-slate-800 dark:text-white font-cyrillic leading-relaxed whitespace-pre-line">
            ${item.content_ru}
          </p>
          <div class="pt-3 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic">
            <strong>Bản dịch:</strong> ${item.content_vi}
          </div>
        </div>

        <!-- Vocabulary Highlights -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Từ vựng trọng tâm bài đọc</h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            ${item.vocab_highlights.map(v => `
              <div class="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                <div>
                  <span class="font-bold text-blue-700 dark:text-blue-300 font-cyrillic text-sm block">${v.word}</span>
                  <span class="text-xs text-slate-500 dark:text-slate-400">${v.meaning}</span>
                </div>
                <button class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                        onclick="RussianSpeech.speak('${v.word}')">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Comprehension Questions -->
        <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <h4 class="text-base font-bold text-slate-800 dark:text-white">Câu hỏi kiểm tra đọc hiểu (Вопросы к тексту)</h4>
          ${item.questions.map((q, qIdx) => `
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
              <p class="font-bold text-sm text-slate-800 dark:text-slate-200 font-cyrillic">${qIdx + 1}. ${q.q}</p>
              <div class="space-y-2">
                ${q.options.map((opt, oIdx) => `
                  <button class="reading-q-opt w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 bg-white dark:bg-slate-800 text-xs sm:text-sm font-medium transition-all"
                          onclick="ReadingModule.checkAnswer('${item.id}', ${qIdx}, ${oIdx}, this)">
                    ${opt}
                  </button>
                `).join('')}
              </div>
              <div id="reading-why-${item.id}-${qIdx}" class="hidden p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-xs text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                <strong>💡 Giải thích:</strong> ${q.why}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function checkAnswer(textId, qIdx, oIdx, btnEl) {
    const item = readingTexts.find(t => t.id === textId);
    if (!item) return;

    const q = item.questions[qIdx];
    const parent = btnEl.closest('.space-y-3');
    const allBtns = parent.querySelectorAll('.reading-q-opt');
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = oIdx === q.correct;
    if (isCorrect) {
      btnEl.classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/40', 'text-emerald-700', 'font-bold');
      App.triggerConfetti();
      if (window.AdaptiveLearningOS) {
        AdaptiveLearningOS.dailyState.readingDone++;
        AdaptiveLearningOS.saveDailyState();
      }
    } else {
      btnEl.classList.add('border-rose-500', 'bg-rose-50', 'dark:bg-rose-950/40', 'text-rose-700');
      allBtns[q.correct].classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/40', 'text-emerald-700', 'font-bold');
    }

    const whyEl = document.getElementById(`reading-why-${textId}-${qIdx}`);
    if (whyEl) whyEl.classList.remove('hidden');
  }

  return {
    init,
    selectText,
    checkAnswer
  };
})();

window.ReadingModule = ReadingModule;
