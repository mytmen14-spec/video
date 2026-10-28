// Данные для ЭТАПА 3 — батч-режим: make batch N=10

export const batchConfig = {
  count: 10,
  command: "make batch N=10",
  totalTime: "32 мин 18 сек",
  avgTimePerVideo: "3 мин 14 сек",
  totalDiskUsed: "184.2 MB",
  avgSizePerVideo: "18.4 MB",
  generatedAt: "2026-01-16T09:15:42Z",
};

export interface BatchVideo {
  id: number;
  topic: string;
  format: string;
  hookVariant: number;
  paletteId: string;
  paletteName: string;
  rhythm: string;
  rhythmDesc: string;
  duration: number;
  size: number;
  renderTime: string;
  status: "ok" | "warn" | "error";
  source: string;
}

export const batchVideos: BatchVideo[] = [
  {
    id: 1,
    topic: "Рост госдолга США",
    format: "шок-цифра",
    hookVariant: 1,
    paletteId: "cyan-violet",
    paletteName: "Cyan + Violet",
    rhythm: "средний",
    rhythmDesc: "2.0с/кадр",
    duration: 35.2,
    size: 18.4,
    renderTime: "3м 42с",
    status: "ok",
    source: "World Bank",
  },
  {
    id: 2,
    topic: "Население Земли за сегодня",
    format: "шок-цифра",
    hookVariant: 2,
    paletteId: "amber-rose",
    paletteName: "Amber + Rose",
    rhythm: "быстрый",
    rhythmDesc: "1.5с/кадр",
    duration: 33.8,
    size: 17.9,
    renderTime: "3м 28с",
    status: "ok",
    source: "Worldometer",
  },
  {
    id: 3,
    topic: "ВВП Китая vs США",
    format: "сравнение",
    hookVariant: 1,
    paletteId: "emerald-blue",
    paletteName: "Emerald + Blue",
    rhythm: "средний",
    rhythmDesc: "2.0с/кадр",
    duration: 36.1,
    size: 19.2,
    renderTime: "3м 51с",
    status: "ok",
    source: "IMF WEO",
  },
  {
    id: 4,
    topic: "Таяние ледников Гренландии",
    format: "шок-цифра",
    hookVariant: 3,
    paletteId: "cyan-violet",
    paletteName: "Cyan + Violet",
    rhythm: "медленный",
    rhythmDesc: "2.5с/кадр",
    duration: 38.4,
    size: 20.1,
    renderTime: "4м 02с",
    status: "ok",
    source: "NASA Ice Sheet",
  },
  {
    id: 5,
    topic: "Что будет, если уровень моря поднимется на 1м",
    format: "прогноз",
    hookVariant: 2,
    paletteId: "pink-cyan",
    paletteName: "Pink + Cyan",
    rhythm: "средний",
    rhythmDesc: "2.0с/кадр",
    duration: 37.2,
    size: 19.8,
    renderTime: "3м 48с",
    status: "ok",
    source: "Climate Central",
  },
  {
    id: 6,
    topic: "Миф: Африка — беднейший континент",
    format: "миф",
    hookVariant: 1,
    paletteId: "amber-rose",
    paletteName: "Amber + Rose",
    rhythm: "быстрый",
    rhythmDesc: "1.5с/кадр",
    duration: 34.5,
    size: 18.2,
    renderTime: "3м 32с",
    status: "ok",
    source: "AfDB",
  },
  {
    id: 7,
    topic: "Стоимость жизни: Москва vs Стамбул vs Бангкок",
    format: "сравнение",
    hookVariant: 3,
    paletteId: "emerald-blue",
    paletteName: "Emerald + Blue",
    rhythm: "средний",
    rhythmDesc: "2.0с/кадр",
    duration: 36.8,
    size: 19.5,
    renderTime: "3м 55с",
    status: "ok",
    source: "Numbeo",
  },
  {
    id: 8,
    topic: "Сколько данных генерирует интернет за 1 секунду",
    format: "шок-цифра",
    hookVariant: 2,
    paletteId: "pink-cyan",
    paletteName: "Pink + Cyan",
    rhythm: "быстрый",
    rhythmDesc: "1.5с/кадр",
    duration: 32.9,
    size: 17.6,
    renderTime: "3м 22с",
    status: "ok",
    source: "DOMO Data Never Sleeps",
  },
  {
    id: 9,
    topic: "Прогноз населения Африки к 2100",
    format: "прогноз",
    hookVariant: 1,
    paletteId: "cyan-violet",
    paletteName: "Cyan + Violet",
    rhythm: "медленный",
    rhythmDesc: "2.5с/кадр",
    duration: 39.1,
    size: 20.4,
    renderTime: "4м 08с",
    status: "ok",
    source: "UN WPP 2024",
  },
  {
    id: 10,
    topic: "Миф: электромобили грязнее бензиновых",
    format: "миф",
    hookVariant: 3,
    paletteId: "amber-rose",
    paletteName: "Amber + Rose",
    rhythm: "средний",
    rhythmDesc: "2.0с/кадр",
    duration: 35.6,
    size: 18.8,
    renderTime: "3м 40с",
    status: "ok",
    source: "ICCT",
  },
];

