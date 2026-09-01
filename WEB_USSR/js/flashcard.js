/**
 * WEB_USSR - 3D Flashcards & Leitner SRS Multi-Mode Study Engine
 * With 6-Case Contextual Sentences Drill-Down
 */
const FlashcardModule = (() => {
  let vocabList = [];
  let currentIndex = 0;
  let isFlipped = false;
  let currentLevel = 'all';
  let currentTopic = 'all';
  let searchTerm = '';
  let studyMode = 'flip'; // 'flip', 'quiz_ru_vi', 'quiz_audio'
  let activeCaseDrawerItem = null;

  async function init() {
    try {
      const resp = await fetch('data/vocab_lexical_min.json');
      vocabList = await resp.json();

      setupFilters();
      setupStudyModes();
      renderCard();
      updateStats();
    } catch (e) {
      console.error('Failed to load vocabulary data:', e);
    }
  }

  function setupFilters() {
    // Topic filter
    const topicSelect = document.getElementById('flashcard-topic-select');
    if (topicSelect) {
      const topics = ['all', ...new Set(vocabList.map(v => v.topic))];
      topicSelect.innerHTML = topics.map(t => `<option value="${t}">${t === 'all' ? 'Tất cả chủ đề' : t}</option>`).join('');
      topicSelect.addEventListener('change', (e) => {
        currentTopic = e.target.value;
        currentIndex = 0;
        isFlipped = false;
        renderCard();
      });
    }

    // Level filter
    const levelSelect = document.getElementById('flashcard-level-select');
    if (levelSelect) {
      levelSelect.addEventListener('change', (e) => {
        currentLevel = e.target.value;
        currentIndex = 0;
        isFlipped = false;
        renderCard();
      });
    }

    // Search
    const searchInput = document.getElementById('flashcard-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase().trim();
        currentIndex = 0;
        isFlipped = false;
        renderCard();
      });
    }
  }

  function setupStudyModes() {
    const modeBtns = document.querySelectorAll('.fc-mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => {
          b.classList.remove('active', 'bg-blue-600', 'text-white');
          b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        });
        btn.classList.add('active', 'bg-blue-600', 'text-white');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        studyMode = btn.dataset.mode;
        renderCard();
      });
    });
  }

  function getFilteredList() {
    return vocabList.filter(item => {
      const matchLevel = currentLevel === 'all' || item.level === currentLevel;
      const matchTopic = currentTopic === 'all' || item.topic === currentTopic;
      const matchSearch = !searchTerm || 
        item.word.toLowerCase().includes(searchTerm) || 
        item.meaning.toLowerCase().includes(searchTerm) ||
        item.phonetic.toLowerCase().includes(searchTerm);
      return matchLevel && matchTopic && matchSearch;
    });
  }

  function renderCard() {
    const container = document.getElementById('flashcard-render-area');
    if (!container) return;

    const filtered = getFilteredList();
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="py-16 text-center text-slate-400 space-y-2">
          <span class="text-4xl">🔍</span>
          <p class="font-bold text-sm">Không tìm thấy từ vựng nào phù hợp với bộ lọc hiện tại.</p>
        </div>
      `;
      return;
    }

    if (currentIndex >= filtered.length) currentIndex = 0;
    const item = filtered[currentIndex];

    // Gender styling
    const genderBorder = {
      'он': 'border-blue-500 bg-blue-500/10 text-blue-600',
      'она': 'border-rose-500 bg-rose-500/10 text-rose-600',
      'оно': 'border-emerald-500 bg-emerald-500/10 text-emerald-600',
      'động từ': 'border-amber-500 bg-amber-500/10 text-amber-600',
      'tính từ': 'border-purple-500 bg-purple-500/10 text-purple-600'
    }[item.gender] || 'border-slate-300 bg-slate-100 text-slate-600';

    if (studyMode === 'flip') {
      renderFlipCard(container, item, genderBorder, filtered.length);
    } else if (studyMode === 'quiz_ru_vi') {
      renderQuizCard(container, item, filtered);
    } else if (studyMode === 'quiz_audio') {
      renderAudioQuizCard(container, item, filtered);
    }
  }

  function renderFlipCard(container, item, genderBorder, total) {
    container.innerHTML = `
      <div class="max-w-md mx-auto space-y-6">
        <!-- Progress Counter -->
        <div class="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Thẻ ${currentIndex + 1} / ${total}</span>
          <span class="px-2.5 py-0.5 rounded-full ${genderBorder} font-bold text-[11px]">${item.gender}</span>
        </div>

        <!-- 3D Card Container -->
        <div class="perspective-1000 w-full h-84 sm:h-96 cursor-pointer select-none" onclick="FlashcardModule.toggleFlip()">
          <div class="relative w-full h-full duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}">
            
            <!-- Front -->
            <div class="absolute inset-0 w-full h-full bg-white dark:bg-slate-800 rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-700 shadow-xl flex flex-col justify-between items-center text-center backface-hidden">
              <div class="w-full flex justify-between items-center text-xs">
                <span class="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-extrabold">${item.level}</span>
                <span class="text-slate-400 font-medium">${item.topic}</span>
              </div>

              <div class="my-auto space-y-2">
                <h3 class="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-cyrillic tracking-tight">
                  ${item.word}
                </h3>
                <p class="text-sm font-mono text-blue-600 dark:text-blue-400">${item.phonetic}</p>
                ${item.plural_form && item.plural_form !== '-' ? `
                  <div class="pt-2 text-xs text-slate-500 font-cyrillic">
                    Số nhiều: <strong class="text-slate-800 dark:text-slate-200">${item.plural_form}</strong>
                  </div>
                ` : ''}
              </div>

              <div class="w-full flex items-center justify-center gap-2 text-xs text-slate-400">
                <span>Bấm vào thẻ để xem nghĩa ↻</span>
              </div>
            </div>

            <!-- Back -->
            <div class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between items-center text-center rotate-y-180 backface-hidden">
              <div class="w-full flex justify-between items-center text-xs text-blue-200">
                <span class="font-bold font-cyrillic">${item.word}</span>
                <span class="uppercase tracking-widest text-[10px]">Tiếng Việt</span>
              </div>

              <div class="my-auto space-y-3">
                <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  ${item.meaning}
                </h3>
                
                <div class="p-3 rounded-2xl bg-white/10 border border-white/15 text-left text-xs space-y-0.5 font-cyrillic">
                  <p class="font-bold text-blue-100">${item.example_ru}</p>
                  <p class="text-blue-200 italic font-sans font-normal">${item.example_vi}</p>
                </div>
              </div>

              <div class="w-full flex items-center justify-between gap-2">
                <button class="px-3.5 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                        onclick="event.stopPropagation(); RussianSpeech.speak('${item.audio_text}')">
                  🔊 Nghe đọc
                </button>

                ${item.case_contexts ? `
                  <button class="px-3.5 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-xs font-bold transition-colors"
                          onclick="event.stopPropagation(); FlashcardModule.showCaseModal('${item.id}')">
                    📐 6 Cách trong ngữ cảnh
                  </button>
                ` : ''}
              </div>
            </div>

          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center justify-between gap-3">
          <button class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-sm"
                  onclick="FlashcardModule.prevCard()">
            ◀
          </button>

          <button class="flex-1 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-colors"
                  onclick="FlashcardModule.handleCardAction(false)">
            Chưa thuộc (Hộp 1) ❌
          </button>

          <button class="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-colors"
                  onclick="FlashcardModule.handleCardAction(true)">
            Đã nhớ (+1 Hộp) ✓
          </button>

          <button class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-sm"
                  onclick="FlashcardModule.nextCard()">
            ▶
          </button>
        </div>

        <!-- 6-Case Context Modal Container -->
        <div id="flashcard-case-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div id="flashcard-case-modal-content" class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4">
            <!-- Modal dynamic content -->
          </div>
        </div>
      </div>
    `;
  }

  function showCaseModal(itemId) {
    const item = vocabList.find(v => v.id === itemId);
    if (!item || !item.case_contexts) return;

    const modal = document.getElementById('flashcard-case-modal');
    const content = document.getElementById('flashcard-case-modal-content');
    if (!modal || !content) return;

    const caseNames = {
      case_1: "Cách 1 (Chủ cách - Nom)",
      case_2: "Cách 2 (Sinh cách - Gen)",
      case_3: "Cách 3 (Dữ cách - Dat)",
      case_4: "Cách 4 (Đối cách - Acc)",
      case_5: "Cách 5 (Tạo cách - Inst)",
      case_6: "Cách 6 (Giới cách - Prep)"
    };

    content.innerHTML = `
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
        <div>
          <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Từ vựng đi cùng ngữ pháp</span>
          <h4 class="text-xl font-extrabold text-slate-900 dark:text-white font-cyrillic">${item.word} trong 6 Cách</h4>
        </div>
        <button class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 flex items-center justify-center font-bold"
                onclick="FlashcardModule.hideCaseModal()">✕</button>
      </div>

      <div class="space-y-2.5 max-h-96 overflow-y-auto">
        ${Object.entries(item.case_contexts).map(([cKey, cSentence]) => `
          <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span class="text-[10px] font-bold text-slate-400 block">${caseNames[cKey] || cKey}</span>
              <p class="text-sm font-bold text-slate-800 dark:text-white font-cyrillic mt-0.5">${cSentence}</p>
            </div>
            <button class="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center flex-shrink-0 ml-2"
                    onclick="RussianSpeech.speak('${cSentence.split('(')[0].trim()}')">
              🔊
            </button>
          </div>
        `).join('')}
      </div>

      <button class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-colors text-xs"
              onclick="FlashcardModule.hideCaseModal()">
        Đóng cửa sổ
      </button>
    `;

    modal.classList.remove('hidden');
  }

  function hideCaseModal() {
    const modal = document.getElementById('flashcard-case-modal');
    if (modal) modal.classList.add('hidden');
  }

  function renderQuizCard(container, item, list) {
    const otherMeanings = list.filter(v => v.id !== item.id).map(v => v.meaning);
    const shuffledWrong = otherMeanings.sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [item.meaning, ...shuffledWrong].sort(() => 0.5 - Math.random());

    container.innerHTML = `
      <div class="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6 text-center">
        <div class="space-y-1">
          <span class="text-xs font-bold text-slate-400">Chọn nghĩa tiếng Việt đúng:</span>
          <h3 class="text-3xl font-extrabold text-slate-900 dark:text-white font-cyrillic">${item.word}</h3>
          <p class="text-xs font-mono text-blue-600">${item.phonetic}</p>
        </div>

        <div class="space-y-2.5 text-left">
          ${options.map(opt => `
            <button class="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 transition-all"
                    onclick="FlashcardModule.checkQuizAnswer('${item.id}', '${opt}', '${item.meaning}', this)">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderAudioQuizCard(container, item, list) {
    const otherWords = list.filter(v => v.id !== item.id).map(v => v.word);
    const shuffledWrong = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [item.word, ...shuffledWrong].sort(() => 0.5 - Math.random());

    container.innerHTML = `
      <div class="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6 text-center">
        <div class="space-y-3">
          <span class="text-xs font-bold text-slate-400">Nghe âm thanh và chọn từ đúng:</span>
          <button class="w-16 h-16 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center mx-auto text-2xl shadow-lg transition-transform hover:scale-105"
                  onclick="RussianSpeech.speak('${item.audio_text}')">
            🔊
          </button>
        </div>

        <div class="space-y-2.5 text-left">
          ${options.map(opt => `
            <button class="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-sm sm:text-base font-bold font-cyrillic text-slate-800 dark:text-slate-200 transition-all"
                    onclick="FlashcardModule.checkQuizAnswer('${item.id}', '${opt}', '${item.word}', this)">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    setTimeout(() => RussianSpeech.speak(item.audio_text), 300);
  }

  function checkQuizAnswer(cardId, selected, correct, btnEl) {
    const isCorrect = selected === correct;
    const parent = btnEl.closest('.space-y-2\\.5');
    const allBtns = parent.querySelectorAll('button');
    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
      btnEl.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-700');
      App.triggerConfetti();
      handleCardAction(true);
    } else {
      btnEl.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-700');
      handleCardAction(false);
    }

    setTimeout(() => {
      nextCard();
    }, 1200);
  }

  function handleCardAction(isCorrect) {
    const filtered = getFilteredList();
    const item = filtered[currentIndex];
    if (item && window.AdaptiveLearningOS) {
      AdaptiveLearningOS.recordSRSAnswer(item.id, isCorrect);
      if (isCorrect) {
        AdaptiveLearningOS.dailyState.vocabLearned++;
        AdaptiveLearningOS.saveDailyState();
      }
    }
    nextCard();
  }

  function toggleFlip() {
    isFlipped = !isFlipped;
    renderCard();
  }

  function nextCard() {
    const filtered = getFilteredList();
    if (filtered.length > 0) {
      currentIndex = (currentIndex + 1) % filtered.length;
      isFlipped = false;
      renderCard();
    }
  }

  function prevCard() {
    const filtered = getFilteredList();
    if (filtered.length > 0) {
      currentIndex = (currentIndex - 1 + filtered.length) % filtered.length;
      isFlipped = false;
      renderCard();
    }
  }

  function updateStats() {}

  return {
    init,
    toggleFlip,
    nextCard,
    prevCard,
    handleCardAction,
    checkQuizAnswer,
    showCaseModal,
    hideCaseModal
  };
})();

window.FlashcardModule = FlashcardModule;
