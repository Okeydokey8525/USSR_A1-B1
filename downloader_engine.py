import os
import sys
import time
import urllib.request
import urllib.parse
import ssl
import shutil

sys.stdout.reconfigure(encoding='utf-8')

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8,vi;q=0.7',
}

def download_file(url, target_path, min_size_bytes=1024, max_retries=3, timeout=60):
    """Download a file with streaming, progress logging, and verification."""
    os.makedirs(os.path.dirname(os.path.abspath(target_path)), exist_ok=True)
    temp_path = target_path + ".tmp"
    
    print(f"\n[START DOWNLOAD] {os.path.basename(target_path)}", flush=True)
    print(f"  URL: {url}", flush=True)
    
    for attempt in range(1, max_retries + 1):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            start_time = time.time()
            with urllib.request.urlopen(req, context=ssl_ctx, timeout=timeout) as resp:
                status_code = resp.status
                if status_code != 200:
                    raise Exception(f"HTTP Status {status_code}")
                
                content_len = resp.headers.get('Content-Length')
                total_bytes = int(content_len) if content_len else 0
                
                downloaded_bytes = 0
                chunk_size = 1024 * 64
                last_log_time = time.time()
                
                with open(temp_path, 'wb') as out_f:
                    while True:
                        chunk = resp.read(chunk_size)
                        if not chunk:
                            break
                        out_f.write(chunk)
                        downloaded_bytes += len(chunk)
                        
                        now = time.time()
                        if now - last_log_time >= 3.0 or (total_bytes and downloaded_bytes >= total_bytes):
                            if total_bytes > 0:
                                pct = (downloaded_bytes / total_bytes) * 100
                                mb_down = downloaded_bytes / (1024 * 1024)
                                mb_tot = total_bytes / (1024 * 1024)
                                print(f"  ... {pct:.1f}% ({mb_down:.2f} MB / {mb_tot:.2f} MB)", flush=True)
                            else:
                                mb_down = downloaded_bytes / (1024 * 1024)
                                print(f"  ... downloaded {mb_down:.2f} MB", flush=True)
                            last_log_time = now
            
            # Verify file
            if os.path.exists(temp_path):
                file_size = os.path.getsize(temp_path)
                if file_size < min_size_bytes:
                    raise Exception(f"File size {file_size} bytes is below minimum {min_size_bytes} bytes (likely error page)")
                
                # Check magic bytes for PDF, ZIP, MP3
                with open(temp_path, 'rb') as f:
                    header = f.read(16)
                    if target_path.lower().endswith('.pdf') and not header.startswith(b'%PDF'):
                        if b'<html>' in header.lower() or b'<!doctype' in header.lower():
                            raise Exception("Downloaded file is HTML instead of PDF")
                    elif target_path.lower().endswith('.zip') and not (header.startswith(b'PK\x03\x04') or header.startswith(b'PK\x05\x06')):
                        if b'<html>' in header.lower() or b'<!doctype' in header.lower():
                            raise Exception("Downloaded file is HTML instead of ZIP")
                
                if os.path.exists(target_path):
                    os.remove(target_path)
                shutil.move(temp_path, target_path)
                
                elapsed = time.time() - start_time
                mb_final = file_size / (1024 * 1024)
                print(f"[SUCCESS] Saved {os.path.basename(target_path)} ({mb_final:.2f} MB in {elapsed:.1f}s)", flush=True)
                return True, file_size
        except Exception as e:
            print(f"  Attempt {attempt}/{max_retries} failed: {e}", flush=True)
            if os.path.exists(temp_path):
                try:
                    os.remove(temp_path)
                except Exception:
                    pass
            if attempt < max_retries:
                time.sleep(2)
            else:
                print(f"[FAILED] Could not download {os.path.basename(target_path)}: {e}", flush=True)
                return False, 0
    return False, 0
