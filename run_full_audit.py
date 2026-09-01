import os
import json
import re

base_dir = r"c:\LeDucLuong\HK VII\USSR_Study"

# 1. Scan filesystem
fs_files = {}
for root, dirs, files in os.walk(base_dir):
    if ".git" in root or "__pycache__" in root:
        continue
    for f in files:
        full_p = os.path.join(root, f)
        rel_p = os.path.relpath(full_p, base_dir).replace('\\', '/')
        fs_files[rel_p] = {
            "size_bytes": os.path.getsize(full_p),
            "size_mb": round(os.path.getsize(full_p) / (1024 * 1024), 2)
        }

print(f"Total active files scanned: {len(fs_files)}")

# 2. Check manifest
manifest_p = os.path.join(base_dir, "download_manifest_russian.json")
manifest_files = {}
if os.path.exists(manifest_p):
    with open(manifest_p, 'r', encoding='utf-8') as mf:
        m_data = json.load(mf)
        for item in m_data:
            manifest_files[item["file_name"]] = item

print(f"Total items in manifest: {len(manifest_files)}")

# 3. Check README mentions
readme_p = os.path.join(base_dir, "README.md")
readme_files = []
if os.path.exists(readme_p):
    with open(readme_p, 'r', encoding='utf-8') as rf:
        content = rf.read()
        # extract lines matching *.pdf, *.zip, *.js, *.html, *.json
        matches = re.findall(r'([\w\-\.]+\.(?:pdf|zip|json|js|html))', content)
        readme_files = sorted(list(set(matches)))

print(f"Unique files mentioned in README: {len(readme_files)}")

# 4. Check discrepancies
tieng_nga_fs = [f for f in fs_files if f.startswith("TIENG_NGA_A1_B1/")]
print(f"Files in TIENG_NGA_A1_B1: {len(tieng_nga_fs)}")

mismatches = []
for rf in readme_files:
    found = any(rf == os.path.basename(f) for f in fs_files)
    if not found:
        mismatches.append(rf)

print(f"Files in README but NOT in filesystem: {mismatches}")

extra_files = []
for f in tieng_nga_fs:
    bname = os.path.basename(f)
    if bname not in readme_files:
        extra_files.append(f)

print(f"Files in TIENG_NGA_A1_B1 but NOT in README: {extra_files}")
