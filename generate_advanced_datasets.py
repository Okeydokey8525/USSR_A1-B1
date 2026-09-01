import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = r"c:\LeDucLuong\HK VII\USSR_Study\WEB_USSR\data"
os.makedirs(DATA_DIR, exist_ok=True)

# ==============================================================================
# 1. RUSSIAN ALPHABET & PHONETICS DATA (russian_alphabet.json)
# ==============================================================================
alphabet_payload = {
  "letters": [
    { "letter": "А а", "name": "а", "type": "vowel", "sound_vi": "a", "example_ru": "а́дрес", "example_vi": "địa chỉ", "example_phonetic": "[a-dres]", "cursive": "Nét cong tròn mềm mại như chữ a La-tinh" },
    { "letter": "Б б", "name": "бэ", "type": "consonant_voiced", "pair": "П", "sound_vi": "b (bờ)", "example_ru": "брат", "example_vi": "anh/em trai", "example_phonetic": "[brat]", "cursive": "Nét cong dưới và gạch ngang trên đầu" },
    { "letter": "В в", "name": "вэ", "type": "consonant_voiced", "pair": "Ф", "sound_vi": "v (vờ)", "example_ru": "вода́", "example_vi": "nước", "example_phonetic": "[va-da]", "cursive": "Tương tự chữ B La-tinh viết thường" },
    { "letter": "Г г", "name": "гэ", "type": "consonant_voiced", "pair": "К", "sound_vi": "g (gờ)", "example_ru": "го́род", "example_vi": "thành phố", "example_phonetic": "[go-rat]", "cursive": "Nét móc cong nhẹ trên đầu" },
    { "letter": "Д д", "name": "дэ", "type": "consonant_voiced", "pair": "Т", "sound_vi": "d (đờ)", "example_ru": "дом", "example_vi": "ngôi nhà", "example_phonetic": "[dom]", "cursive": "Viết giống chữ g hoặc d La-tinh viết hoa" },
    { "letter": "Е е", "name": "е", "type": "vowel_iotated", "sound_vi": "ye / e mềm", "example_ru": "еда́", "example_vi": "thức ăn", "example_phonetic": "[ye-da]", "cursive": "Viết như chữ e La-tinh" },
    { "letter": "Ё ё", "name": "ё", "type": "vowel_iotated", "sound_vi": "yo (luôn có trọng âm)", "example_ru": "ёлка", "example_vi": "cây thông", "example_phonetic": "[yol-ka]", "cursive": "Chữ e có 2 dấu chấm phía trên" },
    { "letter": "Ж ж", "name": "жэ", "type": "consonant_voiced_hard", "pair": "Ш", "sound_vi": "zh (gi/d uốn lưỡi sâu - luôn cứng)", "example_ru": "журна́л", "example_vi": "tạp chí", "example_phonetic": "[zhur-nal]", "cursive": "Hình con bướm 6 cánh" },
    { "letter": "З з", "name": "зэ", "type": "consonant_voiced", "pair": "С", "sound_vi": "z (dờ rung răng)", "example_ru": "зима́", "example_vi": "mùa đông", "example_phonetic": "[zi-ma]", "cursive": "Viết giống số 3" },
    { "letter": "И и", "name": "и", "type": "vowel", "sound_vi": "i", "example_ru": "и́мя", "example_vi": "tên", "example_phonetic": "[i-mya]", "cursive": "Viết như chữ u La-tinh" },
    { "letter": "Й й", "name": "и краткое", "type": "semivowel", "sound_vi": "y ngắn", "example_ru": "мой", "example_vi": "của tôi", "example_phonetic": "[moy]", "cursive": "Chữ u có dấu móc lưỡi liềm trên đầu" },
    { "letter": "К к", "name": "ка", "type": "consonant_voiceless", "pair": "Г", "sound_vi": "k (cờ/ca)", "example_ru": "кни́га", "example_vi": "quyển sách", "example_phonetic": "[kni-ga]", "cursive": "Viết như chữ k La-tinh" },
    { "letter": "Л л", "name": "эль", "type": "consonant_voiced", "sound_vi": "l (lờ)", "example_ru": "луна́", "example_vi": "mặt trăng", "example_phonetic": "[lu-na]", "cursive": "Nét móc cong giống chữ л mềm" },
    { "letter": "М м", "name": "эм", "type": "consonant_voiced", "sound_vi": "m (mờ)", "example_ru": "ма́ма", "example_vi": "mẹ", "example_phonetic": "[ma-ma]", "cursive": "Viết như chữ m La-tinh" },
    { "letter": "Н н", "name": "эн", "type": "consonant_voiced", "sound_vi": "n (nờ)", "example_ru": "нос", "example_vi": "mũi", "example_phonetic": "[nos]", "cursive": "Viết chữ H La-tinh nhưng nối mềm" },
    { "letter": "О о", "name": "о", "type": "vowel", "sound_vi": "o (có trọng âm) / [a] (không trọng âm)", "example_ru": "окно́", "example_vi": "cửa sổ", "example_phonetic": "[ak-no]", "cursive": "Viết như chữ o La-tinh" },
    { "letter": "П п", "name": "пэ", "type": "consonant_voiceless", "pair": "Б", "sound_vi": "p (pờ)", "example_ru": "па́па", "example_vi": "bố/ba", "example_phonetic": "[pa-pa]", "cursive": "Viết như chữ n La-tinh" },
    { "letter": "Р р", "name": "эр", "type": "consonant_voiced", "sound_vi": "r (rờ rung đầu lưỡi)", "example_ru": "ру́чка", "example_vi": "cây bút", "example_phonetic": "[ruch-ka]", "cursive": "Viết như chữ p La-tinh kéo đuôi dài" },
    { "letter": "С с", "name": "эс", "type": "consonant_voiceless", "pair": "З", "sound_vi": "s (sờ nhẹ)", "example_ru": "стол", "example_vi": "cái bàn", "example_phonetic": "[stol]", "cursive": "Viết như chữ c La-tinh" },
    { "letter": "Т т", "name": "тэ", "type": "consonant_voiceless", "pair": "Д", "sound_vi": "t (tờ)", "example_ru": "тетра́дь", "example_vi": "vở ghi bài", "example_phonetic": "[tye-trat]", "cursive": "Viết như chữ m La-tinh nhỏ 3 nét" },
    { "letter": "У у", "name": "у", "type": "vowel", "sound_vi": "u", "example_ru": "у́тро", "example_vi": "buổi sáng", "example_phonetic": "[u-tra]", "cursive": "Viết như chữ y La-tinh kéo đuôi móc" },
    { "letter": "Ф ф", "name": "эф", "type": "consonant_voiceless", "pair": "В", "sound_vi": "f (phờ)", "example_ru": "фото", "example_vi": "bức ảnh", "example_phonetic": "[fo-ta]", "cursive": "Một trục dọc ở giữa và 2 bầu cong 2 bên" },
    { "letter": "Х х", "name": "ха", "type": "consonant_voiceless", "sound_vi": "kh (khờ sâu trong họng)", "example_ru": "хлеб", "example_vi": "bánh mì", "example_phonetic": "[khlyep]", "cursive": "Viết như chữ x La-tinh" },
    { "letter": "Ц ц", "name": "цэ", "type": "consonant_voiceless_hard", "sound_vi": "ts (t-sờ bật mạnh - luôn cứng)", "example_ru": "центр", "example_vi": "trung tâm", "example_phonetic": "[tsentr]", "cursive": "Viết như chữ u có móc nhỏ dưới góc phải" },
    { "letter": "Ч ч", "name": "че", "type": "consonant_voiceless_soft", "sound_vi": "ch (chờ nhẹ - luôn mềm)", "example_ru": "чай", "example_vi": "trà", "example_phonetic": "[chay]", "cursive": "Viết giống số 4 lật ngược" },
    { "letter": "Ш ш", "name": "ша", "type": "consonant_voiceless_hard", "pair": "Ж", "sound_vi": "sh (sờ nặng uốn lưỡi - luôn cứng)", "example_ru": "шко́ла", "example_vi": "trường học", "example_phonetic": "[shko-la]", "cursive": "Chữ w lật ngược hoặc chữ u 3 nét" },
    { "letter": "Щ щ", "name": "ща", "type": "consonant_voiceless_soft", "sound_vi": "shch (sờ kéo dài mềm - luôn mềm)", "example_ru": "борщ", "example_vi": "súp củ dền Nga", "example_phonetic": "[borshch]", "cursive": "Chữ ш có thêm đuôi móc nhỏ bên phải" },
    { "letter": "Ъ ъ", "name": "твёрдый знак", "type": "sign", "sound_vi": "Dấu cứng (tách âm, ngăn cách)", "example_ru": "объе́кт", "example_vi": "đối tượng", "example_phonetic": "[ab-yekt]", "cursive": "Chữ ь có nét gạch ngang trên đầu" },
    { "letter": "Ы ы", "name": "ы", "type": "vowel", "sound_vi": "ư (ư sâu từ cuống họng)", "example_ru": "сыр", "example_vi": "phô mai", "example_phonetic": "[syr]", "cursive": "Một nét tròn dưới nối với gạch thẳng" },
    { "letter": "Ь ь", "name": "мягкий знак", "type": "sign", "sound_vi": "Dấu mềm (làm mềm phụ âm trước)", "example_ru": "день", "example_vi": "ngày", "example_phonetic": "[dyen]", "cursive": "Viết như chữ b nhỏ không đuôi" },
    { "letter": "Э э", "name": "э оборотное", "type": "vowel", "sound_vi": "e (e mở/e cứng)", "example_ru": "э́то", "example_vi": "đây là / cái này", "example_phonetic": "[e-ta]", "cursive": "Chữ c ngược có gạch ngang giữa" },
    { "letter": "Ю ю", "name": "ю", "type": "vowel_iotated", "sound_vi": "yu (du)", "example_ru": "юг", "example_vi": "phía nam", "example_phonetic": "[yuk]", "cursive": "Gạch thẳng nối nét tròn" },
    { "letter": "Я я", "name": "я", "type": "vowel_iotated", "sound_vi": "ya (da)", "example_ru": "я́блоко", "example_vi": "quả táo", "example_phonetic": "[yab-la-ka]", "cursive": "Chữ R La-tinh viết ngược" }
  ],
  "syllables_ladder": [
    { "base": "М", "items": ["ма", "мо", "му", "ми", "мэ"], "phonetics": ["[ma]", "[mo/ma]", "[mu]", "[mi]", "[me]"], "words": ["ма́ма (mẹ)", "мир (hòa bình)", "музыка (âm nhạc)"] },
    { "base": "Б", "items": ["ба", "бо", "бу", "би", "бэ"], "phonetics": ["[ba]", "[bo/ba]", "[bu]", "[bi]", "[be]"], "words": ["брат (anh em)", "ба́бушка (bà)", "биле́т (vé)"] },
    { "base": "Д", "items": ["да", "до", "ду", "ди", "дэ"], "phonetics": ["[da]", "[do/da]", "[du]", "[di]", "[de]"], "words": ["дом (nhà)", "да (vâng)", "друг (bạn)"] },
    { "base": "Т", "items": ["та", "то", "ту", "ти", "тэ"], "phonetics": ["[ta]", "[to/ta]", "[tu]", "[ti]", "[te]"], "words": ["тетра́дь (vở)", "там (ở đằng kia)", "ты (bạn)"] },
    { "base": "К", "items": ["ка", "ко", "ку", "ки", "кэ"], "phonetics": ["[ka]", "[ko/ka]", "[ku]", "[ki]", "[ke]"], "words": ["кни́га (sách)", "кот (con mèo)", "кафе́ (quán cà phê)"] },
    { "base": "С", "items": ["са", "со", "су", "си", "сэ"], "phonetics": ["[sa]", "[so/sa]", "[su]", "[si]", "[se]"], "words": ["стол (cái bàn)", "сыр (phô mai)", "студе́нт (sinh viên)"] },
    { "base": "Р", "items": ["ра", "ро", "ру", "ри", "рэ"], "phonetics": ["[ra]", "[ro/ra]", "[ru]", "[ri]", "[re]"], "words": ["ру́чка (bút)", "ры́ба (cá)", "Росси́я (nước Nga)"] },
    { "base": "Л", "items": ["ла", "ло", "лу", "ли", "лэ"], "phonetics": ["[la]", "[lo/la]", "[lu]", "[li]", "[le]"], "words": ["луна́ (mặt trăng)", "ле́то (mùa hè)", "лимо́н (chanh)"] },
    { "base": "Ш / Ж", "items": ["ша", "шо", "шу", "ши", "жа", "жо", "жу", "жи"], "phonetics": ["[sha]", "[sho]", "[shu]", "[shy]", "[zha]", "[zho]", "[zhu]", "[zhy]"], "words": ["шко́ла (trường học)", "журна́л (tạp chí)"] }
  ],
  "phonetic_rules": [
    {
      "id": "rule_o_reduction",
      "title": "1. Xu hướng giảm âm của chữ 'О' (Редукция О)",
      "description": "Khi chữ 'О' KHÔNG mang trọng âm, nó thường có xu hướng giảm âm và phát âm thành âm [а] nhẹ. Mức độ giảm âm phụ thuộc vào vị trí âm tiết đứng trước hay sau trọng âm.",
      "examples": [
        { "word": "молоко́", "pronunciation": "[ма-ла-ко́]", "meaning": "sữa (chữ 'o' cuối mang trọng âm, 2 chữ 'o' đầu giảm âm)" },
        { "word": "хорошо́", "pronunciation": "[ха-ра-шо́]", "meaning": "tốt / được" },
        { "word": "соба́ка", "pronunciation": "[са-ба́-ка]", "meaning": "con chó" },
        { "word": "окно́", "pronunciation": "[ак-но́]", "meaning": "cửa sổ" }
      ]
    },
    {
      "id": "rule_e_ya_reduction",
      "title": "2. Xu hướng giảm âm của chữ 'Е' và 'Я' (Редукция Е / Я)",
      "description": "Khi chữ 'Е' và 'Я' đứng ở vị trí KHÔNG có trọng âm (đặc biệt đứng trước âm tiết mang trọng âm), chúng bị giảm âm và phát âm gần như âm [и] mềm nhẹ.",
      "examples": [
        { "word": "язы́к", "pronunciation": "[и-зы́к]", "meaning": "ngôn ngữ / cái lưỡi" },
        { "word": "метро́", "pronunciation": "[мь-тро́]", "meaning": "tàu điện ngầm" },
        { "word": "сестра́", "pronunciation": "[си-стра́]", "meaning": "chị / em gái" },
        { "word": "часы́", "pronunciation": "[чи-сы́]", "meaning": "đồng hồ / giờ giấc" }
      ]
    },
    {
      "id": "rule_devoicing",
      "title": "3. Vô thanh hóa phụ âm cuối từ (Оглушение согласных)",
      "description": "Các phụ âm hữu thanh (б, в, г, д, ж, з) khi đứng ở vị trí kết thúc từ sẽ bị vô thanh hóa thành các âm tương ứng (п, ф, к, т, ш, с).",
      "examples": [
        { "word": "хлеб", "pronunciation": "[хлеп]", "meaning": "bánh mì (chữ 'б' cuối đọc thành [п])" },
        { "word": "друг", "pronunciation": "[друк]", "meaning": "người bạn (chữ 'г' cuối đọc thành [к])" },
        { "word": "город", "pronunciation": "[го́-рат]", "meaning": "thành phố (chữ 'д' cuối đọc thành [т])" },
        { "word": "нож", "pronunciation": "[нош]", "meaning": "con dao (chữ 'ж' cuối đọc thành [ш])" }
      ]
    },
    {
      "id": "rule_assimilation",
      "title": "4. Quy tắc đồng hóa phụ âm (Уподобление согласных)",
      "description": "Phụ âm hữu thanh đứng trước phụ âm vô thanh bị vô thanh hóa; ngược lại phụ âm vô thanh đứng trước phụ âm hữu thanh bị hữu thanh hóa (rung âm).",
      "examples": [
        { "word": "авто́бус", "pronunciation": "[аф-то́-бус]", "meaning": "xe buýt ('в' đứng trước 'т' đọc thành [ф])" },
        { "word": "вокза́л", "pronunciation": "[ваг-за́л]", "meaning": "nhà ga ('к' đứng trước 'з' đọc thành [г])" },
        { "word": "футбо́л", "pronunciation": "[фуд-бо́л]", "meaning": "bóng đá ('т' đứng trước 'б' đọc thành [д])" },
        { "word": "ло́жка", "pronunciation": "[ло́ш-ка]", "meaning": "cái thìa ('ж' đứng trước 'к' đọc thành [ш])" }
      ]
    }
  ],
  "recognition_quiz": [
    { "id": "rq1", "type": "sound_to_letter", "audio": "М", "prompt": "Bạn nghe thấy âm thanh nào? Hãy chọn chữ cái tương ứng:", "options": ["М", "Н", "Л", "П"], "correct": 0 },
    { "id": "rq2", "type": "letter_to_sound", "letter": "Ж", "prompt": "Chữ cái 'Ж' phát âm như thế nào?", "options": ["[zh] (d/gi uốn lưỡi sâu)", "[z] (dờ rung răng)", "[sh] (sờ nặng)", "[ch] (chờ nhẹ)"], "correct": 0 },
    { "id": "rq3", "type": "stress_id", "word": "молоко", "prompt": "Từ 'молоко' (sữa) có trọng âm rơi vào âm tiết thứ mấy?", "options": ["Âm tiết 1 (мо́-ло-ко)", "Âm tiết 2 (мо-ло́-ко)", "Âm tiết 3 (мо-ло-ко́)"], "correct": 2 }
  ]
}

