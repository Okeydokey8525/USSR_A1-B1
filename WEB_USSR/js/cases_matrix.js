/**
 * WEB_USSR - Progressive Case Trainer (Падежи русского языка)
 * Method: Meaning & Trigger Questions FIRST, Endings SECOND.
 */
const CasesMatrixModule = (() => {
  let casesData = null;
  let activeCaseId = 1; // 1 to 6
  let activeWordIndex = 0;

  async function init() {
    try {
      const resp = await fetch('data/cases_rules.json');
      casesData = await resp.json();

      setupCaseButtons();
      renderCaseOverview();
      renderDeclensionTable();
      renderInteractiveWordDeclension();
      renderPronounsTable();
    } catch (e) {
      console.error('Failed to load cases data:', e);
    }
  }

  function setupCaseButtons() {
    const container = document.getElementById('case-selector-tabs');
    if (!container || !casesData || !casesData.cases) return;

    container.innerHTML = casesData.cases.map(c => {
      const isActive = c.id === activeCaseId;
      const questionText = c.question || c.questions || '';
      return `
        <button class="px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold flex flex-col items-start gap-1 transition-all ${
          isActive 
            ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
        }" onclick="CasesMatrixModule.selectCase(${c.id})">
          <div class="flex items-center justify-between w-full">
            <span>Cách ${c.id}: ${c.name_vi.split('-')[0].trim()}</span>
            <span class="text-[10px] opacity-75 font-cyrillic font-normal">${c.name_ru.split('(')[0].trim()}</span>
          </div>
          <span class="text-[11px] font-mono opacity-80 truncate w-full text-left ${isActive ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'}">
            ${questionText}
          </span>
        </button>
      `;
    }).join('');
  }

  function selectCase(id) {
    activeCaseId = id;
    setupCaseButtons();
    renderCaseOverview();
    renderDeclensionTable();
  }

  function renderCaseOverview() {
    const container = document.getElementById('case-overview-panel');
    if (!container || !casesData || !casesData.cases) return;

    const currentCase = casesData.cases.find(c => c.id === activeCaseId);
    if (!currentCase) return;

    const questionText = currentCase.question || currentCase.questions || '';

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-700">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                Cách ${currentCase.id}
              </span>
              <span class="text-xs text-slate-400 font-cyrillic font-bold">${currentCase.name_ru}</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">${currentCase.name_vi}</h3>
          </div>
          <div class="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 text-xs">
            <span class="text-slate-400 block">Câu hỏi kích hoạt:</span>
            <span class="font-bold text-blue-700 dark:text-blue-300 font-cyrillic text-sm">${questionText}</span>
          </div>
        </div>

        <!-- Triggers and Usage -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Ý nghĩa ngữ pháp & Giới từ đi kèm:</h4>
          <p class="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">${currentCase.function || currentCase.usage_vi || ''}</p>
          <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs font-mono text-blue-600 dark:text-blue-400">
            Giới từ thường gặp: <strong>${currentCase.prepositions || 'Không có giới từ riêng'}</strong>
          </div>
        </div>

        <!-- Examples -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Ví dụ mẫu câu thực tế:</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${(currentCase.examples || []).map(ex => `
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span class="font-bold text-slate-800 dark:text-white font-cyrillic text-sm block">${ex.ru}</span>
                  <span class="text-xs text-slate-500 dark:text-slate-400">${ex.vi}</span>
                </div>
                <button class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors flex-shrink-0 ml-2"
                        onclick="RussianSpeech.speak('${ex.ru}')">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderDeclensionTable() {
    const container = document.getElementById('declension-endings-table');
    if (!container || !casesData || !casesData.cases) return;

    const currentCase = casesData.cases.find(c => c.id === activeCaseId);
    if (!currentCase || !currentCase.endings) return;

    const e = currentCase.endings;
    const nSg = e.noun_sg || {};
    const nPl = e.noun_pl || {};

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h4 class="text-sm font-bold uppercase tracking-wider text-slate-400">Bảng quy tắc đuôi biến cách (Окончания):</h4>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-700 text-slate-400">
                <th class="pb-3 font-bold">Giống danh từ</th>
                <th class="pb-3 font-bold font-cyrillic">Số ít (Единственное число)</th>
                <th class="pb-3 font-bold font-cyrillic">Số nhiều (Множественное число)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60 font-cyrillic text-slate-800 dark:text-slate-200">
              <tr>
                <td class="py-3.5 font-bold font-sans text-blue-600">Giống đực (Мужской род)</td>
                <td class="py-3.5 font-bold text-blue-700 dark:text-blue-400">${nSg.masc || nSg.animate || '-'}</td>
                <td class="py-3.5">${nPl.masc || nPl.animate || '-'}</td>
              </tr>
              <tr>
                <td class="py-3.5 font-bold font-sans text-rose-600">Giống cái (Женский род)</td>
                <td class="py-3.5 font-bold text-rose-700 dark:text-rose-400">${nSg.fem || '-'}</td>
                <td class="py-3.5">${nPl.fem || nPl.inanimate || '-'}</td>
              </tr>
              <tr>
                <td class="py-3.5 font-bold font-sans text-emerald-600">Giống trung (Средний род)</td>
                <td class="py-3.5 font-bold text-emerald-700 dark:text-emerald-400">${nSg.neut || '-'}</td>
                <td class="py-3.5">${nPl.neut || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderInteractiveWordDeclension() {
    const container = document.getElementById('interactive-word-declension-panel');
    if (!container || !casesData || !casesData.interactive_words) return;

    const words = casesData.interactive_words;
    const activeWord = words[activeWordIndex] || words[0];
    if (!activeWord) return;

    const caseNames = [
      "Cách 1 (Chủ cách - Nom)",
      "Cách 2 (Sinh cách - Gen)",
      "Cách 3 (Dữ cách - Dat)",
      "Cách 4 (Đối cách - Acc)",
      "Cách 5 (Tạo cách - Inst)",
      "Cách 6 (Giới cách - Prep)"
    ];

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600">Công cụ biến cách động</span>
            <h4 class="text-lg font-bold text-slate-900 dark:text-white">Tra cứu đầy đủ 6 cách của một từ cụ thể</h4>
          </div>
          
          <select id="case-word-select" class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-cyrillic font-bold text-sm text-slate-800 dark:text-slate-200"
                  onchange="CasesMatrixModule.selectInteractiveWord(parseInt(this.value, 10))">
            ${words.map((w, idx) => `<option value="${idx}" ${idx === activeWordIndex ? 'selected' : ''}>${w.word} (${w.meaning})</option>`).join('')}
          </select>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          ${[0, 1, 2, 3, 4, 5].map(idx => {
            const formSg = activeWord.forms?.sg?.[idx] || '-';
            const formPl = activeWord.forms?.pl?.[idx] || '-';
            return `
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-2">
                <span class="text-[11px] font-bold text-slate-400 block">${caseNames[idx]}</span>
                <div>
                  <span class="text-[10px] text-slate-400 block">Số ít:</span>
                  <h5 class="text-base font-bold text-blue-600 dark:text-blue-400 font-cyrillic">${formSg}</h5>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 block">Số nhiều:</span>
                  <h5 class="text-sm font-semibold text-slate-700 dark:text-slate-300 font-cyrillic">${formPl}</h5>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function selectInteractiveWord(index) {
    activeWordIndex = index;
    renderInteractiveWordDeclension();
  }

  function renderPronounsTable() {
    const container = document.getElementById('pronouns-declension-table');
    if (!container || !casesData || !casesData.pronouns_declension) return;

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h4 class="text-sm font-bold uppercase tracking-wider text-slate-400">Bảng biến cách đại từ nhân xưng (Местоимения):</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs sm:text-sm font-cyrillic">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-sans">
                <th class="pb-3 font-bold">Đại từ (N)</th>
                <th class="pb-3 font-bold">C.2 (Gen)</th>
                <th class="pb-3 font-bold">C.3 (Dat)</th>
                <th class="pb-3 font-bold">C.4 (Acc)</th>
                <th class="pb-3 font-bold">C.5 (Inst)</th>
                <th class="pb-3 font-bold">C.6 (Prep)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-800 dark:text-slate-200">
              ${casesData.pronouns_declension.map(p => `
                <tr>
                  <td class="py-3 font-bold text-blue-600">${p.nom}</td>
                  <td class="py-3">${p.gen}</td>
                  <td class="py-3">${p.dat}</td>
                  <td class="py-3">${p.acc}</td>
                  <td class="py-3">${p.inst}</td>
                  <td class="py-3">${p.prep}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  return {
    init,
    selectCase,
    selectInteractiveWord
  };
})();

window.CasesMatrixModule = CasesMatrixModule;
