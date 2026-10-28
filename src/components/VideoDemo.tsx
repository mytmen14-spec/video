import { useState, useEffect, useRef } from 'react';
import { demoVideos } from '../data/videoDemoData';

export default function VideoDemo() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      setCurrentSubtitle(subtitle?.text || '');
    }
  }, [currentTime, currentVideo]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

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
                  </div>

                  <div className="text-gray-400 text-sm">
                    Кадр {currentFrameIndex + 1} / {currentVideo.frames.length}
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
              <h3 className="text-lg font-bold text-white mb-4">Текущие субтитры</h3>
              <div className="bg-black/50 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
                <p className="text-xl font-bold text-white text-center">
                  {currentSubtitle || '—'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gray-800/30 backdrop-blur rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">💡 Как использовать</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p className="font-semibold text-purple-400 mb-2">▶️ Воспроизведение:</p>
              <ul className="space-y-1 text-gray-400">
                <li>• Нажмите кнопку Play для запуска</li>
                <li>• Кадры меняются автоматически по таймингам</li>
                <li>• Субтитры появляются синхронно с кадрами</li>
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
        </div>
      </div>
    </div>
  );
}
