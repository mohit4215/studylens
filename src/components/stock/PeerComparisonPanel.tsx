import { Users } from 'lucide-react'
import type { PeerComparison, StockQuote } from '@/lib/types'
import Link from 'next/link'

interface Props { peers: PeerComparison[]; currentSymbol: string; quote: StockQuote }

function fmtCap(v: number) {
  if (v >= 1e12) return `₹${(v / 1e12).toFixed(1)}L Cr`
  return `₹${(v / 1e9).toFixed(0)}K Cr`
}

export function PeerComparisonPanel({ peers, currentSymbol, quote }: Props) {
  const all = [
    { symbol: currentSymbol, name: quote.name, price: quote.price, change: quote.changePercent, marketCap: quote.marketCap, pe: quote.pe, pb: quote.pb, roe: 0, revenue: 0, profitGrowth: 0, isCurrent: true },
    ...peers.map(p => ({ ...p, change: p.change, isCurrent: false })),
  ]

  return (
    <div className="glass-card p-6">
      <div className="section-title mb-4">
        <Users className="w-4 h-4 text-brand-400" />
        Peer Comparison
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              {['Stock', 'Price', 'Today', 'Mkt Cap', 'PE', 'PB', 'ROE %'].map(h => (
                <th key={h} className="pb-3 text-xs font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {all.map((s: any) => (
              <tr key={s.symbol} className={`${s.isCurrent ? 'bg-brand-500/[0.06]' : ''} hover:bg-white/[0.03] transition-colors`}>
                <td className="py-3 pr-4">
                  <Link href={`/stock/${s.symbol}`} className="hover:text-brand-400 transition-colors">
                    <div className="font-bold text-text-primary">{s.symbol} {s.isCurrent && <span className="text-xs text-brand-400 ml-1">(you)</span>}</div>
                    <div className="text-xs text-text-muted truncate max-w-[120px]">{s.name}</div>
                  </Link>
                </td>
                <td className="py-3 pr-4 font-semibold tabular-nums">₹{s.price.toLocaleString('en-IN')}</td>
                <td className={`py-3 pr-4 font-semibold tabular-nums ${s.change >= 0 ? 'text-bull' : 'text-bear'}`}>
                  {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}%
                </td>
                <td className="py-3 pr-4 text-text-secondary tabular-nums">{fmtCap(s.marketCap)}</td>
                <td className="py-3 pr-4 tabular-nums">{s.pe?.toFixed(1) || '-'}</td>
                <td className="py-3 pr-4 tabular-nums">{s.pb?.toFixed(2) || '-'}</td>
                <td className="py-3 pr-4 tabular-nums">{s.roe ? `${s.roe.toFixed(1)}%` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
