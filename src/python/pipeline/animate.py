"""
pipeline/animate.py
Оживление статических кадров в видео с эффектами движения.
Аналог Hyperframe/Runway, но бесплатно и локально.

Эффекты:
- Ken Burns (zoom + pan)
- Плавные переходы (crossfade, slide, morph)
- Параллакс-эффект
- Динамическое масштабирование
"""
import os
import cv2
import numpy as np
from typing import List, Tuple, Optional
from moviepy.editor import ImageClip, concatenate_videoclips, CompositeVideoClip
import yaml

with open("config.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)

W = CONFIG["video"]["width"]
H = CONFIG["video"]["height"]
FPS = CONFIG["video"]["fps"]


class FrameAnimator:
    """Аниматор кадров с эффектами движения."""
    
    def __init__(self, frame_path: str, duration: float):
        self.frame_path = frame_path
        self.duration = duration
        self.frame = cv2.imread(frame_path)
        if self.frame is None:
            raise ValueError(f"Не удалось загрузить кадр: {frame_path}")
        
    def ken_burns_effect(
        self,
        start_scale: float = 1.0,
        end_scale: float = 1.2,
        start_x: float = 0.5,
        start_y: float = 0.5,
        end_x: float = 0.5,
        end_y: float = 0.5
    ) -> ImageClip:
        """
        Ken Burns эффект: плавный zoom + pan.
        
        Args:
            start_scale: Начальный масштаб (1.0 = оригинал)
            end_scale: Конечный масштаб
            start_x, start_y: Начальная точка фокуса (0-1)
            end_x, end_y: Конечная точка фокуса (0-1)
        """
        h, w = self.frame.shape[:2]
        
        def make_frame(t):
            # Прогресс анимации (0 to 1)
            progress = t / self.duration
            
            # Интерполяция масштаба
            scale = start_scale + (end_scale - start_scale) * progress
            
            # Интерполяция позиции
            x = start_x + (end_x - start_x) * progress
            y = start_y + (end_y - start_y) * progress
            
            # Размер области
            new_w = int(w / scale)
            new_h = int(h / scale)
            
            # Координаты обрезки
            x1 = int((w - new_w) * x)
            y1 = int((h - new_h) * y)
            x2 = x1 + new_w
            y2 = y1 + new_h
            
            # Обрезка и масштабирование
            cropped = self.frame[y1:y2, x1:x2]
            resized = cv2.resize(cropped, (W, H), interpolation=cv2.INTER_LANCZOS4)
            
            # BGR to RGB для MoviePy
            return cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
        
        return ImageClip(make_frame, duration=self.duration)
    
    def zoom_in(self, start_scale: float = 1.0, end_scale: float = 1.3) -> ImageClip:
        """Плавный zoom in (приближение)."""
        return self.ken_burns_effect(start_scale, end_scale, 0.5, 0.5, 0.5, 0.5)
    
    def zoom_out(self, start_scale: float = 1.3, end_scale: float = 1.0) -> ImageClip:
        """Плавный zoom out (отдаление)."""
        return self.ken_burns_effect(start_scale, end_scale, 0.5, 0.5, 0.5, 0.5)
    
    def pan_left_to_right(self, scale: float = 1.2) -> ImageClip:
        """Панорама слева направо."""
        return self.ken_burns_effect(scale, scale, 0.2, 0.5, 0.8, 0.5)
    
    def pan_right_to_left(self, scale: float = 1.2) -> ImageClip:
        """Панорама справа налево."""
        return self.ken_burns_effect(scale, scale, 0.8, 0.5, 0.2, 0.5)
    
    def pan_top_to_bottom(self, scale: float = 1.2) -> ImageClip:
        """Панорама сверху вниз."""
        return self.ken_burns_effect(scale, scale, 0.5, 0.2, 0.5, 0.8)
    
    def dynamic_zoom(self, keyframes: List[Tuple[float, float]]) -> ImageClip:
        """
        Динамический zoom с ключевыми кадрами.
        
        Args:
            keyframes: [(time, scale), ...] например [(0, 1.0), (2, 1.3), (4, 1.1)]
        """
        h, w = self.frame.shape[:2]
        
        def make_frame(t):
            # Найти два ближайших ключевых кадра
            prev_kf = keyframes[0]
            next_kf = keyframes[-1]
            
            for i in range(len(keyframes) - 1):
                if keyframes[i][0] <= t <= keyframes[i + 1][0]:
                    prev_kf = keyframes[i]
                    next_kf = keyframes[i + 1]
                    break
            
            # Интерполяция
            if next_kf[0] == prev_kf[0]:
                scale = prev_kf[1]
            else:
                progress = (t - prev_kf[0]) / (next_kf[0] - prev_kf[0])
                scale = prev_kf[1] + (next_kf[1] - prev_kf[1]) * progress
            
            # Обрезка и масштабирование
            new_w = int(w / scale)
            new_h = int(h / scale)
            x1 = (w - new_w) // 2
            y1 = (h - new_h) // 2
            x2 = x1 + new_w
            y2 = y1 + new_h
            
            cropped = self.frame[y1:y2, x1:x2]
            resized = cv2.resize(cropped, (W, H), interpolation=cv2.INTER_LANCZOS4)
            
            return cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
        
        return ImageClip(make_frame, duration=self.duration)


class TransitionEffects:
    """Эффекты переходов между кадрами."""
    
    @staticmethod
    def crossfade(clip1: ImageClip, clip2: ImageClip, duration: float = 0.5) -> CompositeVideoClip:
        """Плавное затухание (crossfade)."""
        clip2 = clip2.set_start(clip1.duration - duration)
        
        def crossfade_filter(get_frame, t):
            frame = get_frame(t)
            if t < clip1.duration - duration:
                return frame
            
            # Прогресс перехода
            progress = (t - (clip1.duration - duration)) / duration
            progress = np.clip(progress, 0, 1)
            
            # Получить кадр из clip2
            frame2 = clip2.get_frame(t - clip1.duration + duration)
            
            # Смешать
            blended = cv2.addWeighted(frame, 1 - progress, frame2, progress, 0)
            return blended
        
        clip1 = clip1.fl(crossfade_filter)
        return CompositeVideoClip([clip1, clip2])
    
    @staticmethod
    def slide_left(clip1: ImageClip, clip2: ImageClip, duration: float = 0.5) -> CompositeVideoClip:
        """Слайд слева направо."""
        def slide_filter(get_frame, t):
            frame = get_frame(t)
            if t < clip1.duration - duration:
                return frame
            
            progress = (t - (clip1.duration - duration)) / duration
            progress = np.clip(progress, 0, 1)
            
            # Сдвиг
            offset = int(W * progress)
            
            # Получить кадр из clip2
            frame2 = clip2.get_frame(t - clip1.duration + duration)
            
            # Создать композицию
            result = np.zeros_like(frame)
            result[:, :W-offset] = frame[:, offset:]
            result[:, W-offset:] = frame2[:, :offset]
            
            return result
        
        clip1 = clip1.fl(slide_filter)
        return clip1
    
    @staticmethod
    def zoom_transition(clip1: ImageClip, clip2: ImageClip, duration: float = 0.5) -> CompositeVideoClip:
        """Zoom переход (приближение к следующему кадру)."""
        def zoom_filter(get_frame, t):
            frame = get_frame(t)
            if t < clip1.duration - duration:
                return frame
            
            progress = (t - (clip1.duration - duration)) / duration
            progress = np.clip(progress, 0, 1)
            
            # Zoom out текущего кадра
            scale = 1.0 + progress * 0.5
            h, w = frame.shape[:2]
            new_w = int(w / scale)
            new_h = int(h / scale)
            x1 = (w - new_w) // 2
            y1 = (h - new_h) // 2
            x2 = x1 + new_w
            y2 = y1 + new_h
            
            cropped = frame[y1:y2, x1:x2]
            zoomed = cv2.resize(cropped, (W, H), interpolation=cv2.INTER_LANCZOS4)
            
            # Получить кадр из clip2
            frame2 = clip2.get_frame(t - clip1.duration + duration)
            
            # Смешать
            blended = cv2.addWeighted(zoomed, 1 - progress, frame2, progress, 0)
            return blended
        
        clip1 = clip1.fl(zoom_filter)
        return clip1


def animate_video(
    frame_paths: List[str],
    durations: List[float],
    effects: List[str],
    transitions: List[str],
    output_path: str,
    audio_path: Optional[str] = None
):
    """
    Создать анимированное видео из статических кадров.
    
    Args:
        frame_paths: Список путей к кадрам
        durations: Длительность каждого кадра
        effects: Эффекты для каждого кадра (ken_burns, zoom_in, pan_left, etc.)
        transitions: Переходы между кадрами (crossfade, slide, zoom)
        output_path: Путь для сохранения видео
        audio_path: Путь к аудиофайлу (опционально)
    """
    clips = []
    
    # Создать анимированные клипы
    for i, (frame_path, duration, effect) in enumerate(zip(frame_paths, durations, effects)):
        animator = FrameAnimator(frame_path, duration)
        
        # Применить эффект
        if effect == "ken_burns":
            clip = animator.ken_burns_effect(1.0, 1.2, 0.3, 0.5, 0.7, 0.5)
        elif effect == "zoom_in":
            clip = animator.zoom_in(1.0, 1.3)
        elif effect == "zoom_out":
            clip = animator.zoom_out(1.3, 1.0)
        elif effect == "pan_left":
            clip = animator.pan_left_to_right(1.2)
        elif effect == "pan_right":
            clip = animator.pan_right_to_left(1.2)
        elif effect == "pan_top":
            clip = animator.pan_top_to_bottom(1.2)
        elif effect == "dynamic":
            # Динамический zoom с ключевыми кадрами
            clip = animator.dynamic_zoom([(0, 1.0), (duration/2, 1.2), (duration, 1.0)])
        else:
            # По умолчанию — статичный кадр
            clip = ImageClip(frame_path, duration=duration).resize((W, H))
        
        clips.append(clip)
    
    # Применить переходы
    if transitions and len(clips) > 1:
        transition_duration = 0.5
        for i in range(len(clips) - 1):
            transition = transitions[i] if i < len(transitions) else "crossfade"
            
            if transition == "crossfade":
                clips[i] = TransitionEffects.crossfade(clips[i], clips[i+1], transition_duration)
                clips[i+1] = clips[i+1].set_start(clips[i].duration - transition_duration)
            elif transition == "slide":
                clips[i] = TransitionEffects.slide_left(clips[i], clips[i+1], transition_duration)
            elif transition == "zoom":
                clips[i] = TransitionEffects.zoom_transition(clips[i], clips[i+1], transition_duration)
    
    # Объединить клипы
    final_video = concatenate_videoclips(clips, method="compose")
    
    # Добавить аудио
    if audio_path and os.path.exists(audio_path):
        from moviepy.editor import AudioFileClip
        audio = AudioFileClip(audio_path)
        final_video = final_video.set_audio(audio)
    
    # Экспорт
    final_video.write_videofile(
        output_path,
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        bitrate="4000k",
        preset="medium",
        threads=2
    )
    
    print(f"[animate] Видео создано: {output_path}")
    return output_path


if __name__ == "__main__":
    # Пример использования
    frame_paths = [
        "output/frames/frame_0000.png",
        "output/frames/frame_0001.png",
        "output/frames/frame_0002.png",
    ]
    durations = [2.0, 3.0, 2.0]
    effects = ["zoom_in", "ken_burns", "zoom_out"]
    transitions = ["crossfade", "slide"]
    
    animate_video(
        frame_paths=frame_paths,
        durations=durations,
        effects=effects,
        transitions=transitions,
        output_path="output/animated_video.mp4",
        audio_path="output/audio.mp3"
    )
