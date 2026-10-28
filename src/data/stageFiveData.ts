// Данные для ЭТАПА 5 — Дашборд аналитики

export interface DailyMetric {
  day: number;
  date: string;
  videos: number;
  views: number;
  newSubs: number;
  totalSubs: number;
  finishRate: number;
  shares: number;
  saves: number;
  likes: number;
  comments: number;
  bestFormat: string;
  viralHit: boolean;
}

export const dailyMetrics: DailyMetric[] = [
  { day: 1, date: "2026-01-17", videos: 3, views: 842, newSubs: 12, totalSubs: 12, finishRate: 48, shares: 8, saves: 14, likes: 42, comments: 3, bestFormat: "шок-цифра", viralHit: false },
  { day: 2, date: "2026-01-18", videos: 3, views: 1523, newSubs: 28, totalSubs: 40, finishRate: 52, shares: 15, saves: 22, likes: 78, comments: 7, bestFormat: "шок-цифра", viralHit: false },
  { day: 3, date: "2026-01-19", videos: 3, views: 2847, newSubs: 54, totalSubs: 94, finishRate: 58, shares: 32, saves: 41, likes: 145, comments: 12, bestFormat: "сравнение", viralHit: false },
  { day: 4, date: "2026-01-20", videos: 3, views: 5231, newSubs: 112, totalSubs: 206, finishRate: 61, shares: 58, saves: 72, likes: 267, comments: 24, bestFormat: "шок-цифра", viralHit: false },
  { day: 5, date: "2026-01-21", videos: 3, views: 8920, newSubs: 198, totalSubs: 404, finishRate: 64, shares: 102, saves: 118, likes: 445, comments: 38, bestFormat: "шок-цифра", viralHit: false },
  { day: 6, date: "2026-01-22", videos: 3, views: 12450, newSubs: 287, totalSubs: 691, finishRate: 66, shares: 145, saves: 167, likes: 623, comments: 52, bestFormat: "сравнение", viralHit: true },
  { day: 7, date: "2026-01-23", videos: 3, views: 45200, newSubs: 892, totalSubs: 1583, finishRate: 71, shares: 523, saves: 612, likes: 2234, comments: 187, bestFormat: "шок-цифра", viralHit: true },
  { day: 8, date: "2026-01-24", videos: 3, views: 18340, newSubs: 342, totalSubs: 1925, finishRate: 68, shares: 198, saves: 234, likes: 912, comments: 76, bestFormat: "шок-цифра", viralHit: false },
  { day: 9, date: "2026-01-25", videos: 3, views: 24560, newSubs: 412, totalSubs: 2337, finishRate: 69, shares: 267, saves: 312, likes: 1234, comments: 98, bestFormat: "сравнение", viralHit: false },
  { day: 10, date: "2026-01-26", videos: 3, views: 31200, newSubs: 523, totalSubs: 2860, finishRate: 72, shares: 345, saves: 402, likes: 1567, comments: 124, bestFormat: "шок-цифра", viralHit: false },
  { day: 11, date: "2026-01-27", videos: 4, views: 42100, newSubs: 678, totalSubs: 3538, finishRate: 73, shares: 456, saves: 534, likes: 2098, comments: 156, bestFormat: "шок-цифра", viralHit: false },
  { day: 12, date: "2026-01-28", videos: 4, views: 58900, newSubs: 892, totalSubs: 4430, finishRate: 74, shares: 623, saves: 712, likes: 2934, comments: 198, bestFormat: "сравнение", viralHit: true },
  { day: 13, date: "2026-01-29", videos: 4, views: 38400, newSubs: 567, totalSubs: 4997, finishRate: 71, shares: 412, saves: 489, likes: 1923, comments: 145, bestFormat: "шок-цифра", viralHit: false },
  { day: 14, date: "2026-01-30", videos: 4, views: 47200, newSubs: 723, totalSubs: 5720, finishRate: 75, shares: 512, saves: 598, likes: 2345, comments: 178, bestFormat: "шок-цифра", viralHit: false },
];

export interface FormatPerformance {
  format: string;
  videos: number;
  totalViews: number;
  avgViews: number;
  avgFinishRate: number;
  totalShares: number;
  totalSaves: number;
  totalLikes: number;
  engagementRate: number;
  verdict: "масштабировать" | "оставить" | "убить";
  color: string;
}

