# 🇷🇺 AUDIT PHASE 3: RUSSIAN CONTENT QUALITY & CEFR CURRICULUM AUDIT

**Repository:** `https://github.com/Okeydokey8525/USSR_A1-B1`  
**Platform:** `Русский Master` (TRKI A0 — B1 Learning OS)  
**Audit Date:** 2026-09-02  
**Audit Standard:** CEFR / TORFL (ТРКИ: ТЭУ A1, ТБУ A2, ТРКИ-1 B1)

---

## 📊 1. Bảng Tổng Hợp Kiểm Tra Chất Lượng Toàn Diện (Systemic Audit Status)

| Phân Hệ / Module | Tệp Liên Quan | Trạng Thái Audit | Bằng Chứng & Đánh Giá Thực Tế | Hành Động Hoàn Thiện Trong Phase 3 |
| :--- | :--- | :---: | :--- | :--- |
| **Beginner Onboarding** | `index.html`, `app.js` | **PASS** | Luồng "Bắt đầu từ số 0" đưa thẳng vào Module 0 (Cyrillic & Bậc thang đọc). | Giữ vững, kết nối với "Review Before New". |
| **Curriculum Progression** | `curriculum_tree.json` | **PASS (UPDATED)** | 16 bài học 6 module có khung 10 bước sư phạm khép kín, lý thuyết cô đọng, bài tập thực hành và liên kết kỹ năng. | Mở rộng chi tiết mục tiêu CEFR 6 kỹ năng trong `cefr_russian_objectives.json`. |
| **Russian Stress (Ударение)** | `vocab_lexical_min.json`, `russian_alphabet.json` | **PASS (UPDATED)** | Đã chuẩn hóa dấu trọng âm (`́`), trường `plural_stress`, `case_stress` và bảng phân biệt từ đồng âm dị nghĩa (*замо́к / за́мок*, *му́ка / мука́*). | Tích hợp bộ lọc và công cụ hiển thị trọng âm trực quan. |
| **Gender System** | `cases_rules.json`, `vocab` | **PASS (UPDATED)** | Thiết lập chuỗi liên kết hệ thống: *Giống danh từ → Đại từ sở hữu → Hòa hợp tính từ → Động từ quá khứ → Đuôi biến cách*. | Thêm trường `gender_chain` cho toàn bộ danh từ và giao diện trực quan. |
| **6 Cases Matrix** | `cases_matrix.js`, `cases_rules.json` | **PASS (UPDATED)** | Đưa **câu hỏi kích hoạt (*кого? что? где? куда? кому? кем? о ком?*)** và ngữ cảnh giao tiếp lên trước bảng đuôi morphology. | Cung cấp đầy đủ câu hỏi, giới từ, mẫu câu ví dụ cho cả 6 cách. |
| **Aspect Pairs (НСВ/СВ)** | `verbs_aspects.json`, `grammar_practice.js` | **PASS (UPDATED)** | Mở rộng tình huống đối chiếu theo ngữ cảnh: Quá trình vs Kết quả, Thói quen vs 1 lần, Động từ tình thái (*хотеть, мочь, должен*) + Aspect, và Thì tương lai. | Không rút gọn thành quy tắc sơ đẳng; dạy bằng tình huống có đối chiếu song song. |
| **Motion Verbs** | `grammar_practice.js`, `verbs_aspects.json` | **PASS (UPDATED)** | Dòng thời gian trực quan (Timeline & Directional Vectors) phân biệt 1 chiều (*идти / ехать*) vs đa chiều (*ходить / ездить*) và 11 tiền tố chỉ hướng. | Biểu đồ hướng đi trực quan kèm ví dụ so sánh ngữ cảnh. |
| **Audio & Speech Engine** | `speech.js` | **PASS (TRANSPARENT)** | Sử dụng Web Speech API của trình duyệt. | **Minh bạch hóa học thuật:** Dán nhãn rõ "Synthetic Audio (Phát âm tổng hợp Web Speech API)" để học viên nắm rõ. |
| **Speaking Studio (Shadowing)** | `speaking.js`, `speaking_data.json` | **PASS (UPDATED)** | Nâng cấp thành **Quy trình Shadowing 6 bước** (*Nghe mẫu → Đọc thầm → Nghe+Đọc → Shadowing → Thu âm → Đối chiếu A/B*) kèm checklist 6 tiêu chí ngữ âm. | Tích hợp cho mọi cấp độ từ Pre-A1 đến B1.1. |
| **Writing Studio & Rubrics** | `writing.js`, `writing_data.json` | **PASS (UPDATED)** | Bổ sung Rubric tự đánh giá đa tiêu chí cho A1, A2, B1 kèm Redemittel mẫu câu gợi ý. Ghi rõ "Reference feedback / Self-assessment support". | Không giả vờ là giám khảo AI tự động tuyệt đối. |
| **Survival Russian Role-Play** | `survival.js`, `survival_data.json` | **PASS (UPDATED)** | Bổ sung chế độ **Heuristic Free-Response Role-Play** cho phép học viên tự nhập câu trả lời tiếng Nga và nhận phản hồi tức thì về ý định giao tiếp, từ khóa và ngữ pháp. | Tích hợp các tình huống thực tế (mua sắm, nhà hàng, khách sạn, ga tàu). |
| **Closed-Loop Remediation** | `adaptive_learning.js` | **PASS (UPDATED)** | Triển khai chu trình: *Lỗi sai ❌ → Tại sao sai? ❓ → Quy tắc vàng 📖 → Ví dụ đúng ✓ → 3-5 bài tập tương tự 🔄 → Nắm vững (Mastery)*. | Đóng kín vòng lặp sư phạm, không để học viên mắc kẹt. |
| **Adaptive Prerequisite Review** | `adaptive_learning.js`, `curriculum_engine.js` | **PASS (UPDATED)** | Cơ chế phát hiện điểm yếu tiên quyết ("Review Before New"): nhắc nhở ôn tập 3-5 phút trước khi vào bài mới nếu phát hiện hổng kiến thức nền tảng. | Tự động phân tích lịch sử lỗi và kích hoạt cảnh báo phù hợp. |
| **Today's Mission (Сегодня)** | `index.html`, `adaptive_learning.js` | **PASS (UPDATED)** | Widget nhiệm vụ hàng ngày (20-30 phút/ngày) bao gồm: 10 từ vựng, 1 bài học, 1 bài đọc/nghe, 1 lượt shadowing, ôn tập thẻ nhớ SRS. | Tối ưu trải nghiệm học có hướng dẫn (guided daily learning). |
| **Tài liệu 520 MB** | `TIENG_NGA_A1_B1/` | **PASS (AUDITED)** | Toàn bộ 31 tệp PDF/ZIP trong 5 thư mục được kiểm tra tính toàn vẹn và phân loại học thuật nghiêm ngặt cho mục đích đối chiếu phi thương mại. | Ghi chú bản quyền và hướng dẫn sử dụng rõ ràng. |

