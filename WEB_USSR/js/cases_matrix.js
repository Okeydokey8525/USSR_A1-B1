/**
 * WEB_USSR - Interactive 6 Russian Cases Matrix (Падежи)
 */
const CasesMatrixModule = (() => {
  let casesData = [];
  let pronounsData = [];
  let interactiveWords = [];
  let currentCaseId = 1;

  async function init() {
    try {
      const resp = await fetch('data/cases_rules.json');
      const data = await resp.json();
      casesData = data.cases;
      pronounsData = data.pronouns_declension;
      interactiveWords = data.interactive_words;

      setupCaseTabs();
      setupWordSelector();
      renderCurrentCase(1);
      renderPronounsTable();
      renderSelectedWordDeclension(interactiveWords[0]);
    } catch (e) {
      console.error('Failed to load cases data:', e);
    }
  }

  function setupCaseTabs() {
    const tabs = document.querySelectorAll('.case-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const caseId = parseInt(tab.dataset.case);
        tabs.forEach(t => {
          t.classList.remove('active', 'bg-blue-600', 'text-white', 'shadow-md');
          t.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        });
        tab.classList.add('active', 'bg-blue-600', 'text-white', 'shadow-md');
        tab.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        currentCaseId = caseId;
        renderCurrentCase(caseId);
      });
    });
  }

  function renderCurrentCase(caseId) {
    const caseItem = casesData.find(c => c.id === caseId);
    if (!caseItem) return;

    const container = document.getElementById('case-detail-container');
    if (!container) return;

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-700">
          <div>
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-2xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                P${caseItem.id}
              </span>
              <div>
                <h3 class="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white font-cyrillic">${caseItem.name_ru}</h3>
                <p class="text-sm font-semibold text-blue-600 dark:text-blue-400">${caseItem.name_vi}</p>
              </div>
            </div>
          </div>
          <div class="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/60 rounded-xl px-4 py-2">
            <span class="text-xs text-slate-500 dark:text-slate-400 block font-medium">Câu hỏi đặc trưng:</span>
            <span class="font-bold text-blue-700 dark:text-blue-300 text-base font-cyrillic">${caseItem.question}</span>
          </div>
        </div>

        <!-- Function & Prepositions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
            <h5 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Chức năng & Ngữ nghĩa cốt lõi
            </h5>
            <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${caseItem.function}</p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
            <h5 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
              Giới từ đi kèm (Предлоги)
            </h5>
            <p class="text-sm font-semibold text-amber-700 dark:text-amber-300 leading-relaxed font-cyrillic">${caseItem.prepositions}</p>
          </div>
        </div>

        <!-- Endings Table -->
        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">Quy tắc đuôi biến cách (Окончания)</h4>
          <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th class="p-3">Loại từ</th>
                  <th class="p-3 text-blue-600 dark:text-blue-400">Giống đực (он)</th>
                  <th class="p-3 text-rose-600 dark:text-rose-400">Giống cái (она)</th>
                  <th class="p-3 text-emerald-600 dark:text-emerald-400">Giống trung (оно)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60 font-mono text-xs sm:text-sm">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td class="p-3 font-sans font-bold text-slate-700 dark:text-slate-200">Danh từ số ít</td>
                  <td class="p-3 text-blue-700 dark:text-blue-300 font-bold">${caseItem.endings.noun_sg.masc}</td>
                  <td class="p-3 text-rose-700 dark:text-rose-300 font-bold">${caseItem.endings.noun_sg.fem}</td>
                  <td class="p-3 text-emerald-700 dark:text-emerald-300 font-bold">${caseItem.endings.noun_sg.neut}</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td class="p-3 font-sans font-bold text-slate-700 dark:text-slate-200">Danh từ số nhiều</td>
                  <td class="p-3 text-blue-700 dark:text-blue-300 font-bold" colspan="${typeof caseItem.endings.noun_pl === 'string' ? 3 : 1}">${typeof caseItem.endings.noun_pl === 'string' ? caseItem.endings.noun_pl : caseItem.endings.noun_pl.masc}</td>
                  ${typeof caseItem.endings.noun_pl === 'object' ? `
                    <td class="p-3 text-rose-700 dark:text-rose-300 font-bold">${caseItem.endings.noun_pl.fem}</td>
                    <td class="p-3 text-emerald-700 dark:text-emerald-300 font-bold">${caseItem.endings.noun_pl.neut || caseItem.endings.noun_pl.inanimate || ''}</td>
                  ` : ''}
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td class="p-3 font-sans font-bold text-slate-700 dark:text-slate-200">Tính từ số ít</td>
                  <td class="p-3 text-purple-700 dark:text-purple-300 font-bold">${caseItem.endings.adj_sg.masc}</td>
                  <td class="p-3 text-purple-700 dark:text-purple-300 font-bold">${caseItem.endings.adj_sg.fem}</td>
                  <td class="p-3 text-purple-700 dark:text-purple-300 font-bold">${caseItem.endings.adj_sg.neut}</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td class="p-3 font-sans font-bold text-slate-700 dark:text-slate-200">Tính từ số nhiều</td>
                  <td class="p-3 text-purple-700 dark:text-purple-300 font-bold" colspan="3">${typeof caseItem.endings.adj_pl === 'string' ? caseItem.endings.adj_pl : `${caseItem.endings.adj_pl.inanimate} (vật) / ${caseItem.endings.adj_pl.animate} (người)`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Example Sentences -->
        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">Ví dụ thực tế</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${caseItem.examples.map(ex => `
              <div class="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800/40 flex items-center justify-between">
                <div>
                  <p class="font-bold text-slate-800 dark:text-white font-cyrillic text-sm">${ex.ru}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${ex.vi}</p>
                </div>
                <button class="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors flex-shrink-0 ml-2"
                        onclick="RussianSpeech.speak('${ex.ru}')" title="Nghe câu này">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function setupWordSelector() {
    const select = document.getElementById('declension-word-select');
    if (!select) return;

    select.innerHTML = interactiveWords.map(w => `
      <option value="${w.word}">${w.word} (${w.meaning} - ${w.gender})</option>
    `).join('');

    select.addEventListener('change', () => {
      const selectedWord = interactiveWords.find(w => w.word === select.value);
      if (selectedWord) {
        renderSelectedWordDeclension(selectedWord);
      }
    });
  }

  function renderSelectedWordDeclension(wordObj) {
    const container = document.getElementById('word-declension-result');
    if (!container || !wordObj) return;

    const caseNames = [
      'Cách 1 (Именительный)',
      'Cách 2 (Родительный)',
      'Cách 3 (Дательный)',
      'Cách 4 (Винительный)',
      'Cách 5 (Творительный)',
      'Cách 6 (Предложный)'
    ];

    container.innerHTML = `
      <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        <div class="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span class="text-xl font-bold text-blue-600 dark:text-blue-400 font-cyrillic">${wordObj.word}</span>
            <span class="text-xs ml-2 text-slate-500 font-medium">${wordObj.meaning} • Giống: ${wordObj.gender}</span>
          </div>
          <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  onclick="RussianSpeech.speak('${wordObj.word}')">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            Phát âm
          </button>
        </div>
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th class="p-3">Cách</th>
              <th class="p-3">Số ít (Единственное число)</th>
              <th class="p-3">Số nhiều (Множественное число)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60 font-mono text-sm">
            ${caseNames.map((name, idx) => `
              <tr class="hover:bg-blue-50/40 dark:hover:bg-slate-700/30">
                <td class="p-3 font-sans font-bold text-slate-700 dark:text-slate-300 text-xs">${name}</td>
                <td class="p-3 text-blue-600 dark:text-blue-400 font-bold font-cyrillic">
                  <span class="cursor-pointer hover:underline" onclick="RussianSpeech.speak('${wordObj.forms.sg[idx]}')">${wordObj.forms.sg[idx]}</span>
                </td>
                <td class="p-3 text-emerald-600 dark:text-emerald-400 font-bold font-cyrillic">
                  <span class="cursor-pointer hover:underline" onclick="RussianSpeech.speak('${wordObj.forms.pl[idx]}')">${wordObj.forms.pl[idx]}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderPronounsTable() {
    const container = document.getElementById('pronouns-declension-table');
    if (!container) return;

    container.innerHTML = `
      <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        <table class="w-full text-left text-xs sm:text-sm">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th class="p-3">Đại từ gốc</th>
              <th class="p-3">C1 (Nom)</th>
              <th class="p-3">C2 (Gen)</th>
              <th class="p-3">C3 (Dat)</th>
              <th class="p-3">C4 (Acc)</th>
              <th class="p-3">C5 (Inst)</th>
              <th class="p-3">C6 (Prep)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60 font-mono">
            ${pronounsData.map(p => `
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                <td class="p-3 font-sans font-bold text-slate-800 dark:text-white">${p.base}</td>
                <td class="p-3 font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline" onclick="RussianSpeech.speak('${p.nom}')">${p.nom}</td>
                <td class="p-3 text-slate-700 dark:text-slate-300 cursor-pointer hover:underline" onclick="RussianSpeech.speak('${p.gen}')">${p.gen}</td>
                <td class="p-3 text-slate-700 dark:text-slate-300 cursor-pointer hover:underline" onclick="RussianSpeech.speak('${p.dat}')">${p.dat}</td>
                <td class="p-3 text-slate-700 dark:text-slate-300 cursor-pointer hover:underline" onclick="RussianSpeech.speak('${p.acc}')">${p.acc}</td>
                <td class="p-3 text-slate-700 dark:text-slate-300 cursor-pointer hover:underline" onclick="RussianSpeech.speak('${p.inst.split(' / ')[0]}')">${p.inst}</td>
                <td class="p-3 text-slate-700 dark:text-slate-300 cursor-pointer hover:underline" onclick="RussianSpeech.speak('${p.prep}')">${p.prep}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  return {
    init,
    renderCurrentCase
  };
})();

window.CasesMatrixModule = CasesMatrixModule;
