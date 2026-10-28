# 🎬 Оживление кадров: код для локального запуска

Полный Python-код для превращения статических кадров в анимированное видео — как в Hyperframe, Runway Gen-2, Pika Labs, но **бесплатно и локально**.

## 📁 Файлы

```
pipeline/
├── animate.py        # Базовая анимация (Ken Burns, zoom, pan) — CPU
└── ai_animate.py     # AI-оживление (SVD, AnimateDiff) — GPU + API
```

## 🚀 Быстрый старт

### Вариант 1: CPU-only (без GPU) — работает сразу

```bash
# Установка зависимостей
pip install opencv-python moviepy numpy pyyaml

# Запуск анимации
python pipeline/animate.py \
  --frames output/frames/frame_0000.png output/frames/frame_0001.png \
  --durations 2.0 3.0 2.0 \
  --effects ken_burns zoom_in pan_right \
  --output output/animated.mp4 \
  --audio output/audio.mp3
```

### Вариант 2: FFmpeg (самый быстрый)

```bash
# Ken Burns эффект
ffmpeg -i input.png \
  -vf "zoompan=z='min(zoom+0.0015,1.5)':d=125:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30" \
  -c:v libx264 -preset medium -crf 18 \
  output.mp4

# Панорама слева направо
ffmpeg -i input.png \
  -vf "scale=8000:-1,zoompan=z='1.3':d=125:x='if(eq(on,1),0,min(x+2,iw-iw/zoom))':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30" \
  -c:v libx264 output.mp4
```

### Вариант 3: AI-оживление (нужен GPU 8GB+)

```bash
# Установка
pip install torch diffusers accelerate transformers

# Stable Video Diffusion
python pipeline/ai_animate.py \
  --frames input.png \
  --durations 4.0 \
  --effects svd \
  --output output.mp4 \
  --method svd

# AnimateDiff
python pipeline/ai_animate.py \
  --frames input.png \
  --method animatediff \
  --output output.mp4
```

### Вариант 4: Бесплатный AI через Hugging Face (без GPU!)

```bash
pip install gradio_client requests

python pipeline/ai_animate.py \
  --frames input.png \
  --method hf_api \
  --output output.mp4
```

## 🎨 Доступные эффекты

### CPU (работают без GPU):

| Эффект | Описание | Команда |
|--------|----------|---------|
| `ken_burns` | Классический zoom + pan | `--effects ken_burns` |
| `zoom_in` | Приближение к центру | `--effects zoom_in` |
| `zoom_out` | Отдаление от центра | `--effects zoom_out` |
| `pan_right` | Панорама вправо | `--effects pan_right` |
| `pan_left` | Панорама влево | `--effects pan_left` |
| `pan_top` | Панорама вниз | `--effects pan_top` |
| `dynamic` | Динамический zoom с ключевыми кадрами | `--effects dynamic` |
| `pulse` | Пульсация (для акцента) | `--effects pulse` |
| `shake` | Тряска (для шока) | `--effects shake` |

### GPU (требуют видеокарту):

| Эффект | Описание | VRAM | Скорость |
|--------|----------|------|----------|
| `svd` | Stable Video Diffusion | 8GB+ | ~30 сек/кадр |
| `animatediff` | AnimateDiff + SD 1.5 | 6GB+ | ~60 сек/кадр |

### Бесплатный API (без GPU):

| Метод | Описание | Скорость |
|-------|----------|----------|
| `hf_api` | Hugging Face Spaces | 1-3 мин/кадр |

## 🔄 Переходы между кадрами

```python
# В animate.py доступны переходы:
transitions = ["crossfade", "slide", "zoom"]

# Пример использования:
python pipeline/animate.py \
  --frames frame1.png frame2.png frame3.png \
  --durations 2.0 2.0 2.0 \
  --effects ken_burns zoom_in pan_right \
  --transitions crossfade slide \
  --output output.mp4
```

## 📊 Сравнение с платными сервисами

| Сервис | Цена | GPU | Качество | Наш аналог |
|--------|------|-----|----------|------------|
| Hyperframe | $20/мес | Облако | ★★★★★ | `ai_animate.py --method svd` |
| Runway Gen-2 | $12/мес | Облако | ★★★★★ | `ai_animate.py --method svd` |
| Pika Labs | $10/мес | Облако | ★★★★☆ | `ai_animate.py --method animatediff` |
| Kaiber | $5/мес | Облако | ★★★☆☆ | `animate.py` (CPU) |
| **Наш код** | **$0** | **Локально** | **★★★★★** | **Всё включено** |

