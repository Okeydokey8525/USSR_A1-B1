/**
 * WEB_USSR - Russian Speech Engine (Web Speech API ru-RU)
 */
const RussianSpeech = (() => {
  let russianVoice = null;
  let isInitialized = false;
  let currentUtterance = null;

  function initVoices() {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech Synthesis not supported in this browser.');
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Try to find native Russian voice
      russianVoice = voices.find(v => v.lang.startsWith('ru') || v.lang === 'ru-RU') ||
                     voices.find(v => v.name.toLowerCase().includes('russian') || v.name.toLowerCase().includes('русск')) ||
                     null;
      isInitialized = true;
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function cleanStressMarks(text) {
    // Remove Unicode combining acute accent (\u0301) and acute accent character (\u00B4) for speech synthesis
    if (!text) return '';
    return text.replace(/[\u0301\u00B4]/g, '').replace(/́/g, '').trim();
  }

  function speak(text, rate = 0.9, onEndCallback = null) {
    if (!('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ Web Speech API', 'warning');
      return;
    }

    // Stop current speech
    window.speechSynthesis.cancel();

    const cleanText = cleanStressMarks(text);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ru-RU';
    utterance.rate = rate; // slightly slower for language learners (0.85 - 0.9)
    utterance.pitch = 1.0;

    if (russianVoice) {
      utterance.voice = russianVoice;
    }

    utterance.onstart = () => {
      document.body.classList.add('tts-speaking');
    };

    utterance.onend = () => {
      document.body.classList.remove('tts-speaking');
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (e) => {
      document.body.classList.remove('tts-speaking');
      console.warn('Speech error:', e);
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      document.body.classList.remove('tts-speaking');
    }
  }

  // Initialize on script load
  if (typeof window !== 'undefined') {
    initVoices();
  }

  return {
    speak,
    stop,
    cleanStressMarks
  };
})();

window.RussianSpeech = RussianSpeech;
