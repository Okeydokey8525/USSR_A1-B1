import os
import sys
import json
from pdf_builder import PDFDocument

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"c:\LeDucLuong\HK VII\USSR_Study\TIENG_NGA_A1_B1"

def create_lexical_minimum_a1():
    path = os.path.join(BASE_DIR, "01_Tu_Vung_Lexical_Minimum", "A1_Lexical_Minimum_Elementarnyj_Uroven_Pushkin_Zlatoust.pdf")
    doc = PDFDocument("ЛЕКСИЧЕСКИЙ МИНИМУМ РКИ - УРОВЕНЬ А1", "Лексический минимум по русскому языку как иностранному. Элементарный уровень (ТЭУ)", "A1 (Элементарный / ТЭУ - 780 единиц)")
    
    doc.add_heading("1. GIỚI THIỆU CHUẨN TỪ VỰNG TỐI THIỂU A1 (ТЭУ)", level=1)
    doc.add_paragraph("Tập từ vựng tối thiểu cấp độ Sơ cấp A1 (Элементарный уровень - ТЭУ) theo chuẩn của Viện Quốc gia Ngôn ngữ Nga Pushkin và Hội đồng Khảo thí Quốc gia Nga bao gồm khoảng 780 đơn vị từ vựng. Đây là lượng từ vựng bắt buộc để vượt qua kỳ thi chứng chỉ TRKI-A1 trong các ngữ cảnh giao tiếp sinh hoạt hàng ngày, giới thiệu bản thân, trường học, gia đình, mua sắm và hỏi đường.")
    
    doc.add_callout("Thí sinh đạt trình độ A1 cần nắm vững: Danh từ (giống đực, cái, trung; số ít, số nhiều; biến cách 6 cách cơ bản), Tính từ cơ bản, Đại từ, Động từ nhóm I & II thì Hiện tại, Quá khứ, Tương lai, Thể chưa hoàn thành/hoàn thành cơ bản.", "YÊU CẦU NĂNG LỰC TRKI-A1")
    
    doc.add_heading("2. DANH TỪ CỐT LÕI THEO CHỦ ĐỀ (СУЩЕСТВИТЕЛЬНЫЕ)", level=1)
    
    doc.add_heading("2.1. Con người & Gia đình (Человек и семья)", level=2)
    headers = ["Từ vựng (Слово)", "Loại từ & Giống", "Ý nghĩa tiếng Việt", "Ví dụ mẫu (Пример)"]
    widths = [260, 200, 260, 360]
    rows = [
        ["челове́к / лю́ди", "m. / pl.", "người / mọi người", "Хороший человек."],
        ["мужчи́на", "m. (đuôi -a)", "người đàn ông", "Этот мужчина — врач."],
        ["же́нщина", "f.", "người phụ nữ", "Красивая женщина."],
        ["друг / друзья́", "m. / pl.", "người bạn / bạn bè", "Мой лучший друг."],
        ["подру́га", "f.", "bạn gái / bạn nữ", "Моя школьная подруга."],
        ["семья́", "f.", "gia đình", "Большая дружная семья."],
        ["оте́ц / па́па", "m.", "bố / cha", "Отец работает на заводе."],
        ["мать / ма́ма", "f.", "mẹ", "Мама готовит обед."],
        ["сын / сыновья́", "m. / pl.", "con trai", "У них взрослый сын."],
        ["дочь / до́чери", "f. / pl.", "con gái", "Моя дочь учится в школе."],
        ["брат / бра́тья", "m. / pl.", "anh/em trai", "Старший брат."],
        ["сестра́ / сёстры", "f. / pl.", "chị/em gái", "Младшая сестра."],
        ["де́душка", "m. (đuôi -a)", "ông nội/ngoại", "Дедушка на пенсии."],
        ["ба́бушка", "f.", "bà nội/ngoại", "Бабушка печёт пироги."],
        ["ребёнок / де́ти", "m. / pl.", "đứa trẻ / trẻ em", "Маленькие дети."],
    ]
    doc.add_table(headers, rows, widths)
    
    doc.add_heading("2.2. Nghề nghiệp & Học tập (Профессия и учёба)", level=2)
    rows_edu = [
        ["студе́нт / студе́нтка", "m. / f.", "sinh viên nam / nữ", "Я студент университета."],
        ["преподава́тель", "m.", "giảng viên", "Преподаватель русского языка."],
        ["учи́тель / учи́тельница", "m. / f.", "giáo viên", "Учитель физики."],
        ["врач / до́ктор", "m.", "bác sĩ", "Опытный врач."],
        ["инжене́р", "m.", "kỹ sư", "Главный инженер проекта."],
        ["университе́т", "m.", "trường đại học", "Учиться в университете."],
        ["институ́т", "m.", "học viện/viện", "Московский институт."],
        ["шко́ла", "f.", "trường phổ thông", "Учиться в школе."],
        ["факульте́т", "m.", "khoa (đại học)", "Филологический факультет."],
        ["курс", "m.", "khóa học / năm thứ...", "Я учусь на первом курсе."],
        ["кни́га", "f.", "quyển sách", "Интересная книга."],
        ["уче́бник", "m.", "sách giáo trình", "Учебник по грамматике."],
        ["слова́рь", "m.", "từ điển", "Русско-вьетнамский словарь."],
        ["тетра́дь", "f.", "vở ghi bài", "Тетрадь в клетку."],
        ["ру́чка / каранда́ш", "f. / m.", "bút mực / bút chì", "Писать синей ручкой."],
    ]
    doc.add_table(headers, rows_edu, widths)

    doc.add_heading("3. ĐỘNG TỪ CỐT LÕI A1 (ГЛАГОЛЫ A1)", level=1)
    doc.add_paragraph("Động từ cấp độ A1 tập trung vào các hành động thường nhật, sinh hoạt, học tập và trạng thái. Thí sinh phải nắm chắc quy tắc chia động từ nhóm I (-ать, -ять) và nhóm II (-ить, -еть).")
    
    headers_v = ["Động từ (НСВ / СВ)", "Nhóm chia", "Ý nghĩa", "Mẫu câu ứng dụng"]
    widths_v = [280, 160, 260, 380]
    rows_v = [
        ["чита́ть / прочита́ть", "I / I", "đọc", "Каждый день я читаю книги."],
        ["писа́ть / написа́ть", "I (пишу́, пи́шешь)", "viết", "Студент пишет письмо домой."],
        ["говори́ть / сказа́ть", "II (говорю́, -и́шь)", "nói", "Он хорошо говорит по-русски."],
        ["понима́ть / поня́ть", "I / I (пойму́, поймёшь)", "hiểu", "Вы понимаете этот вопрос?"],
        ["знать / узна́ть", "I", "biết", "Я знаю эту новость."],
        ["ду́мать / поду́мать", "I", "nghĩ / suy nghĩ", "О чём вы думаете?"],
        ["слу́шать / послу́шать", "I", "nghe / lắng nghe", "Слушать русскую музыку."],
        ["смотре́ть / посмотре́ть", "II (смотрю́, смо́тришь)", "xem / nhìn", "Смотреть новый фильм."],
        ["де́лать / сде́лать", "I", "làm", "Что вы делаете вечером?"],
        ["рабо́тать / порабо́тать", "I", "làm việc", "Мой отец работает в банке."],
        ["учи́ться (где?)", "II (учу́сь, у́чишься)", "học tập (ở đâu)", "Они учатся в Москве."],
        ["изуча́ть (что?)", "I", "nghiên cứu/học (môn gì)", "Мы изучаем русский язык."],
        ["жить (где?)", "I (живу́, живёшь)", "sống / sinh sống", "Я живу в общежитии."],
        ["люби́ть (кого? что?)", "II (люблю́, лю́бишь)", "yêu / thích", "Я люблю русскую литературу."],
        ["хоте́ть (что? / inf)", "Bất quy tắc (хочу́, хо́чешь)", "muốn", "Я хочу пить чай."],
    ]
    doc.add_table(headers_v, rows_v, widths_v)

    doc.add_heading("4. TÍNH TỪ VÀ TRẠNG TỪ CĂN BẢN (ПРИЛАГАТЕЛЬНЫЕ И НАРЕЧИЯ)", level=1)
    headers_adj = ["Tính từ (m./f./n./pl.)", "Trạng từ tương ứng", "Ý nghĩa", "Ví dụ"]
    widths_adj = [300, 220, 240, 320]
    rows_adj = [
        ["хоро́ший, -ая, -ее, -ие", "хорошо́", "tốt, hay, giỏi", "Хороший день. Он говорит хорошо."],
        ["плохо́й, -ая, -ое, -ие", "пло́хо", "xấu, tồi, tệ", "Плохая погода. Мне плохо."],
        ["краси́вый, -ая, -ое, -ые", "краси́во", "đẹp", "Красивый город. Здесь очень красиво."],
        ["большо́й, -ая, -ое, -ие", "мно́го", "to, lớn, nhiều", "Большой дом. Много работы."],
        ["ма́ленький, -ая, -ое, -ие", "ма́ло", "nhỏ, bé, ít", "Маленькая комната. Мало времени."],
        ["но́вый, -ая, -ое, -ые", "но́во", "mới", "Новый учебник русского языка."],
        ["ста́рый, -ая, -ое, -ые", "ста́ро", "cũ, già", "Старый друг. Старая книга."],
        ["ру́сский, -ая, -ое, -ие", "по-ру́сски", "Nga / bằng tiếng Nga", "Русский язык. Говорить по-русски."],
        ["бы́стрый, -ая, -ое, -ые", "бы́стро", "nhanh", "Быстрый поезд. Ехать быстро."],
        ["ме́дленный, -ая, -ое, -ые", "ме́дленно", "chậm", "Медленный шаг. Читать медленно."],
    ]
    doc.add_table(headers_adj, rows_adj, widths_adj)

    doc.save(path)

