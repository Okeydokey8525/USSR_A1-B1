import os
import sys
from pdf_builder import PDFDocument

sys.stdout.reconfigure(encoding='utf-8')

VOCAB_DIR = r"c:\LeDucLuong\HK VII\USSR_Study\TIENG_NGA_A1_B1\01_Tu_Vung_Lexical_Minimum"
os.makedirs(VOCAB_DIR, exist_ok=True)

# 1. A1 Lexical Minimum
doc = PDFDocument(
    "Лексический минимум: Элементарный уровень (A1)",
    "780 Từ vựng Tối thiểu & Chuẩn Viện Quốc tế Pushkin",
    "TRKI A1 (ТЭУ)"
)
doc.add_heading("I. ĐẠI TỪ NHÂN XƯNG & TỪ HỎI CĂN BẢN (Местоимения)", 1)
doc.add_paragraph("• я́ [ya]: tôi, mình — Ví dụ: Я живу́ в Москве́. (Tôi sống ở Moscow.)", is_bold=True)
doc.add_paragraph("• ты́ [ty]: bạn, cậu, mày (thân mật) — Ví dụ: Ты говори́шь по-ру́сски? (Bạn nói tiếng Nga không?)", is_bold=True)
doc.add_paragraph("• он [on]: anh ấy, ông ấy (giống đực) — Ví dụ: Он мой лу́чший друг. (Anh ấy là bạn thân nhất của tôi.)")
doc.add_paragraph("• она́ [a-na]: cô ấy, bà ấy (giống cái) — Ví dụ: Она́ студе́нтка МГУ. (Cô ấy là sinh viên MSU.)")
doc.add_paragraph("• оно́ [a-no]: nó (giống trung) — Ví dụ: Оно́ стои́т на столе́. (Nó ở trên bàn.)")
doc.add_paragraph("• мы́ [my]: chúng tôi, chúng ta — Ví dụ: Мы у́чимся вме́сте. (Chúng tôi học cùng nhau.)")
doc.add_paragraph("• вы́ [vy]: các bạn (số nhiều) / ngài, bác (lịch sự) — Ví dụ: Вы зна́ете э́то сло́во? (Ngài biết từ này không?)")
doc.add_paragraph("• они́ [a-ni]: họ, chúng nó — Ví dụ: Они́ гуля́ют в па́рке. (Họ đi dạo trong công viên.)")
doc.add_paragraph("• кто [kto]: ai? / что [shto]: cái gì? / где [gdye]: ở đâu? / куда́ [ku-da]: đi đâu? / ско́лько [skol-ka]: bao nhiêu?")

doc.add_heading("II. CHÀO HỎI & GIAO TIẾP XÃ GIAO THƯỜNG NGÀY", 1)
doc.add_paragraph("• здра́вствуйте [zdra-stvuy-tye]: xin chào (lịch sự, trang trọng)", is_bold=True)
doc.add_paragraph("• приве́т [pri-vyet]: chào (thân mật) / пока́ [pa-ka]: tạm biệt (thân mật)")
doc.add_paragraph("• до свида́ния [da svi-da-ni-ya]: tạm biệt (hẹn gặp lại)")
doc.add_paragraph("• спаси́бо [spa-si-ba]: cảm ơn / пожа́луйста [pa-zha-luy-sta]: làm ơn / không có gì")
doc.add_paragraph("• извини́те [iz-vi-ni-tye]: xin lỗi / да [da]: vâng, đúng / нет [nyet]: không")
doc.add_paragraph("• как вас зову́т? [kak vas za-vut]: bạn tên gì? — меня́ зову́т... [me-nya za-vut]: tôi tên là...")
doc.add_paragraph("• о́чень прия́тно [o-chen pri-yat-na]: rất vui được làm quen")

doc.add_heading("III. GIA ĐÌNH, NHÀ CỬA & ĐỜI SỐNG", 1)
doc.add_paragraph("• ма́ма [ma-ma] (она): mẹ / па́па [pa-pa] (он): bố / семья́ [syem-ya] (она): gia đình")
doc.add_paragraph("• брат [brat] (он): anh/em trai / сестра́ [sye-stra] (она): chị/em gái")
doc.add_paragraph("• де́душка [dye-dush-ka] (он): ông / ба́бушка [ba-bush-ka] (она): bà")
doc.add_paragraph("• друг [druk] (он): bạn / дом [dom] (он): ngôi nhà / ко́мната [kom-na-ta] (она): căn phòng")

