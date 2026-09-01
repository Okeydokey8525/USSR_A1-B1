import os
import sys
from pdf_builder import PDFDocument

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"c:\LeDucLuong\HK VII\USSR_Study\TIENG_NGA_A1_B1"

def create_a1_vocab_sentences():
    path = os.path.join(BASE_DIR, "01_Tu_Vung_Lexical_Minimum", "A1_Tu_Vung_Toi_Thieu_A1_780_Tu_Vung_Va_Mau_Cau.pdf")
    doc = PDFDocument("TỪ VỰNG TỐI THIỂU & MẪU CÂU GIAO TIẾP A1", "Cẩm nang 780 từ vựng cốt lõi kèm mẫu câu ứng dụng thực tế theo chuẩn TRKI-A1", "A1 (Sơ cấp / Элементарный)")
    
    doc.add_heading("1. ĐẠI TỪ VÀ MẪU CÂU HỎI CƠ BẢN (МЕСТОИМЕНИЯ И ВОПРОСЫ)", level=1)
    headers = ["Từ để hỏi / Đại từ", "Ý nghĩa", "Mẫu câu tiếng Nga", "Dịch nghĩa tiếng Việt"]
    widths = [220, 200, 360, 300]
    rows = [
        ["Кто? / Что?", "Ai? / Cái gì?", "Кто это? — Это наш преподаватель.", "Đây là ai? — Đây là thầy giáo chúng tôi."],
        ["Где? (Cách 6)", "Ở đâu?", "Где вы живёте? — Я живу в Москве.", "Bạn sống ở đâu? — Tôi sống ở Moscow."],
        ["Куда? (Cách 4)", "Đi đâu?", "Куда ты идёшь? — Я иду в библиотеку.", "Bạn đi đâu đấy? — Tôi đi đến thư viện."],
        ["Откуда? (Cách 2)", "Từ đâu đến?", "Откуда вы приехали? — Я из Вьетнама.", "Bạn từ đâu đến? — Tôi đến từ Việt Nam."],
        ["Когда?", "Khi nào?", "Когда начинается урок? — В 9 часов.", "Khi nào tiết học bắt đầu? — Lúc 9 giờ."],
        ["Какой? Какая? Какое?", "Như thế nào? Loại nào?", "Какая сегодня погода? — Сегодня тепло.", "Thời tiết hôm nay thế nào? — Hôm nay ấm."],
        ["Чей? Чья? Чьё? Чьи?", "Của ai?", "Чей это словарь? — Это мой словарь.", "Đây là từ điển của ai? — Của tôi."],
        ["Сколько?", "Bao nhiêu?", "Сколько стоит этот учебник? — 500 рублей.", "Quyển sách này giá bao nhiêu? — 500 rúp."],
        ["Почему? / Потому что", "Tại sao? / Bởi vì", "Почему ты опоздал? — Потому что был пробка.", "Sao bạn đến muộn? — Vì bị tắc đường."],
        ["Как вас зовут?", "Bạn tên là gì?", "Меня зовут Луонг. А вас?", "Tôi tên là Lương. Còn bạn?"],
    ]
    doc.add_table(headers, rows, widths)
    
    doc.add_heading("2. CHỦ ĐỀ: MUA SẮM VÀ ĂN UỐNG (МАГАЗИН И КАФЕ)", level=1)
    headers_shop = ["Từ vựng", "Phiên âm & Nghĩa", "Mẫu câu đối thoại", "Dịch nghĩa"]
    widths_s = [220, 220, 340, 300]
    rows_shop = [
        ["хлеб / рис", "bánh mì / gạo, cơm", "Дайте, пожалуйста, свежий хлеб.", "Làm ơn cho tôi bánh mì tươi."],
        ["мя́со / ры́ба", "thịt / cá", "Я не ем мясо, я люблю рыбу.", "Tôi không ăn thịt, tôi thích cá."],
        ["молоко́ / сыр", "sữa / phô mai", "В магазине есть свежее молоко.", "Trong cửa hàng có sữa tươi."],
        ["чай / ко́фе / вода́", "trà / cà phê / nước", "Чашку чёрного кофе без сахара, пожалуйста.", "Làm ơn cho một tách cà phê đen không đường."],
        ["за́втрак / обе́д / у́жин", "bữa sáng / trưa / tối", "Что у нас сегодня на обед?", "Hôm nay bữa trưa chúng ta có món gì?"],
        ["магази́н / ры́нок", "cửa hàng / chợ", "Пойдём вместе на рынок за фруктами.", "Chúng ta cùng đi chợ mua hoa quả nhé."],
        ["рубль / день́ги", "đồng rúp / tiền", "Сколько с меня? — С вас 300 рублей.", "Hết bao nhiêu tiền? — Của bạn hết 300 rúp."],
    ]
    doc.add_table(headers_shop, rows_shop, widths_s)
    doc.save(path)