with open(os.path.join(DATA_DIR, "russian_alphabet.json"), "w", encoding="utf-8") as f:
    json.dump(alphabet_payload, f, ensure_ascii=False, indent=2)

# ==============================================================================
# 2. READING LAB DATA (reading_data.json)
# ==============================================================================
reading_payload = {
  "texts": [
    {
      "id": "read_a1_01",
      "level": "A1",
      "category": "Biển báo & Thông báo ngắn",
      "title": "Объявление на вокзале (Thông báo tại nhà ga)",
      "content_ru": "Внимание! Скорый поезд номер 752 «Сапсан» Москва — Санкт-Петербург отправляется в 13 часов 30 минут с третьего пути. Нумерация вагонов начинается с головы поезда. Пожалуйста, сохраняйте ваши билеты до конца поездки.",
      "content_vi": "Chú ý! Tàu cao tốc số 752 «Sapsan» tuyến Moscow — Saint Petersburg sẽ khởi hành lúc 13 giờ 30 phút từ đường ray số 3. Thứ tự toa tàu bắt đầu từ đầu đoàn tàu. Xin quý khách vui lòng giữ vé cho đến hết chuyến đi.",
      "audio_text": "Внимание! Скорый поезд номер 752 Сапсан Москва — Санкт-Петербург отправляется в 13 часов 30 минут с третьего пути. Пожалуйста, сохраняйте ваши билеты.",
      "vocab_highlights": [
        { "word": "отправляется", "meaning": "khởi hành" },
        { "word": "путь", "meaning": "đường ray / lối đi" },
        { "word": "билет", "meaning": "vé" }
      ],
      "questions": [
        {
          "q": "Куда идёт поезд «Сапсан»?",
          "options": ["В Москву", "В Санкт-Петербург", "Во Владивосток"],
          "correct": 1,
          "why": "Trong thông báo nêu rõ tuyến đường: «Москва — Санкт-Петербург» (Điểm đến là St. Petersburg)."
        },
        {
          "q": "С какого пути отправляется поезд?",
          "options": ["С первого пути", "Со второго пути", "С третьего пути"],
          "correct": 2,
          "why": "Thông báo ghi rõ: «с третьего пути» (từ đường ray số 3)."
        }
      ]
    },
    {
      "id": "read_a1_02",
      "level": "A1",
      "category": "Tin nhắn SMS & Đời thường",
      "title": "SMS-сообщение другу (Tin nhắn gửi cho bạn bè)",
      "content_ru": "Привет, Антон! Сегодня в 18:00 мы с Анной идём в новое студенческое кафе около университета. Там очень вкусные блины и недорогой кофе. Ты свободен сегодня вечером? Пойдём с нами!",
      "content_vi": "Chào Anton! Tối nay lúc 18:00 mình với Anna sẽ đi quán cà phê sinh viên mới mở gần trường đại học. Ở đó có bánh blini rất ngon và cà phê giá rẻ. Tối nay cậu có rảnh không? Đi cùng bọn mình nhé!",
      "audio_text": "Привет, Антон! Сегодня в 18:00 мы с Анной идём в новое студенческое кафе около университета. Пойдём с нами!",
      "vocab_highlights": [
        { "word": "студенческое кафе", "meaning": "quán cà phê sinh viên" },
        { "word": "недорогой", "meaning": "giá cả phải chăng / rẻ" },
        { "word": "свободен", "meaning": "rảnh rỗi" }
      ],
      "questions": [
        {
          "q": "Где находится кафе?",
          "options": ["На Красной площади", "Около университета", "На вокзале"],
          "correct": 1,
          "why": "Đoạn tin nhắn nói rõ: «кафе около университета»."
        }
      ]
    },
    {
      "id": "read_a2_01",
      "level": "A2",
      "category": "Email & Thư điện tử",
      "title": "Электронное письмо преподавателю (Email gửi giảng viên)",
      "content_ru": "Уважаемый Виктор Николаевич!\n\nПишет вам студент 1-го курса факультета международных отношений Чан Ван Луонг. К сожалению, я заболел и не смогу присутствовать на сегодняшней лекции по истории России. Я прикрепил домашнее задание к этому письму.\n\nС уважением,\nЛуонг.",
      "content_vi": "Kính gửi thầy Viktor Nikolaevich!\n\nEm là Trần Văn Lương, sinh viên năm 1 khoa Quan hệ Quốc tế. Thật không may em bị ốm nên không thể tham dự buổi giảng môn Lịch sử Nga hôm nay. Em đã đính kèm bài tập về nhà trong thư này ạ.\n\nTrân trọng,\nLương.",
      "audio_text": "Уважаемый Виктор Николаевич! Пишет вам студент Чан Ван Луонг. К сожалению, я заболел и не смогу присутствовать на лекции.",
      "vocab_highlights": [
        { "word": "уважаемый", "meaning": "kính gửi / kính trọng" },
        { "word": "присутствовать", "meaning": "có mặt / tham dự" },
        { "word": "прикрепить", "meaning": "đính kèm" }
      ],
      "questions": [
        {
          "q": "Почему студент не может прийти на лекцию?",
          "options": ["Он уехал домой", "Он заболел", "Он забыл о лекции"],
          "correct": 1,
          "why": "Lý do trong thư ghi: «К сожалению, я заболел»."
        }
      ]
    },
    {
      "id": "read_b1_01",
      "level": "B1",
      "category": "Bài báo khoa học & Xã hội",
      "title": "Роль искусственного интеллекта в современном образовании",
      "content_ru": "В последние годы цифровые технологии и искусственный интеллект оказывают глубокое влияние на методику преподавания иностранных языков. Интерактивные платформы позволяют учащимся осваивать материал в индивидуальном темпе, получая мгновенную обратную связь. Однако эксперты подчёркивают, что технологии не заменяют живого общения с преподавателем, а служат эффективным дополнением к традиционным занятиям.",
      "content_vi": "Trong những năm gần đây, công nghệ số và trí tuệ nhân tạo đang tạo ra ảnh hưởng sâu sắc tới phương pháp giảng dạy ngoại ngữ. Các nền tảng tương tác cho phép người học tiếp thu tài liệu theo tiến độ cá nhân hóa, nhận phản hồi ngay lập tức. Tuy nhiên, các chuyên gia nhấn mạnh rằng công nghệ không thay thế giao tiếp trực tiếp với giảng viên mà đóng vai trò là sự bổ trợ hiệu quả cho các tiết học truyền thống.",
      "audio_text": "В последние годы цифровые технологии и искусственный интеллект оказывают глубокое влияние на методику преподавания иностранных языков.",
      "vocab_highlights": [
        { "word": "оказывать влияние", "meaning": "tạo ra ảnh hưởng" },
        { "word": "обратная связь", "meaning": "phản hồi" },
        { "word": "дополнение", "meaning": "sự bổ trợ / phần bổ sung" }
      ],
      "questions": [
        {
          "q": "Какова главная мысль автора статьи?",
          "options": ["Технологии полностью заменят преподавателей", "Технологии служат эффективным дополнением к обучению", "Искусственный интеллект бесполезен в образовании"],
          "correct": 1,
          "why": "Bài viết kết luận: «технологии не заменяют живого общения, а служат эффективным дополнением»."
        }
      ]
    }
  ]
}

