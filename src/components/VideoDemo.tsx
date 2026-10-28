import { useState, useEffect, useRef } from 'react';
import { demoVideos } from '../data/videoDemoData';

export default function VideoDemo() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastSpokenRef = useRef<string>('');

  const currentVideo = demoVideos[currentVideoIndex];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 0.1;
          if (newTime >= currentVideo.totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return newTime;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentVideo.totalDuration]);

  // Функция озвучки текста
  const speak = (text: string) => {
    if (!voiceEnabled || isMuted || !('speechSynthesis' in window)) return;
    
    // Не повторяем уже озвученный текст
    if (lastSpokenRef.current === text) return;
    lastSpokenRef.current = text;
    
    // Остановить предыдущую речь
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 1.08; // +8% как в конфиге
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Попробовать найти русский голос
    const voices = window.speechSynthesis.getVoices();
    const russianVoice = voices.find(v => v.lang.startsWith('ru'));
    if (russianVoice) {
      utterance.voice = russianVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Найти текущий кадр
    const frameIndex = currentVideo.frames.findIndex(
      (frame) => currentTime >= frame.startTime && currentTime < frame.endTime
    );
    if (frameIndex !== -1) {
      setCurrentFrameIndex(frameIndex);
      const frame = currentVideo.frames[frameIndex];
      
      // Найти текущие субтитры
      const subtitle = frame.subtitles.find(
        (sub) => currentTime >= sub.startTime && currentTime < sub.endTime
      );
      const newSubtitle = subtitle?.text || '';
      setCurrentSubtitle(newSubtitle);
      
      // Озвучить субтитры
      if (newSubtitle && isPlaying) {
        speak(newSubtitle);
      }
    }
  }, [currentTime, currentVideo, isPlaying]);

  const handlePlayPause = () => {
    const newPlaying = !isPlaying;
    setIsPlaying(newPlaying);
    if (!newPlaying) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    lastSpokenRef.current = ''; // Сбросить при перемотке
    window.speechSynthesis.cancel();
  };

  const handleRestart = () => {
    setCurrentTime(0);
    lastSpokenRef.current = '';
    window.speechSynthesis.cancel();
    setIsPlaying(true);
  };

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (newMuted) {
      window.speechSynthesis.cancel();
    }
  };

  const handleVoiceToggle = () => {
    const newEnabled = !voiceEnabled;
    setVoiceEnabled(newEnabled);
    if (!newEnabled) {
      window.speechSynthesis.cancel();
    }
  };

  // Очистка речи при размонтировании
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Загрузка голосов
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentFrame = currentVideo.frames[currentFrameIndex];
  const progress = (currentTime / currentVideo.totalDuration) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          🎬 Интерактивная демо-страница
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Имитация видео через последовательность кадров с таймингами
        </p>

        {/* Video selector */}
        <div className="flex justify-center gap-4 mb-8">
          {demoVideos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => {
                setCurrentVideoIndex(index);
                setCurrentTime(0);
                setIsPlaying(false);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentVideoIndex === index
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {video.title}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video player */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Video frame */}
              <div className="relative aspect-[9/16] max-h-[80vh] bg-gray-900">
                <img
                  src={currentFrame.imageUrl}
                  alt={`Frame ${currentFrame.id}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Subtitles overlay */}
                <div className="absolute bottom-24 left-0 right-0 px-8">
                  {currentSubtitle && (
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] inline-block px-4 py-2 bg-black/40 rounded-lg">
                        {currentSubtitle}
                      </p>
                    </div>
                  )}
                </div>

                {/* Segment indicator */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    currentFrame.segment === 'hook' ? 'bg-red-500 text-white' :
                    currentFrame.segment === 'context' ? 'bg-amber-500 text-white' :
                    currentFrame.segment === 'data' ? 'bg-emerald-500 text-white' :
                    currentFrame.segment === 'twist' ? 'bg-indigo-500 text-white' :
                    'bg-pink-500 text-white'
                  }`}>
                    {currentFrame.segment === 'hook' && '🎯 ХУК'}
                    {currentFrame.segment === 'context' && '📖 КОНТЕКСТ'}
                    {currentFrame.segment === 'data' && '📊 ДАННЫЕ'}
                    {currentFrame.segment === 'twist' && '💡 ТВИСТ'}
                    {currentFrame.segment === 'cta' && '🔔 CTA'}
                  </span>
                </div>

                {/* Time indicator */}
                <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-lg">
                  <span className="text-white font-mono text-sm">
                    {formatTime(currentTime)} / {formatTime(currentVideo.totalDuration)}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-gray-900 p-4">
                {/* Progress bar */}
                <div className="mb-4">
                  <div
                    className="relative h-2 bg-gray-700 rounded-full cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = x / rect.width;
                      handleSeek(percentage * currentVideo.totalDuration);
                    }}
                  >
                    <div
                      className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-all"
                      style={{ left: `${progress}%`, marginLeft: '-8px' }}
                    />
                    
                    {/* Segment markers */}
                    {currentVideo.frames.map((frame, index) => (
                      <div
                        key={index}
                        className="absolute top-0 bottom-0 w-0.5 bg-white/30"
                        style={{ left: `${(frame.startTime / currentVideo.totalDuration) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleRestart}
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Начать сначала"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={handlePlayPause}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 transition-colors shadow-lg"
                    >
                      {isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>

                    {/* Voice toggle */}
                    <button
                      onClick={handleVoiceToggle}
                      className={`p-2 rounded-full transition-colors ${
                        voiceEnabled
                          ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                      title={voiceEnabled ? 'Выключить озвучку' : 'Включить озвучку'}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        {voiceEnabled ? (
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        ) : (
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0L20 6.828l-1.414 1.414L14.657 4.343a1 1 0 010-1.414z" clipRule="evenodd" />
                        )}
                      </svg>
                    </button>

                    {/* Mute toggle */}
                    <button
                      onClick={handleMuteToggle}
                      className={`p-2 rounded-full transition-colors ${
                        !isMuted
                          ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                      title={isMuted ? 'Включить звук' : 'Выключить звук'}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        {isMuted ? (
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        ) : (
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0L20 6.828l-1.414 1.414L14.657 4.343a1 1 0 010-1.414z" clipRule="evenodd" />
                        )}
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {voiceEnabled && (
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Озвучка
                      </span>
                    )}
                    <div className="text-gray-400 text-sm">
                      Кадр {currentFrameIndex + 1} / {currentVideo.frames.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline & Info */}
          <div className="space-y-6">
            {/* Video info */}
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">{currentVideo.title}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Формат:</span>
                  <span className="text-purple-400 font-semibold">{currentVideo.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Длительность:</span>
                  <span className="text-white">{currentVideo.totalDuration}с</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Кадров:</span>
                  <span className="text-white">{currentVideo.frames.length}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Таймлайн</h3>
              <div className="space-y-3">
                {currentVideo.frames.map((frame, index) => {
                  const isActive = index === currentFrameIndex;
                  const duration = frame.endTime - frame.startTime;
                  
                  return (
                    <div
                      key={frame.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        isActive
                          ? 'bg-purple-600/30 border-2 border-purple-500'
                          : 'bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50'
                      }`}
                      onClick={() => handleSeek(frame.startTime)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${
                          frame.segment === 'hook' ? 'text-red-400' :
                          frame.segment === 'context' ? 'text-amber-400' :
                          frame.segment === 'data' ? 'text-emerald-400' :
                          frame.segment === 'twist' ? 'text-indigo-400' :
                          'text-pink-400'
                        }`}>
                          {frame.segment.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                          {formatTime(frame.startTime)} - {formatTime(frame.endTime)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-300">
                        Длительность: {duration.toFixed(1)}с
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current subtitle */}
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                Текущие субтитры
                {currentSubtitle && voiceEnabled && !isMuted && (
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Озвучивается
                  </span>
                )}
              </h3>
              <div className="bg-black/50 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
                <p className="text-xl font-bold text-white text-center">
                  {currentSubtitle || '—'}
                </p>
              </div>
              {currentSubtitle && (
                <div className="mt-3 text-xs text-gray-400">
                  <p>🔊 Голос: Русский (ru-RU)</p>
                  <p>⚡ Скорость: 1.08× (+8%)</p>
                  <p>🎙️ Технология: Web Speech API</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gray-800/30 backdrop-blur rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">💡 Как использовать</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div>
              <p className="font-semibold text-purple-400 mb-2">▶️ Воспроизведение:</p>
              <ul className="space-y-1 text-gray-400">
                <li>• Нажмите кнопку Play для запуска</li>
                <li>• Кадры меняются автоматически по таймингам</li>
                <li>• Субтитры появляются синхронно с кадрами</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-purple-400 mb-2">🔊 Озвучка:</p>
              <ul className="space-y-1 text-gray-400">
                <li>• 🎙️ Кнопка «Озвучка» — вкл/выкл голос</li>
                <li>• 🔇 Кнопка «Звук» — полный mute</li>
                <li>• Используется русский голос (ru-RU)</li>
                <li>• Скорость: +8% (как в конфиге)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-purple-400 mb-2">🎯 Навигация:</p>
              <ul className="space-y-1 text-gray-400">
                <li>• Кликайте на прогресс-бар для перемотки</li>
                <li>• Кликайте на сегменты таймлайна для перехода</li>
                <li>• Кнопка Restart для начала сначала</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-950/30 border border-blue-700/50 rounded-lg">
            <p className="text-blue-200 text-xs">
              🔊 <strong>Технология озвучки:</strong> Web Speech API (встроенный в браузер). 
              Используется русский голос с настройками: скорость 1.08×, тон 1.0. 
              Это имитация работы edge-tts (ru-RU-DmitryNeural) из реального пайплайна.
              Для настоящей озвучки — запустите <code className="bg-blue-900/50 px-1 rounded">make video</code> локально.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
