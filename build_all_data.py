import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = r"c:\LeDucLuong\HK VII\USSR_Study\WEB_USSR\data"
os.makedirs(DATA_DIR, exist_ok=True)

# 1. CASES_RULES.JSON
cases_data = {
    "cases": [
        {
            "id": 1,
            "name_ru": "Именительный падеж (Падеж 1)",
            "name_vi": "Cách 1 - Danh cách",
            "question": "Кто? Что? (Ai? Cái gì?)",
            "function": "Làm chủ ngữ trong câu, dạng nguyên thể của danh từ trong từ điển.",
            "prepositions": "Không đi kèm giới từ.",
            "endings": {
                "noun_sg": { "masc": "-Ø (phụ âm), -й, -ь", "fem": "-а, -я, -ь", "neut": "-о, -е, -мя" },
                "noun_pl": { "masc": "-ы, -и, -а", "fem": "-ы, -и", "neut": "-а, -я" },
                "adj_sg": { "masc": "-ый, -ий, -ой", "fem": "-ая, -яя", "neut": "-ое, -ее" },
                "adj_pl": "-ые, -ие"
            },
            "sample_words": [
                { "nom": "студент", "gen": "студента", "dat": "студенту", "acc": "студента", "inst": "студентом", "prep": "студенте" },
                { "nom": "книга", "gen": "книги", "dat": "книге", "acc": "книгу", "inst": "книгой", "prep": "книге" },
                { "nom": "окно", "gen": "окна", "dat": "окну", "acc": "окно", "inst": "окном", "prep": "окне" }
            ],
            "examples": [
                { "ru": "Студе́нт чита́ет кни́гу.", "vi": "Sinh viên đang đọc sách." },
                { "ru": "Это краси́вый го́род.", "vi": "Đây là một thành phố đẹp." }
            ]
        },
        {
            "id": 2,
            "name_ru": "Родительный падеж (Падеж 2)",
            "name_vi": "Cách 2 - Sinh cách",
            "question": "Кого? Чего? Откуда? Чей? (Của ai? Không có cái gì? Từ đâu?)",
            "function": "Chỉ sự sở hữu (nhà của bố), sự vắng mặt/không có (нет...), số lượng (2,3,4 + sg; 5-20 + pl), điểm xuất phát.",
            "prepositions": "из, с, от, до, у, без, для, около, после, кроме, вместо, из-за.",
            "endings": {
                "noun_sg": { "masc": "-а (sau phụ âm), -я (sau -й, -ь)", "fem": "-ы (sau -а), -и (sau -я, -ь, к/г/х/ж/ш/ч/щ)", "neut": "-а (sau -о), -я (sau -е)" },
                "noun_pl": { "masc": "-ов (sau phụ âm cứng), -ей (sau -ь, ж/ш/ч/щ), -ев (sau -й)", "fem": "-Ø (bỏ -a), -ей (sau -ь), -ь (sau -я)", "neut": "-Ø (bỏ -о), -ей, -ий" },
                "adj_sg": { "masc": "-ого, -его", "fem": "-ой, -ей", "neut": "-ого, -его" },
                "adj_pl": "-ых, -их"
            },
            "examples": [
                { "ru": "У меня́ нет свобо́дного вре́мени.", "vi": "Tôi không có thời gian rảnh." },
                { "ru": "Я прие́хал из Вьетна́ма.", "vi": "Tôi đến từ Việt Nam." },
                { "ru": "Уро́к начина́ется по́сле обе́да.", "vi": "Tiết học bắt đầu sau bữa trưa." }
            ]
        },
        {
            "id": 3,
            "name_ru": "Дательный падеж (Падеж 3)",
            "name_vi": "Cách 3 - Dữ cách",
            "question": "Кому? Чему? Куда? (Cho ai? Đến đâu?)",
            "function": "Chỉ đối tượng gián tiếp nhận hành động (tặng quà cho ai, gọi điện cho ai), chỉ tuổi tác (Мне 20 лет), trạng thái tâm lý/sức khỏe (Мне холодно, мне нужно).",
            "prepositions": "к / ко (đến gặp ai), по (đi dọc theo, qua môn học, theo quy định), благодаря (nhờ có).",
            "endings": {
                "noun_sg": { "masc": "-у (sau phụ âm), -ю (sau -й, -ь)", "fem": "-е (sau -а, -я), -и (sau -ь, -ия)", "neut": "-у (sau -о), -ю (sau -е)" },
                "noun_pl": { "masc": "-ам, -ям", "fem": "-ам, -ям", "neut": "-ам, -ям" },
                "adj_sg": { "masc": "-ому, -ему", "fem": "-ой, -ей", "neut": "-ому, -ему" },
                "adj_pl": "-ым, -им"
            },
            "examples": [
                { "ru": "Я звоню́ своему́ дру́гу.", "vi": "Tôi đang gọi điện thoại cho bạn tôi." },
                { "ru": "Мне о́чень нра́вится э́та кни́га.", "vi": "Tôi rất thích cuốn sách này." },
                { "ru": "Мы идём в го́сти к ба́бушке.", "vi": "Chúng tôi đến nhà bà chơi." }
            ]
        },
        {
            "id": 4,
            "name_ru": "Винительный падеж (Падеж 4)",
            "name_vi": "Cách 4 - Đối cách",
            "question": "Кого? Что? Куда? (Thấy ai? Cái gì? Đi đâu?)",
            "function": "Chỉ bổ ngữ trực tiếp của ngoại động từ (đọc sách, xem phim), hướng chuyển động đích đến (в/на + Acc). Phân biệt bất động vật (giữ nguyên) và động vật (biến đổi giống Cách 2).",
            "prepositions": "в, на (chỉ hướng đi đến: Куда? в Москву), через (băng qua), за (ủng hộ/trong vòng).",
            "endings": {
                "noun_sg": {
                    "masc": "Bất động vật: như Cách 1 (-Ø); Động vật: như Cách 2 (-а, -я)",
                    "fem": "-у (thay cho -а), -ю (thay cho -я), -ь (giữ nguyên)",
                    "neut": "Như Cách 1 (-о, -е)"
                },
                "noun_pl": { "inanimate": "Như Cách 1 số nhiều", "animate": "Như Cách 2 số nhiều (-ов, -ей, -Ø)" },
                "adj_sg": {
                    "masc": "Inanimate: -ый, -ий; Animate: -ого, -его",
                    "fem": "-ую, -юю",
                    "neut": "-ое, -ее"
                },
                "adj_pl": { "inanimate": "-ые, -ие", "animate": "-ых, -их" }
            },
            "examples": [
                { "ru": "Студе́нт чита́ет интере́сную кни́гу.", "vi": "Sinh viên đang đọc một cuốn sách hay." },
                { "ru": "Мы е́дем в краси́вый го́род.", "vi": "Chúng tôi đi đến một thành phố đẹp." },
                { "ru": "Я встре́тил ста́рого дру́га.", "vi": "Tôi đã gặp lại một người bạn cũ." }
            ]
        },
        {
            "id": 5,
            "name_ru": "Творительный падеж (Падеж 5)",
            "name_vi": "Cách 5 - Tạo cách / Công cụ cách",
            "question": "Кем? Чем? С кем? С чем? Где? (Cùng với ai? Bằng công cụ gì?)",
            "function": "Chỉ phương tiện/công cụ thực hiện hành động (viết bằng bút), cùng với ai (с + Inst), nghề nghiệp sau động từ быть, стать, работать, vị trí không gian (под, над, за, перед, между).",
            "prepositions": "с / со (cùng với), под (dưới), над (trên), за (sau/đằng sau), перед (trước), между (giữa).",
            "endings": {
                "noun_sg": { "masc": "-ом (sau phụ âm), -ем/-ём (sau -й, -ь, ж/ш/ч/щ/ц)", "fem": "-ой (sau -а), -ей (sau -я, ж/ш/ч/щ/ц), -ью (sau -ь)", "neut": "-ом, -ем" },
                "noun_pl": { "masc": "-ами, -ями", "fem": "-ами, -ями", "neut": "-ами, -ями" },
                "adj_sg": { "masc": "-ым, -им", "fem": "-ой, -ей", "neut": "-ым, -им" },
                "adj_pl": "-ыми, -ими"
            },
            "examples": [
                { "ru": "Я пишу́ письмо́ си́ней ру́чкой.", "vi": "Tôi viết thư bằng một cây bút màu xanh." },
                { "ru": "Анто́н гуля́ет в па́рке со свое́й подру́гой.", "vi": "Anton đi dạo trong công viên cùng bạn gái." },
                { "ru": "Мой брат хо́чет стать врачо́м.", "vi": "Anh trai tôi muốn trở thành bác sĩ." }
            ]
        },
        {
            "id": 6,
            "name_ru": "Предложный падеж (Падеж 6)",
            "name_vi": "Cách 6 - Giới cách",
            "question": "О ком? О чём? Где? (Nói về ai? Về cái gì? Ở đâu?)",
            "function": "Luôn luôn đi kèm giới từ! Dùng để chỉ địa điểm/vị trí (Где? в/на), đối tượng suy nghĩ, trò chuyện (О ком? О чём?), phương tiện đi lại (на автобусе).",
            "prepositions": "о / об / обо (về ai/cái gì), в / во (ở trong), на (ở trên/tại).",
            "endings": {
                "noun_sg": { "masc": "-е (đa số), -и (nếu tận cùng -ий), -у́ (sau в/на: в лесу, на полу, в саду, в аэропорту)", "fem": "-е (đa số), -и (nếu tận cùng -ия, -ь: в России, в тетради)", "neut": "-е (sau -о, -е), -и (nếu tận cùng -ие: в общежитии)" },
                "noun_pl": { "masc": "-ах, -ях", "fem": "-ах, -ях", "neut": "-ах, -ях" },
                "adj_sg": { "masc": "-ом, -ем", "fem": "-ой, -ей", "neut": "-ом, -ем" },
                "adj_pl": "-ых, -их"
            },
            "examples": [
                { "ru": "Мы у́чимся в Моско́вском университе́те.", "vi": "Chúng tôi học tập tại Đại học Tổng hợp Moscow." },
                { "ru": "Студе́нты говоря́т о но́вом фи́льме.", "vi": "Các sinh viên đang nói về bộ phim mới." },
                { "ru": "Я е́ду на рабо́ту на авто́бусе.", "vi": "Tôi đi làm bằng xe buýt." }
            ]
        }
    ],
    "pronouns_declension": [
        { "base": "Я (Tôi)", "nom": "я", "gen": "меня", "dat": "мне", "acc": "меня", "inst": "мной / мною", "prep": "обо мне" },
        { "base": "Ты (Bạn)", "nom": "ты", "gen": "тебя", "dat": "тебе", "acc": "тебя", "inst": "тобой / тобою", "prep": "о тебе" },
        { "base": "Он (Anh ấy)", "nom": "он", "gen": "его (него)", "dat": "ему (нему)", "acc": "его (него)", "inst": "им (ним)", "prep": "о нём" },
        { "base": "Она (Cô ấy)", "nom": "она", "gen": "её (неё)", "dat": "ей (ней)", "acc": "её (неё)", "inst": "ей (ней)", "prep": "о ней" },
        { "base": "Оно (Nó)", "nom": "оно", "gen": "его (него)", "dat": "ему (нему)", "acc": "его (него)", "inst": "им (ним)", "prep": "о нём" },
        { "base": "Мы (Chúng tôi)", "nom": "мы", "gen": "нас", "dat": "нам", "acc": "нас", "inst": "нами", "prep": "о нас" },
        { "base": "Вы (Các bạn)", "nom": "вы", "gen": "вас", "dat": "вам", "acc": "вас", "inst": "вами", "prep": "о вас" },
        { "base": "Они (Họ)", "nom": "они", "gen": "их (них)", "dat": "им (ним)", "acc": "их (них)", "inst": "ими (ними)", "prep": "о них" }
    ],
    "interactive_words": [
        { "word": "студент", "gender": "он", "meaning": "nam sinh viên", "forms": { "sg": ["студент", "студента", "студенту", "студента", "студентом", "студенте"], "pl": ["студенты", "студентов", "студентам", "студентов", "студентами", "студентах"] } },
        { "word": "книга", "gender": "она", "meaning": "quyển sách", "forms": { "sg": ["книга", "книги", "книге", "книгу", "книгой", "книге"], "pl": ["книги", "книг", "книгам", "книги", "книгами", "книгах"] } },
        { "word": "окно", "gender": "оно", "meaning": "cửa sổ", "forms": { "sg": ["окно", "окна", "окну", "окно", "окном", "окне"], "pl": ["окна", "окон", "окнам", "окна", "окнами", "окнах"] } },
        { "word": "друг", "gender": "он", "meaning": "bạn", "forms": { "sg": ["друг", "друга", "другу", "друга", "другом", "друге"], "pl": ["друзья", "друзей", "друзьям", "друзей", "друзьями", "друзьях"] } },
        { "word": "Москва", "gender": "она", "meaning": "thủ đô Moscow", "forms": { "sg": ["Москва", "Москвы", "Москве", "Москву", "Москвой", "Москве"], "pl": ["-", "-", "-", "-", "-", "-"] } },
        { "word": "Россия", "gender": "она", "meaning": "nước Nga", "forms": { "sg": ["Россия", "России", "России", "Россию", "Россией", "России"], "pl": ["-", "-", "-", "-", "-", "-"] } },
        { "word": "тетрадь", "gender": "она", "meaning": "vở viết", "forms": { "sg": ["тетрадь", "тетради", "тетради", "тетрадь", "тетрадью", "тетради"], "pl": ["тетради", "тетрадей", "тетрадям", "тетради", "тетрадями", "тетрадях"] } },
        { "word": "преподаватель", "gender": "он", "meaning": "giảng viên", "forms": { "sg": ["преподаватель", "преподавателя", "преподавателю", "преподавателя", "преподавателем", "преподавателе"], "pl": ["преподаватели", "преподавателей", "преподавателям", "преподавателей", "преподавателями", "преподавателях"] } }
    ]
}

