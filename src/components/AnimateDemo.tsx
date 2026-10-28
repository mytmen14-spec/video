import { useState, useEffect, useRef } from 'react';
import { animationEffects, transitionEffects, methodComparison } from '../data/animateData';

export default function AnimateDemo() {
  const [selectedEffect, setSelectedEffect] = useState(animationEffects[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [transitionDemo, setTransitionDemo] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const animRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const startTimeRef = useRef<number>(0);

  const frames = [
    'https://image.qwenlm.ai/generated-images/2a695cd5-cbcc-4bf0-b4c0-d746c74be45c/_result.png',
    'https://image.qwenlm.ai/generated-images/a10e148b-374f-43dd-b761-665b81a668fe/_result.png',
    'https://image.qwenlm.ai/generated-images/18b05466-f383-4e46-a64f-91c17daa01c7/_result.png',
    'https://image.qwenlm.ai/generated-images/26233c4c-62bb-42b1-9eb3-0b66601b4a50/_result.png',
  ];

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = performance.now();
      const animate = (now: number) => {
        const elapsed = (now - startTimeRef.current) / 1000;
        const duration = 4; // 4 секунды на цикл
        const t = (elapsed % duration) / duration;
        setProgress(t);
        
        if (transitionDemo) {
          setTransitionProgress(t);
        }
        
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    } else {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    }
    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [isPlaying, transitionDemo]);

  const transform = selectedEffect.cssTransform(progress);
  const transformStyle = {
    transform: `scale(${transform.scale}) translate(${transform.x}%, ${transform.y}%) rotate(${transform.rotate}deg)`,
    transition: 'none',
  };

  // Transition between frames
  const nextFrame = (selectedFrame + 1) % frames.length;
  const transitionStyle = {
    opacity: transitionDemo ? 1 - transitionProgress : 1,
  };
  const nextFrameStyle = {
    opacity: transitionDemo ? transitionProgress : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            🎬 Оживление кадров
          </h1>
          <p className="text-gray-300 text-lg">
            Как Hyperframe / Runway / Pika Labs — но бесплатно и локально
          </p>
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm">✅ 10 эффектов</span>
            <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">🆓 Бюджет $0</span>
            <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">🔥 AI + CPU варианты</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main preview */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
              {/* Preview area */}
              <div className="relative aspect-[9/16] max-h-[70vh] bg-gray-900 overflow-hidden">
                {/* Current frame with effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="w-full h-full"
                    style={transformStyle}
                  >
                    <img
                      src={frames[selectedFrame]}
                      alt="Frame"
                      className="w-full h-full object-cover"
                      style={transitionStyle}
                    />
                    {/* Next frame for transition demo */}
                    {transitionDemo && (
                      <img
                        src={frames[nextFrame]}
                        alt="Next frame"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={nextFrameStyle}
                      />
                    )}
                  </div>
                </div>

                {/* Effect indicator */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-3 py-2 rounded-lg">
                  <p className="text-xs text-gray-400">Эффект:</p>
                  <p className="text-sm font-bold text-white">{selectedEffect.name}</p>
                </div>

                {/* Transform values */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-2 rounded-lg text-xs font-mono">
                  <p className="text-cyan-400">scale: {transform.scale.toFixed(2)}</p>
                  <p className="text-purple-400">x: {transform.x.toFixed(1)}%</p>
                  <p className="text-pink-400">y: {transform.y.toFixed(1)}%</p>
                  <p className="text-amber-400">rotate: {transform.rotate.toFixed(1)}°</p>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-none"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-gray-900 p-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 transition-colors"
                    >
                      {isPlaying ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setTransitionDemo(!transitionDemo)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        transitionDemo
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {transitionDemo ? '🔄 Переход ON' : '🔄 Переход OFF'}
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {frames.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedFrame(i)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                          selectedFrame === i
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Effects panel */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3">🎨 Эффекты оживления</h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {animationEffects.map(effect => (
                  <button
                    key={effect.id}
                    onClick={() => setSelectedEffect(effect)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedEffect.id === effect.id
                        ? 'bg-purple-600/30 border-2 border-purple-500'
                        : 'bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-sm">{effect.name}</span>
                      <div className="flex items-center gap-1">
                        {effect.gpuRequired ? (
                          <span className="text-xs px-1.5 py-0.5 bg-red-900/50 text-red-300 rounded">GPU</span>
                        ) : (
                          <span className="text-xs px-1.5 py-0.5 bg-green-900/50 text-green-300 rounded">CPU</span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">{effect.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Effect details */}
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3">📋 Детали эффекта</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Метод:</span>
                  <span className="text-cyan-400 text-xs font-mono text-right max-w-[60%]">{selectedEffect.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GPU:</span>
                  <span className={selectedEffect.gpuRequired ? 'text-red-400' : 'text-green-400'}>
                    {selectedEffect.gpuRequired ? 'Требуется' : 'Не требуется'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Качество:</span>
                  <span className="text-amber-400">{selectedEffect.quality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Скорость:</span>
                  <span className="text-white text-xs">{selectedEffect.speed}</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowCode(!showCode)}
                className="mt-3 w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {showCode ? '🔼 Скрыть код' : '🔽 Показать код'}
              </button>
              
              {showCode && (
                <div className="mt-3 bg-gray-950 rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs font-mono text-green-400 whitespace-pre">
{selectedEffect.id === 'ken_burns' ? `# FFmpeg
ffmpeg -i input.png -vf "zoompan=z='min(zoom+0.0015,1.5)':d=125:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30" -c:v libx264 output.mp4

# Python (MoviePy)
animator = FrameAnimator("input.png", duration=4.0)
clip = animator.ken_burns_effect(1.0, 1.3, 0.3, 0.5, 0.7, 0.5)` : 
selectedEffect.id === 'svd' ? `# Stable Video Diffusion
pip install torch diffusers accelerate

python pipeline/ai_animate.py \\
  --frames input.png \\
  --method svd \\
  --output output.mp4

# Или через Hugging Face Space (без GPU):
python pipeline/ai_animate.py \\
  --method hf_api \\
  --frames input.png` :
selectedEffect.id === 'animatediff' ? `# AnimateDiff
pip install torch diffusers transformers

python pipeline/ai_animate.py \\
  --frames input.png \\
  --method animatediff \\
  --output output.mp4` :
`# Python (pipeline/animate.py)
animator = FrameAnimator("input.png", duration=4.0)
clip = animator.${selectedEffect.id}()
clip.write_videofile("output.mp4", fps=30)`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Method comparison table */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">📊 Сравнение методов</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">Метод</th>
                  <th className="text-center py-3 px-2 text-gray-400 font-medium">GPU</th>
                  <th className="text-center py-3 px-2 text-gray-400 font-medium">Качество</th>
                  <th className="text-center py-3 px-2 text-gray-400 font-medium">Скорость</th>
                  <th className="text-center py-3 px-2 text-gray-400 font-medium">Цена</th>
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">Лучше для</th>
                </tr>
              </thead>
              <tbody>
                {methodComparison.map((m, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-700/20">
                    <td className="py-3 px-2 text-white font-medium">{m.method}</td>
                    <td className="py-3 px-2 text-center">
                      {m.gpu ? (
                        <span className="text-red-400 text-xs">Да</span>
                      ) : (
                        <span className="text-green-400 text-xs">Нет</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center text-amber-400 text-xs">{m.quality}</td>
                    <td className="py-3 px-2 text-center text-gray-300 text-xs">{m.speed}</td>
                    <td className="py-3 px-2 text-center text-green-400 text-xs font-bold">{m.cost}</td>
                    <td className="py-3 px-2 text-gray-400 text-xs">{m.best_for}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transitions */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">🔄 Переходы между кадрами</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {transitionEffects.map(t => (
              <div key={t.id} className="bg-gray-700/30 rounded-lg p-3 border border-gray-600">
                <p className="font-bold text-white text-sm">{t.name}</p>
                <p className="text-xs text-gray-400">{t.description}</p>
                <p className="text-xs text-cyan-400 mt-1">Длительность: {t.duration}с</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-8 bg-gradient-to-br from-purple-950 to-indigo-950 rounded-xl p-6 border border-purple-700/50">
          <h3 className="text-xl font-bold text-purple-200 mb-4">🧠 Как это работает</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-bold text-purple-300 mb-2">БЕЗ GPU (CPU-only):</h4>
              <ul className="space-y-2 text-sm text-purple-200/80">
                <li>→ <strong>FFmpeg zoompan</strong> — Ken Burns, панорамы, zoom</li>
                <li>→ <strong>MoviePy + OpenCV</strong> — кастомные эффекты</li>
                <li>→ <strong>minterpolate</strong> — плавные переходы между кадрами</li>
                <li>→ <strong>Hugging Face Spaces</strong> — бесплатный AI через API</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-purple-300 mb-2">С GPU (если появится):</h4>
              <ul className="space-y-2 text-sm text-purple-200/80">
                <li>→ <strong>Stable Video Diffusion</strong> — реалистичное AI-движение</li>
                <li>→ <strong>AnimateDiff</strong> — анимация по текстовому промпту</li>
                <li>→ <strong>Deforum</strong> — сложные трансформации</li>
                <li>→ <strong>Результат = Hyperframe/Runway</strong> — но бесплатно!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
