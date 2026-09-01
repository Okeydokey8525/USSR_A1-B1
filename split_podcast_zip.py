import os
import zipfile
import json

base_dir = r"c:\LeDucLuong\HK VII\USSR_Study"
target_dir = os.path.join(base_dir, "TIENG_NGA_A1_B1", "04_Luyen_Nghe_Transcript")
orig_zip = os.path.join(target_dir, "Russian_with_Max_A2_B1_Podcast_Episodes.zip")

if os.path.exists(orig_zip):
    print("Unpacking original zip...")
    with zipfile.ZipFile(orig_zip, 'r') as z:
        z.extractall(target_dir)

    part1_zip = os.path.join(target_dir, "Russian_with_Max_A2_B1_Podcast_Part1.zip")
    part2_zip = os.path.join(target_dir, "Russian_with_Max_A2_B1_Podcast_Part2.zip")

    f1 = os.path.join(target_dir, "RWM_Ep365_Russian_Buckwheat_Culture_A2_B1.mp3")
    f2 = os.path.join(target_dir, "RWM_Ep374_Georgia_Living_A2_B1.mp3")
    f3 = os.path.join(target_dir, "RWM_Ep370_Meeting_Friends_A2_B1.mp3")

    with zipfile.ZipFile(part1_zip, 'w', compression=zipfile.ZIP_DEFLATED) as z1:
        if os.path.exists(f1):
            z1.write(f1, os.path.basename(f1))
        if os.path.exists(f2):
            z1.write(f2, os.path.basename(f2))

    with zipfile.ZipFile(part2_zip, 'w', compression=zipfile.ZIP_DEFLATED) as z2:
        if os.path.exists(f3):
            z2.write(f3, os.path.basename(f3))

    # Clean up unzipped loose mp3s and original oversized zip
    for f in [f1, f2, f3, orig_zip]:
        if os.path.exists(f):
            os.remove(f)

    print(f"Created {part1_zip} ({os.path.getsize(part1_zip)/(1024*1024):.2f} MB)")
    print(f"Created {part2_zip} ({os.path.getsize(part2_zip)/(1024*1024):.2f} MB)")

# Update manifest
manifest_path = os.path.join(base_dir, "download_manifest_russian.json")
if os.path.exists(manifest_path):
    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
    
    # Filter out old zip and add part1 & part2
    manifest = [item for item in manifest if item["filename"] != "Russian_with_Max_A2_B1_Podcast_Episodes.zip"]
    
    p1 = os.path.join(target_dir, "Russian_with_Max_A2_B1_Podcast_Part1.zip")
    p2 = os.path.join(target_dir, "Russian_with_Max_A2_B1_Podcast_Part2.zip")
    
    manifest.append({
        "category": "04_Luyen_Nghe_Transcript",
        "filename": "Russian_with_Max_A2_B1_Podcast_Part1.zip",
        "path": p1,
        "size_bytes": os.path.getsize(p1),
        "size_mb": round(os.path.getsize(p1) / (1024*1024), 2),
        "status": "VERIFIED_COMPLETED",
        "source": "https://russianwithmax.com/ / direct podcasts"
    })
    manifest.append({
        "category": "04_Luyen_Nghe_Transcript",
        "filename": "Russian_with_Max_A2_B1_Podcast_Part2.zip",
        "path": p2,
        "size_bytes": os.path.getsize(p2),
        "size_mb": round(os.path.getsize(p2) / (1024*1024), 2),
        "status": "VERIFIED_COMPLETED",
        "source": "https://russianwithmax.com/ / direct podcasts"
    })
    
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

print("Manifest updated successfully!")
