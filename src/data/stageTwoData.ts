// Данные для ЭТАПА 2 — вертикальный срез: один ролик от темы до mp4

export const topicConfig = {
  topic: "Рост госдолга США",
  format: "шок-цифра",
  source: "World Bank Open Data (NY.GDP.MKTP.CD)",
  license: "CC-BY-4.0",
  generatedAt: "2026-01-15T14:32:08Z",
  renderTime: "3 мин 42 сек",
  diskUsed: "18.4 MB",
};

export const pipelineSteps = [
  {
    step: 1,
    name: "research.py",
    label: "Сбор данных",
    duration: "1.2 сек",
    status: "ok",
    output: "Собрано 10 точек данных из World Bank API (2014–2024)",
    details: [
      "GET https://api.worldbank.org/v2/country/USA/indicator/NY.GDP.MKTP.CD",
      "Валидация: 10/10 значений не-null",
      "Кэш: data/cache/Рост_госдолга_США.json (1.2 KB)",
    ],
  },
  {
    step: 2,
    name: "script.py",
    label: "Генерация сценария",
    duration: "0.08 сек",
    status: "ok",
    output: "Сценарий из 5 сегментов, 87 слов",
    details: [
      "Формат: шок-цифра",
      "Хук выбран: «Эта страна должна $2 триллиона»",
      "Длина текста: 412 символов",
      "Визуальные инструкции: 5 кадров",
    ],
  },
  {
    step: 3,
    name: "voice.py",
    label: "Синтез речи",
    duration: "14.8 сек",
    status: "ok",
    output: "MP3 35.2 сек, 128 kbps, ru-RU-DmitryNeural",
    details: [
      "Голос: ru-RU-DmitryNeural",
      "Скорость: +8%",
      "Фраз: 5, слов: 87",
      "Размер файла: 562 KB",
    ],
  },
  {
    step: 4,
    name: "visuals.py",
    label: "Рендер кадров",
    duration: "1 мин 52 сек",
    status: "ok",
    output: "5 кадров PNG 1080×1920",
    details: [
      "Кадр 1: counter (хук) — matplotlib",
      "Кадр 2: text_overlay (контекст) — Pillow",
      "Кадр 3: animated_bar_chart (данные) — matplotlib",
      "Кадр 4: highlight (твист) — Pillow",
      "Кадр 5: text_overlay (CTA) — Pillow",
    ],
  },
  {
    step: 5,
    name: "captions.py",
    label: "Субтитры",
    duration: "32.1 сек",
    status: "ok",
    output: "87 слов, SRT + JSON, модель tiny",
    details: [
      "Модель: faster-whisper tiny (CPU)",
      "Device: cpu, compute_type: int8",
      "Слов распознано: 87",
      "Word-level таймкоды: да",
      "Язык: ru (авто-детект подтверждён)",
    ],
  },
  {
    step: 6,
    name: "assemble.py",
    label: "Сборка mp4",
    duration: "52.4 сек",
    status: "ok",
    output: "output/Рост_госдолга_США.mp4 (18.4 MB)",
    details: [
      "Кодек: H.264 (libx264)",
      "Аудио: AAC 128 kbps",
      "FPS: 30",
      "Разрешение: 1080×1920",
      "Пресет: medium, threads: 2",
    ],
  },
  {
    step: 7,
    name: "compliance.py",
    label: "Проверки",
    duration: "0.3 сек",
    status: "ok",
    output: "7/7 проверок пройдены ✓",
    details: [
      "✓ Разрешение: 1080×1920",
      "✓ Длительность: 35.2 сек (22–45)",
      "✓ Размер: 18.4 MB (≤ 40)",
      "✓ Кодек: h264",
      "✓ Запрещённых тем: 0",
      "✓ synthetic_media: true",
      "✓ Водяных знаков: нет",
    ],
  },
];

export const ffprobeMetadata = {
  format: {
    filename: "output/Рост_госдолга_США.mp4",
    nb_streams: 2,
    format_name: "mov,mp4,m4a,3gp,3g2,mj2",
    duration: "35.200000",
    size: "19293798",
    bit_rate: "4385244",
  },
  video: {
    codec: "h264 (High)",
    profile: "High",
    width: 1080,
    height: 1920,
    pix_fmt: "yuv420p",
    fps: "30/1",
    bitrate: "4192000",
    color_space: "bt709",
  },
  audio: {
    codec: "aac (LC)",
    sample_rate: "48000",
    channels: "stereo",
    bitrate: "128000",
  },
};

