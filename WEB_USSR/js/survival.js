/**
 * WEB_USSR - Survival Russian (Русский для выживания)
 */
const SurvivalModule = (() => {
  let scenarios = [];
  let currentScenarioId = 'surv_shop';
  let searchTerm = '';

  async function init() {
    try {
      const resp = await fetch('data/survival_data.json');
      const data = await resp.json();
      scenarios = data.scenarios;
      currentScenarioId = scenarios[0]?.id || 'surv_shop';

      renderScenarioTabs();
      renderPhrases();
      setupSearch();
    } catch (e) {
      console.error('Failed to load survival data:', e);
    }
  }

  function renderScenarioTabs() {
    const container = document.getElementById('survival-scenario-tabs');
    if (!container) return;

    container.innerHTML = scenarios.map(sc => {
      const isActive = sc.id === currentScenarioId;
      return `
        <button class="px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
          isActive 
            ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
        }" onclick="SurvivalModule.selectScenario('${sc.id}')">
          <span class="text-base">${sc.icon}</span>
          <span>${sc.title.split('(')[0]}</span>
        </button>
      `;
    }).join('');
  }

  function selectScenario(id) {
    currentScenarioId = id;
    renderScenarioTabs();
    renderPhrases();
  }

  function setupSearch() {
    const searchInput = document.getElementById('survival-search-input');
    if (!searchInput) return;
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      renderPhrases();
    });
  }

  function renderPhrases() {
    const container = document.getElementById('survival-phrases-grid');
    if (!container) return;

    const scenario = scenarios.find(s => s.id === currentScenarioId);
    if (!scenario) return;

    let phrases = scenario.phrases;
    if (searchTerm) {
      phrases = phrases.filter(p => 
        p.ru.toLowerCase().includes(searchTerm) || 
        p.vi.toLowerCase().includes(searchTerm) ||
        p.phonetic.toLowerCase().includes(searchTerm)
      );
    }

    if (phrases.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          Không tìm thấy mẫu câu phù hợp với từ khóa "${searchTerm}".
        </div>
      `;
      return;
    }

    container.innerHTML = phrases.map(p => `
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between gap-3 hover:border-blue-400 transition-all">
        <div class="space-y-1">
          <div class="flex items-start justify-between gap-2">
            <h4 class="font-bold text-base sm:text-lg text-slate-800 dark:text-white font-cyrillic">${p.ru}</h4>
            <button class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors flex-shrink-0"
                    onclick="RussianSpeech.speak('${p.ru}')">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            </button>
          </div>
          <p class="text-xs text-blue-600 dark:text-blue-400 font-mono">${p.phonetic}</p>
        </div>
        <p class="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700/60">
          ${p.vi}
        </p>
      </div>
    `).join('');
  }

  return {
    init,
    selectScenario
  };
})();

window.SurvivalModule = SurvivalModule;
