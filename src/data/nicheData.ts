export interface NicheCandidate {
  id: number;
  name: string;
  scores: {
    PROD: number;
    ORIG: number;
    VEL: number;
    MON: number;
    SAT: number;
    RISK: number;
  };
  weighted: number;
  notes: string;
}

// Весовая формула: PROD 0.25 + VEL 0.25 + ORIG 0.20 + RISK 0.15 + MON 0.10 + SAT 0.05
function calcWeighted(s: { PROD: number; ORIG: number; VEL: number; MON: number; SAT: number; RISK: number }) {
  return +(s.PROD * 0.25 + s.VEL * 0.25 + s.ORIG * 0.20 + s.RISK * 0.15 + s.MON * 0.10 + s.SAT * 0.05).toFixed(2);
}

export const nicheCandidates: NicheCandidate[] = [
  {
    id: 1,
    name: "Синтетические дата-визуализации (анимированные графики/дашборды про новости и макро-тренды)",
    scores: { PROD: 9, ORIG: 9, VEL: 8, MON: 7, SAT: 6, RISK: 9 },
    weighted: 0,
    notes: "Полностью генерируется кодом (matplotlib/plotly). Каждый ролик = уникальный датасет → защита от AI-slop фильтров. Высокий share-потенциал: «перешли другу, который не верит цифрам»."
  },
  {
    id: 2,
    name: "AI-агенты и автоматизация: how-to и скрин-туториалы",
    scores: { PROD: 5, ORIG: 4, VEL: 7, MON: 8, SAT: 3, RISK: 7 },
    weighted: 0,
    notes: "Требует скрин-записей (не полностью код-генерируемо). Высокая насыщенность. Быстро устаревает. Риск: платформа может пометить как «промо»."
  },
  {
    id: 3,
    name: "Космос и наука на открытых данных NASA/ESA",
    scores: { PROD: 8, ORIG: 8, VEL: 6, MON: 6, SAT: 7, RISK: 10 },
    weighted: 0,
    notes: "Открытые данные NASA (CC0). Низкий риск. Но медленный рост — ниша уже занята крупными каналами (Kurzgesagt и т.д.)."
  },
  {
    id: 4,
    name: "Микро-история и география на анимированных картах",
    scores: { PROD: 8, ORIG: 8, VEL: 7, MON: 5, SAT: 7, RISK: 8 },
    weighted: 0,
    notes: "GeoPandas + анимации. Высокий оригинальный слой. Но низкий CPM — аудитория широкая, не premium."
  },
  {
    id: 5,
    name: "AI-озвученные сериализованные истории (месть/предательство)",
    scores: { PROD: 6, ORIG: 3, VEL: 9, MON: 4, SAT: 4, RISK: 3 },
    weighted: 0,
    notes: "Быстрый виральный рост, НО: высочайший риск AI-slop флага. YouTube/TikTok 2026 активно демонируют такие каналы. Низкий CPM."
  },
  {
    id: 6,
    name: "Вертикальная микро-драма",
    scores: { PROD: 3, ORIG: 5, VEL: 7, MON: 5, SAT: 5, RISK: 4 },
    weighted: 0,
    notes: "Требует актёров/съёмок. Не генерируется кодом. Высокий риск модерации за «inauthentic content»."
  },
].map(n => ({ ...n, weighted: calcWeighted(n.scores) }));

export const weights = [
  { key: 'PROD', label: 'PROD', weight: 0.25, desc: 'Код-генерируемость' },
  { key: 'VEL', label: 'VEL', weight: 0.25, desc: 'Скорость роста' },
  { key: 'ORIG', label: 'ORIG', weight: 0.20, desc: 'Устойчивость к AI-slop' },
  { key: 'RISK', label: 'RISK', weight: 0.15, desc: 'Правовая безопасность' },
  { key: 'MON', label: 'MON', weight: 0.10, desc: 'Монетизация' },
  { key: 'SAT', label: 'SAT', weight: 0.05, desc: 'Низкая конкуренция' },
];

export interface ContentIdea {
  id: number;
  date: string;
  format: string;
  topic: string;
  hook: string;
  source: string;
}