def create_lexical_minimum_a2():
    path = os.path.join(BASE_DIR, "01_Tu_Vung_Lexical_Minimum", "A2_Lexical_Minimum_Bazovyj_Uroven_Pushkin_Zlatoust.pdf")
    doc = PDFDocument("ЛЕКСИЧЕСКИЙ МИНИМУМ РКИ - УРОВЕНЬ А2", "Лексический минимум по русскому языку как иностранному. Базовый уровень (ТБУ)", "A2 (Базовый / ТБУ - 1300 единиц)")
    
    doc.add_heading("1. GIỚI THIỆU CHUẨN TỪ VỰNG TỐI THIỂU A2 (ТБУ)", level=1)
    doc.add_paragraph("Tập từ vựng tối thiểu cấp độ Cơ bản A2 (Базовый уровень - ТБУ) mở rộng vốn từ lên khoảng 1.300 đơn vị. Trình độ này đòi hỏi người học có khả năng biểu đạt các ý kiến cá nhân, miêu tả chi tiết người và sự vật, diễn tả cảm xúc, các tình huống giao tiếp nơi công cộng (ngân hàng, bưu điện, khám bệnh, du lịch, mua sắm) và sử dụng thành thạo thể động từ cùng động từ chuyển động có tiền tố.")

    doc.add_heading("2. TỪ VỰNG CHỦ ĐỀ NÂNG CAO TRKI-A2", level=1)
    
    headers = ["Từ vựng (Слово)", "Từ loại & Quản cách", "Ý nghĩa tiếng Việt", "Mẫu câu ứng dụng (Пример)"]
    widths = [260, 220, 260, 340]
    
    rows_soc = [
        ["здоро́вье / боле́знь", "n. / f.", "sức khỏe / bệnh tật", "Желаю вам крепкого здоровья."],
        ["больни́ца / поликли́ника", "f.", "bệnh viện / phòng khám", "Пойти на приём к врачу в больницу."],
        ["лека́рство (от чего?)", "n. (+ Gen)", "thuốc chữa bệnh", "Купить лекарство от простуды."],
        ["температу́ра", "f.", "nhiệt độ / sốt", "У меня высокая температура."],
        ["путеше́ствие / тури́зм", "n. / m.", "chuyến du lịch / du lịch", "Интересное путешествие по России."],
        ["гости́ница / оте́ль", "f. / m.", "khách sạn", "Забронировать номер в гостинице."],
        ["биле́т (на что? куда?)", "m.", "vé (tàu, xe, máy bay)", "Купить билет на самолёт в Москву."],
        ["вокза́л / аэропо́рт", "m.", "nhà ga / sân bay", "Встретить друга на вокзале."],
        ["по́езд / самолёт", "m.", "tàu hỏa / máy bay", "Поехать на скором поезде."],
        ["па́спорт / ви́за", "m. / f.", "hộ chiếu / thị thực", "Оформить туристическую визу."],
        ["пого́да / кли́мат", "f. / m.", "thời tiết / khí hậu", "Завтра будет тёплая погода."],
        ["дождь / снег / ве́тер", "m.", "mưa / tuyết / gió", "На улице идёт сильный дождь."],
        ["приро́да / лес / река́", "f. / m. / f.", "thiên nhiên / rừng / sông", "Отдыхать на природе у реки."],
        ["пра́здник / пода́рок", "m.", "ngày lễ / quà tặng", "Поздравлять с праздником и дарить подарок."],
        ["день рожде́ния", "m. phrase", "ngày sinh nhật", "Пригласить друзей на день рождения."],
    ]
    doc.add_table(headers, rows_soc, widths)

    doc.add_heading("3. CẶP ĐỘNG TỪ THỂ VÀ QUẢN CÁCH (ВИДОВЫЕ ПАРЫ И УПРАВЛЕНИЕ)", level=1)
    headers_pair = ["Chưa hoàn thành (НСВ)", "Hoàn thành (СВ)", "Quản cách & Ý nghĩa", "Ví dụ"]
    widths_p = [260, 260, 260, 300]
    rows_pair = [
        ["покупа́ть", "купи́ть (куплю́, ку́пишь)", "кого/что (Acc) - mua", "Я купил новый телефон."],
        ["реша́ть", "реши́ть (решу́, реши́шь)", "что / inf - quyết định/giải", "Мы решили эту сложную задачу."],
        ["помога́ть", "помо́чь (помогу́, помо́жешь)", "кому (Dat) - giúp đỡ", "Помоги мне, пожалуйста."],
        ["объясня́ть", "объясни́ть (объясню́, -и́шь)", "кому что - giải thích", "Учитель объяснил правило."],
        ["открыва́ть", "откры́ть (откро́ю, -ешь)", "что (Acc) - mở", "Откройте окно, пожалуйста."],
        ["закрыва́ть", "закры́ть (закро́ю, -ешь)", "что (Acc) - đóng", "Магазин закрывается в 9 часов."],
        ["начина́ть(ся)", "нача́ть(ся) (начну́, -ёшь)", "что / inf - bắt đầu", "Урок начался вовремя."],
        ["конча́ть(ся)", "ко́нчить(ся) (ко́нчу, -ишь)", "что - kết thúc", "Фильм кончился поздно."],
        ["звони́ть", "позвони́ть (позвоню́, -и́шь)", "кому (Dat) куда - gọi điện", "Я позвоню тебе завтра вечером."],
        ["встреча́ть(ся)", "встре́тить(ся) (встре́чу, -ишь)", "кого / с кем - gặp gỡ", "Мы встретились в парке."],
    ]
    doc.add_table(headers_pair, rows_pair, widths_p)

    doc.save(path)

