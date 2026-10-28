// Данные для ЭТАПА 4 — Compliance-шлюз

export interface ComplianceCheck {
  id: string;
  name: string;
  rule: string;
  expected: string;
  method: string;
  critical: boolean;
  description: string;
}

export const complianceChecks: ComplianceCheck[] = [
  {
    id: "resolution",
    name: "Разрешение",
    rule: "0.3 (формат мастер-файла)",
    expected: "1080×1920",
    method: "ffprobe -show_entries stream=width,height",
    critical: true,
    description: "Проверка вертикального формата 1080×1920. Критично для TikTok/Reels/Shorts.",
  },
  {
    id: "duration",
    name: "Длительность",
    rule: "0.3 (формат мастер-файла)",
    expected: "22–45 секунд",
    method: "ffprobe -show_entries format=duration",
    critical: true,
    description: "Длительность должна быть в диапазоне 22–45 сек. Слишком короткое — нет времени на раскрытие. Слишком длинное — падает finish rate.",
  },
  {
    id: "size",
    name: "Размер файла",
    rule: "0.3 (формат мастер-файла)",
    expected: "≤ 40 MB",
    method: "os.path.getsize()",
    critical: true,
    description: "Максимальный размер 40 MB для быстрой загрузки на платформы. Превышение — риск отказа при загрузке.",
  },
  {
    id: "codec",
    name: "Видео-кодек",
    rule: "0.3 (формат мастер-файла)",
    expected: "h264",
    method: "ffprobe -show_entries stream=codec_name",
    critical: true,
    description: "Кодек H.264 (libx264) — универсальная совместимость со всеми платформами.",
  },
  {
    id: "audio_codec",
    name: "Аудио-кодек",
    rule: "0.3 (формат мастер-файла)",
    expected: "aac",
    method: "ffprobe -show_entries stream=codec_name (audio)",
    critical: true,
    description: "Кодек AAC — стандарт для MP4, поддерживается всеми платформами.",
  },
  {
    id: "forbidden_topics",
    name: "Запрещённые темы",
    rule: "0.4a (правила платформ 2026)",
    expected: "0 нарушений",
    method: "Текстовый анализ сценария по ключевым словам",
    critical: true,
    description: "Запрещено: советы по медицине, праву, финансам, политике от лица AI-персоны. Прямой демонетизационный риск (YouTube 'inauthentic content', 3-я категория).",
  },
  {
    id: "synthetic_media",
    name: "Маркировка AI-контента",
    rule: "0.4e (правила платформ 2026)",
    expected: "synthetic_media: true в метаданных",
    method: "Проверка sidecar JSON",
    critical: true,
    description: "Флаг synthetic_media обязан быть true. Автоматически вставляется в описание при публикации на TikTok/Reels/Shorts (требование платформ 2026).",
  },
  {
    id: "watermark",
    name: "Водяные знаки",
    rule: "0.3 (формат мастер-файла)",
    expected: "отсутствуют",
    method: "Эвристический анализ (размер файла, энтропия)",
    critical: true,
    description: "Запрещены водяные знаки сторонних сервисов. Мастер-файл используется нативно на всех трёх платформах без перезаливов.",
  },
];

export interface ComplianceResult {
  topic: string;
  passed: boolean;
  checks: {
    id: string;
    ok: boolean;
    expected: string;
    actual: string;
    error?: string;
  }[];
  timestamp: string;
}

