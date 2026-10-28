// Данные для демонстрации эффектов оживления кадров

export interface AnimationEffect {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  method: string;
  gpuRequired: boolean;
  quality: 'high' | 'medium' | 'low';
  speed: string;
  cssTransform: (t: number) => { scale: number; x: number; y: number; rotate: number };
}

export const animationEffects: AnimationEffect[] = [
  {
    id: 'ken_burns',
    name: 'Ken Burns',
    nameEn: 'Ken Burns Effect',
    description: 'Классический эффект документальных фильмов: плавный zoom + pan. Создаёт ощущение движения камеры.',
    method: 'FFmpeg zoompan / CSS transform',
    gpuRequired: false,
    quality: 'high',
    speed: 'Мгновенно (CPU)',
    cssTransform: (t: number) => ({
      scale: 1.0 + t * 0.3,
      x: -t * 5,
      y: -t * 3,
      rotate: 0,
    }),
  },
  {
    id: 'zoom_in',
    name: 'Zoom In',
    nameEn: 'Zoom In (Приближение)',
    description: 'Плавное приближение к центру кадра. Усиливает внимание к деталям.',
    method: 'FFmpeg zoompan / CSS scale',
    gpuRequired: false,
    quality: 'high',
    speed: 'Мгновенно (CPU)',
    cssTransform: (t: number) => ({
      scale: 1.0 + t * 0.4,
      x: 0,
      y: 0,
      rotate: 0,
    }),
  },
  {
    id: 'zoom_out',
    name: 'Zoom Out',
    nameEn: 'Zoom Out (Отдаление)',
    description: 'Плавное отдаление от кадра. Раскрывает контекст, показывает масштаб.',
    method: 'FFmpeg zoompan / CSS scale',
    gpuRequired: false,
    quality: 'high',
    speed: 'Мгновенно (CPU)',
    cssTransform: (t: number) => ({
      scale: 1.4 - t * 0.4,
      x: 0,
      y: 0,
      rotate: 0,
    }),
  },
  {
    id: 'pan_right',
    name: 'Pan Right',
    nameEn: 'Pan Right (Панорама вправо)',
    description: 'Горизонтальная панорама слева направо. Идеально для широких графиков и карт.',
    method: 'FFmpeg zoompan / CSS translateX',
    gpuRequired: false,
    quality: 'high',
    speed: 'Мгновенно (CPU)',
    cssTransform: (t: number) => ({
      scale: 1.3,
      x: -t * 15,
      y: 0,
      rotate: 0,
    }),
  },
  {
    id: 'pan_left',
    name: 'Pan Left',
    nameEn: 'Pan Left (Панорама влево)',
    description: 'Горизонтальная панорама справа налево.',
    method: 'FFmpeg zoompan / CSS translateX',
    gpuRequired: false,
    quality: 'high',
    speed: 'Мгновенно (CPU)',
    cssTransform: (t: number) => ({
      scale: 1.3,
      x: t * 15,
      y: 0,
      rotate: 0,
    }),
  },
  {
    id: 'pulse',
    name: 'Pulse',
    nameEn: 'Pulse (Пульсация)',
    description: 'Ритмичное приближение/отдаление. Привлекает внимание к ключевым цифрам.',
    method: 'CSS scale + sin()',
    gpuRequired: false,
    quality: 'medium',
    speed: 'Мгновенно (CPU)',
    cssTransform: (t: number) => ({
      scale: 1.0 + 0.08 * Math.sin(t * Math.PI * 4),
      x: 0,
      y: 0,
      rotate: 0,
    }),
  },
  {
    id: 'shake',
    name: 'Shake',
    nameEn: 'Shake (Тряска)',
    description: 'Лёгкая тряска для акцента на шоковых данных. Как «удар» по зрителю.',
    method: 'CSS translate + sin/cos',
    gpuRequired: false,
    quality: 'medium',
    speed: 'Мгновенно (CPU)',
    cssTransform: (t: number) => ({
      scale: 1.1,
      x: 3 * Math.sin(t * Math.PI * 8),
      y: 3 * Math.cos(t * Math.PI * 8),
      rotate: 0.5 * Math.sin(t * Math.PI * 6),
    }),
  },
  {
    id: 'parallax',
    name: 'Parallax',
    nameEn: 'Parallax (Параллакс)',
    description: 'Многослойное движение с разной скоростью. Создаёт глубину и 3D-эффект.',
    method: 'CSS multi-layer transform',
    gpuRequired: false,
    quality: 'high',
    speed: 'Мгновенно (CPU)',
    cssTransform: (t: number) => ({
      scale: 1.0 + t * 0.15,
      x: -t * 8,
      y: -t * 4,
      rotate: t * 0.5,
    }),
  },
  {
    id: 'svd',
    name: 'Stable Video Diffusion',
    nameEn: 'SVD (AI-оживление)',
    description: 'AI генерирует реалистичное движение из одного кадра. Как в Hyperframe/Runway.',
    method: 'Stable Video Diffusion (GPU)',
    gpuRequired: true,
    quality: 'high',
    speed: '~30 сек/кадр (GPU 8GB+)',
    cssTransform: (t: number) => ({
      scale: 1.0 + 0.1 * Math.sin(t * Math.PI * 2),
      x: 5 * Math.sin(t * Math.PI * 1.5),
      y: 3 * Math.cos(t * Math.PI * 1.5),
      rotate: 0.3 * Math.sin(t * Math.PI),
    }),
  },
  {
    id: 'animatediff',
    name: 'AnimateDiff',
    nameEn: 'AnimateDiff (AI-анимация)',
    description: 'Диффузионная модель для анимации. Создаёт плавное движение по текстовому промпту.',
    method: 'AnimateDiff + SD 1.5 (GPU)',
    gpuRequired: true,
    quality: 'high',
    speed: '~60 сек/кадр (GPU 6GB+)',
    cssTransform: (t: number) => ({
      scale: 1.0 + 0.15 * Math.sin(t * Math.PI * 3),
      x: 8 * Math.sin(t * Math.PI * 2),
      y: 5 * Math.cos(t * Math.PI * 2),
      rotate: 0.5 * Math.cos(t * Math.PI * 1.5),
    }),
  },
];