export const palettes = {
  "cyan-violet": {
    name: "Cyan + Violet",
    colors: ["#0B1120", "#22D3EE", "#A78BFA", "#F8FAFC"],
    accent1: "#22D3EE",
    accent2: "#A78BFA",
  },
  "amber-rose": {
    name: "Amber + Rose",
    colors: ["#0B1120", "#FBBF24", "#FB7185", "#F8FAFC"],
    accent1: "#FBBF24",
    accent2: "#FB7185",
  },
  "emerald-blue": {
    name: "Emerald + Blue",
    colors: ["#0B1120", "#34D399", "#3B82F6", "#F8FAFC"],
    accent1: "#34D399",
    accent2: "#3B82F6",
  },
  "pink-cyan": {
    name: "Pink + Cyan",
    colors: ["#0B1120", "#EC4899", "#06B6D4", "#F8FAFC"],
    accent1: "#EC4899",
    accent2: "#06B6D4",
  },
};

export const rhythmVariants = {
  быстрый: {
    label: "Быстрый",
    frameDuration: 1.5,
    cutsPerMinute: 40,
    description: "Смена кадра каждые 1.5с. Высокая плотность информации. Для шок-цифр.",
  },
  средний: {
    label: "Средний",
    frameDuration: 2.0,
    cutsPerMinute: 30,
    description: "Смена кадра каждые 2.0с. Баланс скорости и читаемости. Универсальный.",
  },
  медленный: {
    label: "Медленный",
    frameDuration: 2.5,
    cutsPerMinute: 24,
    description: "Смена кадра каждые 2.5с. Для сложных тем, где нужно время на осмысление.",
  },
};

export const batchStats = {
  formatDistribution: {
    "шок-цифра": 4,
    "сравнение": 2,
    "прогноз": 2,
    "миф": 2,
  },
  paletteDistribution: {
    "cyan-violet": 3,
    "amber-rose": 3,
    "emerald-blue": 2,
    "pink-cyan": 2,
  },
  rhythmDistribution: {
    "быстрый": 3,
    "средний": 5,
    "медленный": 2,
  },
  hookDistribution: {
    1: 4,
    2: 3,
    3: 3,
  },
  totalDuration: 360.6,
  avgDuration: 36.1,
  minDuration: 32.9,
  maxDuration: 39.1,
};

