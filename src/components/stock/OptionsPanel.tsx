import { Activity } from 'lucide-react'
import type { OptionsData } from '@/lib/types'

interface Props { options: OptionsData; price: number }

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub: string; color?: string }) {
  return (
    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
      <div className="text-xs text-text-muted mb-1">{label}</div>
      <div className={`text-xl font-black tabular-nums mb-1 ${color || 'text-text-primary'}`}>{value}</div>
      <div className="text-xs text-text-secondary leading-tight">{sub}</div>
    </div>
  )
}

export function OptionsPanel({ options, price }: Props) {
  const pcrSentiment = options.pcr > 1.2 ? 'Bullish' : options.pcr < 0.8 ? 'Bearish' : 'Neutral'
  const pcrColor = options.pcr > 1.2 ? 'text-bull' : options.pcr < 0.8 ? 'text-bear' : 'text-warn'
  const maxPainDiff = ((price - options.maxPain) / options.maxPain * 100).toFixed(1)

  return (
    <div className="glass-card p-6">
      <div className="section-title mb-4">
        <Activity className="w-4 h-4 text-brand-400" />
        Options Analysis
        <span className="text-xs font-normal text-text-muted ml-auto">F&O Data</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <MetricCard
          label="PCR (Put/Call Ratio)"
          value={options.pcr.toFixed(2)}
          sub={`${pcrSentiment} sentiment. PCR > 1.2 = bullish (more puts written = bulls confident). PCR < 0.8 = bearish.`}
          color={pcrColor}
        />
        <MetricCard
          label="Max Pain"
          value={`₹${options.maxPain.toLocaleString('en-IN')}`}
          sub={`Price is ${Math.abs(+maxPainDiff)}% ${+maxPainDiff > 0 ? 'above' : 'below'} max pain. Market may gravitate here by expiry.`}
        />
        <MetricCard
          label="Implied Volatility"
          value={`${options.impliedVolatility}%`}
          sub={options.impliedVolatility > 30 ? 'High IV — options are expensive. Premium sellers have edge.' : 'Normal IV — balanced risk/reward for options buyers.'}
          color={options.impliedVolatility > 30 ? 'text-warn' : 'text-text-primary'}
        />
        <MetricCard
          label="OI Build-up"
          value={options.callWriting ? 'Calls' : 'Puts'}
          sub={options.callWriting ? 'Active call writing detected — resistance being created at strike. Bearish near-term signal.' : 'Active put writing — support being built. Bullish signal.'}
          color={options.callWriting ? 'text-bear' : 'text-bull'}
        />
      </div>

      {/* OI Summary */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-4">
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Open Interest Comparison</div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-bear">Call OI</span>
              <span className="font-semibold tabular-nums">{(options.callOI / 1000000).toFixed(2)}M</span>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-bear/60 rounded-full" style={{ width: `${(options.callOI / (options.callOI + options.putOI)) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-bull">Put OI</span>
              <span className="font-semibold tabular-nums">{(options.putOI / 1000000).toFixed(2)}M</span>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-bull/60 rounded-full" style={{ width: `${(options.putOI / (options.callOI + options.putOI)) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-text-muted">
        ⚠️ Options data is for educational reference only. F&O requires separate regulatory compliance. Always consult a SEBI-registered advisor.
      </p>
    </div>
  )
}