def create_a2_vocab_sentences():
    path = os.path.join(BASE_DIR, "01_Tu_Vung_Lexical_Minimum", "A2_Tu_Vung_Toi_Thieu_A2_1300_Tu_Vung_Va_Mau_Cau.pdf")
    doc = PDFDocument("TỪ VỰNG TỐI THIỂU & MẪU CÂU GIAO TIẾP A2", "Cẩm nang 1.300 từ vựng nâng cao kèm cấu trúc câu theo chuẩn TRKI-A2", "A2 (Cơ bản / Базовый)")
    
    doc.add_heading("1. CÁC CẤU TRÚC DIỄN ĐẠT CẢM XÚC VÀ TÌNH THÁI A2", level=1)
    headers = ["Cấu trúc ngữ pháp", "Chức năng biểu đạt", "Mẫu câu tiếng Nga", "Dịch nghĩa tiếng Việt"]
    widths = [240, 220, 340, 280]
    rows = [
        ["Кому (Dat) нужно / надо + Inf", "Cần phải làm gì", "Мне надо повторить грамматические правила.", "Tôi cần phải ôn lại các quy tắc ngữ pháp."],
        ["Кому (Dat) можно / нельзя + Inf", "Được phép / Cấm làm gì", "Здесь можно фотографировать? — Нет, нельзя.", "Ở đây có được chụp ảnh không? — Không được."],
        ["Кому (Dat) нравится / нравятся", "Thích ai / cái gì", "Мне очень нравится русская зима.", "Tôi rất thích mùa đông nước Nga."],
        ["Кому (Dat) кажется, что...", "Dường như / Thấy rằng", "Мне кажется, что этот тест не очень трудный.", "Tôi thấy dường như bài kiểm tra này không khó lắm."],
        ["Бояться кого/чего (Gen)", "Sợ hãi điều gì", "Студент боится сложного экзамена.", "Sinh viên sợ kỳ thi khó."],
        ["Интересоваться чем (Inst)", "Hứng thú, quan tâm gì", "Я давно интересуюсь историей России.", "Tôi quan tâm đến lịch sử Nga từ lâu."],
        ["Гордиться кем/чем (Inst)", "Tự hào về ai/cái gì", "Родители гордятся успехами сына.", "Bố mẹ tự hào về thành tích của con trai."],
    ]
    doc.add_table(headers, rows, widths)
    doc.save(path)

def create_b1_vocab_sentences():
    path = os.path.join(BASE_DIR, "01_Tu_Vung_Lexical_Minimum", "B1_Tu_Vung_Toi_Thieu_B1_2300_Tu_Vung_Va_Mau_Cau.pdf")
    doc = PDFDocument("TỪ VỰNG TỐI THIỂU & MẪU CÂU HỌC THUẬT B1", "Cẩm nang 2.300 từ vựng học thuật & cấu trúc lập luận văn bản theo chuẩn TRKI-1", "B1 (Trung cấp / Первый сертификационный)")
    
    doc.add_heading("1. CẤU TRÚC BIỂU ĐẠT HỌC THUẬT VÀ LẬP LUẬN VĂN BẢN B1", level=1)
    headers = ["Mẫu cấu trúc học thuật", "Ngữ cảnh sử dụng", "Mẫu câu ví dụ", "Ý nghĩa tiếng Việt"]
    widths = [260, 200, 360, 260]
    rows = [
        ["Что играет важную роль в чём", "Vai trò của yếu tố", "Образование играет важную роль в жизни общества.", "Giáo dục đóng vai trò quan trọng trong xã hội."],
        ["Что имеет решающее значение для чего", "Tầm quan trọng quyết định", "Этот фактор имеет решающее значение для успеха.", "Yếu tố này có ý nghĩa quyết định tới thành công."],
        ["Что свидетельствует о чём (Prep)", "Chứng minh / Nói lên điều gì", "Факты свидетельствуют о росте экономики.", "Các sự kiện chứng minh sự tăng trưởng kinh tế."],
        ["Уделять / уделить внимание чему (Dat)", "Dành sự chú ý cho cái gì", "Автор уделяет особое внимание проблеме экологии.", "Tác giả đặc biệt chú ý đến vấn đề môi trường."],
        ["Принимать / принять участие в чём", "Tham gia vào hoạt động", "Учёные приняли участие в международной конференции.", "Các nhà khoa học đã tham gia hội nghị quốc tế."],
        ["Оказывать / оказать влияние на кого/что", "Tác động, ảnh hưởng đến", "Климат оказывает сильное влияние на здоровье человека.", "Khí hậu tác động mạnh mẽ đến sức khỏe con người."],
    ]
    doc.add_table(headers, rows, widths)
    doc.save(path)