export const contentIdeas: ContentIdea[] = [
  // ШОК-ЦИФРА (40% = 24 ролика)
  { id: 1, date: "День 1", format: "шок-цифра", topic: "Топ-10 стран по росту госдолга за 2024", hook: "Эта страна должна $2 триллиона", source: "World Bank Open Data" },
  { id: 2, date: "День 1", format: "шок-цифра", topic: "Сколько данных генерирует интернет за 1 секунду", hook: "За одну секунду мы создаём", source: "Statista / DOMO Data Never Sleeps" },
  { id: 3, date: "День 1", format: "шок-цифра", topic: "Рост стоимости биткоина vs золота за 10 лет", hook: "Если бы ты купил на $100", source: "CoinGecko API / World Gold Council" },
  { id: 4, date: "День 2", format: "шок-цифра", topic: "Население Земли: сколько родилось за сегодня", hook: "Пока ты смотришь это видео", source: "Worldometer / UN Population Division" },
  { id: 5, date: "День 2", format: "шок-цифра", topic: "Какая страна тратит больше всего на оружие", hook: "$2.4 триллиона — и это не США", source: "SIPRI Military Expenditure Database" },
  { id: 6, date: "День 2", format: "шок-цифра", topic: "Скорость таяния ледников Гренландии", hook: "Каждый год мы теряем 270 млрд тонн", source: "NASA Ice Sheet Mass Balance" },
  { id: 7, date: "День 3", format: "шок-цифра", topic: "Сколько мусора производит один человек за жизнь", hook: "Ты выбросишь 900 тонн мусора", source: "World Bank What a Waste 2.0" },
  { id: 8, date: "День 3", format: "шок-цифра", topic: "Рост числа электромобилей по странам", hook: "Через 5 лет бензин исчезнет", source: "IEA Global EV Data Explorer" },
  { id: 9, date: "День 3", format: "шок-цифра", topic: "Сколько стоит минута рекламы на Суперкубке", hook: "$7 миллионов за 60 секунд", source: "Sporting News / NFL Media" },
  { id: 10, date: "День 4", format: "шок-цифра", topic: "Темпы вырубки лесов Амазонии по месяцам", hook: "Каждую минуту исчезает площадь", source: "Global Forest Watch / INPE" },
  { id: 11, date: "День 4", format: "шок-цифра", topic: "Сколько людей переезжают в города каждый день", hook: "180 000 человек в день", source: "UN World Urbanization Prospects" },
  { id: 12, date: "День 4", format: "шок-цифра", topic: "Рост числа AI-стартапов по годам", hook: "В 2024 родилось 60 000 AI-компаний", source: "Crunchbase / Stanford AI Index" },
  { id: 13, date: "День 5", format: "шок-цифра", topic: "Сколько воды нужно для производства 1 кг говядины", hook: "15 000 литров на один килограмм", source: "Water Footprint Network" },
  { id: 14, date: "День 5", format: "шок-цифра", topic: "Темпы роста мирового туризма после пандемии", hook: "Мы вернулись к 95% уровня 2019", source: "UNWTO World Tourism Barometer" },
  { id: 15, date: "День 5", format: "шок-цифра", topic: "Сколько спутников на орбите Земли", hook: "10 000 активных спутников — и это", source: "UCS Satellite Database / ESA" },
  { id: 16, date: "День 6", format: "шок-цифра", topic: "Рост числа кибератак на больницы", hook: "Каждые 11 секунд — одна атака", source: "IBM X-Force / WHO" },
  { id: 17, date: "День 6", format: "шок-цифра", topic: "Сколько энергии потребляет дата-центр AI", hook: "Один чат GPT = 10 мл воды", source: "Science / Li et al. 2023" },
  { id: 18, date: "День 6", format: "шок-цифра", topic: "Темпы старения населения Японии", hook: "К 2050 каждый третий японец", source: "Statistics Bureau of Japan" },
  { id: 19, date: "День 7", format: "шок-цифра", topic: "Сколько пластика в океане по массе", hook: "150 миллионов тонн — и число", source: "IUCN / Ocean Conservancy" },
  { id: 20, date: "День 7", format: "шок-цифра", topic: "Рост числа миллионеров в мире", hook: "60 миллионов миллионеров — больше", source: "Allianz Global Wealth Report" },
  { id: 21, date: "День 7", format: "шок-цифра", topic: "Сколько кофе потребляет мир за год", hook: "10 миллиардов кг в год", source: "ICO Monthly Coffee Market Report" },
  { id: 22, date: "День 8", format: "шок-цифра", topic: "Темпы роста безработицы среди молодёжи", hook: "Каждый шестой молодой человек", source: "ILO Global Employment Trends" },
  { id: 23, date: "День 8", format: "шок-цифра", topic: "Сколько данных хранит Google", hook: "15 эксабайт — это 15 миллионов", source: "Google Cloud / estimates" },
  { id: 24, date: "День 8", format: "шок-цифра", topic: "Рост числа лесных пожаров в мире", hook: "2024 — рекордный год по площади", source: "NASA FIRMS / GFED" },
  // СРАВНЕНИЕ A vs B (25% = 15 роликов)
  { id: 25, date: "День 9", format: "сравнение", topic: "ВВП Китая vs США: динамика за 20 лет", hook: "Китай обгонит США к 2035?", source: "IMF World Economic Outlook" },
  { id: 26, date: "День 9", format: "сравнение", topic: "Зарплаты в IT: Россия vs Казахстан vs Польша", hook: "Кто платит больше — Москва или", source: "Glassdoor / HeadHunter API" },
  { id: 27, date: "День 9", format: "сравнение", topic: "Продолжительность жизни: мужчины vs женщины по странам", hook: "Женщины живут на 5 лет дольше", source: "WHO Global Health Observatory" },
  { id: 28, date: "День 10", format: "сравнение", topic: "Стоимость жизни: Москва vs Стамбул vs Бангкок", hook: "Где $2000 — это роскошь?", source: "Numbeo Cost of Living Index" },
  { id: 29, date: "День 10", format: "сравнение", topic: "Экспорт оружия: Россия vs Франция vs Китай", hook: "Франция обогнала Россию впервые", source: "SIPRI Arms Transfers Database" },
  { id: 30, date: "День 10", format: "сравнение", topic: "Потребление мяса: Аргентина vs Индия vs Монголия", hook: "Монгольцы едят в 10 раз больше", source: "FAOSTAT" },
  { id: 31, date: "День 11", format: "сравнение", topic: "Число университетов: Индия vs Китай vs США", hook: "В Индии 45 000 вузов — больше", source: "UNESCO Institute for Statistics" },
  { id: 32, date: "День 11", format: "сравнение", topic: "Индекс счастья: Финляндия vs Афганистан", hook: "Разница — 7 баллов из 10", source: "World Happiness Report 2024" },
  { id: 33, date: "День 11", format: "сравнение", topic: "Рост населения: Нигерия vs Япония за 50 лет", hook: "Одна удвоится, другая потеряет треть", source: "UN World Population Prospects" },
  { id: 34, date: "День 12", format: "сравнение", topic: "Площадь лесов: Бразилия vs Россия vs Канада", hook: "Россия — 20% всех лесов планеты", source: "Global Forest Resources Assessment FAO" },
  { id: 35, date: "День 12", format: "сравнение", topic: "Скорость интернета: Южная Корея vs Россия vs Чад", hook: "Разница — в 200 раз", source: "Speedtest Global Index / Ookla" },
  { id: 36, date: "День 12", format: "сравнение", topic: "Расходы на образование: % ВВП по странам", hook: "Норвегия тратит 7.5% ВВП — а", source: "OECD Education at a Glance" },
  { id: 37, date: "День 13", format: "сравнение", topic: "Миграция: куда едут люди в 2024", hook: "США — №1, но ОАЭ растёт быстрее", source: "UN International Migration Stock" },
  { id: 38, date: "День 13", format: "сравнение", topic: "Энергия: солнечная vs атомная vs газовая", hook: "Солнце обогнало атом в 2024", source: "IEA World Energy Outlook" },
  { id: 39, date: "День 13", format: "сравнение", topic: "Число автомобилей на 1000 человек по странам", hook: "США — 890, Индия — 34", source: "OICA / World Bank" },
  // ПРОГНОЗ / ЧТО БУДЕТ ЕСЛИ (20% = 12 роликов)
  { id: 40, date: "День 14", format: "прогноз", topic: "Что будет, если уровень моря поднимется на 1 метр", hook: "300 миллионов людей потеряют дом", source: "Climate Central / IPCC AR6" },
  { id: 41, date: "День 14", format: "прогноз", topic: "Прогноз населения Африки к 2100", hook: "4 миллиарда человек к 2100 году", source: "UN World Population Prospects 2024" },
  { id: 42, date: "День 14", format: "прогноз", topic: "Что будет с рынком труда через 10 лет", hook: "40% профессий исчезнут к 2034", source: "WEF Future of Jobs Report 2025" },
  { id: 43, date: "День 15", format: "прогноз", topic: "Прогноз цен на литий до 2030", hook: "Литий — новое золото электрификации", source: "IEA Critical Minerals Market" },
  { id: 44, date: "День 15", format: "прогноз", topic: "Что будет, если все перейдут на электромобили", hook: "Потребление электричества вырастет на", source: "Bloomberg NEF EV Outlook" },
  { id: 45, date: "День 15", format: "прогноз", topic: "Прогноз числа беженцев из-за климата к 2050", hook: "216 миллионов климатических мигрантов", source: "World Bank Groundswell Report" },
  { id: 46, date: "День 16", format: "прогноз", topic: "Что будет с пресной водой к 2040", hook: "33 страны столкнутся с дефицитом", source: "WRI Aqueduct Water Risk Atlas" },
  { id: 47, date: "День 16", format: "прогноз", topic: "Прогноз урбанизации: мегаполисы 2050", hook: "Дели обгонит Токио к 2030", source: "UN World Urbanization Prospects" },
  { id: 48, date: "День 16", format: "прогноз", topic: "Что будет, если Арктика полностью растает", hook: "Новый торговый путь — и новый конфликт", source: "NSIDC / Arctic Report Card" },
  { id: 49, date: "День 17", format: "прогноз", topic: "Прогноз числа AI-роботов на заводах к 2030", hook: "20 миллионов роботов заменят людей", source: "IFR World Robotics Report" },
  { id: 50, date: "День 17", format: "прогноз", topic: "Что будет с продовольствием при +2°C", hook: "Урожай пшеницы упадёт на 20%", source: "IPCC AR6 WG2 Chapter 5" },
  { id: 51, date: "День 17", format: "прогноз", topic: "Прогноз числа электричек vs самолётов к 2040", hook: "eVTOL — $1.5 трлн рынок к 2040", source: "Morgan Stanley / EASA" },
  // РАЗБОР МИФА (15% = 9 роликов)
  { id: 52, date: "День 18", format: "миф", topic: "Миф: Китай — фабрика мира. Реальность по данным", hook: "Вьетнам обогнал Китай по экспорту", source: "UN Comtrade Database" },
  { id: 53, date: "День 18", format: "миф", topic: "Миф: Африка — беднейший континент. Данные говорят", hook: "ВВП Африки — $3 трлн — больше", source: "AfDB / World Bank" },
  { id: 54, date: "День 18", format: "миф", topic: "Миф: возобновляемая энергия дороже ископаемой", hook: "Солнце — самый дешёвый источник", source: "IRENA Renewable Power Generation Costs" },
  { id: 55, date: "День 19", format: "миф", topic: "Миф: население Земли растёт бесконечно", hook: "Пик — 10.4 млрд в 2080-х, потом", source: "UN World Population Prospects 2024" },
  { id: 56, date: "День 19", format: "миф", topic: "Миф: AI заберёт все рабочие места", hook: "AI создаст больше jobs, чем заберёт", source: "WEF Future of Jobs 2025" },
  { id: 57, date: "День 19", format: "миф", topic: "Миф: Россия — самая большая страна. А по ресурсам?", hook: "По площади — да, но по пахотной", source: "FAO / World Bank" },
  { id: 58, date: "День 20", format: "миф", topic: "Миф: электромобили грязнее бензиновых", hook: "За весь цикл EV на 60-70% чище", source: "ICCT / Argonne National Lab" },
  { id: 59, date: "День 20", format: "миф", topic: "Миф: глобализация умирает", hook: "Торговля растёт — просто меняет", source: "WTO Global Trade Outlook" },
  { id: 60, date: "День 20", format: "миф", topic: "Миф: космос — это только для сверхдержав", hook: "28 стран имеют свои космические", source: "UNOOSA / Union of Concerned Scientists" },
];