def create_lexical_minimum_b1():
    path = os.path.join(BASE_DIR, "01_Tu_Vung_Lexical_Minimum", "B1_Lexical_Minimum_Pervyj_Sertifikacionnyj_Uroven.pdf")
    doc = PDFDocument("ЛЕКСИЧЕСКИЙ МИНИМУМ РКИ - УРОВЕНЬ B1", "Лексический минимум по русскому языку как иностранному. Первый сертификационный уровень (ТРКИ-1)", "B1 (Первый сертификационный / ТРКИ-1 - 2300 единиц)")
    
    doc.add_heading("1. GIỚI THIỆU CHUẨN TỪ VỰNG TỐI THIỂU B1 (ТРКИ-1)", level=1)
    doc.add_paragraph("Cấp độ B1 (Первый сертификационный уровень / ТРКИ-1) là mức độ chứng chỉ đầu tiên công nhận người học có đủ trình độ tiếng Nga để theo học các chương trình đại học, cao học và làm việc chuyên môn tại Liên bang Nga. Khung từ vựng B1 gồm khoảng 2.300 đơn vị từ, bao gồm các khái niệm trừu tượng, thuật ngữ khoa học đại cương, chính trị, kinh tế, văn hóa, nghệ thuật và cấu trúc câu phức hợp.")

    doc.add_heading("2. TỪ VỰNG CHỦ ĐỀ CHUYÊN SÂU B1", level=1)
    headers = ["Thuật ngữ / Từ vựng", "Từ loại & Cấu trúc", "Ý nghĩa tiếng Việt", "Ngữ cảnh sử dụng"]
    widths = [260, 220, 260, 340]
    rows_b1 = [
        ["о́бщество / социа́льный", "n. / adj.", "xã hội / thuộc xã hội", "Развитие современного общества."],
        ["госуда́рство / поли́тика", "n. / f.", "nhà nước / chính trị", "Внутренняя и внешняя политика государства."],
        ["эконо́мика / ры́нок", "f. / m.", "kinh tế / thị trường", "Рыночная экономика и инвестиции."],
        ["культу́ра / иску́сство", "f. / n.", "văn hóa / nghệ thuật", "Памятники мировой культуры и искусства."],
        ["нау́ка / исследова́ние", "f. / n.", "khoa học / công trình nghiên cứu", "Проводить научные исследования."],
        ["образова́ние / систе́ма", "n. / f.", "giáo dục / hệ thống", "Система высшего образования в России."],
        ["эколо́гия / окружа́ющая среда́", "f. / phrase", "sinh thái / môi trường sống", "Защита окружающей среды от загрязнения."],
        ["отноше́ния / сотру́дничество", "pl. / n.", "mối quan hệ / sự hợp tác", "Международное сотрудничество стран."],
        ["разви́тие / прогре́сс", "n. / m.", "sự phát triển / tiến bộ", "Научно-технический прогресс."],
        ["влия́ние (на кого/что)", "n. (+ Acc)", "sự ảnh hưởng, tác động", "Влияние интернета на молодёжь."],
        ["пра́во / зако́н", "n. / m.", "pháp luật / điều luật", "Соблюдение законов и прав человека."],
        ["цель / зада́ча", "f. / f.", "mục tiêu / nhiệm vụ", "Главная цель нашего исследования."],
        ["причи́на / сле́дствие", "f. / n.", "nguyên nhân / hệ quả", "Причинно-следственная связь событий."],
        ["успе́х / достиже́ние", "m. / n.", "thành công / thành tựu", "Выдающиеся достижения в науке."],
        ["мне́ние / то́чка зре́ния", "n. / phrase", "ý kiến / quan điểm", "По моему мнению; С точки зрения автора."],
    ]
    doc.add_table(headers, rows_b1, widths)

    doc.add_heading("3. CÁC TỪ NỐI VÀ LIÊN TỪ LOGIC TRONG VĂN BẢN B1", level=1)
    headers_c = ["Liên từ / Cụm từ nối", "Ý nghĩa logic", "Chức năng cú pháp", "Ví dụ"]
    widths_c = [260, 220, 240, 360]
    rows_c = [
        ["потому́ что / так как", "chỉ nguyên nhân (vì)", "Mệnh đề phụ nguyên nhân", "Он не пришёл, так как заболел."],
        ["поэ́тому / следовательно", "chỉ kết quả (do đó, vì vậy)", "Liên kết câu", "Шёл дождь, поэтому мы остались дома."],
        ["хотя́ / несмотря́ на то что", "chỉ sự nhượng bộ (mặc dù)", "Mệnh đề phụ nhượng bộ", "Мы пошли гулять, хотя было холодно."],
        ["что́бы / для того́ что́бы", "chỉ mục đích (để mà)", "Mệnh đề phụ mục đích", "Я учу русский, чтобы учиться в РФ."],
        ["е́сли / е́сли бы", "chỉ điều kiện (nếu / nếu như)", "Mệnh đề điều kiện", "Если будет время, я приду."],
        ["кро́ме того́ / так же", "bổ sung ý (ngoài ra, cũng)", "Liên từ liên kết", "Он студент, кроме того, он работает."],
        ["с одно́й стороны... с друго́й", "đối chiếu hai mặt vấn đề", "Cặp cụm từ đối lập", "С одной стороны это трудно, но полезно."],
    ]
    doc.add_table(headers_c, rows_c, widths_c)

    doc.save(path)