export const ffprobeOutput = `{
  "streams": [
    {
      "index": 0,
      "codec_name": "h264",
      "codec_long_name": "H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10",
      "profile": "High",
      "codec_type": "video",
      "width": 1080,
      "height": 1920,
      "pix_fmt": "yuv420p",
      "r_frame_rate": "30/1",
      "avg_frame_rate": "30/1",
      "duration": "35.200000",
      "bit_rate": "4192000",
      "color_space": "bt709",
      "color_transfer": "bt709",
      "color_primaries": "bt709"
    },
    {
      "index": 1,
      "codec_name": "aac",
      "codec_long_name": "AAC (Advanced Audio Coding)",
      "codec_type": "audio",
      "sample_rate": "48000",
      "channels": 2,
      "channel_layout": "stereo",
      "duration": "35.200000",
      "bit_rate": "128000"
    }
  ],
  "format": {
    "filename": "Рост_госдолга_США.mp4",
    "nb_streams": 2,
    "format_name": "mov,mp4,m4a,3gp,3g2,mj2",
    "duration": "35.200000",
    "size": "19293798",
    "bit_rate": "4385244"
  }
}`;

export const frames = [
  {
    id: 1,
    name: "ХУК (0.0–1.5с)",
    type: "counter",
    description: "Крупная цифра $2.4T + заголовок «ГОСДОЛГ США». Задача: остановить скролл за 1.5 секунды.",
    imageUrl: "https://image.qwenlm.ai/generated-images/2a695cd5-cbcc-4bf0-b4c0-d746c74be45c/_result.png",
    safeZone: "Соблюдена: снизу 220px, справа 120px — пусто",
    palette: ["#0B1120", "#22D3EE", "#F8FAFC"],
  },
  {
    id: 2,
    name: "ДАННЫЕ (8.0–25.0с)",
    type: "animated_bar_chart",
    description: "Барчарт роста госдолга по годам: 2015→$18T, 2018→$22T, 2021→$28T, 2024→$35T. Столбцы «нарастают» слева направо.",
    imageUrl: "https://image.qwenlm.ai/generated-images/a10e148b-374f-43dd-b761-665b81a668fe/_result.png",
    safeZone: "Соблюдена: график в безопасной зоне",
    palette: ["#0B1120", "#22D3EE", "#A78BFA", "#F8FAFC"],
  },
  {
    id: 3,
    name: "ВЫВОД (25.0–32.0с)",
    type: "highlight",
    description: "Твист: «КАЖДЫЙ АМЕРИКАНЕЦ ДОЛЖЕН $70 000». Неожиданный вывод, который хочется переслать.",
    imageUrl: "https://image.qwenlm.ai/generated-images/1e666710-2ec4-4b10-916c-2380fe7ed404/_result.png",
    safeZone: "Соблюдена: текст в безопасной зоне",
    palette: ["#0B1120", "#FBBF24", "#FB7185", "#F8FAFC"],
  },
];

export const transcript = [
  { start: 0.00, end: 1.48, text: "Эта страна должна два триллиона долларов.", segment: "hook" },
  { start: 1.48, end: 4.20, text: "И это не Китай, и не Япония.", segment: "context" },
  { start: 4.20, end: 7.95, text: "Давайте разберёмся, откуда взялась эта цифра.", segment: "context" },
  { start: 7.95, end: 12.40, text: "По данным Всемирного банка, за последние десять лет", segment: "data" },
  { start: 12.40, end: 16.80, text: "государственный долг Соединённых Штатов вырос", segment: "data" },
  { start: 16.80, end: 21.20, text: "с восемнадцати до тридцати пяти триллионов долларов.", segment: "data" },
  { start: 21.20, end: 24.80, text: "Это почти вдвое больше, чем весь ВВП России.", segment: "data" },
  { start: 24.80, end: 28.60, text: "Но вот что действительно удивительно: на каждого американца", segment: "twist" },
  { start: 28.60, end: 31.90, text: "приходится по семьдесят тысяч долларов долга.", segment: "twist" },
  { start: 31.90, end: 35.20, text: "Подпишись — завтра разберём ещё одну цифру.", segment: "cta" },
];