with open(os.path.join(DATA_DIR, "reading_data.json"), "w", encoding="utf-8") as f:
    json.dump(reading_payload, f, ensure_ascii=False, indent=2)

# ==============================================================================
# 3. WRITING STUDIO DATA (writing_data.json)
# ==============================================================================
writing_payload = {
  "tasks": [
    {
      "id": "write_a1_01",
      "level": "A1",
      "title": "Đề 1: Viết bưu thiếp / Tin nhắn làm quen (Короткое сообщение)",
      "prompt": "Hãy viết một đoạn tin nhắn ngắn (30-50 từ) giới thiệu bản thân bạn cho một người bạn Nga mới quen: Tên bạn, tuổi, bạn đến từ đâu, bạn đang học gì ở đâu và sở thích của bạn.",
      "min_words": 30,
      "max_words": 60,
      "redemittel": [
        "Привет! Меня зовут... (Chào! Tên tôi là...)",
        "Я приехал из Вьетнама. (Tôi đến từ Việt Nam.)",
        "Сейчас я живу в Москве и изучаю русский язык в МГУ. (Hiện tôi sống ở Moscow và học tiếng Nga tại MSU.)",
        "В свободное время я люблю читать книги и слушать музыку. (Lúc rảnh tôi thích đọc sách và nghe nhạc.)",
        "А как твои дела? Напиши мне! (Còn bạn thế nào? Viết lại cho mình nhé!)"
      ],
      "checklist": [
        "Đã có lời chào mở đầu (Привет / Здравствуйте)",
        "Đã nêu rõ tên và quốc tịch (Меня зовут... / Я из...)",
        "Đã chia đúng thì hiện tại của động từ (живу, учусь, люблю)",
        "Đã có câu kết thúc tin nhắn"
      ],
      "model_answer": "Привет, Иван! Меня зовут Луонг. Мне 20 лет, я приехал из Вьетнама. Сейчас я живу в Москве и учусь в университете. Я очень люблю русскую литературу и спорт. Напиши мне, когда будешь свободен!"
    },
    {
      "id": "write_a2_01",
      "level": "A2",
      "title": "Đề 2: Viết email đặt phòng khách sạn (Бронирование отеля)",
      "prompt": "Bạn có kế hoạch đi du lịch Saint Petersburg vào cuối tuần. Hãy viết một email trang trọng (50-80 từ) gửi cho khách sạn để đặt phòng: Số lượng người, ngày đến, ngày đi, yêu cầu về phòng (wifi, ăn sáng) và hỏi phương thức thanh toán.",
      "min_words": 50,
      "max_words": 90,
      "redemittel": [
        "Здравствуйте, уважаемая администрация отеля! (Kính chào ban quản lý khách sạn!)",
        "Я хочу забронировать одноместный номер... (Tôi muốn đặt một phòng đơn...)",
        "Мы планируем приехать 15-го октября... (Chúng tôi dự định đến ngày 15/10...)",
        "Скажите, пожалуйста, включён ли завтрак в стоимость? (Làm ơn cho biết bữa sáng đã bao gồm trong giá chưa?)",
        "С уважением, ... (Trân trọng, ...)"
      ],
      "checklist": [
        "Lời chào trang trọng (Здравствуйте / Уважаемый...)",
        "Nêu rõ ngày đến và thời gian lưu trú (с ... по ...)",
        "Sử dụng đúng Cách 2 cho ngày tháng (пятнадцатого октября)",
        "Lời cảm ơn và kết thư trang trọng (С уважением)"
      ],
      "model_answer": "Здравствуйте, уважаемая администрация отеля «Северная Пальмира»!\n\nЯ хочу забронировать стандартный одноместный номер на три ночи, с 20 по 23 ноября. Подскажите, пожалуйста, есть ли в номере бесплатный Wi-Fi и включён ли завтрак в стоимость проживания? Как можно оплатить бронь: картой или при заселении?\n\nЗаранее спасибо за ответ.\nС уважением, Луонг."
    },
    {
      "id": "write_b1_01",
      "level": "B1",
      "title": "Đề 3: Viết đoạn văn nghị luận bày tỏ quan điểm (Выражение мнения)",
      "prompt": "Chủ đề: «Nên tự học ngoại ngữ trực tuyến hay đến trung tâm lớp học truyền thống?». Hãy viết một bài luận ngắn (100-150 từ) trình bày quan điểm của bạn, phân tích ưu nhược điểm và đưa ra kết luận.",
      "min_words": 100,
      "max_words": 170,
      "redemittel": [
        "По моему мнению / На мой взгляд... (Theo quan điểm của tôi...)",
        "С одной стороны..., но с другой стороны... (Một mặt..., nhưng mặt khác...)",
        "Главное преимущество онлайн-обучения заключается в том, что... (Ưu điểm chính là...)",
        "Исходя из вышесказанного, можно сделать вывод... (Từ những điều trên, có thể rút ra kết luận...)"
      ],
      "checklist": [
        "Mở bài nêu rõ vấn đề và lập trường cá nhân",
        "Thân bài có luận cứ xác đáng và liên từ học thuật (однако, кроме того)",
        "Sử dụng đúng thể động từ và quản cách",
        "Kết luận tổng kết ngắn gọn"
      ],
      "model_answer": "В современном мире вопрос выбора формата обучения иностранным языкам становится всё более актуальным. По моему мнению, как онлайн-обучение, так и традиционные занятия имеют свои неоспоримые достоинства.\n\nС одной стороны, онлайн-платформы позволяют экономить время и учиться в удобном темпе. С другой стороны, аудиторные занятия обеспечивают живое общение с преподавателем и одногруппниками, что крайне важно для развития разговорных навыков.\n\nТаким образом, я считаю, что наилучших результатов можно добиться при разумном сочетании самостоятельной работы в интернете и практики в аудитории."
    }
  ]
}