def create_grammar_aspect_tables():
    path = os.path.join(BASE_DIR, "02_Ngu_Phap_Va_Bang_Tra_Cuu", "Bang_Phan_Biet_The_Dong_Tu_NSV_SV_Aspect_Tables.pdf")
    doc = PDFDocument("BẢNG TRA CỨU THỂ ĐỘNG TỪ TIẾNG NGA (ВИДЫ ГЛАГОЛОВ)", "Hệ thống phân biệt Thể chưa hoàn thành (НСВ) và Thể hoàn thành (СВ) từ A1 đến B1", "TRKI A1 - B1 Grammar Master Tables")
    
    doc.add_heading("1. BẢN CHẤT VÀ Ý NGHĨA NGỮ PHÁP CỦA THỂ ĐỘNG TỪ", level=1)
    doc.add_paragraph("Trong tiếng Nga, hầu hết các động từ đều tồn tại theo cặp thể (Видовая пара): Thể chưa hoàn thành (Несовершенный вид - НСВ) và Thể hoàn thành (Совершенный вид - СВ). Việc chọn sai thể động từ là một trong những lỗi phổ biến nhất của người học tiếng Nga.")
    
    headers_diff = ["Đặc điểm phân biệt", "Thể chưa hoàn thành (НСВ)", "Thể hoàn thành (СВ)"]
    widths_d = [260, 400, 420]
    rows_diff = [
        ["Bản chất hành động", "Quá trình diễn ra, hành động lặp đi lặp lại, sự thật chung.", "Kết quả cụ thể, hành động hoàn tất trọn vẹn, hành động đơn nhất."],
        ["Thì Hiện tại (Настоящее)", "CÓ chia thì hiện tại (я читаю, ты читаешь).", "KHÔNG CÓ thì hiện tại."],
        ["Thì Quá khứ (Прошедшее)", "Diễn tả quá trình đã làm hoặc thói quen trong quá khứ.", "Diễn tả hành động đã hoàn thành và để lại kết quả cụ thể."],
        ["Thì Tương lai (Будущее)", "Tương lai phức: быть + Inf (я буду читать).", "Tương lai đơn: chia trực tiếp (я прочитаю)."],
        ["Từ nhận biết (Keywords)", "каждый день, часто, долго, всегда, обычно, иногда.", "вчера, наконец, вдруг, за 2 часа (trong vòng), сразу."],
        ["Hành động đồng thời", "Diễn tả 2 hành động diễn ra song song cùng lúc.", "Diễn tả chuỗi hành động nối tiếp nhau theo thứ tự."],
    ]
    doc.add_table(headers_diff, rows_diff, widths_d)
    
    doc.add_heading("2. QUY TẮC CẤU TẠO CẶP THỂ ĐỘNG TỪ", level=1)
    headers_form = ["Quy tắc cấu tạo", "Động từ НСВ", "Động từ СВ", "Ý nghĩa & Phân tích"]
    widths_f = [240, 240, 240, 360]
    rows_form = [
        ["1. Thêm tiền tố (Префиксация)", "читать\nписать\nделать\nпить\nучить", "прочитать\nнаписать\nсделать\nвыпить\nвыучить", "Thêm tiền tố (про-, на-, с-, вы-, по-) biến НСВ thành СВ chỉ kết quả."],
        ["2. Thay đổi hậu tố (Суффиксация)", "решать\nобъяснять\nповторять\nпонимать", "решить\nобъяснить\nповторить\nпонять", "Cặp đuôi -ать/-ять (НСВ) đối ứng với -ить (СВ)."],
        ["3. Hậu tố -ыва- / -ива- (НСВ)", "записывать\nспрашивать\nоткрывать", "записать\nспросить\nоткрыть", "Gốc động từ có tiền tố thêm -ыва-/-ива- tạo thể НСВ diễn tả quá trình."],
        ["4. Thay đổi gốc từ (Супплетивизм)", "говорить\nбрать\nкласть\nловить", "сказать\nвзять\nположить\nпоймать", "Hai thể sử dụng hai gốc từ hoàn toàn khác nhau."],
        ["5. Chuyển vị trí trọng âm", "отреза́ть\nрассыпа́ть", "отре́зать\nрассы́пать", "Trọng âm ở đuôi = НСВ; trọng âm ở gốc = СВ."],
    ]
    doc.add_table(headers_form, rows_form, widths_f)
    
    doc.add_heading("3. BẢNG 50 CẶP THỂ ĐỘNG TỪ THƯỜNG GẶP NHẤT TRONG ĐỀ THI TRKI A1-B1", level=1)
    headers_50 = ["STT", "Chưa hoàn thành (НСВ)", "Hoàn thành (СВ)", "Ý nghĩa tiếng Việt"]
    widths_50 = [80, 340, 340, 320]
    pairs_data = [
        ("1", "делать", "сделать", "làm"),
        ("2", "читать", "прочитать", "đọc"),
        ("3", "писать", "написать", "viết"),
        ("4", "учить", "выучить", "học thuộc"),
        ("5", "покупать", "купить", "mua"),
        ("6", "продавать", "продать", "bán"),
        ("7", "брать", "взять", "lấy, cầm"),
        ("8", "давать", "дать", "cho, đưa"),
        ("9", "говорить", "сказать", "nói"),
        ("10", "рассказывать", "рассказать", "kể chuyện"),
        ("11", "отвечать", "ответить", "trả lời"),
        ("12", "спрашивать", "спросить", "hỏi"),
        ("13", "решать", "решить", "giải quyết, quyết định"),
        ("14", "понимать", "понять", "hiểu"),
        ("15", "забывать", "забыть", "quên"),
        ("16", "вспоминать", "вспомнить", "nhớ lại"),
        ("17", "начинать", "начать", "bắt đầu"),
        ("18", "кончать", "кончить", "kết thúc"),
        ("19", "помогать", "помочь", "giúp đỡ"),
        ("20", "открывать", "открыть", "mở"),
        ("21", "закрывать", "закрыть", "đóng"),
        ("22", "встречать", "встретить", "gặp gỡ"),
        ("23", "приглашать", "пригласить", "mời"),
        ("24", "объяснять", "объяснить", "giải thích"),
        ("25", "звонить", "позвонить", "gọi điện thoại"),
    ]
    doc.add_table(headers_50, pairs_data, widths_50)
    
    doc.save(path)

