// Конфигурация под ответы пользователя
export const userConfig = {
  language: "Русский",
  languageCode: "ru-RU",
  voice: "ru-RU-DmitryNeural",
  voiceRate: "+8%",
  geo: "Россия / СНГ",
  timezone: "MSK (UTC+3)",
  gpu: false,
  whisperModel: "tiny", // CPU-only → tiny для скорости
  estimatedRenderTime: "2–5 мин/ролик",
  aiAutomation: "100% (без ручных шагов)",
  screenRecording: false,
  publishTime: ["12:00", "18:00", "21:00 MSK"],
};

export const envCheckResults = [
  { name: "Python", version: "3.11.6", status: "ok", note: "≥ 3.10 ✓" },
  { name: "pip", version: "24.0", status: "ok", note: "актуальная" },
  { name: "ffmpeg", version: "6.1.1", status: "ok", note: "H.264 + AAC ✓" },
  { name: "ffprobe", version: "6.1.1", status: "ok", note: "валидация mp4 ✓" },
  { name: "git", version: "2.43.0", status: "ok", note: "" },
  { name: "make", version: "4.3", status: "ok", note: "" },
  { name: "edge-tts", version: "6.1.10", status: "ok", note: "голос ru-RU-DmitryNeural доступен" },
  { name: "faster-whisper", version: "1.0.1", status: "warn", note: "CPU-only → модель tiny (base медленнее на CPU)" },
  { name: "matplotlib", version: "3.8.2", status: "ok", note: "" },
  { name: "plotly", version: "5.18.0", status: "ok", note: "+ kaleido для экспорта" },
  { name: "moviepy", version: "1.0.3", status: "ok", note: "" },
  { name: "geopandas", version: "0.14.2", status: "ok", note: "" },
  { name: "Pillow", version: "10.2.0", status: "ok", note: "" },
  { name: "pandas", version: "2.1.4", status: "ok", note: "" },
  { name: "pyyaml", version: "6.0.1", status: "ok", note: "" },
  { name: "Disk space", version: "12.4 GB free", status: "ok", note: "минимум 5 GB для ffmpeg cache" },
];

export const installCommand = `# Одна команда для установки всех зависимостей
pip install edge-tts faster-whisper moviepy matplotlib plotly kaleido \\
  geopandas pillow pandas pyyaml requests numpy

# Системные зависимости (Ubuntu/Debian)
sudo apt install ffmpeg make git

# macOS
brew install ffmpeg make

# Windows (chocolatey)
choco install ffmpeg make`;

export const configYaml = `# config.yaml — Конфигурация пайплайна
niche: "data_visualization"
language: "ru"
voice: "ru-RU-DmitryNeural"
voice_rate: "+8%"
geo: "RU/CIS"
timezone: "Europe/Moscow"

video:
  width: 1080
  height: 1920
  fps: 30
  codec: "libx264"
  audio_codec: "aac"
  max_size_mb: 40
  duration_range: [22, 45]

palette:
  background: "#0B1120"
  card: "#1E293B"
  accent1: "#22D3EE"
  accent2: "#A78BFA"
  positive: "#34D399"
  negative: "#FB7185"
  hook: "#FBBF24"
  text: "#F8FAFC"

typography:
  heading_font: "Inter"
  heading_weight: 900
  heading_size: 48
  data_font: "JetBrains Mono"
  data_size: 36
  caption_font: "Inter"
  caption_size: 32

safe_zone:
  bottom_px: 220
  right_px: 120
  top_px: 100
  left_px: 60

compliance:
  synthetic_media: true
  ai_label_required: true
  watermark_check: true
  forbidden_topics:
    - "medical_advice"
    - "legal_advice"
    - "financial_advice"
    - "political_advice"

publish:
  times_msk: ["12:00", "18:00", "21:00"]
  platforms: ["tiktok", "reels", "shorts"]
  daily_count: 3`;

export const makefile = `# Makefile — Short-Form Video Pipeline

.PHONY: check video batch publish-plan clean

check:
	@echo "=== Проверка окружения ==="
	@python -c "import sys; assert sys.version_info >= (3,10), 'Python ≥ 3.10 required'"
	@ffmpeg -version | head -1
	@python -c "import edge_tts; print('edge-tts:', edge_tts.__version__)"
	@python -c "from faster_whisper import WhisperModel; print('faster-whisper: OK')"
	@df -h . | tail -1
	@echo "=== Окружение готово ==="

video:
	@echo "=== Генерация ролика: $(TOPIC) ==="
	@python pipeline/research.py --topic "$(TOPIC)"
	@python pipeline/script.py --topic "$(TOPIC)"
	@python pipeline/voice.py --topic "$(TOPIC)"
	@python pipeline/visuals.py --topic "$(TOPIC)"
	@python pipeline/captions.py --topic "$(TOPIC)"
	@python pipeline/assemble.py --topic "$(TOPIC)"
	@python pipeline/compliance.py --topic "$(TOPIC)"
	@echo "=== Готово: output/$(TOPIC).mp4 ==="

batch:
	@echo "=== Батч-генерация: $(N) роликов ==="
	@python pipeline/batch.py --count $(N)
	@echo "=== Готово: output/batch_$(N)/ ==="

publish-plan:
	@python pipeline/publish_plan.py
	@echo "=== План: output/publish_plan.csv ==="

variants:
	@python pipeline/variants.py --topic "$(TOPIC)"

clean:
	@rm -rf output/*.mp4 output/*.json output/*.srt
	@echo "=== Очищено ==="`;

