/**
 * WEB_USSR - Adaptive Learning OS & Leitner SRS Engine
 */
const AdaptiveLearningOS = (() => {
  // Global View Preferences
  let preferences = {
    showStress: true,
    showYo: true,
    showPhonetics: true
  };

  // User Error Tracking System
  // Error Categories: CYRILLIC, PRONUNCIATION, STRESS, GENDER, PLURAL, CONJUGATION, CASE, CASE_GOVERNANCE, ASPECT, MOTION_VERB, PREFIX, VOCABULARY
  let errorHistory = {};

  // Leitner 5-Box SRS System
  let srsCards = {};

  // Daily Learning State
  let dailyState = {
    date: new Date().toISOString().split('T')[0],
    vocabLearned: 0,
    grammarDone: 0,
    srsReviewed: 0,
    readingDone: 0,
    speakingDone: 0
  };

  function init() {
    loadPreferences();
    loadSRS();
    loadErrorHistory();
    loadDailyState();
    setupPreferenceToggles();
    renderDailyMissionWidget();
    renderContinueLearningWidget();
    checkWeakAreaAlerts();
  }

  function loadPreferences() {
    try {
      const saved = localStorage.getItem('ussr_prefs');
      if (saved) {
        preferences = { ...preferences, ...JSON.parse(saved) };
      }
    } catch (e) {}
  }

  function savePreferences() {
    localStorage.setItem('ussr_prefs', JSON.stringify(preferences));
    applyPreferencesToDOM();
  }

  function setupPreferenceToggles() {
    const stressCheckbox = document.getElementById('pref-stress-toggle');
    const yoCheckbox = document.getElementById('pref-yo-toggle');
    const phoneticsCheckbox = document.getElementById('pref-phonetics-toggle');

    if (stressCheckbox) {
      stressCheckbox.checked = preferences.showStress;
      stressCheckbox.addEventListener('change', (e) => {
        preferences.showStress = e.target.checked;
        savePreferences();
      });
    }

    if (yoCheckbox) {
      yoCheckbox.checked = preferences.showYo;
      yoCheckbox.addEventListener('change', (e) => {
        preferences.showYo = e.target.checked;
        savePreferences();
      });
    }

    if (phoneticsCheckbox) {
      phoneticsCheckbox.checked = preferences.showPhonetics;
      phoneticsCheckbox.addEventListener('change', (e) => {
        preferences.showPhonetics = e.target.checked;
        savePreferences();
      });
    }

    applyPreferencesToDOM();
  }

  function applyPreferencesToDOM() {
    // Stress mark visibility
    if (preferences.showStress) {
      document.body.classList.remove('hide-stress');
    } else {
      document.body.classList.add('hide-stress');
    }

    // Phonetics transliteration visibility
    if (preferences.showPhonetics) {
      document.body.classList.remove('hide-phonetics');
    } else {
      document.body.classList.add('hide-phonetics');
    }

    // Broadcast change
    window.dispatchEvent(new CustomEvent('ussr-prefs-changed', { detail: preferences }));
  }

  function formatWord(word, phonetic = "") {
    let result = word;
    if (!preferences.showStress) {
      result = result.replace(/[\u0301́]/g, '');
    }
    if (!preferences.showYo) {
      result = result.replace(/ё/g, 'е').replace(/Ё/g, 'Е');
    }
    return result;
  }

  // --- SRS LEITNER ENGINE ---
  function loadSRS() {
    try {
      const saved = localStorage.getItem('ussr_srs_data');
      if (saved) {
        srsCards = JSON.parse(saved);
      }
    } catch (e) {
      srsCards = {};
    }
  }

  function saveSRS() {
    localStorage.setItem('ussr_srs_data', JSON.stringify(srsCards));
    renderDailyMissionWidget();
  }

  function recordSRSAnswer(cardId, isCorrect) {
    const now = Date.now();
    let card = srsCards[cardId] || {
      id: cardId,
      box: 1,
      lastReviewed: now,
      nextReview: now
    };

    if (isCorrect) {
      card.box = Math.min(5, card.box + 1);
    } else {
      card.box = 1;
    }

    // Interval: Box 1: 1 day, Box 2: 3 days, Box 3: 7 days, Box 4: 14 days, Box 5: 30 days
    const intervals = [1, 3, 7, 14, 30];
    const days = intervals[card.box - 1];
    card.lastReviewed = now;
    card.nextReview = now + days * 24 * 60 * 60 * 1000;

    srsCards[cardId] = card;
    saveSRS();

    dailyState.srsReviewed++;
    saveDailyState();
  }

  function getDueSRSCardsCount() {
    const now = Date.now();
    return Object.values(srsCards).filter(c => c.nextReview <= now).length;
  }

  // --- ERROR PATTERN SYSTEM ---
  function loadErrorHistory() {
    try {
      const saved = localStorage.getItem('ussr_error_history');
      if (saved) {
        errorHistory = JSON.parse(saved);
      }
    } catch (e) {
      errorHistory = {};
    }
  }

  function recordError(tag, details = "") {
    if (!errorHistory[tag]) {
      errorHistory[tag] = { count: 0, lastOccurred: Date.now(), examples: [] };
    }
    errorHistory[tag].count++;
    errorHistory[tag].lastOccurred = Date.now();
    if (details && !errorHistory[tag].examples.includes(details)) {
      errorHistory[tag].examples.push(details);
      if (errorHistory[tag].examples.length > 5) errorHistory[tag].examples.shift();
    }
    localStorage.setItem('ussr_error_history', JSON.stringify(errorHistory));
    checkWeakAreaAlerts();
  }

  function checkWeakAreaAlerts() {
    const banner = document.getElementById('weak-area-alert-banner');
    if (!banner) return;

    // Find tags with count >= 3
    const weakTags = Object.entries(errorHistory).filter(([tag, data]) => data.count >= 3);
    if (weakTags.length === 0) {
      banner.classList.add('hidden');
      return;
    }

    const [worstTag, data] = weakTags.sort((a, b) => b[1].count - a[1].count)[0];
    const tagNamesVi = {
      'CASE': 'Đuôi biến cách 6 Cách',
      'ASPECT': 'Phân biệt thể động từ (НСВ/СВ)',
      'MOTION_VERB': 'Động từ chuyển động',
      'CONJUGATION': 'Chia động từ',
      'GENDER': 'Xác định giống danh từ',
      'STRESS': 'Nhấn trọng âm'
    };

    banner.classList.remove('hidden');
    banner.innerHTML = `
      <div class="bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700/60 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="text-2xl">⚠️</span>
          <div>
            <h5 class="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">Phát hiện điểm yếu cần ôn tập</h5>
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">Bạn đã sai ${data.count} lần ở phần: <strong>${tagNamesVi[worstTag] || worstTag}</strong></p>
          </div>
        </div>
        <button class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex-shrink-0"
                onclick="App.switchTab('${worstTag === 'ASPECT' || worstTag === 'MOTION_VERB' ? 'tab-practice' : 'tab-cases'}')">
          Luyện tập ngay 🎯
        </button>
      </div>
    `;
  }

  // --- DAILY STATE ---
  function loadDailyState() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem('ussr_daily_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) {
          dailyState = parsed;
        } else {
          dailyState = { date: today, vocabLearned: 0, grammarDone: 0, srsReviewed: 0, readingDone: 0, speakingDone: 0 };
        }
      }
    } catch (e) {}
  }

  function saveDailyState() {
    localStorage.setItem('ussr_daily_state', JSON.stringify(dailyState));
    renderDailyMissionWidget();
  }

  function renderDailyMissionWidget() {
    const container = document.getElementById('daily-mission-widget');
    if (!container) return;

    const vocabGoal = 10;
    const srsDue = getDueSRSCardsCount();

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">📅</span>
            <h4 class="font-bold text-slate-800 dark:text-white text-base">Что учить сегодня? (Nhiệm vụ hôm nay)</h4>
          </div>
          <span class="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full">15 - 20 phút</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <!-- Mission 1: Vocab -->
          <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span class="font-bold text-slate-700 dark:text-slate-200 block">10 Thẻ từ vựng mới</span>
              <span class="text-slate-400">${dailyState.vocabLearned} / ${vocabGoal} từ</span>
            </div>
            <div class="w-6 h-6 rounded-full border flex items-center justify-center ${dailyState.vocabLearned >= vocabGoal ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-300'}">
              ${dailyState.vocabLearned >= vocabGoal ? '✓' : ''}
            </div>
          </div>

          <!-- Mission 2: Grammar -->
          <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span class="font-bold text-slate-700 dark:text-slate-200 block">1 Bài tập 6 Cách / Thể</span>
              <span class="text-slate-400">${dailyState.grammarDone > 0 ? 'Đã hoàn thành' : 'Chưa làm'}</span>
            </div>
            <div class="w-6 h-6 rounded-full border flex items-center justify-center ${dailyState.grammarDone > 0 ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-300'}">
              ${dailyState.grammarDone > 0 ? '✓' : ''}
            </div>
          </div>

          <!-- Mission 3: SRS Due -->
          <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span class="font-bold text-slate-700 dark:text-slate-200 block">Ôn tập ngắt quãng (SRS)</span>
              <span class="text-slate-400">${srsDue > 0 ? `${srsDue} từ cần ôn` : 'Đã ôn xong'}</span>
            </div>
            <button class="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px]" onclick="App.switchTab('tab-flashcard')">
              Ôn ngay
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderContinueLearningWidget() {
    const container = document.getElementById('continue-learning-widget');
    if (!container) return;

    container.innerHTML = `
      <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-white/20 uppercase tracking-wider">
              Lộ trình đang học: A1.1 Sơ cấp
            </span>
          </div>
          <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight font-cyrillic">
            Bậc Thang Đọc Cyrillic & Ma Trận 6 Cách
          </h3>
          <p class="text-sm text-blue-100 max-w-xl leading-relaxed">
            Học chuẩn phát âm tiếng Nga từ âm tiết đến câu ngắn. Hiểu sâu bản chất câu hỏi kích hoạt của 6 cách trước khi chia đuôi.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
          <button class="w-full sm:w-auto px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 font-extrabold rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                  onclick="App.switchTab('tab-alphabet')">
            <span>Tiếp tục bài học</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
          <button class="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl transition-colors text-sm"
                  onclick="App.switchTab('tab-placement')">
            Kiểm tra trình độ 🎯
          </button>
        </div>
      </div>
    `;
  }

  return {
    init,
    preferences,
    formatWord,
    recordSRSAnswer,
    recordError,
    dailyState,
    saveDailyState
  };
})();

window.AdaptiveLearningOS = AdaptiveLearningOS;
