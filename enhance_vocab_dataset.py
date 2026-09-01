import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

VOCAB_PATH = r"c:\LeDucLuong\HK VII\USSR_Study\WEB_USSR\data\vocab_lexical_min.json"

with open(VOCAB_PATH, 'r', encoding='utf-8') as f:
    vocab_list = json.load(f)

# Mapping irregular or important plurals and metadata
plural_map = {
    "дом": "дома́",
    "го́род": "города́",
    "друг": "друзья́",
    "брат": "бра́тья",
    "челове́к": "лю́ди",
    "сестра́": "сёстры",
    "ма́ма": "ма́мы",
    "па́па": "па́пы",
    "де́душка": "де́душки",
    "ба́бушка": "ба́бушки",
    "сын": "сыновья́",
    "дочь": "до́чери",
    "студе́нт": "студе́нты",
    "студе́нтка": "студе́нтки",
    "кни́га": "кни́ги",
    "окно́": "о́кна",
    "слова́рь": "словари́",
    "тетра́дь": "тетра́ди",
    "ру́чка": "ру́чки",
    "каранда́ш": "карандаши́",
    "стол": "столы́",
    "у́лица": "у́лицы",
    "пло́щадь": "пло́щади",
    "биле́т": "биле́ты",
    "по́езд": "поезда́",
    "вокза́л": "вокза́лы",
    "аэропо́рт": "аэропо́рты",
    "гости́ница": "гости́ницы",
    "преподава́тель": "преподава́тели",
    "борщ": "борщи́",
    "пельме́ни": "пельме́ни",
    "хлеб": "хлеба́",
    "чай": "чаи́",
    "сыр": "сыры́",
    "ры́ба": "ры́бы",
    "блины́": "блины́",
    "сала́т": "сала́ты",
    "рестора́н": "рестора́ны",
    "о́бщество": "о́бщества",
    "госуда́рство": "госуда́рства",
    "зако́н": "зако́ны",
    "иссле́дование": "иссле́дования",
    "достиже́ние": "достиже́ния"
}

for item in vocab_list:
    w = item["word"]
    clean_w = w.replace('́', '')
    
    # Assign plural if noun
    if item["gender"] in ["он", "она", "оно"]:
        item["plural_form"] = plural_map.get(w, plural_map.get(clean_w, clean_w + "ы/и"))
    else:
        item["plural_form"] = "-"
    
    # Sub-level tagging for adaptive learning
    if item["level"] == "A1":
        if item["topic"] in ["Đại từ & Chào hỏi", "Gia đình"]:
            item["sub_level"] = "Pre-A1 / A1.1"
        else:
            item["sub_level"] = "A1.2"
    elif item["level"] == "A2":
        item["sub_level"] = "A2.1"
    else:
        item["sub_level"] = "B1.1"

with open(VOCAB_PATH, 'w', encoding='utf-8') as f:
    json.dump(vocab_list, f, ensure_ascii=False, indent=2)

print(f"Enhanced {len(vocab_list)} vocabulary records with plural forms and sub-levels!", flush=True)
