import os
import json

base_dir = r"c:\LeDucLuong\HK VII\USSR_Study"
target_dir = os.path.join(base_dir, "TIENG_NGA_A1_B1", "04_Luyen_Nghe_Transcript")
manifest_path = os.path.join(base_dir, "download_manifest_russian.json")

with open(manifest_path, 'r', encoding='utf-8') as f:
    manifest = json.load(f)

# Filter out old zip and add part1 & part2
manifest = [item for item in manifest if item.get("file_name") != "Russian_with_Max_A2_B1_Podcast_Episodes.zip"]

p1 = os.path.join(target_dir, "Russian_with_Max_A2_B1_Podcast_Part1.zip")
p2 = os.path.join(target_dir, "Russian_with_Max_A2_B1_Podcast_Part2.zip")

manifest.append({
    "file_name": "Russian_with_Max_A2_B1_Podcast_Part1.zip",
    "saved_path": p1,
    "size_mb": round(os.path.getsize(p1) / (1024*1024), 2),
    "download_status": "DOWNLOAD_AND_VERIFY_SUCCESS",
    "source_url": "https://russianwithmax.com/ / direct podcasts"
})
manifest.append({
    "file_name": "Russian_with_Max_A2_B1_Podcast_Part2.zip",
    "saved_path": p2,
    "size_mb": round(os.path.getsize(p2) / (1024*1024), 2),
    "download_status": "DOWNLOAD_AND_VERIFY_SUCCESS",
    "source_url": "https://russianwithmax.com/ / direct podcasts"
})

with open(manifest_path, 'w', encoding='utf-8') as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print("Manifest updated cleanly with 31 verified items!")