with open(os.path.join(DATA_DIR, "writing_data.json"), "w", encoding="utf-8") as f:
    json.dump(writing_payload, f, ensure_ascii=False, indent=2)

# ==============================================================================
# 4. SPEAKING STUDIO DATA (speaking_data.json)
# ==============================================================================
speaking_payload = {
  "topics": [
    {
      "id": "speak_01",
      "level": "A1",
      "title": "1. Рассказ о себе (Tự giới thiệu bản thân)",
      "guide_vi": "Nói trong vòng 1-2 phút giới thiệu tên, tuổi, quê quán, nghề nghiệp hiện tại và sở thích.",
      "target_phrases": [
        "Меня зовут... (Tên tôi là...)",
        "Я родился и вырос во Вьетнаме. (Tôi sinh ra và lớn lên ở Việt Nam.)",
        "По профессии я... / Сейчас я студент... (Nghề nghiệp của tôi là... / Hiện tôi là sinh viên...)",
        "В свободное время я увлекаюсь спортом. (Lúc rảnh tôi đam mê thể thao.)"
      ],
      "sample_speech": "Здравствуйте! Меня зовут Луонг. Мне двадцать лет. Я приехал из Вьетнама. Сейчас я живу в Москве и изучаю русский язык в университете. Я люблю читать книги и играть в футбол.",
      "evaluation_criteria": [
        "Phát âm rõ ràng các âm [р], [ш], [щ]",
        "Nhấn đúng trọng âm trong từ (молоко́, студе́нт)",
        "Giảm âm chính xác của chữ О thành [а] khi không có trọng âm"
      ]
    },
    {
      "id": "speak_02",
      "level": "A1",
      "title": "2. Моя семья (Gia đình của tôi)",
      "guide_vi": "Mô tả về gia đình: Có bao nhiêu người, bố mẹ làm nghề gì, anh chị em học ở đâu.",
      "target_phrases": [
        "У меня большая и дружная семья. (Tôi có gia đình lớn và hòa thuận.)",
        "Мой папа работает инженером. (Bố tôi làm kỹ sư.)",
        "Моя мама — учительница в школе. (Mẹ tôi là giáo viên trường học.)",
        "Мы любим проводить выходные вместе. (Chúng tôi thích dành ngày cuối tuần bên nhau.)"
      ],
      "sample_speech": "Моя семья состоит из четырёх человек: папа, мама, младшая сестра и я. Мой папа работает инженером, а мама — врачом. Моя сестра учится в школе. Мы очень дружная семья.",
      "evaluation_criteria": [
        "Dùng đúng Cách 5 chỉ nghề nghiệp (работает инженером, врачом)",
        "Dùng đúng đại từ sở hữu (мой папа, моя мама)"
      ]
    },
    {
      "id": "speak_03",
      "level": "A1",
      "title": "3. Мой рабочий день (Một ngày làm việc & học tập)",
      "guide_vi": "Kể lại lịch trình hàng ngày: Thức dậy lúc mấy giờ, ăn sáng, đi học, học bài và đi ngủ.",
      "target_phrases": [
        "Я обычно встаю в семь часов утра. (Tôi thường dậy lúc 7 giờ sáng.)",
        "После завтрака я еду на учёбу на метро. (Sau bữa sáng tôi đi học bằng metro.)",
        "Вечером я делаю домашнее задание. (Buổi tối tôi làm bài tập về nhà.)",
        "Я ложусь спать в одиннадцать вечера. (Tôi đi ngủ lúc 11 giờ đêm.)"
      ],
      "sample_speech": "Каждый день я встаю в семь часов. Утром я завтракаю и еду в университет. Занятия начинаются в девять утра. Вечером я гуляю с друзьями, делаю уроки и ложусь спать в одиннадцать часов.",
      "evaluation_criteria": [
        "Chia đúng động từ phản thân (встаю, ложусь)",
        "Dùng đúng từ chỉ thời gian (утром, днём, вечером)"
      ]
    }
  ]
}

