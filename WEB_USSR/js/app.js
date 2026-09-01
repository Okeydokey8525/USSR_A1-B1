/**
 * WEB_USSR - Main Application Controller
 */
const App = (() => {
  let currentTab = 'tab-alphabet';
  let isDarkMode = false;

  function init() {
    initTheme();
    initStreak();
    initTabNavigation();
    initModules();
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('ussr_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      isDarkMode = true;
    } else {
      document.documentElement.classList.remove('dark');
      isDarkMode = false;
    }

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
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

  function initStreak() {
    const today = new Date().toISOString().split('T')[0];
    let streakCount = parseInt(localStorage.getItem('ussr_streak_count') || '1');
    const lastActiveDate = localStorage.getItem('ussr_last_active_date');

    if (lastActiveDate) {
      const lastDate = new Date(lastActiveDate);
      const curDate = new Date(today);
      const diffDays = Math.floor((curDate - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streakCount++;
        localStorage.setItem('ussr_streak_count', streakCount.toString());
      } else if (diffDays > 1) {
        streakCount = 1;
        localStorage.setItem('ussr_streak_count', '1');
      }
    }

    localStorage.setItem('ussr_last_active_date', today);

    const streakEl = document.getElementById('streak-counter-value');
    if (streakEl) {
      streakEl.textContent = streakCount;
    }
  }

  function initTabNavigation() {
    // Desktop Nav Items
    const desktopTabs = document.querySelectorAll('.nav-tab-btn');
    desktopTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
      });
    });

    // Mobile Bottom Nav Items
    const mobileTabs = document.querySelectorAll('.mobile-nav-btn');
    mobileTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
      });
    });
  }

  function switchTab(tabId) {
    currentTab = tabId;

    // Update Content Visibility
    document.querySelectorAll('.tab-content').forEach(tab => {
      if (tab.id === tabId) {
        tab.classList.remove('hidden');
        tab.classList.add('fade-in');
      } else {
        tab.classList.add('hidden');
        tab.classList.remove('fade-in');
      }
    });

    // Update Desktop Nav Active States
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active', 'border-blue-600', 'text-blue-600', 'dark:text-blue-400');
        btn.classList.remove('border-transparent', 'text-slate-600', 'dark:text-slate-400');
      } else {
        btn.classList.remove('active', 'border-blue-600', 'text-blue-600', 'dark:text-blue-400');
        btn.classList.add('border-transparent', 'text-slate-600', 'dark:text-slate-400');
      }
    });

    // Update Mobile Nav Active States
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('text-blue-600', 'dark:text-blue-400');
        btn.classList.remove('text-slate-400', 'dark:text-slate-500');
      } else {
        btn.classList.remove('text-blue-600', 'dark:text-blue-400');
        btn.classList.add('text-slate-400', 'dark:text-slate-500');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initModules() {
    if (window.AlphabetModule) AlphabetModule.init();
    if (window.FlashcardModule) FlashcardModule.init();
    if (window.CasesMatrixModule) CasesMatrixModule.init();
    if (window.GrammarPracticeModule) GrammarPracticeModule.init();
    if (window.LessonsModule) LessonsModule.init();
    if (window.TRKIExamModule) TRKIExamModule.init();
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    let colorClasses = 'bg-slate-800 text-white';
    if (type === 'success') colorClasses = 'bg-emerald-600 text-white';
    if (type === 'warning') colorClasses = 'bg-amber-600 text-white';
    if (type === 'error') colorClasses = 'bg-rose-600 text-white';

    toast.className = `${colorClasses} px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-medium transition-all transform translate-y-2 opacity-0 duration-300 pointer-events-auto`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : (type === 'error' ? '✗' : 'ℹ')}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    // Remove after 3s
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#2563eb', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: Math.random() * 6 + 2,
        d: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: (Math.random() * 0.07) + .05,
        tiltAngle: 0,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16 - 6,
        opacity: 1
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let stillActive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // gravity
        p.opacity -= 0.012;

        if (p.opacity > 0) {
          stillActive = true;
          ctx.beginPath();
          ctx.lineWidth = p.r;
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
          ctx.stroke();
        }
      });

      if (stillActive) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }

    render();
  }

  // Auto initialize on DOMContentLoaded
  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
  }

  return {
    init,
    switchTab,
    showToast,
    triggerConfetti
  };
})();

window.App = App;
