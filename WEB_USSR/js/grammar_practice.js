/**
 * WEB_USSR - Grammar, Verb Aspects & Motion Verbs Practice
 */
const GrammarPracticeModule = (() => {
  let grammarData = null;
  let activeTab = 'aspects'; // 'aspects', 'motion', 'cases_quiz'

  async function init() {
    try {
      const resp = await fetch('data/verbs_aspects.json');
      grammarData = await resp.json();

      setupSubTabs();
      renderAspectsView();
      renderMotionVerbsView();
      renderPrefixesView();
    } catch (e) {
      console.error('Failed to load verbs/aspects data:', e);
    }
  }

  function setupSubTabs() {
    const btns = document.querySelectorAll('.grammar-subtab-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('active', 'bg-blue-600', 'text-white');
          b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        });
        btn.classList.add('active', 'bg-blue-600', 'text-white');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        activeTab = btn.dataset.tab;
        
        document.getElementById('grammar-panel-aspects')?.classList.toggle('hidden', activeTab !== 'aspects');
        document.getElementById('grammar-panel-motion')?.classList.toggle('hidden', activeTab !== 'motion');
        document.getElementById('grammar-panel-prefixes')?.classList.toggle('hidden', activeTab !== 'prefixes');
      });
    });
  }

  function renderAspectsView() {
    const container = document.getElementById('aspect-pairs-container');
    if (!container || !grammarData) return;

    container.innerHTML = grammarData.aspect_pairs.map(pair => `
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <span class="text-xs font-bold text-slate-400">Ý nghĩa: ${pair.meaning}</span>
          <span class="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-cyrillic">Cặp thể</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- NSV -->
          <div class="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">НСВ (Chưa hoàn thành)</span>
              <button class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                      onclick="RussianSpeech.speak('${pair.nsv}')">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              </button>
            </div>
            <h5 class="text-lg font-bold text-slate-800 dark:text-white font-cyrillic">${pair.nsv}</h5>
            <p class="text-xs text-slate-500 dark:text-slate-400">${pair.nsv_usage}</p>
          </div>

          <!-- SV -->
          <div class="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">СВ (Hoàn thành)</span>
              <button class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                      onclick="RussianSpeech.speak('${pair.sv}')">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              </button>
            </div>
            <h5 class="text-lg font-bold text-slate-800 dark:text-white font-cyrillic">${pair.sv}</h5>
            <p class="text-xs text-slate-500 dark:text-slate-400">${pair.sv_usage}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderMotionVerbsView() {
    const container = document.getElementById('motion-verbs-container');
    if (!container || !grammarData) return;

    container.innerHTML = grammarData.motion_verbs.map(m => `
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <span class="text-xs font-bold text-slate-400">Ý nghĩa: ${m.meaning}</span>
          <span class="text-xs font-semibold text-slate-500">${m.vehicle ? 'Bằng phương tiện 🚗' : 'Bằng chân (đi bộ) 🚶'}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- Unidirectional -->
          <div class="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-1">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">Một chiều (Đang đi về 1 hướng ➔)</span>
            <div class="flex items-center justify-between">
              <h5 class="text-lg font-bold text-slate-800 dark:text-white font-cyrillic">${m.unidirectional}</h5>
              <button class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center" onclick="RussianSpeech.speak('${m.unidirectional}')">🔊</button>
            </div>
            <p class="text-xs text-slate-500">${m.uni_example}</p>
          </div>

          <!-- Multidirectional -->
          <div class="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 space-y-1">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">Đa chiều (Đi lại thường xuyên / 2 chiều ⇄)</span>
            <div class="flex items-center justify-between">
              <h5 class="text-lg font-bold text-slate-800 dark:text-white font-cyrillic">${m.multidirectional}</h5>
              <button class="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center" onclick="RussianSpeech.speak('${m.multidirectional}')">🔊</button>
            </div>
            <p class="text-xs text-slate-500">${m.multi_example}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderPrefixesView() {
    const container = document.getElementById('directional-prefixes-container');
    if (!container || !grammarData) return;

    container.innerHTML = grammarData.prefixes.map(p => `
      <div class="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-start justify-between gap-3">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-lg font-extrabold text-blue-600 dark:text-blue-400 font-cyrillic">${p.prefix}</span>
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">${p.meaning_vi}</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-cyrillic">
            Ví dụ: <strong>${p.example_ru}</strong> (${p.example_vi})
          </p>
        </div>
        <button class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors flex-shrink-0"
                onclick="RussianSpeech.speak('${p.example_ru}')">
          🔊
        </button>
      </div>
    `).join('');
  }

  return {
    init
  };
})();

window.GrammarPracticeModule = GrammarPracticeModule;
