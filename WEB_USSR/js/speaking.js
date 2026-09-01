/**
 * WEB_USSR - Speaking Studio (Студия говорения)
 * Method: Honest A/B Audio Replay Comparison & 6-Point Phonetic Self-Check
 */
const SpeakingModule = (() => {
  let speakingTopics = [];
  let currentTopicId = null;
  let mediaRecorder = null;
  let audioChunks = [];
  let recordedAudioUrl = null;
  let isRecording = false;

  async function init() {
    try {
      const resp = await fetch('data/speaking_data.json');
      const data = await resp.json();
      speakingTopics = data.topics;
      currentTopicId = speakingTopics[0]?.id || null;

      renderTopicSelector();
      renderActiveTopic();
    } catch (e) {
      console.error('Failed to load speaking data:', e);
    }
  }

  function renderTopicSelector() {
    const listContainer = document.getElementById('speaking-topics-list');
    if (!listContainer) return;

    listContainer.innerHTML = speakingTopics.map(t => {
      const isActive = t.id === currentTopicId;
      return `
        <button class="w-full text-left p-4 rounded-2xl border transition-all ${
          isActive 
            ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-800 dark:text-slate-200'
        }" onclick="SpeakingModule.selectTopic('${t.id}')">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-extrabold px-2 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'}">
              ${t.level}
            </span>
          </div>
          <h4 class="font-bold text-sm truncate">${t.title}</h4>
        </button>
      `;
    }).join('');
  }

  function selectTopic(id) {
    currentTopicId = id;
    recordedAudioUrl = null;
    isRecording = false;
    renderTopicSelector();
    renderActiveTopic();
  }

  function renderActiveTopic() {
    const container = document.getElementById('speaking-active-content');
    if (!container) return;

    const topic = speakingTopics.find(t => t.id === currentTopicId);
    if (!topic) return;

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <!-- Header -->
        <div class="pb-6 border-b border-slate-100 dark:border-slate-700">
          <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">${topic.level}</span>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mt-1">${topic.title}</h3>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">${topic.guide_vi}</p>
        </div>

        <!-- Target Useful Phrases -->
        <div>
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ngân hàng mẫu câu giao tiếp trọng tâm</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${topic.target_phrases.map(p => `
              <div class="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                <span class="font-bold text-slate-800 dark:text-white text-xs sm:text-sm font-cyrillic">${p}</span>
                <button class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors flex-shrink-0 ml-2"
                        onclick="RussianSpeech.speak('${p.split('(')[0].trim()}')">
                  🔊
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Sample Speech -->
        <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Bài nói mẫu chuẩn bản xứ:</h4>
            <button class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                    onclick="RussianSpeech.speak('${topic.sample_speech}')">
              🔊 Nghe bài nói mẫu
            </button>
          </div>
          <p class="font-bold text-slate-800 dark:text-white text-sm sm:text-base font-cyrillic leading-relaxed">
            ${topic.sample_speech}
          </p>
        </div>

        <!-- A/B Comparison Player & Recording Studio -->
        <div class="p-6 rounded-3xl bg-slate-900 text-white space-y-6 shadow-inner">
          <div class="text-center space-y-1">
            <h4 class="text-base font-bold">Phòng Đối Chiếu Âm Thanh A / B (Replay Comparison)</h4>
            <p class="text-xs text-slate-400">Thu âm giọng nói của bạn và so sánh trực tiếp với giọng đọc bản ngữ để tự chỉnh sửa phát âm.</p>
          </div>

          <!-- Record Controls -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button id="speaking-record-btn"
                    class="px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${
                      isRecording 
                        ? 'bg-rose-600 text-white animate-pulse' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }" onclick="SpeakingModule.toggleRecord()">
              <span class="w-3 h-3 rounded-full ${isRecording ? 'bg-white' : 'bg-rose-400'}"></span>
              <span>${isRecording ? 'Đang ghi âm... (Bấm dừng)' : 'Bắt đầu ghi âm 🎙️'}</span>
            </button>
          </div>

          <!-- A/B Comparison Controls -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <!-- Audio A: Native Model -->
            <div class="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2 text-center">
              <span class="text-xs font-bold text-blue-400 uppercase tracking-wider block">Âm thanh A (Giọng bản xứ chuẩn)</span>
              <button class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                      onclick="RussianSpeech.speak('${topic.sample_speech}', 0.85)">
                <span>🔊 Nghe giọng mẫu (0.85x)</span>
              </button>
            </div>

            <!-- Audio B: Learner Recording -->
            <div class="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2 text-center">
              <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Âm thanh B (Bản thu của bạn)</span>
              ${recordedAudioUrl ? `
                <audio src="${recordedAudioUrl}" controls class="w-full h-9 rounded-lg"></audio>
              ` : `
                <p class="text-xs text-slate-500 py-2">Chưa có bản ghi âm. Hãy bấm 'Bắt đầu ghi âm'.</p>
              `}
            </div>
          </div>
        </div>

        <!-- 6-Point Phonetic Self-Check Checklist -->
        <div class="space-y-3 pt-2">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tiêu chí tự đánh giá phát âm (6 Tiêu chuẩn âm vị học):</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <label class="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              <span>1. Nhấn đúng trọng âm từ (Ударение)?</span>
            </label>
            <label class="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              <span>2. Giảm âm chữ О không trọng âm thành [а]?</span>
            </label>
            <label class="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              <span>3. Phát âm chuẩn âm uốn lưỡi cứng [ж], [ш]?</span>
            </label>
            <label class="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              <span>4. Rung đầu lưỡi âm [р] rõ ràng?</span>
            </label>
            <label class="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              <span>5. Phân biệt đúng phụ âm cứng vs phụ âm mềm?</span>
            </label>
            <label class="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              <span>6. Ngữ điệu câu tự nhiên (Интонация ИК-1, ИК-2)?</span>
            </label>
          </div>
        </div>
      </div>
    `;
  }

  async function toggleRecord() {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  async function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      App.showToast('Trình duyệt không hỗ trợ Web Audio Recording.', 'warning');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        recordedAudioUrl = URL.createObjectURL(audioBlob);
        renderActiveTopic();
      };

      mediaRecorder.start();
      isRecording = true;
      renderActiveTopic();
    } catch (e) {
      App.showToast('Không thể truy cập Microphone: ' + e.message, 'error');
    }
  }

  function stopRecording() {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      isRecording = false;
      App.showToast('Đã lưu bản thu âm! Hãy bấm nghe lại Âm thanh B.', 'success');
      if (window.AdaptiveLearningOS) {
        AdaptiveLearningOS.dailyState.speakingDone++;
        AdaptiveLearningOS.saveDailyState();
      }
    }
  }

  return {
    init,
    selectTopic,
    toggleRecord
  };
})();

window.SpeakingModule = SpeakingModule;
