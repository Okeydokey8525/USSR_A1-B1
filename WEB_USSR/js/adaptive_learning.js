/**
 * WEB_USSR - Adaptive Learning OS & Leitner SRS Engine
 * Phase 3 Depth: Mistake-Remediation Loop, Prerequisite Micro-Review, and Today's Mission
 */
const AdaptiveLearningOS = (() => {
  // Global View Preferences
  let preferences = {
    showStress: true,
    showYo: true,
    showPhonetics: true
  };

  // User Error Tracking System
  // Error Categories: CYRILLIC, PRONUNCIATION, STRESS, GENDER, PLURAL, CONJUGATION, CASE, ASPECT, MOTION_VERB, PREFIX, VOCABULARY
  let errorHistory = {};

  // Leitner 5-Box SRS System
  let srsCards = {};

  // Daily Learning State (20-30 min guided mission)
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
    if (preferences.showStress) {
      document.body.classList.remove('hide-stress');
    } else {
      document.body.classList.add('hide-stress');
    }

    if (preferences.showPhonetics) {
      document.body.classList.remove('hide-phonetics');
    } else {
      document.body.classList.add('hide-phonetics');
    }

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
      streak: 0,
      state: "learning",
      lastReviewed: now,
      nextReview: now
    };

    if (isCorrect) {
      card.box = Math.min(5, card.box + 1);
      card.streak = (card.streak || 0) + 1;
      card.state = card.box >= 4 ? "mastered" : "review";
    } else {
      card.box = 1;
      card.streak = 0;
      card.state = "difficult";
      recordError('VOCABULARY', `Thẻ từ vựng ID: ${cardId}`);
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

  // --- ERROR PATTERN & CLOSED-LOOP REMEDIATION SYSTEM ---
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

  // Mistake -> Explanation -> Similar Practice Closed-Loop
  const remediationDatabase = {
    'CASE': {
      rule: "Trong câu có ngoại động từ (читать, видеть, купить...), danh từ làm bổ ngữ trực tiếp phải chia Cách 4 (Đối cách - Accusative). Giống cái đổi -а thành -у; Giống đực động vật nhận đuôi -а/-я giống Cách 2.",
      wrong_example: "❌ Я вижу брат.",
      correct_example: "✓ Я вижу брата (вижу кого? -> Đối cách giống đực động vật).",
      similar_practice: [
        { q: "Я жду ... (друг).", options: ["друг", "друга", "другу"], correct: 1, why: "Chờ ai -> Đối cách danh từ động vật giống đực: 'друга'." },
        { q: "Антон читает ... (газета).", options: ["газета", "газету", "газете"], correct: 1, why: "Đọc cái gì -> Đối cách giống cái đổi -а thành -у: 'газету'." },
        { q: "Мы купили ... (хлеб).", options: ["хлеб", "хлеба", "хлебу"], correct: 0, why: "Mua cái gì -> Đối cách danh từ bất động vật giống đực giữ nguyên: 'хлеб'." }
      ]
    },
    'ASPECT': {
      rule: "Thể Chưa hoàn thành (НСВ) nhấn mạnh vào quá trình kéo dài, thói quen lặp lại (каждый день). Thể Hoàn thành (СВ) nhấn mạnh vào kết quả đạt được sau hành động.",
      wrong_example: "❌ Каждый день я прочитал книгу.",
      correct_example: "✓ Каждый день я читал книгу (thói quen lặp lại -> bắt buộc dùng НСВ).",
      similar_practice: [
        { q: "Вчера вечером я долго ... (писать / написать) письмо.", options: ["писал (НСВ)", "написал (СВ)"], correct: 0, why: "Có trạng từ 'долго' (quá trình kéo dài) -> dùng НСВ 'писал'." },
        { q: "Я наконец ... (решать / решить) эту сложную задачу.", options: ["решал (НСВ)", "решил (СВ)"], correct: 1, why: "Có 'наконец' (cuối cùng đạt kết quả) -> dùng СВ 'решил'." },
        { q: "Каждое утро Анна ... (пить / выпить) кофе.", options: ["пьёт (НСВ)", "выпьет (СВ)"], correct: 0, why: "'Каждое утро' (thói quen hàng ngày) -> bắt buộc dùng НСВ 'пьёт'." }
      ]
    },
    'GENDER': {
      rule: "Danh từ tiếng Nga: Tận cùng phụ âm là Giống đực (он); tận cùng -а/-я là Giống cái (она); tận cùng -о/-е là Giống trung (оно). Đại từ sở hữu và tính từ phải hòa hợp theo giống danh từ.",
      wrong_example: "❌ Это моя дом.",
      correct_example: "✓ Это мой дом ('дом' tận cùng bằng phụ âm -> giống đực -> 'мой').",
      similar_practice: [
        { q: "Это ... (книга).", options: ["мой", "моя", "моё"], correct: 1, why: "'книга' tận cùng đuôi -а -> Giống cái -> 'моя'." },
        { q: "Где ... (окно)?", options: ["наш", "наша", "наше"], correct: 2, why: "'окно' tận cùng đuôi -о -> Giống trung -> 'наше'." },
        { q: "Это ... (студент).", options: ["новый", "новая", "новое"], correct: 0, why: "'студент' là danh từ giống đực -> tính từ đuôi -ый 'новый'." }
      ]
    },
    'MOTION_VERB': {
      rule: "Động từ chuyển động 1 chiều (идти/ехать) chỉ hành động đang diễn ra hướng tới 1 đích đến cụ thể (➔). Động từ đa chiều (ходить/ездить) chỉ thói quen lặp lại hoặc đi lại 2 chiều (⇄).",
      wrong_example: "❌ Сейчас я хожу в университет.",
      correct_example: "✓ Сейчас я иду в университет (bây giờ đang đi về 1 hướng -> dùng 1 chiều 'иду').",
      similar_practice: [
        { q: "Каждый день студенты ... в университет на метро.", options: ["едут (1 chiều)", "ездят (đa chiều)"], correct: 1, why: "'Каждый день' (thói quen lặp lại) -> dùng đa chiều 'ездят'." },
        { q: "Посмотри, куда ... этот автобус?", options: ["идёт", "ходит"], correct: 0, why: "Đang chuyển động tại thời điểm nói -> dùng 1 chiều 'идёт'." }
      ]
    },
    'STRESS': {
      rule: "Trọng âm tiếng Nga có tính năng phân biệt nghĩa (смыслоразличительная роль). Nhấn sai trọng âm có thể làm thay đổi hoàn toàn nghĩa của từ (замо́к: ổ khóa vs за́мок: lâu đài).",
      wrong_example: "❌ Я купил за́мок для двери.",
      correct_example: "✓ Я купил замо́к для двери (ổ khóa cửa -> nhấn âm tiết 2 'замо́к').",
      similar_practice: [
        { q: "Старинный ... (lâu đài) стоит на высокой горе.", options: ["за́мок", "замо́к"], correct: 0, why: "Lâu đài cổ -> nhấn âm 1: 'за́мок'." },
        { q: "Для пирога нужна ... (bột mì).", options: ["му́ка", "мука́"], correct: 1, why: "Bột mì làm bánh -> nhấn âm 2: 'мука́'." }
      ]
    },
    'GRAMMAR_LESSON': {
      rule: "Hãy đọc kỹ lý thuyết bài học và câu hỏi ngữ cảnh trước khi chọn đáp án.",
      wrong_example: "❌ Lỗi ngữ pháp trong bài học.",
      correct_example: "✓ Hãy nắm vững quy tắc và ví dụ mẫu trong bài.",
      similar_practice: [
        { q: "Я живу ... (Москва).", options: ["в Москве", "в Москву", "в Москвы"], correct: 0, why: "Ở đâu (где?) -> Giới cách: 'в Москве'." }
      ]
    }
  };

  function getRemediation(tag) {
    return remediationDatabase[tag] || remediationDatabase['CASE'];
  }

  function checkWeakAreaAlerts() {
    const banner = document.getElementById('weak-area-alert-banner');
    if (!banner) return;

    const weakTags = Object.entries(errorHistory).filter(([tag, data]) => data.count >= 2);
    if (weakTags.length === 0) {
      banner.classList.add('hidden');
      return;
    }

    const [worstTag, data] = weakTags.sort((a, b) => b[1].count - a[1].count)[0];
    const rem = getRemediation(worstTag);

    const tagNamesVi = {
      'CASE': 'Đuôi biến cách 6 Cách (Падежи)',
      'ASPECT': 'Cặp thể động từ (НСВ / СВ)',
      'MOTION_VERB': 'Động từ chuyển động (1 chiều vs Đa chiều)',
      'GENDER': 'Xác định giống danh từ & Hòa hợp tính từ',
      'STRESS': 'Trọng âm & Từ đồng âm dị nghĩa',
      'VOCABULARY': 'Từ vựng & Thẻ nhớ SRS',
      'GRAMMAR_LESSON': 'Bài học ngữ pháp lộ trình'
    };

    banner.classList.remove('hidden');
    banner.innerHTML = `
      <div class="bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700/60 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-3xl">💡</span>
            <div>
              <span class="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">Closed-Loop Mistake Remediation (Đóng kín vòng lặp sư phạm)</span>
              <h4 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Khắc phục điểm yếu: ${tagNamesVi[worstTag] || worstTag} (Ghi nhận ${data.count} lỗi)
              </h4>
            </div>
          </div>
          <button class="px-3 py-1.5 rounded-xl bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-xs font-bold hover:bg-amber-300 transition-colors self-start sm:self-auto"
                  onclick="AdaptiveLearningOS.dismissRemediation('${worstTag}')">
            Đã hiểu & Bỏ qua ✕
          </button>
        </div>

        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-2">
          <p><strong>📖 Quy tắc cần nhớ:</strong> ${rem.rule}</p>
          <div class="flex flex-col sm:flex-row gap-3 pt-1">
            <span class="text-rose-600 dark:text-rose-400 font-mono font-bold">${rem.wrong_example}</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-mono font-bold">${rem.correct_example}</span>
          </div>
        </div>

        <!-- 3 Similar Practice Questions for Mastery -->
        <div class="space-y-3 pt-2">
          <h5 class="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
            🔄 Luyện tập 3 câu tương tự để làm chủ hoàn toàn:
          </h5>
          <div class="space-y-2.5">
            ${rem.similar_practice.map((item, qIdx) => `
              <div class="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-amber-200/80 dark:border-amber-800/60 space-y-2 text-xs">
                <p class="font-bold text-slate-800 dark:text-slate-200 font-cyrillic">${qIdx + 1}. ${item.q}</p>
                <div class="flex flex-wrap gap-2">
                  ${item.options.map((opt, oIdx) => `
                    <button class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-blue-500 font-semibold transition-all font-cyrillic"
                            onclick="AdaptiveLearningOS.checkRemediationAnswer('${worstTag}', ${qIdx}, ${oIdx}, this)">
                      ${opt}
                    </button>
                  `).join('')}
                </div>
                <div id="rem-why-${worstTag}-${qIdx}" class="hidden p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[11px] text-blue-900 dark:text-blue-200">
                  <strong>💡 Giải thích:</strong> ${item.why}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function checkRemediationAnswer(tag, qIdx, oIdx, btnEl) {
    const rem = getRemediation(tag);
    const item = rem.similar_practice[qIdx];
    const parent = btnEl.closest('.space-y-2');
    const allBtns = parent.querySelectorAll('button');
    allBtns.forEach(b => b.disabled = true);

    if (oIdx === item.correct) {
      btnEl.classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/60', 'text-emerald-700', 'font-bold');
      App.triggerConfetti();
    } else {
      btnEl.classList.add('border-rose-500', 'bg-rose-50', 'dark:bg-rose-950/60', 'text-rose-700');
      allBtns[item.correct].classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/60', 'text-emerald-700', 'font-bold');
    }

    const whyEl = document.getElementById(`rem-why-${tag}-${qIdx}`);
    if (whyEl) whyEl.classList.remove('hidden');
  }

  function dismissRemediation(tag) {
    if (errorHistory[tag]) {
      errorHistory[tag].count = 0;
      localStorage.setItem('ussr_error_history', JSON.stringify(errorHistory));
    }
    checkWeakAreaAlerts();
  }

  // --- ADAPTIVE PREREQUISITE REVIEW ("REVIEW BEFORE NEW") ---
  function checkPrerequisite(targetLevel) {
    if (targetLevel === 'A1.2' || targetLevel === 'A2.1') {
      const genderErrors = errorHistory['GENDER']?.count || 0;
      if (genderErrors >= 2) {
        return {
          needsReview: true,
          prereqName: "Giống danh từ & Đại từ sở hữu (A1.1)",
          reason: "Bạn có một số nhầm lẫn ở phần xác định Giống danh từ. Hãy ôn tập nhanh 3 phút trước khi học Biến cách.",
          actionTab: "tab-alphabet"
        };
      }
    }
    if (targetLevel === 'A2.2') {
      const aspectErrors = errorHistory['ASPECT']?.count || 0;
      if (aspectErrors >= 2) {
        return {
          needsReview: true,
          prereqName: "Cặp thể động từ НСВ / СВ (A2.1)",
          reason: "Bạn cần nắm chắc sự khác biệt giữa quá trình và kết quả trước khi học Động từ chuyển động.",
          actionTab: "tab-practice"
        };
      }
    }
    return { needsReview: false };
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

  function calculateDynamicBudget() {
    const srsDue = getDueSRSCardsCount();
    const weakTags = Object.entries(errorHistory).filter(([tag, data]) => data.count >= 2);
    const hasRecentGrammarMistake = weakTags.some(([tag]) => ['CASE', 'ASPECT', 'MOTION_VERB', 'GENDER'].includes(tag));

    if (srsDue >= 20) {
      return {
        badge: `SRS Priority (${srsDue} thẻ đến hạn)`,
        note: `Hệ thống tự động phân bổ thêm thời gian ôn tập SRS để ngăn ngừa sụp đổ đường cong trí nhớ (Forgetting Curve).`,
        steps: [
          { tag: '1. SRS Khẩn cấp', time: '10 phút', title: '1. Повторение (SRS Khẩn cấp)', desc: `${srsDue} thẻ đến hạn cần ôn để củng cố trí nhớ dài hạn.`, done: srsDue === 0, action: "App.switchTab('tab-flashcard')", btnText: `Ôn ${srsDue} thẻ ➔` },
          { tag: '2. Bài học mới', time: '8 phút', title: '2. Новый урок (Bài học mới)', desc: 'Học cô đọng lý thuyết và làm bài tập nhận diện.', done: dailyState.grammarDone > 0, action: "App.switchTab('tab-curriculum')", btnText: 'Vào bài học ➔' },
          { tag: '3. Luyện nói', time: '4 phút', title: '3. Слушай и говори (Luyện nói)', desc: '1 lượt Shadowing và tự đối chiếu A/B phòng thu.', done: dailyState.speakingDone > 0, action: "App.switchTab('tab-speaking')", btnText: 'Vào phòng thu ➔' },
          { tag: '4. Sửa lỗi nhanh', time: '3 phút', title: '4. Исправь ошибки (Sửa lỗi)', desc: 'Củng cố nhanh điểm yếu ngữ pháp.', done: false, action: "AdaptiveLearningOS.triggerWeakAreaCheck()", btnText: 'Luyện 3 câu ➔' }
        ]
      };
    } else if (hasRecentGrammarMistake) {
      const worstTag = weakTags[0][0];
      return {
        badge: `Remediation Priority (Vá lỗ hổng ${worstTag})`,
        note: `Hệ thống phát hiện bạn có lỗi sai gần đây. Ưu tiên vá lỗ hổng ngữ pháp trước khi học kiến thức mới.`,
        steps: [
          { tag: '1. Trọng tâm sửa lỗi', time: '7 phút', title: '1. Исправь ошибки (Trọng tâm sửa lỗi)', desc: 'Luyện 3 câu củng cố quy tắc ngữ pháp vừa sai.', done: false, action: "AdaptiveLearningOS.triggerWeakAreaCheck()", btnText: 'Sửa lỗi ngay ➔' },
          { tag: '2. Bài học mới', time: '10 phút', title: '2. Новый урок (Bài học mới)', desc: 'Học bài mới với sự tự tin sau khi đã củng cố nền tảng.', done: dailyState.grammarDone > 0, action: "App.switchTab('tab-curriculum')", btnText: 'Vào bài học ➔' },
          { tag: '3. Ôn tập SRS', time: '4 phút', title: '3. Повторение (Ôn tập SRS)', desc: `${srsDue} thẻ từ vựng đến hạn hôm nay.`, done: srsDue === 0, action: "App.switchTab('tab-flashcard')", btnText: srsDue > 0 ? `Ôn ${srsDue} thẻ ➔` : 'Đã xong ✓' },
          { tag: '4. Luyện nói', time: '4 phút', title: '4. Слушай и говори (Luyện nói)', desc: 'Luyện phát âm câu ngữ cảnh thực tế.', done: dailyState.speakingDone > 0, action: "App.switchTab('tab-speaking')", btnText: 'Vào phòng thu ➔' }
        ]
      };
    } else {
      return {
        badge: 'Balanced Flow (Lộ trình cân bằng chuẩn)',
        note: 'Bạn không cần băn khoăn hôm nay học gì. Chỉ cần mở web và đi qua chuỗi 4 bước khép kín dưới đây:',
        steps: [
          { tag: '1. Ôn tập SRS', time: '5 phút', title: '1. Повторение (Ôn tập SRS)', desc: 'Ôn thẻ từ vựng Leitner đến hạn & củng cố trí nhớ.', done: srsDue === 0, action: "App.switchTab('tab-flashcard')", btnText: srsDue > 0 ? `Ôn ${srsDue} thẻ ➔` : 'Đã ôn xong ✓' },
          { tag: '2. Bài học mới', time: '10 phút', title: '2. Новый урок (Bài học mới)', desc: '1 bài học lộ trình theo chuẩn 17 bước và làm bài tập kiểm soát.', done: dailyState.grammarDone > 0, action: "App.switchTab('tab-curriculum')", btnText: 'Vào bài học lộ trình ➔' },
          { tag: '3. Luyện nói', time: '5 phút', title: '3. Слушай и говори (Luyện nói)', desc: 'Nghe đoạn hội thoại và tự thu âm đối chiếu A/B phòng thu.', done: dailyState.speakingDone > 0, action: "App.switchTab('tab-speaking')", btnText: 'Vào Speaking Studio ➔' },
          { tag: '4. Sửa lỗi', time: '5 phút', title: '4. Исправь ошибки (Sửa lỗi)', desc: 'Vòng lặp khép kín: Khắc phục điểm yếu ngữ pháp & trọng âm.', done: false, action: "AdaptiveLearningOS.triggerWeakAreaCheck()", btnText: 'Luyện 3 câu củng cố ➔' }
        ]
      };
    }
  }

  function renderDailyMissionWidget() {
    const container = document.getElementById('daily-mission-widget');
    if (!container) return;

    const budget = calculateDynamicBudget();

    container.innerHTML = `
      <div class="bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 dark:from-slate-800 dark:via-slate-850 dark:to-indigo-950/30 rounded-3xl p-6 sm:p-8 border border-blue-200/80 dark:border-blue-900/50 shadow-lg space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-700">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold shadow-sm">
                Сегодня — 25 минут
              </span>
              <h4 class="font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl">
                Nhiệm Vụ Học Tập Trọng Tâm Hôm Nay
              </h4>
            </div>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              ${budget.note}
            </p>
          </div>
          <span class="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-4 py-2 rounded-2xl self-start sm:self-auto border border-blue-200 dark:border-blue-800">
            ⏱️ ${budget.badge}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          ${budget.steps.map((st, idx) => `
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between">
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold text-blue-600 uppercase">${st.tag} • ${st.time}</span>
                  <span class="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${st.done ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-300'}">
                    ${st.done ? '✓' : idx + 1}
                  </span>
                </div>
                <h5 class="font-bold text-slate-900 dark:text-white text-sm">${st.title}</h5>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">${st.desc}</p>
              </div>
              <button class="w-full py-2 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-300 font-bold rounded-xl transition-all text-xs"
                      onclick="${st.action}">
                ${st.btnText}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function triggerWeakAreaCheck() {
    checkWeakAreaAlerts();
    const banner = document.getElementById('weak-area-alert-banner');
    if (banner && !banner.classList.contains('hidden')) {
      banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      App.showToast('Tuyệt vời! Hiện tại bạn không có điểm yếu nào cần khắc phục gấp.', 'success');
    }
  }

  return {
    init,
    preferences,
    formatWord,
    recordSRSAnswer,
    recordError,
    recordMistake: recordError,
    checkPrerequisite,
    checkRemediationAnswer,
    dismissRemediation,
    triggerWeakAreaCheck,
    dailyState,
    saveDailyState
  };
})();

window.AdaptiveLearningOS = AdaptiveLearningOS;
