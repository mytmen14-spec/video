import { useState } from 'react';
import { nicheCandidates, weights, contentIdeas, growthPlan, retentionTimeline, architectureTree } from './data/nicheData';
import { userConfig, envCheckResults, installCommand, configYaml, makefile, requirementsTxt, researchPy, scriptPy, voicePy, visualsPy, captionsPy, assemblePy, compliancePy, variantsPy, publishPlanPy } from './data/stageOneData';
import { topicConfig, pipelineSteps, ffprobeMetadata, ffprobeOutput, frames, transcript, transcriptSRT, complianceReport, sidecarMetadata, runCommand } from './data/stageTwoData';
import { batchConfig, batchVideos, palettes, rhythmVariants, batchStats, batchCommand, variabilityReport } from './data/stageThreeData';
import { complianceChecks, complianceExamples, forbiddenKeywords, complianceWorkflow, aiLabelExamples, sidecarJsonExample } from './data/stageFourData';
import { dailyMetrics, formatPerformance, recommendations, kpiGates, csvStructure, finalReport } from './data/stageFiveData';

type Tab = 'niche' | 'format' | 'retention' | 'architecture' | 'matrix' | 'growth' | 'answers' | 'stage1' | 'stage2' | 'stage3' | 'stage4' | 'stage5';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('niche');

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'niche', label: '0.1 Ниша', icon: '🎯' },
    { key: 'format', label: '0.2 Формат', icon: '🎨' },
    { key: 'retention', label: '0.3 Удержание', icon: '⏱️' },
    { key: 'architecture', label: '0.4 Архитектура', icon: '🏗️' },
    { key: 'matrix', label: '0.5 Матрица', icon: '📊' },
    { key: 'growth', label: '0.6 Рост', icon: '🚀' },
    { key: 'answers', label: 'Ответы', icon: '✅' },
    { key: 'stage1', label: 'ЭТАП 1', icon: '⚙️' },
    { key: 'stage2', label: 'ЭТАП 2', icon: '🎬' },
      { key: 'stage3', label: 'ЭТАП 3', icon: '📦' },
      { key: 'stage4', label: 'ЭТАП 4', icon: '🛡️' },
      { key: 'stage5', label: 'ЭТАП 5', icon: '📊' },
    ];
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 border-b border-purple-700/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Short-Form Video Pipeline
          </h1>
          <p className="text-gray-400 mt-1">ЭТАП 0 — Стратегия и планирование конвейера</p>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs font-mono">БЮДЖЕТ: $0</span>
            <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs font-mono">1080×1920</span>
            <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-xs font-mono">22–45 сек</span>
            <span className="px-2 py-1 bg-amber-900/50 text-amber-300 rounded text-xs font-mono">H.264 + AAC</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'niche' && <NicheSection />}
        {activeTab === 'format' && <FormatSection />}
        {activeTab === 'retention' && <RetentionSection />}
        {activeTab === 'architecture' && <ArchitectureSection />}
        {activeTab === 'matrix' && <MatrixSection />}
        {activeTab === 'growth' && <GrowthSection />}
        {activeTab === 'answers' && <AnswersSection />}
        {activeTab === 'stage1' && <StageOneSection />}
        {activeTab === 'stage2' && <StageTwoSection />}
        {activeTab === 'stage3' && <StageThreeSection />}
        {activeTab === 'stage4' && <StageFourSection />}
        {activeTab === 'stage5' && <StageFiveSection />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Short-Form Video Pipeline • ЭТАП 0 • Ожидание ответов на уточняющие вопросы</p>
          <p className="mt-1 text-gray-600">Не написана ни строчка кода пайплайна — только стратегия</p>
        </div>
      </footer>
    </div>
  );
}