def create_verbs_of_motion_tables():
    path = os.path.join(BASE_DIR, "02_Ngu_Phap_Va_Bang_Tra_Cuu", "Bang_Dong_Tu_Chuyen_Dong_Co_Khong_Tien_To_Motion_Verbs.pdf")
    doc = PDFDocument("BẢNG TRA CỨU ĐỘNG TỪ CHUYỂN ĐỘNG (ГЛАГОЛЫ ДВИЖЕНИЯ)", "Động từ chuyển động có và không có tiền tố trong tiếng Nga từ A1 đến B1", "TRKI A1 - B1 Verbs of Motion Master Guide")
    
    doc.add_heading("1. HỆ THỐNG ĐỘNG TỪ CHUYỂN ĐỘNG KHÔNG CÓ TIỀN TỐ", level=1)
    doc.add_paragraph("Động từ chuyển động không có tiền tố trong tiếng Nga luôn chia thành 2 nhóm mang thể Chưa hoàn thành (НСВ):")
    doc.add_paragraph("• Nhóm 1 chiều (Однонаправленные): Hành động đang diễn ra tại một thời điểm xác định, đi theo một hướng thẳng tới đích.")
    doc.add_paragraph("• Nhóm đa chiều / lặp lại (Неоднонаправленные): Hành động đi lại nhiều lần, khứ hồi (đi rồi về), thói quen, hoặc chuyển động không theo hướng nhất định.")
    
    headers_pairs = ["Phương thức chuyển động", "Một chiều (Một hướng)", "Đa chiều (Khứ hồi / Thói quen)", "Ý nghĩa tiếng Việt"]
    widths_p = [260, 260, 280, 280]
    motion_pairs = [
        ["Đi bộ (пешком)", "идти́ (иду́, идёшь)", "ходи́ть (хожу́, хо́дишь)", "đi bộ"],
        ["Đi bằng phương tiện (на транспорте)", "е́хать (е́ду, е́дешь)", "е́здить (е́зжу, е́здишь)", "đi bằng xe/tàu/máy bay"],
        ["Chạy (бегом)", "бежа́ть (бегу́, бежи́шь, бегу́т)", "бе́гать (бе́гаю, -ешь)", "chạy"],
        ["Bay (по воздуху)", "лете́ть (лечу́, лети́шь)", "лета́ть (лета́ю, -ешь)", "bay"],
        ["Bơi (по воде)", "плыть (плыву́, плывёшь)", "пла́вать (пла́ваю, -ешь)", "bơi / trôi"],
        ["Mang / vác bằng tay", "нести́ (несу́, несёшь)", "носи́ть (ношу́, но́сишь)", "mang, vác, xách"],
        ["Chở bằng phương tiện", "везти́ (везу́, везёшь)", "вози́ть (вожу́, во́зишь)", "chở, vận chuyển"],
        ["Dẫn / dắt người/vật", "вести́ (веду́, ведёшь)", "води́ть (вожу́, во́дишь)", "dẫn dắt, lái xe"],
        ["Bò / trườn", "ползти́ (ползу́, -ёшь)", "по́лзать (по́лзаю, -ешь)", "bò, trườn"],
        ["Leo / trèo", "лезть (ле́зу, ле́зешь)", "ла́зить (ла́жу, ла́зишь)", "leo trèo, chui vào"],
    ]
    doc.add_table(headers_pairs, motion_pairs, widths_p)
    
    doc.add_heading("2. ĐỘNG TỪ CHUYỂN ĐỘNG CÓ TIỀN TỐ (С ПРИСТАВКАМИ)", level=1)
    doc.add_paragraph("Khi ghép tiền tố vào động từ chuyển động:")
    doc.add_paragraph("• Tiền tố + Động từ một chiều (идти, ехать) -> Động từ THỂ HOÀN THÀNH (СВ).")
    doc.add_paragraph("• Tiền tố + Động từ đa chiều (ходить, ездить) -> Động từ THỂ CHƯA HOÀN THÀNH (НСВ).")
    
    headers_pref = ["Tiền tố", "Ý nghĩa hướng đi", "Cặp thể (НСВ / СВ)", "Giới từ đi kèm & Ví dụ"]
    widths_pref = [140, 280, 320, 340]
    prefix_data = [
        ["в- (во-)", "Đi vào bên trong", "входи́ть / войти́\nвъезжа́ть / въе́хать", "в + Acc (войти в комнату - đi vào phòng)"],
        ["вы-", "Đi ra ngoài", "выходи́ть / вы́йти\nвыезжа́ть / вы́ехать", "из / с + Gen (выйти из дома - ra khỏi nhà)"],
        ["при-", "Đến nơi, tới nơi", "приходи́ть / прийти́\nприезжа́ть / прие́хать", "в / на + Acc, к + Dat (приехать в Москву)"],
        ["у-", "Rời đi, đi khỏi hẳn", "уходи́ть / уйти́\nуезжа́ть / уе́хать", "из / с + Gen, в + Acc (уехать из города)"],
        ["под- (подо-)", "Tiến lại gần", "подходи́ть / подойти́\nподъезжа́ть / подъе́хать", "к + Dat (подойти к окну - lại gần cửa sổ)"],
        ["от- (ото-)", "Lùi ra xa, rời xa", "отходи́ть / отойти́\nотъезжа́ть / отъе́хать", "от + Gen (отойти от двери - lùi xa cửa)"],
        ["до-", "Đi đến tận, tới đích", "доходи́ть / дойти́\nдоезжа́ть / дое́хать", "до + Gen (дойти до вокзала - đến tận ga)"],
        ["пере-", "Băng qua, chuyển chỗ", "переходи́ть / перейти́\nпереезжа́ть / перее́хать", "через + Acc (перейти через улицу)"],
        ["про-", "Đi ngang qua / đi qua", "проходи́ть / пройти́\nпроезжа́ть / прое́хать", "мимо + Gen, сквозь + Acc (пройти мимо парка)"],
        ["за-", "Ghé vào, tạt qua / ra sau", "заходи́ть / зайти́\nзаезжа́ть / зае́хать", "в / на + Acc, к + Dat, за + Acc (зайти в аптеку)"],
        ["по-", "Bắt đầu đi (khởi hành)", "пойти́ (chỉ có СВ)\nпое́хать (chỉ có СВ)", "в / на + Acc (поехать на работу - khởi hành đi làm)"],
    ]
    doc.add_table(headers_pref, prefix_data, widths_pref)
    
    doc.save(path)

