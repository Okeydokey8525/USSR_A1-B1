# PROTOCOL: PHASE 5.0 — REAL LEARNER VALIDATION (PRE-REGISTRATION FREEZE v2.2)
## Đề Cương Nghiên Cứu Thử Nghiệm Sư Phạm & Tính Khả Dụng Trên Người Học Thật
### (Pilot Usability & Preliminary Learning Validation: 3–5 Học Viên, 2–4 Tuần)

**Trạng thái đăng ký:** 🔒 **PRE-REGISTRATION FROZEN** *(Đã khóa phương pháp, barem chấm, tiêu chí đo lường và telemetry trước khi HV-01 bắt đầu).*

---

## 🎯 1. Ranh Giới Nghiên Cứu & Tuyên Bố Học Thuật (Scope & Disclaimers)

> **NGUYÊN TẮC BẤT BIẾN:**
> 1. **KHÔNG THÊM TÍNH NĂNG MỚI (ZERO FEATURE CREEP):** Dừng toàn bộ việc mở rộng tính năng, thêm công cụ hay sửa đổi hệ thống dàn trải.
> 2. **ĐỊNH DANH PHẠM VI NGHIÊN CỨU (PILOT SCOPE):** Nghiên cứu Pilot với quy mô 3–5 người học ($n=3–5$) nhằm mục đích **xác thực tính khả dụng (Usability) và tìm kiếm phát hiện sư phạm ban đầu (Preliminary Learning Validation)** — giải quyết câu hỏi: *"Người thật có gặp rào cản nghiêm trọng nào khi tự học không?"*. Nghiên cứu Pilot này **không phải là một nghiên cứu quy mô lớn (Efficacy Trial) có nhóm đối chứng để khẳng định hiệu quả tổng quát**.
> 3. **BẢO LƯU CAN THIỆP (TREATMENT STABILITY):** Tuyệt đối không sửa giao diện hoặc code giữa chừng khi một học viên gặp khó. Mọi quan sát được ghi nhận, phỏng vấn và giữ nguyên cho đến khi kết thúc đợt Pilot. Mọi hotfix lỗi kỹ thuật bắt buộc phải ghi vào **Protocol Deviation Log**.

### Mối Quan Hệ Giữa Phase 4.5 và Phase 5:
```text
      PHASE 4.5 (Engineering & Pedagogy Gate)
      Internal Content & System Maturity Benchmark: 4.85 / 5.00
      ➔ "Kiến trúc và nội dung hệ thống đã sẵn sàng đưa vào thử nghiệm"
                             +
      PHASE 5.0 (Pilot Real Learner Validation)
      Real Learner Usability & Learning Evidence
      ➔ "Dữ liệu thực nghiệm chứng minh người học tiếp thu được gì, vướng ở đâu và tại sao"
```

---

## 👥 2. Quy Mô, Nhóm Chân Dung & Mục Tiêu Theo Từng Phân Khúc

Nghiên cứu tuyển chọn **3–5 học viên tại Việt Nam** đại diện cho các trường hợp điển hình. Mỗi học viên có **Mục tiêu riêng theo Persona (Persona-Specific Targets)** nhưng đều làm chung một **Bài kiểm tra cốt lõi (Common Core Baseline Test)**.

| Mã Học Viên | Chân Dung (Persona) | Đặc Điểm Đầu Vào | Mục Tiêu Sư Phạm Cụ Thể (Persona Target) |
|:---:|---|---|---|
| **HV-01** | 🇻🇳 **Complete Beginner** | Người Việt, 0% tiếng Nga, chưa từng biết bảng chữ cái Cyrillic. | Vượt qua rào cản chữ cái Cyrillic, phát âm đúng quy luật giảm âm vị trí `окно́/молоко́`, tự giới thiệu bản thân (Bài 0.1 ➔ 1.1). |
| **HV-02** | 🇻🇳 **Busy Adult Learner** | Người đi làm bận rộn, chỉ học 20–30 phút/tối. | Kiểm chứng tính khả thi của ngân sách **"Сегодня — 25 phút"** và tỷ lệ duy trì liên tục 14 ngày không bỏ cuộc. |
| **HV-03** | 🇷🇺 **False Beginner (Mất gốc)** | Đã từng học nhưng mất gốc, nhầm lẫn 3 giống và 6 cách. | Khắc phục điểm yếu qua chuỗi hòa hợp giống (**Gender Agreement Chain**) và Ma trận 3 cách cơ bản (6, 4, 2). |
| **HV-04** | 🎯 **A2 ➔ B1 Candidate** | Cần nâng cao kỹ năng đọc hiểu văn bản và cấu trúc phức. | Quan sát mức độ tiếp thu và chuyển giao các cấu trúc B1 mục tiêu (НСВ/СВ, motion verbs, *который*, Redemittel) hướng tới chuẩn B1. |
| **HV-05** | 🔄 **Intermittent Learner** | Học ngắt quãng (cách nhật 2–3 ngày). | Quan sát hành vi quay lại học và tỷ lệ duy trì thẻ nhớ dưới điều kiện Adaptive Remediation và lịch Leitner SRS hiện tại. |

