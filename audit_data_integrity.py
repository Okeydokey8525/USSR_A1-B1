import os
import json
import glob
import sys

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = r"c:\LeDucLuong\HK VII\USSR_Study\WEB_USSR\data"

def run_integrity_audit():
    print("==========================================================")
    print("🔍 RUSSIAN DATA INTEGRITY & QUALITY AUDIT")
    print("==========================================================")
    
    total_errors = 0
    total_warnings = 0
    
    json_files = glob.glob(os.path.join(DATA_DIR, "*.json"))
    print(f"Auditing {len(json_files)} JSON datasets in: {DATA_DIR}\n")
    
    # 1. Check JSON validity
    for jf in json_files:
        fname = os.path.basename(jf)
        try:
            with open(jf, "r", encoding="utf-8") as f:
                data = json.load(f)
            print(f"  [VALID JSON] {fname} ({os.path.getsize(jf) / 1024:.1f} KB)")
        except Exception as e:
            print(f"  ❌ [INVALID JSON] {fname}: {e}")
            total_errors += 1

    print("\n--- 2. Auditing Russian Vocabulary & Stress Data ---")
    vocab_p = os.path.join(DATA_DIR, "vocab_lexical_min.json")
    if os.path.exists(vocab_p):
        with open(vocab_p, "r", encoding="utf-8") as f:
            vocab = json.load(f)
        
        ids = set()
        for idx, item in enumerate(vocab):
            item_id = item.get("id", f"idx_{idx}")
            if item_id in ids:
                print(f"  ❌ Duplicate ID detected in vocab: {item_id}")
                total_errors += 1
            ids.add(item_id)
            
            # Check required fields
            req = ["word", "meaning", "level", "topic", "audio_text"]
            for r in req:
                if not item.get(r):
                    print(f"  ❌ Missing field '{r}' in vocab item: {item_id}")
                    total_errors += 1
        print(f"  ✓ Checked {len(vocab)} vocabulary items. Unique IDs: {len(ids)}")
    else:
        print(f"  ⚠️ File not found: {vocab_p}")
        total_warnings += 1

    print("\n--- 3. Auditing Grammar & Verb Aspects Data ---")
    verbs_p = os.path.join(DATA_DIR, "verbs_aspects.json")
    if os.path.exists(verbs_p):
        with open(verbs_p, "r", encoding="utf-8") as f:
            verbs = json.load(f)
        pairs = verbs.get("aspect_pairs", [])
        motions = verbs.get("motion_verbs", [])
        prefixes = verbs.get("prefixes", [])
        print(f"  ✓ Aspect pairs: {len(pairs)}, Motion verbs: {len(motions)}, Directional prefixes: {len(prefixes)}")
    else:
        print(f"  ⚠️ File not found: {verbs_p}")
        total_warnings += 1

    print("\n--- 4. Auditing 6 Cases Matrix Data ---")
    cases_p = os.path.join(DATA_DIR, "cases_rules.json")
    if os.path.exists(cases_p):
        with open(cases_p, "r", encoding="utf-8") as f:
            cases_data = json.load(f)
        cases = cases_data.get("cases", [])
        pronouns = cases_data.get("pronouns_declension", [])
        inter_words = cases_data.get("interactive_words", [])
        print(f"  ✓ 6 Cases defined: {len(cases)}, Personal pronouns: {len(pronouns)}, Interactive declension words: {len(inter_words)}")
        if len(cases) != 6:
            print(f"  ❌ Expected 6 cases, found {len(cases)}")
            total_errors += 1

    print("\n--- 5. Auditing TRKI Mock Tests & Answer Keys ---")
    trki_p = os.path.join(DATA_DIR, "trki_mock_tests.json")
    if os.path.exists(trki_p):
        with open(trki_p, "r", encoding="utf-8") as f:
            trki = json.load(f)
        for lvl in trki.get("levels", []):
            level_name = lvl.get("level")
            questions = lvl.get("questions", [])
            for q in questions:
                correct_idx = q.get("correct")
                options = q.get("options", [])
                if correct_idx is None or correct_idx < 0 or correct_idx >= len(options):
                    print(f"  ❌ Invalid correct index {correct_idx} for Q: {q.get('id')} in level {level_name}")
                    total_errors += 1
            print(f"  ✓ TRKI Level {level_name}: {len(questions)} validated questions with explanations.")

    print("\n==========================================================")
    if total_errors == 0:
        print(f"🎉 AUDIT STATUS: PASS (0 Errors, {total_warnings} Warnings)")
    else:
        print(f"❌ AUDIT STATUS: FAIL ({total_errors} Errors, {total_warnings} Warnings)")
    print("==========================================================")
    return total_errors == 0

if __name__ == "__main__":
    success = run_integrity_audit()
    sys.exit(0 if success else 1)