def create_sample_tests_pdf(level_code, level_name, filename, questions_count=30):
    path = os.path.join(BASE_DIR, "05_De_Thi_Mau_TRKI", filename)
    doc = PDFDocument(f"ТИПОВОЙ ТЕСТ ПО РКИ - УРОВЕНЬ {level_code}", f"Bộ đề thi thử chuẩn Quốc gia Nga theo khung TRKI / TORFL ({level_name})", f"{level_code} ({level_name})")
    
    doc.add_heading("1. CẤU TRÚC BÀI THI CHỨNG CHỈ QUỐC GIA TRKI", level=1)
    doc.add_paragraph("Kỳ thi đánh giá năng lực tiếng Nga như một ngoại ngữ (ТРКИ / TORFL) được tổ chức theo tiêu chuẩn của Bộ Khoa học và Giáo dục Đại học Liên bang Nga. Đề thi gồm 5 bài thi thành phần (субтесты):")
    doc.add_paragraph("1. Субтест 1: Лексика и грамматика (Từ vựng và Ngữ pháp)")
    doc.add_paragraph("2. Субтест 2: Чтение (Đọc hiểu)")
    doc.add_paragraph("3. Субтест 3: Аудирование (Nghe hiểu)")
    doc.add_paragraph("4. Субтест 4: Письмо (Viết)")
    doc.add_paragraph("5. Субтест 5: Говорение (Nói và Giao tiếp trực tiếp)")
    
    doc.add_callout(f"Thời gian làm bài: 50-90 phút cho từng phần. Điểm đạt yêu cầu: Thí sinh phải đạt từ 66% tổng điểm trở lên ở mỗi phần thi để được cấp chứng chỉ TRKI-{level_code}.", f"TIÊU CHUẨN ĐÁNH GIÁ TRKI-{level_code}")
    
    doc.add_heading("2. ĐỀ THI MẪU: СУБТЕСТ 1 - ЛЕКСИКА И ГРАММАТИКА", level=1)
    doc.add_paragraph("Выберите правильный вариант ответа (Hãy chọn phương án đúng nhất):")
    
    headers_q = ["Câu", "Nội dung câu hỏi đề thi (Тестовое задание)", "Phương án A", "Phương án B", "Phương án C"]
    widths_q = [60, 480, 180, 180, 180]
    
    if level_code == "A1":
        sample_q = [
            ["1", "— Где вы вчера были? — Мы были ...", "А. в театр", "Б. в театре", "В. из театра"],
            ["2", "Мой брат учится ...", "А. в университете", "Б. на университет", "В. из университета"],
            ["3", "Анна купила красивую книгу ...", "А. сестру", "Б. сестре", "В. сестрой"],
            ["4", "Вчера я долго ... домашнее задание.", "А. делал", "Б. сделал", "В. сделаю"],
            ["5", "Каждое утро мы ... в парк пешком.", "А. идём", "Б. ходим", "В. пойдём"],
            ["6", "У меня нет ... времени.", "А. свободное", "Б. свободного", "В. свободному"],
            ["7", "— Сколько сейчас ...? — Сейчас два часа.", "А. время", "Б. времени", "В. часах"],
            ["8", "Мы познакомились с новым ...", "А. студентом", "Б. студента", "В. студенту"],
            ["9", "Я хочу ... русский язык в Москве.", "А. учить", "Б. учиться", "В. изучать"],
            ["10", "Позвони мне, пожалуйста, ... завтра.", "А. в", "Б. на", "В. —"],
        ]
    elif level_code == "A2":
        sample_q = [
            ["1", "Вчера мы целый вечер ... о планах на будущее.", "А. говорили", "Б. сказали", "В. поговорили"],
            ["2", "Преподаватель попросил студентов ... текст на странице 25.", "А. читать", "Б. прочитать", "В. прочитали"],
            ["3", "Поезд в Санкт-Петербург ... ровно в 23:00.", "А. отходит", "Б. выходит", "В. заходит"],
            ["4", "Когда я ... из дома, шёл сильный снег.", "А. выходил", "Б. вышел", "В. ушёл"],
            ["5", "Я посоветовал другу ... к врачу.", "А. обращаться", "Б. обратиться", "В. обратился"],
            ["6", "Врач выписал больному рецепт ... лекарства.", "А. для", "Б. на", "В. от"],
            ["7", "Мы живём в доме, ... находится около парка.", "А. который", "Б. которого", "В. которому"],
            ["8", "Благодаря ..., мы вовремя сдали проект.", "А. хорошая погода", "Б. хорошей погоде", "В. хорошую погоду"],
            ["9", "Он не поехал на экскурсию из-за ...", "А. болезни", "Б. болезнь", "В. болезнью"],
            ["10", "Если вы ... свободны в субботу, приходите в гости.", "А. будете", "Б. были", "В. бы"],
        ]
    else: # B1
        sample_q = [
            ["1", "В докладе было отмечено, что развитие науки ... огромное значение для страны.", "А. играет", "Б. имеет", "В. оказывает"],
            ["2", "Результаты эксперимента полностью ... с теоретическими расчётами.", "А. соответствуют", "Б. совпадают", "В. подходят"],
            ["3", "Автор статьи обращает внимание читателей ... проблему экологии.", "А. на", "Б. к", "В. о"],
            ["4", "Несмотря на ..., экспедиция успешно завершила работу.", "А. трудные условия", "Б. трудным условиям", "В. трудные условия"],
            ["5", "Учёный доказал гипотезу, ... ранее подвергалась сомнению.", "А. которая", "Б. которую", "В. которой"],
            ["6", "Для того чтобы ..., необходимо приложить много усилий.", "А. добиться успеха", "Б. добиваться успеха", "В. добились успеха"],
            ["7", "В течение ... в городе проходила международная конференция.", "А. недели", "Б. неделю", "В. неделей"],
            ["8", "Закон вступает в силу с момента его ...", "А. публикации", "Б. публикацию", "В. публикацией"],
            ["9", "По мере ... общества меняются и моральные нормы.", "А. развитие", "Б. развития", "В. развитием"],
            ["10", "С одной стороны, проект выгоден, но с другой стороны, он требует ... средств.", "А. значительные", "Б. значительных", "В. значительным"],
        ]
    doc.add_table(headers_q, sample_q, widths_q)
    
    doc.add_heading("3. ĐÁP ÁN VÀ THANG ĐIỂM CHUẨN (КЛЮЧИ И ШКАЛА ОЦЕНКИ)", level=1)
    if level_code == "A1":
        keys = [("1", "Б"), ("2", "А"), ("3", "Б"), ("4", "А"), ("5", "Б"), ("6", "Б"), ("7", "Б"), ("8", "А"), ("9", "В"), ("10", "В")]
    elif level_code == "A2":
        keys = [("1", "А"), ("2", "Б"), ("3", "А"), ("4", "Б"), ("5", "Б"), ("6", "Б"), ("7", "А"), ("8", "Б"), ("9", "А"), ("10", "А")]
    else:
        keys = [("1", "Б"), ("2", "Б"), ("3", "А"), ("4", "А"), ("5", "А"), ("6", "А"), ("7", "А"), ("8", "А"), ("9", "Б"), ("10", "Б")]
        
    headers_k = ["Câu số", "Đáp án đúng", "Giải thích ngữ pháp trọng điểm"]
    widths_k = [120, 200, 760]
    keys_rows = [[q, ans, f"Giải thích cho câu {q}: Quy tắc biến cách và ngữ nghĩa chuẩn TRKI {level_code}"] for q, ans in keys]
    doc.add_table(headers_k, keys_rows, widths_k)
    
    doc.save(path)

print("Starting generation of comprehensive PDF resources...", flush=True)
create_lexical_minimum_a1()
create_lexical_minimum_a2()
create_lexical_minimum_b1()
create_grammar_aspect_tables()
create_verbs_of_motion_tables()
create_sample_tests_pdf("A1", "Элементарный уровень - ТЭУ", "A1_Tipovoy_Test_RKI_Elementarnyj_Uroven_TEU_De_Thi.pdf")
create_sample_tests_pdf("A2", "Базовый уровень - ТБУ", "A2_Tipovoy_Test_RKI_Bazovyj_Uroven_TBU_De_Thi.pdf")
create_sample_tests_pdf("B1", "Первый сертификационный уровень - ТРКИ-1", "B1_Tipovoy_Test_RKI_Pervyj_Uroven_TRKI_1_De_Thi.pdf")
print("All base curated PDF documents generated successfully!", flush=True)