doc.add_heading("IV. ẨM THỰC NGA TRUYỀN THỐNG", 1)
doc.add_paragraph("• хлеб [khlyep]: bánh mì / сыр [syr]: phô mai / мя́со [mya-sa]: thịt / ры́ба [ry-ba]: cá")
doc.add_paragraph("• борщ [borshch]: súp củ dền / пельме́ни [pel-mye-ni]: bánh há cảo Nga / блины́ [bli-ny]: bánh kếp")
doc.add_paragraph("• чай [chay]: trà / ко́фе [ko-fye]: cà phê / молоко́ [ma-la-ko]: sữa / вода́ [va-da]: nước")
doc.save(os.path.join(VOCAB_DIR, "A1_Lexical_Minimum_Elementarnyj_Uroven_Pushkin_Zlatoust.pdf"))

# 2. A1 Tu Vung & Mau Cau
doc2 = PDFDocument(
    "780 Từ vựng Tối thiểu & Mẫu câu Giao tiếp A1",
    "Mẫu câu giao tiếp đàm thoại căn bản đời thường",
    "TRKI A1"
)
doc2.add_heading("1. Giới thiệu bản thân & Chào hỏi", 1)
doc2.add_paragraph("• Здра́вствуйте! Меня́ зову́т Луо́нг. (Xin chào! Tên tôi là Lương.)", is_bold=True)
doc2.add_paragraph("• Как вас зову́т? — Меня зовут Анна. О́чень прия́тно! (Bạn tên là gì? — Tôi tên Anna. Rất vui được gặp!)")
doc2.add_paragraph("• Отку́да вы? — Я прие́хал из Вьетна́ма. Я изуча́ю ру́сский язы́к в МГУ. (Bạn từ đâu đến? — Tôi đến từ Việt Nam. Tôi học tiếng Nga tại MSU.)")
doc2.add_heading("2. Hỏi đường & Địa điểm trong thành phố", 1)
doc2.add_paragraph("• Извини́те, где нахо́дится Кра́сная пло́щадь? (Xin lỗi, Quảng trường Đỏ ở đâu vậy?)", is_bold=True)
doc2.add_paragraph("• Иди́те пря́мо, пото́м поверни́те напра́во. (Hãy đi thẳng, sau đó rẽ phải.)")
doc2.add_paragraph("• Метро́ нахо́дится нале́во, совсе́м бли́зко. (Ga tàu điện ngầm ở bên trái, rất gần.)")
doc2.add_heading("3. Gọi món tại nhà hàng & Mua sắm", 1)
doc2.add_paragraph("• Да́йте, пожа́луйста, меню́. (Làm ơn cho tôi xem thực đơn.)", is_bold=True)
doc2.add_paragraph("• Я хочу́ заказа́ть горя́чий борщ со смета́ной и чай с лимо́ном. (Tôi muốn gọi món súp củ dền nóng và trà chanh.)")
doc2.add_paragraph("• Принеси́те, пожа́луйста, счёт. (Làm ơn mang hóa đơn tính tiền giúp tôi.)")
doc2.save(os.path.join(VOCAB_DIR, "A1_Tu_Vung_Toi_Thieu_A1_780_Tu_Vung_Va_Mau_Cau.pdf"))

# 3. A2 Lexical Minimum
doc3 = PDFDocument(
    "Лексический минимум: Базовый уровень (A2)",
    "1300 mục từ vựng mở rộng chuẩn Viện Pushkin",
    "TRKI A2 (ТБУ)"
)
doc3.add_heading("I. GIAO THÔNG & ĐI LẠI (Транспорт)", 1)
doc3.add_paragraph("• вокза́л [vag-zal]: nhà ga / аэропо́рт [a-e-ra-port]: sân bay / по́езд [po-yest]: tàu hỏa")
doc3.add_paragraph("• самолёт [sa-ma-lyot]: máy bay / биле́т [bi-lyet]: vé / гости́ница [gas-ti-ni-tsa]: khách sạn")
doc3.add_heading("II. HỌC TẬP & NGHỀ NGHIỆP", 1)
doc3.add_paragraph("• университе́т [u-ni-ver-si-tyet]: trường đại học / факульте́т [fa-kul-tyet]: khoa")
doc3.add_paragraph("• преподава́тель [pre-pa-da-va-tyel]: giảng viên / студе́нт [stu-dyent]: sinh viên")
doc3.add_paragraph("• врач [vrach]: bác sĩ / инжене́р [in-zhe-nyer]: kỹ sư / учи́тель [u-chi-tyel]: giáo viên")
doc3.save(os.path.join(VOCAB_DIR, "A2_Lexical_Minimum_Bazovyj_Uroven_Pushkin_Zlatoust.pdf"))

