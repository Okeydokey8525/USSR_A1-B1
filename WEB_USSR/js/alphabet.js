/**
 * WEB_USSR - Russian Alphabet, Phonetics & Syllable Reading Ladder
 */
const AlphabetModule = (() => {
  let alphabetData = null;
  let isCursiveMode = false;

  async function init() {
    try {
      const resp = await fetch('data/russian_alphabet.json');
      alphabetData = await resp.json();
      
      renderAlphabetGrid();
      renderSyllablesLadder();
      renderPhoneticRules();
      renderRecognitionQuiz();
    } catch (e) {
      console.error('Failed to load alphabet data:', e);
    }
  }

  function toggleCursive() {
    isCursiveMode = !isCursiveMode;
    renderAlphabetGrid();
  }

  function renderAlphabetGrid() {
    const grid = document.getElementById('alphabet-grid');
    if (!grid || !alphabetData) return;

    grid.innerHTML = alphabetData.letters.map((item, idx) => {
      const typeColors = {
        vowel: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300',
        vowel_iotated: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800/50 text-pink-700 dark:text-pink-300',
        consonant_voiced: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300',
        consonant_voiced_hard: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300',
        consonant_voiceless: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-300',
        consonant_voiceless_hard: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/50 text-orange-700 dark:text-orange-300',
        consonant_voiceless_soft: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300',
        semivowel: 'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800/50 text-teal-700 dark:text-teal-300',
        sign: 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
      };

      const colorClass = typeColors[item.type] || 'bg-slate-50 border-slate-200 text-slate-800';

      return `
        <div class="letter-card rounded-2xl p-4 border ${colorClass} flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md transition-all cursor-pointer group"
             onclick="RussianSpeech.speak('${item.letter.split(' ')[0]}')">
          <div class="w-full flex justify-between items-center text-[10px] opacity-60 font-mono">
            <span>#${idx + 1}</span>
            <span>${item.name}</span>
          </div>

          <div class="my-2">
            <span class="text-3xl sm:text-4xl font-extrabold ${isCursiveMode ? 'font-cursive italic' : 'font-cyrillic'} group-hover:scale-110 transition-transform inline-block">
              ${item.letter}
            </span>
          </div>

          <div class="w-full pt-2 border-t border-current/10 space-y-1">
            <span class="text-xs font-bold block">${item.sound_vi}</span>
            <span class="text-[11px] opacity-80 block truncate font-cyrillic">${item.example_ru}: ${item.example_vi}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderSyllablesLadder() {
    const container = document.getElementById('syllables-ladder-container');
    if (!container || !alphabetData || !alphabetData.syllables_ladder) return;

    container.innerHTML = alphabetData.syllables_ladder.map(s => `
      <div class="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-cyrillic">
            Âm gốc: ${s.base}
          </span>
          <span class="text-[11px] text-slate-400">Từ vựng mẫu: ${s.words.join(', ')}</span>
        </div>

        <div class="grid grid-cols-5 sm:grid-cols-6 gap-2">
          ${s.items.map((syl, i) => `
            <button class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/50 text-center font-cyrillic font-bold text-sm text-slate-800 dark:text-slate-200 transition-all flex flex-col items-center"
                    onclick="RussianSpeech.speak('${syl}')">
              <span>${syl}</span>
              <span class="text-[10px] text-slate-400 font-mono">${s.phonetics[i] || ''}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderPhoneticRules() {
    const container = document.getElementById('phonetic-rules-container');
    if (!container || !alphabetData) return;

    container.innerHTML = alphabetData.phonetic_rules.map(rule => `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h4 class="text-base sm:text-lg font-bold text-slate-800 dark:text-white">${rule.title}</h4>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${rule.description}</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          ${rule.examples.map(ex => `
            <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-slate-800 dark:text-white font-cyrillic text-sm">${ex.word}</span>
                <span class="text-xs text-blue-600 dark:text-blue-400 font-mono ml-2">${ex.pronunciation}</span>
                <span class="text-xs text-slate-400 block">${ex.meaning}</span>
              </div>
              <button class="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                      onclick="RussianSpeech.speak('${ex.word}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderRecognitionQuiz() {
    const container = document.getElementById('phonetics-quiz-container');
    if (!container || !alphabetData || !alphabetData.recognition_quiz) return;

    container.innerHTML = alphabetData.recognition_quiz.map((q, idx) => `
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400">Luyện nhận diện #${idx + 1}</span>
          ${q.audio ? `
            <button class="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center gap-1"
                    onclick="RussianSpeech.speak('${q.audio}')">
              🔊 Nghe âm thanh
            </button>
          ` : ''}
        </div>
        <p class="text-sm font-bold text-slate-800 dark:text-slate-200">${q.prompt}</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          ${q.options.map((opt, oIdx) => `
            <button class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 font-bold text-xs sm:text-sm font-cyrillic text-slate-800 dark:text-slate-200 transition-all"
                    onclick="AlphabetModule.checkQuizAnswer(${idx}, ${oIdx}, this)">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function checkQuizAnswer(qIdx, oIdx, btnEl) {
    const q = alphabetData.recognition_quiz[qIdx];
    const parent = btnEl.closest('.grid');
    const allBtns = parent.querySelectorAll('button');
    allBtns.forEach(b => b.disabled = true);

    if (oIdx === q.correct) {
      btnEl.classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/40', 'text-emerald-700');
      App.triggerConfetti();
    } else {
      btnEl.classList.add('border-rose-500', 'bg-rose-50', 'dark:bg-rose-950/40', 'text-rose-700');
      allBtns[q.correct].classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/40', 'text-emerald-700');
    }
  }

  return {
    init,
    toggleCursive,
    checkQuizAnswer
  };
})();

window.AlphabetModule = AlphabetModule;
