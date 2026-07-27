import { Activity } from 'lucide-react'
import type { StockQuote } from '@/lib/types'

interface Props { quote: StockQuote }

function VolumeBar({ label, value, max, highlight }: { label: string; value: number; max: number; highlight?: boolean }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-text-muted">{label}</span>
        <span className={`font-semibold tabular-nums ${highlight ? 'text-brand-400' : 'text-text-primary'}`}>
          {(value / 1000000).toFixed(2)}M
        </span>
      </div>
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            highlight ? 'bg-brand-500' : 'bg-white/20'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function VolumePanel({ quote }: Props) {
  const { volume, avgVolume10d, avgVolume30d, avgVolume90d } = quote
  const maxVol = Math.max(volume, avgVolume10d, avgVolume30d, avgVolume90d)
  const ratio10d = volume / avgVolume10d
  const ratio30d = volume / avgVolume30d
  const isHighVolume = ratio30d > 1.5
  const isInstitutional = ratio30d > 2 && quote.changePercent > 1

  return (
    <div className="glass-card p-6">
      <div className="section-title mb-4">
        <Activity className="w-4 h-4 text-brand-400" />
        Volume Analysis
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <VolumeBar label="Today's Volume" value={volume}       max={maxVol} highlight />
            <VolumeBar label="10-Day Avg"     value={avgVolume10d}  max={maxVol} />
            <VolumeBar label="30-Day Avg"     value={avgVolume30d}  max={maxVol} />
            <VolumeBar label="90-Day Avg"     value={avgVolume90d}  max={maxVol} />
          </div>
        </div>

        <div className="space-y-4">
          {/* Volume vs Avg */}
          <div className={`p-4 rounded-xl border ${
            isHighVolume
              ? 'bg-bull/[0.06] border-bull/20'
              : 'bg-white/[0.02] border-white/[0.05]'
          }`}>
            <div className="text-xs text-text-muted mb-1">vs 30-Day Average</div>
            <div className={`text-2xl font-black tabular-nums ${
              isHighVolume ? 'text-bull' : 'text-text-primary'
            }`}>{ratio30d.toFixed(2)}x</div>
            <div className={`text-sm mt-1 ${
              isHighVolume ? 'text-bull' : 'text-text-muted'
            }`}>
              {isHighVolume ? '🔥 Unusually High Volume' : 'Volume is near average'}
            </div>
          </div>

          {/* Institutional Participation */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="text-xs text-text-muted mb-2">Institutional Participation</div>
            {isInstitutional ? (
              <>
                <div className="text-sm font-semibold text-bull mb-2">🏦 High Institutional Activity Likely</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Volume is {ratio30d.toFixed(1)}x above the 30-day average with a significant price move. This pattern often indicates institutional buying or accumulation. Smart money typically leaves large volume footprints.
                </p>
              </>
            ) : (
              <>
                <div className="text-sm font-semibold text-text-secondary mb-2">📊 Retail-Driven Volume</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Volume is near average levels suggesting primarily retail participation. No clear institutional footprint detected. Watch for volume confirmation before taking positions.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