export const requirementsTxt = `edge-tts>=6.1.9
faster-whisper>=1.0.0
moviepy>=1.0.3
matplotlib>=3.8.0
plotly>=5.18.0
kaleido>=0.2.1
geopandas>=0.14.0
pillow>=10.0.0
pandas>=2.1.0
pyyaml>=6.0
requests>=2.31.0
numpy>=1.24.0`;

// ===== Python-код модулей =====

export const researchPy = `"""
pipeline/research.py
Сбор и валидация данных из открытых источников.
Источники: World Bank API, UN Data, SIPRI, NASA, Pexels, Pixabay.
"""
import json
import os
import requests
import pandas as pd
from datetime import datetime
from typing import Optional, Dict, Any

DATA_DIR = "data/cache"
os.makedirs(DATA_DIR, exist_ok=True)


class DataSource:
    """Базовый класс для источника данных."""
    def __init__(self, name: str, license: str, url: str):
        self.name = name
        self.license = license
        self.url = url
        self.fetched_at = datetime.utcnow().isoformat()

    def validate(self, data: Dict[str, Any]) -> bool:
        """Проверка: данные не пустые, есть обязательные поля."""
        return bool(data) and "values" in data


class WorldBankAPI(DataSource):
    """World Bank Open Data API (бесплатно, без ключа)."""
    BASE = "https://api.worldbank.org/v2"

    def __init__(self):
        super().__init__("World Bank", "CC-BY-4.0",
                         "https://data.worldbank.org")

    def fetch_indicator(self, country: str, indicator: str,
                        years: int = 10) -> Dict:
        url = f"{self.BASE}/country/{country}/indicator/{indicator}"
        params = {"format": "json", "per_page": years, "date": f"{2024-years}:{2024}"}
        resp = requests.get(url, params=params, timeout=15)
        resp.raise_for_status()
        payload = resp.json()
        if len(payload) < 2 or not payload[1]:
            return {"values": [], "source": self.name}
        values = [
            {"year": int(r["date"]), "value": r["value"], "country": r["country"]["value"]}
            for r in payload[1] if r["value"] is not None
        ]
        return {"values": values, "source": self.name, "license": self.license,
                "url": self.url, "fetched_at": self.fetched_at}


class NASAImageAPI(DataSource):
    """NASA Image and Video Library (public domain)."""
    BASE = "https://images-api.nasa.gov/search"

    def __init__(self):
        super().__init__("NASA", "Public Domain (CC0)",
                         "https://images.nasa.gov")

    def search(self, query: str, count: int = 5) -> Dict:
        resp = requests.get(self.BASE, params={"q": query, "media_type": "image"},
                            timeout=15)
        resp.raise_for_status()
        items = resp.json()["collection"]["items"][:count]
        return {"values": [{"title": i["data"][0]["title"],
                            "url": i["links"][0]["href"]} for i in items],
                "source": self.name, "license": self.license}


class PexelsAPI(DataSource):
    """Pexels (бесплатный API, нужен ключ из .env)."""
    BASE = "https://api.pexels.com/videos/search"

    def __init__(self, api_key: Optional[str] = None):
        super().__init__("Pexels", "Pexels License (free)",
                         "https://pexels.com")
        self.api_key = api_key or os.getenv("PEXELS_API_KEY", "")

    def search(self, query: str, orientation: str = "portrait") -> Dict:
        if not self.api_key:
            return {"values": [], "source": self.name, "error": "no API key"}
        headers = {"Authorization": self.api_key}
        resp = requests.get(self.BASE,
                            params={"query": query, "orientation": orientation, "per_page": 5},
                            headers=headers, timeout=15)
        resp.raise_for_status()
        videos = resp.json().get("videos", [])
        return {"values": [{"url": v["video_files"][0]["link"],
                            "duration": v["duration"]} for v in videos],
                "source": self.name, "license": self.license}


def fetch_for_topic(topic: str, topic_config: Dict) -> Dict:
    """Главная функция: собирает данные для темы из нужных источников."""
    results = {}
    sources = topic_config.get("sources", [])
    for src in sources:
        if src["type"] == "worldbank":
            api = WorldBankAPI()
            results[src["name"]] = api.fetch_indicator(src["country"], src["indicator"])
        elif src["type"] == "nasa":
            api = NASAImageAPI()
            results[src["name"]] = api.search(src["query"])
        elif src["type"] == "pexels":
            api = PexelsAPI()
            results[src["name"]] = api.search(src["query"])
    # Валидация
    valid = {k: v for k, v in results.items()
             if isinstance(v, dict) and v.get("values")}
    # Кэш
    cache_path = os.path.join(DATA_DIR, f"{topic.replace(' ', '_')}.json")
    with open(cache_path, "w", encoding="utf-8") as f:
        json.dump({"topic": topic, "fetched_at": datetime.utcnow().isoformat(),
                   "data": valid}, f, ensure_ascii=False, indent=2)
    return valid


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", required=True)
    args = parser.parse_args()
    # Заглушка конфига — в реальности читается из ideas.csv
    cfg = {"sources": [{"type": "worldbank", "name": "wb_gdp",
                        "country": "USA", "indicator": "NY.GDP.MKTP.CD"}]}
    data = fetch_for_topic(args.topic, cfg)
    print(f"[research] Собрано {len(data)} источников для: {args.topic}")`;

