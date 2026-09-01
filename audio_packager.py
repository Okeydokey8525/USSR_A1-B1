import os
import sys
import time
import zipfile
import urllib.request
import urllib.parse
import ssl
from concurrent.futures import ThreadPoolExecutor

sys.stdout.reconfigure(encoding='utf-8')

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

def download_single_mp3(url, target_file, timeout=30):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=timeout) as resp:
            if resp.status == 200:
                data = resp.read()
                if len(data) > 1024:
                    with open(target_file, 'wb') as f:
                        f.write(data)
                    return True, len(data)
    except Exception as e:
        pass
    return False, 0

def package_ia_audio(identifier, track_names, output_zip_path, max_workers=5):
    """Download audio tracks from Archive.org item and zip them."""
    print(f"\n[START AUDIO PACKAGE] {os.path.basename(output_zip_path)} from {identifier}", flush=True)
    temp_dir = output_zip_path + "_tmp_audio"
    os.makedirs(temp_dir, exist_ok=True)
    
    tasks = []
    for tname in track_names:
        encoded_name = urllib.parse.quote(tname)
        url = f"https://archive.org/download/{identifier}/{encoded_name}"
        dest_file = os.path.join(temp_dir, tname)
        tasks.append((url, dest_file, tname))
    
    print(f"  Downloading {len(tasks)} audio tracks...", flush=True)
    
    success_count = 0
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(download_single_mp3, u, d): t for (u, d, t) in tasks}
        for fut in futures:
            ok, sz = fut.result()
            if ok:
                success_count += 1
    
    print(f"  Downloaded {success_count}/{len(tasks)} tracks successfully. Zipping...", flush=True)
    
    os.makedirs(os.path.dirname(os.path.abspath(output_zip_path)), exist_ok=True)
    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED) as zip_f:
        for root, _, files in os.walk(temp_dir):
            for file in files:
                fpath = os.path.join(root, file)
                zip_f.write(fpath, arcname=file)
    
    # Cleanup temp directory
    for root, _, files in os.walk(temp_dir, topdown=False):
        for file in files:
            os.remove(os.path.join(root, file))
        os.rmdir(root)
    
    zip_size = os.path.getsize(output_zip_path)
    print(f"[SUCCESS] Created {os.path.basename(output_zip_path)} ({zip_size / (1024*1024):.2f} MB)", flush=True)
    return True, zip_size

def package_custom_audio(mp3_items, output_zip_path, max_workers=5):
    """mp3_items is a list of (url, filename)."""
    print(f"\n[START AUDIO PACKAGE] {os.path.basename(output_zip_path)}", flush=True)
    temp_dir = output_zip_path + "_tmp_audio"
    os.makedirs(temp_dir, exist_ok=True)
    
    tasks = []
    for url, tname in mp3_items:
        dest_file = os.path.join(temp_dir, tname)
        tasks.append((url, dest_file))
    
    success_count = 0
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(download_single_mp3, u, d): u for (u, d) in tasks}
        for fut in futures:
            ok, sz = fut.result()
            if ok:
                success_count += 1
    
    print(f"  Downloaded {success_count}/{len(tasks)} tracks. Zipping...", flush=True)
    os.makedirs(os.path.dirname(os.path.abspath(output_zip_path)), exist_ok=True)
    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED) as zip_f:
        for root, _, files in os.walk(temp_dir):
            for file in files:
                fpath = os.path.join(root, file)
                zip_f.write(fpath, arcname=file)
                
    for root, _, files in os.walk(temp_dir, topdown=False):
        for file in files:
            os.remove(os.path.join(root, file))
        os.rmdir(root)
        
    zip_size = os.path.getsize(output_zip_path)
    print(f"[SUCCESS] Created {os.path.basename(output_zip_path)} ({zip_size / (1024*1024):.2f} MB)", flush=True)
    return True, zip_size
