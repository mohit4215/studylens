import { TrendingUp } from 'lucide-react'
import type { ChartPattern, OHLCV } from '@/lib/types'

interface Props { patterns: ChartPattern[]; history: OHLCV[] }

function PatternCard({ pattern }: { pattern: ChartPattern }) {
  const colors = {
    bullish: { bg: 'bg-bull/10', text: 'text-bull', border: 'border-bull/20' },
    bearish: { bg: 'bg-bear/10', text: 'text-bear', border: 'border-bear/20' },
    neutral: { bg: 'bg-warn/10', text: 'text-warn', border: 'border-warn/20' },
  }
  const c = colors[pattern.type]
  return (
    <div className={`p-4 rounded-xl border ${c.border} bg-white/[0.02]`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${c.text}`}>{pattern.name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${c.bg} ${c.text} font-semibold`}>
            {pattern.type.toUpperCase()}
          </span>
        </div>
        <div className="text-right">
          <div className="text-xs text-text-muted mb-0.5">Confidence</div>
          <div className={`font-bold text-sm ${c.text}`}>{pattern.confidence}%</div>
        </div>
      </div>
      <div className="w-full bg-white/[0.06] rounded-full h-1.5 mb-3">
        <div className={`h-1.5 rounded-full transition-all duration-700 ${
          pattern.type === 'bullish' ? 'bg-bull' : pattern.type === 'bearish' ? 'bg-bear' : 'bg-warn'
        }`} style={{ width: `${pattern.confidence}%` }} />
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{pattern.description}</p>
    </div>
  )
}

export function PriceActionPanel({ patterns, history }: Props) {
  const last5 = history.slice(-5)
  const higherHighs = last5.every((c, i) => i === 0 || c.high >= last5[i-1].high)
  const lowerLows   = last5.every((c, i) => i === 0 || c.low  <= last5[i-1].low)

  return (
    <div className="glass-card p-6">
      <div className="section-title mb-4">
        <TrendingUp className="w-4 h-4 text-brand-400" />
        Price Action & Patterns
      </div>

      {/* Trend Structure */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className={`p-3 rounded-xl border ${
          higherHighs ? 'border-bull/20 bg-bull/[0.05]' : 'border-white/[0.06] bg-white/[0.02]'
        }`}>
          <div className={`text-sm font-semibold mb-1 ${ higherHighs ? 'text-bull' : 'text-text-muted' }`}>
            {higherHighs ? '✓ Higher Highs' : '✗ No Higher Highs'}
          </div>
          <p className="text-xs text-text-muted">{higherHighs ? 'Each recent peak is higher — classic uptrend structure.' : 'Recent peaks are not making higher highs — trend may be weakening.'}</p>
        </div>
        <div className={`p-3 rounded-xl border ${
          !lowerLows ? 'border-bull/20 bg-bull/[0.05]' : 'border-bear/20 bg-bear/[0.05]'
        }`}>
          <div className={`text-sm font-semibold mb-1 ${lowerLows ? 'text-bear' : 'text-bull'}`}>
            {lowerLows ? '⚠ Lower Lows' : '✓ Higher Lows'}
          </div>
          <p className="text-xs text-text-muted">{lowerLows ? 'Lows are declining — bearish pressure is increasing.' : 'Lows are rising — buyers are stepping in at higher prices.'}</p>
        </div>
      </div>

      {/* Detected Patterns */}
      <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Detected Chart Patterns</div>
      {patterns.length > 0 ? (
        <div className="space-y-3">
          {patterns.map((p, i) => <PatternCard key={i} pattern={p} />)}
        </div>
      ) : (
        <div className="text-sm text-text-muted text-center py-4">No significant patterns detected currently.</div>
      )}
    </div>
  )
}