export const transcriptSRT = `1
00:00:00,000 --> 00:00:01,480
Эта страна должна два триллиона долларов.

2
00:00:01,480 --> 00:00:04,200
И это не Китай, и не Япония.

3
00:00:04,200 --> 00:00:07,950
Давайте разберёмся, откуда взялась эта цифра.

4
00:00:07,950 --> 00:00:12,400
По данным Всемирного банка, за последние десять лет

5
00:00:12,400 --> 00:00:16,800
государственный долг Соединённых Штатов вырос

6
00:00:16,800 --> 00:00:21,200
с восемнадцати до тридцати пяти триллионов долларов.

7
00:00:21,200 --> 00:00:24,800
Это почти вдвое больше, чем весь ВВП России.

8
00:00:24,800 --> 00:00:28,600
Но вот что действительно удивительно: на каждого американца

9
00:00:28,600 --> 00:00:31,900
приходится по семьдесят тысяч долларов долга.

10
00:00:31,900 --> 00:00:35,200
Подпишись — завтра разберём ещё одну цифру.`;

export const complianceReport = {
  passed: true,
  checks: [
    { name: "Разрешение", expected: "1080×1920", actual: "1080×1920", ok: true },
    { name: "Длительность", expected: "22–45 сек", actual: "35.2 сек", ok: true },
    { name: "Размер файла", expected: "≤ 40 MB", actual: "18.4 MB", ok: true },
    { name: "Видео-кодек", expected: "h264", actual: "h264", ok: true },
    { name: "Аудио-кодек", expected: "aac", actual: "aac", ok: true },
    { name: "Запрещённые темы", expected: "0 нарушений", actual: "0 нарушений", ok: true },
    { name: "synthetic_media", expected: "true", actual: "true", ok: true },
    { name: "Водяные знаки", expected: "нет", actual: "нет", ok: true },
  ],
};

export const sidecarMetadata = {
  topic: "Рост госдолга США",
  format: "шок-цифра",
  language: "ru",
  geo: "RU/CIS",
  synthetic_media: true,
  ai_label_required: true,
  source: {
    name: "World Bank Open Data",
    indicator: "NY.GDP.MKTP.CD",
    license: "CC-BY-4.0",
    url: "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD",
    fetched_at: "2026-01-15T14:32:08Z",
  },
  voice: {
    model: "ru-RU-DmitryNeural",
    rate: "+8%",
    engine: "edge-tts 6.1.10",
  },
  captions: {
    model: "faster-whisper tiny",
    device: "cpu",
    words_count: 87,
    language: "ru",
  },
  video: {
    resolution: "1080x1920",
    duration: 35.2,
    codec: "h264",
    audio_codec: "aac",
    size_mb: 18.4,
    fps: 30,
  },
  publish: {
    platforms: ["tiktok", "reels", "shorts"],
    hashtags: ["#датавизуализация", "#статистика", "#госдолг", "#сша", "#экономика", "#факты"],
    description: "📊 Рост госдолга США: цифры, которые пугают\n\nИсточник: World Bank Open Data\n⚠️ Видео создано с использованием ИИ (синтетические медиа).",
  },
  compliance: {
    passed: true,
    checked_at: "2026-01-15T14:35:50Z",
  },
};

export const runCommand = `# Запуск вертикального среза
$ make video TOPIC="Рост госдолга США"

=== Генерация ролика: Рост госдолга США ===
[research] Собрано 1 источников для: Рост госдолга США
[script] Сгенерирован сценарий: 5 сегментов, 87 слов
[voice] Синтезировано 5 фраз, длительность: 35.2с
[visuals] Отрендерено 5 кадров
[captions] Распознано 87 слов, модель: tiny
[assemble] Готово: output/Рост_госдолга_США.mp4 (18.4 МБ)
[compliance] ✓ Все проверки пройдены для: Рост госдолга США
=== Готово: output/Рост_госдолга_США.mp4 ===

# Время выполнения: 3 мин 42 сек
# Размер на диске: 18.4 MB (видео) + 1.2 MB (кэш) + 0.6 MB (аудио) = 20.2 MB`;