export const complianceExamples: ComplianceResult[] = [
  {
    topic: "Рост госдолга США",
    passed: true,
    checks: [
      { id: "resolution", ok: true, expected: "1080×1920", actual: "1080×1920" },
      { id: "duration", ok: true, expected: "22–45 сек", actual: "35.2 сек" },
      { id: "size", ok: true, expected: "≤ 40 MB", actual: "18.4 MB" },
      { id: "codec", ok: true, expected: "h264", actual: "h264" },
      { id: "audio_codec", ok: true, expected: "aac", actual: "aac" },
      { id: "forbidden_topics", ok: true, expected: "0 нарушений", actual: "0 нарушений" },
      { id: "synthetic_media", ok: true, expected: "true", actual: "true" },
      { id: "watermark", ok: true, expected: "нет", actual: "нет" },
    ],
    timestamp: "2026-01-15T14:35:50Z",
  },
  {
    topic: "Как инвестировать в крипту",
    passed: false,
    checks: [
      { id: "resolution", ok: true, expected: "1080×1920", actual: "1080×1920" },
      { id: "duration", ok: true, expected: "22–45 сек", actual: "34.8 сек" },
      { id: "size", ok: true, expected: "≤ 40 MB", actual: "17.9 MB" },
      { id: "codec", ok: true, expected: "h264", actual: "h264" },
      { id: "audio_codec", ok: true, expected: "aac", actual: "aac" },
      { id: "forbidden_topics", ok: false, expected: "0 нарушений", actual: "1 нарушение", error: "financial_advice: найдено 'инвестируй в крипту'" },
      { id: "synthetic_media", ok: true, expected: "true", actual: "true" },
      { id: "watermark", ok: true, expected: "нет", actual: "нет" },
    ],
    timestamp: "2026-01-15T15:12:33Z",
  },
  {
    topic: "Лечение гриппа народными методами",
    passed: false,
    checks: [
      { id: "resolution", ok: true, expected: "1080×1920", actual: "1080×1920" },
      { id: "duration", ok: true, expected: "22–45 сек", actual: "36.1 сек" },
      { id: "size", ok: true, expected: "≤ 40 MB", actual: "19.2 MB" },
      { id: "codec", ok: true, expected: "h264", actual: "h264" },
      { id: "audio_codec", ok: true, expected: "aac", actual: "aac" },
      { id: "forbidden_topics", ok: false, expected: "0 нарушений", actual: "2 нарушения", error: "medical_advice: найдено 'лечение', 'принимай таблетки'" },
      { id: "synthetic_media", ok: true, expected: "true", actual: "true" },
      { id: "watermark", ok: true, expected: "нет", actual: "нет" },
    ],
    timestamp: "2026-01-15T16:45:12Z",
  },
  {
    topic: "Сравнение ВВП стран G7",
    passed: false,
    checks: [
      { id: "resolution", ok: true, expected: "1080×1920", actual: "1080×1920" },
      { id: "duration", ok: false, expected: "22–45 сек", actual: "18.3 сек", error: "Слишком короткое: 18.3 сек < 22 сек" },
      { id: "size", ok: true, expected: "≤ 40 MB", actual: "12.1 MB" },
      { id: "codec", ok: true, expected: "h264", actual: "h264" },
      { id: "audio_codec", ok: true, expected: "aac", actual: "aac" },
      { id: "forbidden_topics", ok: true, expected: "0 нарушений", actual: "0 нарушений" },
      { id: "synthetic_media", ok: true, expected: "true", actual: "true" },
      { id: "watermark", ok: true, expected: "нет", actual: "нет" },
    ],
    timestamp: "2026-01-15T17:20:45Z",
  },
];

export const forbiddenKeywords = {
  medical_advice: [
    "лечение",
    "диагноз",
    "принимай",
    "таблетки",
    "врач советует",
    "выздоровей",
    "народная медицина",
    "бады",
    "добавки",
  ],
  legal_advice: [
    "юрист советует",
    "суд постановил вам",
    "закон требует от вас",
    "подай в суд",
    "юридическая консультация",
  ],
  financial_advice: [
    "инвестируй",
    "купи акции",
    "вложи в крипту",
    "финансовый совет",
    "заработай на",
    "пассивный доход",
    "трейдинг",
  ],
  political_advice: [
    "голосуй за",
    "партия лучше",
    "политический совет",
    "поддержи кандидата",
    "выборы",
  ],
};

