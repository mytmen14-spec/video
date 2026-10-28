"""
pipeline/ai_animate.py
AI-оживление статических кадров через бесплатные модели.
Аналог Hyperframe/Runway Gen-2/Pika Labs, но бесплатно.

Варианты:
1. Stable Video Diffusion (SVD) — локально, нужен GPU
2. AnimateDiff — локально, нужен GPU
3. Deforum — локально, нужен GPU
4. FFmpeg + AI upscaling — без GPU
5. Бесплатные API (Hugging Face Spaces)

Для CPU-only: используем FFmpeg + продвинутые фильтры + интерполяцию.
"""
import os
import subprocess
import json
import requests
import time
from typing import List, Optional, Dict
import yaml

with open("config.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)

W = CONFIG["video"]["width"]
H = CONFIG["video"]["height"]
FPS = CONFIG["video"]["fps"]


# ============================================
# ВАРИАНТ 1: Stable Video Diffusion (нужен GPU)
# ============================================

def animate_with_svd(
    image_path: str,
    output_path: str,
    num_frames: int = 25,
    motion_bucket_id: int = 127,
    fps: int = 7,
    device: str = "cuda"
) -> str:
    """
    Stable Video Diffusion — генерация видео из одного изображения.
    Требует GPU (минимум 8GB VRAM) и torch + diffusers.
    
    Установка:
    pip install torch diffusers accelerate transformers
    
    Args:
        image_path: Путь к исходному изображению
        output_path: Путь для сохранения видео
        num_frames: Количество кадров (14-25)
        motion_bucket_id: Интенсивность движения (1-255)
        fps: FPS выходного видео
        device: "cuda" или "cpu" (на CPU очень медленно)
    """
    try:
        import torch
        from diffusers import StableVideoDiffusionPipeline
        from diffusers.utils import load_image, export_to_video
    except ImportError:
        print("[ai_animate] SVD: Установите torch и diffusers")
        print("  pip install torch diffusers accelerate transformers")
        return ""
    
    if device == "cuda" and not torch.cuda.is_available():
        print("[ai_animate] SVD: GPU не обнаружен, переключаемся на CPU-режим")
        device = "cpu"
    
    print(f"[ai_animate] Загрузка SVD модели...")
    pipe = StableVideoDiffusionPipeline.from_pretrained(
        "stabilityai/stable-video-diffusion-img2vid-xt",
        torch_dtype=torch.float16 if device == "cuda" else torch.float32,
        variant="fp16" if device == "cuda" else None,
    )
    pipe.to(device)
    
    # Загрузка изображения
    image = load_image(image_path)
    image = image.resize((1024, 576))  # SVD требует определённый размер
    
    print(f"[ai_animate] Генерация {num_frames} кадров...")
    generator = torch.manual_seed(42)
    frames = pipe(
        image,
        num_frames=num_frames,
        decode_chunk_size=8,
        generator=generator,
        motion_bucket_id=motion_bucket_id,
        noise_aug_strength=0.1,
    ).frames[0]
    
    # Экспорт
    export_to_video(frames, output_path, fps=fps)
    print(f"[ai_animate] SVD видео создано: {output_path}")
    return output_path


# ============================================
# ВАРИАНТ 2: AnimateDiff (нужен GPU)
# ============================================

def animate_with_animatediff(
    image_path: str,
    output_path: str,
    prompt: str = "smooth camera movement, cinematic",
    num_frames: int = 16,
    device: str = "cuda"
) -> str:
    """
    AnimateDiff — анимация изображений через диффузию.
    Требует GPU (минимум 6GB VRAM).
    
    Установка:
    pip install torch diffusers transformers accelerate
    """
    try:
        import torch
        from diffusers import MotionAdapter, AnimateDiffPipeline, DDIMScheduler
        from diffusers.utils import export_to_gif
    except ImportError:
        print("[ai_animate] AnimateDiff: Установите зависимости")
        return ""
    
    if not torch.cuda.is_available():
        print("[ai_animate] AnimateDiff: Требуется GPU")
        return ""
    
    adapter = MotionAdapter.from_pretrained("guoyww/animatediff-motion-adapter-v1-5-2")
    pipe = AnimateDiffPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",
        motion_adapter=adapter,
        torch_dtype=torch.float16,
    )
    pipe.scheduler = DDIMScheduler.from_config(pipe.scheduler.config)
    pipe.enable_vae_slicing()
    pipe.to("cuda")
    
    # Загрузка изображения как init
    from PIL import Image
    init_image = Image.open(image_path).resize((512, 512))
    
    print(f"[ai_animate] AnimateDiff: генерация {num_frames} кадров...")
    output = pipe(
        prompt=prompt,
        image=init_image,
        num_frames=num_frames,
        guidance_scale=7.5,
        num_inference_steps=20,
    )
    
    # Экспорт
    frames = output.frames[0]
    export_to_gif(frames, output_path.replace(".mp4", ".gif"))
    
    # Конвертация GIF в MP4 через ffmpeg
    subprocess.run([
        "ffmpeg", "-y", "-i", output_path.replace(".mp4", ".gif"),
        "-vf", f"scale={W}:{H}", "-c:v", "libx264", "-pix_fmt", "yuv420p",
        output_path
    ], capture_output=True)
    
    print(f"[ai_animate] AnimateDiff видео создано: {output_path}")
    return output_path


