import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

VOCAB_PATH = r"c:\LeDucLuong\HK VII\USSR_Study\WEB_USSR\data\vocab_lexical_min.json"

with open(VOCAB_PATH, 'r', encoding='utf-8') as f:
    vocab = json.load(f)

# Contextual case templates for core nouns
case_samples = {
    "дом": {
        "case_1": "Это большой красивый дом. (Nom - Chủ ngữ)",
        "case_2": "Около этого дома есть парк. (Gen - Gần ngôi nhà)",
        "case_3": "Мы подъезжаем к дому. (Dat - Đến gần nhà)",
        "case_4": "Я вижу новый дом. (Acc - Nhìn thấy ngôi nhà)",
        "case_5": "За домом находится сад. (Inst - Đằng sau ngôi nhà)",
        "case_6": "Мы живём в этом доме. (Prep - Sống trong ngôi nhà này)"
    },
    "кни́га": {
        "case_1": "Это интересная книга. (Nom - Đây là cuốn sách hay)",
        "case_2": "У меня нет этой книги. (Gen - Tôi không có cuốn sách này)",
        "case_3": "Я подхожу к книге. (Dat - Hướng tới cuốn sách)",
        "case_4": "Я читаю интересную книгу. (Acc - Tôi đọc cuốn sách)",
        "case_5": "Я интересуюсь этой книгой. (Inst - Tôi hứng thú với cuốn sách)",
        "case_6": "Мы говорим об этой книге. (Prep - Chúng tôi nói về cuốn sách)"
    },
    "го́род": {
        "case_1": "Москва — красивый город. (Nom)",
        "case_2": "Я приехал из другого города. (Gen)",
        "case_3": "Мы гуляем по городу. (Dat)",
        "case_4": "Я люблю этот город. (Acc)",
        "case_5": "Перед городом течёт река. (Inst)",
        "case_6": "Мы живём в городе. (Prep)"
    },
    "друг": {
        "case_1": "Мой друг живёт здесь. (Nom)",
        "case_2": "У меня нет лучшего друга. (Gen)",
        "case_3": "Я звоню своему другу. (Dat)",
        "case_4": "Я жду старого друга. (Acc animate)",
        "case_5": "Я гуляю с другом. (Inst)",
        "case_6": "Я часто думаю о друге. (Prep)"
    },
    "брат": {
        "case_1": "Мой брат учится в школе. (Nom)",
        "case_2": "У меня нет старшего брата. (Gen)",
        "case_3": "Я помогаю брату. (Dat)",
        "case_4": "Я вижу своего брата. (Acc animate)",
        "case_5": "Я горжусь своим братом. (Inst)",
        "case_6": "Я забочусь о брате. (Prep)"
    },
    "окно́": {
        "case_1": "Это светлое окно. (Nom)",
        "case_2": "Около окна стоит стол. (Gen)",
        "case_3": "Я подхожу к окну. (Dat)",
        "case_4": "Я открываю окно. (Acc)",
        "case_5": "Под окном растут цветы. (Inst)",
        "case_6": "На окне лежит кошка. (Prep)"
    },
    "слова́рь": {
        "case_1": "Это русско-вьетнамский словарь. (Nom)",
        "case_2": "Без словаря трудно переводить. (Gen)",
        "case_3": "Я обращаюсь к словарю. (Dat)",
        "case_4": "Я купил новый словарь. (Acc)",
        "case_5": "Я пользуюсь словарём. (Inst)",
        "case_6": "В словаре много новых слов. (Prep)"
    },
    "ма́ма": {
        "case_1": "Моя мама — врач. (Nom)",
        "case_2": "У меня нет подарка для мамы. (Gen)",
        "case_3": "Я дарю цветы маме. (Dat)",
        "case_4": "Я очень люблю маму. (Acc)",
        "case_5": "Я гуляю с мамой. (Inst)",
        "case_6": "Я часто рассказываю о маме. (Prep)"
    }
}

for item in vocab:
    w = item["word"]
    clean_w = w.replace('́', '')
    if w in case_samples:
        item["case_contexts"] = case_samples[w]
    elif clean_w in case_samples:
        item["case_contexts"] = case_samples[clean_w]
    else:
        # Default placeholder template if noun
        if item["gender"] in ["он", "она", "оно"]:
            item["case_contexts"] = {
                "case_1": f"Это {w}. (Nom - Chủ ngữ)",
                "case_2": f"У меня нет этого ({w}). (Gen - Phủ định)",
                "case_3": f"Я подхожу к ({w}). (Dat - Hướng đến)",
                "case_4": f"Я вижу ({w}). (Acc - Bổ ngữ)",
                "case_5": f"Я работаю с ({w}). (Inst - Cùng với)",
                "case_6": f"Мы думаем о ({w}). (Prep - Về)"
            }

with open(VOCAB_PATH, 'w', encoding='utf-8') as f:
    json.dump(vocab, f, ensure_ascii=False, indent=2)

print("Enriched vocabulary items with 6-case contextual sentences!", flush=True)