---

## 📏 3. Hệ Thống Đo Lường Chuẩn Hóa Học Thuật (Rigorous Metrics)

### 3.1. Đo Lường Sự Tăng Trưởng Kiến Thức (Descriptive Learning Gains for $n=3–5$)
Với cỡ mẫu Pilot nhỏ ($n=3–5$), nghiên cứu **không đưa ra suy luận thống kê khái quát hóa**, mà báo cáo chi tiết **quỹ đạo từng cá nhân kèm Median và Range**:
1. **Điểm Tăng Tuyệt Đối (Absolute Gain):**
   $$\Delta \text{Score} = \text{Post-Test Score} - \text{Pre-Test Score} \quad (\text{Thang điểm } 100)$$
2. **Độ Tăng Trưởng Chuẩn Hóa Mô Tả (Descriptive Hake's Gain $g$):**
   $$g = \frac{\text{Post-Test} - \text{Pre-Test}}{100 - \text{Pre-Test}}$$
   - Báo cáo ghi nhận minh bạch: $\text{Individual } g_i$, $\text{Median } g$, và $[\min g, \max g]$ để so sánh mô tả mức độ tiếp thu giữa các học viên có xuất phát điểm khác nhau.

---

### 3.2. Bóc Tách Độc Lập 5 Chiều Năng Lực Nói Kèm Barem Neo Hành Vi Cụ Thể (Operational Anchors)
Đánh giá bản thu âm của học viên theo 5 chiều độc lập trên thang điểm 1–5 với tiêu chí chi tiết cho từng chiều:

| Mức Điểm | 1. Pronunciation Accuracy (Âm vị) | 2. Stress Accuracy (Trọng âm & Giảm âm) | 3. Intonation (Ngữ điệu câu ИК) | 4. Fluency (Độ lưu loát & Tốc độ) | 5. Spontaneous Production (Tự chủ) |
|:---:|---|---|---|---|---|
| **Level 5** | Phân biệt hoàn hảo phụ âm cứng/mềm ([м]/[м']), đọc chuẩn [ы], [ж, ш], [р]. | Nhấn đúng 100% trọng âm; giảm âm vị trí chuẩn xác ([ʌ] ở tiền trọng âm 1, [ə] ở các vị trí khác, [иэ] sau âm mềm). | Thể hiện chuẩn xác và tự nhiên ngữ điệu ИК-1 (kể ↘), ИК-2 (từ hỏi ↘), ИК-3 (xác nhận ↗). | Tốc độ nói tự nhiên, không ngập ngừng bất thường, ngắt nghỉ đúng cụm nghĩa (*syntagma*). | Tự tạo câu độc lập hoàn toàn, cấu trúc ngữ pháp chính xác, không cần nhìn câu mẫu. |
| **Level 4** | Một vài lỗi nhỏ không hệ thống về độ mềm của phụ âm; nhìn chung âm vị rõ ràng. | Nhấn đúng trọng âm hầu hết các từ quen thuộc; đôi khi quên giảm âm ở âm tiết xa trọng âm. | Thể hiện đúng hướng lên/xuống giọng ở cuối câu, đôi khi ngữ điệu còn hơi cứng. | Tốc độ nói vừa phải, có một vài khoảng dừng ngắn để nhớ từ nhưng không gián đoạn mạch nói. | Tự ghép câu tốt với từ vựng mới, có 1 lỗi ngữ pháp nhỏ không làm sai lệch ý nghĩa. |
| **Level 3** | Nhầm lẫn giữa [и] và [ы], phụ âm mềm chưa rõ ràng nhưng người nghe vẫn đoán được từ. | Hay phát âm theo mặt chữ (chưa giảm âm vị trí chữ `О ➔ [а]`), trọng âm đôi lúc bị lệch. | Ngữ điệu phẳng (*monotone*), chưa phân biệt rõ câu hỏi ИК-3 và câu trần thuật ИК-1. | Ngập ngừng thường xuyên, khoảng dừng kéo dài ($> 2$ giây), tốc độ nói chậm nhưng vẫn hoàn thành câu. | Dựa nhiều vào cấu trúc câu mẫu, chỉ thay thế được danh từ/đại từ đơn giản. |
| **Level 2** | Phát âm sai lệch nhiều âm vị đặc trưng, phát âm tiếng Nga theo thói quen ngữ âm tiếng Việt. | Đặt sai trọng âm liên tục làm biến đổi nghĩa từ hoặc gây khó hiểu nghiêm trọng. | Lên/xuống giọng sai vị trí trọng tâm ngữ điệu (*intonation center*), gây hiểu lầm loại câu. | Ngập ngừng dày đặc, nói từng từ rời rạc, ngắt quãng liên tục, khó duy trì câu hoàn chỉnh. | Chỉ đọc lại được từ đơn lẻ, chưa thể tự kết hợp từ thành câu có nghĩa. |
| **Level 1** | Chưa thể phát âm được các âm vị tiếng Nga cơ bản. | Không có khái niệm trọng âm, đọc đều đều không nhấn. | Không thể hiện được bất kỳ đường nét ngữ điệu nào. | Không thể nói thành câu. | Không thể sản sinh ngôn ngữ. |

---

### 3.3. Quy Chuẩn Kiểm Chứng Trí Nhớ SRS D+14 Chống Thiên Lệch (Anti-Bias Stratified Sampling)
Để đảm bảo tính khoa học và không thiên lệch trong kiểm tra trì hoãn 14 ngày:
- **Định nghĩa tập thẻ & Quy tắc mốc thời gian (Timeline Cutoff):**
  - $N_{\text{total}}$: Tổng số thẻ từ vựng đã được giới thiệu trong suốt đợt Pilot.
  - $N_{\text{eligible}}$: Toàn bộ các thẻ đã trải qua $\ge 3$ phiên ôn tập thành công và đạt mốc `last_qualifying_review` **trước ngày kết thúc Tuần 2 (Cutoff Date)** để đảm bảo đủ độ trễ 14 ngày khi test vào Tuần 4. *(Lưu ý: $N_{\text{eligible}}$ bao gồm cả các thẻ ở Hộp 1–2 và Hộp 3–5, không chỉ riêng Hộp cao)*.
  - **Lấy mẫu ngẫu nhiên phân tầng (Stratified Sampling):** Chọn ngẫu nhiên 20 thẻ từ $N_{\text{eligible}}$ được phân tầng theo `box_at_last_qualifying_review` (ví dụ: tối đa 10 thẻ từ Hộp 1–2 và 10 thẻ từ Hộp 3–5). Nếu không đủ thẻ ở một tầng, ghi nhận hiện tượng mất cân đối mẫu (*Sample Imbalance*), tuyệt đối không gượng ép.
- **Cấu trúc dữ liệu ghi nhận từng thẻ D+14:**
  `card_id`, `box_at_last_qualifying_review`, `last_qualifying_review`, `D14_test_date`, `intervening_exposure_count`, `last_intervening_exposure_date`, `days_since_last_actual_exposure`, `D14_result`.
- **Theo dõi tiếp xúc can thiệp chi tiết (*Granular Intervening Exposures*):**
  - Ghi nhận `intervening_exposure_count` (số lần ôn tập phát sinh trong 14 ngày trễ).
  - Ghi nhận `last_intervening_exposure_date` và `days_since_last_actual_exposure` tại thời điểm làm bài test D+14.
  - Phân tích bóc tách riêng: **Clean Delayed Recall** (0 lần tiếp xúc trong 14 ngày) vs **Reinforced Recall** ($\ge 1$ lần tiếp xúc).
- **Hình thức kiểm tra:** **Cued Active Recall** (hiển thị nghĩa tiếng Việt ➔ học viên tự gõ từ tiếng Nga có trọng âm; không trắc nghiệm, không hiển thị gợi ý).
- **Báo cáo minh bạch:** Ghi rõ $N_{\text{total}}$, $N_{\text{eligible}}$, $N_{\text{sampled\_Box\_1\_2}}$, $N_{\text{sampled\_Box\_3\_5}}$, $N_{\text{tested}}$.

---

## 📝 4. Cấu Trúc Khảo Sát Đánh Giá 3 Tầng & Khóa Barem Chấm (Frozen Rubric)

Barem chấm và đề kiểm tra Post-Test sau 2–4 tuần được **đóng băng (frozen)** trước ngày HV-01 làm Pre-Test:

```text
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                    CẤU TRÚC POST-TEST 3 TẦNG ĐỘC LẬP                        │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ TẦNG 1: PARALLEL ITEMS (Đo lường tăng trưởng trực tiếp so với Pre-Test)     │
 │ ➔ Cấu trúc câu và từ vựng tương đương Pre-test để tính Delta và g.          │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ TẦNG 2: NOVEL TRANSFER ITEMS (Đo lường khả năng chuyển giao nhận thức)      │
 │ ➔ Ngữ cảnh mới lạ, kết hợp từ vựng ngoài ví dụ bài học (chống học vẹt).     │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ TẦNG 3: SPONTANEOUS PRODUCTION TASKS (Đo lường năng lực sản sinh tự chủ)    │
 │ ➔ 1 Task Viết mở (3–5 câu) + 1 Task Nói mở (ghi âm 1 phút) không câu mẫu.   │
 └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 💾 5. Chuẩn Hóa Bản Ghi Nhật Ký Học Tập (Learning Session Record Schema v2.2)

Hệ thống lưu trữ telemetry học tập dưới dạng cấu trúc JSON ẩn danh (không thu thập thông tin cá nhân PII):

```json
{
  "student_id": "HV-01",
  "session_id": "sess_20260905_01",
  "app_version": "pilot-2.2",
  "protocol_version": "2.2",
  "date": "2026-09-05",
  "start_time": "20:00:15",
  "end_time": "20:25:30",
  "planned_duration_min": 25,
  "actual_active_duration_min": 24.5,
  "idle_time_excluded_min": 0.75,
  "active_lesson_id": "les_0_2",
  "progression_pipeline": {
    "lesson_started": true,
    "theory_viewed": true,
    "controlled_completed": true,
    "meaningful_completed": true,
    "transformation_completed": true,
    "production_submitted": true,
    "lesson_completed": true,
    "mastery_score": 85.0,
    "mastery_passed": true,
    "next_lesson_unlocked": true
  },
  "srs_telemetry": {
    "cards_due": 8,
    "cards_reviewed": 8,
    "correct_count": 7,
    "wrong_count": 1
  },
  "mistakes_recorded": [
    {"type": "STRESS", "item": "молоко", "user_selection": "мо́локо", "correct": "молоко́"}
  ],
  "remediation": {
    "triggered": true,
    "weak_tag": "STRESS",
    "completed_drills": 3
  },
  "usability_telemetry": {
    "help_requested": false,
    "help_reason": null,
    "drop_off_location": null
  }
}
```

---

## 🚫 6. Quy Tắc Xử Lý Lỗi Kỹ Thuật & Nhật Ký Sai Lệch Protocol (Protocol Deviation Log)

1. **Quy tắc bảo lưu can thiệp (Treatment Stability):** Không được thay đổi UI/UX hay logic sư phạm giữa chừng khi thấy một học viên làm sai hoặc gặp khó khăn. Khó khăn của học viên là dữ liệu nghiên cứu quý giá cần được ghi nhận vào báo cáo.
2. **Quy trình Hotfix lỗi kỹ thuật nghiêm trọng:** Nếu phát sinh lỗi phần mềm làm gián đoạn bài học (ví dụ: nút bấm bị đơ, audio không phát), người phụ trách kỹ thuật được phép hotfix nhưng bắt buộc phải ghi vào nhật ký:
   - *Mã học viên bị ảnh hưởng.*
   - *Thời điểm xảy ra lỗi & Thời điểm hotfix.*
   - *Tác động đến dữ liệu phiên học.*

---

## 📊 7. Tiêu Chí Phân Tích Dữ Liệu Pilot (Realistic Evaluation Framework)

Mục đích của Pilot không phải là "chạy theo 10/10 chỉ số toàn xanh", mà là phát hiện ra chính xác **hệ thống vận hành hiệu quả ở điểm nào và còn ma sát (*friction*) ở điểm nào**:

| Chiều Đo Lường | Kỳ Vọng Ban Đầu | Ý Nghĩa Sư Phạm Khi Dữ Liệu Thực Tế Khác Kỳ Vọng |
|---|:---:|---|
| **Thời gian học thực tế** | $20 - 30$ phút/phiên | Nếu $> 35$ phút: Khối lượng bài học đang quá tải; cần rút gọn lý thuyết ở Phase 5.1. |
| **Tỷ lệ duy trì (Streak)** | $\ge 70\%$ số ngày | Nếu $< 50\%$: Cần xem xét lại tính lôi cuốn và độ nặng nhận thức của widget Hôm Nay. |
| **No-Menu Navigation** | $\le 1$ lần hỏi/tuần/HV | Nếu $\ge 2$ lần/tuần: Bố cục Trang chủ chưa đủ tự giải thích (*Self-explanatory*). |
| **Tăng trưởng điểm số ($g$)** | Báo cáo chi tiết từng HV | Nếu có học viên $g < 0.20$: Đây **không phải là lỗi thất bại**, mà là **tín hiệu chẩn đoán có giá trị** để phân tích sâu lỗ hổng tiếp thu. |
| **D+14 SRS Retention** | Báo cáo tỷ lệ thực tế | So sánh chênh lệch retention giữa nhóm thẻ Hộp 1–2 và Hộp 3–5, giữa nhóm Clean vs Reinforced. |
| **Novel Transfer Tasks** | Báo cáo định tính | Đo lường mức độ người học hiểu bản chất quy tắc so với việc chỉ học vẹt câu mẫu. |

---

## 📜 8. Phiếu Đồng Thuận Tham Gia Nghiên Cứu (Informed Consent & Data Ethics)

Mỗi học viên tham gia Pilot được phổ biến và đồng thuận văn bản ngắn gọn:
1. **Mục đích nghiên cứu:** Thử nghiệm tính khả dụng và hiệu quả sư phạm của nền tảng học tiếng Nga cho đề tài nghiên cứu khoa học / khóa luận tốt nghiệp.
2. **Dữ liệu thu thập:** Thời gian tương tác thực tế, kết quả bài tập trắc nghiệm/tự luận, bản thu âm luyện nói Shadowing (toàn bộ được mã hóa ẩn danh dưới mã `HV-01` đến `HV-05`).
3. **Quyền hạn của người tham gia:** Tham gia hoàn toàn tự nguyện và có quyền rút lui bất kỳ lúc nào mà không phải chịu bất kỳ bất lợi hay ràng buộc nào.
4. **Bảo mật & Thời hạn lưu trữ dữ liệu:** Dữ liệu được lưu trữ an toàn trong suốt thời gian nghiên cứu và tối đa **12 tháng sau khi bảo vệ khóa luận** (hoặc theo quy định lưu trữ học thuật của trường). Các đoạn trích âm thanh ẩn danh ngắn (không nhận diện danh tính) có thể được sử dụng làm minh chứng học thuật trong phụ lục khóa luận.

---

## 📅 9. Kế Hoạch Triển Khai 4 Tuần Thực Nghiệm

- **Tuần 1 (Setup & Baseline Pre-Test):** Bàn giao link web, hướng dẫn học viên làm bài Pre-Test chung và ghi nhận xuất phát điểm.
- **Tuần 2–3 (Autonomous Learning):** Học viên tự học độc lập 25 phút/ngày qua "Сегодня"; hệ thống tự động ghi nhật ký JSON cục bộ; người nghiên cứu chỉ đóng vai trò quan sát viên (*Silent Observer*).
- **Tuần 4 (Summative Post-Test & Analysis):** Thực hiện bài Post-Test 3 tầng (Parallel + Novel Transfer + Spontaneous Production), kiểm tra D+14 SRS ngẫu nhiên phân tầng, phỏng vấn sâu 15 phút từng học viên và xuất bản **Báo Cáo Nghiên Cứu Pilot Thực Nghiệm (PILOT_STUDY_FINDINGS.md)**.