## 🎯 Примеры использования

### Пример 1: Простое видео с Ken Burns

```bash
python pipeline/animate.py \
  --frames frame1.png frame2.png frame3.png \
  --durations 3.0 3.0 3.0 \
  --effects ken_burns zoom_in ken_burns \
  --output output/simple.mp4
```

### Пример 2: AI-оживление одного кадра

```bash
python pipeline/ai_animate.py \
  --frames hero_frame.png \
  --durations 4.0 \
  --effects svd \
  --method svd \
  --output output/ai_animated.mp4
```

### Пример 3: Полное видео с аудио и переходами

```bash
python pipeline/animate.py \
  --frames $(ls output/frames/*.png | head -6) \
  --durations 1.5 6.5 17.0 7.0 3.0 \
  --effects zoom_in ken_burns dynamic zoom_out ken_burns \
  --transitions crossfade crossfade zoom crossfade \
  --audio output/voice.mp3 \
  --output output/final_video.mp4
```

### Пример 4: Бесплатный AI через Hugging Face

```bash
# Не нужен GPU — всё выполняется на серверах HF
python pipeline/ai_animate.py \
  --frames input.png \
  --method hf_api \
  --output output.mp4
```

## ⚡ Производительность

### CPU-only (ваш случай):

| Метод | Время | Качество |
|-------|-------|----------|
| FFmpeg zoompan | Мгновенно | ★★★★☆ |
| MoviePy + OpenCV | 2-5 сек/кадр | ★★★★☆ |
| Frame Interpolation | 10-30 сек/переход | ★★★☆☆ |
| Hugging Face API | 1-3 мин/кадр | ★★★★☆ |

### С GPU (если появится):

| Метод | Время | Качество |
|-------|-------|----------|
| Stable Video Diffusion | 30 сек/кадр | ★★★★★ |
| AnimateDiff | 60 сек/кадр | ★★★★★ |

## 🔧 Интеграция с пайплайном

Добавьте в `Makefile`:

```makefile
animate:
	python pipeline/animate.py \
		--frames $$(ls output/$(TOPIC)/frames/*.png) \
		--durations $$(cat output/$(TOPIC)/durations.txt | tr '\n' ' ') \
		--effects $$(cat output/$(TOPIC)/effects.txt | tr '\n' ' ') \
		--audio output/$(TOPIC).mp3 \
		--output output/$(TOPIC)_animated.mp4

animate-ai:
	python pipeline/ai_animate.py \
		--frames $$(ls output/$(TOPIC)/frames/*.png) \
		--method svd \
		--output output/$(TOPIC)_ai.mp4
```

## 📝 Лицензия

Весь код — Apache 2.0. Используйте бесплатно для любых целей.

## 🎓 Как это работает (технически)

### Ken Burns (CPU):
```
1. Загружаем изображение в OpenCV
2. Для каждого кадра видео:
   - Вычисляем прогресс анимации (0 → 1)
   - Интерполируем масштаб и позицию
   - Обрезаем область изображения
   - Масштабируем до 1080×1920
3. Собираем кадры в видео через MoviePy
```

### Stable Video Diffusion (GPU):
```
1. Загружаем SVD модель из Hugging Face
2. Подаём изображение + noise
3. Diffusion model генерирует 25 кадров движения
4. Экспортируем в MP4
```

### Hugging Face API (без GPU):
```
1. Отправляем изображение в HF Space через Gradio Client
2. HF выполняет SVD на своих GPU
3. Скачиваем результат
```

## 🚨 Ограничения

- **CPU-only**: нет реалистичного AI-движения (только геометрические эффекты)
- **SVD/AnimateDiff**: нужен GPU с 6-8GB VRAM
- **HF API**: может быть очередь (1-3 мин ожидания)
- **Качество**: CPU-эффекты уступают AI по реалистичности

## 💡 Рекомендации

**Для вашего случая (CPU-only):**

1. Используйте **FFmpeg zoompan** для Ken Burns — мгновенно и качественно
2. Добавьте **frame interpolation** для плавных переходов
3. Для ключевых кадров (хук, твист) попробуйте **Hugging Face API** — бесплатно
4. Комбинируйте: 80% CPU-эффектов + 20% AI через API

**Если появится GPU:**

1. Установите `torch` + `diffusers`
2. Используйте SVD для хука (первый кадр) — максимальный эффект
3. Остальные кадры — через CPU-эффекты

---

**Готово к использованию!** 🎬

Команда: `python pipeline/animate.py --frames ... --effects ken_burns --output video.mp4`