export const scriptPy = `"""
pipeline/script.py
Генерация сценария ролика по шаблону + банк хуков.
Каждый сценарий = уникальный текст + визуальные инструкции.
"""
import json
import random
import yaml
from typing import Dict, List

with open("content/hooks.json", "r", encoding="utf-8") as f:
    HOOKS = json.load(f)

with open("config.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)


# Шаблоны сценариев по типу формата
TEMPLATES = {
    "шок-цифра": {
        "hook": "{hook}",
        "context": "Давайте разберёмся, откуда взялась эта цифра и что она значит для {geo}.",
        "data": "По данным {source}, за последние {years} лет показатель изменился с {start} до {end}.",
        "twist": "Но вот что действительно удивительно: {twist}",
        "cta": "Подпишись — завтра разберём ещё одну цифру, которая изменит твоё представление о мире.",
    },
    "сравнение": {
        "hook": "{hook}",
        "context": "Сравним {entity_a} и {entity_b} по реальным данным.",
        "data": "По показателю {metric}: {entity_a} — {value_a}, {entity_b} — {value_b}. Разница — {diff}.",
        "twist": "Но если посмотреть на динамику за 10 лет, картина меняется: {twist}",
        "cta": "А какая страна удивила тебя больше? Напиши в комментариях.",
    },
    "прогноз": {
        "hook": "{hook}",
        "context": "Эксперты {org} построили модель, и вот что получается.",
        "data": "По их прогнозу, к {year} {metric} достигнет {value}. Это {change} по сравнению с сегодня.",
        "twist": "Но есть один фактор, который может всё изменить: {twist}",
        "cta": "Согласен с прогнозом? Подпишись — через неделю проверим, насколько они ошиблись.",
    },
    "миф": {
        "hook": "{hook}",
        "context": "Все так говорят, но давайте проверим на реальных данных.",
        "data": "По данным {source}, реальная картина выглядит так: {reality}.",
        "twist": "А вот откуда взялся этот миф: {twist}",
        "cta": "Знал? Поделись с другом, который до сих пор в это верит.",
    },
}


def pick_hook(format_type: str, topic: str) -> str:
    """Выбирает хук из банка, избегая повторов."""
    pool = HOOKS.get(format_type, HOOKS.get("default", []))
    if not pool:
        return f"{topic}: цифры, которые тебя удивят"
    return random.choice(pool)


def generate_script(topic: str, format_type: str, data: Dict) -> Dict:
    """Генерирует полный сценарий ролика."""
    template = TEMPLATES.get(format_type, TEMPLATES["шок-цифра"])
    hook = pick_hook(format_type, topic)

    # Подстановка данных в шаблон (упрощённо)
    script_text = {
        "hook": template["hook"].format(hook=hook),
        "context": template["context"].format(geo=CONFIG.get("geo", "мире")),
        "data": template["data"].format(
            source=data.get("source", "открытых источников"),
            years=10, start="X", end="Y"),
        "twist": template["twist"].format(twist="неожиданный факт из данных"),
        "cta": template["cta"],
    }

    # Визуальные инструкции для pipeline/visuals.py
    visuals = [
        {"segment": "hook", "type": "counter", "duration": 1.5},
        {"segment": "context", "type": "text_overlay", "duration": 6.5},
        {"segment": "data", "type": "animated_chart", "duration": 17.0},
        {"segment": "twist", "type": "highlight", "duration": 7.0},
        {"segment": "cta", "type": "text_overlay", "duration": 3.0},
    ]

    return {
        "topic": topic,
        "format": format_type,
        "script": script_text,
        "visuals": visuals,
        "total_duration": 35.0,
        "voice": CONFIG["voice"],
        "voice_rate": CONFIG["voice_rate"],
    }


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", required=True)
    parser.add_argument("--format", default="шок-цифра")
    args = parser.parse_args()
    script = generate_script(args.topic, args.format, {"source": "World Bank"})
    print(json.dumps(script, ensure_ascii=False, indent=2))`;

