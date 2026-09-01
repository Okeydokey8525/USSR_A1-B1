import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = r"c:\LeDucLuong\HK VII\USSR_Study"
BASE_DIR = os.path.join(ROOT_DIR, "TIENG_NGA_A1_B1")

manifest_file = os.path.join(ROOT_DIR, "download_manifest_russian.json")

print("=" * 70)
print("COMPREHENSIVE DIRECTORY & FILE VERIFICATION REPORT")
print("=" * 70)

total_files = 0
total_size_bytes = 0

for folder_name in sorted(os.listdir(BASE_DIR)):
    folder_path = os.path.join(BASE_DIR, folder_name)
    if os.path.isdir(folder_path):
        print(f"\n📂 {folder_name}/")
        files = sorted(os.listdir(folder_path))
        for f in files:
            fpath = os.path.join(folder_path, f)
            if os.path.isfile(fpath):
                size = os.path.getsize(fpath)
                size_mb = size / (1024 * 1024)
                total_files += 1
                total_size_bytes += size
                print(f"  ├── 📄 {f} ({size_mb:.2f} MB)")

print("\n" + "=" * 70)
print(f"TOTAL FILES ACROSS 5 DIRECTORIES: {total_files}")
print(f"TOTAL STORAGE SIZE: {total_size_bytes / (1024 * 1024):.2f} MB ({total_size_bytes / (1024 * 1024 * 1024):.2f} GB)")
print("=" * 70)

# Check manifest
if os.path.exists(manifest_file):
    with open(manifest_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"\n✅ Manifest file found: {manifest_file}")
    print(f"✅ Total items in manifest: {len(data)}")
    all_success = all(item.get("download_status") == "Thành công" for item in data)
    print(f"✅ All items status 'Thành công': {all_success}")
else:
    print(f"❌ Manifest file missing: {manifest_file}")
