import { Globe } from 'lucide-react'
import type { SectorData } from '@/lib/types'

interface Props { sector: SectorData }

export function SectorPanel({ sector }: Props) {
  const sectorUp = sector.sectorChange >= 0
  return (
    <div className="glass-card p-6">
      <div className="section-title mb-4">
        <Globe className="w-4 h-4 text-brand-400" />
        Sector Analysis
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] mb-4">
            <div className="text-xs text-text-muted mb-1">{sector.sectorName} Sector</div>
            <div className={`text-3xl font-black tabular-nums ${sectorUp ? 'text-bull' : 'text-bear'}`}>
              {sectorUp ? '+' : ''}{sector.sectorChange.toFixed(2)}%
            </div>
            <div className="text-xs text-text-secondary mt-1">
              Stock rank: #{sector.stockRank} of {sector.totalStocks} in sector
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${
            sector.isSectorDriven
              ? 'border-brand-500/20 bg-brand-500/[0.05]'
              : 'border-white/[0.06] bg-white/[0.02]'
          }`}>
            <div className="text-sm font-semibold text-text-primary mb-1">
              {sector.isSectorDriven ? '🌊 Sector-Driven Move' : '⭐ Stock-Specific Move'}
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              {sector.isSectorDriven
                ? `Today's move is largely driven by sector tailwinds. The entire ${sector.sectorName} sector is performing well, lifting this stock. The move may continue as long as sector momentum is strong.`
                : `This move is stock-specific and not driven by the broader sector. Fundamental or technical factors unique to this company are driving the price. This is a stronger signal of genuine interest.`}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-xs font-semibold text-bull uppercase tracking-wider mb-2">Top Performers Today</div>
            <div className="space-y-1.5">
              {sector.topPerformers.map(p => (
                <div key={p.symbol} className="flex justify-between text-sm">
                  <span className="text-text-secondary">{p.symbol}</span>
                  <span className="text-bull font-semibold tabular-nums">+{p.change.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="divider" />
          <div>
            <div className="text-xs font-semibold text-bear uppercase tracking-wider mb-2">Worst Performers Today</div>
            <div className="space-y-1.5">
              {sector.worstPerformers.map(p => (
                <div key={p.symbol} className="flex justify-between text-sm">
                  <span className="text-text-secondary">{p.symbol}</span>
                  <span className="text-bear font-semibold tabular-nums">{p.change.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