export const formatPerformance: FormatPerformance[] = [
  {
    format: "шок-цифра",
    videos: 22,
    totalViews: 189420,
    avgViews: 8610,
    avgFinishRate: 72.3,
    totalShares: 2145,
    totalSaves: 2534,
    totalLikes: 9823,
    engagementRate: 7.6,
    verdict: "масштабировать",
    color: "#ef4444",
  },
  {
    format: "сравнение",
    videos: 14,
    totalViews: 112340,
    avgViews: 8024,
    avgFinishRate: 69.8,
    totalShares: 1423,
    totalSaves: 1678,
    totalLikes: 6534,
    engagementRate: 8.5,
    verdict: "масштабировать",
    color: "#3b82f6",
  },
  {
    format: "прогноз",
    videos: 10,
    totalViews: 67890,
    avgViews: 6789,
    avgFinishRate: 65.4,
    totalShares: 823,
    totalSaves: 1012,
    totalLikes: 3890,
    engagementRate: 8.4,
    verdict: "оставить",
    color: "#a855f7",
  },
  {
    format: "миф",
    videos: 10,
    totalViews: 54200,
    avgViews: 5420,
    avgFinishRate: 61.2,
    totalShares: 534,
    totalSaves: 678,
    totalLikes: 2890,
    engagementRate: 7.6,
    verdict: "убить",
    color: "#22c55e",
  },
];

export interface Recommendation {
  priority: "high" | "medium" | "low";
  action: string;
  reason: string;
  metric: string;
  impact: string;
}

export const recommendations: Recommendation[] = [
  {
    priority: "high",
    action: "Увеличить долю «шок-цифра» до 50%",
    reason: "Лучший finish rate (72.3%) и максимальные shares/saves",
    metric: "finish rate: 72.3% | shares: 2145",
    impact: "+30% к средним просмотрам",
  },
  {
    priority: "high",
    action: "Увеличить долю «сравнение» до 30%",
    reason: "Высший engagement rate (8.5%), сильные saves",
    metric: "engagement: 8.5% | saves: 1678",
    impact: "+25% к подпискам",
  },
  {
    priority: "medium",
    action: "Оставить «прогноз» на уровне 15%",
    reason: "Средние показатели, но высокий save rate — аудитория сохраняет на будущее",
    metric: "saves/views: 1.49% (лучший показатель)",
    impact: "стабильный рост",
  },
  {
    priority: "high",
    action: "Сократить «миф» до 5% или убрать",
    reason: "Низкий finish rate (61.2%) и слабые shares",
    metric: "finish rate: 61.2% | shares: 534",
    impact: "освобождает слоты для сильных форматов",
  },
  {
    priority: "medium",
    action: "Публиковать в 12:00, 18:00, 21:00 MSK",
    reason: "Пики активности аудитории РФ/СНГ",
    metric: "просмотры в эти слоты на 42% выше",
    impact: "+42% к охвату",
  },
  {
    priority: "low",
    action: "Добавить 4-й ролик в дни с высокими метриками",
    reason: "Дни 11–14 показали рост при 4 видео/день",
    metric: "день 12: 58900 просмотров при 4 видео",
    impact: "+15% к дневным просмотрам",
  },
];

export const kpiGates = [
  { day: 7, gate: "≥ 1 ролик > 10K просмотров", actual: "45200 просмотров ✓", passed: true },
  { day: 7, gate: "≥ 500 подписчиков", actual: "1583 подписчика ✓", passed: true },
  { day: 10, gate: "Определить лучший формат", actual: "шок-цифра (finish rate 72.3%) ✓", passed: true },
  { day: 10, gate: "Удвоить ставку на лидера", actual: "Доля шок-цифра увеличена с 40% до 50% ✓", passed: true },
  { day: 14, gate: "≥ 3000 подписчиков", actual: "5720 подписчиков ✓", passed: true },
  { day: 14, gate: "Средний finish rate ≥ 65%", actual: "69.8% ✓", passed: true },
];

export const csvStructure = `date,platform,video_id,topic,format,views,new_subs,finish_rate,shares,saves,likes,comments,verdict
2026-01-17,tiktok,001,Рост госдолга США,шок-цифра,412,5,52,4,7,21,2,ok
2026-01-17,tiktok,002,Население Земли,шок-цифра,287,4,45,2,4,13,1,ok
2026-01-17,tiktok,003,ВВП Китая vs США,сравнение,143,3,47,2,3,8,0,ok
# ... и так далее для каждого дня и платформы`;

export const finalReport = {
  period: "14 дней (2026-01-17 — 2026-01-30)",
  totalVideos: 46,
  totalViews: 423850,
  totalNewSubs: 5720,
  avgFinishRate: 69.8,
  totalShares: 4934,
  totalSaves: 5802,
  totalLikes: 23062,
  totalComments: 1498,
  viralHits: 3,
  bestDay: { day: 12, views: 58900, subs: 892 },
  bestFormat: "шок-цифра",
  decision: "МАСШТАБИРОВАТЬ",
  nextStep: "Увеличить частоту до 4 видео/день, сфокусироваться на шок-цифра (50%) и сравнение (30%)",
};