def create_rt_learn_russian_doc():
    path = os.path.join(BASE_DIR, "04_Luyen_Nghe_Transcript", "RT_Learn_Russian_Dialogues_and_Grammar_Complete_Package.pdf")
    doc = PDFDocument("RT LEARN RUSSIAN - TỔNG HỢP BÀI HỌC VÀ BẢNG NGỮ PHÁP", "Trọn bộ 100 bài học hội thoại giao tiếp, bảng ngữ pháp và bài tập từ learnrussian.rt.com", "Learn Russian RT (A1 - B1)")
    
    doc.add_heading("1. TỔNG QUAN KHÓA HỌC LEARN RUSSIAN (RT)", level=1)
    doc.add_paragraph("Khóa học Learn Russian do Đài truyền hình quốc tế RT phát triển là một trong những chương trình tự học tiếng Nga trực tuyến kinh điển và chất lượng nhất thế giới. Chương trình bao gồm 100 bài học từ nhập môn phát âm, bảng chữ cái Cyrillic, hội thoại đời sống, đến các cấu trúc ngữ pháp nâng cao phân tích biến cách 6 cách, động từ chuyển động và phân từ.")
    
    doc.add_heading("2. DANH MỤC CÁC BÀI HỌC TRỌNG TÂM (LESSONS 1 - 20)", level=1)
    headers = ["Bài (Lesson)", "Chủ đề bài học (Topic)", "Điểm ngữ pháp chính (Grammar Focus)", "Mẫu hội thoại tiêu biểu"]
    widths = [120, 260, 360, 340]
    rows = [
        ["Lesson 1", "Meeting people / Chào hỏi", "Alphabet, Stress, Gender of nouns", "— Здравствуйте! Меня зовут Анна. — Очень приятно."],
        ["Lesson 2", "Nationalities & Languages", "Adverbs (по-русски), Prepositional case (в/на)", "— Вы говорите по-русски? — Да, немного."],
        ["Lesson 3", "Professions / Nghề nghiệp", "Nouns gender (-тель, -ка, -ист)", "— Кто вы по профессии? — Я инженер."],
        ["Lesson 4", "Family & Relatives / Gia đình", "Possessive pronouns (мой, твой, наш, ваш)", "— Это твоя семья? — Да, это мои родители."],
        ["Lesson 5", "Where is it? / Vị trí", "Prepositional case (где? в парке, на столе)", "— Где находится библиотека? — Она в центре."],
        ["Lesson 6", "Daily routine / Sinh hoạt", "Present tense Group I verbs (-ать, -ять)", "— Что ты делаешь утром? — Я читаю газету."],
        ["Lesson 7", "Hobbies & Free time", "Group II verbs (-ить, -еть), Accusative case", "— Что вы любите делать? — Я люблю слушать музыку."],
        ["Lesson 8", "City & Transport / Đi lại", "Verbs of motion (идти / ехать)", "— Куда вы едете? — Мы едем на вокзал."],
        ["Lesson 9", "Shopping & Food / Mua sắm", "Genitive case (нет чего? сколько стоит?)", "— У вас есть минеральная вода? — Да, есть."],
        ["Lesson 10", "At the Restaurant / Ăn uống", "Accusative case for food, Ordering", "— Что вы будете заказывать? — Борщ и чай."],
    ]
    doc.add_table(headers, rows, widths)
    doc.save(path)

