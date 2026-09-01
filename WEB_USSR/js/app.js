/**
 * WEB_USSR - Master Application Controller
 */
const App = (() => {
  let currentActiveTab = 'tab-home';
  let isDarkMode = false;

  function init() {
    initTheme();
    setupNavigation();
    initModules();
    updateStreak();
  }

  function initTheme() {
    const saved = localStorage.getItem('ussr_theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      isDarkMode = true;
    } else {
      document.documentElement.classList.remove('dark');
      isDarkMode = false;
    }
  }

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ussr_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ussr_theme', 'light');
    }
  }

  function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.target;
        if (targetTab) {
          switchTab(targetTab);
        }
      });
    });
  }

  function switchTab(tabId) {
    currentActiveTab = tabId;

    // Update Tab Content Panels
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => {
      panel.classList.toggle('hidden', panel.id !== tabId);
    });

    // Update Nav Buttons
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    navButtons.forEach(btn => {
      const isTarget = btn.dataset.target === tabId;
      if (isTarget) {
        btn.classList.add('active', 'bg-blue-600', 'text-white');
        btn.classList.remove('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      } else {
        btn.classList.remove('active', 'bg-blue-600', 'text-white');
        btn.classList.add('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initModules() {
    if (window.AdaptiveLearningOS) window.AdaptiveLearningOS.init();
    if (window.CurriculumEngine) window.CurriculumEngine.init();
    if (window.AlphabetModule) window.AlphabetModule.init();
    if (window.FlashcardModule) window.FlashcardModule.init();
    if (window.CasesMatrixModule) window.CasesMatrixModule.init();
    if (window.GrammarPracticeModule) window.GrammarPracticeModule.init();
    if (window.ReadingModule) window.ReadingModule.init();
    if (window.WritingModule) window.WritingModule.init();
    if (window.SpeakingModule) window.SpeakingModule.init();
    if (window.SurvivalModule) window.SurvivalModule.init();
    if (window.LessonsModule) window.LessonsModule.init();
    if (window.TRKIExamModule) window.TRKIExamModule.init();
    if (window.PlacementModule) window.PlacementModule.init();
  }

  function updateStreak() {
    let streak = parseInt(localStorage.getItem('ussr_streak') || '1', 10);
    const lastDate = localStorage.getItem('ussr_last_active_date');
    const today = new Date().toISOString().split('T')[0];

    if (lastDate !== today) {
      localStorage.setItem('ussr_last_active_date', today);
      localStorage.setItem('ussr_streak', streak.toString());
    }

    const streakEl = document.getElementById('user-streak-display');
    if (streakEl) streakEl.textContent = `${streak} ngày`;
  }

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    const bgColors = {
      success: 'bg-emerald-600 text-white',
      error: 'bg-rose-600 text-white',
      warning: 'bg-amber-600 text-white',
      info: 'bg-blue-600 text-white'
    }[type] || 'bg-slate-900 text-white';

    toast.className = `fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 transform transition-all duration-300 translate-y-12 opacity-0 ${bgColors}`;
    toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span><span>${message}</span>`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.remove('translate-y-12', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('translate-y-12', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  }

  return {
    init,
    toggleTheme,
    switchTab,
    showToast,
    triggerConfetti
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;