with open(os.path.join(DATA_DIR, "speaking_data.json"), "w", encoding="utf-8") as f:
    json.dump(speaking_payload, f, ensure_ascii=False, indent=2)

# ==============================================================================
# 5. SURVIVAL RUSSIAN (survival_data.json)
# ==============================================================================
survival_payload = {
  "scenarios": [
    {
      "id": "surv_shop",
      "icon": "🛒",
      "title": "В магазине и супермаркете (Mua sắm)",
      "phrases": [
        { "ru": "Сколько это стоит?", "vi": "Cái này giá bao nhiêu?", "phonetic": "[skol-ka e-ta sto-it]" },
        { "ru": "Взвесьте, пожалуйста, один килограмм яблок.", "vi": "Làm ơn cân cho tôi 1 kg táo.", "phonetic": "[vzves-tye pa-zha-luy-sta a-din ki-la-gram yab-lak]" },
        { "ru": "Можно оплатить картой?", "vi": "Có thể thanh toán bằng thẻ không?", "phonetic": "[mozh-na ap-la-tit kar-tay]" },
        { "ru": "Пакет нужен?", "vi": "Bạn có cần túi ni-lông không?", "phonetic": "[pa-kyet nu-zhen]" },
        { "ru": "Спасибо, пакет не нужен.", "vi": "Cảm ơn, tôi không cần túi.", "phonetic": "[spa-si-ba pa-kyet nye nu-zhen]" }
      ]
    },
    {
      "id": "surv_metro",
      "icon": "🚇",
      "title": "В метро и на транспорте (Tàu điện ngầm & Xe buýt)",
      "phrases": [
        { "ru": "Где находится ближайшая станция метро?", "vi": "Trạm tàu điện ngầm gần nhất ở đâu?", "phonetic": "[gdye na-kho-dit-sya bli-zhay-sha-ya stan-tsi-ya myet-ro]" },
        { "ru": "Как доехать до Красной площади?", "vi": "Làm sao để đi đến Quảng trường Đỏ?", "phonetic": "[kak da-ye-khat da kras-nay plo-shcha-di]" },
        { "ru": "Осторожно, двери закрываются!", "vi": "Chú ý, cửa đang đóng lại!", "phonetic": "[as-ta-rozh-na dvye-ri zak-ry-va-yut-sya]" },
        { "ru": "Следующая станция — «Театральная».", "vi": "Ga tiếp theo là ga Teatralnaya.", "phonetic": "[slye-du-yu-shcha-ya stan-tsi-ya tye-at-ral-na-ya]" },
        { "ru": "Вы сейчас выходите?", "vi": "Bác/bạn có xuống ở ga này không?", "phonetic": "[vy sey-chas vy-kho-di-tye]" }
      ]
    },
    {
      "id": "surv_pharmacy",
      "icon": "💊",
      "title": "В аптеке и у врача (Hiệu thuốc & Khám bệnh)",
      "phrases": [
        { "ru": "У вас есть лекарство от головной боли?", "vi": "Ở đây có thuốc đau đầu không?", "phonetic": "[u vas yest lye-kar-stva at ga-lav-noy bo-li]" },
        { "ru": "У меня высокая температура и кашель.", "vi": "Tôi bị sốt cao và ho.", "phonetic": "[u me-nya vy-so-ka-ya tyem-pye-ra-tu-ra i ka-shel]" },
        { "ru": "Как принимать эти таблетки?", "vi": "Thuốc viên này uống như thế nào?", "phonetic": "[kak pri-ni-mat e-ti tab-lyet-ki]" },
        { "ru": "Принимайте по одной таблетке два раза в день.", "vi": "Uống mỗi lần 1 viên, ngày 2 lần.", "phonetic": "[pri-ni-may-tye pa ad-noy tab-lyet-kye dva ra-za v dyen]" }
      ]
    },
    {
      "id": "surv_restaurant",
      "icon": "🍽️",
      "title": "В ресторане и кафе (Nhà hàng & Quán ăn)",
      "phrases": [
        { "ru": "Дайте, пожалуйста, меню.", "vi": "Làm ơn cho tôi xem thực đơn.", "phonetic": "[day-tye pa-zha-luy-sta me-nyu]" },
        { "ru": "Что вы посоветуете?", "vi": "Bạn có gợi ý món nào ngon không?", "phonetic": "[shto vy pa-sa-vye-tu-ye-tye]" },
        { "ru": "Принесите, пожалуйста, счёт.", "vi": "Làm ơn mang hóa đơn tính tiền.", "phonetic": "[pri-nye-si-tye pa-zha-luy-sta shchot]" },
        { "ru": "Всё было очень вкусно, спасибо!", "vi": "Mọi thứ đều rất ngon, cảm ơn!", "phonetic": "[vsyo by-la o-chen vkus-na spa-si-ba]" }
      ]
    },
    {
      "id": "surv_emergency",
      "icon": "🚨",
      "title": "Срочная помощь и полиция (Khẩn cấp)",
      "phrases": [
        { "ru": "Помогите, пожалуйста!", "vi": "Làm ơn cứu tôi với / giúp tôi với!", "phonetic": "[pa-ma-gi-tye pa-zha-luy-sta]" },
        { "ru": "Вызовите скорую помощь! (112)", "vi": "Hãy gọi xe cấp cứu giúp tôi! (112)", "phonetic": "[vy-za-vi-tye sko-ru-yu po-moshch]" },
        { "ru": "Я потерял паспорт и кошелёк.", "vi": "Tôi bị mất hộ chiếu và ví tiền.", "phonetic": "[ya pa-tye-ryal pas-part i ka-she-lyok]" },
        { "ru": "Где находится посольство Вьетнама?", "vi": "Đại sứ quán Việt Nam ở đâu?", "phonetic": "[gdye na-kho-dit-sya pa-sol-stva vyet-na-ma]" }
      ]
    }
  ]
}

