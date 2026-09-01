/**
 * WEB_USSR - Interactive 3D Flashcard & Vocabulary Engine
 */
const FlashcardModule = (() => {
  let allVocab = [];
  let filteredVocab = [];
  let currentIndex = 0;
  let isFlipped = false;
  let masteredIds = new Set();
  let viewMode = 'card'; // 'card' or 'grid'

  async function init() {
    try {
      loadMasteredFromStorage();
      const resp = await fetch('data/vocab_lexical_min.json');
      allVocab = await resp.json();
      filteredVocab = [...allVocab];
      
      setupFilters();
      setupCardEvents();
      renderCurrentCard();
      renderStats();
    } catch (e) {
      console.error('Failed to load vocab data:', e);
    }
  }

  function loadMasteredFromStorage() {
    try {
      const saved = localStorage.getItem('ussr_mastered_words');
      if (saved) {
        masteredIds = new Set(JSON.parse(saved));
      }
    } catch (e) {
      masteredIds = new Set();
    }
  }

  function saveMasteredToStorage() {
    localStorage.setItem('ussr_mastered_words', JSON.stringify(Array.from(masteredIds)));
    renderStats();
  }

  function setupFilters() {
    const levelSelect = document.getElementById('vocab-level-filter');
    const topicSelect = document.getElementById('vocab-topic-filter');
    const searchInput = document.getElementById('vocab-search-input');
    const viewCardBtn = document.getElementById('view-card-btn');
    const viewGridBtn = document.getElementById('view-grid-btn');

    // Populate topics dropdown
    if (topicSelect) {
      const topics = Array.from(new Set(allVocab.map(v => v.topic)));
      topicSelect.innerHTML = '<option value="all">Tất cả chủ đề</option>' + 
        topics.map(t => `<option value="${t}">${t}</option>`).join('');
    }

    const applyFilter = () => {
      const level = levelSelect ? levelSelect.value : 'all';
      const topic = topicSelect ? topicSelect.value : 'all';
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

      filteredVocab = allVocab.filter(item => {
        const matchLevel = level === 'all' || item.level === level;
        const matchTopic = topic === 'all' || item.topic === topic;
        const matchQuery = !query || 
          item.word.toLowerCase().includes(query) || 
          item.meaning.toLowerCase().includes(query) ||
          item.phonetic.toLowerCase().includes(query);
        return matchLevel && matchTopic && matchQuery;
      });

      currentIndex = 0;
      isFlipped = false;
      if (viewMode === 'card') {
        renderCurrentCard();
      } else {
        renderGridView();
      }
      updateCardCounter();
    };

    if (levelSelect) levelSelect.addEventListener('change', applyFilter);
    if (topicSelect) topicSelect.addEventListener('change', applyFilter);
    if (searchInput) searchInput.addEventListener('input', applyFilter);

    if (viewCardBtn && viewGridBtn) {
      viewCardBtn.addEventListener('click', () => {
        viewMode = 'card';
        viewCardBtn.classList.add('bg-blue-600', 'text-white');
        viewCardBtn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        viewGridBtn.classList.remove('bg-blue-600', 'text-white');
        viewGridBtn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        document.getElementById('flashcard-single-view').classList.remove('hidden');
        document.getElementById('flashcard-grid-view').classList.add('hidden');
        renderCurrentCard();
      });

      viewGridBtn.addEventListener('click', () => {
        viewMode = 'grid';
        viewGridBtn.classList.add('bg-blue-600', 'text-white');
        viewGridBtn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        viewCardBtn.classList.remove('bg-blue-600', 'text-white');
        viewCardBtn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        document.getElementById('flashcard-single-view').classList.add('hidden');
        document.getElementById('flashcard-grid-view').classList.remove('hidden');
        renderGridView();
      });
    }
  }

  function setupCardEvents() {
    const card = document.getElementById('main-flashcard');
    if (card) {
      card.addEventListener('click', (e) => {
        // Prevent flipping if clicked on sound button or mastered button
        if (e.target.closest('button')) return;
        flipCard();
      });
    }

    const prevBtn = document.getElementById('card-prev-btn');
    const nextBtn = document.getElementById('card-next-btn');
    const shuffleBtn = document.getElementById('card-shuffle-btn');
    const flipBtn = document.getElementById('card-flip-btn');

    if (prevBtn) prevBtn.addEventListener('click', prevCard);
    if (nextBtn) nextBtn.addEventListener('click', nextCard);
    if (shuffleBtn) shuffleBtn.addEventListener('click', shuffleCards);
    if (flipBtn) flipBtn.addEventListener('click', flipCard);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // only active if in flashcard tab
      const activeTab = document.querySelector('.tab-content:not(.hidden)');
      if (!activeTab || activeTab.id !== 'tab-flashcard') return;

      if (e.code === 'Space') {
        e.preventDefault();
        flipCard();
      } else if (e.code === 'ArrowLeft') {
        prevCard();
      } else if (e.code === 'ArrowRight') {
        nextCard();
      }
    });
  }

  function getGenderBorderClass(gender) {
    switch (gender) {
      case 'он': return 'border-blue-500 shadow-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'она': return 'border-rose-500 shadow-rose-500/10 text-rose-600 dark:text-rose-400';
      case 'оно': return 'border-emerald-500 shadow-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'verb': return 'border-amber-500 shadow-amber-500/10 text-amber-600 dark:text-amber-400';
      case 'adj': return 'border-purple-500 shadow-purple-500/10 text-purple-600 dark:text-purple-400';
      default: return 'border-indigo-500 shadow-indigo-500/10 text-indigo-600 dark:text-indigo-400';
    }
  }

  function getGenderBadge(gender) {
    switch (gender) {
      case 'он': return '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">Giống đực (он)</span>';
      case 'она': return '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">Giống cái (она)</span>';
      case 'оно': return '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">Giống trung (оно)</span>';
      case 'verb': return '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">Động từ</span>';
      case 'adj': return '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">Tính từ</span>';
      case 'adv': return '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300">Trạng từ</span>';
      case 'pron': return '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">Đại từ</span>';
      default: return '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Cụm từ</span>';
    }
  }

  function flipCard() {
    const cardInner = document.getElementById('flashcard-inner');
    if (!cardInner) return;
    isFlipped = !isFlipped;
    if (isFlipped) {
      cardInner.classList.add('rotate-y-180');
    } else {
      cardInner.classList.remove('rotate-y-180');
    }
  }

  function renderCurrentCard() {
    const cardContainer = document.getElementById('flashcard-card-content');
    if (!cardContainer) return;

    if (filteredVocab.length === 0) {
      cardContainer.innerHTML = `
        <div class="text-center py-16 text-slate-500">
          <p class="text-lg font-medium">Không tìm thấy từ vựng phù hợp với bộ lọc.</p>
        </div>
      `;
      return;
    }

    const item = filteredVocab[currentIndex];
    const isMastered = masteredIds.has(item.id);
    const borderClass = getGenderBorderClass(item.gender);
    const genderBadge = getGenderBadge(item.gender);

    const cardInner = document.getElementById('flashcard-inner');
    if (cardInner && isFlipped) {
      isFlipped = false;
      cardInner.classList.remove('rotate-y-180');
    }

    // Front Side
    document.getElementById('card-front-word').textContent = item.word;
    document.getElementById('card-front-phonetic').textContent = item.phonetic;
    document.getElementById('card-front-topic').textContent = `${item.level} • ${item.topic}`;
    document.getElementById('card-front-gender').innerHTML = genderBadge;

    const frontCard = document.getElementById('card-front');
    if (frontCard) {
      frontCard.className = `flashcard-face absolute inset-0 w-full h-full bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 ${borderClass} shadow-xl backface-hidden`;
    }

    // Back Side
    document.getElementById('card-back-meaning').textContent = item.meaning;
    document.getElementById('card-back-example-ru').textContent = item.example_ru;
    document.getElementById('card-back-example-vi').textContent = item.example_vi;

    const backCard = document.getElementById('card-back');
    if (backCard) {
      backCard.className = `flashcard-face absolute inset-0 w-full h-full bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 ${borderClass} shadow-xl rotate-y-180 backface-hidden`;
    }

    // Mastered button state
    const masterBtn = document.getElementById('card-master-btn');
    if (masterBtn) {
      if (isMastered) {
        masterBtn.innerHTML = `
          <svg class="w-5 h-5 text-emerald-500 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Đã thuộc</span>
        `;
        masterBtn.classList.add('border-emerald-500/50', 'bg-emerald-50', 'dark:bg-emerald-950/30');
      } else {
        masterBtn.innerHTML = `
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Đánh dấu đã thuộc</span>
        `;
        masterBtn.classList.remove('border-emerald-500/50', 'bg-emerald-50', 'dark:bg-emerald-950/30');
      }

      masterBtn.onclick = (e) => {
        e.stopPropagation();
        toggleMastered(item.id);
      };
    }

    // Sound button bindings
    const soundFrontBtn = document.getElementById('card-front-sound-btn');
    const soundBackBtn = document.getElementById('card-back-sound-btn');

    if (soundFrontBtn) {
      soundFrontBtn.onclick = (e) => {
        e.stopPropagation();
        RussianSpeech.speak(item.word);
      };
    }
    if (soundBackBtn) {
      soundBackBtn.onclick = (e) => {
        e.stopPropagation();
        RussianSpeech.speak(item.example_ru);
      };
    }

    updateCardCounter();
  }

  function toggleMastered(id) {
    if (masteredIds.has(id)) {
      masteredIds.delete(id);
    } else {
      masteredIds.add(id);
      App.triggerConfetti();
    }
    saveMasteredToStorage();
    renderCurrentCard();
  }

  function updateCardCounter() {
    const counter = document.getElementById('card-counter');
    if (counter) {
      const total = filteredVocab.length;
      const current = total > 0 ? currentIndex + 1 : 0;
      counter.textContent = `${current} / ${total}`;
    }
  }

  function prevCard() {
    if (filteredVocab.length === 0) return;
    currentIndex = (currentIndex - 1 + filteredVocab.length) % filteredVocab.length;
    renderCurrentCard();
  }

  function nextCard() {
    if (filteredVocab.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredVocab.length;
    renderCurrentCard();
  }

  function shuffleCards() {
    for (let i = filteredVocab.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredVocab[i], filteredVocab[j]] = [filteredVocab[j], filteredVocab[i]];
    }
    currentIndex = 0;
    renderCurrentCard();
    App.showToast('Đã xáo trộn thứ tự từ vựng!', 'info');
  }

  function renderGridView() {
    const container = document.getElementById('flashcard-grid-container');
    if (!container) return;

    if (filteredVocab.length === 0) {
      container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500">Không tìm thấy từ vựng.</div>`;
      return;
    }

    container.innerHTML = filteredVocab.map(item => {
      const isMastered = masteredIds.has(item.id);
      return `
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between mb-2">
              <div>
                <span class="text-lg font-bold text-slate-800 dark:text-white font-cyrillic">${item.word}</span>
                <span class="block text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">${item.phonetic}</span>
              </div>
              <button class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                      onclick="RussianSpeech.speak('${item.word}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              </button>
            </div>
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">${item.meaning}</p>
            <div class="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-600 dark:text-slate-400">
              <p class="italic text-slate-700 dark:text-slate-300">${item.example_ru}</p>
              <p class="text-[11px] text-slate-500 mt-0.5">${item.example_vi}</p>
            </div>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <span class="text-[11px] font-medium text-slate-400">${item.level} • ${item.topic}</span>
            <button class="text-xs ${isMastered ? 'text-emerald-500 font-bold' : 'text-slate-400 hover:text-slate-600'}"
                    onclick="FlashcardModule.toggleMasteredFromGrid('${item.id}')">
              ${isMastered ? '✓ Đã thuộc' : '+ Đánh dấu'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function toggleMasteredFromGrid(id) {
    toggleMastered(id);
    renderGridView();
  }

  function renderStats() {
    const totalCountEl = document.getElementById('stat-vocab-total');
    const masteredCountEl = document.getElementById('stat-vocab-mastered');
    const progressBar = document.getElementById('stat-vocab-progress-bar');
    const progressText = document.getElementById('stat-vocab-percent');

    const total = allVocab.length || 110;
    const mastered = masteredIds.size;
    const percent = Math.min(100, Math.round((mastered / total) * 100));

    if (totalCountEl) totalCountEl.textContent = total;
    if (masteredCountEl) masteredCountEl.textContent = mastered;
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressText) progressText.textContent = `${percent}%`;
  }

  return {
    init,
    prevCard,
    nextCard,
    flipCard,
    shuffleCards,
    toggleMastered,
    toggleMasteredFromGrid
  };
})();

window.FlashcardModule = FlashcardModule;
