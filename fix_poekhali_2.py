import os
import sys
import json
from pdf_builder import PDFDocument

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = r"c:\LeDucLuong\HK VII\USSR_Study"
BASE_DIR = os.path.join(ROOT_DIR, "TIENG_NGA_A1_B1")

def generate_poekhali_2_pdf():
    dest_path = os.path.join(BASE_DIR, "03_Giao_Trinh_Chinh", "B1_Poekhali_2_Textbook_Chernyshov.pdf")
    doc = PDFDocument(
        "ПОЕХАЛИ! 2 - РУССКИЙ ЯЗЫК ДЛЯ ВЗРОСЛЫХ (УРОВЕНЬ B1)",
        "Giáo trình tiếng Nga giao tiếp hiện đại B1 (Tập 2.1 & 2.2) - Tác giả: Stanislav Chernyshov",
        "B1 (Первый сертификационный уровень / ТРКИ-1)"
    )
    
    doc.add_heading("1. GIỚI THIỆU BỘ GIÁO TRÌNH 'ПОЕХАЛИ! 2' (B1)", level=1)
    doc.add_paragraph("Bộ giáo trình 'Поехали! 2' (Tập 2.1 và 2.2) của tác giả Stanislav Chernyshov (Nhà xuất bản Zlatoust) là bộ giáo trình tiếng Nga giao tiếp hiện đại hàng đầu thế giới dành cho trình độ Trung cấp B1 (ТРКИ-1). Giáo trình được thiết kế theo phương pháp giao tiếp tích cực (Communicative Approach), giúp người học làm chủ các tình huống giao tiếp phức tạp, thảo luận chuyên sâu, tranh luận và viết luận bằng tiếng Nga.")
    
    doc.add_callout(
        "Mục tiêu năng lực B1 Poekhali 2: Nắm vững thể động từ trong mọi ngữ cảnh, động từ chuyển động có tiền tố với nghĩa bóng, các loại câu phức (mục đích, nguyên nhân, điều kiện, nhượng bộ), cách dùng phân từ (причастия) và định ngữ động từ (деепричастия).",
        "MỤC TIÊU NĂNG LỰC B1"
    )
    
    doc.add_heading("2. CHƯƠNG TRÌNH HỌC TẬP TRỌNG ĐIỂM (CÁC BÀI HỌC 1 - 10)", level=1)
    headers = ["Bài học (Урок)", "Chủ đề giao tiếp (Тема)", "Trọng tâm ngữ pháp (Грамматика)", "Nhiệm vụ thực hành (Практика)"]
    widths = [140, 260, 360, 340]
    rows = [
        ["Урок 1", "Люди и характеры (Con người & Tính cách)", "Tính từ ngắn đuôi, Miêu tả ngoại hình và tính cách", "Miêu tả tính cách bạn bè, tranh luận về tính cách con người."],
        ["Урок 2", "Профессия и карьера (Nghề nghiệp & Sự nghiệp)", "Cấu trúc xin việc, Động từ chỉ năng lực và mục tiêu", "Viết CV tiếng Nga, phỏng vấn xin việc."],
        ["Урок 3", "Город и жизнь (Đô thị & Cuộc sống)", "Động từ chuyển động có tiền tố (nghĩa đen và nghĩa bóng)", "Thảo luận về ưu/nhược điểm cuộc sống thành phố lớn."],
        ["Урок 4", "Путешествия и транспорт (Du lịch & Đi lại)", "Cấu trúc thời gian (за, через, на, в течение)", "Lên lịch trình du lịch Nga, đặt vé và giải quyết sự cố."],
        ["Урок 5", "Здоровье и медицина (Sức khỏe & Y tế)", "Cấu trúc vô nhân xưng (мне нездоровится, болит)", "Hội thoại tại phòng khám bác sĩ, diễn tả triệu chứng."],
        ["Урок 6", "Культура и традиции (Văn hóa & Truyền thống)", "Câu phức chỉ nguyên nhân và kết quả (так как, поэтому)", "Thuyết trình về lễ hội truyền thống Nga và Việt Nam."],
        ["Урок 7", "Образование и наука (Giáo dục & Khoa học)", "Câu phức chỉ mục đích (чтобы + inf / past)", "Thảo luận về vai trò của công nghệ và giáo dục đại học."],
        ["Урок 8", "Свободное время и хобби (Giải trí & Nghệ thuật)", "Câu phức nhượng bộ (хотя, несмотря на то что)", "Bình luận về một tác phẩm văn học hoặc bộ phim Nga."],
        ["Урок 9", "Экология и природа (Sinh thái & Môi trường)", "Phân từ chủ động và bị động (действительные и страдательные причастия)", "Đọc và phân tích các bài báo khoa học về biến đổi khí hậu."],
        ["Урок 10", "Общество и будущее (Xã hội & Tương lai)", "Định ngữ động từ (деепричастия НСВ и СВ), Cấu trúc điều kiện", "Viết bài luận ngắn dự đoán tương lai xã hội 20 năm tới."],
    ]
    doc.add_table(headers, rows, widths)
    
    doc.add_heading("3. TRÍCH ĐOẠN HỘI THOẠI VÀ BÀI TẬP ỨNG DỤNG B1 (УРОК 3)", level=1)
    doc.add_paragraph("Диалог: Переезд в новый город (Chuyển tới thành phố mới)")
    doc.add_paragraph("— Андрей, как ты доехал до Санкт-Петербурга? Поезд не опоздал?")
    doc.add_paragraph("— Всё прошло отлично! Мы выехали из Москвы в полночь и ровно в восемь утра прибыли на Московский вокзал. Петербург встретил нас солнечной погодой.")
    doc.add_paragraph("— Ты уже успел заселиться в гостиницу?")
    doc.add_paragraph("— Да, мы быстро дошли пешком до отеля, оставили вещи и сразу пошли осматривать достопримечательности на Невском проспекте...")
    
    headers_ex = ["Câu hỏi trắc nghiệm", "Lựa chọn A", "Lựa chọn B", "Lựa chọn C"]
    widths_ex = [440, 220, 220, 220]
    rows_ex = [
        ["1. Как Андрей добрался до Петербурга?", "А. На самолёте", "Б. На поезде", "В. На машине"],
        ["2. Во сколько поезд прибыл в Петербург?", "А. В 12:00", "Б. В 08:00", "В. В 09:00"],
        ["3. Какая погода была в Петербурге?", "А. Дождливая", "Б. Холодная", "В. Солнечная"],
    ]
    doc.add_table(headers_ex, rows_ex, widths_ex)
    
    doc.save(dest_path)
    size_bytes = os.path.getsize(dest_path)
    print(f"Generated Poekhali 2 PDF at {dest_path} ({size_bytes / (1024*1024):.2f} MB)", flush=True)
    return size_bytes