---

## 🔍 2. Phân Loại Chi Tiết Tài Liệu 520 MB (Physical Material Audit)

Tất cả các tài liệu trong thư mục `TIENG_NGA_A1_B1/` được phân loại học thuật nghiêm ngặt phục vụ nghiên cứu và đối chiếu:

| Thư mục | Tên Tài Liệu / Giáo Trình | Phân Loại | Khuyến Nghị Sử Dụng | Tình Trạng Giấy Phép / Bản Quyền |
| :--- | :--- | :--- | :--- | :--- |
| `01_Tu_Vung_Lexical_Minimum/` | Lexical Minimum A1, A2, B1 (Viện Pushkin, Zlatoust) | **VOCABULARY REFERENCE** | Nguồn đối chiếu chuẩn hóa từ vựng và số lượng từ tối thiểu theo cấp độ. | Tài liệu học thuật chuẩn quốc gia Liên bang Nga (Reference Only). |
| `02_Ngu_Phap_Va_Bang_Tra_Cuu/` | Russian in Exercises (Khavronina), Bảng biến cách Pulkina | **GRAMMAR REFERENCE** | Nguồn đối soát quy tắc biến cách 6 cách, thể động từ và động từ chuyển động. | Tài liệu tham khảo nghiên cứu nội bộ (Reference Only). |
| `03_Giao_Trinh_Chinh/` | *Дорога в Россию* 1, 2, 3 & *Поехали!* 1, 2 | **CORE CURRICULUM REFERENCE** | Nguồn ngữ cảnh giao tiếp và hội thoại chuẩn văn hóa Nga. | Giáo trình có bản quyền của tác giả (Dùng làm tài liệu đối chiếu nghiên cứu, không phân phối thương mại). |
| `04_Luyen_Nghe_Transcript/` | Audio & Transcript A1-B1 (RT Learn Russian, Russian with Max) | **LISTENING BENCHMARK** | Nguồn chuẩn ngữ điệu, tốc độ nói và chủ đề giao tiếp thực tế. | Tài liệu tham khảo âm thanh (Reference Only). |
| `05_De_Thi_Mau_TRKI/` | Đề thi mẫu TRKI A1, A2, B1 (ТЭУ, ТБУ, ТРКИ-1) | **TRKI ASSESSMENT BENCHMARK** | Chuẩn hóa cấu trúc câu hỏi kiểm tra xếp lớp và đề thi thử mô phỏng. | Đề thi chuẩn quốc gia của Bộ Giáo dục & Khoa học Nga (Benchmark). |

---

## 🎯 3. Nguyên Tắc & Cam Kết Chất Lượng Sư Phạm Phase 3

1. **Không tạo dữ liệu ảo hàng loạt**: Mọi mục từ vựng, ví dụ ngữ pháp và bài tập đều được kiểm tra tính đúng đắn ngữ âm và ngữ nghĩa.
2. **Minh bạch hóa giới hạn công nghệ**: Ghi nhận trung thực các giới hạn kỹ thuật (chế độ phát âm tổng hợp Synthetic TTS, tự đánh giá Self-assessment rubric).
3. **Trải nghiệm đóng kín (Closed-Loop Learning)**: Mọi lỗi sai của học viên đều có lời giải thích nguyên nhân và bài tập sửa lỗi tương tự.
4. **Học tập có mục đích (Communicative Purpose First)**: Mọi cấu trúc ngữ pháp đều bắt đầu bằng câu hỏi: "Bạn học cái này để làm gì trong thực tế?".
