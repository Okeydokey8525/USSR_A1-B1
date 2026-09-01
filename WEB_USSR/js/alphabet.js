/**
 * WEB_USSR - Russian Alphabet & Phonetics Module
 */
const AlphabetModule = (() => {
  let alphabetData = [];
  let phoneticRules = [];
  let currentFilter = 'all';

  async function init() {
    try {
      const resp = await fetch('data/russian_alphabet.json');
      const data = await resp.json();
      alphabetData = data.letters;
      phoneticRules = data.phonetic_rules;
      renderAlphabet();
      renderPhoneticRules();
      setupEventListeners();
    } catch (e) {
      console.error('Failed to load alphabet data:', e);
    }
  }

  function setupEventListeners() {
    const filterBtns = document.querySelectorAll('.alphabet-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active', 'bg-blue-600', 'text-white'));
        filterBtns.forEach(b => b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300'));
        btn.classList.add('active', 'bg-blue-600', 'text-white');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        currentFilter = btn.dataset.filter;
        renderAlphabet();
      });
    });
  }

  function getBadgeClass(type) {
    if (type.includes('vowel')) return 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    if (type.includes('consonant')) return 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
  }

  function getTypeLabel(type) {
    if (type === 'vowel') return 'Nguyên âm';
    if (type === 'vowel_iotated') return 'Nguyên âm Iot hóa';
    if (type === 'consonant_voiced') return 'Phụ âm hữu thanh';
    if (type === 'consonant_voiceless') return 'Phụ âm vô thanh';
    if (type === 'consonant_voiced_hard') return 'Phụ âm hữu thanh (luôn cứng)';
    if (type === 'consonant_voiceless_hard') return 'Phụ âm vô thanh (luôn cứng)';
    if (type === 'consonant_voiceless_soft') return 'Phụ âm vô thanh (luôn mềm)';
    if (type === 'semivowel') return 'Bán nguyên âm';
    if (type === 'sign') return 'Dấu tách âm / làm mềm';
    return 'Phụ âm';
  }

  function renderAlphabet() {
    const grid = document.getElementById('alphabet-grid');
    if (!grid) return;

    let filtered = alphabetData;
    if (currentFilter === 'vowels') {
      filtered = alphabetData.filter(l => l.type.includes('vowel'));
    } else if (currentFilter === 'consonants') {
      filtered = alphabetData.filter(l => l.type.includes('consonant') || l.type === 'semivowel');
    } else if (currentFilter === 'signs') {
      filtered = alphabetData.filter(l => l.type === 'sign');
    }

    grid.innerHTML = filtered.map((item, idx) => `
      <div class="letter-card group relative bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
           onclick="AlphabetModule.playLetterAudio('${item.letter.split(' ')[0]}', '${item.example_ru}')">
        <div class="flex items-start justify-between mb-3">
          <span class="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white tracking-wide font-cyrillic">${item.letter}</span>
          <button class="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm" title="Nghe phát âm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
          </button>
        </div>
        
        <div class="space-y-1.5 text-xs sm:text-sm">
          <div class="flex items-center justify-between">
            <span class="text-slate-500 dark:text-slate-400">Tên chữ:</span>
            <span class="font-bold text-slate-700 dark:text-slate-200">${item.name}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500 dark:text-slate-400">Phát âm TV:</span>
            <span class="font-semibold text-emerald-600 dark:text-emerald-400">${item.sound_vi}</span>
          </div>
          <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <span class="text-slate-500 dark:text-slate-400">Ví dụ:</span>
            <span class="font-bold text-blue-600 dark:text-blue-400">${item.example_ru} <span class="text-slate-400 text-xs font-normal">(${item.example_vi})</span></span>
          </div>
        </div>

        <div class="mt-3">
          <span class="inline-block text-[11px] px-2 py-0.5 rounded-md border font-medium ${getBadgeClass(item.type)}">
            ${getTypeLabel(item.type)}
          </span>
        </div>
      </div>
    `).join('');
  }

  function renderPhoneticRules() {
    const container = document.getElementById('phonetic-rules-container');
    if (!container) return;

    container.innerHTML = phoneticRules.map(rule => `
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h4 class="text-base sm:text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
          <span class="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
          ${rule.title}
        </h4>
        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">${rule.description}</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${rule.examples.map(ex => `
            <div class="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-slate-800 dark:text-white text-base">${ex.word}</span>
                  <span class="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-mono font-bold">${ex.pronunciation}</span>
                </div>
                <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${ex.meaning}</div>
              </div>
              <button class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-300 flex items-center justify-center transition-colors flex-shrink-0 ml-2"
                      onclick="RussianSpeech.speak('${ex.word}')" title="Nghe phát âm từ này">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function playLetterAudio(letter, exampleWord) {
    RussianSpeech.speak(`${letter}. ${exampleWord}`);
  }

  return {
    init,
    playLetterAudio
  };
})();

window.AlphabetModule = AlphabetModule;