export const complianceWorkflow = [
  {
    step: 1,
    name: "research.py",
    action: "Сбор данных",
    compliance: "—",
  },
  {
    step: 2,
    name: "script.py",
    action: "Генерация сценария",
    compliance: "Предварительная проверка: нет запрещённых тем в тексте",
  },
  {
    step: 3,
    name: "voice.py",
    action: "Синтез речи",
    compliance: "—",
  },
  {
    step: 4,
    name: "visuals.py",
    action: "Рендер кадров",
    compliance: "—",
  },
  {
    step: 5,
    name: "captions.py",
    action: "Субтитры",
    compliance: "—",
  },
  {
    step: 6,
    name: "assemble.py",
    action: "Сборка mp4",
    compliance: "—",
  },
  {
    step: 7,
    name: "compliance.py",
    action: "БЛОКИРУЮЩИЙ ШЛЮЗ",
    compliance: "8 проверок: разрешение, длительность, размер, кодеки, запрещённые темы, synthetic_media, водяные знаки",
    critical: true,
  },
  {
    step: 8,
    name: "output/",
    action: "Экспорт готового mp4",
    compliance: "Только если compliance.py пройден ✓",
  },
];

export const aiLabelExamples = {
  tiktok: {
    description: "📊 Рост госдолга США: цифры, которые пугают\n\nИсточник: World Bank Open Data\n\n⚠️ Это видео создано с использованием искусственного интеллекта (синтетические медиа).\n\n#датавизуализация #статистика #госдолг #сша #экономика #факты",
    note: "TikTok требует маркировку AI-контента с 2024 года. Флаг synthetic_media автоматически добавляется в описание.",
  },
  reels: {
    description: "📊 Рост госдолга США\n\nИсточник: World Bank Open Data\n\n⚠️ Синтетические медиа (AI-generated content)\n\n#датавизуализация #статистика #госдолг #экономика #факты #reels",
    note: "Instagram Reels требует явное указание AI-контента в описании с 2024 года.",
  },
  shorts: {
    description: "Рост госдолга США: $2.4 триллиона\n\nИсточник: World Bank Open Data\n\n⚠️ AI-generated content\n\n#датавизуализация #статистика #shorts #экономика #факты",
    note: "YouTube Shorts требует маркировку AI-контента в описании с 2024 года.",
  },
};

export const sidecarJsonExample = `{
  "topic": "Рост госдолга США",
  "format": "шок-цифра",
  "language": "ru",
  "geo": "RU/CIS",
  "synthetic_media": true,
  "ai_label_required": true,
  "source": {
    "name": "World Bank Open Data",
    "indicator": "NY.GDP.MKTP.CD",
    "license": "CC-BY-4.0",
    "url": "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD",
    "fetched_at": "2026-01-15T14:32:08Z"
  },
  "voice": {
    "model": "ru-RU-DmitryNeural",
    "rate": "+8%",
    "engine": "edge-tts 6.1.10"
  },
  "captions": {
    "model": "faster-whisper tiny",
    "device": "cpu",
    "words_count": 87,
    "language": "ru"
  },
  "video": {
    "resolution": "1080x1920",
    "duration": 35.2,
    "codec": "h264",
    "audio_codec": "aac",
    "size_mb": 18.4,
    "fps": 30
  },
  "publish": {
    "platforms": ["tiktok", "reels", "shorts"],
    "hashtags": ["#датавизуализация", "#статистика", "#госдолг", "#сша", "#экономика", "#факты"],
    "description": "📊 Рост госдолга США: цифры, которые пугают\\n\\nИсточник: World Bank Open Data\\n⚠️ Видео создано с использованием ИИ (синтетические медиа)."
  },
  "compliance": {
    "passed": true,
    "checked_at": "2026-01-15T14:35:50Z",
    "checks": {
      "resolution": "1080x1920 ✓",
      "duration": "35.2s ✓",
      "size": "18.4MB ✓",
      "codec": "h264 ✓",
      "audio_codec": "aac ✓",
      "forbidden_topics": "0 violations ✓",
      "synthetic_media": "true ✓",
      "watermark": "none ✓"
    }
  }
}`;