# ============================================
# ВАРИАНТ 3: Hugging Face Spaces (бесплатный API)
# ============================================

class HuggingFaceAnimator:
    """
    Анимация через бесплатные Hugging Face Spaces.
    Не требует GPU — всё выполняется на серверах HF.
    """
    
    SPACES = {
        "svd": "https://stabilityai-stable-video-diffusion.hf.space",
        "animatediff": "https://guoyww-animatediff.hf.space",
        "i2vgen": "https://damo-vilab-i2vgen-xl.hf.space",
    }
    
    @staticmethod
    def animate_via_gradio_api(
        space_url: str,
        image_path: str,
        output_path: str,
        params: Optional[Dict] = None
    ) -> str:
        """
        Отправка изображения в HF Space через Gradio API.
        
        Args:
            space_url: URL HF Space
            image_path: Путь к изображению
            output_path: Путь для сохранения
            params: Дополнительные параметры
        """
        try:
            from gradio_client import Client
        except ImportError:
            print("[ai_animate] Установите: pip install gradio_client")
            return ""
        
        print(f"[ai_animate] Подключение к {space_url}...")
        client = Client(space_url)
        
        # Загрузка изображения
        result = client.predict(
            image_path,
            *(params or {}).values(),
            api_name="/predict"
        )
        
        # Скачивание результата
        if isinstance(result, str) and result.startswith("http"):
            response = requests.get(result, timeout=60)
            with open(output_path, "wb") as f:
                f.write(response.content)
            print(f"[ai_animate] Видео получено: {output_path}")
            return output_path
        
        return ""


# ============================================
# ВАРИАНТ 4: FFmpeg продвинутые фильтры (CPU-only)
# ============================================