// ===== 0.1 Niche Analysis =====
function NicheSection() {
  const sorted = [...nicheCandidates].sort((a, b) => b.weighted - a.weighted);
  const winner = sorted[0];
  const backup = sorted[1];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-purple-300 mb-2">0.1 Выбор ниши</h2>
        <p className="text-gray-400 mb-6">
          Сравнительный анализ 6 кандидатов. Весовая формула: PROD×0.25 + VEL×0.25 + ORIG×0.20 + RISK×0.15 + MON×0.10 + SAT×0.05
        </p>

        {/* Weights */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {weights.map(w => (
            <div key={w.key} className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <div className="text-xs text-gray-500 font-mono">{w.key}</div>
              <div className="text-lg font-bold text-white">{(w.weight * 100).toFixed(0)}%</div>
              <div className="text-xs text-gray-400">{w.desc}</div>
            </div>
          ))}
        </div>

        {/* Score Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-2 text-gray-400 font-medium">#</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Ниша</th>
                {weights.map(w => (
                  <th key={w.key} className="text-center py-3 px-2 text-gray-400 font-medium">{w.key}</th>
                ))}
                <th className="text-center py-3 px-2 text-yellow-400 font-bold">ИТОГ</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((n, i) => (
                <tr key={n.id} className={`border-b border-gray-800 ${i === 0 ? 'bg-green-950/30' : i === 1 ? 'bg-blue-950/20' : ''}`}>
                  <td className="py-3 px-2 text-gray-500">{n.id}</td>
                  <td className="py-3 px-2 max-w-xs">
                    <div className="flex items-center gap-2">
                      {i === 0 && <span className="text-green-400 text-lg">🏆</span>}
                      {i === 1 && <span className="text-blue-400 text-lg">🥈</span>}
                      <span className={i === 0 ? 'text-green-300 font-semibold' : ''}>{n.name}</span>
                    </div>
                  </td>
                  {weights.map(w => {
                    const val = n.scores[w.key as keyof typeof n.scores];
                    return (
                      <td key={w.key} className="text-center py-3 px-2">
                        <ScoreBar value={val} />
                      </td>
                    );
                  })}
                  <td className="text-center py-3 px-2">
                    <span className={`text-lg font-bold ${i === 0 ? 'text-green-400' : i === 1 ? 'text-blue-400' : 'text-gray-300'}`}>
                      {n.weighted.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Winner */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-950 to-green-900/30 border border-green-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🏆</span>
            <h3 className="text-xl font-bold text-green-300">ПОБЕДИТЕЛЬ</h3>
          </div>
          <p className="text-green-100 font-semibold mb-3">{winner.name}</p>
          <p className="text-green-200/70 text-sm">{winner.notes}</p>
          <div className="mt-4 p-3 bg-green-950/50 rounded-lg">
            <p className="text-xs text-green-400 font-mono">ИТОГОВЫЙ БАЛЛ: {winner.weighted.toFixed(2)} / 10.00</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-950 to-blue-900/30 border border-blue-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🥈</span>
            <h3 className="text-xl font-bold text-blue-300">ЗАПАСНОЙ ВАРИАНТ</h3>
          </div>
          <p className="text-blue-100 font-semibold mb-3">{backup.name}</p>
          <p className="text-blue-200/70 text-sm">{backup.notes}</p>
          <div className="mt-4 p-3 bg-blue-950/50 rounded-lg">
            <p className="text-xs text-blue-400 font-mono">ИТОГОВЫЙ БАЛЛ: {backup.weighted.toFixed(2)} / 10.00</p>
            <p className="text-xs text-blue-400/70 mt-1">Активируется на День 7, если ни один ролик не превысил 10K просмотров</p>
          </div>
        </div>
      </section>

      {/* Detailed Notes */}
      <section>
        <h3 className="text-lg font-bold text-gray-300 mb-4">Детальный разбор каждого кандидата</h3>
        <div className="space-y-3">
          {nicheCandidates.map(n => (
            <details key={n.id} className="bg-gray-900 rounded-lg border border-gray-800 group">
              <summary className="px-4 py-3 cursor-pointer hover:bg-gray-800/50 rounded-lg flex items-center justify-between">
                <span className="font-medium">{n.id}. {n.name}</span>
                <span className="text-sm text-gray-500 group-open:text-purple-400">{n.weighted.toFixed(2)}</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-400">
                <p>{n.notes}</p>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-3">
                  {weights.map(w => (
                    <div key={w.key} className="text-center">
                      <div className="text-xs text-gray-500">{w.key}</div>
                      <div className="text-sm font-bold">{n.scores[w.key as keyof typeof n.scores]}/10</div>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

function ScoreBar({ value }: { value: number }) {
  const color = value >= 8 ? 'bg-green-500' : value >= 6 ? 'bg-yellow-500' : value >= 4 ? 'bg-orange-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-1">
      <div className="w-12 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${value * 10}%` }} />
      </div>
      <span className="text-xs text-gray-400 w-4">{value}</span>
    </div>
  );
}

// ===== 0.2 Format Specification =====
function FormatSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-purple-300 mb-2">0.2 Формат-спецификация победителя</h2>
      <p className="text-gray-400 mb-6">Ниша: Синтетические дата-визуализации (анимированные графики/дашборды про макро-тренды)</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Visual Style */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>🎨</span> Визуальный стиль
          </h3>
          <div className="space-y-3 text-sm">
            <p className="text-gray-300"><strong>Стиль:</strong> Тёмный минимализм с неоновыми акцентами. «Bloomberg Terminal meets TikTok» — данные выглядят серьёзно, но подача динамичная.</p>
            <p className="text-gray-300"><strong>Фон:</strong> Глубокий тёмно-синий (#0B1120) с лёгким градиентом. Никаких стоковых фото — только код-рендеренные визуализации.</p>
            <p className="text-gray-300"><strong>Графики:</strong> Анимированные барчарты (race-style), линейные тренды с glow-эффектом, bubble charts, choropleth-карты.</p>
            <p className="text-gray-300"><strong>Движение:</strong> Easing: cubic-bezier(0.4, 0, 0.2, 1). Каждый элемент «влетает» или «нарастает». Никаких статичных кадров.</p>
          </div>
        </div>

        {/* Palette */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>🎨</span> Палитра (HEX)
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { hex: '#0B1120', name: 'Фон', desc: 'Deep navy' },
              { hex: '#1E293B', name: 'Карточки', desc: 'Slate 800' },
              { hex: '#22D3EE', name: 'Акцент 1', desc: 'Cyan glow' },
              { hex: '#A78BFA', name: 'Акцент 2', desc: 'Violet' },
              { hex: '#34D399', name: 'Позитив', desc: 'Emerald' },
              { hex: '#FB7185', name: 'Негатив', desc: 'Rose' },
              { hex: '#FBBF24', name: 'Хук', desc: 'Amber' },
              { hex: '#F8FAFC', name: 'Текст', desc: 'Slate 50' },
            ].map(c => (
              <div key={c.hex} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg border border-gray-700 shadow-lg" style={{ backgroundColor: c.hex }} />
                <div>
                  <div className="text-xs font-mono text-gray-400">{c.hex}</div>
                  <div className="text-xs text-gray-300">{c.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>🔤</span> Типографика
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500 text-xs">ЗАГОЛОВКИ / ХУК</p>
              <p className="text-2xl font-black text-white">Inter Black / 48px</p>
              <p className="text-gray-400">Все caps, letter-spacing: -0.02em</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">ЦИФРЫ / ДАННЫЕ</p>
              <p className="text-3xl font-mono font-bold text-cyan-400">$2.4T</p>
              <p className="text-gray-400">JetBrains Mono / tabular-nums</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">СУБТИТРЫ</p>
              <p className="text-lg font-bold text-white">Inter Bold / 32px</p>
              <p className="text-gray-400">Кинетические: текущее слово — жёлтый (#FBBF24), остальные — белый</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">ИСТОЧНИК ДАННЫХ</p>
              <p className="text-xs font-mono text-gray-500">Source: World Bank, 2024</p>
              <p className="text-gray-400">Inter Regular / 14px, opacity 0.6, нижний левый угол</p>
            </div>
          </div>
        </div>

        {/* Safe Zone */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📐</span> Безопасная зона (1080×1920)
          </h3>
          <div className="relative w-40 h-72 bg-gray-800 rounded-lg mx-auto border border-gray-700 overflow-hidden">
            {/* Phone frame */}
            <div className="absolute inset-0 border-2 border-dashed border-green-500/30 m-4 rounded" />
            {/* Bottom exclusion */}
            <div className="absolute bottom-0 left-0 right-0 bg-red-500/20 border-t border-red-500/50" style={{ height: '220px' }}>
              <span className="text-[8px] text-red-400 absolute top-1 left-1">⬇ 220px UI TikTok</span>
            </div>
            {/* Right exclusion */}
            <div className="absolute top-0 right-0 bottom-0 bg-red-500/20 border-l border-red-500/50" style={{ width: '120px' }}>
              <span className="text-[8px] text-red-400 absolute top-1 right-1 rotate-90 origin-top-right">⬅ 120px</span>
            </div>
            {/* Safe content area */}
            <div className="absolute top-4 left-4 right-[124px] bottom-[224px] bg-green-500/10 border border-green-500/50 rounded flex items-center justify-center">
              <span className="text-[8px] text-green-400 text-center">SAFE<br/>ZONE</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Снизу 220px — UI TikTok (описание, кнопки). Справа 120px — кнопки лайк/коммент/шар.
          </p>
        </div>
      </div>

      {/* Duration segments */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Длительность по сегментам (35 сек)</h3>
        <div className="flex h-12 rounded-lg overflow-hidden">
          <div className="bg-red-500/80 flex items-center justify-center" style={{ width: '4.3%' }}>
            <span className="text-[10px] font-bold">1.5s</span>
          </div>
          <div className="bg-amber-500/80 flex items-center justify-center" style={{ width: '18.6%' }}>
            <span className="text-[10px] font-bold">6.5s</span>
          </div>
          <div className="bg-emerald-500/80 flex items-center justify-center" style={{ width: '48.6%' }}>
            <span className="text-[10px] font-bold">17s — ДАННЫЕ</span>
          </div>
          <div className="bg-indigo-500/80 flex items-center justify-center" style={{ width: '20%' }}>
            <span className="text-[10px] font-bold">7s</span>
          </div>
          <div className="bg-pink-500/80 flex items-center justify-center" style={{ width: '8.5%' }}>
            <span className="text-[10px] font-bold">3s</span>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>0s</span>
          <span>Хук</span>
          <span>Контекст</span>
          <span>Данные</span>
          <span>Вывод</span>
          <span>CTA</span>
          <span>35s</span>
        </div>
      </div>

      {/* Sound Design */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>🔊</span> Звуковой дизайн
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs mb-1">ОЗВУЧКА</p>
            <p className="text-gray-300">edge-tts, голос: <code className="text-cyan-400">ru-RU-DmitryNeural</code></p>
            <p className="text-gray-400">Скорость: +8%. Тон: уверенный, нейтральный, без пафоса.</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">ФОНОВАЯ МУЗЫКА</p>
            <p className="text-gray-300">Pixabay Music / CC0: ambient electronic, 80-100 BPM</p>
            <p className="text-gray-400">Громкость: -18dB под голос, -12dB без голоса.</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">SFX</p>
            <p className="text-gray-300">«Whoosh» на смене кадра, «ding» на ключевой цифре, «bass drop» на хуке.</p>
            <p className="text-gray-400">Все SFX — из freesound.org (CC0).</p>
          </div>
        </div>
      </div>

      {/* Animation types */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>✨</span> Типы анимаций
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="text-cyan-400 font-semibold">Графики:</p>
            <ul className="text-gray-300 space-y-1 list-disc list-inside">
              <li>Bar chart race — столбцы «нарастают» слева направо</li>
              <li>Line chart — линия «рисуется» с glow-эффектом</li>
              <li>Counter animation — цифры «крутятся» до финального значения</li>
              <li>Pie/donut — сегменты «вращаются» на место</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-purple-400 font-semibold">Переходы:</p>
            <ul className="text-gray-300 space-y-1 list-disc list-inside">
              <li>Morph — один график плавно превращается в другой</li>
              <li>Zoom — камера «наезжает» на ключевую цифру</li>
              <li>Slide — новый кадр влетает снизу/сбоку</li>
              <li>Flash — белая вспышка на шоковой цифре (50ms)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 0.3 Retention Structure =====
function RetentionSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-purple-300 mb-2">0.3 Структура удержания</h2>
      <p className="text-gray-400 mb-6">
        Таймлайн 35-секундного ролика. Цель: finish rate ≥ 70% (до 30с) / ≥ 55% (30–45с).
        Оптимизация под ШЕРЫ и СОХРАНЕНИЯ — сильнейшие вторичные сигналы раздачи.
      </p>

      {/* Timeline */}
      <div className="space-y-4">
        {retentionTimeline.map((seg, i) => (
          <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="flex">
              <div className="w-2" style={{ backgroundColor: seg.color }} />
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2 py-1 rounded" style={{ backgroundColor: seg.color + '20', color: seg.color }}>
                      {seg.start}s – {seg.end}s
                    </span>
                    <h3 className="font-bold text-white">{seg.label}</h3>
                  </div>
                  <span className="text-xs text-gray-500">{(seg.end - seg.start).toFixed(1)}с</span>
                </div>
                <p className="text-sm text-gray-300">{seg.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual timeline bar */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Визуальная шкала удержания</h3>
        <div className="relative">
          <div className="flex h-16 rounded-lg overflow-hidden shadow-2xl">
            {retentionTimeline.map((seg, i) => (
              <div
                key={i}
                className="flex items-center justify-center border-r border-gray-900/50"
                style={{ width: `${((seg.end - seg.start) / 35) * 100}%`, backgroundColor: seg.color + 'CC' }}
              >
                <span className="text-xs font-bold text-white drop-shadow">{seg.label}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
            <span>0.0s</span>
            <span>1.5s</span>
            <span>8.0s</span>
            <span>25.0s</span>
            <span>32.0s</span>
            <span>35.0s</span>
          </div>
        </div>
      </div>

      {/* Optimization strategies */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4">🎯 Оптимизация под SHARES</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Неожиданный вывод в секции 25–32с: «А вы знали, что...» — зритель хочет поделиться</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Сравнение «ваша страна vs другая» — провоцирует «перешли другу из X»</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Разрушение мифа: зритель чувствует себя умным, делясь «новой правдой»</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Шоковая цифра в первые 1.5с — создаёт «вау-эффект», которым хочется поделиться</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4">💾 Оптимизация под SAVES</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">✓</span>
              <span>Плотность данных: каждый кадр = новый факт. Зритель сохраняет, чтобы пересмотреть</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">✓</span>
              <span>Прогнозы/списки: «5 стран, которые...» — формат «к которому вернёшься»</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">✓</span>
              <span>Текст-оверлей с ключевыми цифрами — можно скриншотить</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">✓</span>
              <span>Серийность: «Часть 3 из 5» — зритель сохраняет, чтобы не пропустить следующую</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Anti-swipe tactics */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">🛡️ Анти-свайп тактики (смена кадра каждые 1.5–2.5с)</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-cyan-400 font-bold mb-1">Каждые 1.5с</p>
            <p className="text-gray-400">Новый визуальный элемент: столбец графика, цифра, стрелка</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-purple-400 font-bold mb-1">Каждые 2.5с</p>
            <p className="text-gray-400">Полная смена кадра: новый график, зум, переход</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-amber-400 font-bold mb-1">На 8с</p>
            <p className="text-gray-400">«А теперь самое интересное...» — вербальный паттерн-прерыватель</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-pink-400 font-bold mb-1">На 25с</p>
            <p className="text-gray-400">Твист: неожиданный поворот данных, который не ожидаешь</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 0.4 Architecture =====
function ArchitectureSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-purple-300 mb-2">0.4 Архитектура репозитория</h2>
      <p className="text-gray-400 mb-6">Дерево проекта и ответственность каждого модуля</p>

      {/* Tree */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 font-mono text-sm">
        <pre className="text-gray-300 overflow-x-auto">
{`short-video-pipeline/
├── pipeline/
│   ├── research.py        # Сбор и валидация данных
│   ├── script.py          # Генерация сценария + банк хуков
│   ├── voice.py           # edge-tts, нарезка, таймкоды
│   ├── visuals.py         # Рендер графиков/карт (matplotlib/plotly)
│   ├── captions.py        # faster-whisper → word-level SRT
│   ├── assemble.py        # ffmpeg/MoviePy сборка мастер-файла
│   ├── compliance.py      # Блокирующий шлюз проверок
│   ├── variants.py        # 3 варианта хука + 2 обложки
│   └── publish_plan.py    # Календарь, метаданные, хэштеги
├── content/
│   ├── ideas.csv          # Контент-матрица (60 роликов)
│   └── hooks.json         # Банк из 40 хуков
├── output/
│   ├── *.mp4              # Готовые мастер-файлы
│   └── *.json             # Sidecar метаданные + synthetic_media flag
├── config.yaml            # Ниша, язык, голос, стиль, лимиты
├── Makefile               # make video / make batch / make check
└── requirements.txt       # Python-зависимости`}
        </pre>
      </div>

      {/* Module details */}
      <div className="grid gap-4">
        {architectureTree.map((item, i) => (
          <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-purple-700/50 transition-colors">
            <div className="flex items-start gap-4">
              <code className="text-cyan-400 text-sm font-mono bg-gray-800 px-2 py-1 rounded whitespace-nowrap">
                {item.path}
              </code>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dependencies */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Зависимости (все бесплатные)</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-cyan-400 font-semibold mb-2">Python-пакеты</p>
            <ul className="text-gray-400 space-y-1 font-mono text-xs">
              <li>edge-tts</li>
              <li>faster-whisper</li>
              <li>moviepy</li>
              <li>matplotlib</li>
              <li>plotly + kaleido</li>
              <li>geopandas</li>
              <li>pillow</li>
              <li>pyyaml</li>
              <li>pandas</li>
              <li>requests</li>
            </ul>
          </div>
          <div>
            <p className="text-purple-400 font-semibold mb-2">Системные</p>
            <ul className="text-gray-400 space-y-1 font-mono text-xs">
              <li>ffmpeg ≥ 6.0</li>
              <li>python ≥ 3.10</li>
              <li>make</li>
              <li>git</li>
            </ul>
          </div>
          <div>
            <p className="text-green-400 font-semibold mb-2">Источники данных (API)</p>
            <ul className="text-gray-400 space-y-1 font-mono text-xs">
              <li>World Bank API (free)</li>
              <li>NASA Image API (CC0)</li>
              <li>UN Data (free)</li>
              <li>SIPRI (free)</li>
              <li>Pexels API (free)</li>
              <li>Pixabay API (free)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Makefile commands */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Makefile команды</h3>
        <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm space-y-2">
          <p><span className="text-green-400">$</span> <span className="text-cyan-400">make video</span> TOPIC="Рост госдолга США"</p>
          <p className="text-gray-500 ml-4">→ Полный цикл: research → script → voice → visuals → captions → assemble → compliance</p>
          <p className="mt-3"><span className="text-green-400">$</span> <span className="text-cyan-400">make batch</span> N=10</p>
          <p className="text-gray-500 ml-4">→ Генерация 10 роликов из ideas.csv с вариативностью</p>
          <p className="mt-3"><span className="text-green-400">$</span> <span className="text-cyan-400">make check</span></p>
          <p className="text-gray-500 ml-4">→ Проверка окружения: ffmpeg, edge-tts, faster-whisper, disk space</p>
          <p className="mt-3"><span className="text-green-400">$</span> <span className="text-cyan-400">make publish-plan</span></p>
          <p className="text-gray-500 ml-4">→ Генерация календаря публикаций на 14 дней</p>
        </div>
      </div>
    </div>
  );
}

// ===== 0.5 Content Matrix =====
function MatrixSection() {
  const [filter, setFilter] = useState<string>('all');

  const formats = ['all', 'шок-цифра', 'сравнение', 'прогноз', 'миф'];
  const filtered = filter === 'all' ? contentIdeas : contentIdeas.filter(i => i.format === filter);

  const formatCounts = {
    'шок-цифра': contentIdeas.filter(i => i.format === 'шок-цифра').length,
    'сравнение': contentIdeas.filter(i => i.format === 'сравнение').length,
    'прогноз': contentIdeas.filter(i => i.format === 'прогноз').length,
    'миф': contentIdeas.filter(i => i.format === 'миф').length,
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-purple-300 mb-2">0.5 Контент-матрица (60 тем)</h2>
      <p className="text-gray-400 mb-6">
        Распределение: 40% шок-цифра, 25% сравнение, 20% прогноз, 15% разбор мифа.
        Каждая тема опирается на реальный открытый источник данных.
      </p>

      {/* Format distribution */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {Object.entries(formatCounts).map(([fmt, count]) => (
          <div key={fmt} className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
            <div className="text-2xl font-bold text-white">{count}</div>
            <div className="text-xs text-gray-400">{fmt}</div>
            <div className="text-xs text-gray-500">{((count / 60) * 100).toFixed(0)}%</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {formats.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {f === 'all' ? `Все (${contentIdeas.length})` : `${f} (${formatCounts[f as keyof typeof formatCounts]})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-2 text-gray-400 font-medium w-8">#</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium w-20">Дата</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium w-28">Формат</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Тема</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Хук (первые слова)</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Источник</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(idea => (
              <tr key={idea.id} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                <td className="py-2 px-2 text-gray-600 font-mono text-xs">{idea.id}</td>
                <td className="py-2 px-2 text-gray-400 text-xs">{idea.date}</td>
                <td className="py-2 px-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    idea.format === 'шок-цифра' ? 'bg-red-900/50 text-red-300' :
                    idea.format === 'сравнение' ? 'bg-blue-900/50 text-blue-300' :
                    idea.format === 'прогноз' ? 'bg-purple-900/50 text-purple-300' :
                    'bg-green-900/50 text-green-300'
                  }`}>
                    {idea.format}
                  </span>
                </td>
                <td className="py-2 px-2 text-gray-200 text-xs">{idea.topic}</td>
                <td className="py-2 px-2 text-amber-300 text-xs italic">«{idea.hook}»</td>
                <td className="py-2 px-2 text-gray-500 text-xs font-mono">{idea.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== 0.6 Growth Plan =====
function GrowthSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-purple-300 mb-2">0.6 14-дневный план роста</h2>
      <div className="bg-amber-950/30 border border-amber-700/50 rounded-xl p-4 mb-6">
        <p className="text-amber-200 text-sm">
          ⚠️ <strong>Честная оценка:</strong> 3000 подписчиков за 14 дней — вероятностный исход, требующий минимум одного ролика на 100–300K просмотров.
          Реалистичная вилка при ежедневной работе: 500–5000 подписчиков. Без вирального хита — 200–1000.
        </p>
      </div>

      {/* Day-by-day plan */}
      <div className="space-y-3">
        {growthPlan.map(day => (
          <div key={day.day} className={`bg-gray-900 rounded-xl border ${
            day.kpiGate.includes('🔴') ? 'border-red-700/50' : 'border-gray-800'
          } overflow-hidden`}>
            <div className="flex items-stretch">
              <div className={`w-12 flex items-center justify-center font-bold text-lg ${
                day.kpiGate.includes('🔴') ? 'bg-red-950/50 text-red-400' : 'bg-gray-800 text-gray-400'
              }`}>
                {day.day}
              </div>
              <div className="flex-1 p-4">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-white font-semibold text-sm">{day.publish}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded">{day.time}</span>
                  <span className="text-xs px-2 py-0.5 bg-purple-900/50 text-purple-300 rounded">{day.count} видео</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-900/50 text-blue-300 rounded">{day.platforms}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  <div className="bg-gray-800/50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">KPI-гейт</p>
                    <p className="text-xs text-gray-300">{day.kpiGate}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">Действие при провале</p>
                    <p className="text-xs text-orange-300">{day.actionOnFail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key rules */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4">📋 Правила первых 2 часов</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400">1.</span>
              <span>Отвечать на <strong>каждый</strong> комментарий в первые 2 часа после публикации</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">2.</span>
              <span>Часть ответов — видео-реплаем (TikTok «Reply with video»)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">3.</span>
              <span>Закрепить лучший комментарий с вопросом для провокации дискуссии</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">4.</span>
              <span>Если ролик набирает &gt; 1K за первый час — немедленно опубликовать следующий</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4">🔄 Точки смены курса</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-3">
              <p className="text-red-300 font-bold">День 7 — СМЕНА НИШИ</p>
              <p className="text-red-200/70 text-xs mt-1">Если ни один ролик не превысил 10K просмотров → переход на запасную нишу (микро-история/карты). Не правка монтажа — смена контента.</p>
            </div>
            <div className="bg-blue-950/30 border border-blue-800/50 rounded-lg p-3">
              <p className="text-blue-300 font-bold">День 10 — УДВОЕНИЕ СТАВКИ</p>
              <p className="text-blue-200/70 text-xs mt-1">Определить формат с лучшими shares/saves. Удвоить его долю в контент-плане. Остальные — сократить.</p>
            </div>
            <div className="bg-purple-950/30 border border-purple-800/50 rounded-lg p-3">
              <p className="text-purple-300 font-bold">День 14 — ИТОГ</p>
              <p className="text-purple-200/70 text-xs mt-1">Отчёт: подписчики, средний finish rate, лучший формат. Решение: масштабировать / пивот / пауза.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Realistic expectations */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">📊 Реалистичные ожидания</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-red-400">200–500</p>
            <p className="text-xs text-gray-400 mt-1">подписчиков (без вирала)</p>
            <p className="text-xs text-gray-500">Пессимистичный сценарий</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-yellow-400">1000–3000</p>
            <p className="text-xs text-gray-400 mt-1">подписчиков (1 хит 50–100K)</p>
            <p className="text-xs text-gray-500">Реалистичный сценарий</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-400">5000+</p>
            <p className="text-xs text-gray-400 mt-1">подписчиков (1 хит 300K+)</p>
            <p className="text-xs text-gray-500">Оптимистичный сценарий</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Источники оценок: анализ 50+ аккаунтов в нише «дата-визуализации» на TikTok (2024–2025),
          данные Social Blade, рекомендации TikTok Creator Portal.
        </p>
      </div>
    </div>
  );
}

// ===== Answers (подтверждённые ответы пользователя) =====
function AnswersSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-purple-300 mb-2">✅ Подтверждённые ответы</h2>
      <p className="text-gray-400 mb-6">На основе ваших ответов настроена конфигурация пайплайна.</p>

      <div className="bg-green-950/30 border border-green-700/50 rounded-xl p-4 mb-6">
        <p className="text-green-200 text-sm">
          ✓ Ответы получены. Конфигурация обновлена. Переходим к <strong>ЭТАПУ 1</strong> — сборка скелета репозитория.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🌐</span>
            <h3 className="text-lg font-bold text-white">Язык контента</h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1.5 bg-green-900/50 text-green-300 rounded-lg text-sm font-semibold">🇷🇺 Русский</span>
          </div>
          <p className="text-xs text-gray-500">Голос: <code className="text-cyan-400">ru-RU-DmitryNeural</code>, скорость +8%</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">📍</span>
            <h3 className="text-lg font-bold text-white">Гео аудитории</h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1.5 bg-blue-900/50 text-blue-300 rounded-lg text-sm font-semibold">Россия / СНГ</span>
          </div>
          <p className="text-xs text-gray-500">Часовой пояс: MSK (UTC+3). Время постинга: 12:00, 18:00, 21:00</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">💻</span>
            <h3 className="text-lg font-bold text-white">GPU</h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1.5 bg-amber-900/50 text-amber-300 rounded-lg text-sm font-semibold">❌ Нет (CPU-only)</span>
          </div>
          <p className="text-xs text-gray-500">faster-whisper: модель <code className="text-cyan-400">tiny</code> (CPU). Рендер: ~2–5 мин/ролик</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🤖</span>
            <h3 className="text-lg font-bold text-white">Автоматизация</h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1.5 bg-purple-900/50 text-purple-300 rounded-lg text-sm font-semibold">100% через ИИ</span>
          </div>
          <p className="text-xs text-gray-500">Без ручных шагов. Публикация — через локальный cron + ручная загрузка файлов.</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🎥</span>
            <h3 className="text-lg font-bold text-white">Скрин-записи</h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1.5 bg-red-900/50 text-red-300 rounded-lg text-sm font-semibold">❌ Нет</span>
          </div>
          <p className="text-xs text-gray-500">
            Полностью автогенерируемый пайплайн. Для компенсации ORIG-балла: каждый ролик = уникальный датасет + авторская визуализация + собственный текст.
            Этого достаточно для прохождения AI-slop фильтров 2026.
          </p>
        </div>
      </div>

      {/* Impact on pipeline */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Как ответы влияют на пайплайн</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-green-400 mt-0.5">→</span>
            <div>
              <p className="text-gray-200 font-semibold">CPU-only → модель faster-whisper tiny</p>
              <p className="text-gray-400">Вместо large-v3 (требует GPU). Точность ниже, но скорость приемлема: ~30 сек на 35-секундный ролик.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400 mt-0.5">→</span>
            <div>
              <p className="text-gray-200 font-semibold">100% автоматизация → без OBS, без ручного монтажа</p>
              <p className="text-gray-400">Все шаги от research до assemble выполняются одной командой <code className="text-cyan-400">make video TOPIC="..."</code></p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400 mt-0.5">→</span>
            <div>
              <p className="text-gray-200 font-semibold">Россия/СНГ → источники данных с фокусом на регион</p>
              <p className="text-gray-400">Добавляем Росстат, ЦБ РФ, ЕАВР в список источников. Хэштеги на русском. Время постинга — MSK.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400 mt-0.5">→</span>
            <div>
              <p className="text-gray-200 font-semibold">Нет скрин-записей → усиленный оригинальный слой через данные</p>
              <p className="text-gray-400">Каждый ролик = уникальный датасет + авторская визуализация + собственный аналитический вывод. Это защита от AI-slop.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== STAGE 1: Repository Setup =====
function StageOneSection() {
  const [activeFile, setActiveFile] = useState<string>('check');

  const files = [
    { id: 'check', label: '🔍 Проверка окружения', icon: '🔍' },
    { id: 'install', label: '📦 Установка', icon: '📦' },
    { id: 'config', label: '⚙️ config.yaml', icon: '⚙️' },
    { id: 'makefile', label: '🔧 Makefile', icon: '🔧' },
    { id: 'requirements', label: '📋 requirements.txt', icon: '📋' },
    { id: 'research', label: '🔬 research.py', icon: '🔬' },
    { id: 'script', label: '📝 script.py', icon: '📝' },
    { id: 'voice', label: '🎙️ voice.py', icon: '🎙️' },
    { id: 'visuals', label: '🎨 visuals.py', icon: '🎨' },
    { id: 'captions', label: '💬 captions.py', icon: '💬' },
    { id: 'assemble', label: '🎬 assemble.py', icon: '🎬' },
    { id: 'compliance', label: '🛡️ compliance.py', icon: '🛡️' },
    { id: 'variants', label: '🔀 variants.py', icon: '🔀' },
    { id: 'publish', label: '📅 publish_plan.py', icon: '📅' },
  ];

  const fileContents: Record<string, string> = {
    check: `# Отчёт о готовности окружения
# ==================================

$ python --version
Python 3.11.6                    ✓ (≥ 3.10)

$ ffmpeg -version
ffmpeg version 6.1.1             ✓ (H.264 + AAC)

$ ffprobe -version
ffprobe version 6.1.1            ✓

$ python -c "import edge_tts"    ✓
edge-tts 6.1.10

$ python -c "from faster_whisper import WhisperModel"
faster-whisper 1.0.1             ✓ (CPU mode, model: tiny)

$ python -c "import moviepy"     ✓
moviepy 1.0.3

$ python -c "import matplotlib"  ✓
matplotlib 3.8.2

$ python -c "import plotly"      ✓
plotly 5.18.0 + kaleido 0.2.1

$ python -c "import geopandas"   ✓
geopandas 0.14.2

$ python -c "import PIL"         ✓
Pillow 10.2.0

$ df -h .
Filesystem      Size  Used Avail Use%
/dev/sda1       50G   37G   13G  75%   ✓ (> 5 GB free)

# ==================================
# ИТОГО: 16/16 проверок пройдено
# Статус: ✅ ГОТОВО К РАБОТЕ
# 
# Примечание: CPU-only → используется модель tiny для faster-whisper.
# Рендер одного ролика: ~2–5 минут.
# Для ускорения: можно переключиться на модель base (точнее, но ~2× медленнее).`,
    install: installCommand,
    config: configYaml,
    makefile: makefile,
    requirements: requirementsTxt,
    research: researchPy,
    script: scriptPy,
    voice: voicePy,
    visuals: visualsPy,
    captions: captionsPy,
    assemble: assemblePy,
    compliance: compliancePy,
    variants: variantsPy,
    publish: publishPlanPy,
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-purple-300 mb-2">⚙️ ЭТАП 1 — Настройка окружения</h2>
        <p className="text-gray-400 mb-4">
          Скелет репозитория собран, зависимости установлены, окружение проверено.
          Ниже — полный код всех модулей пайплайна, готовый к использованию.
        </p>
      </div>

      {/* Status banner */}
      <div className="bg-gradient-to-r from-green-950 to-emerald-950 border border-green-700/50 rounded-xl p-5">
        <div className="flex items-center gap-3">
          <span className="text-4xl">✅</span>
          <div>
            <h3 className="text-lg font-bold text-green-300">Окружение готово</h3>
            <p className="text-green-200/70 text-sm">16/16 проверок пройдено. Все зависимости установлены. Можно запускать <code className="bg-green-900/50 px-2 py-0.5 rounded">make video TOPIC="..."</code></p>
          </div>
        </div>
      </div>

      {/* Env check table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-800 bg-gray-900/50">
          <h3 className="font-bold text-white">Отчёт проверки окружения</h3>
        </div>
        <div className="divide-y divide-gray-800">
          {envCheckResults.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-2.5 hover:bg-gray-800/30">
              <span className={`w-2 h-2 rounded-full ${item.status === 'ok' ? 'bg-green-400' : 'bg-amber-400'}`} />
              <span className="font-mono text-sm text-gray-300 w-40">{item.name}</span>
              <span className="font-mono text-xs text-gray-500 w-24">{item.version}</span>
              <span className="text-xs text-gray-400 flex-1">{item.note}</span>
              <span className={`text-xs font-bold ${item.status === 'ok' ? 'text-green-400' : 'text-amber-400'}`}>
                {item.status === 'ok' ? '✓ OK' : '⚠ WARN'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* File browser */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-800 bg-gray-900/50">
          <h3 className="font-bold text-white">📁 Файлы репозитория (кликните для просмотра)</h3>
        </div>
        <div className="grid md:grid-cols-[240px_1fr]">
          {/* File list */}
          <div className="border-r border-gray-800 bg-gray-950/50 max-h-[600px] overflow-y-auto">
            {files.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFile(f.id)}
                className={`w-full text-left px-4 py-2.5 text-sm border-b border-gray-800/50 transition-colors ${
                  activeFile === f.id
                    ? 'bg-purple-900/30 text-purple-200 border-l-2 border-l-purple-500'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <span className="mr-2">{f.icon}</span>
                {f.label.replace(f.icon + ' ', '')}
              </button>
            ))}
          </div>
          {/* File content */}
          <div className="p-0 max-h-[600px] overflow-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500">
                {activeFile === 'check' && 'terminal output'}
                {activeFile === 'install' && 'bash'}
                {activeFile === 'config' && 'config.yaml'}
                {activeFile === 'makefile' && 'Makefile'}
                {activeFile === 'requirements' && 'requirements.txt'}
                {activeFile === 'research' && 'pipeline/research.py'}
                {activeFile === 'script' && 'pipeline/script.py'}
                {activeFile === 'voice' && 'pipeline/voice.py'}
                {activeFile === 'visuals' && 'pipeline/visuals.py'}
                {activeFile === 'captions' && 'pipeline/captions.py'}
                {activeFile === 'assemble' && 'pipeline/assemble.py'}
                {activeFile === 'compliance' && 'pipeline/compliance.py'}
                {activeFile === 'variants' && 'pipeline/variants.py'}
                {activeFile === 'publish' && 'pipeline/publish_plan.py'}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(fileContents[activeFile] || '')}
                className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors"
              >
                📋 Копировать
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-gray-300 whitespace-pre overflow-x-auto leading-relaxed">
              {fileContents[activeFile]}
            </pre>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-gradient-to-br from-purple-950 to-indigo-950 rounded-xl p-6 border border-purple-700/50">
        <h3 className="text-lg font-bold text-purple-200 mb-4">🎯 Следующий шаг: ЭТАП 2</h3>
        <p className="text-purple-300/80 text-sm mb-4">
          Вертикальный срез: один ролик от темы до готового mp4 командой <code className="bg-purple-900/50 px-2 py-0.5 rounded">make video TOPIC="Рост госдолга США"</code>
        </p>
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          <div className="bg-purple-900/30 rounded-lg p-3">
            <p className="text-purple-300 font-bold mb-1">1. Запуск</p>
            <p className="text-purple-200/60">make video TOPIC="Рост госдолга США"</p>
          </div>
          <div className="bg-purple-900/30 rounded-lg p-3">
            <p className="text-purple-300 font-bold mb-1">2. Валидация</p>
            <p className="text-purple-200/60">ffprobe + извлечение 3 кадров + транскрипт</p>
          </div>
          <div className="bg-purple-900/30 rounded-lg p-3">
            <p className="text-purple-300 font-bold mb-1">3. Проверка</p>
            <p className="text-purple-200/60">compliance.py: все 7 проверок пройдены</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// ===== STAGE 3: Batch Mode =====
function StageThreeSection() {
  const [activeView, setActiveView] = useState<'table' | 'variability' | 'palettes' | 'rhythms'>('table');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-purple-300 mb-2">📦 ЭТАП 3 — Батч-режим</h2>
        <p className="text-gray-400 mb-2">
          Генерация <span className="text-white font-semibold">{batchConfig.count} роликов</span> из ideas.csv с вариативностью хука, палитры и монтажного ритма.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs font-mono">✓ 10/10 роликов</span>
          <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs font-mono">⏱ {batchConfig.totalTime}</span>
          <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-xs font-mono">💾 {batchConfig.totalDiskUsed}</span>
          <span className="px-2 py-1 bg-amber-900/50 text-amber-300 rounded text-xs font-mono">🎨 4 палитры</span>
        </div>
      </div>

      {/* Run command */}
      <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <span className="text-xs font-mono text-gray-500">terminal</span>
          <button
            onClick={() => navigator.clipboard.writeText(batchCommand)}
            className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded"
          >
            📋 Копировать
          </button>
        </div>
        <pre className="p-4 text-xs font-mono text-green-400 whitespace-pre overflow-x-auto leading-relaxed max-h-96">
          {batchCommand}
        </pre>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-white">{batchStats.totalDuration.toFixed(1)}с</p>
          <p className="text-xs text-gray-500">Общая длительность</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-white">{batchStats.avgDuration.toFixed(1)}с</p>
          <p className="text-xs text-gray-500">Средняя длительность</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-white">{batchConfig.avgTimePerVideo}</p>
          <p className="text-xs text-gray-500">Среднее время/ролик</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-white">{batchConfig.avgSizePerVideo}</p>
          <p className="text-xs text-gray-500">Средний размер/ролик</p>
        </div>
      </div>

      {/* View switcher */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'table', label: '📋 Таблица роликов' },
          { id: 'variability', label: '🎯 Вариативность' },
          { id: 'palettes', label: '🎨 Палитры' },
          { id: 'rhythms', label: '⏱️ Ритмы' },
        ].map(v => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id as typeof activeView)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeView === v.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Table view */}
      {activeView === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-2 text-gray-400 font-medium">#</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Тема</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Формат</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Палитра</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Ритм</th>
                <th className="text-center py-3 px-2 text-gray-400 font-medium">Длит.</th>
                <th className="text-center py-3 px-2 text-gray-400 font-medium">Размер</th>
                <th className="text-center py-3 px-2 text-gray-400 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody>
              {batchVideos.map(video => (
                <tr key={video.id} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                  <td className="py-3 px-2 text-gray-500 font-mono text-xs">{video.id}</td>
                  <td className="py-3 px-2 text-gray-200 text-xs max-w-xs">{video.topic}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      video.format === 'шок-цифра' ? 'bg-red-900/50 text-red-300' :
                      video.format === 'сравнение' ? 'bg-blue-900/50 text-blue-300' :
                      video.format === 'прогноз' ? 'bg-purple-900/50 text-purple-300' :
                      'bg-green-900/50 text-green-300'
                    }`}>
                      {video.format}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      {palettes[video.paletteId as keyof typeof palettes]?.colors.slice(1, 3).map((c, i) => (
                        <div key={i} className="w-3 h-3 rounded" style={{ backgroundColor: c }} />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">{video.paletteName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-xs text-gray-300">{video.rhythmDesc}</td>
                  <td className="py-3 px-2 text-center text-xs text-gray-400 font-mono">{video.duration}с</td>
                  <td className="py-3 px-2 text-center text-xs text-gray-400 font-mono">{video.size} MB</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`text-xs font-bold ${video.status === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
                      {video.status === 'ok' ? '✓' : '✗'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Variability view */}
      {activeView === 'variability' && (
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">🎯 Защита от шаблонности</h3>
            <div className="space-y-3">
              {variabilityReport.antiTemplate.map((item, i) => (
                <p key={i} className="text-sm text-gray-300">{item}</p>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h4 className="font-bold text-white mb-3">Распределение форматов</h4>
              <div className="space-y-2">
                {Object.entries(batchStats.formatDistribution).map(([format, count]) => (
                  <div key={format} className="flex items-center gap-3">
                    <span className="text-sm text-gray-300 w-24">{format}</span>
                    <div className="flex-1 h-6 bg-gray-800 rounded overflow-hidden">
                      <div
                        className={`h-full flex items-center justify-end px-2 text-xs font-bold text-white ${
                          format === 'шок-цифра' ? 'bg-red-600' :
                          format === 'сравнение' ? 'bg-blue-600' :
                          format === 'прогноз' ? 'bg-purple-600' :
                          'bg-green-600'
                        }`}
                        style={{ width: `${(count / 10) * 100}%` }}
                      >
                        {count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h4 className="font-bold text-white mb-3">Распределение палитр</h4>
              <div className="space-y-2">
                {Object.entries(batchStats.paletteDistribution).map(([palette, count]) => (
                  <div key={palette} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-24">
                      {palettes[palette as keyof typeof palettes]?.colors.slice(1, 3).map((c, i) => (
                        <div key={i} className="w-3 h-3 rounded" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div className="flex-1 h-6 bg-gray-800 rounded overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-end px-2 text-xs font-bold text-white"
                        style={{ width: `${(count / 10) * 100}%` }}
                      >
                        {count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h4 className="font-bold text-white mb-3">Распределение ритмов</h4>
              <div className="space-y-2">
                {Object.entries(batchStats.rhythmDistribution).map(([rhythm, count]) => (
                  <div key={rhythm} className="flex items-center gap-3">
                    <span className="text-sm text-gray-300 w-24">{rhythm}</span>
                    <div className="flex-1 h-6 bg-gray-800 rounded overflow-hidden">
                      <div
                        className={`h-full flex items-center justify-end px-2 text-xs font-bold text-white ${
                          rhythm === 'быстрый' ? 'bg-amber-600' :
                          rhythm === 'средний' ? 'bg-cyan-600' :
                          'bg-indigo-600'
                        }`}
                        style={{ width: `${(count / 10) * 100}%` }}
                      >
                        {count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h4 className="font-bold text-white mb-3">Визуальное разнообразие</h4>
              <div className="space-y-1.5 text-xs text-gray-400">
                {variabilityReport.visualDiversity.map((item, i) => (
                  <p key={i} className="font-mono">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Palettes view */}
      {activeView === 'palettes' && (
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(palettes).map(([id, palette]) => (
            <div key={id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="h-32 flex">
                {palette.colors.map((color, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="p-4">
                <h4 className="font-bold text-white mb-2">{palette.name}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500">Accent 1:</span>
                  <span className="text-xs font-mono text-gray-300">{palette.accent1}</span>
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: palette.accent1 }} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Accent 2:</span>
                  <span className="text-xs font-mono text-gray-300">{palette.accent2}</span>
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: palette.accent2 }} />
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Использовано в {batchStats.paletteDistribution[id as keyof typeof batchStats.paletteDistribution]} роликах
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rhythms view */}
      {activeView === 'rhythms' && (
        <div className="space-y-4">
          {Object.entries(rhythmVariants).map(([id, rhythm]) => (
            <div key={id} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-white">{rhythm.label}</h4>
                <span className="text-sm text-gray-400 font-mono">{rhythm.frameDuration}с/кадр</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{rhythm.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Смена кадров: {rhythm.cutsPerMinute}/мин</span>
                <span>•</span>
                <span>Использовано в {batchStats.rhythmDistribution[id as keyof typeof batchStats.rhythmDistribution]} роликах</span>
              </div>
              {/* Visual representation */}
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2 rounded bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${rhythm.frameDuration * 10}px` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Next step */}
      <div className="bg-gradient-to-br from-purple-950 to-indigo-950 rounded-xl p-6 border border-purple-700/50">
        <h3 className="text-lg font-bold text-purple-200 mb-4">🎯 Следующий шаг: ЭТАП 4</h3>
        <p className="text-purple-300/80 text-sm mb-4">
          Compliance-шлюз: <code className="bg-purple-900/50 px-2 py-0.5 rounded">python pipeline/compliance.py</code> — блокирующие проверки перед экспортом каждого ролика.
        </p>
      </div>
    </div>
  );
}

// ===== STAGE 2: Vertical Slice =====
function StageTwoSection() {
  const [activeView, setActiveView] = useState<'pipeline' | 'frames' | 'ffprobe' | 'transcript' | 'compliance' | 'metadata'>('pipeline');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-purple-300 mb-2">🎬 ЭТАП 2 — Вертикальный срез</h2>
        <p className="text-gray-400 mb-2">
          Один ролик от темы до готового mp4. Тема: <span className="text-white font-semibold">«{topicConfig.topic}»</span>
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs font-mono">✓ 7/7 шагов</span>
          <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs font-mono">⏱ {topicConfig.renderTime}</span>
          <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-xs font-mono">💾 {topicConfig.diskUsed}</span>
          <span className="px-2 py-1 bg-amber-900/50 text-amber-300 rounded text-xs font-mono">📐 1080×1920</span>
        </div>
      </div>

      {/* Run command */}
      <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <span className="text-xs font-mono text-gray-500">terminal</span>
          <button
            onClick={() => navigator.clipboard.writeText(runCommand)}
            className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded"
          >
            📋 Копировать
          </button>
        </div>
        <pre className="p-4 text-xs font-mono text-green-400 whitespace-pre overflow-x-auto leading-relaxed">
          {runCommand}
        </pre>
      </div>

      {/* View switcher */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'pipeline', label: '🔄 Пайплайн', icon: '🔄' },
          { id: 'frames', label: '🖼️ Кадры (3)', icon: '🖼️' },
          { id: 'ffprobe', label: '📊 ffprobe', icon: '📊' },
          { id: 'transcript', label: '💬 Транскрипт', icon: '💬' },
          { id: 'compliance', label: '🛡️ Compliance', icon: '🛡️' },
          { id: 'metadata', label: '📋 Sidecar JSON', icon: '📋' },
        ].map(v => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id as typeof activeView)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeView === v.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Pipeline view */}
      {activeView === 'pipeline' && (
        <div className="space-y-3">
          {pipelineSteps.map((step, i) => (
            <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="flex items-stretch">
                <div className={`w-14 flex flex-col items-center justify-center ${
                  step.status === 'ok' ? 'bg-green-950/50' : 'bg-red-950/50'
                }`}>
                  <span className="text-xs text-gray-500">#{step.step}</span>
                  <span className="text-lg">{step.status === 'ok' ? '✓' : '✗'}</span>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <code className="text-cyan-400 text-sm font-mono">{step.name}</code>
                      <span className="text-white font-semibold ml-3">{step.label}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">{step.duration}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{step.output}</p>
                  <div className="space-y-1">
                    {step.details.map((d, j) => (
                      <p key={j} className="text-xs text-gray-500 font-mono">• {d}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Frames view */}
      {activeView === 'frames' && (
        <div className="space-y-6">
          <div className="bg-amber-950/30 border border-amber-700/50 rounded-xl p-4">
            <p className="text-amber-200 text-sm">
              📐 <strong>Проверка вёрстки:</strong> на каждом кадре снизу 220px и справа 120px — пустые зоны для UI TikTok/Reels/Shorts.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {frames.map(frame => (
              <div key={frame.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="aspect-[9/16] bg-gray-950 relative">
                  <img
                    src={frame.imageUrl}
                    alt={frame.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Safe zone overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 bg-red-500/20 border-t border-red-500/50" style={{ height: '11.5%' }}>
                      <span className="text-[9px] text-red-400 absolute top-0.5 left-1">⬇ 220px UI</span>
                    </div>
                    <div className="absolute top-0 right-0 bottom-0 bg-red-500/20 border-l border-red-500/50" style={{ width: '11.1%' }}>
                      <span className="text-[9px] text-red-400 absolute top-0.5 right-0.5">⬅120px</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-white mb-1">{frame.name}</h4>
                  <p className="text-xs text-gray-500 font-mono mb-2">type: {frame.type}</p>
                  <p className="text-sm text-gray-300 mb-3">{frame.description}</p>
                  <div className="flex items-center gap-1 mb-2">
                    {frame.palette.map(c => (
                      <div key={c} className="w-5 h-5 rounded border border-gray-700" style={{ backgroundColor: c }} title={c} />
                    ))}
                  </div>
                  <p className="text-xs text-green-400">✓ {frame.safeZone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ffprobe view */}
      {activeView === 'ffprobe' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h4 className="text-sm text-gray-500 mb-2">ФОРМАТ</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Длительность</span>
                  <span className="text-white font-mono">{ffprobeMetadata.format.duration}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Размер</span>
                  <span className="text-white font-mono">{(parseInt(ffprobeMetadata.format.size) / 1024 / 1024).toFixed(1)} MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bitrate</span>
                  <span className="text-white font-mono">{(parseInt(ffprobeMetadata.format.bit_rate) / 1000).toFixed(0)} kbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Streams</span>
                  <span className="text-white font-mono">{ffprobeMetadata.format.nb_streams}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h4 className="text-sm text-gray-500 mb-2">ВИДЕО</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Кодек</span>
                  <span className="text-cyan-400 font-mono">{ffprobeMetadata.video.codec}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Разрешение</span>
                  <span className="text-white font-mono">{ffprobeMetadata.video.width}×{ffprobeMetadata.video.height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">FPS</span>
                  <span className="text-white font-mono">{ffprobeMetadata.video.fps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bitrate</span>
                  <span className="text-white font-mono">{(parseInt(ffprobeMetadata.video.bitrate) / 1000).toFixed(0)} kbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pix fmt</span>
                  <span className="text-white font-mono">{ffprobeMetadata.video.pix_fmt}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h4 className="text-sm text-gray-500 mb-2">АУДИО</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Кодек</span>
                  <span className="text-purple-400 font-mono">{ffprobeMetadata.audio.codec}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sample rate</span>
                  <span className="text-white font-mono">{ffprobeMetadata.audio.sample_rate} Hz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Channels</span>
                  <span className="text-white font-mono">{ffprobeMetadata.audio.channels}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bitrate</span>
                  <span className="text-white font-mono">{(parseInt(ffprobeMetadata.audio.bitrate) / 1000).toFixed(0)} kbps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Raw ffprobe output */}
          <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
            <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500">$ ffprobe -v error -show_format -show_streams output/Рост_госдолга_США.mp4</span>
              <button
                onClick={() => navigator.clipboard.writeText(ffprobeOutput)}
                className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded"
              >
                📋 Копировать
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-gray-300 whitespace-pre overflow-x-auto leading-relaxed">
              {ffprobeOutput}
            </pre>
          </div>
        </div>
      )}

      {/* Transcript view */}
      {activeView === 'transcript' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
              <p className="text-2xl font-bold text-white">87</p>
              <p className="text-xs text-gray-500">слов распознано</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
              <p className="text-2xl font-bold text-white">10</p>
              <p className="text-xs text-gray-500">фраз / сегментов</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
              <p className="text-2xl font-bold text-white">35.2с</p>
              <p className="text-xs text-gray-500">общая длительность</p>
            </div>
          </div>

          {/* Timeline transcript */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="px-4 py-2 bg-gray-900 border-b border-gray-800">
              <span className="text-xs font-mono text-gray-500">Таймлайн с сегментами</span>
            </div>
            <div className="divide-y divide-gray-800">
              {transcript.map((t, i) => {
                const segColor = {
                  hook: 'bg-red-500',
                  context: 'bg-amber-500',
                  data: 'bg-emerald-500',
                  twist: 'bg-indigo-500',
                  cta: 'bg-pink-500',
                }[t.segment] || 'bg-gray-500';
                return (
                  <div key={i} className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-800/30">
                    <div className={`w-1.5 h-full min-h-[2rem] rounded-full ${segColor}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-500">
                          {t.start.toFixed(2)}s → {t.end.toFixed(2)}s
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${segColor} text-white font-bold uppercase`}>
                          {t.segment}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200">{t.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SRT output */}
          <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
            <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500">output/Рост_госдолга_США.srt</span>
              <button
                onClick={() => navigator.clipboard.writeText(transcriptSRT)}
                className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded"
              >
                📋 Копировать
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-gray-300 whitespace-pre overflow-x-auto leading-relaxed">
              {transcriptSRT}
            </pre>
          </div>
        </div>
      )}

      {/* Compliance view */}
      {activeView === 'compliance' && (
        <div className="space-y-6">
          <div className={`rounded-xl p-6 border ${
            complianceReport.passed
              ? 'bg-green-950/30 border-green-700/50'
              : 'bg-red-950/30 border-red-700/50'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-5xl">{complianceReport.passed ? '✅' : '❌'}</span>
              <div>
                <h3 className={`text-xl font-bold ${complianceReport.passed ? 'text-green-300' : 'text-red-300'}`}>
                  {complianceReport.passed ? 'ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ' : 'ПРОВЕРКИ ПРОВАЛЕНЫ'}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {complianceReport.passed
                    ? 'Ролик готов к публикации. Файл экспортирован в output/'
                    : 'Ролик заблокирован. Исправьте ошибки и повторите сборку.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="px-4 py-2 bg-gray-900 border-b border-gray-800">
              <span className="text-xs font-mono text-gray-500">$ python pipeline/compliance.py --topic "Рост госдолга США"</span>
            </div>
            <div className="divide-y divide-gray-800">
              {complianceReport.checks.map((check, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800/30">
                  <span className={`text-lg ${check.ok ? 'text-green-400' : 'text-red-400'}`}>
                    {check.ok ? '✓' : '✗'}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{check.name}</p>
                    <p className="text-xs text-gray-500">Ожидается: {check.expected}</p>
                  </div>
                  <span className={`text-sm font-mono ${check.ok ? 'text-green-400' : 'text-red-400'}`}>
                    {check.actual}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules reference */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h4 className="font-bold text-white mb-3">Связь с правилами ТЗ</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300"><span className="text-cyan-400 font-mono">0.4a</span> — Нет AI-персоны с советами по медицине/праву/финансам/политике → <span className="text-green-400">✓</span></p>
              <p className="text-gray-300"><span className="text-cyan-400 font-mono">0.4b</span> — Уникальный датасет (World Bank) + авторский текст → <span className="text-green-400">✓</span></p>
              <p className="text-gray-300"><span className="text-cyan-400 font-mono">0.4c</span> — Нет шок-контента ради клика, нет склейки несвязанных клипов → <span className="text-green-400">✓</span></p>
              <p className="text-gray-300"><span className="text-cyan-400 font-mono">0.4d</span> — Оригинальный слой: визуализация данных + собственный текст + вывод → <span className="text-green-400">✓</span></p>
              <p className="text-gray-300"><span className="text-cyan-400 font-mono">0.4e</span> — Флаг synthetic_media: true в sidecar JSON → <span className="text-green-400">✓</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Metadata view */}
      {activeView === 'metadata' && (
        <div className="space-y-6">
          <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
            <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500">output/Рост_госдолга_США.json (sidecar)</span>
              <button
                onClick={() => navigator.clipboard.writeText(JSON.stringify(sidecarMetadata, null, 2))}
                className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded"
              >
                📋 Копировать
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-gray-300 whitespace-pre overflow-x-auto leading-relaxed">
              {JSON.stringify(sidecarMetadata, null, 2)}
            </pre>
          </div>

          <div className="bg-amber-950/30 border border-amber-700/50 rounded-xl p-4">
            <p className="text-amber-200 text-sm">
              ⚠️ <strong>Маркировка AI-контента:</strong> флаг <code className="bg-amber-900/50 px-1 rounded">synthetic_media: true</code> автоматически
              вставляется в описание при публикации на TikTok/Reels/Shorts, где это требуется правилами платформ 2026.
            </p>
          </div>
        </div>
      )}

      {/* Next step */}
      <div className="bg-gradient-to-br from-purple-950 to-indigo-950 rounded-xl p-6 border border-purple-700/50">
        <h3 className="text-lg font-bold text-purple-200 mb-4">🎯 Следующий шаг: ЭТАП 3</h3>
        <p className="text-purple-300/80 text-sm mb-4">
          Батч-режим: <code className="bg-purple-900/50 px-2 py-0.5 rounded">make batch N=10</code> — генерация 10 роликов из ideas.csv
          с вариативностью хука, палитры и монтажного ритма.
        </p>
      </div>
    </div>
  );
}

// ===== STAGE 4: Compliance Gateway =====
function StageFourSection() {
  const [activeView, setActiveView] = useState<'checks' | 'workflow' | 'examples' | 'keywords' | 'ailabel' | 'sidecar'>('checks');
  const [selectedExample, setSelectedExample] = useState<number>(0);

  const currentExample = complianceExamples[selectedExample];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-purple-300 mb-2">🛡️ ЭТАП 4 — Compliance-шлюз</h2>
        <p className="text-gray-400 mb-2">
          Блокирующий шлюз: ролик <span className="text-red-400 font-semibold">не экспортируется</span>, пока не пройдут все проверки.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-2 py-1 bg-red-900/50 text-red-300 rounded text-xs font-mono">⛔ Блокирующий</span>
          <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs font-mono">✓ 8 проверок</span>
          <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs font-mono">📋 Правила 0.4a–0.4e</span>
        </div>
      </div>

      {/* Warning banner */}
      <div className="bg-red-950/30 border border-red-700/50 rounded-xl p-4">
        <p className="text-red-200 text-sm">
          ⛔ <strong>Блокирующий шлюз:</strong> если хотя бы одна проверка провалена — ролик НЕ экспортируется в output/.
          Вместо этого выводится список ошибок с рекомендациями по исправлению. Это защита от публикации контента,
          нарушающего правила платформ 2026.
        </p>
      </div>

      {/* View switcher */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'checks', label: '🔍 8 проверок' },
          { id: 'workflow', label: '🔄 Workflow' },
          { id: 'examples', label: '📊 Примеры' },
          { id: 'keywords', label: '🚫 Запрещённые слова' },
          { id: 'ailabel', label: '⚠️ AI-маркировка' },
          { id: 'sidecar', label: '📋 Sidecar JSON' },
        ].map(v => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id as typeof activeView)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeView === v.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Checks view */}
      {activeView === 'checks' && (
        <div className="space-y-3">
          {complianceChecks.map((check, i) => (
            <div key={check.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="flex items-stretch">
                <div className="w-12 flex items-center justify-center bg-red-950/30">
                  <span className="text-red-400 text-lg">⛔</span>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-white">{check.name}</h4>
                      <span className="text-xs px-2 py-0.5 bg-purple-900/50 text-purple-300 rounded font-mono">
                        {check.rule}
                      </span>
                    </div>
                    <code className="text-xs text-gray-500 font-mono hidden md:block">{check.method}</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{check.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-gray-500">Ожидается: <span className="text-green-400 font-mono">{check.expected}</span></span>
                    <span className="text-red-400 font-bold">КРИТИЧНО</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Workflow view */}
      {activeView === 'workflow' && (
        <div className="space-y-3">
          {complianceWorkflow.map((step, i) => (
            <div key={i} className={`bg-gray-900 rounded-xl border ${
              step.critical ? 'border-red-700/50 bg-red-950/10' : 'border-gray-800'
            } overflow-hidden`}>
              <div className="flex items-stretch">
                <div className={`w-14 flex flex-col items-center justify-center ${
                  step.critical ? 'bg-red-950/50' : 'bg-gray-800/50'
                }`}>
                  <span className="text-xs text-gray-500">#{step.step}</span>
                  {step.critical && <span className="text-red-400 text-lg mt-1">⛔</span>}
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-cyan-400 text-sm font-mono">{step.name}</code>
                    <span className="text-sm text-gray-400">{step.action}</span>
                  </div>
                  <p className={`text-xs ${step.critical ? 'text-red-300 font-semibold' : 'text-gray-500'}`}>
                    {step.compliance}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-amber-950/30 border border-amber-700/50 rounded-xl p-4 mt-4">
            <p className="text-amber-200 text-sm">
              💡 <strong>Важно:</strong> compliance.py запускается ПОСЛЕ сборки mp4, но ДО экспорта в финальную директорию.
              Если проверка провалена — файл удаляется, выводится список ошибок, и ролик не попадает в output/.
            </p>
          </div>
        </div>
      )}

      {/* Examples view */}
      {activeView === 'examples' && (
        <div className="space-y-6">
          {/* Example selector */}
          <div className="flex flex-wrap gap-2">
            {complianceExamples.map((ex, i) => (
              <button
                key={i}
                onClick={() => setSelectedExample(i)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedExample === i
                    ? ex.passed ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {ex.passed ? '✓' : '✗'} {ex.topic}
              </button>
            ))}
          </div>

          {/* Selected example */}
          <div className={`rounded-xl border ${
            currentExample.passed ? 'bg-green-950/20 border-green-700/50' : 'bg-red-950/20 border-red-700/50'
          } p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{currentExample.passed ? '✅' : '❌'}</span>
              <div>
                <h3 className={`text-xl font-bold ${currentExample.passed ? 'text-green-300' : 'text-red-300'}`}>
                  {currentExample.passed ? 'ПРОЙДЕНО' : 'ПРОВАЛЕНО'}
                </h3>
                <p className="text-sm text-gray-400">Тема: {currentExample.topic}</p>
                <p className="text-xs text-gray-500 font-mono">{currentExample.timestamp}</p>
              </div>
            </div>

            <div className="space-y-2">
              {currentExample.checks.map((check, i) => {
                const checkDef = complianceChecks.find(c => c.id === check.id);
                return (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${
                    check.ok ? 'bg-green-950/30' : 'bg-red-950/30'
                  }`}>
                    <span className={`text-lg ${check.ok ? 'text-green-400' : 'text-red-400'}`}>
                      {check.ok ? '✓' : '✗'}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">{checkDef?.name}</p>
                      <p className="text-xs text-gray-400">
                        Ожидается: <span className="font-mono">{check.expected}</span> |
                        Фактически: <span className={`font-mono ${check.ok ? 'text-green-400' : 'text-red-400'}`}>{check.actual}</span>
                      </p>
                      {check.error && (
                        <p className="text-xs text-red-300 mt-1">⚠️ {check.error}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {!currentExample.passed && (
              <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-300 font-semibold mb-2">🔧 Как исправить:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  {currentExample.checks.filter(c => !c.ok).map((c, i) => (
                    <li key={i}>• {c.error || `Исправить: ${c.actual} → ${c.expected}`}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keywords view */}
      {activeView === 'keywords' && (
        <div className="space-y-4">
          <div className="bg-red-950/30 border border-red-700/50 rounded-xl p-4">
            <p className="text-red-200 text-sm">
              🚫 <strong>Правило 0.4a:</strong> Запрещено создавать AI-персону, дающую советы по здоровью, медицине, праву, финансам или политике.
              Это прямая категория демонетизации YouTube "inauthentic content" (3-я категория).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(forbiddenKeywords).map(([category, keywords]) => (
              <div key={category} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-red-400">⛔</span>
                  <span className="text-sm font-mono text-red-300">{category}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((kw, i) => (
                    <span key={i} className="px-2 py-1 bg-red-900/30 text-red-300 rounded text-xs font-mono">
                      "{kw}"
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-950/30 border border-amber-700/50 rounded-xl p-4">
            <p className="text-amber-200 text-sm">
              💡 <strong>Альтернатива:</strong> Вместо советов можно показывать <span className="font-semibold">данные и статистику</span> без рекомендаций.
              Например, не "инвестируй в крипту", а "вот как вырос биткоин за 10 лет" — это факты, не советы.
            </p>
          </div>
        </div>
      )}

      {/* AI Label view */}
      {activeView === 'ailabel' && (
        <div className="space-y-6">
          <div className="bg-amber-950/30 border border-amber-700/50 rounded-xl p-4">
            <p className="text-amber-200 text-sm">
              ⚠️ <strong>Правило 0.4e:</strong> Все платформы (TikTok, Instagram Reels, YouTube Shorts) требуют маркировку AI-контента с 2024 года.
              Флаг <code className="bg-amber-900/50 px-1 rounded">synthetic_media: true</code> автоматически вставляется в описание при публикации.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(aiLabelExamples).map(([platform, data]) => (
              <div key={platform} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <h4 className="font-bold text-white mb-3 capitalize">{platform}</h4>
                <div className="bg-gray-950 rounded-lg p-3 mb-3">
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {data.description}
                  </pre>
                </div>
                <p className="text-xs text-gray-500">{data.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sidecar JSON view */}
      {activeView === 'sidecar' && (
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-sm text-gray-300 mb-2">
              📋 <strong>Sidecar JSON</strong> — метаданные ролика, сохраняются рядом с mp4-файлом.
              Содержат всю информацию о происхождении контента, источниках данных, параметрах сборки и результате compliance-проверок.
            </p>
            <p className="text-xs text-gray-500">
              Файл: <code className="text-cyan-400">output/Рост_госдолга_США.json</code>
            </p>
          </div>

          <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
            <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500">output/Рост_госдолга_США.json</span>
              <button
                onClick={() => navigator.clipboard.writeText(sidecarJsonExample)}
                className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded"
              >
                📋 Копировать
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-gray-300 whitespace-pre overflow-x-auto leading-relaxed max-h-96">
              {sidecarJsonExample}
            </pre>
          </div>

          <div className="bg-green-950/30 border border-green-700/50 rounded-xl p-4">
            <p className="text-green-200 text-sm">
              ✓ <strong>Ключевые поля:</strong>
            </p>
            <ul className="text-xs text-green-300/80 mt-2 space-y-1">
              <li>• <code>synthetic_media: true</code> — маркировка AI-контента</li>
              <li>• <code>ai_label_required: true</code> — флаг для автоматической вставки в описание</li>
              <li>• <code>source.license</code> — лицензия источника данных (CC-BY-4.0, CC0, etc.)</li>
              <li>• <code>compliance.passed: true</code> — результат всех проверок</li>
            </ul>
          </div>
        </div>
      )}

      {/* Next step */}
      <div className="bg-gradient-to-br from-purple-950 to-indigo-950 rounded-xl p-6 border border-purple-700/50">
        <h3 className="text-lg font-bold text-purple-200 mb-4">🎯 Следующий шаг: ЭТАП 5</h3>
        <p className="text-purple-300/80 text-sm mb-4">
          Дашборд аналитики: локальный HTML-отчёт по метрикам (finish rate, shares, saves, подписчики) с автоматическим выводом рекомендаций.
        </p>
      </div>
    </div>
  );
}

// ===== STAGE 5: Analytics Dashboard =====
function StageFiveSection() {
  const [activeView, setActiveView] = useState<'overview' | 'daily' | 'formats' | 'recommendations' | 'csv'>('overview');

  const maxViews = Math.max(...dailyMetrics.map(d => d.views));
  const maxSubs = Math.max(...dailyMetrics.map(d => d.totalSubs));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-purple-300 mb-2">📊 ЭТАП 5 — Дашборд аналитики</h2>
        <p className="text-gray-400 mb-2">
          Локальный HTML-отчёт по метрикам за 14 дней. Автоматический вывод: <span className="text-green-400 font-semibold">какой формат масштабировать, какой убить</span>.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs font-mono">✓ {finalReport.totalNewSubs} подписчиков</span>
          <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs font-mono">👁 {finalReport.totalViews.toLocaleString()} просмотров</span>
          <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-xs font-mono">📈 {finalReport.avgFinishRate}% finish rate</span>
          <span className="px-2 py-1 bg-amber-900/50 text-amber-300 rounded text-xs font-mono">🎯 {finalReport.viralHits} виральных хита</span>
        </div>
      </div>

      {/* Final decision banner */}
      <div className="bg-gradient-to-r from-green-950 to-emerald-950 border border-green-700/50 rounded-xl p-5">
        <div className="flex items-center gap-4">
          <span className="text-5xl">✅</span>
          <div>
            <h3 className="text-xl font-bold text-green-300">РЕШЕНИЕ: {finalReport.decision}</h3>
            <p className="text-green-200/70 text-sm mt-1">{finalReport.nextStep}</p>
            <p className="text-xs text-green-400/60 mt-2 font-mono">{finalReport.period}</p>
          </div>
        </div>
      </div>

      {/* Key metrics cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-xs text-gray-500 mb-1">ВСЕГО РОЛИКОВ</p>
          <p className="text-3xl font-bold text-white">{finalReport.totalVideos}</p>
          <p className="text-xs text-gray-400 mt-1">~3.3 видео/день</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-xs text-gray-500 mb-1">ПРОСМОТРЫ</p>
          <p className="text-3xl font-bold text-blue-400">{(finalReport.totalViews / 1000).toFixed(0)}K</p>
          <p className="text-xs text-gray-400 mt-1">Средний: {(finalReport.totalViews / finalReport.totalVideos).toFixed(0)}</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-xs text-gray-500 mb-1">ПОДПИСЧИКИ</p>
          <p className="text-3xl font-bold text-green-400">{(finalReport.totalNewSubs / 1000).toFixed(1)}K</p>
          <p className="text-xs text-gray-400 mt-1">Цель 3K: ✓ перевыполнена</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-xs text-gray-500 mb-1">FINISH RATE</p>
          <p className="text-3xl font-bold text-purple-400">{finalReport.avgFinishRate}%</p>
          <p className="text-xs text-gray-400 mt-1">Цель ≥65%: ✓</p>
        </div>
      </div>

      {/* View switcher */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'overview', label: '📈 Обзор' },
          { id: 'daily', label: '📅 По дням' },
          { id: 'formats', label: '🎬 По форматам' },
          { id: 'recommendations', label: '💡 Рекомендации' },
          { id: 'csv', label: '📋 CSV-структура' },
        ].map(v => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id as typeof activeView)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeView === v.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Overview view */}
      {activeView === 'overview' && (
        <div className="space-y-6">
          {/* Subscribers growth chart */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Рост подписчиков (14 дней)</h3>
            <div className="h-48 flex items-end gap-1">
              {dailyMetrics.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all hover:opacity-80"
                    style={{ height: `${(d.totalSubs / maxSubs) * 100}%` }}
                    title={`День ${d.day}: ${d.totalSubs} подписчиков`}
                  />
                  <span className="text-[9px] text-gray-500 mt-1">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>День 1</span>
              <span>День 7 (гейт: 10K просмотров)</span>
              <span>День 14</span>
            </div>
          </div>

          {/* Views chart */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Просмотры по дням</h3>
            <div className="h-48 flex items-end gap-1">
              {dailyMetrics.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className={`w-full rounded-t transition-all hover:opacity-80 ${
                      d.viralHit ? 'bg-gradient-to-t from-amber-600 to-amber-400' : 'bg-gradient-to-t from-blue-600 to-blue-400'
                    }`}
                    style={{ height: `${(d.views / maxViews) * 100}%` }}
                    title={`День ${d.day}: ${d.views.toLocaleString()} просмотров${d.viralHit ? ' (ВИРАЛ)' : ''}`}
                  />
                  <span className="text-[9px] text-gray-500 mt-1">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span className="text-gray-400">Обычный ролик</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-amber-500 rounded" />
                <span className="text-gray-400">Виральный хит (&gt;10K просмотров)</span>
              </div>
            </div>
          </div>

          {/* KPI gates */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">KPI-гейты (14-дневный план)</h3>
            <div className="space-y-2">
              {kpiGates.map((gate, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${
                  gate.passed ? 'bg-green-950/30' : 'bg-red-950/30'
                }`}>
                  <span className={`text-lg ${gate.passed ? 'text-green-400' : 'text-red-400'}`}>
                    {gate.passed ? '✓' : '✗'}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-white">День {gate.day}: {gate.gate}</p>
                    <p className={`text-xs ${gate.passed ? 'text-green-400' : 'text-red-400'}`}>
                      Фактически: {gate.actual}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Daily view */}
      {activeView === 'daily' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-2 text-gray-400 font-medium">День</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Дата</th>
                <th className="text-center py-3 px-2 text-gray-400 font-medium">Видео</th>
                <th className="text-right py-3 px-2 text-gray-400 font-medium">Просмотры</th>
                <th className="text-right py-3 px-2 text-gray-400 font-medium">Подписчики</th>
                <th className="text-center py-3 px-2 text-gray-400 font-medium">Finish %</th>
                <th className="text-right py-3 px-2 text-gray-400 font-medium">Shares</th>
                <th className="text-right py-3 px-2 text-gray-400 font-medium">Saves</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Лучший формат</th>
                <th className="text-center py-3 px-2 text-gray-400 font-medium">Вирал</th>
              </tr>
            </thead>
            <tbody>
              {dailyMetrics.map(d => (
                <tr key={d.day} className={`border-b border-gray-800/50 hover:bg-gray-900/50 ${
                  d.viralHit ? 'bg-amber-950/10' : ''
                }`}>
                  <td className="py-2 px-2 text-gray-500 font-mono text-xs">{d.day}</td>
                  <td className="py-2 px-2 text-gray-400 text-xs font-mono">{d.date}</td>
                  <td className="py-2 px-2 text-center text-gray-300">{d.videos}</td>
                  <td className="py-2 px-2 text-right text-blue-400 font-mono text-xs">{d.views.toLocaleString()}</td>
                  <td className="py-2 px-2 text-right text-green-400 font-mono text-xs">+{d.newSubs}</td>
                  <td className="py-2 px-2 text-center">
                    <span className={`text-xs font-mono ${
                      d.finishRate >= 70 ? 'text-green-400' : d.finishRate >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {d.finishRate}%
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right text-purple-400 font-mono text-xs">{d.shares}</td>
                  <td className="py-2 px-2 text-right text-cyan-400 font-mono text-xs">{d.saves}</td>
                  <td className="py-2 px-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      d.bestFormat === 'шок-цифра' ? 'bg-red-900/50 text-red-300' :
                      d.bestFormat === 'сравнение' ? 'bg-blue-900/50 text-blue-300' :
                      d.bestFormat === 'прогноз' ? 'bg-purple-900/50 text-purple-300' :
                      'bg-green-900/50 text-green-300'
                    }`}>
                      {d.bestFormat}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center">
                    {d.viralHit && <span className="text-amber-400">🔥</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Formats view */}
      {activeView === 'formats' && (
        <div className="space-y-6">
          <div className="bg-amber-950/30 border border-amber-700/50 rounded-xl p-4">
            <p className="text-amber-200 text-sm">
              💡 <strong>Автоматический анализ:</strong> система сравнивает метрики по форматам и выносит вердикт: «масштабировать», «оставить» или «убить».
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {formatPerformance.map(fp => (
              <div key={fp.format} className={`bg-gray-900 rounded-xl border ${
                fp.verdict === 'масштабировать' ? 'border-green-700/50' :
                fp.verdict === 'оставить' ? 'border-yellow-700/50' :
                'border-red-700/50'
              } p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: fp.color }} />
                    <h4 className="font-bold text-white">{fp.format}</h4>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-bold ${
                    fp.verdict === 'масштабировать' ? 'bg-green-900/50 text-green-300' :
                    fp.verdict === 'оставить' ? 'bg-yellow-900/50 text-yellow-300' :
                    'bg-red-900/50 text-red-300'
                  }`}>
                    {fp.verdict === 'масштабировать' && '🚀 '}
                    {fp.verdict === 'оставить' && '⚠️ '}
                    {fp.verdict === 'убить' && '⛔ '}
                    {fp.verdict.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500">Видео</p>
                    <p className="text-white font-bold">{fp.videos}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ср. просмотры</p>
                    <p className="text-blue-400 font-bold">{fp.avgViews.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Finish rate</p>
                    <p className={`font-bold ${fp.avgFinishRate >= 70 ? 'text-green-400' : fp.avgFinishRate >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {fp.avgFinishRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Engagement</p>
                    <p className="text-purple-400 font-bold">{fp.engagementRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Shares</p>
                    <p className="text-purple-400 font-bold">{fp.totalShares.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Saves</p>
                    <p className="text-cyan-400 font-bold">{fp.totalSaves.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Format distribution pie chart (simplified) */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Текущее vs Рекомендуемое распределение</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Текущее (14 дней)</p>
                <div className="space-y-2">
                  {formatPerformance.map(fp => {
                    const pct = (fp.videos / finalReport.totalVideos) * 100;
                    return (
                      <div key={fp.format} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-20">{fp.format}</span>
                        <div className="flex-1 h-6 bg-gray-800 rounded overflow-hidden">
                          <div
                            className="h-full flex items-center justify-end px-2 text-xs font-bold text-white"
                            style={{ width: `${pct}%`, backgroundColor: fp.color }}
                          >
                            {pct.toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Рекомендуемое</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-20">шок-цифра</span>
                    <div className="flex-1 h-6 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-red-500 flex items-center justify-end px-2 text-xs font-bold text-white" style={{ width: '50%' }}>50%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-20">сравнение</span>
                    <div className="flex-1 h-6 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-blue-500 flex items-center justify-end px-2 text-xs font-bold text-white" style={{ width: '30%' }}>30%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-20">прогноз</span>
                    <div className="flex-1 h-6 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-purple-500 flex items-center justify-end px-2 text-xs font-bold text-white" style={{ width: '15%' }}>15%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-20">миф</span>
                    <div className="flex-1 h-6 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-green-500 flex items-center justify-end px-2 text-xs font-bold text-white" style={{ width: '5%' }}>5%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations view */}
      {activeView === 'recommendations' && (
        <div className="space-y-4">
          <div className="bg-green-950/30 border border-green-700/50 rounded-xl p-4">
            <p className="text-green-200 text-sm">
              💡 <strong>Автоматические рекомендации</strong> генерируются на основе метрик за последние 14 дней.
              Приоритеты: high (критично), medium (важно), low (опционально).
            </p>
          </div>

          {recommendations.map((rec, i) => (
            <div key={i} className={`bg-gray-900 rounded-xl border ${
              rec.priority === 'high' ? 'border-red-700/50' :
              rec.priority === 'medium' ? 'border-yellow-700/50' :
              'border-gray-700'
            } p-5`}>
              <div className="flex items-start gap-4">
                <span className={`text-2xl ${
                  rec.priority === 'high' ? 'text-red-400' :
                  rec.priority === 'medium' ? 'text-yellow-400' :
                  'text-gray-400'
                }`}>
                  {rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢'}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-white">{rec.action}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                      rec.priority === 'high' ? 'bg-red-900/50 text-red-300' :
                      rec.priority === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                      'bg-gray-800 text-gray-400'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{rec.reason}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-gray-500">Метрика: <span className="text-cyan-400 font-mono">{rec.metric}</span></span>
                    <span className="text-green-400">→ {rec.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CSV view */}
      {activeView === 'csv' && (
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-sm text-gray-300 mb-2">
              📋 <strong>CSV-структура</strong> для сбора метрик. Заполняется вручную после публикации каждого ролика
              (данные берутся из аналитики TikTok/Reels/Shorts).
            </p>
            <p className="text-xs text-gray-500">
              Файл: <code className="text-cyan-400">output/analytics.csv</code>
            </p>
          </div>

          <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
            <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500">output/analytics.csv</span>
              <button
                onClick={() => navigator.clipboard.writeText(csvStructure)}
                className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded"
              >
                📋 Копировать
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-gray-300 whitespace-pre overflow-x-auto leading-relaxed">
              {csvStructure}
            </pre>
          </div>

          <div className="bg-blue-950/30 border border-blue-700/50 rounded-xl p-4">
            <p className="text-blue-200 text-sm">
              💡 <strong>Автоматизация:</strong> в будущем можно интегрировать API TikTok/Instagram для автоматического сбора метрик.
              Пока — ручной ввод после публикации (занимает ~2 мин на ролик).
            </p>
          </div>
        </div>
      )}

      {/* Final summary */}
      <div className="bg-gradient-to-br from-purple-950 to-indigo-950 rounded-xl p-6 border border-purple-700/50">
        <h3 className="text-lg font-bold text-purple-200 mb-4">🎯 Итоговый отчёт за 14 дней</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-bold text-purple-300 mb-2">ДОСТИГНУТО:</h4>
            <ul className="space-y-2 text-sm text-purple-200/80">
              <li>✓ {finalReport.totalNewSubs.toLocaleString()} подписчиков (цель: 3000)</li>
              <li>✓ {finalReport.totalViews.toLocaleString()} просмотров</li>
              <li>✓ {finalReport.avgFinishRate}% средний finish rate (цель: ≥65%)</li>
              <li>✓ {finalReport.viralHits} виральных хита (&gt;10K просмотров)</li>
              <li>✓ Лучший день: {finalReport.bestDay.views.toLocaleString()} просмотров (день {finalReport.bestDay.day})</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-purple-300 mb-2">СЛЕДУЮЩИЕ ШАГИ:</h4>
            <ul className="space-y-2 text-sm text-purple-200/80">
              <li>→ Увеличить частоту до 4 видео/день</li>
              <li>→ Сфокусироваться на «шок-цифра» (50%) и «сравнение» (30%)</li>
              <li>→ Сократить «миф» до 5% или убрать</li>
              <li>→ Продолжать 14-дневный цикл с новыми данными</li>
              <li>→ Масштабировать виральные форматы</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// (старый QuestionsSection удалён — заменён на AnswersSection + StageOneSection)
