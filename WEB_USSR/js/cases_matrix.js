/**
 * WEB_USSR - Progressive Case Trainer (Падежи русского языка)
 * Method: Meaning & Trigger Questions FIRST, Endings SECOND.
 * Gender Agreement Chain: Noun Gender -> Pronoun -> Possessive -> Adjective -> Past Tense -> Case Endings.
 */
const CasesMatrixModule = (() => {
  let casesData = null;
  let activeCaseId = 1; // 1 to 6
  let activeWordIndex = 0;
  let activeGenderKey = 'masc'; // 'masc', 'fem', 'neut', 'pl'

  const genderChainsData = {
    masc: {
      title: "Giống Đực (Мужской род — ОН)",
      noun: "дом (ngôi nhà)",
      pronoun: "он",
      possessive: "мой дом (nhà của tôi)",
      adjective: "но́вый дом (ngôi nhà mới)",
      past_tense: "дом стоя́л (ngôi nhà đã đứng đó)",
      case_sample: "в но́вом до́ме (trong ngôi nhà mới - C6)"
    },
    fem: {
      title: "Giống Cái (Женский род — ОНА)",
      noun: "кни́га (quyển sách)",
      pronoun: "она́",
      possessive: "моя́ кни́га (sách của tôi)",
      adjective: "но́вая кни́га (quyển sách mới)",
      past_tense: "кни́га лежа́ла (quyển sách đã nằm ở đó)",
      case_sample: "в но́вой кни́ге (trong quyển sách mới - C6)"
    },
    neut: {
      title: "Giống Trung (Средний род — ОНО)",
      noun: "окно́ (cửa sổ)",
      pronoun: "оно́",
      possessive: "моё окно́ (cửa sổ của tôi)",
      adjective: "но́вое окно́ (cửa sổ mới)",
      past_tense: "окно́ стоя́ло (cửa sổ đã mở)",
      case_sample: "на но́вом окне́ (trên cửa sổ mới - C6)"
    },
    pl: {
      title: "Số Nhiều (Множественное число — ОНИ)",
      noun: "дома́ / кни́ги / о́кна",
      pronoun: "они́",
      possessive: "мои́ кни́ги (sách của tôi)",
      adjective: "но́вые кни́ги (những cuốn sách mới)",
      past_tense: "кни́ги лежа́ли (những cuốn sách đã nằm đó)",
      case_sample: "в но́вых кни́гах (trong các cuốn sách mới - C6)"
    }
  };

  async function init() {
    try {
      const resp = await fetch('data/cases_rules.json');
      casesData = await resp.json();

      setupCaseButtons();
      renderCaseOverview();
      renderDeclensionTable();
      renderGenderAgreementChain();
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
      const questionText = c.trigger_question || c.question || c.questions || '';
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

    const questionText = currentCase.trigger_question || currentCase.question || currentCase.questions || '';

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
          <div class="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm">
            <span class="text-slate-500 dark:text-slate-400 block font-bold uppercase text-[10px]">Câu hỏi kích hoạt:</span>
            <span class="font-extrabold text-blue-700 dark:text-blue-300 font-cyrillic text-base sm:text-lg">${questionText}</span>
          </div>
        </div>

        <!-- Pedagogical Rationale & Triggers -->
        <div class="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs sm:text-sm text-amber-950 dark:text-amber-200 space-y-1">
          <strong>🎯 Nguyên tắc nhận diện & Ý nghĩa giao tiếp:</strong>
          <p>${currentCase.communicative_role || currentCase.usage_vi || ''}</p>
          <p class="text-xs font-bold text-amber-800 dark:text-amber-300 pt-1">👉 Quy tắc vàng: ${currentCase.pedagogical_rule || ''}</p>
        </div>

        <div class="space-y-3">
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
                  🔊
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

  function renderGenderAgreementChain() {
    let container = document.getElementById('gender-agreement-chain-panel');
    if (!container) {
      // Create and insert before interactive word declension if not present in html
      const table = document.getElementById('declension-endings-table');
      if (table && table.parentNode) {
        container = document.createElement('div');
        container.id = 'gender-agreement-chain-panel';
        table.parentNode.insertBefore(container, table.nextSibling);
      } else {
        return;
      }
    }

    const currentChain = genderChainsData[activeGenderKey];

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 mt-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600">Gender System: Chuỗi liên kết Giống</span>
            <h4 class="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Hòa hợp có hệ thống: Giống ➔ Đại từ ➔ Sở hữu ➔ Tính từ ➔ Quá khứ ➔ Biến cách
            </h4>
          </div>

          <div class="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button class="px-3 py-1.5 rounded-xl transition-all ${activeGenderKey === 'masc' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}"
                    onclick="CasesMatrixModule.selectGenderChain('masc')">Giống đực (ОН)</button>
            <button class="px-3 py-1.5 rounded-xl transition-all ${activeGenderKey === 'fem' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}"
                    onclick="CasesMatrixModule.selectGenderChain('fem')">Giống cái (ОНА)</button>
            <button class="px-3 py-1.5 rounded-xl transition-all ${activeGenderKey === 'neut' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}"
                    onclick="CasesMatrixModule.selectGenderChain('neut')">Giống trung (ОНО)</button>
            <button class="px-3 py-1.5 rounded-xl transition-all ${activeGenderKey === 'pl' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}"
                    onclick="CasesMatrixModule.selectGenderChain('pl')">Số nhiều (ОНИ)</button>
          </div>
        </div>

        <!-- 5-Step Visual Chain Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-center">
          <!-- Step 1: Noun -->
          <div class="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-1">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">1. Danh từ (Существительное)</span>
            <h5 class="text-base font-bold text-blue-700 dark:text-blue-300 font-cyrillic">${currentChain.noun}</h5>
          </div>

          <!-- Step 2: Pronoun -->
          <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 space-y-1">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">2. Đại từ nhân xưng</span>
            <h5 class="text-base font-bold text-indigo-700 dark:text-indigo-300 font-cyrillic">${currentChain.pronoun}</h5>
          </div>

          <!-- Step 3: Possessive & Adjective -->
          <div class="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 space-y-1">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">3. Sở hữu & Tính từ</span>
            <h5 class="text-sm font-bold text-purple-700 dark:text-purple-300 font-cyrillic">${currentChain.possessive}</h5>
            <span class="text-xs font-semibold text-slate-600 dark:text-slate-400 font-cyrillic block">${currentChain.adjective}</span>
          </div>

          <!-- Step 4: Past Tense -->
          <div class="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 space-y-1">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">4. Động từ quá khứ</span>
            <h5 class="text-sm font-bold text-amber-700 dark:text-amber-300 font-cyrillic">${currentChain.past_tense}</h5>
          </div>

          <!-- Step 5: Case Sample -->
          <div class="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">5. Đuôi biến cách mẫu</span>
            <h5 class="text-sm font-bold text-emerald-700 dark:text-emerald-300 font-cyrillic">${currentChain.case_sample}</h5>
          </div>
        </div>
      </div>
    `;
  }

  function selectGenderChain(key) {
    activeGenderKey = key;
    renderGenderAgreementChain();
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
    selectGenderChain,
    selectInteractiveWord
  };
})();

window.CasesMatrixModule = CasesMatrixModule;