def animate_with_ffmpeg(
    frame_paths: List[str],
    output_path: str,
    durations: List[float],
    effects: List[str],
    audio_path: Optional[str] = None
) -> str:
    """
    Продвинутая анимация через FFmpeg фильтры.
    Работает без GPU, создаёт профессиональные эффекты.
    
    Эффекты:
    - zoompan: Ken Burns (zoom + pan)
    - fade: плавные переходы
    - hue: изменение цвета
    - curves: кривые тона
    - unsharp: резкость
    """
    # Создаём список входных файлов
    inputs = []
    filter_parts = []
    
    for i, (path, duration, effect) in enumerate(zip(frame_paths, durations, effects)):
        inputs.extend(["-loop", "1", "-t", str(duration), "-i", path])
        
        # Определяем фильтр
        frames = int(duration * FPS)
        
        if effect == "zoom_in":
            # Плавное приближение
            filter_parts.append(
                f"[{i}:v]scale=8000:-1,zoompan=z='min(zoom+0.0015,1.5)'"
                f":d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
                f":s={W}x{H}:fps={FPS}[v{i}]"
            )
        elif effect == "zoom_out":
            # Плавное отдаление
            filter_parts.append(
                f"[{i}:v]scale=8000:-1,zoompan=z='if(eq(on,1),1.5,max(zoom-0.0015,1.0))'"
                f":d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
                f":s={W}x{H}:fps={FPS}[v{i}]"
            )
        elif effect == "pan_right":
            # Панорама вправо
            filter_parts.append(
                f"[{i}:v]scale=8000:-1,zoompan=z='1.3'"
                f":d={frames}:x='if(eq(on,1),0,min(x+2,iw-iw/zoom))':y='ih/2-(ih/zoom/2)'"
                f":s={W}x{H}:fps={FPS}[v{i}]"
            )
        elif effect == "pan_left":
            # Панорама влево
            filter_parts.append(
                f"[{i}:v]scale=8000:-1,zoompan=z='1.3'"
                f":d={frames}:x='if(eq(on,1),iw-iw/zoom,max(x-2,0))':y='ih/2-(ih/zoom/2)'"
                f":s={W}x{H}:fps={FPS}[v{i}]"
            )
        elif effect == "ken_burns":
            # Комбинированный zoom + pan
            filter_parts.append(
                f"[{i}:v]scale=8000:-1,zoompan=z='min(zoom+0.001,1.3)'"
                f":d={frames}:x='iw/4-(iw/zoom/4)+on*0.5':y='ih/2-(ih/zoom/2)'"
                f":s={W}x{H}:fps={FPS}[v{i}]"
            )
        elif effect == "pulse":
            # Пульсация (zoom in/out)
            filter_parts.append(
                f"[{i}:v]scale=8000:-1,zoompan=z='1.0+0.1*sin(on*0.1)'"
                f":d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
                f":s={W}x{H}:fps={FPS}[v{i}]"
            )
        elif effect == "shake":
            # Лёгкая тряска (для акцента)
            filter_parts.append(
                f"[{i}:v]scale=8000:-1,zoompan=z='1.2'"
                f":d={frames}:x='iw/2-(iw/zoom/2)+3*sin(on*0.5)':y='ih/2-(ih/zoom/2)+3*cos(on*0.5)'"
                f":s={W}x{H}:fps={FPS}[v{i}]"
            )
        else:
            # Статичный кадр с лёгким zoom
            filter_parts.append(
                f"[{i}:v]scale={W}:{H},setsar=1[v{i}]"
            )
    
    # Создаём crossfade переходы
    concat_inputs = "".join(f"[v{i}]" for i in range(len(frame_paths)))
    filter_parts.append(f"{concat_inputs}concat=n={len(frame_paths)}:v=1:a=0[out]")
    
    filter_complex = ";".join(filter_parts)
    
    # Команда FFmpeg
    cmd = ["ffmpeg", "-y"]
    cmd.extend(inputs)
    cmd.extend([
        "-filter_complex", filter_complex,
        "-map", "[out]",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
    ])
    
    # Добавить аудио
    if audio_path and os.path.exists(audio_path):
        cmd.extend(["-i", audio_path, "-c:a", "aac", "-b:a", "128k", "-shortest"])
    
    cmd.append(output_path)
    
    print(f"[ai_animate] FFmpeg анимация...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"[ai_animate] FFmpeg ошибка: {result.stderr[:500]}")
        return ""
    
    print(f"[ai_animate] FFmpeg видео создано: {output_path}")
    return output_path


# ============================================
# ВАРИАНТ 5: Интерполяция кадров (Frame Interpolation)
# ============================================

def interpolate_frames(
    frame_paths: List[str],
    output_dir: str,
    multiplier: int = 4
) -> List[str]:
    """
    Интерполяция промежуточных кадров через FFmpeg minterpolate.
    Создаёт плавное движение между статичными кадрами.
    
    Args:
        frame_paths: Список путей к кадрам
        output_dir: Директория для сохранения
        multiplier: Множитель кадров (4 = каждый кадр → 4 кадра)
    """
    os.makedirs(output_dir, exist_ok=True)
    interpolated = []
    
    for i in range(len(frame_paths) - 1):
        frame1 = frame_paths[i]
        frame2 = frame_paths[i + 1]
        
        # Создаём видео из двух кадров
        temp_video = os.path.join(output_dir, f"temp_{i}.mp4")
        subprocess.run([
            "ffmpeg", "-y",
            "-loop", "1", "-t", "1", "-i", frame1,
            "-loop", "1", "-t", "1", "-i", frame2,
            "-filter_complex",
            f"[0:v]setpts=PTS-STARTPTS[v0];[1:v]setpts=PTS-STARTPTS[v1];"
            f"[v0][v1]xfade=transition=fade:duration=1:offset=0,"
            f"minterpolate=fps={FPS * multiplier}:mi_mode=mci:mc_mode=aobmc"
            f":me_mode=bidir:vsbmc=1[out]",
            "-map", "[out]",
            "-t", "1",
            "-c:v", "libx264", "-preset", "fast",
            temp_video
        ], capture_output=True)
        
        # Извлекаем кадры
        for j in range(multiplier):
            out_frame = os.path.join(output_dir, f"interp_{i}_{j:04d}.png")
            time_pos = j / multiplier
            subprocess.run([
                "ffmpeg", "-y", "-ss", str(time_pos), "-i", temp_video,
                "-vframes", "1", out_frame
            ], capture_output=True)
            if os.path.exists(out_frame):
                interpolated.append(out_frame)
        
        # Удаляем временный файл
        if os.path.exists(temp_video):
            os.remove(temp_video)
    
    print(f"[ai_animate] Интерполировано {len(interpolated)} кадров")
    return interpolated


# ============================================
# ГЛАВНАЯ ФУНКЦИЯ
# ============================================

def animate_frames(
    frame_paths: List[str],
    durations: List[float],
    effects: List[str],
    output_path: str,
    audio_path: Optional[str] = None,
    method: str = "ffmpeg"
) -> str:
    """
    Главная функция: оживление кадров в видео.
    
    Args:
        frame_paths: Список кадров
        durations: Длительность каждого кадра
        effects: Эффекты для каждого кадра
        output_path: Путь для сохранения
        audio_path: Путь к аудио (опционально)
        method: Метод анимации:
            - "ffmpeg": FFmpeg фильтры (CPU, быстро)
            - "svd": Stable Video Diffusion (GPU, медленно)
            - "animatediff": AnimateDiff (GPU, медленно)
            - "hf_api": Hugging Face Spaces (бесплатный API)
            - "interpolate": Интерполяция кадров (CPU)
    """
    if method == "ffmpeg":
        return animate_with_ffmpeg(frame_paths, output_path, durations, effects, audio_path)
    
    elif method == "svd":
        # SVD работает с одним изображением за раз
        clips = []
        for i, (path, duration) in enumerate(zip(frame_paths, durations)):
            clip_path = output_path.replace(".mp4", f"_clip_{i}.mp4")
            animate_with_svd(path, clip_path, num_frames=int(duration * FPS))
            clips.append(clip_path)
        
        # Объединить клипы
        _concat_clips(clips, output_path, audio_path)
        return output_path
    
    elif method == "animatediff":
        clips = []
        for i, (path, duration) in enumerate(zip(frame_paths, durations)):
            clip_path = output_path.replace(".mp4", f"_clip_{i}.mp4")
            animate_with_animatediff(path, clip_path, num_frames=int(duration * FPS))
            clips.append(clip_path)
        
        _concat_clips(clips, output_path, audio_path)
        return output_path
    
    elif method == "hf_api":
        # Использовать бесплатный HF Space
        animator = HuggingFaceAnimator()
        clips = []
        for i, path in enumerate(frame_paths):
            clip_path = output_path.replace(".mp4", f"_clip_{i}.mp4")
            animator.animate_via_gradio_api(
                HuggingFaceAnimator.SPACES["svd"],
                path, clip_path
            )
            clips.append(clip_path)
        
        _concat_clips(clips, output_path, audio_path)
        return output_path
    
    elif method == "interpolate":
        # Интерполяция + сборка
        interp_dir = os.path.join(os.path.dirname(output_path), "interpolated")
        interp_frames = interpolate_frames(frame_paths, interp_dir)
        
        # Собрать из интерполированных кадров
        concat_list = os.path.join(os.path.dirname(output_path), "concat.txt")
        with open(concat_list, "w") as f:
            for frame in interp_frames:
                f.write(f"file '{frame}'\n")
                f.write(f"duration {1.0 / FPS}\n")
        
        cmd = [
            "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list,
            "-c:v", "libx264", "-preset", "medium", "-crf", "18",
            "-pix_fmt", "yuv420p", output_path
        ]
        subprocess.run(cmd, capture_output=True)
        return output_path
    
    else:
        raise ValueError(f"Неизвестный метод: {method}")


def _concat_clips(clip_paths: List[str], output_path: str, audio_path: Optional[str] = None):
    """Объединить клипы в один файл."""
    concat_list = output_path.replace(".mp4", "_concat.txt")
    with open(concat_list, "w") as f:
        for clip in clip_paths:
            if os.path.exists(clip):
                f.write(f"file '{clip}'\n")
    
    cmd = ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list]
    
    if audio_path and os.path.exists(audio_path):
        cmd.extend(["-i", audio_path, "-c:a", "aac", "-b:a", "128k"])
    
    cmd.extend([
        "-c:v", "libx264", "-preset", "medium", "-crf", "18",
        "-pix_fmt", "yuv420p", output_path
    ])
    
    subprocess.run(cmd, capture_output=True)
    
    # Очистка
    for clip in clip_paths:
        if os.path.exists(clip):
            os.remove(clip)
    if os.path.exists(concat_list):
        os.remove(concat_list)


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="AI-оживление кадров")
    parser.add_argument("--frames", nargs="+", required=True, help="Пути к кадрам")
    parser.add_argument("--durations", nargs="+", type=float, required=True)
    parser.add_argument("--effects", nargs="+", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--audio", default=None)
    parser.add_argument("--method", default="ffmpeg",
                       choices=["ffmpeg", "svd", "animatediff", "hf_api", "interpolate"])
    args = parser.parse_args()
    
    result = animate_frames(
        frame_paths=args.frames,
        durations=args.durations,
        effects=args.effects,
        output_path=args.output,
        audio_path=args.audio,
        method=args.method
    )
    
    if result:
        print(f"[ai_animate] ✓ Готово: {result}")
    else:
        print("[ai_animate] ✗ Ошибка анимации")
