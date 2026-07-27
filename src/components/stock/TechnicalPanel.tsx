import { BarChart2, Info } from 'lucide-react'
import type { TechnicalIndicators, TechnicalSignal } from '@/lib/types'

interface Props {
  technicals: TechnicalIndicators
  signals: TechnicalSignal[]
  price: number
}

const SIGNAL_COLORS = {
  BUY:     { bg: 'bg-bull/15',    text: 'text-bull',    border: 'border-bull/25' },
  SELL:    { bg: 'bg-bear/15',    text: 'text-bear',    border: 'border-bear/25' },
  NEUTRAL: { bg: 'bg-warn/15',    text: 'text-warn',    border: 'border-warn/25' },
}

const STRENGTH_COLORS = {
  STRONG:   'text-text-primary',
  MODERATE: 'text-text-secondary',
  WEAK:     'text-text-muted',
}

function IndicatorRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
      <span className="text-sm text-text-muted">{label}</span>
      <div className="text-right">
        <span className="font-semibold text-text-primary text-sm tabular-nums">{value}</span>
        {sub && <div className="text-xs text-text-muted">{sub}</div>}
      </div>
    </div>
  )
}

function SignalCard({ signal }: { signal: TechnicalSignal }) {
  const col = SIGNAL_COLORS[signal.signal]
  const str = STRENGTH_COLORS[signal.strength]
  return (
    <div className={`p-4 rounded-xl border ${col.border} bg-white/[0.02]`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-sm font-bold text-text-primary">{signal.indicator}</span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${col.bg} ${col.text} ${col.border}`}>
            {signal.signal}
          </span>
          <span className={`text-xs ${str}`}>{signal.strength}</span>
        </div>
      </div>
      <div className="text-xs font-semibold text-text-secondary mb-1.5">{signal.value}</div>
      <p className="text-xs text-text-muted leading-relaxed">{signal.explanation}</p>
    </div>
  )
}

export function TechnicalPanel({ technicals, signals, price }: Props) {
  const buyCount  = signals.filter(s => s.signal === 'BUY').length
  const sellCount = signals.filter(s => s.signal === 'SELL').length
  const neutCount = signals.filter(s => s.signal === 'NEUTRAL').length

  return (
    <div className="glass-card p-6">
      <div className="section-title mb-4">
        <BarChart2 className="w-4 h-4 text-brand-400" />
        Technical Analysis
      </div>

      {/* Signal Summary */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] mb-5">
        <div className="flex-1">
          <div className="text-xs text-text-muted mb-2">Signal Summary ({signals.length} indicators)</div>
          <div className="h-2 bg-white/[0.08] rounded-full flex overflow-hidden">
            <div className="bg-bull h-full rounded-l-full transition-all duration-700" style={{ width: `${(buyCount / signals.length) * 100}%` }} />
            <div className="bg-warn h-full transition-all duration-700" style={{ width: `${(neutCount / signals.length) * 100}%` }} />
            <div className="bg-bear h-full rounded-r-full transition-all duration-700" style={{ width: `${(sellCount / signals.length) * 100}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-bull font-bold">{buyCount} Buy</span>
          <span className="text-warn">{neutCount} Neutral</span>
          <span className="text-bear">{sellCount} Sell</span>
        </div>
      </div>

      {/* Raw Indicators Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Moving Averages</div>
          <div className="glass-card p-4">
            <IndicatorRow label="Price" value={`₹${price.toLocaleString('en-IN')}`} sub="Current" />
            <IndicatorRow label="EMA 20" value={`₹${technicals.ema20.toLocaleString('en-IN')}`} sub={price > technicals.ema20 ? '▲ Above' : '▼ Below'} />
            <IndicatorRow label="EMA 50" value={`₹${technicals.ema50.toLocaleString('en-IN')}`} sub={price > technicals.ema50 ? '▲ Above' : '▼ Below'} />
            <IndicatorRow label="EMA 200" value={`₹${technicals.ema200.toLocaleString('en-IN')}`} sub={price > technicals.ema200 ? '▲ Above' : '▼ Below'} />
            <IndicatorRow label="VWAP" value={`₹${technicals.vwap.toLocaleString('en-IN')}`} sub={price > technicals.vwap ? '▲ Above' : '▼ Below'} />
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Oscillators</div>
          <div className="glass-card p-4">
            <IndicatorRow label="RSI (14)" value={`${technicals.rsi14}`} sub={
              technicals.rsi14 > 70 ? '⚠ Overbought' : technicals.rsi14 < 30 ? '⚠ Oversold' : 'Neutral Zone'
            } />
            <IndicatorRow label="MACD" value={`${technicals.macd.macd.toFixed(2)}`} sub={`Signal: ${technicals.macd.signal.toFixed(2)}`} />
            <IndicatorRow label="Histogram" value={`${technicals.macd.histogram.toFixed(2)}`} sub={technicals.macd.histogram > 0 ? 'Bullish' : 'Bearish'} />
            <IndicatorRow label="ADX" value={`${technicals.adx}`} sub={
              technicals.adx > 25 ? 'Strong Trend' : 'Weak Trend'
            } />
            <IndicatorRow label="Supertrend" value={`₹${technicals.supertrend.value.toFixed(2)}`} sub={technicals.supertrend.trend === 'up' ? '▲ BUY Signal' : '▼ SELL Signal'} />
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Bollinger Bands</div>
          <div className="glass-card p-4">
            <IndicatorRow label="Upper Band" value={`₹${technicals.upperBand.toFixed(2)}`} sub={price > technicals.upperBand ? 'Above Upper — Overbought' : 'Below'} />
            <IndicatorRow label="Middle Band" value={`₹${technicals.middleBand.toFixed(2)}`} />
            <IndicatorRow label="Lower Band" value={`₹${technicals.lowerBand.toFixed(2)}`} sub={price < technicals.lowerBand ? 'Below Lower — Oversold' : 'Above'} />
            <IndicatorRow label="Band Width" value={`₹${(technicals.upperBand - technicals.lowerBand).toFixed(2)}`} sub="Volatility spread" />
          </div>
        </div>
      </div>

      {/* AI-Explained Signal Cards */}
      <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">AI-Explained Signals</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {signals.map((signal, i) => (
          <SignalCard key={i} signal={signal} />
        ))}
      </div>
    </div>
  )
}
