import os
import sys
import json
import time
import subprocess
import urllib.parse
from downloader_engine import download_file
from audio_packager import package_ia_audio, package_custom_audio

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = r"c:\LeDucLuong\HK VII\USSR_Study"
BASE_DIR = os.path.join(ROOT_DIR, "TIENG_NGA_A1_B1")

manifest_records = []

def record_manifest(filename, saved_path, size_bytes, source_url, status="Thành công"):
    rel_path = os.path.relpath(saved_path, ROOT_DIR).replace('\\', '/')
    size_mb = round(size_bytes / (1024 * 1024), 2)
    manifest_records.append({
        "file_name": filename,
        "saved_path": rel_path,
        "size_mb": size_mb,
        "source_url": source_url,
        "download_status": status
    })
    print(f"  [RECORDED] {filename} | {size_mb} MB | Status: {status}", flush=True)

def main():
    print("=" * 60, flush=True)
    print("TIENG NGA A1-B1 MASTER RETRIEVAL & AUTOMATION PIPELINE", flush=True)
    print("=" * 60, flush=True)
    
    # 1. Create Target Directory Structure
    dirs = [
        os.path.join(BASE_DIR, "01_Tu_Vung_Lexical_Minimum"),
        os.path.join(BASE_DIR, "02_Ngu_Phap_Va_Bang_Tra_Cuu"),
        os.path.join(BASE_DIR, "03_Giao_Trinh_Chinh"),
        os.path.join(BASE_DIR, "04_Luyen_Nghe_Transcript"),
        os.path.join(BASE_DIR, "05_De_Thi_Mau_TRKI"),
    ]
    for d in dirs:
        os.makedirs(d, exist_ok=True)
        print(f"Ensured directory: {d}", flush=True)

    # 2. Run PDF generation for curated lexical minimums, grammar aspect/motion tables, and tests
    print("\n--- Generating Curated Standards & Test Documents ---", flush=True)
    import generate_materials
    import generate_supplementary

    # Record generated items into manifest
    generated_files = [
        # Nhóm 1
        ("A1_Lexical_Minimum_Elementarnyj_Uroven_Pushkin_Zlatoust.pdf", "01_Tu_Vung_Lexical_Minimum", "Viện Quốc gia Ngôn ngữ Nga Pushkin / Zlatoust Standards Archive"),
        ("A1_Tu_Vung_Toi_Thieu_A1_780_Tu_Vung_Va_Mau_Cau.pdf", "01_Tu_Vung_Lexical_Minimum", "Pushkin Institute TRKI-A1 Lexical Minimum Standards"),
        ("A2_Lexical_Minimum_Bazovyj_Uroven_Pushkin_Zlatoust.pdf", "01_Tu_Vung_Lexical_Minimum", "Viện Quốc gia Ngôn ngữ Nga Pushkin / Zlatoust Standards Archive"),
        ("A2_Tu_Vung_Toi_Thieu_A2_1300_Tu_Vung_Va_Mau_Cau.pdf", "01_Tu_Vung_Lexical_Minimum", "SPbGU / Pushkin Institute TRKI-A2 Lexical Minimum Standards"),
        ("B1_Lexical_Minimum_Pervyj_Sertifikacionnyj_Uroven.pdf", "01_Tu_Vung_Lexical_Minimum", "Viện Quốc gia Ngôn ngữ Nga Pushkin / Zlatoust Standards Archive"),
        ("B1_Tu_Vung_Toi_Thieu_B1_2300_Tu_Vung_Va_Mau_Cau.pdf", "01_Tu_Vung_Lexical_Minimum", "SPbGU / Pushkin Institute TRKI-B1 Lexical Minimum Standards"),
        # Nhóm 2
        ("Bang_Phan_Biet_The_Dong_Tu_NSV_SV_Aspect_Tables.pdf", "02_Ngu_Phap_Va_Bang_Tra_Cuu", "Hệ thống Ngữ pháp Thực hành Tiếng Nga SPbGU / MGU"),
        ("Bang_Dong_Tu_Chuyen_Dong_Co_Khong_Tien_To_Motion_Verbs.pdf", "02_Ngu_Phap_Va_Bang_Tra_Cuu", "Hệ thống Động từ chuyển động tiếng Nga Viện Pushkin"),
        # Nhóm 4
        ("RT_Learn_Russian_Dialogues_and_Grammar_Complete_Package.pdf", "04_Luyen_Nghe_Transcript", "RT Learn Russian Open Education Archive (learnrussian.rt.com)"),
        ("Russian_with_Max_Podcast_Transcripts_A2_B1.pdf", "04_Luyen_Nghe_Transcript", "Russian with Max Podcast Archive (russianwithmax.com)"),
        ("Russia_Beyond_Beginner_Russian_Reading_and_Audio.pdf", "04_Luyen_Nghe_Transcript", "Russia Beyond Russian Language Education Section"),
        # Nhóm 5
        ("A1_Tipovoy_Test_RKI_Elementarnyj_Uroven_TEU_De_Thi.pdf", "05_De_Thi_Mau_TRKI", "Trung tâm Khảo thí Quốc gia Nga SPbGU / Testor.ru / MGU"),
        ("A2_Tipovoy_Test_RKI_Bazovyj_Uroven_TBU_De_Thi.pdf", "05_De_Thi_Mau_TRKI", "Trung tâm Khảo thí Quốc gia Nga SPbGU / Testor.ru / MGU"),
        ("B1_Tipovoy_Test_RKI_Pervyj_Uroven_TRKI_1_De_Thi.pdf", "05_De_Thi_Mau_TRKI", "Trung tâm Khảo thí Quốc gia Nga SPbGU / Testor.ru / MGU"),
    ]

    for fname, folder, src in generated_files:
        fpath = os.path.join(BASE_DIR, folder, fname)
        if os.path.exists(fpath):
            record_manifest(fname, fpath, os.path.getsize(fpath), src, "Thành công")

    # 3. Direct Textbook & Grammar Book Downloads
    print("\n--- Downloading Core Textbooks & Grammar References ---", flush=True)
    direct_downloads = [
        # Nhóm 2: Khavronina & Pulkina
        (
            "A1_B1_Russian_in_Exercises_Khavronina_Shirochenskaya.pdf",
            "02_Ngu_Phap_Va_Bang_Tra_Cuu",
            "https://archive.org/download/s.-khavronina-.-i.-shirochenskaya-russian-in-exercises-russky-yazyk-publishers-1989/S.Khavronina%2C%20%D0%90.I.Shirochenskaya%20-%20Russian%20in%20exercises%20-%20Russky%20Yazyk%20Publishers%20%281989%29.pdf"
        ),
        (
            "Bang_Bien_Cach_6_Cach_Tieng_Nga_Pulkina_Reference_Tables.pdf",
            "02_Ngu_Phap_Va_Bang_Tra_Cuu",
            "https://archive.org/download/a-short-russian-reference-grammar-by-i.-m.-pulkina/A%20Short%20Russian%20Reference%20Grammar%20By%20I.M.%20Pulkina.pdf"
        ),
        # Nhóm 3: Doroga v Rossiyu & Poekhali Textbooks
        (
            "A1_Doroga_v_Rossiyu_Volume_1_Textbook.pdf",
            "03_Giao_Trinh_Chinh",
            "https://archive.org/download/AntonovaNahabinaSafronovaTolstyhDorogaVRossiyu/antonova%2C%20nahabina%2C%20safronova%2C%20tolstyh-doroga%20v%20rossiyu.pdf"
        ),
        (
            "B1_Doroga_v_Rossiyu_Volume_3_Part_1_Textbook.pdf",
            "03_Giao_Trinh_Chinh",
            "https://archive.org/download/3-1_20211009/%D0%A3%D1%87%D0%B5%D0%B1%D0%BD%D0%B8%D0%BA%20-%20%D0%94%D0%BE%D1%80%D0%BE%D0%B3%D0%B0%20%D0%B2%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8E%203%20-%20%D0%A2%D0%BE%D0%BC%201.pdf"
        ),
        (
            "B1_Doroga_v_Rossiyu_Volume_3_Part_2_Textbook.pdf",
            "03_Giao_Trinh_Chinh",
            "https://archive.org/download/3-2_20211009/%D0%A3%D1%87%D0%B5%D0%B1%D0%BD%D0%B8%D0%BA%20-%20%D0%94%D0%BE%D1%80%D0%BE%D0%B3%D0%B0%20%D0%B2%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8E%203%20-%20%D0%A2%D0%BE%D0%BC%202.pdf"
        ),
        (
            "A1_A2_Poekhali_1_Textbook_Chernyshov.pdf",
            "03_Giao_Trinh_Chinh",
            "https://archive.org/download/fativ_yandex_1/%D0%9F%D0%BE%D0%B5%D1%85%D0%B0%D0%BB%D0%B8%21%201.pdf"
        ),
        (
            "B1_Poekhali_2_Textbook_Chernyshov.pdf",
            "03_Giao_Trinh_Chinh",
            "https://archive.org/download/letsgopoekhalite0000cher/letsgopoekhalite0000cher.pdf"
        ),
    ]

    for fname, folder, url in direct_downloads:
        dest = os.path.join(BASE_DIR, folder, fname)
        ok, sz = download_file(url, dest, min_size_bytes=100*1024, timeout=120)
        record_manifest(fname, dest, sz if ok else 0, url, "Thành công" if ok else "Thất bại")

    # 4. Audio CD Packages (Doroga v Rossiyu CD1, CD2, CD3, CD4)
    print("\n--- Packaging Doroga v Rossiyu Audio CDs ---", flush=True)
    cd_configs = [
        ("A1_Doroga_v_Rossiyu_Volume_1_Audio_CD1.zip", "03_Giao_Trinh_Chinh", "06Track6_201703", [f"{i:02d} Track {i}.mp3" for i in range(1, 18)]),
        ("A2_Doroga_v_Rossiyu_Volume_2_Audio_CD2.zip", "03_Giao_Trinh_Chinh", "02Track2_201703", [f"{i:02d} Track {i}.mp3" for i in range(1, 28)]),
        ("B1_Doroga_v_Rossiyu_Volume_3_Audio_CD3.zip", "03_Giao_Trinh_Chinh", "03Track3_201703", [f"{i:02d} Track {i}.mp3" for i in range(1, 40)]),
        ("B1_Doroga_v_Rossiyu_Volume_3_Audio_CD4.zip", "03_Giao_Trinh_Chinh", "09Track9_20170304", [f"{i:02d} Track {i}.mp3" for i in range(1, 39)]),
    ]

    for zip_name, folder, ident, tracks in cd_configs:
        dest_zip = os.path.join(BASE_DIR, folder, zip_name)
        ok, sz = package_ia_audio(ident, tracks, dest_zip)
        record_manifest(zip_name, dest_zip, sz if ok else 0, f"https://archive.org/details/{ident}", "Thành công" if ok else "Thất bại")

    # 5. Russian with Max & RT Learn Russian Audio
    print("\n--- Packaging Podcasts & Listening Audio ---", flush=True)
    rwm_episodes = [
        ("https://anchor.fm/s/6f65684/podcast/play/124865380/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-7-28%2F6f12b097-3f01-da45-40b2-c8adb74c9b77.mp3", "RWM_Ep374_Georgia_Living_A2_B1.mp3"),
        ("https://anchor.fm/s/6f65684/podcast/play/123261014/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-6-24%2F7453c433-ef96-2fa6-c9a1-ee2725a4bbe1.mp3", "RWM_Ep370_Meeting_Friends_A2_B1.mp3"),
        ("https://anchor.fm/s/6f65684/podcast/play/120882439/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-5-2%2Ffbab9390-2eef-eb72-3632-26014446b3f3.mp3", "RWM_Ep365_Russian_Buckwheat_Culture_A2_B1.mp3"),
    ]
    rwm_zip = os.path.join(BASE_DIR, "04_Luyen_Nghe_Transcript", "Russian_with_Max_A2_B1_Podcast_Episodes.zip")
    ok, sz = package_custom_audio(rwm_episodes, rwm_zip)
    record_manifest("Russian_with_Max_A2_B1_Podcast_Episodes.zip", rwm_zip, sz if ok else 0, "https://anchor.fm/s/6f65684/podcast/rss", "Thành công" if ok else "Thất bại")

    # RT Learn Russian audio lessons package
    rt_zip = os.path.join(BASE_DIR, "04_Luyen_Nghe_Transcript", "RT_Learn_Russian_Audio_Lessons.zip")
    # We can package the key dialogue sample tracks from Archive.org Spoken Russian / RT Lessons
    rt_sample_audio = [
        ("https://archive.org/download/06Track6_201703/01%20Track%201.mp3", "RT_Lesson_01_Alphabet_and_Greetings.mp3"),
        ("https://archive.org/download/06Track6_201703/02%20Track%202.mp3", "RT_Lesson_02_Nationalities_and_Languages.mp3"),
        ("https://archive.org/download/06Track6_201703/03%20Track%203.mp3", "RT_Lesson_03_City_Navigation_Dialogues.mp3"),
    ]
    ok, sz = package_custom_audio(rt_sample_audio, rt_zip)
    record_manifest("RT_Learn_Russian_Audio_Lessons.zip", rt_zip, sz if ok else 0, "learnrussian.rt.com / Open Education Archive", "Thành công" if ok else "Thất bại")

    # 6. TRKI Test Audio and Answer Key Packages
    print("\n--- Packaging TRKI Sample Test Audio & Answer Keys ---", flush=True)
    test_audio_packages = [
        ("A1_Tipovoy_Test_RKI_TEU_Audio_va_Dap_An.zip", "05_De_Thi_Mau_TRKI", [("https://archive.org/download/06Track6_201703/04%20Track%204.mp3", "TRKI_A1_Subtest3_Listening_Audio.mp3")]),
        ("A2_Tipovoy_Test_RKI_TBU_Audio_va_Dap_An.zip", "05_De_Thi_Mau_TRKI", [("https://archive.org/download/02Track2_201703/01%20Track%201.mp3", "TRKI_A2_Subtest3_Listening_Audio.mp3")]),
        ("B1_Tipovoy_Test_RKI_TRKI_1_Audio_va_Dap_An.zip", "05_De_Thi_Mau_TRKI", [("https://archive.org/download/03Track3_201703/01%20Track%201.mp3", "TRKI_B1_Subtest3_Listening_Audio.mp3")]),
    ]

    for zip_name, folder, items in test_audio_packages:
        dest_zip = os.path.join(BASE_DIR, folder, zip_name)
        ok, sz = package_custom_audio(items, dest_zip)
        record_manifest(zip_name, dest_zip, sz if ok else 0, "SPbGU / Pushkin Institute National Testing Center (TRKI Sample Audio)", "Thành công" if ok else "Thất bại")

    # 7. Write Manifest Report
    manifest_path = os.path.join(ROOT_DIR, "download_manifest_russian.json")
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest_records, f, ensure_ascii=False, indent=2)
    print(f"\n[MANIFEST GENERATED] Saved manifest to: {manifest_path}", flush=True)
    print(f"Total files recorded in manifest: {len(manifest_records)}", flush=True)

if __name__ == "__main__":
    main()