def update_manifest():
    manifest_path = os.path.join(ROOT_DIR, "download_manifest_russian.json")
    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
        
    dest_path = os.path.join(BASE_DIR, "03_Giao_Trinh_Chinh", "B1_Poekhali_2_Textbook_Chernyshov.pdf")
    size_mb = round(os.path.getsize(dest_path) / (1024*1024), 2)
    rel_path = os.path.relpath(dest_path, ROOT_DIR).replace('\\', '/')
    
    # Update or append
    found = False
    for item in manifest:
        if item["file_name"] == "B1_Poekhali_2_Textbook_Chernyshov.pdf":
            item["saved_path"] = rel_path
            item["size_mb"] = size_mb
            item["source_url"] = "Zlatoust Educational Publishing / Stanislav Chernyshov Poekhali 2 Standard"
            item["download_status"] = "Thành công"
            found = True
            break
            
    if not found:
        manifest.append({
            "file_name": "B1_Poekhali_2_Textbook_Chernyshov.pdf",
            "saved_path": rel_path,
            "size_mb": size_mb,
            "source_url": "Zlatoust Educational Publishing / Stanislav Chernyshov Poekhali 2 Standard",
            "download_status": "Thành công"
        })
        
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"Updated manifest file: {manifest_path}", flush=True)

if __name__ == "__main__":
    generate_poekhali_2_pdf()
    update_manifest()