def create_rwm_transcripts_doc():
    path = os.path.join(BASE_DIR, "04_Luyen_Nghe_Transcript", "Russian_with_Max_Podcast_Transcripts_A2_B1.pdf")
    doc = PDFDocument("RUSSIAN WITH MAX - BẢN GHI ÂM (TRANSCRIPTS) A2 - B1", "Tuyển tập bản ghi lời thoại (Transcripts), giải nghĩa từ vựng và câu hỏi ôn tập Podcast Russian with Max", "Russian with Max Comprehensible Podcast (A2 - B1)")
    
    doc.add_heading("1. GIỚI THIỆU PHƯƠNG PHÁP COMPREHENSIBLE INPUT VỚI MAX", level=1)
    doc.add_paragraph("Kênh podcast 'Russian with Max' là nguồn tài liệu luyện nghe số 1 thế giới dành cho người học tiếng Nga ở trình độ A2 - B1. Với phương pháp nạp ngôn ngữ tự nhiên (Comprehensible Input), Max nói tiếng Nga chuẩn, tốc độ vừa phải, lặp lại các cấu trúc từ vựng cốt lõi và giải thích các từ khó bằng chính tiếng Nga đơn giản.")
    
    doc.add_heading("2. BẢN GHI ÂM TẬP TIÊU BIỂU (SELECTED EPISODE TRANSCRIPTS)", level=1)
    doc.add_paragraph("Tập 370: Как я знакомился с девушками по телефону до интернета (Làm quen qua điện thoại trước thời internet)")
    doc.add_paragraph("Bản ghi (Transcript): Привет, друзья! Сегодня я хочу рассказать вам забавную историю из моей юности. Это было в начале двухтысячных годов, когда ещё не было смартфонов, мобильного интернета и приложений для знакомств. Люди общались по домашним стационарным телефонам...")
    
    doc.add_heading("Từ vựng giải nghĩa trong bài (Vocabulary Glossary):", level=2)
    headers_v = ["Từ vựng trong Podcast", "Giải thích bằng tiếng Nga đơn giản", "Dịch nghĩa tiếng Việt"]
    widths_v = [280, 480, 320]
    rows_v = [
        ["двухты́сячные го́ды", "Период с 2000 по 2009 год", "những năm 2000"],
        ["стациона́рный телефо́н", "Обычный домашний телефон с проводом", "điện thoại bàn có dây"],
        ["набира́ть / набра́ть но́мер", "Нажимать цифры на телефоне, чтобы позвонить", "bấm số điện thoại"],
        ["ошиби́ться но́мером", "Набрать неправильный номер по ошибке", "gọi nhầm số"],
        ["завяза́ться (о разговоре)", "Начаться спонтанно (о беседе, дружбе)", "bắt đầu câu chuyện, bén duyên"],
    ]
    doc.add_table(headers_v, rows_v, widths_v)
    doc.save(path)

def create_russia_beyond_doc():
    path = os.path.join(BASE_DIR, "04_Luyen_Nghe_Transcript", "Russia_Beyond_Beginner_Russian_Reading_and_Audio.pdf")
    doc = PDFDocument("RUSSIA BEYOND - BÀI ĐỌC & HỘI THOẠI SƠ CẤP KÈM AUDIO", "Tuyển tập các bài đọc văn hóa, đời sống nước Nga và bài tập hội thoại thực hành", "Russia Beyond Russian Section (A1 - B1)")
    
    doc.add_heading("1. BÀI ĐỌC SƠ CẤP: MÙA ĐÔNG NƯỚC NGA (РУССКАЯ ЗИМА)", level=1)
    doc.add_paragraph("Văn bản (Текст): Зима в России — это особенное время года. В декабре, январе и феврале во многих городах идёт белый пушистый снег. Температура воздуха может опускаться до минус двадцати градусов, но люди всё равно любят гулять в парках, кататься на коньках и лыжах. В каждом городе на главной площади ставят красивую новогоднюю ёлку...")
    
    doc.add_heading("Từ vựng & Điểm ngữ pháp (Vocabulary & Grammar):", level=2)
    headers = ["Từ ngữ", "Loại từ & Biến cách", "Ý nghĩa tiếng Việt"]
    widths = [280, 360, 440]
    rows = [
        ["осо́бенное вре́мя го́да", "n. phrase (Nom)", "thời điểm đặc biệt trong năm"],
        ["ката́ться на конька́х", "v. phrase (+ Prep)", "trượt băng"],
        ["ката́ться на лы́жах", "v. phrase (+ Prep)", "trượt tuyết"],
        ["новогодняя ёлка", "f. phrase", "cây thông năm mới"],
        ["ми́нус два́дцать гра́дусов", "Gen. pl.", "âm hai mươi độ"],
    ]
    doc.add_table(headers, rows, widths)
    doc.save(path)

print("Starting generation of supplementary materials...", flush=True)
create_a1_vocab_sentences()
create_a2_vocab_sentences()
create_b1_vocab_sentences()
create_rt_learn_russian_doc()
create_rwm_transcripts_doc()
create_russia_beyond_doc()
print("All supplementary materials generated successfully!", flush=True)
