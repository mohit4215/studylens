'use client'

import { getMockMarketOverview } from '@/lib/market-data/mock-data'
import { useEffect, useState } from 'react'

const GAUGE_COLORS = [
  { range: [0, 20],  label: 'Extreme Fear', color: '#ff4d6d' },
  { range: [20, 40], label: 'Fear',         color: '#ff8c42' },
  { range: [40, 60], label: 'Neutral',      color: '#ffb038' },
  { range: [60, 80], label: 'Greed',        color: '#7ec8e3' },
  { range: [80,100], label: 'Extreme Greed',color: '#00d97e' },
]

function getGaugeColor(value: number) {
  const g = GAUGE_COLORS.find(g => value >= g.range[0] && value <= g.range[1])
  return g || GAUGE_COLORS[2]
}

function GaugeMeter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)
  const g = getGaugeColor(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0
      const interval = setInterval(() => {
        current += 2
        if (current >= value) { setDisplay(value); clearInterval(interval); }
        else setDisplay(current)
      }, 20)
      return () => clearInterval(interval)
    }, 300)
    return () => clearTimeout(timer)
  }, [value])

  const angle = (display / 100) * 180 - 90  // -90 to +90
  const r = 80
  const cx = 100, cy = 100

  // Arc path
  function polarToCartesian(deg: number) {
    const rad = (deg - 90) * Math.PI / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }
  function arcPath(startDeg: number, endDeg: number) {
    const s = polarToCartesian(startDeg)
    const e = polarToCartesian(endDeg)
    const large = endDeg - startDeg > 180 ? 1 : 0
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
  }

  const needleX = cx + r * 0.85 * Math.cos(((angle) * Math.PI) / 180)
  const needleY = cy + r * 0.85 * Math.sin(((angle) * Math.PI) / 180)

  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[240px]">
      {/* Track arcs */}
      {GAUGE_COLORS.map((seg, i) => {
        const start = 180 + (seg.range[0] / 100) * 180
        const end   = 180 + (seg.range[1] / 100) * 180
        return (
          <path
            key={i}
            d={arcPath(start, end)}
            fill="none"
            stroke={seg.color}
            strokeWidth="14"
            strokeLinecap="butt"
            opacity={0.25}
          />
        )
      })}
      {/* Filled arc */}
      <path
        d={arcPath(180, 180 + (display / 100) * 180)}
        fill="none"
        stroke={g.color}
        strokeWidth="14"
        strokeLinecap="round"
        style={{ transition: 'all 0.1s ease' }}
      />
      {/* Needle */}
      <line
        x1={cx} y1={cy}
        x2={needleX} y2={needleY}
        stroke="#f0f4ff" strokeWidth="2" strokeLinecap="round"
        style={{ transition: 'all 0.1s ease' }}
      />
      <circle cx={cx} cy={cy} r="5" fill={g.color} />
      {/* Center value */}
      <text x={cx} y={cy + 20} textAnchor="middle" fill={g.color} fontSize="22" fontWeight="900" fontFamily="Inter">
        {display}
      </text>
    </svg>
  )
}

export function FearGreedSection() {
  const { fearGreedValue, sentiment } = getMockMarketOverview()
  const g = getGaugeColor(fearGreedValue)

  return (
    <section>
      <h2 className="text-2xl font-bold text-text-primary mb-6">Market Sentiment</h2>
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Gauge */}
          <div className="flex flex-col items-center shrink-0">
            <GaugeMeter value={fearGreedValue} />
            <div className="text-center mt-2">
              <div className="font-bold text-lg" style={{ color: g.color }}>{g.label}</div>
              <div className="text-xs text-text-muted mt-0.5">Fear &amp; Greed Index</div>
            </div>
          </div>

          {/* Scale */}
          <div className="flex-1 grid grid-cols-5 gap-3">
            {GAUGE_COLORS.map(item => (
              <div
                key={item.label}
                className={`text-center p-3 rounded-xl border transition-all ${
                  getGaugeColor(fearGreedValue).label === item.label
                    ? 'border-white/20 bg-white/[0.08]'
                    : 'border-white/[0.04] bg-white/[0.02]'
                }`}
              >
                <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ background: item.color }} />
                <div className="text-[10px] font-medium text-text-secondary leading-tight">{item.label}</div>
                <div className="text-xs text-text-muted">{item.range[0]}–{item.range[1]}</div>
              </div>
            ))}
          </div>

          {/* Interpretation */}
          <div className="shrink-0 max-w-xs">
            <div className="text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary" style={{ color: g.color }}>{g.label}</strong> at {fearGreedValue}.
              {fearGreedValue >= 60
                ? ' Investors are greedy — the market may be overextended. Consider risk management.'
                : fearGreedValue >= 40
                ? ' Market sentiment is balanced. No extreme readings.'
                : ' Investors are fearful — historically a good time to look for quality stocks at discount.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
