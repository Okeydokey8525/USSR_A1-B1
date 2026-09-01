/**
 * WEB_USSR - Lessons & Dialogue Listening Engine
 */
const LessonsModule = (() => {
  let lessonsData = [];
  let currentLessonId = 'lesson_01';
  let isPlayingAll = false;

  async function init() {
    try {
      const resp = await fetch('data/lessons_dialogues.json');
      const data = await resp.json();
      lessonsData = data.lessons;

      renderLessonSelector();
      renderLessonContent(currentLessonId);
    } catch (e) {
      console.error('Failed to load lessons data:', e);
    }
  }

  function renderLessonSelector() {
    const listContainer = document.getElementById('lessons-list-sidebar');
    if (!listContainer) return;

    listContainer.innerHTML = lessonsData.map(lesson => {
      const isActive = lesson.id === currentLessonId;
      return `
        <button class="lesson-nav-item w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
          isActive 
            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' 
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400'
        }" onclick="LessonsModule.selectLesson('${lesson.id}')">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold px-2 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'}">
              ${lesson.level}
            </span>
            <span class="text-[11px] opacity-75">${lesson.dialogue.length} câu thoại</span>
          </div>
          <h4 class="font-bold text-sm leading-snug truncate">${lesson.title}</h4>
          <p class="text-xs opacity-75 mt-1 truncate">${lesson.source}</p>
        </button>
      `;
    }).join('');
  }

  function selectLesson(id) {
    currentLessonId = id;
    renderLessonSelector();
    renderLessonContent(id);
  }

  function renderLessonContent(id) {
    const lesson = lessonsData.find(l => l.id === id);
    if (!lesson) return;

    const container = document.getElementById('lesson-detail-container');
    if (!container) return;

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <!-- Lesson Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-700">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">${lesson.level}</span>
              <span class="text-xs text-slate-400 font-medium">${lesson.source}</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">${lesson.title}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${lesson.description}</p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button id="play-entire-dialogue-btn"
                    class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
                    onclick="LessonsModule.playAllDialogue()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Nghe toàn bộ hội thoại
            </button>
          </div>
        </div>

        <!-- Chat Bubble Dialogue View -->
        <div class="space-y-4 py-2" id="dialogue-bubbles-container">
          ${lesson.dialogue.map((line, idx) => `
            <div id="dialogue-line-${idx}" class="dialogue-bubble group flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-600/50 transition-all">
              <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl shadow-md flex-shrink-0">
                ${line.avatar}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">${line.speaker}</span>
                  <button class="w-7 h-7 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-300 flex items-center justify-center border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
                          onclick="RussianSpeech.speak('${line.audio}')" title="Nghe câu này">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                  </button>
                </div>
                <p class="font-bold text-slate-800 dark:text-white text-base font-cyrillic">${line.ru}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${line.vi}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Key Vocabulary -->
        <div class="pt-4 border-t border-slate-100 dark:border-slate-700">
          <h4 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">Từ vựng trọng tâm bài học</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            ${lesson.key_vocab.map(v => `
              <div class="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                <div>
                  <span class="font-bold text-blue-700 dark:text-blue-300 font-cyrillic text-sm block">${v.word}</span>
                  <span class="text-xs text-slate-500 dark:text-slate-400">${v.meaning}</span>
                </div>
                <button class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                        onclick="RussianSpeech.speak('${v.word}')">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  async function playAllDialogue() {
    const lesson = lessonsData.find(l => l.id === currentLessonId);
    if (!lesson) return;

    isPlayingAll = true;
    for (let i = 0; i < lesson.dialogue.length; i++) {
      if (!isPlayingAll) break;
      const line = lesson.dialogue[i];
      const bubble = document.getElementById(`dialogue-line-${i}`);
      
      // Highlight current speaking bubble
      document.querySelectorAll('.dialogue-bubble').forEach(b => b.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-50/80', 'dark:bg-blue-950/60'));
      if (bubble) {
        bubble.classList.add('ring-2', 'ring-blue-500', 'bg-blue-50/80', 'dark:bg-blue-950/60');
        bubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      await new Promise(resolve => {
        RussianSpeech.speak(line.audio, 0.85, () => {
          setTimeout(resolve, 500); // 500ms pause between dialogue lines
        });
      });
    }

    document.querySelectorAll('.dialogue-bubble').forEach(b => b.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-50/80', 'dark:bg-blue-950/60'));
    isPlayingAll = false;
  }

  return {
    init,
    selectLesson,
    playAllDialogue
  };
})();

window.LessonsModule = LessonsModule;
