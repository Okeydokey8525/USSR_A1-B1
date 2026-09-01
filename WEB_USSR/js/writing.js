/**
 * WEB_USSR - Writing Studio (Студия письма)
 */
const WritingModule = (() => {
  let writingTasks = [];
  let currentTaskId = null;

  async function init() {
    try {
      const resp = await fetch('data/writing_data.json');
      const data = await resp.json();
      writingTasks = data.tasks;
      currentTaskId = writingTasks[0]?.id || null;

      renderTaskSelector();
      renderActiveTask();
    } catch (e) {
      console.error('Failed to load writing data:', e);
    }
  }

  function renderTaskSelector() {
    const listContainer = document.getElementById('writing-tasks-list');
    if (!listContainer) return;

    listContainer.innerHTML = writingTasks.map(t => {
      const isActive = t.id === currentTaskId;
      return `
        <button class="w-full text-left p-4 rounded-2xl border transition-all ${
          isActive 
            ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-800 dark:text-slate-200'
        }" onclick="WritingModule.selectTask('${t.id}')">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-extrabold px-2 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'}">
              ${t.level}
            </span>
            <span class="text-xs opacity-75">${t.min_words} - ${t.max_words} từ</span>
          </div>
          <h4 class="font-bold text-sm truncate">${t.title}</h4>
        </button>
      `;
    }).join('');
  }

  function selectTask(id) {
    currentTaskId = id;
    renderTaskSelector();
    renderActiveTask();
  }

  function renderActiveTask() {
    const container = document.getElementById('writing-active-content');
    if (!container) return;

    const task = writingTasks.find(t => t.id === currentTaskId);
    if (!task) return;

    const savedDraft = localStorage.getItem(`ussr_write_draft_${task.id}`) || '';

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <!-- Header -->
        <div class="pb-6 border-b border-slate-100 dark:border-slate-700">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">${task.level}</span>
            <span class="text-xs text-slate-400">Độ dài mục tiêu: ${task.min_words} - ${task.max_words} từ</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">${task.title}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 mt-2 p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30">
            <strong>Đề bài:</strong> ${task.prompt}
          </p>
        </div>

        <!-- Redemittel / Useful Phrases Accordion -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
          <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Khung cấu trúc câu mẫu gợi ý (Полезные фразы)
          </h4>
          <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            ${task.redemittel.map(r => `<li class="flex items-start gap-2"><span class="text-blue-500 font-bold">•</span><span>${r}</span></li>`).join('')}
          </ul>
        </div>

        <!-- Live Writing Textarea -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold">
            <span class="text-slate-500">Bài viết của bạn (Viết bằng tiếng Nga):</span>
            <span id="writing-word-count" class="font-mono text-blue-600 dark:text-blue-400">0 từ</span>
          </div>
          <textarea id="writing-input-area" rows="7" placeholder="Начните писать здесь по-русски..."
                    class="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-cyrillic text-sm sm:text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all">${savedDraft}</textarea>
        </div>

        <!-- Self-Check Checklist -->
        <div class="space-y-3 pt-2">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tiêu chí tự kiểm tra (Чек-лист)</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${task.checklist.map((item, idx) => `
              <label class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                <span>${item}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Action Controls & Model Answer -->
        <div class="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <button class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                  onclick="WritingModule.saveDraft()">
            Lưu bài viết 💾
          </button>

          <button class="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
                  onclick="WritingModule.toggleModelAnswer()">
            Xem bài viết mẫu tham chiếu 👁️
          </button>
        </div>

        <div id="writing-model-answer" class="hidden p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
          <h5 class="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Bài viết mẫu chuẩn (Образец ответа):</h5>
          <p class="text-sm font-bold text-slate-800 dark:text-slate-200 font-cyrillic whitespace-pre-line leading-relaxed">
            ${task.model_answer}
          </p>
        </div>
      </div>
    `;

    setupInputListener();
    updateWordCount();
  }

  function setupInputListener() {
    const textarea = document.getElementById('writing-input-area');
    if (!textarea) return;
    textarea.addEventListener('input', () => {
      updateWordCount();
      localStorage.setItem(`ussr_write_draft_${currentTaskId}`, textarea.value);
    });
  }

  function updateWordCount() {
    const textarea = document.getElementById('writing-input-area');
    const counterEl = document.getElementById('writing-word-count');
    if (!textarea || !counterEl) return;

    const text = textarea.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    const task = writingTasks.find(t => t.id === currentTaskId);
    
    counterEl.textContent = `${words} từ ${task ? `(mục tiêu: ${task.min_words}-${task.max_words})` : ''}`;
    if (task && words >= task.min_words && words <= task.max_words) {
      counterEl.className = 'font-mono text-emerald-600 dark:text-emerald-400 font-bold';
    } else {
      counterEl.className = 'font-mono text-blue-600 dark:text-blue-400';
    }
  }

  function saveDraft() {
    App.showToast('Đã lưu bài viết vào trình duyệt!', 'success');
  }

  function toggleModelAnswer() {
    const el = document.getElementById('writing-model-answer');
    if (!el) return;
    el.classList.toggle('hidden');
  }

  return {
    init,
    selectTask,
    saveDraft,
    toggleModelAnswer
  };
})();

window.WritingModule = WritingModule;