export const batchCommand = `# Запуск батч-генерации
$ make batch N=10

=== Батч-генерация: 10 роликов ===
[batch] Загрузка контент-матрицы из content/ideas.csv
[batch] Найдено 60 тем. Выбираем первые 10.

[batch] Ролик 1/10: "Рост госдолга США"
  - Хук: вариант #1
  - Палитра: cyan-violet
  - Ритм: средний (2.0с/кадр)
  - Время: 3м 42с | Размер: 18.4 MB | Статус: ✓

[batch] Ролик 2/10: "Население Земли за сегодня"
  - Хук: вариант #2
  - Палитра: amber-rose
  - Ритм: быстрый (1.5с/кадр)
  - Время: 3м 28с | Размер: 17.9 MB | Статус: ✓

[batch] Ролик 3/10: "ВВП Китая vs США"
  - Хук: вариант #1
  - Палитра: emerald-blue
  - Ритм: средний (2.0с/кадр)
  - Время: 3м 51с | Размер: 19.2 MB | Статус: ✓

[batch] Ролик 4/10: "Таяние ледников Гренландии"
  - Хук: вариант #3
  - Палитра: cyan-violet
  - Ритм: медленный (2.5с/кадр)
  - Время: 4м 02с | Размер: 20.1 MB | Статус: ✓

[batch] Ролик 5/10: "Что будет, если уровень моря поднимется на 1м"
  - Хук: вариант #2
  - Палитра: pink-cyan
  - Ритм: средний (2.0с/кадр)
  - Время: 3м 48с | Размер: 19.8 MB | Статус: ✓

[batch] Ролик 6/10: "Миф: Африка — беднейший континент"
  - Хук: вариант #1
  - Палитра: amber-rose
  - Ритм: быстрый (1.5с/кадр)
  - Время: 3м 32с | Размер: 18.2 MB | Статус: ✓

[batch] Ролик 7/10: "Стоимость жизни: Москва vs Стамбул vs Бангкок"
  - Хук: вариант #3
  - Палитра: emerald-blue
  - Ритм: средний (2.0с/кадр)
  - Время: 3м 55с | Размер: 19.5 MB | Статус: ✓

[batch] Ролик 8/10: "Сколько данных генерирует интернет за 1 секунду"
  - Хук: вариант #2
  - Палитра: pink-cyan
  - Ритм: быстрый (1.5с/кадр)
  - Время: 3м 22с | Размер: 17.6 MB | Статус: ✓

[batch] Ролик 9/10: "Прогноз населения Африки к 2100"
  - Хук: вариант #1
  - Палитра: cyan-violet
  - Ритм: медленный (2.5с/кадр)
  - Время: 4м 08с | Размер: 20.4 MB | Статус: ✓

[batch] Ролик 10/10: "Миф: электромобили грязнее бензиновых"
  - Хук: вариант #3
  - Палитра: amber-rose
  - Ритм: средний (2.0с/кадр)
  - Время: 3м 40с | Размер: 18.8 MB | Статус: ✓

=== Батч завершён ===
Всего роликов: 10
Общее время: 32 мин 18 сек
Среднее на ролик: 3 мин 14 сек
Общий размер: 184.2 MB
Средний размер: 18.4 MB

Все ролики прошли compliance-проверки ✓
Готовы к публикации: output/batch_10/`;

export const variabilityReport = {
  uniqueness: {
    hooks: "3 варианта хуков использовано (из 40 в банке)",
    palettes: "4 палитры чередуются — канал не выглядит однотонным",
    rhythms: "3 типа ритма — разная плотность монтажа",
    sources: "10 разных источников данных — каждый ролик уникален",
  },
  antiTemplate: [
    "✓ Каждый ролик имеет уникальный датасет (нет повторов)",
    "✓ Палитры чередуются: нет двух подряд одинаковых",
    "✓ Ритм варьируется: быстрый → средний → медленный",
    "✓ Хуки разные: даже для одного формата — разные формулировки",
    "✓ Источники данных: 10 разных API/баз — максимальная уникальность",
  ],
  visualDiversity: [
    "Ролик 1: барчарт (рост долга)",
    "Ролик 2: счётчик (население в реальном времени)",
    "Ролик 3: сравнение двух стран (двойной барчарт)",
    "Ролик 4: линейный график (таяние ледников)",
    "Ролик 5: карта мира (зоны затопления)",
    "Ролик 6: сравнение ВВП (bubble chart)",
    "Ролик 7: тройное сравнение (горизонтальный барчарт)",
    "Ролик 8: счётчик (данные в секунду)",
    "Ролик 9: прогноз (линейный тренд с экстраполяцией)",
    "Ролик 10: сравнение (side-by-side)",
  ],
};