export interface GrowthPlanDay {
  day: number;
  publish: string;
  time: string;
  count: number;
  platforms: string;
  kpiGate: string;
  actionOnFail: string;
}

export const growthPlan: GrowthPlanDay[] = [
  { day: 1, publish: "3 ролика: шок-цифра × 2 + сравнение × 1", time: "08:00, 13:00, 19:00 MSK", count: 3, platforms: "TikTok + Reels + Shorts (один файл)", kpiGate: "Суммарно > 500 просмотров", actionOnFail: "Сменить хуки на более провокационные, проверить хэштеги" },
  { day: 2, publish: "3 ролика: шок-цифра × 2 + прогноз × 1", time: "07:00, 12:00, 20:00 MSK", count: 3, platforms: "TikTok + Reels + Shorts", kpiGate: "Один ролик > 1000 просмотров", actionOnFail: "A/B тест обложек, смена времени постинга" },
  { day: 3, publish: "3 ролика: шок-цифра + сравнение + миф", time: "08:00, 14:00, 21:00 MSK", count: 3, platforms: "TikTok + Reels + Shorts", kpiGate: "Средний finish rate > 50%", actionOnFail: "Ускорить монтаж, сократить до 25 сек" },
  { day: 4, publish: "3 ролика: шок-цифра × 2 + сравнение × 1", time: "07:30, 13:00, 19:30 MSK", count: 3, platforms: "TikTok + Reels + Shorts", kpiGate: "Первый ролик > 3000 просмотров", actionOnFail: "Использовать трендовый звук TikTok, добавить текст-оверлей" },
  { day: 5, publish: "3 ролика: шок-цифра + прогноз + миф", time: "08:00, 12:30, 20:00 MSK", count: 3, platforms: "TikTok + Reels + Shorts", kpiGate: "Суммарно > 5000 просмотров за 5 дней", actionOnFail: "Проверить, не попал ли в shadowban (0 views на новых)" },
  { day: 6, publish: "3 ролика: сравнение × 2 + шок-цифра × 1", time: "07:00, 13:00, 21:00 MSK", count: 3, platforms: "TikTok + Reels + Shorts", kpiGate: "Первый комментарий-вопрос (вовлечение)", actionOnFail: "Добавить вопрос в конец видео, pinned comment" },
  { day: 7, publish: "3 ролика: лучший формат × 3", time: "08:00, 14:00, 20:00 MSK", count: 3, platforms: "TikTok + Reels + Shorts", kpiGate: "🔴 ГЕЙТ: хотя бы 1 ролик > 10K просмотров", actionOnFail: "СМЕНА НИШИ на запасной вариант (микро-история/карты)" },
  { day: 8, publish: "3 ролика по новой стратегии", time: "07:30, 12:00, 19:00 MSK", count: 3, platforms: "TikTok + Reels + Shorts", kpiGate: "100+ подписчиков", actionOnFail: "Сменить хук-стиль на нарративный" },
  { day: 9, publish: "3 ролика: удвоение лучшего формата", time: "08:00, 13:00, 20:30 MSK", count: 3, platforms: "TikTok + Reels + Shorts", kpiGate: "Один ролик > 5K + 50 shares", actionOnFail: "Добавить сериальность (часть 1, 2, 3)" },
  { day: 10, publish: "3 ролика: масштабирование лидера", time: "07:00, 13:30, 20:00 MSK", count: 3, platforms: "TikTok + Reels + Shorts", kpiGate: "🔴 ГЕЙТ: удвоение ставки на формат с лучшими shares/saves", actionOnFail: "Полный пивот на формат «сравнение стран» или «прогноз»" },
  { day: 11, publish: "4 ролика (если гейт пройден)", time: "07:00, 11:00, 15:00, 20:00 MSK", count: 4, platforms: "TikTok + Reels + Shorts", kpiGate: "500+ подписчиков", actionOnFail: "Вернуться к 3/день, анализировать аналитику" },
  { day: 12, publish: "4 ролика: вирусный потенциал", time: "07:30, 12:00, 16:00, 21:00 MSK", count: 4, platforms: "TikTok + Reels + Shorts", kpiGate: "Один ролик > 50K просмотров", actionOnFail: "Кросс-промо в Reddit/Twitter с ссылкой" },
  { day: 13, publish: "4 ролика: закрепление формата", time: "08:00, 12:00, 16:00, 20:00 MSK", count: 4, platforms: "TikTok + Reels + Shorts", kpiGate: "1000+ подписчиков", actionOnFail: "Коллаб-стиль: дуэт/стич с крупным аккаунтом" },
  { day: 14, publish: "4 ролика + итоговый анализ", time: "07:00, 11:00, 15:00, 19:00 MSK", count: 4, platforms: "TikTok + Reels + Shorts", kpiGate: "🔴 ИТОГ: 3000 подписчиков или пивот", actionOnFail: "Честный отчёт: если < 1000 — смена стратегии или ниши" },
];

