import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = r"c:\LeDucLuong\HK VII\USSR_Study\WEB_USSR\data"

curriculum_payload = {
  "modules": [
    {
      "module_id": "mod_pre_a1",
      "level": "Pre-A1",
      "title": "Module 0: Nền Tảng Chữ Cái Cyrillic & Bậc Thang Đọc",
      "description": "Làm chủ 33 chữ cái tiếng Nga, bậc thang ghép vần âm tiết và 4 quy tắc biến âm cốt lõi.",
      "lessons": [
        {
          "id": "les_0_1",
          "objective_code": "RUS-PRE-01",
          "title": "Bài 0.1: Bảng Chữ Cái Cyrillic & 10 Nguyên Âm",
          "why_learn": "Chữ cái Cyrillic là chìa khóa đầu tiên. Tiếng Nga đọc tương đối sát mặt chữ một khi bạn nắm vững 10 nguyên âm và các phụ âm cơ bản.",
          "prerequisites": "Không cần kiến thức trước đó (Bắt đầu từ số 0).",
          "theory_markdown": "Tiếng Nga có **33 chữ cái** bao gồm:\n- **10 nguyên âm**: 5 nguyên âm cứng (А, О, У, Ы, Э) và 5 nguyên âm iotated mềm (Я, Ё, Ю, И, Е).\n- **21 phụ âm**: chia thành phụ âm hữu thanh và vô thanh.\n- **2 dấu hiệu**: Dấu cứng (Ъ) và Dấu mềm (Ь).",
          "context_examples": [
            { "ru": "ма́ма", "phonetic": "[ma-ma]", "vi": "mẹ" },
            { "ru": "па́па", "phonetic": "[pa-pa]", "vi": "bố" },
            { "ru": "дом", "phonetic": "[dom]", "vi": "ngôi nhà" },
            { "ru": "мир", "phonetic": "[mir]", "vi": "hòa bình / thế giới" }
          ],
          "practice_exercises": [
            {
              "q": "Chữ cái nào sau đây là nguyên âm iotated (nguyên âm mềm)?",
              "options": ["А", "О", "Я", "У"],
              "correct": 2,
              "why": "Chữ 'Я' là nguyên âm iotated mềm phát âm là [ya]."
            },
            {
              "q": "Từ 'дом' (ngôi nhà) được phát âm như thế nào?",
              "options": ["[dom]", "[dam]", "[dum]"],
              "correct": 0,
              "why": "Vì 'дом' chỉ có 1 âm tiết mang trọng âm nên chữ О đọc chuẩn là [o]."
            }
          ],
          "integrated_vocab_ids": ["v_003", "v_004", "v_008"],
          "integrated_speaking_phrase": "Здравствуйте! Меня зовут Луонг.",
          "mastery_threshold": 80
        },
        {
          "id": "les_0_2",
          "objective_code": "RUS-PRE-02",
          "title": "Bài 0.2: Bậc Thang Ghép Vần & Giảm Âm Chữ О",
          "why_learn": "Trong tiếng Nga, trọng âm (Ударение) thay đổi hoàn toàn cách phát âm của từ. Không nhấn đúng trọng âm sẽ khiến người bản ngữ khó hiểu hoặc hiểu sai nghĩa.",
          "prerequisites": "Đã học Bài 0.1.",
          "theory_markdown": "### Quy tắc giảm âm chữ О:\n- Khi mang **trọng âm (́)**: phát âm rõ là **[о]**.\n- Khi **KHÔNG mang trọng âm**: có xu hướng giảm âm thành **[а]** nhẹ.\n\n*Ví dụ:* từ `молоко́` có 3 chữ 'o', chỉ chữ 'o' cuối mang trọng âm nên phát âm là `[ма-ла-ко́]`.",
          "context_examples": [
            { "ru": "молоко́", "phonetic": "[ma-la-ko]", "vi": "sữa" },
            { "ru": "хорошо́", "phonetic": "[kha-ra-sho]", "vi": "tốt / được" },
            { "ru": "окно́", "phonetic": "[ak-no]", "vi": "cửa sổ" },
            { "ru": "соба́ка", "phonetic": "[sa-ba-ka]", "vi": "con chó" }
          ],
          "practice_exercises": [
            {
              "q": "Trong từ 'хорошо́', chữ 'o' nào được phát âm rõ là [o]?",
              "options": ["Chữ 'o' thứ nhất", "Chữ 'o' thứ hai", "Chữ 'o' thứ ba"],
              "correct": 2,
              "why": "Chỉ có chữ 'o' thứ 3 mang dấu trọng âm nên phát âm rõ là [o], 2 chữ đầu giảm âm thành [a]."
            }
          ],
          "integrated_vocab_ids": ["v_009", "v_010"],
          "integrated_speaking_phrase": "Большое спасибо, всё очень хорошо!",
          "mastery_threshold": 80
        },
        {
          "id": "les_0_3",
          "objective_code": "RUS-PRE-03",
          "title": "Bài 0.3: Vô Thanh Hóa & Đồng Hóa Phụ Âm",
          "why_learn": "Giúp bạn phát âm tự nhiên như người Nga khi gặp các phụ âm đứng cuối từ hoặc đứng cạnh nhau.",
          "prerequisites": "Đã học Bài 0.1 và 0.2.",
          "theory_markdown": "### 1. Vô thanh hóa cuối từ:\nPhụ âm hữu thanh đứng cuối từ bị biến đổi: `Б->П, В->Ф, Г->К, Д->Т, Ж->Ш, З->С`.\n- `хлеб` -> đọc là `[хлеп]` (bánh mì)\n- `друг` -> đọc là `[друк]` (người bạn)\n- `город` -> đọc là `[го́-рат]` (thành phố)",
          "context_examples": [
            { "ru": "хлеб", "phonetic": "[khlyep]", "vi": "bánh mì" },
            { "ru": "друг", "phonetic": "[druk]", "vi": "người bạn" },
            { "ru": "авто́бус", "phonetic": "[af-to-bus]", "vi": "xe buýt (в đứng trước т đọc thành ф)" }
          ],
          "practice_exercises": [
            {
              "q": "Từ 'хлеб' (bánh mì) có chữ 'б' cuối được phát âm thành âm gì?",
              "options": ["[б] (bờ)", "[п] (pờ)", "[м] (mờ)"],
              "correct": 1,
              "why": "Phụ âm hữu thanh 'б' đứng cuối từ bị vô thanh hóa thành [п]."
            }
          ],
          "integrated_vocab_ids": ["v_001", "v_002", "v_006"],
          "integrated_speaking_phrase": "Мой друг едет на автобусе.",
          "mastery_threshold": 80
        }
      ]
    },
    {
      "module_id": "mod_a1_1",
      "level": "A1.1",
      "title": "Module 1: A1.1 Sơ Cấp Căn Bản (Đại Từ, Giống & Thì Hiện Tại)",
      "description": "Nhận biết 3 giống danh từ, đại từ sở hữu và chia động từ nhóm 1 thì hiện tại.",
      "lessons": [
        {
          "id": "les_1_1",
          "objective_code": "RUS-A1-01",
          "title": "Bài 1.1: Đại Từ Nhân Xưng & Mẫu Câu Tự Giới Thiệu",
          "why_learn": "Xây dựng các câu giao tiếp cơ bản đầu tiên: Tôi là ai, bạn là ai, chúng ta đang ở đâu.",
          "prerequisites": "Hoàn thành Module 0.",
          "theory_markdown": "### Đại từ nhân xưng tiếng Nga:\n- **Я** (Tôi), **Ты** (Bạn - thân mật), **Он** (Anh ấy), **Она** (Cô ấy), **Оно** (Nó)\n- **Мы** (Chúng tôi), **Вы** (Các bạn / Ngài - lịch sự), **Они** (Họ)",
          "context_examples": [
            { "ru": "Меня́ зову́т Луонг.", "phonetic": "[me-nya za-vut lu-ong]", "vi": "Tên tôi là Lương." },
            { "ru": "Я студе́нт.", "phonetic": "[ya stu-dyent]", "vi": "Tôi là sinh viên." },
            { "ru": "Они́ мои́ друзья́.", "phonetic": "[a-ni ma-i druz-ya]", "vi": "Họ là những người bạn của tôi." }
          ],
          "practice_exercises": [
            {
              "q": "Đại từ nào dùng để xưng hô lịch sự trang trọng với người lớn tuổi?",
              "options": ["Ты", "Вы", "Он"],
              "correct": 1,
              "why": "'Вы' là đại từ ngôi thứ 2 số nhiều hoặc dùng trang trọng lịch sự."
            }
          ],
          "integrated_vocab_ids": ["v_001", "v_007"],
          "integrated_speaking_phrase": "Здравствуйте! Меня зовут Луонг, я студент.",
          "mastery_threshold": 85
        },
        {
          "id": "les_1_2",
          "objective_code": "RUS-A1-02",
          "title": "Bài 1.2: 3 Giống Danh Từ & Quy Tắc Số Nhiều",
          "why_learn": "Mọi danh từ tiếng Nga đều có giống. Giống quyết định cách chia đuôi tính từ, đại từ và 6 cách sau này.",
          "prerequisites": "Đã học Bài 1.1.",
          "theory_markdown": "### Quy tắc xác định giống danh từ:\n- **Giống đực (Мужской род - он)**: Tận cùng bằng phụ âm cứng (стол, дом, студент), -й (музей), hoặc -ь (словарь).\n- **Giống cái (Женский род - она)**: Tận cùng bằng -а (книга, мама), -я (Россия, семья), hoặc -ь (тетрадь).\n- **Giống trung (Средний род - оно)**: Tận cùng bằng -о (окно, молоко), -е (море), hoặc -мя (время, имя).",
          "context_examples": [
            { "ru": "дом -> дома́ (Masc)", "vi": "ngôi nhà -> những ngôi nhà" },
            { "ru": "кни́га -> кни́ги (Fem)", "vi": "quyển sách -> những quyển sách" },
            { "ru": "окно́ -> о́кна (Neut)", "vi": "cửa sổ -> những cửa sổ" },
            { "ru": "друг -> друзья́ (Irregular)", "vi": "bạn -> những người bạn" }
          ],
          "practice_exercises": [
            {
              "q": "Từ 'окно́' (cửa sổ) thuộc giống nào?",
              "options": ["Giống đực (он)", "Giống cái (она)", "Giống trung (оно)"],
              "correct": 2,
              "why": "Vì tận cùng là đuôi -о nên 'окно' là danh từ giống trung (оно)."
            }
          ],
          "integrated_vocab_ids": ["v_008", "v_009", "v_010"],
          "integrated_speaking_phrase": "Это мой дом, а это моя книга.",
          "mastery_threshold": 85
        },
        {
          "id": "les_1_3",
          "objective_code": "RUS-A1-03",
          "title": "Bài 1.3: Động Từ Nhóm 1 Thì Hiện Tại (-ать/-ять)",
          "why_learn": "Cho phép bạn tạo câu diễn đạt hành động: tôi đọc, bạn hiểu, chúng tôi biết.",
          "prerequisites": "Đã học Bài 1.2.",
          "theory_markdown": "### Chia động từ nhóm 1 (ví dụ động từ читать - đọc):\n- Я чита́**ю**\n- Ты чита́**ешь**\n- Он / Она чита́**ет**\n- Мы чита́**ем**\n- Вы чита́**ете**\n- Они чита́**ют**",
          "context_examples": [
            { "ru": "Я чита́ю кни́гу ка́ждый день.", "vi": "Tôi đọc sách mỗi ngày." },
            { "ru": "Ты понима́ешь по-ру́сски?", "vi": "Bạn có hiểu tiếng Nga không?" },
            { "ru": "Мы зна́ем э́тот го́род.", "vi": "Chúng tôi biết thành phố này." }
          ],
          "practice_exercises": [
            {
              "q": "Điền dạng đúng: 'Они хорошо ... (понимать) по-русски.'",
              "options": ["понимает", "понимаем", "понимают"],
              "correct": 2,
              "why": "Chủ ngữ 'Они' đi với đuôi -ют: 'понимают'."
            }
          ],
          "integrated_vocab_ids": ["v_008"],
          "integrated_reading_id": "read_a1_01",
          "mastery_threshold": 85
        }
      ]
    },
    {
      "module_id": "mod_a1_2",
      "level": "A1.2",
      "title": "Module 2: A1.2 Sơ Cấp Nâng Cao (Ma Trận 3 Cách: 4, 6, 2)",
      "description": "Làm chủ Đối cách (Accusative), Giới cách địa điểm (Prepositional) và Sinh cách sở hữu/phủ định (Genitive).",
      "lessons": [
        {
          "id": "les_2_1",
          "objective_code": "RUS-A1-04",
          "title": "Bài 2.1: Cách 4 (Đối Cách - Винительный падеж)",
          "why_learn": "Đối cách chỉ đối tượng trực tiếp chịu tác động của hành động: đọc cái gì? nhìn thấy ai? mua cái gì?",
          "prerequisites": "Hoàn thành Module 1.",
          "theory_markdown": "### Câu hỏi kích hoạt: Кого? Что? Куда?\n- Giống cái: đuôi `-а` đổi thành `-у`, đuôi `-я` đổi thành `-ю` (*книга -> книгу, Россия -> Россию*).\n- Giống đực bất động vật: Giữ nguyên như Cách 1 (*Я вижу стол, дом*).\n- Giống đực động vật: Thêm đuôi `-а/-я` giống Cách 2 (*Я вижу брата, друга*).",
          "context_examples": [
            { "ru": "Я чита́ю интере́сную кни́гу.", "vi": "Tôi đang đọc một cuốn sách hay." },
            { "ru": "Мы смо́трим но́вый фильм.", "vi": "Chúng tôi đang xem bộ phim mới." },
            { "ru": "Анто́н ждёт дру́га.", "vi": "Anton đang đợi người bạn." }
          ],
          "practice_exercises": [
            {
              "q": "Điền dạng đúng: 'Анна покупает красивую ... (сумка).'",
              "options": ["сумка", "сумку", "сумке"],
              "correct": 1,
              "why": "Danh từ giống cái 'сумка' sang Cách 4 đổi -а thành -у: 'сумку'."
            }
          ],
          "integrated_vocab_ids": ["v_008", "v_001"],
          "integrated_speaking_phrase": "Я хочу купить эту книгу и этот словарь.",
          "mastery_threshold": 85
        },
        {
          "id": "les_2_2",
          "objective_code": "RUS-A1-05",
          "title": "Bài 2.2: Cách 6 (Giới Cách - Предложный падеж)",
          "why_learn": "Dùng để nói bạn đang ở đâu (Где?) và bạn đang nghĩ/nói về điều gì (О ком? О чём?).",
          "prerequisites": "Đã học Bài 2.1.",
          "theory_markdown": "### Giới từ: В (trong), НА (trên/tại), О (về)\nĐa số danh từ cả 3 giống số ít đều nhận đuôi **`-е`**:\n- *в Москве, в университете, на столе, на работе*\n- Ngoại lệ: tận cùng `-ия, -ие, -ь` nhận đuôi `-и` (*в России, в общежитии, в тетради*).",
          "context_examples": [
            { "ru": "Мы живём в Москве́.", "vi": "Chúng tôi sống ở Moscow." },
            { "ru": "Студе́нты уча́тся в университе́те.", "vi": "Sinh viên học ở trường đại học." },
            { "ru": "Я ду́маю о тебе́.", "vi": "Tôi đang nghĩ về bạn." }
          ],
          "practice_exercises": [
            {
              "q": "Điền dạng đúng: 'Моя семья живёт в ... (Россия).'",
              "options": ["России", "Россию", "Россией"],
              "correct": 0,
              "why": "Danh từ tận cùng -ия đổi thành -и trong Cách 6: 'в России'."
            }
          ],
          "integrated_vocab_ids": ["v_007", "v_002"],
          "integrated_reading_id": "read_a1_02",
          "mastery_threshold": 85
        },
        {
          "id": "les_2_3",
          "objective_code": "RUS-A1-06",
          "title": "Bài 2.3: Cách 2 (Sinh Cách - Родительный падеж)",
          "why_learn": "Dùng để chỉ sự sở hữu (của ai?), cấu trúc 'Không có' (НЕТ + Gen), và số lượng (2, 3, 4 + Gen số ít; 5 trở lên + Gen số nhiều).",
          "prerequisites": "Đã học Bài 2.2.",
          "theory_markdown": "### Câu hỏi kích hoạt: Кого? Чего? Чей? Сколько?\n- Đuôi danh từ số ít: Giống đực/trung thêm `-а/-я` (*дома, брата, окна*); Giống cái đổi thành `-ы/-и` (*книги, мамы*).\n- Cấu trúc không có: `У меня нет времени / книги / денег`.",
          "context_examples": [
            { "ru": "Э́то дом моего́ дру́га.", "vi": "Đây là nhà của bạn tôi." },
            { "ru": "У меня́ нет словаря́.", "vi": "Tôi không có từ điển." },
            { "ru": "В ко́мнате два окна́.", "vi": "Trong phòng có 2 cửa sổ." }
          ],
          "practice_exercises": [
            {
              "q": "Điền dạng đúng: 'У Антона сегодня нет ... (урок).'",
              "options": ["урок", "урока", "уроку"],
              "correct": 1,
              "why": "Sau 'нет' danh từ giống đực nhận đuôi Sinh cách -а: 'урока'."
            }
          ],
          "integrated_vocab_ids": ["v_001", "v_002", "v_008"],
          "integrated_writing_id": "write_a1_01",
          "mastery_threshold": 85
        }
      ]
    },
    {
      "module_id": "mod_a2_1",
      "level": "A2.1",
      "title": "Module 3: A2.1 Trung Cấp Sơ Khởi (Cách 3, Cách 5 & Thể Động Từ)",
      "description": "Hoàn thiện hệ thống 6 Cách và làm chủ sự khác biệt giữa thể Chưa hoàn thành (НСВ) và Hoàn thành (СВ).",
      "lessons": [
        {
          "id": "les_3_1",
          "objective_code": "RUS-A2-01",
          "title": "Bài 3.1: Cách 3 (Dữ Cách - Дательный падеж)",
          "why_learn": "Dùng để chỉ đối tượng tiếp nhận (tặng quà cho ai?), nói tuổi tác (мне 20 лет) và diễn đạt cảm xúc/trạng thái (мне нравится).",
          "prerequisites": "Hoàn thành Module 2.",
          "theory_markdown": "### Câu hỏi kích hoạt: Кому? Чему?\n- Giống đực/trung: thêm `-у / -ю` (*брату, другу, преподавателю*).\n- Giống cái: đổi thành `-е / -и` (*маме, сестре, России*).",
          "context_examples": [
            { "ru": "Я звоню́ дру́гу.", "vi": "Tôi gọi điện cho bạn." },
            { "ru": "Мне два́дцать лет.", "vi": "Tôi 20 tuổi." },
            { "ru": "Анне нра́вится э́та му́зыка.", "vi": "Anna rất thích bản nhạc này." }
          ],
          "practice_exercises": [
            {
              "q": "Điền dạng đúng: 'Луонг подарил цветы ... (мама).'",
              "options": ["маму", "маме", "мамой"],
              "correct": 1,
              "why": "Tặng hoa cho ai -> Dữ cách (Cách 3): 'маме'."
            }
          ],
          "integrated_vocab_ids": ["v_003", "v_004"],
          "integrated_speaking_phrase": "Мне очень нравится изучать русский язык.",
          "mastery_threshold": 85
        },
        {
          "id": "les_3_2",
          "objective_code": "RUS-A2-02",
          "title": "Bài 3.2: Cách 5 (Tạo Cách - Творительный падеж)",
          "why_learn": "Dùng để chỉ công cụ làm việc (bằng bút), đi cùng với ai (с другом), và nghề nghiệp sau động từ быть, стать, работать.",
          "prerequisites": "Đã học Bài 3.1.",
          "theory_markdown": "### Câu hỏi kích hoạt: Кем? Чем? С кем? С чем?\n- Giống đực: đuôi `-ом / -ем` (*врачом, студентом*).\n- Giống cái: đuôi `-ой / -ей` (*ручкой, подругой*).\n- Cụm từ cùng với ai: `с + Inst` (*Я гуляю с другом*).",
          "context_examples": [
            { "ru": "Я пишу́ си́ней ру́чкой.", "vi": "Tôi viết bằng cây bút màu xanh." },
            { "ru": "Мой па́па рабо́тает инжене́ром.", "vi": "Bố tôi làm việc với tư cách là kỹ sư." },
            { "ru": "Мы пьём чай с лимо́ном.", "vi": "Chúng tôi uống trà với chanh." }
          ],
          "practice_exercises": [
            {
              "q": "Điền dạng đúng: 'Мой брат хочет стать ... (врач).'",
              "options": ["врач", "врача", "врачом"],
              "correct": 2,
              "why": "Sau 'стать' (trở thành) danh từ chia Tạo cách (Cách 5): 'врачом'."
            }
          ],
          "integrated_vocab_ids": ["v_005", "v_006"],
          "integrated_speaking_phrase": "Я хочу стать хорошим специалистом.",
          "mastery_threshold": 85
        },
        {
          "id": "les_3_3",
          "objective_code": "RUS-A2-03",
          "title": "Bài 3.3: Thể Động Từ (НСВ vs СВ theo Ngữ Cảnh)",
          "why_learn": "Thể động từ là linh hồn của ngữ pháp tiếng Nga. Chọn đúng thể giúp bạn truyền đạt chính xác hành động đang diễn ra hay đã hoàn thành có kết quả.",
          "prerequisites": "Đã học Bài 3.2.",
          "theory_markdown": "### Phân biệt thể Chưa hoàn thành (НСВ) vs Hoàn thành (СВ):\n- **НСВ (Несовершенный вид)**: Quá trình kéo dài (*весь вечер*), thói quen lặp lại (*каждый день, часто*), đồng thời (*когда я читал, он писал*).\n- **СВ (Совершенный вид)**: Kết quả cụ thể (*прочитал книгу*), hành động xảy ra 1 lần đạt mục đích (*вдруг, сразу, наконец*), chuỗi hành động kế tiếp nhau.",
          "context_examples": [
            { "ru": "Вчера́ я весь ве́чер чита́л рома́н (НСВ).", "vi": "Hôm qua tôi đọc tiểu thuyết suốt cả buổi tối (quá trình)." },
            { "ru": "Я прочита́л рома́н за два дня (СВ).", "vi": "Tôi đã đọc xong cuốn tiểu thuyết trong 2 ngày (kết quả)." }
          ],
          "practice_exercises": [
            {
              "q": "Điền thể đúng: 'Каждое утро я ... (пить / выпить) кофе.'",
              "options": ["пью (НСВ)", "выпью (СВ)"],
              "correct": 0,
              "why": "Có dấu hiệu 'каждое утро' (thói quen lặp lại) nên bắt buộc dùng thể НСВ: 'пью'."
            }
          ],
          "integrated_vocab_ids": ["v_008"],
          "integrated_reading_id": "read_a2_01",
          "mastery_threshold": 85
        }
      ]
    },
    {
      "module_id": "mod_a2_2",
      "level": "A2.2",
      "title": "Module 4: A2.2 Động Từ Chuyển Động & Tiền Tố Phương Hướng",
      "description": "Làm chủ logic chuyển động 1 chiều vs đa chiều và 11 tiền tố phương hướng kinh điển.",
      "lessons": [
        {
          "id": "les_4_1",
          "objective_code": "RUS-A2-04",
          "title": "Bài 4.1: Động Từ Chuyển Động (Идти/Ходить & Ехать/Ездить)",
          "why_learn": "Tiếng Nga phân biệt rõ việc đi bộ hay đi bằng phương tiện, đi theo một hướng xác định hay đi lại thường xuyên.",
          "prerequisites": "Hoàn thành Module 3.",
          "theory_markdown": "### Logic chuyển động:\n- **Đi bộ**: `Идти` (1 chiều đang đi ➔) vs `Ходить` (đa chiều, thói quen, 2 chiều ⇄).\n- **Đi bằng phương tiện**: `Ехать` (1 chiều ➔) vs `Ездить` (đa chiều ⇄).",
          "context_examples": [
            { "ru": "Смотри́! Анто́н идёт в библиоте́ку (1 chiều).", "vi": "Nhìn kìa! Anton đang đi đến thư viện." },
            { "ru": "Ка́ждый день я хожу́ в университе́т пешко́м (đa chiều).", "vi": "Mỗi ngày tôi đều đi bộ đến trường đại học." }
          ],
          "practice_exercises": [
            {
              "q": "Điền dạng đúng: 'Каждое лето наша семья ... (ехать / ездить) на юг.'",
              "options": ["едет (1 chiều)", "ездит (đa chiều)"],
              "correct": 1,
              "why": "Có 'каждое лето' (thói quen định kỳ hàng năm) nên dùng động từ đa chiều 'ездит'."
            }
          ],
          "integrated_vocab_ids": ["v_006"],
          "integrated_speaking_phrase": "Сейчас я еду на работу на метро.",
          "mastery_threshold": 85
        },
        {
          "id": "les_4_2",
          "objective_code": "RUS-A2-05",
          "title": "Bài 4.2: 11 Tiền Tố Chuyển Động Chỉ Hướng",
          "why_learn": "Ghép tiền tố vào động từ chuyển động tạo ra hàng trăm động từ mới diễn tả chính xác mọi hướng di chuyển.",
          "prerequisites": "Đã học Bài 4.1.",
          "theory_markdown": "### Ý nghĩa các tiền tố cốt lõi:\n- **ПРИ-**: đến nơi (*прийти, приехать*)\n- **У-**: rời đi (*уйти, уехать*)\n- **В- (ВО-)**: đi vào trong (*войти, въехать*)\n- **ВЫ-**: đi ra ngoài (*выйти, выехать*)\n- **ПЕРЕ-**: băng qua đường / chuyển nhà (*перейти, переехать*)",
          "context_examples": [
            { "ru": "По́езд прибыва́ет на вокза́л в 10:00.", "vi": "Tàu hỏa đến ga lúc 10:00." },
            { "ru": "Он вы́шел из ко́мнаты на мину́ту.", "vi": "Anh ấy đã bước ra khỏi phòng một phút." }
          ],
          "practice_exercises": [
            {
              "q": "Tiền tố nào mang ý nghĩa 'đi đến nơi'?",
              "options": ["У-", "ПРИ-", "ВЫ-"],
              "correct": 1,
              "why": "Tiền tố 'ПРИ-' chỉ sự đến nơi (прийти, приехать)."
            }
          ],
          "integrated_vocab_ids": ["v_006"],
          "integrated_writing_id": "write_a2_01",
          "mastery_threshold": 85
        }
      ]
    },
    {
      "module_id": "mod_b1_1",
      "level": "B1.1",
      "title": "Module 5: B1.1 Trung Cấp Độc Lập & Luyện Thi TRKI-1",
      "description": "Câu phức liên từ, diễn đạt lập luận học thuật và làm quen với đề thi chuẩn quốc gia TRKI-1.",
      "lessons": [
        {
          "id": "les_5_1",
          "objective_code": "RUS-B1-01",
          "title": "Bài 5.1: Câu Phức Liên Từ & Đại Từ 'Который'",
          "why_learn": "Giúp bạn ghép nối các câu đơn thành đoạn văn mạch lạc, diễn đạt ý tưởng phức tạp và đọc hiểu các văn bản học thuật.",
          "prerequisites": "Hoàn thành Module 4.",
          "theory_markdown": "### Đại từ liên hệ 'Который':\n- Giống và số của `который` ăn khớp với danh từ nó bổ nghĩa ở mệnh đề trước.\n- Cách của `который` do vai trò ngữ pháp của nó trong mệnh đề phụ quyết định.",
          "context_examples": [
            { "ru": "Студе́нт, кото́рый сиди́т сле́ва, прие́хал из Вьетна́ма.", "vi": "Người sinh viên ngồi bên trái đến từ Việt Nam." },
            { "ru": "Кни́га, кото́рую я чита́ю, о́чень интере́сная.", "vi": "Cuốn sách mà tôi đang đọc rất hay." }
          ],
          "practice_exercises": [
            {
              "q": "Điền dạng đúng: 'Город, в ... (который) мы живём, очень красивый.'",
              "options": ["котором", "которому", "которого"],
              "correct": 0,
              "why": "Sau giới từ 'в' chỉ địa điểm dùng Cách 6 giống đực: 'в котором'."
            }
          ],
          "integrated_vocab_ids": ["v_002", "v_008"],
          "integrated_reading_id": "read_b1_01",
          "mastery_threshold": 90
        },
        {
          "id": "les_5_2",
          "objective_code": "RUS-B1-02",
          "title": "Bài 5.2: Diễn Đạt Lập Luận & Viết Luận Quan Điểm",
          "why_learn": "B1 đòi hỏi khả năng bày tỏ ý kiến, so sánh hai mặt của một vấn đề và viết email/đoạn văn nghị luận hoàn chỉnh.",
          "prerequisites": "Đã học Bài 5.1.",
          "theory_markdown": "### Mẫu câu Redemittel học thuật B1:\n- **По моему мнению / На мой взгляд...** (Theo ý kiến của tôi...)\n- **С одной стороны..., но с другой стороны...** (Một mặt..., nhưng mặt khác...)\n- **Таким образом, можно сделать вывод...** (Như vậy, có thể rút ra kết luận...)",
          "context_examples": [
            { "ru": "По моему́ мне́нию, онлайн-обуче́ние име́ет мно́го плю́сов.", "vi": "Theo tôi, học trực tuyến có nhiều ưu điểm." }
          ],
          "practice_exercises": [
            {
              "q": "Cụm từ nào dùng để diễn đạt 'Một mặt..., nhưng mặt khác...'?",
              "options": ["С одной стороны..., но с другой стороны...", "Несмотря на это...", "Благодаря тому, что..."],
              "correct": 0,
              "why": "'С одной стороны..., но с другой стороны...' là cấu trúc so sánh 2 mặt đối lập chuẩn B1."
            }
          ],
          "integrated_writing_id": "write_b1_01",
          "integrated_speaking_id": "speak_01",
          "mastery_threshold": 90
        }
      ]
    }
  ]
}

with open(os.path.join(DATA_DIR, "curriculum_tree.json"), "w", encoding="utf-8") as f:
    json.dump(curriculum_payload, f, ensure_ascii=False, indent=2)

print("Generated comprehensive curriculum_tree.json with 6 modules and 13 detailed lessons!", flush=True)