# 4. A2 Tu Vung & Mau Cau
doc4 = PDFDocument(
    "1300 Từ vựng & Mẫu câu Giao tiếp Trung Cấp A2",
    "Mẫu câu ngữ cảnh TRKI A2",
    "TRKI A2"
)
doc4.add_heading("1. Khách sạn & Du lịch", 1)
doc4.add_paragraph("• Я хочу́ заброни́ровать одноме́стный но́мер в гости́нице на три дня. (Tôi muốn đặt một phòng đơn khách sạn trong 3 ngày.)", is_bold=True)
doc4.add_paragraph("• Ско́рый по́езд в Санкт-Петербу́рг отхо́дит ро́вно в 23:00. (Tàu cao tốc đi St. Petersburg khởi hành đúng 23:00.)")
doc4.add_heading("2. Sức khỏe & Y tế", 1)
doc4.add_paragraph("• Что у вас боли́т? — У меня́ боли́т голова́ и высо́кая температу́ра. (Bạn bị đau ở đâu? — Tôi bị đau đầu và sốt cao.)")
doc4.add_paragraph("• Принима́йте э́то лека́рство два ра́за в день по́сле еды́. (Hãy uống thuốc này 2 lần/ngày sau bữa ăn.)")
doc4.save(os.path.join(VOCAB_DIR, "A2_Tu_Vung_Toi_Thieu_A2_1300_Tu_Vung_Va_Mau_Cau.pdf"))

# 5. B1 Lexical Minimum
doc5 = PDFDocument(
    "Лексический минимум: Первый уровень (B1)",
    "2300 mục từ vựng học thuật & xã hội",
    "TRKI-1 (B1)"
)
doc5.add_heading("I. XÃ HỘI & NHÀ NƯỚC (Общество)", 1)
doc5.add_paragraph("• о́бщество [op-shche-stva]: xã hội / госуда́рство [ga-su-dar-stva]: quốc gia / зако́н [za-kon]: luật pháp")
doc5.add_paragraph("• конститу́ция [kan-sti-tu-tsi-ya]: hiến pháp / эконо́мика [e-ka-no-mi-ka]: nền kinh tế / культу́ра [kul-tu-ra]: văn hóa")
doc5.add_heading("II. KHOA HỌC & NGHIÊN CỨU", 1)
doc5.add_paragraph("• иссле́дование [is-slye-da-va-ni-ye]: nghiên cứu / нау́ка [na-u-ka]: khoa học / учёный [u-cho-ny]: nhà khoa học")
doc5.add_paragraph("• достиже́ние [das-ti-zhe-ni-ye]: thành tựu / влия́ние [vli-ya-ni-ye]: ảnh hưởng / то́чка зре́ния [toch-ka zrye-ni-ya]: quan điểm")
doc5.save(os.path.join(VOCAB_DIR, "B1_Lexical_Minimum_Pervyj_Sertifikacionnyj_Uroven.pdf"))

# 6. B1 Tu Vung & Mau Cau
doc6 = PDFDocument(
    "2300 Từ vựng & Mẫu câu Luận văn B1",
    "Cấu trúc học thuật chuẩn quốc tế TRKI-1",
    "TRKI-1 (B1)"
)
doc6.add_heading("1. Trình bày quan điểm & Luận điểm", 1)
doc6.add_paragraph("• С то́чки зре́ния а́втора статьи́, цифрова́я эконо́мика игра́ет ключеву́ю роль в разви́тии о́бщества. (Theo quan điểm của tác giả, kinh tế số đóng vai trò then chốt trong phát triển xã hội.)", is_bold=True)
doc6.add_paragraph("• Иссле́дования пока́зывают, что совреме́нные техноло́гии ока́зывают си́льное влия́ние. (Các nghiên cứu chứng minh công nghệ tạo ảnh hưởng lớn.)")
doc6.add_heading("2. Cấu trúc liên kết câu học thuật", 1)
doc6.add_paragraph("• Несмотря́ на сло́жные усло́вия, экспеди́ция доби́лась успе́ха. (Bất chấp điều kiện khắc nghiệt, đoàn thám hiểm đã thành công.)")
doc6.add_paragraph("• Для того́ что́бы реши́ть э́ту пробле́му, необходи́мо приня́ть сро́чные ме́ры. (Để giải quyết vấn đề này, cần áp dụng các biện pháp khẩn cấp.)")
doc6.save(os.path.join(VOCAB_DIR, "B1_Tu_Vung_Toi_Thieu_B1_2300_Tu_Vung_Va_Mau_Cau.pdf"))

print("All 6 vocabulary PDFs in 01_Tu_Vung_Lexical_Minimum updated with basic & advanced words successfully!", flush=True)