export interface TransitionEffect {
  id: string;
  name: string;
  description: string;
  duration: number;
}

export const transitionEffects: TransitionEffect[] = [
  { id: 'crossfade', name: 'Crossfade', description: 'Плавное затухание', duration: 0.5 },
  { id: 'slide_left', name: 'Slide Left', description: 'Слайд влево', duration: 0.5 },
  { id: 'slide_right', name: 'Slide Right', description: 'Слайд вправо', duration: 0.5 },
  { id: 'zoom', name: 'Zoom Transition', description: 'Zoom к следующему кадру', duration: 0.5 },
  { id: 'wipe', name: 'Wipe', description: 'Вытирание', duration: 0.5 },
  { id: 'dissolve', name: 'Dissolve', description: 'Растворение', duration: 0.8 },
];

export const methodComparison = [
  {
    method: 'FFmpeg zoompan',
    gpu: false,
    quality: '★★★★☆',
    speed: 'Мгновенно',
    cost: '$0',
    best_for: 'Ken Burns, панорамы, zoom',
    command: 'ffmpeg -i input.png -vf "zoompan=z=\'min(zoom+0.0015,1.5)\':d=125"',
  },
  {
    method: 'MoviePy + OpenCV',
    gpu: false,
    quality: '★★★★☆',
    speed: '2-5 сек/кадр',
    cost: '$0',
    best_for: 'Кастомные эффекты, composing',
    command: 'python pipeline/animate.py',
  },
  {
    method: 'Frame Interpolation',
    gpu: false,
    quality: '★★★☆☆',
    speed: '10-30 сек/переход',
    cost: '$0',
    best_for: 'Плавные переходы между кадрами',
    command: 'ffmpeg -filter_complex "minterpolate=fps=60"',
  },
  {
    method: 'Stable Video Diffusion',
    gpu: true,
    quality: '★★★★★',
    speed: '30 сек/кадр',
    cost: '$0 (локально)',
    best_for: 'Реалистичное AI-движение',
    command: 'python pipeline/ai_animate.py --method svd',
  },
  {
    method: 'AnimateDiff',
    gpu: true,
    quality: '★★★★★',
    speed: '60 сек/кадр',
    cost: '$0 (локально)',
    best_for: 'Анимация по текстовому промпту',
    command: 'python pipeline/ai_animate.py --method animatediff',
  },
  {
    method: 'Hugging Face Spaces',
    gpu: false,
    quality: '★★★★☆',
    speed: '1-3 мин/кадр',
    cost: '$0 (бесплатный API)',
    best_for: 'Без GPU, через облако',
    command: 'python pipeline/ai_animate.py --method hf_api',
  },
];