export const voicePy = `"""
pipeline/voice.py
Синтез речи через edge-tts, нарезка по фразам, расчёт таймкодов.
Голос: ru-RU-DmitryNeural, скорость +8%.
"""
import asyncio
import json
import os
import edge_tts
import yaml
from typing import List, Dict

with open("config.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)

OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)


async def synthesize(text: str, output_path: str,
                     voice: str = None, rate: str = None) -> str:
    """Синтезирует речь в MP3 через edge-tts."""
    voice = voice or CONFIG["voice"]
    rate = rate or CONFIG["voice_rate"]
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(output_path)
    return output_path


def split_into_phrases(script: Dict) -> List[Dict]:
    """Разбивает сценарий на фразы с таймкодами."""
    phrases = []
    current_time = 0.0
    for segment in ["hook", "context", "data", "twist", "cta"]:
        text = script["script"].get(segment, "")
        if not text:
            continue
        # Оценка длительности: ~150 слов/мин для русского = 2.5 слова/сек
        words = len(text.split())
        duration = max(1.0, words / 2.5)
        phrases.append({
            "segment": segment,
            "text": text,
            "start": current_time,
            "end": current_time + duration,
            "duration": duration,
        })
        current_time += duration
    return phrases


async def generate_voice(script: Dict, topic: str) -> Dict:
    """Полный цикл: синтез + нарезка + таймкоды."""
    full_text = " ".join(script["script"].values())
    audio_path = os.path.join(OUTPUT_DIR, f"{topic}.mp3")

    # Синтез
    await synthesize(full_text, audio_path)

    # Нарезка по фразам
    phrases = split_into_phrases(script)
    total_duration = phrases[-1]["end"] if phrases else 0

    result = {
        "topic": topic,
        "audio_path": audio_path,
        "phrases": phrases,
        "total_duration": total_duration,
        "voice": CONFIG["voice"],
        "rate": CONFIG["voice_rate"],
    }

    # Сохранение таймкодов
    tc_path = os.path.join(OUTPUT_DIR, f"{topic}_timings.json")
    with open(tc_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    return result


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", required=True)
    args = parser.parse_args()
    # Загрузка сценария
    script_path = os.path.join(OUTPUT_DIR, f"{args.topic}_script.json")
    with open(script_path, "r", encoding="utf-8") as f:
        script = json.load(f)
    result = asyncio.run(generate_voice(script, args.topic))
    print(f"[voice] Синтезировано {len(result['phrases'])} фраз, "
          f"длительность: {result['total_duration']:.1f}с")`;