with open(os.path.join(DATA_DIR, "survival_data.json"), "w", encoding="utf-8") as f:
    json.dump(survival_payload, f, ensure_ascii=False, indent=2)

# ==============================================================================
# 6. DIAGNOSTIC PLACEMENT TEST DATA (placement_questions.json)
# ==============================================================================
placement_payload = {
  "skills": ["Alphabet & Phonetics", "Vocabulary", "Grammar & Cases", "Reading Comprehension", "Listening"],
  "questions": [
    {
      "id": "pl_01",
      "skill": "Alphabet & Phonetics",
      "level": "Pre-A1",
      "question": "Trong từ «молоко́» (sữa), chữ 'o' nào được phát âm rõ là [o]?",
      "options": ["Chữ 'o' thứ nhất", "Chữ 'o' thứ hai", "Chữ 'o' thứ ba mang trọng âm"],
      "correct": 2,
      "weight": 1
    },
    {
      "id": "pl_02",
      "skill": "Vocabulary",
      "level": "A1.1",
      "question": "Từ nào sau đây là danh từ giống cái (женский род)?",
      "options": ["дом", "книга", "окно", "студент"],
      "correct": 1,
      "weight": 1
    },
    {
      "id": "pl_03",
      "skill": "Grammar & Cases",
      "level": "A1.2",
      "question": "Điền dạng đúng: «Я вижу красивую ... (девушка).»",
      "options": ["девушка", "девушку", "девушке", "девушкой"],
      "correct": 1,
      "weight": 2
    },
    {
      "id": "pl_04",
      "skill": "Grammar & Cases",
      "level": "A1.2",
      "question": "Điền dạng đúng: «Мы живём в ... (Россия).»",
      "options": ["России", "Россию", "Россией", "Россия"],
      "correct": 0,
      "weight": 2
    },
    {
      "id": "pl_05",
      "skill": "Grammar & Cases",
      "level": "A2.1",
      "question": "Chọn thể động từ phù hợp: «Вчера я весь вечер ... (читать / прочитать) роман.»",
      "options": ["читал (НСВ)", "прочитал (СВ)", "прочитаю"],
      "correct": 0,
      "weight": 2
    },
    {
      "id": "pl_06",
      "skill": "Grammar & Cases",
      "level": "A2.2",
      "question": "Chọn động từ chuyển động: «Каждое лето мы ... (ехать / ездить) на море.»",
      "options": ["едем (một chiều)", "ездим (đa chiều / lặp lại)", "поехали"],
      "correct": 1,
      "weight": 2
    },
    {
      "id": "pl_07",
      "skill": "Reading Comprehension",
      "level": "A2.2",
      "question": "Đọc câu: «Поезд прибывает на станцию в 15:45.» Tàu đến ga lúc mấy giờ?",
      "options": ["15 giờ 15 phút", "15 giờ 45 phút", "16 giờ 45 phút"],
      "correct": 1,
      "weight": 2
    },
    {
      "id": "pl_08",
      "skill": "Grammar & Cases",
      "level": "B1.1",
      "question": "Điền liên từ học thuật: «... трудных условий, студенты успешно сдали экзамен.»",
      "options": ["Несмотря на (Acc)", "Благодаря (Dat)", "Из-за (Gen)"],
      "correct": 0,
      "weight": 3
    }
  ]
}

with open(os.path.join(DATA_DIR, "placement_questions.json"), "w", encoding="utf-8") as f:
    json.dump(placement_payload, f, ensure_ascii=False, indent=2)

print("All advanced Russian datasets generated successfully!", flush=True)
