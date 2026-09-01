import os
import json
import glob
import sys

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = r"c:\LeDucLuong\HK VII\USSR_Study\WEB_USSR\data"

def run_integrity_audit():
    print("==========================================================")
    print("🔍 RUSSIAN DATA INTEGRITY & QUALITY AUDIT (PHASE 2)")
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

    print("\n--- 2. Auditing Curriculum Tree & 10-Step Lesson Coverage ---")
    curriculum_p = os.path.join(DATA_DIR, "curriculum_tree.json")
    if os.path.exists(curriculum_p):
        with open(curriculum_p, "r", encoding="utf-8") as f:
            curriculum = json.load(f)
        mods = curriculum.get("modules", [])
        total_lessons = sum(len(m.get("lessons", [])) for m in mods)
        print(f"  ✓ {len(mods)} Modules defined across TRKI levels: Pre-A1 to B1.1")
        print(f"  ✓ Total Sequential Lessons: {total_lessons}")
        for m in mods:
            for l in m.get("lessons", []):
                req_fields = ["id", "objective_code", "title", "why_learn", "theory_markdown", "context_examples", "practice_exercises"]
                for rf in req_fields:
                    if rf not in l:
                        print(f"  ❌ Missing '{rf}' in lesson {l.get('id')}")
                        total_errors += 1
    else:
        print(f"  ❌ File not found: {curriculum_p}")
        total_errors += 1

    print("\n--- 3. Auditing Vocabulary & Contextual Case Sentences ---")
    vocab_p = os.path.join(DATA_DIR, "vocab_lexical_min.json")
    if os.path.exists(vocab_p):
        with open(vocab_p, "r", encoding="utf-8") as f:
            vocab = json.load(f)
        
        ids = set()
        nouns_with_cases = 0
        for idx, item in enumerate(vocab):
            item_id = item.get("id", f"idx_{idx}")
            if item_id in ids:
                print(f"  ❌ Duplicate ID detected in vocab: {item_id}")
                total_errors += 1
            ids.add(item_id)
            if "case_contexts" in item:
                nouns_with_cases += 1
        print(f"  ✓ Checked {len(vocab)} vocabulary items. Items with 6-Case Context Sentences: {nouns_with_cases}")
    else:
        print(f"  ⚠️ File not found: {vocab_p}")
        total_warnings += 1

    print("\n--- 4. Auditing 6 Cases Matrix & Conjugation Rules ---")
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