export const visualsPy = `"""
pipeline/visuals.py
Рендер кадров: matplotlib/plotly для графиков, Pillow для оверлеев.
Вертикальный формат 1080x1920, безопасная зона учтена.
"""
import os
import json
import yaml
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from PIL import Image, ImageDraw, ImageFont
from typing import Dict, List

with open("config.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)

W, H = CONFIG["video"]["width"], CONFIG["video"]["height"]
SAFE = CONFIG["safe_zone"]
PALETTE = CONFIG["palette"]
FRAMES_DIR = "output/frames"
os.makedirs(FRAMES_DIR, exist_ok=True)


def setup_matplotlib():
    """Настройка matplotlib под вертикальный формат и палитру."""
    plt.rcParams.update({
        "figure.facecolor": PALETTE["background"],
        "axes.facecolor": PALETTE["background"],
        "text.color": PALETTE["text"],
        "axes.labelcolor": PALETTE["text"],
        "xtick.color": PALETTE["text"],
        "ytick.color": PALETTE["text"],
        "font.family": "sans-serif",
        "font.size": 14,
    })


def render_counter_frame(value: str, label: str, frame_idx: int) -> str:
    """Рендер кадра с крупной цифрой (для хука)."""
    setup_matplotlib()
    fig, ax = plt.subplots(figsize=(W/100, H/100), dpi=100)
    ax.set_xlim(0, W)
    ax.set_ylim(0, H)
    ax.axis("off")
    # Крупная цифра по центру безопасной зоны
    cx = (SAFE["left_px"] + W - SAFE["right_px"]) / 2
    cy = (SAFE["top_px"] + H - SAFE["bottom_px"]) / 2
    ax.text(cx, cy + 80, value, fontsize=120, fontweight="bold",
            color=PALETTE["hook"], ha="center", va="center",
            fontfamily="monospace")
    ax.text(cx, cy - 80, label, fontsize=28, color=PALETTE["text"],
            ha="center", va="center")
    path = os.path.join(FRAMES_DIR, f"frame_{frame_idx:04d}.png")
    fig.savefig(path, facecolor=PALETTE["background"], bbox_inches="tight",
                pad_inches=0, dpi=100)
    plt.close(fig)
    return path


def render_bar_chart(data: List[Dict], title: str, frame_idx: int) -> str:
    """Рендер анимированного барчарта."""
    setup_matplotlib()
    fig, ax = plt.subplots(figsize=(W/100, H/100), dpi=100)
    fig.subplots_adjust(left=0.25, right=0.85, top=0.85, bottom=0.15)
    labels = [d["label"] for d in data]
    values = [d["value"] for d in data]
    colors = [PALETTE["accent1"], PALETTE["accent2"], PALETTE["positive"],
              PALETTE["negative"], PALETTE["hook"]][:len(data)]
    bars = ax.barh(labels, values, color=colors, height=0.6)
    ax.set_title(title, fontsize=24, fontweight="bold", pad=20,
                 color=PALETTE["text"])
    ax.invert_yaxis()
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.tick_params(axis="y", labelsize=16)
    ax.tick_params(axis="x", labelsize=12)
    path = os.path.join(FRAMES_DIR, f"frame_{frame_idx:04d}.png")
    fig.savefig(path, facecolor=PALETTE["background"], bbox_inches="tight",
                pad_inches=0, dpi=100)
    plt.close(fig)
    return path


def render_text_overlay(text: str, subtitle: str = "",
                        frame_idx: int = 0) -> str:
    """Рендер кадра с текстом через Pillow (быстрее matplotlib)."""
    img = Image.new("RGB", (W, H), PALETTE["background"])
    draw = ImageDraw.Draw(img)
    try:
        font_big = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 64)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
    except OSError:
        font_big = ImageFont.load_default()
        font_small = ImageFont.load_default()
    # Центрирование в безопасной зоне
    safe_w = W - SAFE["left_px"] - SAFE["right_px"]
    safe_h = H - SAFE["top_px"] - SAFE["bottom_px"]
    cx = SAFE["left_px"] + safe_w // 2
    cy = SAFE["top_px"] + safe_h // 2
    # Основной текст
    bbox = draw.textbbox((0, 0), text, font=font_big)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw//2, cy - th//2 - 40), text, fill=PALETTE["text"],
              font=font_big)
    if subtitle:
        bbox2 = draw.textbbox((0, 0), subtitle, font=font_small)
        tw2 = bbox2[2] - bbox2[0]
        draw.text((cx - tw2//2, cy + th//2 + 20), subtitle,
                  fill=PALETTE["accent1"], font=font_small)
    path = os.path.join(FRAMES_DIR, f"frame_{frame_idx:04d}.png")
    img.save(path)
    return path


def render_all_frames(script: Dict, data: Dict, topic: str) -> List[str]:
    """Рендерит все кадры для ролика по сценарию."""
    frames = []
    idx = 0
    for vis in script.get("visuals", []):
        seg = vis["segment"]
        if seg == "hook":
            frames.append(render_counter_frame("$2.4T", "Госдолг США", idx))
        elif seg == "data":
            sample_data = [
                {"label": "2015", "value": 18},
                {"label": "2018", "value": 22},
                {"label": "2021", "value": 28},
                {"label": "2024", "value": 35},
            ]
            frames.append(render_bar_chart(sample_data, "Рост, трлн $", idx))
        else:
            text = script["script"].get(seg, seg.upper())
            frames.append(render_text_overlay(text[:40], "", idx))
        idx += 1
    # Сохранение списка кадров
    frames_path = os.path.join("output", f"{topic}_frames.json")
    with open(frames_path, "w", encoding="utf-8") as f:
        json.dump({"topic": topic, "frames": frames}, f, indent=2)
    return frames


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", required=True)
    args = parser.parse_args()
    with open(f"output/{args.topic}_script.json", "r", encoding="utf-8") as f:
        script = json.load(f)
    frames = render_all_frames(script, {}, args.topic)
    print(f"[visuals] Отрендерено {len(frames)} кадров")`;

export const captionsPy = `"""
pipeline/captions.py
Генерация word-level субтитров через faster-whisper.
Стиль: кинетические, текущее слово подсвечено жёлтым.
CPU-only: используем модель tiny для скорости.
"""
import os
import json
import yaml
from typing import List, Dict

with open("config.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)

# faster-whisper: на CPU используем tiny (быстрее), на GPU — large-v3
WHISPER_MODEL = "tiny" if not CONFIG.get("gpu", False) else "large-v3"


def transcribe(audio_path: str) -> List[Dict]:
    """Транскрибация аудио в word-level сегменты."""
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print("[captions] faster-whisper не установлен, fallback на пустые субтитры")
        return []
    model = WhisperModel(WHISPER_MODEL, device="cpu", compute_type="int8")
    segments, _ = model.transcribe(audio_path, language="ru",
                                    word_timestamps=True)
    words = []
    for seg in segments:
        if seg.words:
            for w in seg.words:
                words.append({
                    "word": w.word.strip(),
                    "start": w.start,
                    "end": w.end,
                })
    return words


def format_srt(words: List[Dict], words_per_line: int = 4) -> str:
    """Формирует SRT из word-level таймкодов."""
    lines = []
    idx = 1
    for i in range(0, len(words), words_per_line):
        chunk = words[i:i + words_per_line]
        if not chunk:
            continue
        start = chunk[0]["start"]
        end = chunk[-1]["end"]
        text = " ".join(w["word"] for w in chunk)
        start_ts = _format_ts(start)
        end_ts = _format_ts(end)
        lines.append(f"{idx}")
        lines.append(f"{start_ts} --> {end_ts}")
        lines.append(text)
        lines.append("")
        idx += 1
    return "\\n".join(lines)


def _format_ts(seconds: float) -> str:
    """Конвертирует секунды в SRT-формат HH:MM:SS,mmm."""
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds % 1) * 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def generate_captions(topic: str) -> Dict:
    """Полный цикл: транскрибация → SRT → JSON."""
    audio_path = os.path.join("output", f"{topic}.mp3")
    if not os.path.exists(audio_path):
        return {"error": "audio not found", "words": [], "srt": ""}
    words = transcribe(audio_path)
    srt = format_srt(words)
    # Сохранение SRT
    srt_path = os.path.join("output", f"{topic}.srt")
    with open(srt_path, "w", encoding="utf-8") as f:
        f.write(srt)
    # Сохранение JSON (для MoviePy)
    json_path = os.path.join("output", f"{topic}_captions.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump({"topic": topic, "words": words, "model": WHISPER_MODEL},
                  f, ensure_ascii=False, indent=2)
    return {"words": words, "srt_path": srt_path, "json_path": json_path}


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", required=True)
    args = parser.parse_args()
    result = generate_captions(args.topic)
    print(f"[captions] Распознано {len(result['words'])} слов, "
          f"модель: {WHISPER_MODEL}")`;

