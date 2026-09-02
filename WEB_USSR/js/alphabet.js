/**
 * WEB_USSR - Russian Alphabet, Phonetics, Stress Trainer & 11-Step Pronunciation Ladder
 * Cyrillic Master: Block, Cursive, Stress Rules, Homograph Pairs & Systemic Pronunciation Progression
 */
const AlphabetModule = (() => {
  let alphabetData = null;
  let showCursive = false;
  let activeLadderStep = 1;

  async function init() {
    try {
      const resp = await fetch('data/russian_alphabet.json');
      alphabetData = await resp.json();

      renderAlphabetGrid();
      renderPronunciationLadder();
      renderPhoneticRules();
      renderStressPairs();
      renderRecognitionQuiz();
    } catch (e) {
      console.error('Failed to load alphabet data:', e);
    }
  }

  function renderAlphabetGrid() {
    const container = document.getElementById('alphabet-letters-grid');
    if (!container || !alphabetData) return;

    container.innerHTML = alphabetData.letters.map((letter, idx) => `
      <div class="letter-card bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between items-center text-center cursor-pointer group"
           onclick="RussianSpeech.speak('${letter.sound || letter.uppercase}')">
        <div class="w-full flex justify-between items-center text-[10px] text-slate-400 font-mono">
          <span>#${idx + 1}</span>
          <span class="px-1.5 py-0.5 rounded ${letter.type === 'vowel' ? 'bg-rose-100 dark:bg-rose-950 text-rose-600' : letter.type === 'consonant' ? 'bg-blue-100 dark:bg-blue-950 text-blue-600' : 'bg-amber-100 dark:bg-amber-950 text-amber-600'} font-bold">
            ${letter.type === 'vowel' ? 'Nguyên âm' : letter.type === 'consonant' ? 'Phụ âm' : 'Dấu'}
          </span>
        </div>

        <div class="my-2">
          <div class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-cyrillic group-hover:scale-110 transition-transform ${showCursive ? 'font-cursive' : ''}">
            ${letter.uppercase} ${letter.lowercase}
          </div>
          <div class="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold mt-1">
            [${letter.ipa || letter.sound}]
          </div>
        </div>

        <div class="w-full pt-2 border-t border-slate-100 dark:border-slate-700/60 text-left">
          <span class="text-[10px] text-slate-400 block truncate">Ví dụ:</span>
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs font-cyrillic text-slate-800 dark:text-slate-200">${letter.example_ru}</span>
            <span class="text-[11px] text-slate-500 truncate">${letter.example_vi}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function toggleCursive() {
    showCursive = !showCursive;
    renderAlphabetGrid();
  }

  function renderPronunciationLadder() {
    let container = document.getElementById('pronunciation-ladder-container');
    if (!container) {
      const grid = document.getElementById('alphabet-letters-grid');
      if (grid && grid.parentNode) {
        container = document.createElement('div');
        container.id = 'pronunciation-ladder-container';
        container.className = 'my-8';
        grid.parentNode.insertBefore(container, grid.nextSibling);
      } else {
        return;
      }
    }

    if (!alphabetData || !alphabetData.pronunciation_ladder) return;
    const ladder = alphabetData.pronunciation_ladder;
    const currentItem = ladder.find(item => item.step === activeLadderStep) || ladder[0];

    container.innerHTML = `
      <div class="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                Thang Phát Âm Chuẩn 11 Bậc (Лестница произношения)
              </span>
              <span class="text-xs text-slate-400">Từ chữ cái ➔ Ngữ điệu câu</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold mt-2">Lộ trình rèn âm vị học tiếng Nga có hệ thống</h3>
          </div>

          <span class="text-sm font-mono text-blue-300 font-bold">Bậc ${currentItem.step} / 11</span>
        </div>

        <!-- 11 Step Pills Selector -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          ${ladder.map(item => `
            <button class="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              item.step === activeLadderStep 
                ? 'bg-blue-600 text-white shadow-md scale-105' 
                : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
            }" onclick="AlphabetModule.selectLadderStep(${item.step})">
              Bậc ${item.step}: ${item.title.split(':')[1]?.split('(')[0]?.trim() || item.title}
            </button>
          `).join('')}
        </div>

        <!-- Current Step Detail Panel -->
        <div class="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <div>
            <h4 class="text-lg font-bold text-blue-300">${currentItem.title}</h4>
            <p class="text-sm text-slate-300 mt-1">${currentItem.guide}</p>
          </div>

          <!-- Sample Words Audio Grid -->
          <div class="space-y-2">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Từ vựng & Mẫu câu luyện âm:</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              ${currentItem.sample_words.map(w => `
                <div class="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                  <span class="font-bold text-sm text-white font-cyrillic">${w}</span>
                  <button class="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center text-xs transition-colors"
                          onclick="RussianSpeech.speak('${w.split('(')[0].split('[')[0].trim()}')">
                    🔊
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-blue-950/60 border border-blue-800/40 text-xs text-blue-200">
            <strong>💡 Mẹo luyện tập:</strong> ${currentItem.practice_tip}
          </div>

          <!-- 7-Step Workflow Instruction -->
          <div class="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>Quy trình 7 bước: 1. Nghe ➔ 2. Nhận diện ➔ 3. Đọc nhại ➔ 4. Tự thu âm ➔ 5. Đối chiếu A/B ➔ 6. Tự chấm ➔ 7. Hoàn thành</span>
            <button class="text-blue-400 hover:text-blue-300 font-bold" onclick="App.switchTab('tab-speaking')">
              Đến phòng thu âm A/B 🎙️ ➔
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function selectLadderStep(step) {
    activeLadderStep = step;
    renderPronunciationLadder();
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
                🔊
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderStressPairs() {
    let container = document.getElementById('stress-pairs-container');
    if (!container) {
      const parent = document.getElementById('phonetic-rules-container');
      if (parent && parent.parentNode) {
        container = document.createElement('div');
        container.id = 'stress-pairs-container';
        container.className = 'mt-8';
        parent.parentNode.insertBefore(container, parent.nextSibling);
      } else {
        return;
      }
    }

    const pairs = alphabetData.stress_pairs || [
      {
        word1: "замо́к", meaning1: "ổ khóa 🔒", phonetic1: "[за-мо́к]",
        word2: "за́мок", meaning2: "lâu đài 🏰", phonetic2: "[за́-мак]",
        explanation: "Thay đổi vị trí trọng âm thay đổi hoàn toàn ý nghĩa của từ!"
      },
      {
        word1: "му́ка", meaning1: "sự khổ ải / nỗi đau", phonetic1: "[му́-ка]",
        word2: "мука́", meaning2: "bột mì 🌾", phonetic2: "[му-ка́]",
        explanation: "Chữ 'у' mang trọng âm so với chữ 'а' mang trọng âm."
      },
      {
        word1: "плачу́", meaning1: "tôi thanh toán tiền 💳 (платить)", phonetic1: "[пла-чу́]",
        word2: "пла́чу", meaning2: "tôi đang khóc 😭 (плакать)", phonetic2: "[пла́-чу]",
        explanation: "Phân biệt hai động từ khác nhau trong cùng dạng ngôi 'Я'."
      }
    ];

    container.innerHTML = `
      <div class="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 dark:from-amber-950/40 dark:to-rose-950/40 rounded-3xl p-6 sm:p-8 border border-amber-200 dark:border-amber-800/60 shadow-sm space-y-4">
        <div class="flex items-center gap-3">
          <span class="text-3xl">⚠️</span>
          <div>
            <h4 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Cặp từ phân biệt bằng trọng âm (Смыслоразличительная роль ударения)
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              Trong tiếng Nga, trọng âm tự do và có tính phân biệt nghĩa. Cùng một mặt chữ nhưng nhấn trọng âm khác nhau sẽ thành hai từ hoàn toàn khác biệt:
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          ${pairs.map(p => `
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700 shadow-sm space-y-3">
              <!-- Item 1 -->
              <div class="p-3 rounded-xl bg-amber-50/50 dark:bg-slate-900/60 border border-amber-200/50 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h5 class="text-lg font-bold text-slate-900 dark:text-white font-cyrillic">${p.word1}</h5>
                  <span class="text-xs text-amber-700 dark:text-amber-400 font-bold block">${p.meaning1}</span>
                  <span class="text-[10px] text-slate-400 font-mono">${p.phonetic1}</span>
                </div>
                <button class="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors"
                        onclick="RussianSpeech.speak('${p.word1}')">🔊</button>
              </div>

              <!-- Item 2 -->
              <div class="p-3 rounded-xl bg-blue-50/50 dark:bg-slate-900/60 border border-blue-200/50 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h5 class="text-lg font-bold text-slate-900 dark:text-white font-cyrillic">${p.word2}</h5>
                  <span class="text-xs text-blue-700 dark:text-blue-400 font-bold block">${p.meaning2}</span>
                  <span class="text-[10px] text-slate-400 font-mono">${p.phonetic2}</span>
                </div>
                <button class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                        onclick="RussianSpeech.speak('${p.word2}')">🔊</button>
              </div>

              <p class="text-[11px] text-slate-500 italic text-center pt-1 border-t border-slate-100 dark:border-slate-700">
                ${p.explanation}
              </p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderRecognitionQuiz() {
    const container = document.getElementById('phonetics-quiz-container');
    if (!container || !alphabetData || !alphabetData.recognition_quiz) return;

    container.innerHTML = alphabetData.recognition_quiz.map((q, idx) => `
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400">Luyện nhận diện âm #${idx + 1}</span>
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
    selectLadderStep,
    checkQuizAnswer
  };
})();

window.AlphabetModule = AlphabetModule;