with open(os.path.join(DATA_DIR, "cases_rules.json"), "w", encoding="utf-8") as f:
    json.dump(cases_data, f, ensure_ascii=False, indent=2)

# 2. VERBS_ASPECTS.JSON
verbs_data = {
    "aspect_rules": {
        "title": "Quy tắc cốt lõi về Thể động từ tiếng Nga (Виды глаголов)",
        "nsv_meaning": "Thể chưa hoàn thành (НСВ): Diễn tả quá trình kéo dài, thói quen lặp lại (часто, каждый день, обычно), hành động song song, hoặc chỉ đơn thuần nêu tên sự việc mà không nhấn mạnh kết quả.",
        "sv_meaning": "Thể hoàn thành (СВ): Diễn tả hành động đạt kết quả trọn vẹn (сделать, прочитать), hành động đơn lẻ trong một khoảnh khắc (вдруг, наконец), hoặc chuỗi hành động nối tiếp nhau theo thứ tự."
    },
    "aspect_pairs": [
        { "id": 1, "nsv": "делать", "sv": "сделать", "meaning": "làm", "governance": "что (Acc)", "example": "Вчера я долго делал (quá trình) домашнее задание и наконец сделал (kết quả) его." },
        { "id": 2, "nsv": "читать", "sv": "прочитать", "meaning": "đọc", "governance": "что (Acc)", "example": "Каждый день я читаю газету. Вчера я прочитал интересную статью." },
        { "id": 3, "nsv": "писать", "sv": "написать", "meaning": "viết", "governance": "что (Acc) кому (Dat)", "example": "Студент пишет письмо родителям уже два часа." },
        { "id": 4, "nsv": "учить", "sv": "выучить", "meaning": "học thuộc", "governance": "что (Acc)", "example": "Я целый вечер учил слова и выучил их." },
        { "id": 5, "nsv": "покупать", "sv": "купить", "meaning": "mua", "governance": "что (Acc) кому (Dat)", "example": "Мы часто покупаем фрукты здесь. Сегодня я купил яблоки." },
        { "id": 6, "nsv": "решать", "sv": "решить", "meaning": "giải / quyết định", "governance": "что (Acc) / inf", "example": "Мы долго решали эту проблему и наконец решили её." },
        { "id": 7, "nsv": "помогать", "sv": "помочь", "meaning": "giúp đỡ", "governance": "кому (Dat)", "example": "Друг всегда помогает мне, когда мне трудно." },
        { "id": 8, "nsv": "объяснять", "sv": "объяснить", "meaning": "giải thích", "governance": "кому что", "example": "Преподаватель объяснил новое грамматическое правило." },
        { "id": 9, "nsv": "открывать", "sv": "открыть", "meaning": "mở", "governance": "что (Acc)", "example": "Откройте, пожалуйста, окно." },
        { "id": 10, "nsv": "закрывать", "sv": "закрыть", "meaning": "đóng", "governance": "что (Acc)", "example": "Магазин закрылся в 9 часов вечера." },
        { "id": 11, "nsv": "начинать", "sv": "начать", "meaning": "bắt đầu", "governance": "что (Acc) / inf", "example": "Урок начался ровно в девять часов." },
        { "id": 12, "nsv": "кончать", "sv": "кончить", "meaning": "kết thúc", "governance": "что (Acc)", "example": "Мы закончили работу вовремя." },
        { "id": 13, "nsv": "говорить", "sv": "сказать", "meaning": "nói / bảo", "governance": "что / кому (Dat)", "example": "Он сказал правду." },
        { "id": 14, "nsv": "брать", "sv": "взять", "meaning": "lấy / cầm", "governance": "что (Acc)", "example": "Возьмите эту книгу с собой." },
        { "id": 15, "nsv": "встречать", "sv": "встретить", "meaning": "gặp gỡ", "governance": "кого (Acc)", "example": "Я встретил друга на вокзале." }
    ],
    "motion_verbs": [
        { "type": "Đi bộ (пешком)", "unidirectional": "идти (иду, идёшь)", "multidirectional": "ходить (хожу, ходишь)", "meaning": "đi bộ" },
        { "type": "Đi bằng xe (на транспорте)", "unidirectional": "ехать (еду, едешь)", "multidirectional": "ездить (езжу, ездишь)", "meaning": "đi bằng xe/tàu/máy bay" },
        { "type": "Chạy (бегом)", "unidirectional": "бежать (бегу, бежишь, бегут)", "multidirectional": "бегать (бегаю, бегаешь)", "meaning": "chạy" },
        { "type": "Bay (по воздуху)", "unidirectional": "лететь (лечу, летишь)", "multidirectional": "летать (летаю, летаешь)", "meaning": "bay" },
        { "type": "Bơi (по воде)", "unidirectional": "плыть (плыву, плывёшь)", "multidirectional": "плавать (плаваю, плаваешь)", "meaning": "bơi / trôi" },
        { "type": "Mang / vác (в руках)", "unidirectional": "нести (несу, несёшь)", "multidirectional": "носить (ношу, носишь)", "meaning": "mang, xách" },
        { "type": "Chở (на транспорте)", "unidirectional": "везти (везу, везёшь)", "multidirectional": "возить (вожу, возишь)", "meaning": "chở, vận chuyển" },
        { "type": "Dẫn dắt (вести)", "unidirectional": "вести (веду, ведёшь)", "multidirectional": "водить (вожу, водишь)", "meaning": "dẫn đường, lái xe" }
    ],
    "prefixes": [
        { "prefix": "в- (во-)", "meaning": "Đi vào bên trong", "example": "войти в комнату (bước vào phòng)" },
        { "prefix": "вы-", "meaning": "Đi ra bên ngoài", "example": "выйти из здания (bước ra khỏi tòa nhà)" },
        { "prefix": "при-", "meaning": "Đến nơi / tới nơi", "example": "приехать в Москву (đến Moscow)" },
        { "prefix": "у-", "meaning": "Rời đi / đi hẳn", "example": "уйти с работы (rời khỏi chỗ làm)" },
        { "prefix": "под- (подо-)", "meaning": "Tiến lại gần", "example": "подойти к окну (tiến lại gần cửa sổ)" },
        { "prefix": "от- (ото-)", "meaning": "Lùi ra xa / rời xa", "example": "отойти от двери (lùi xa cửa)" },
        { "prefix": "до-", "meaning": "Đi đến tận / tới đích", "example": "дойти до вокзала (đi đến tận nhà ga)" },
        { "prefix": "пере-", "meaning": "Băng qua / chuyển chỗ", "example": "перейти через улицу (sang đường)" },
        { "prefix": "про-", "meaning": "Đi ngang qua", "example": "пройти мимо парка (đi ngang qua công viên)" },
        { "prefix": "за-", "meaning": "Ghé vào / tạt qua", "example": "зайти в аптеку (tạt vào hiệu thuốc)" },
        { "prefix": "по-", "meaning": "Bắt đầu đi (khởi hành)", "example": "поехать на экскурсию (khởi hành đi tham quan)" }
    ]
}

