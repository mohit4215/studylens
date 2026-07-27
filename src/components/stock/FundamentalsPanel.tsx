import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { FundamentalsData } from '@/lib/types'

interface Props { fundamentals: FundamentalsData }

function fmtCr(v: number) {
  return `₹${(v).toLocaleString('en-IN')} Cr`
}

function MetricRow({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
      <div>
        <div className="text-sm text-text-muted">{label}</div>
        {sub && <div className="text-xs text-text-muted/70">{sub}</div>}
      </div>
      <span className={`font-bold text-sm tabular-nums ${color || 'text-text-primary'}`}>{value}</span>
    </div>
  )
}

export function FundamentalsPanel({ fundamentals: f }: Props) {
  const trendIcon = f.trend === 'improving'
    ? <TrendingUp className="w-4 h-4 text-bull" />
    : f.trend === 'deteriorating'
    ? <TrendingDown className="w-4 h-4 text-bear" />
    : <Minus className="w-4 h-4 text-warn" />

  return (
    <div className="glass-card p-6">
      <div className="section-title mb-1">
        <span>📊</span> Fundamental Snapshot
      </div>
      <div className="flex items-center gap-2 mb-5">
        {trendIcon}
        <span className={`text-sm font-semibold ${
          f.trend === 'improving' ? 'text-bull' : f.trend === 'deteriorating' ? 'text-bear' : 'text-warn'
        }`}>Fundamentals are {f.trend}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-xs text-text-muted">Score:</span>
          <span className={`font-bold text-sm ${
            f.fundamentalScore >= 70 ? 'text-bull' : f.fundamentalScore >= 50 ? 'text-warn' : 'text-bear'
          }`}>{f.fundamentalScore}/100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Financials */}
        <div>
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Financials (TTM)</div>
          <div className="glass-card p-4">
            <MetricRow label="Revenue" value={fmtCr(f.revenue)} />
            <MetricRow label="Revenue Growth" value={`${f.revenueGrowthYoY.toFixed(1)}%`} sub="YoY" color={f.revenueGrowthYoY > 0 ? 'text-bull' : 'text-bear'} />
            <MetricRow label="Net Profit" value={fmtCr(f.netProfit)} />
            <MetricRow label="Profit Growth" value={`${f.profitGrowthYoY.toFixed(1)}%`} sub="YoY" color={f.profitGrowthYoY > 0 ? 'text-bull' : 'text-bear'} />
            <MetricRow label="Cash Flow" value={fmtCr(f.cashFlow)} />
          </div>
        </div>

        {/* Ratios */}
        <div>
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Valuations</div>
          <div className="glass-card p-4">
            <MetricRow label="PE Ratio" value={f.pe.toFixed(1)} sub={f.pe < 20 ? 'Cheap' : f.pe < 35 ? 'Fair' : 'Expensive'} />
            <MetricRow label="PB Ratio" value={f.pb.toFixed(2)} />
            <MetricRow label="ROE" value={`${f.roe.toFixed(1)}%`} color={f.roe > 15 ? 'text-bull' : 'text-warn'} />
            <MetricRow label="ROCE" value={`${f.roce.toFixed(1)}%`} color={f.roce > 12 ? 'text-bull' : 'text-warn'} />
            <MetricRow label="Debt/Equity" value={f.debtToEquity.toFixed(2)} color={f.debtToEquity < 0.5 ? 'text-bull' : f.debtToEquity < 1 ? 'text-warn' : 'text-bear'} />
          </div>
        </div>

        {/* Holdings */}
        <div>
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Shareholding</div>
          <div className="glass-card p-4 space-y-3">
            {[
              { label: 'Promoters', value: f.promoterHolding, color: 'bg-brand-500' },
              { label: 'FII', value: f.fiiHolding, color: 'bg-info' },
              { label: 'DII', value: f.diiHolding, color: 'bg-warn' },
              { label: 'Public', value: f.publicHolding, color: 'bg-white/30' },
            ].map(h => (
              <div key={h.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-muted">{h.label}</span>
                  <span className="font-semibold text-text-primary">{h.value.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full ${h.color} rounded-full`} style={{ width: `${h.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
