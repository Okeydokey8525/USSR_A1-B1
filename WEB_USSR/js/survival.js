/**
 * WEB_USSR - Survival Russian (Русский для выживания)
 * Features: Phrase Grid & Heuristic Role-Play Dialogue Arena
 */
const SurvivalModule = (() => {
  let scenarios = [];
  let currentScenarioId = 'surv_shop';
  let searchTerm = '';

  const roleplayPrompts = {
    'surv_shop': {
      npc_ask: "Здравствуйте! Чем я могу вам помочь?",
      npc_ask_vi: "Xin chào! Tôi có thể giúp gì cho bạn?",
      hint: "Hãy thử nói: 'Сколько стоит эта книга?' hoặc 'Дайте, пожалуйста, хлеб và молоко.'",
      target_keywords: ["сколько", "стоит", "дайте", "пожалуйста", "хлеб", "молоко", "книга", "пакет", "рублей"]
    },
    'surv_restaurant': {
      npc_ask: "Добрый день! Что вы будете заказывать?",
      npc_ask_vi: "Chào bạn! Bạn muốn gọi món gì?",
      hint: "Hãy thử nói: 'Принесите, пожалуйста, меню' hoặc 'Я буду кофе и борщ.'",
      target_keywords: ["меню", "принесите", "буду", "кофе", "чай", "борщ", "счёт", "пожалуйста"]
    },
    'surv_hotel': {
      npc_ask: "Здравствуйте! У вас забронирован номер?",
      npc_ask_vi: "Xin chào! Bạn đã đặt phòng trước chưa?",
      hint: "Hãy thử nói: 'Да, у меня бронь на имя Луонг' hoặc 'У вас есть свободные номера?'",
      target_keywords: ["бронь", "номер", "имя", "паспорт", "ключ", "wi-fi", "пароль"]
    }
  };

  async function init() {
    try {
      const resp = await fetch('data/survival_data.json');
      const data = await resp.json();
      scenarios = data.scenarios;
      currentScenarioId = scenarios[0]?.id || 'surv_shop';

      renderScenarioTabs();
      renderPhrases();
      renderRoleplayArena();
      setupSearch();
    } catch (e) {
      console.error('Failed to load survival data:', e);
    }
  }

  function renderScenarioTabs() {
    const container = document.getElementById('survival-scenario-tabs');
    if (!container) return;

    container.innerHTML = scenarios.map(sc => {
      const isActive = sc.id === currentScenarioId;
      return `
        <button class="px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
          isActive 
            ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
        }" onclick="SurvivalModule.selectScenario('${sc.id}')">
          <span class="text-base">${sc.icon}</span>
          <span>${sc.title.split('(')[0]}</span>
        </button>
      `;
    }).join('');
  }

  function selectScenario(id) {
    currentScenarioId = id;
    renderScenarioTabs();
    renderPhrases();
    renderRoleplayArena();
  }

  function setupSearch() {
    const searchInput = document.getElementById('survival-search-input');
    if (!searchInput) return;
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      renderPhrases();
    });
  }

  function renderPhrases() {
    const container = document.getElementById('survival-phrases-grid');
    if (!container) return;

    const scenario = scenarios.find(s => s.id === currentScenarioId);
    if (!scenario) return;

    let phrases = scenario.phrases;
    if (searchTerm) {
      phrases = phrases.filter(p => 
        p.ru.toLowerCase().includes(searchTerm) || 
        p.vi.toLowerCase().includes(searchTerm) ||
        p.phonetic.toLowerCase().includes(searchTerm)
      );
    }

    if (phrases.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          Không tìm thấy mẫu câu phù hợp với từ khóa "${searchTerm}".
        </div>
      `;
      return;
    }

    container.innerHTML = phrases.map(p => `
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between gap-3 hover:border-blue-400 transition-all">
        <div class="space-y-1">
          <div class="flex items-start justify-between gap-2">
            <h4 class="font-bold text-base sm:text-lg text-slate-800 dark:text-white font-cyrillic">${p.ru}</h4>
            <button class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors flex-shrink-0"
                    onclick="RussianSpeech.speak('${p.ru}')">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            </button>
          </div>
          <p class="text-xs text-blue-600 dark:text-blue-400 font-mono">${p.phonetic}</p>
        </div>
        <p class="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700/60">
          ${p.vi}
        </p>
      </div>
    `).join('');
  }

  function renderRoleplayArena() {
    let rpContainer = document.getElementById('survival-roleplay-arena');
    if (!rpContainer) {
      const parent = document.getElementById('tab-survival');
      if (!parent) return;
      rpContainer = document.createElement('div');
      rpContainer.id = 'survival-roleplay-arena';
      rpContainer.className = 'pt-6 border-t border-slate-200 dark:border-slate-700';
      parent.appendChild(rpContainer);
    }

    const rp = roleplayPrompts[currentScenarioId] || roleplayPrompts['surv_shop'];

    rpContainer.innerHTML = `
      <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 text-[11px] font-extrabold rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/40">
              Role-Play Tương Tác
            </span>
            <span class="text-xs text-slate-400 font-bold">Thực hành phản xạ tự do</span>
          </div>
          <button class="text-xs text-blue-300 hover:text-white" onclick="RussianSpeech.speak('${rp.npc_ask}')">
            🔊 Nghe NPC nói
          </button>
        </div>

        <!-- NPC Bubble -->
        <div class="flex items-start gap-3 p-4 rounded-2xl bg-white/10 border border-white/15">
          <span class="text-2xl">👤</span>
          <div class="space-y-0.5">
            <span class="text-xs font-bold text-blue-300">Người bản xứ hỏi bạn:</span>
            <h4 class="text-base sm:text-lg font-bold font-cyrillic">${rp.npc_ask}</h4>
            <p class="text-xs text-slate-300 italic">(${rp.npc_ask_vi})</p>
          </div>
        </div>

        <!-- User Response Area -->
        <div class="space-y-3">
          <span class="text-xs font-bold text-slate-300 block">Câu trả lời tiếng Nga của bạn:</span>
          <div class="flex flex-col sm:flex-row gap-2">
            <input type="text" id="survival-roleplay-input" placeholder="Nhập câu trả lời bằng tiếng Nga..."
                   class="flex-1 p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-cyrillic text-sm focus:outline-none focus:border-blue-400">
            <button class="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
                    onclick="SurvivalModule.evaluateRoleplay()">
              Gửi câu trả lời 🚀
            </button>
          </div>
          <p class="text-xs text-slate-400 italic">💡 Gợi ý: ${rp.hint}</p>
        </div>

        <!-- Feedback Box -->
        <div id="survival-roleplay-feedback" class="hidden p-4 rounded-2xl"></div>
      </div>
    `;
  }

  function evaluateRoleplay() {
    const input = document.getElementById('survival-roleplay-input');
    const fb = document.getElementById('survival-roleplay-feedback');
    if (!input || !fb) return;

    const val = input.value.trim().toLowerCase();
    if (!val) {
      App.showToast('Vui lòng nhập câu trả lời của bạn.', 'warning');
      return;
    }

    const rp = roleplayPrompts[currentScenarioId] || roleplayPrompts['surv_shop'];
    const matched = rp.target_keywords.filter(k => val.includes(k));

    if (matched.length >= 1) {
      fb.className = 'p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs space-y-1';
      fb.innerHTML = `
        <strong>✓ Đạt yêu cầu phản xạ!</strong>
        <p>Hệ thống nhận diện được từ khóa giao tiếp phù hợp: <em>${matched.join(', ')}</em>.</p>
      `;
      fb.classList.remove('hidden');
      App.triggerConfetti();
    } else {
      fb.className = 'p-4 rounded-2xl bg-amber-950/80 border border-amber-600 text-amber-200 text-xs space-y-1';
      fb.innerHTML = `
        <strong>💡 Đề xuất chỉnh sửa:</strong>
        <p>Câu trả lời của bạn có thể diễn đạt tự nhiên hơn với mẫu câu gợi ý: <em>${rp.hint}</em></p>
      `;
      fb.classList.remove('hidden');
    }
  }

  return {
    init,
    selectScenario,
    evaluateRoleplay
  };
})();

window.SurvivalModule = SurvivalModule;