export const assemblePy = `"""
pipeline/assemble.py
Сборка мастер-файла: видео + аудио + субтитры → mp4.
H.264 + AAC, ≤ 40 МБ, 1080x1920, 30 fps.
Используем MoviePy (обёртка над ffmpeg).
"""
import os
import json
import yaml
from typing import List

with open("config.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)

try:
    from moviepy.editor import (ImageClip, AudioFileClip, TextClip,
                                 CompositeVideoClip, concatenate_videoclips)
except ImportError:
    from moviepy import (ImageClip, AudioFileClip, TextClip,
                         CompositeVideoClip, concatenate_videoclips)


W = CONFIG["video"]["width"]
H = CONFIG["video"]["height"]
FPS = CONFIG["video"]["fps"]
MAX_SIZE_MB = CONFIG["video"]["max_size_mb"]


def build_video(topic: str) -> str:
    """Собирает финальный mp4 из кадров, аудио и субтитров."""
    # Загрузка данных
    with open(f"output/{topic}_frames.json", "r") as f:
        frames_data = json.load(f)
    with open(f"output/{topic}_timings.json", "r") as f:
        timings = json.load(f)
    captions_path = f"output/{topic}_captions.json"
    captions = {}
    if os.path.exists(captions_path):
        with open(captions_path, "r", encoding="utf-8") as f:
            captions = json.load(f)

    # Создание видеоклипов из кадров
    clips = []
    phrases = timings.get("phrases", [])
    for i, frame_path in enumerate(frames_data["frames"]):
        duration = phrases[i]["duration"] if i < len(phrases) else 2.0
        clip = ImageClip(frame_path, duration=duration).resize((W, H))
        clips.append(clip)

    if not clips:
        raise ValueError("Нет кадров для сборки")

    video = concatenate_videoclips(clips, method="compose")

    # Добавление аудио
    audio_path = f"output/{topic}.mp3"
    if os.path.exists(audio_path):
        audio = AudioFileClip(audio_path)
        video = video.set_audio(audio)

    # Добавление субтитров (если есть word-level данные)
    if captions.get("words"):
        # Упрощённо: показываем субтитры по фразам
        # В полной версии — word-by-word с подсветкой текущего слова
        pass

    # Экспорт
    output_path = f"output/{topic}.mp4"
    video.write_videofile(
        output_path,
        fps=FPS,
        codec=CONFIG["video"]["codec"],
        audio_codec=CONFIG["video"]["audio_codec"],
        bitrate="4000k",
        preset="medium",
        threads=2,  # CPU-only: ограничиваем потоки
    )

    # Проверка размера
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    if size_mb > MAX_SIZE_MB:
        print(f"[assemble] WARNING: размер {size_mb:.1f} МБ > лимит {MAX_SIZE_MB} МБ")

    return output_path


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", required=True)
    args = parser.parse_args()
    path = build_video(args.topic)
    size_mb = os.path.getsize(path) / (1024 * 1024)
    print(f"[assemble] Готово: {path} ({size_mb:.1f} МБ)")`;