with open(os.path.join(DATA_DIR, "verbs_aspects.json"), "w", encoding="utf-8") as f:
    json.dump(verbs_data, f, ensure_ascii=False, indent=2)

# 3. TRKI_MOCK_TESTS.JSON
mock_tests_data = {
    "levels": [
        {
            "level": "A1",
            "title": "Типовой тест по РКИ: Элементарный уровень (ТЭУ / A1)",
            "time_minutes": 45,
            "pass_score": 66,
            "questions": [
                {
                    "id": 101,
                    "section": "Лексика и грамматика",
                    "question": "— Где вы вчера были?\n— Мы были ...",
                    "options": ["А. в театр", "Б. в театре", "В. из театра"],
                    "correct": 1,
                    "explanation": "Sau giới từ 'в' chỉ vị trí ở đâu (Где?) dùng Cách 6 (Предложный падеж): в театре."
                },
                {
                    "id": 102,
                    "section": "Лексика и грамматика",
                    "question": "Мой ста́рший брат у́чится ...",
                    "options": ["А. в университете", "Б. на университет", "В. из университета"],
                    "correct": 0,
                    "explanation": "Động từ 'учиться' đi với nơi chốn dùng giới từ 'в' + Cách 6: в университете."
                },
                {
                    "id": 103,
                    "section": "Лексика и грамматика",
                    "question": "А́нна купи́ла краси́вый пода́рок ...",
                    "options": ["А. сестру", "Б. сестре", "В. сестрой"],
                    "correct": 1,
                    "explanation": "Mua quà tặng cho ai (Кому?) dùng Cách 3 (Дательный падеж): сестре."
                },
                {
                    "id": 104,
                    "section": "Лексика и грамматика",
                    "question": "Вчера́ весь ве́чер я ... дома́шнее зада́ние.",
                    "options": ["А. делал", "Б. сделал", "В. сделаю"],
                    "correct": 0,
                    "explanation": "Có trạng từ chỉ quá trình kéo dài 'весь вечер' (cả buổi tối) nên dùng động từ thể Chưa hoàn thành (НСВ) thì quá khứ: делал."
                },
                {
                    "id": 105,
                    "section": "Лексика và грамматика",
                    "question": "Ка́ждое у́тро мы ... в парк пешко́м.",
                    "options": ["А. идём", "Б. ходим", "В. пойдём"],
                    "correct": 1,
                    "explanation": "Hành động lặp đi lặp lại 'каждое утро' (mỗi buổi sáng) đi bộ đa chiều dùng 'ходить': ходим."
                },
                {
                    "id": 106,
                    "section": "Лексика и грамматика",
                    "question": "У меня́ сего́дня нет ... вре́мени.",
                    "options": ["А. свободное", "Б. свободного", "В. свободному"],
                    "correct": 1,
                    "explanation": "Cấu trúc phủ định 'нет' đi với Cách 2 (Родительный падеж): нет свободного времени."
                },
                {
                    "id": 107,
                    "section": "Лексика и грамматика",
                    "question": "— Скажи́те, ско́лько сейча́с ...?\n— Сейча́с два часа́.",
                    "options": ["А. время", "Б. времени", "В. часах"],
                    "correct": 1,
                    "explanation": "Cụm từ hỏi giờ chuẩn trong tiếng Nga: Сколько сейчас времени?"
                },
                {
                    "id": 108,
                    "section": "Лексика и грамматика",
                    "question": "Вчера́ мы познако́мились с но́вым ...",
                    "options": ["А. студентом", "Б. студента", "В. студенту"],
                    "correct": 0,
                    "explanation": "Động từ 'познакомиться с кем' đi với giới từ 'с' + Cách 5 (Творительный падеж): с новым студентом."
                },
                {
                    "id": 109,
                    "section": "Чтение (Đọc hiểu)",
                    "question": "Текст: «Меня зовут Антон. Я приехал из Вьетнама в Москву два месяца назад. Сейчас я учусь на подготовительном факультете МГУ и изучаю русский язык.»\n\nВопрос: Где учится Антон?",
                    "options": ["А. Во Вьетнаме", "Б. В Санкт-Петербурге", "В. В МГУ в Москве"],
                    "correct": 2,
                    "explanation": "Trong đoạn văn nêu rõ: 'Сейчас я учусь на подготовительном факультете МГУ [в Москве]'."
                },
                {
                    "id": 110,
                    "section": "Чтение (Đọc hiểu)",
                    "question": "Текст: «В субботу утром Антон ходит в библиотеку, а вечером он любит гулять на Красной площади со своими друзьями.»\n\nВопрос: Что Антон делает в субботу вечером?",
                    "options": ["А. Читает книги в библиотеке", "Б. Гуляет на Красной площади", "В. Готовит обед дома"],
                    "correct": 1,
                    "explanation": "Trong bài viết: 'вечером он любит гулять на Красной площади'."
                }
            ]
        },
        {
            "level": "A2",
            "title": "Типовой тест по РКИ: Базовый уровень (ТБУ / A2)",
            "time_minutes": 50,
            "pass_score": 66,
            "questions": [
                {
                    "id": 201,
                    "section": "Лексика и грамматика",
                    "question": "Преподава́тель попроси́л студе́нтов ... но́вый текст до конца́.",
                    "options": ["А. читать", "Б. прочитать", "В. читали"],
                    "correct": 1,
                    "explanation": "Yêu cầu hoàn thành trọn vẹn văn bản 'до конца' (đến hết) dùng thể Hoàn thành (СВ): прочитать."
                },
                {
                    "id": 202,
                    "section": "Лексика и грамматика",
                    "question": "Ско́рый по́езд в Санкт-Петербу́рг ... ро́вно в 23:00.",
                    "options": ["А. отходит", "Б. выходит", "В. заходит"],
                    "correct": 0,
                    "explanation": "Tàu hỏa rời ga khởi hành dùng động từ 'отходить': отходит."
                },
                {
                    "id": 203,
                    "section": "Лексика и грамматика",
                    "question": "Когда́ я ... из до́ма на у́лицу, уже́ стемне́ло.",
                    "options": ["А. выходил", "Б. вышел", "В. ушёл"],
                    "correct": 1,
                    "explanation": "Hành động hoàn thành một lần đi ra khỏi nhà dùng thể Hoàn thành 'выйти': вышел."
                },
                {
                    "id": 204,
                    "section": "Лексика и грамматика",
                    "question": "Благодаря́ ..., мы смогли́ защити́ть прое́кт во́время.",
                    "options": ["А. хорошая погода", "Б. хорошей погоде", "В. хорошую погоду"],
                    "correct": 1,
                    "explanation": "Giới từ 'благодаря' (nhờ có) luôn đi với Cách 3 (Дательный падеж): хорошей погоде."
                },
                {
                    "id": 205,
                    "section": "Лексика и грамматика",
                    "question": "Мы живём в но́вом до́ме, ... стои́т о́коло па́рка.",
                    "options": ["А. который", "Б. которого", "В. которому"],
                    "correct": 0,
                    "explanation": "Đại từ quan hệ 'который' làm chủ ngữ cho mệnh đề phụ 'стоит около парка' nên ở Cách 1 giống đực."
                }
            ]
        },
        {
            "level": "B1",
            "title": "Типовой тест по РКИ: Первый сертификационный уровень (ТРКИ-1 / B1)",
            "time_minutes": 60,
            "pass_score": 66,
            "questions": [
                {
                    "id": 301,
                    "section": "Лексика и грамматика",
                    "question": "В докла́де бы́ло отмет́ено, что разви́тие нау́ки ... огро́мное значе́ние для эконо́мики страны́.",
                    "options": ["А. играет", "Б. имеет", "В. оказывает"],
                    "correct": 1,
                    "explanation": "Cụm từ kết hợp cố định trong tiếng Nga: 'иметь значение' (có ý nghĩa/tầm quan trọng). Chú ý: 'играть роль' (đóng vai trò)."
                },
                {
                    "id": 302,
                    "section": "Лексика и грамматика",
                    "question": "Полу́ченные результа́ты экспериме́нта по́лностью ... с теорети́ческими расчётами.",
                    "options": ["А. соответствуют", "Б. совпадают", "В. подходят"],
                    "correct": 1,
                    "explanation": "'Совпадать с чем' (trùng khớp/hoàn toàn khớp với cái gì) đi với giới từ 'с' + Cách 5."
                },
                {
                    "id": 303,
                    "section": "Лексика и грамматика",
                    "question": "А́втор статьи́ обраща́ет внима́ние чита́телей ... актуа́льную пробле́му эколо́гии.",
                    "options": ["А. на", "Б. к", "В. о"],
                    "correct": 0,
                    "explanation": "Cấu trúc quản cách: 'обращать / обратить внимание на кого / на что' (hướng sự chú ý vào ai/cái gì)."
                },
                {
                    "id": 304,
                    "section": "Лексика и грамматика",
                    "question": "Несмотря́ на ..., нау́чная экспеди́ция успе́шно заверши́ла свою́ рабо́ту.",
                    "options": ["А. трудные условия", "Б. трудным условиям", "В. трудных условий"],
                    "correct": 0,
                    "explanation": "Cụm giới từ nhượng bộ 'несмотря на' đi với Cách 4 (Винительный падеж): трудные условия (inanimate pl)."
                },
                {
                    "id": 305,
                    "section": "Лексика и грамматика",
                    "question": "Для того́ что́бы ..., студе́нту ну́жно регуля́рно занима́ться.",
                    "options": ["А. добиться успеха", "Б. добиваться успеха", "В. добились успеха"],
                    "correct": 0,
                    "explanation": "Cấu trúc mục đích 'для того чтобы' chỉ kết quả mong muốn dùng động từ thể Hoàn thành nguyên thể (Inf СВ): добиться успеха."
                }
            ]
        }
    ]
}

with open(os.path.join(DATA_DIR, "trki_mock_tests.json"), "w", encoding="utf-8") as f:
    json.dump(mock_tests_data, f, ensure_ascii=False, indent=2)

print("All 3 additional data JSON files created successfully!", flush=True)