export const retentionTimeline = [
  { start: 0, end: 1.5, label: "ХУК", desc: "Визуальный + вербальный: анимированная цифра + обещание награды. Пример: «$2.4 ТРИЛЛИОНА — и это не то, что ты думаешь»", color: "#ef4444" },
  { start: 1.5, end: 8, label: "КОНТЕКСТ", desc: "Усиление ставки: показываем масштаб проблемы. Смена кадра каждые 2с. Текст + анимированный график нарастает.", color: "#f59e0b" },
  { start: 8, end: 25, label: "ДАННЫЕ / РАСКРЫТИЕ", desc: "Основной контент: анимированные графики, сравнения, барчарты. Смена кадра каждые 1.5–2.5с. Каждый кадр = новый инсайт.", color: "#10b981" },
  { start: 25, end: 32, label: "НЕОЖИДАННЫЙ ВЫВОД", desc: "Твист, который хочется переслать: «А теперь самое странное...» + финальная визуализация. Мотивация на share/save.", color: "#6366f1" },
  { start: 32, end: 35, label: "CTA + ПЕТЛЯ", desc: "«Подпишись — завтра будет ещё безумнее» + визуальная петля (последний кадр = первый кадр следующего ролика).", color: "#ec4899" },
];

export const architectureTree = [
  { path: "/pipeline/research.py", desc: "Сбор и валидация данных (источник, дата, лицензия). API-клиенты для World Bank, NASA, UN, SIPRI." },
  { path: "/pipeline/script.py", desc: "Генерация сценария по шаблону + банк хуков из hooks.json. Параметризация по типу формата." },
  { path: "/pipeline/voice.py", desc: "edge-tts: синтез речи, нарезка по фразам, расчёт таймкодов. Голос: ru-RU-DmitryNeural, +8% speed." },
  { path: "/pipeline/visuals.py", desc: "Рендер графиков/карт/кадров: matplotlib, plotly, GeoPandas, Pillow. Вертикальный формат 1080×1920." },
  { path: "/pipeline/captions.py", desc: "faster-whisper для word-level SRT. Кинетические субтитры: подсветка текущего слова, анимация появления." },
  { path: "/pipeline/assemble.py", desc: "ffmpeg/MoviePy сборка мастер-файла: видео + аудио + субтитры. H.264, AAC, ≤ 40 МБ." },
  { path: "/pipeline/compliance.py", desc: "Блокирующий шлюз: проверка уникальности, запрет тем, маркировка synthetic_media, отсутствие вотермарок." },
  { path: "/pipeline/variants.py", desc: "Автогенерация 3 вариантов хука и 2 вариантов обложки на ролик для A/B тестирования." },
  { path: "/pipeline/publish_plan.py", desc: "Календарь публикаций, генерация метаданных, хэштегов и описаний под 3 платформы." },
  { path: "/content/ideas.csv", desc: "Контент-матрица на 60 роликов: дата, тип формата, тема, хук, источник данных." },
  { path: "/content/hooks.json", desc: "Банк из 40 хуков: шаблоны для шок-цифр, сравнений, прогнозов и разборов мифов." },
  { path: "/config.yaml", desc: "Конфигурация: ниша, язык, голос, стиль, лимиты, палитра, шрифты." },
  { path: "/output/", desc: "Готовые mp4 + sidecar .json с метаданными и флагом synthetic_media." },
  { path: "Makefile", desc: "Команды: `make video TOPIC=...`, `make batch N=10`, `make check`, `make publish-plan`." },
];