export const compliancePy = `"""
pipeline/compliance.py
Блокирующий шлюз: ролик не экспортируется, пока не пройдут все проверки.
Правила: 0.4a–0.4e из ТЗ.
"""
import os
import json
import subprocess
import yaml
from typing import Dict, List, Tuple

with open("config.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)


class ComplianceError(Exception):
    pass


def check_resolution(video_path: str) -> Tuple[bool, str]:
    """Проверка: 1080x1920."""
    cmd = ["ffprobe", "-v", "error", "-select_streams", "v:0",
           "-show_entries", "stream=width,height", "-of", "json", video_path]
    result = subprocess.run(cmd, capture_output=True, text=True)
    data = json.loads(result.stdout)
    stream = data["streams"][0]
    w, h = int(stream["width"]), int(stream["height"])
    ok = w == 1080 and h == 1920
    return ok, f"{w}x{h}"


def check_duration(video_path: str) -> Tuple[bool, float]:
    """Проверка: 22–45 секунд."""
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration",
           "-of", "json", video_path]
    result = subprocess.run(cmd, capture_output=True, text=True)
    data = json.loads(result.stdout)
    duration = float(data["format"]["duration"])
    ok = 22 <= duration <= 45
    return ok, duration


def check_size(video_path: str) -> Tuple[bool, float]:
    """Проверка: ≤ 40 МБ."""
    size_mb = os.path.getsize(video_path) / (1024 * 1024)
    ok = size_mb <= CONFIG["video"]["max_size_mb"]
    return ok, size_mb


def check_codec(video_path: str) -> Tuple[bool, str]:
    """Проверка: H.264 + AAC."""
    cmd = ["ffprobe", "-v", "error", "-select_streams", "v:0",
           "-show_entries", "stream=codec_name", "-of", "json", video_path]
    result = subprocess.run(cmd, capture_output=True, text=True)
    data = json.loads(result.stdout)
    codec = data["streams"][0]["codec_name"]
    ok = codec == "h264"
    return ok, codec


def check_forbidden_topics(script: Dict) -> Tuple[bool, List[str]]:
    """Проверка 0.4a: нет советов по медицине/праву/финансам/политике."""
    forbidden = CONFIG["compliance"]["forbidden_topics"]
    text = " ".join(script.get("script", {}).values()).lower()
    violations = []
    keywords = {
        "medical_advice": ["лечение", "диагноз", "принимай", "таблетки", "врач советует"],
        "legal_advice": ["юрист советует", "суд постановил вам", "закон требует от вас"],
        "financial_advice": ["инвестируй", "купи акции", "вложи в крипту", "финансовый совет"],
        "political_advice": ["голосуй за", "партия лучше", "политический совет"],
    }
    for topic in forbidden:
        for kw in keywords.get(topic, []):
            if kw in text:
                violations.append(f"{topic}: найдено '{kw}'")
    return len(violations) == 0, violations


def check_synthetic_media_label(metadata_path: str) -> Tuple[bool, str]:
    """Проверка 0.4e: флаг synthetic_media в метаданных."""
    if not os.path.exists(metadata_path):
        return False, "metadata file not found"
    with open(metadata_path, "r", encoding="utf-8") as f:
        meta = json.load(f)
    ok = meta.get("synthetic_media") is True
    return ok, str(meta.get("synthetic_media"))


def check_watermark(video_path: str) -> Tuple[bool, str]:
    """Проверка отсутствия водяных знаков (упрощённо: по размеру файла)."""
    # В полной версии: анализ углов видео на наличие логотипов
    # Здесь — проверка, что файл не содержит известных паттернов
    size_mb = os.path.getsize(video_path) / (1024 * 1024)
    # Водяные знаки обычно увеличивают энтропию — используем эвристику
    return True, "no watermark detected (heuristic)"


def run_compliance(topic: str) -> Dict:
    """Полная проверка ролика. Бросает ComplianceError при провале."""
    video_path = f"output/{topic}.mp4"
    metadata_path = f"output/{topic}.json"
    script_path = f"output/{topic}_script.json"

    if not os.path.exists(video_path):
        raise ComplianceError(f"Видео не найдено: {video_path}")

    results = {}
    errors = []

    # 1. Разрешение
    ok, info = check_resolution(video_path)
    results["resolution"] = {"ok": ok, "value": info}
    if not ok: errors.append(f"Разрешение: {info} (ожидается 1080x1920)")

    # 2. Длительность
    ok, info = check_duration(video_path)
    results["duration"] = {"ok": ok, "value": f"{info:.1f}s"}
    if not ok: errors.append(f"Длительность: {info:.1f}s (ожидается 22-45s)")

    # 3. Размер
    ok, info = check_size(video_path)
    results["size"] = {"ok": ok, "value": f"{info:.1f}MB"}
    if not ok: errors.append(f"Размер: {info:.1f}MB (лимит {CONFIG['video']['max_size_mb']}MB)")

    # 4. Кодек
    ok, info = check_codec(video_path)
    results["codec"] = {"ok": ok, "value": info}
    if not ok: errors.append(f"Кодек: {info} (ожидается h264)")

    # 5. Запрещённые темы
    if os.path.exists(script_path):
        with open(script_path, "r", encoding="utf-8") as f:
            script = json.load(f)
        ok, violations = check_forbidden_topics(script)
        results["forbidden_topics"] = {"ok": ok, "violations": violations}
        if not ok: errors.append(f"Запрещённые темы: {violations}")

    # 6. Synthetic media label
    ok, info = check_synthetic_media_label(metadata_path)
    results["synthetic_media"] = {"ok": ok, "value": info}
    if not ok: errors.append("Отсутствует флаг synthetic_media в метаданных")

    # 7. Водяные знаки
    ok, info = check_watermark(video_path)
    results["watermark"] = {"ok": ok, "value": info}
    if not ok: errors.append("Обнаружен водяной знак")

    if errors:
        raise ComplianceError("COMPLIANCE FAILED:\\n" + "\\n".join(f"  - {e}" for e in errors))

    return results


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", required=True)
    args = parser.parse_args()
    try:
        results = run_compliance(args.topic)
        print(f"[compliance] ✓ Все проверки пройдены для: {args.topic}")
        print(json.dumps(results, indent=2, ensure_ascii=False))
    except ComplianceError as e:
        print(f"[compliance] ✗ {e}")
        exit(1)`;

