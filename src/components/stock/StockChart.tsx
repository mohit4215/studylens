'use client'

import { useState } from 'react'
import { BarChart2 } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts'
import type { OHLCV, TechnicalIndicators } from '@/lib/types'

interface Props {
  history: OHLCV[]
  symbol: string
  technicals: TechnicalIndicators
}

const TIMEFRAMES = ['1D', '5D', '1M', '3M', '6M', '1Y'] as const
type Timeframe = typeof TIMEFRAMES[number]

const TIMEFRAME_DAYS: Record<Timeframe, number> = {
  '1D': 1, '5D': 5, '1M': 22, '3M': 66, '6M': 130, '1Y': 252
}

function formatDate(dateStr: string, tf: Timeframe) {
  const d = new Date(dateStr)
  if (tf === '1D') return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  if (tf === '5D') return d.toLocaleDateString('en-IN', { weekday: 'short' })
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const close = payload[0]?.value
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <div className="text-text-muted mb-1">{label}</div>
      <div className="font-bold text-text-primary">₹{close?.toFixed(2)}</div>
    </div>
  )
}

export function StockChart({ history, symbol, technicals }: Props) {
  const [timeframe, setTimeframe] = useState<Timeframe>('3M')
  const [showEMA, setShowEMA] = useState(false)

  const days = TIMEFRAME_DAYS[timeframe]
  const sliced = history.slice(-days)
  const firstClose = sliced[0]?.close || 0
  const lastClose  = sliced[sliced.length - 1]?.close || 0
  const isUp = lastClose >= firstClose

  const chartData = sliced.map(d => ({
    date: formatDate(d.date, timeframe),
    close: d.close,
    volume: d.volume,
  }))

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="section-title">
          <BarChart2 className="w-4 h-4 text-brand-400" /> Price Chart
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEMA(!showEMA)}
            className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
              showEMA ? 'border-brand-500/60 bg-brand-500/15 text-brand-400' : 'border-white/[0.08] text-text-muted hover:text-text-secondary'
            }`}
          >
            EMAs
          </button>
          <div className="flex bg-white/[0.05] rounded-xl p-1 gap-0.5">
            {TIMEFRAMES.map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  timeframe === tf
                    ? 'bg-brand-500 text-white shadow-glow-blue'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={isUp ? '#00d97e' : '#ff4d6d'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isUp ? '#00d97e' : '#ff4d6d'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#4a5270', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fill: '#4a5270', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `₹${v.toLocaleString('en-IN')}`}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            {showEMA && (
              <>
                <ReferenceLine y={technicals.ema20}  stroke="#2aadff" strokeWidth={1} strokeDasharray="4 4" label={{ value: 'EMA20', fill: '#2aadff', fontSize: 10, position: 'right' }} />
                <ReferenceLine y={technicals.ema50}  stroke="#ffb038" strokeWidth={1} strokeDasharray="4 4" label={{ value: 'EMA50', fill: '#ffb038', fontSize: 10, position: 'right' }} />
                <ReferenceLine y={technicals.ema200} stroke="#ff4d6d" strokeWidth={1} strokeDasharray="4 4" label={{ value: 'EMA200', fill: '#ff4d6d', fontSize: 10, position: 'right' }} />
              </>
            )}
            <Area
              type="monotone"
              dataKey="close"
              stroke={isUp ? '#00d97e' : '#ff4d6d'}
              strokeWidth={2}
              fill="url(#colorClose)"
              dot={false}
              activeDot={{ r: 4, fill: isUp ? '#00d97e' : '#ff4d6d', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-text-muted">
        <span>TradingView style view</span>
        <span className={isUp ? 'text-bull' : 'text-bear'}>
          {isUp ? '▲' : '▼'} {Math.abs(((lastClose - firstClose) / firstClose) * 100).toFixed(2)}% in {timeframe}
        </span>
      </div>
    </div>
  )
}