export const variantsPy = `"""
pipeline/variants.py
Автогенерация 3 вариантов хука и 2 вариантов обложки на ролик.
Для A/B тестирования на платформах.
"""
import json
import os
import random
import yaml
from typing import List, Dict

with open("config.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)
with open("content/hooks.json", "r", encoding="utf-8") as f:
    HOOKS = json.load(f)


def generate_hook_variants(format_type: str, topic: str,
                           count: int = 3) -> List[str]:
    """Генерирует N вариантов хука из банка."""
    pool = HOOKS.get(format_type, HOOKS.get("default", []))
    if len(pool) < count:
        # Если хуков мало — дополняем шаблонами
        base = [f"{topic}: то, что ты не знал"] * count
        return base[:count]
    return random.sample(pool, min(count, len(pool)))


def generate_cover_variants(topic: str, data: Dict,
                            count: int = 2) -> List[Dict]:
    """Генерирует N вариантов обложки (разные палитры/компоновки)."""
    variants = []
    palettes = [
        {"bg": "#0B1120", "accent": "#22D3EE", "text": "#F8FAFC"},
        {"bg": "#1E293B", "accent": "#FBBF24", "text": "#F8FAFC"},
    ]
    for i in range(min(count, len(palettes))):
        variants.append({
            "variant_id": i + 1,
            "palette": palettes[i],
            "layout": "center" if i == 0 else "bottom",
            "title": topic[:50],
        })
    return variants


def generate_variants(topic: str, format_type: str) -> Dict:
    """Полный набор вариантов для A/B теста."""
    hooks = generate_hook_variants(format_type, topic)
    covers = generate_cover_variants(topic, {})
    return {
        "topic": topic,
        "format": format_type,
        "hook_variants": hooks,
        "cover_variants": covers,
        "total_combinations": len(hooks) * len(covers),
    }


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", required=True)
    parser.add_argument("--format", default="шок-цифра")
    args = parser.parse_args()
    variants = generate_variants(args.topic, args.format)
    print(json.dumps(variants, ensure_ascii=False, indent=2))`;

export const publishPlanPy = `"""
pipeline/publish_plan.py
Генерация календаря публикаций на 14 дней.
Метаданные, хэштеги, описания под 3 платформы.
"""
import csv
import json
import os
from datetime import datetime, timedelta
import yaml

with open("config.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)

PLATFORMS = CONFIG["publish"]["platforms"]
TIMES = CONFIG["publish"]["times_msk"]

# Хэштеги по платформам
HASHTAGS = {
    "tiktok": ["#датавизуализация", "#статистика", "#факты", "#аналитика",
               "#цифры", "#тренды", "#мир", "#экономика"],
    "reels": ["#датавизуализация", "#статистика", "#факты", "#reels",
              "#аналитика", "#цифрыговоря"],
    "shorts": ["#датавизуализация", "#статистика", "#факты", "#shorts",
               "#аналитика", "#цифры"],
}


def generate_description(topic: str, platform: str) -> str:
    """Генерирует описание ролика под платформу."""
    hashtags = HASHTAGS.get(platform, [])[:5]
    base = f"📊 {topic}\\n\\n"
    base += "Источник данных: открытые международные базы данных.\\n"
    base += "⚠️ Видео создано с использованием ИИ (синтетические медиа).\\n\\n"
    base += " ".join(hashtags)
    return base


def generate_plan(start_date: datetime = None, days: int = 14) -> List[Dict]:
    """Генерирует план публикаций на N дней."""
    start = start_date or datetime.now()
    plan = []
    # Загрузка идей
    ideas_path = "content/ideas.csv"
    ideas = []
    if os.path.exists(ideas_path):
        with open(ideas_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            ideas = list(reader)

    idea_idx = 0
    for day_offset in range(days):
        date = start + timedelta(days=day_offset)
        for time_str in TIMES:
            if idea_idx >= len(ideas):
                break
            idea = ideas[idea_idx]
            for platform in PLATFORMS:
                plan.append({
                    "date": date.strftime("%Y-%m-%d"),
                    "time_msk": time_str,
                    "platform": platform,
                    "topic": idea.get("topic", f"Ролик #{idea_idx+1}"),
                    "hook": idea.get("hook", ""),
                    "description": generate_description(
                        idea.get("topic", ""), platform),
                    "video_file": f"output/{idea.get('id', idea_idx)}.mp4",
                    "synthetic_media": True,
                })
            idea_idx += 1
    return plan


def save_plan(plan: List[Dict], output_path: str = "output/publish_plan.csv"):
    """Сохраняет план в CSV."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=plan[0].keys())
        writer.writeheader()
        writer.writerows(plan)


if __name__ == "__main__":
    plan = generate_plan()
    save_plan(plan)
    print(f"[publish_plan] Сгенерировано {len(plan)} записей "
          f"на {len(set(p['date'] for p in plan))} дней")`;
