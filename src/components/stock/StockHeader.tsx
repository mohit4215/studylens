'use client'

import { TrendingUp, TrendingDown, Star, Bell, Share2, RefreshCw } from 'lucide-react'
import type { StockQuote } from '@/lib/types'
import { useState } from 'react'

interface Props { quote: StockQuote }

function fmt(v: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(v)
}
function fmtCap(v: number) {
  if (v >= 1e12) return `₹${(v / 1e12).toFixed(2)} L Cr`
  if (v >= 1e9)  return `₹${(v / 1e9).toFixed(2)} K Cr`
  return `₹${(v / 1e7).toFixed(0)} Cr`
}
function fmtVol(v: number) {
  if (v >= 1e7) return `${(v / 1e7).toFixed(2)} Cr`
  if (v >= 1e5) return `${(v / 1e5).toFixed(2)} L`
  return v.toLocaleString('en-IN')
}

export function StockHeader({ quote }: Props) {
  const [watchlisted, setWatchlisted] = useState(false)
  const up = quote.changePercent >= 0

  return (
    <div className="animate-fade-in">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-semibold text-text-muted bg-white/[0.06] px-2 py-1 rounded-lg">{quote.exchange}</span>
            <span className="text-xs text-text-muted">{quote.sector}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">{quote.name}</h1>
          <p className="text-text-muted text-sm mt-1">{quote.symbol} · {quote.industry}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWatchlisted(!watchlisted)}
            className={`btn-ghost p-2.5 rounded-xl ${watchlisted ? 'text-yellow-400' : ''}`}
            aria-label="Add to watchlist"
          >
            <Star className={`w-4 h-4 ${watchlisted ? 'fill-yellow-400' : ''}`} />
          </button>
          <button className="btn-ghost p-2.5 rounded-xl" aria-label="Set alert"><Bell className="w-4 h-4" /></button>
          <button className="btn-ghost p-2.5 rounded-xl" aria-label="Share"><Share2 className="w-4 h-4" /></button>
          <button className="btn-ghost p-2.5 rounded-xl" aria-label="Refresh"><RefreshCw className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Price Section */}
      <div className={`mt-5 p-5 rounded-2xl border ${
        up ? 'border-bull/20 bg-bull/[0.04]' : 'border-bear/20 bg-bear/[0.04]'
      }`}>
        <div className="flex flex-wrap items-end gap-4 mb-4">
          <div>
            <div className="text-5xl font-black tabular-nums text-text-primary">
              ₹{fmt(quote.price)}
            </div>
            <div className={`flex items-center gap-2 mt-1.5 text-lg font-bold tabular-nums ${
              up ? 'text-bull' : 'text-bear'
            }`}>
              {up ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              {up ? '+' : ''}{fmt(quote.change)} ({up ? '+' : ''}{quote.changePercent.toFixed(2)}%)
            </div>
          </div>
          <div className={`ml-auto px-4 py-2 rounded-xl text-sm font-semibold ${
            up
              ? 'bg-bull/15 text-bull border border-bull/25'
              : 'bg-bear/15 text-bear border border-bear/25'
          }`}>
            {up ? '▲ BULLISH' : '▼ BEARISH'}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Open",      value: `₹${fmt(quote.open)}` },
            { label: "Day High",  value: `₹${fmt(quote.high)}`,         color: 'text-bull' },
            { label: "Day Low",   value: `₹${fmt(quote.low)}`,          color: 'text-bear' },
            { label: "Prev Close",value: `₹${fmt(quote.previousClose)}` },
            { label: "Volume",    value: fmtVol(quote.volume) },
            { label: "Mkt Cap",   value: fmtCap(quote.marketCap) },
          ].map(m => (
            <div key={m.label} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.05]">
              <div className="text-xs text-text-muted mb-1">{m.label}</div>
              <div className={`font-bold text-sm tabular-nums ${m.color || 'text-text-primary'}`}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* 52W Range */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-text-muted mb-1.5">
            <span>52W Low: ₹{fmt(quote.week52Low)}</span>
            <span>52W High: ₹{fmt(quote.week52High)}</span>
          </div>
          <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                up ? 'bg-gradient-to-r from-bear via-warn to-bull' : 'bg-gradient-to-r from-bear to-warn'
              }`}
              style={{
                width: `${Math.min(100, Math.max(5, ((quote.price - quote.week52Low) / (quote.week52High - quote.week52Low)) * 100))}%`,
              }}
            />
          </div>
          <div className="text-center text-xs text-text-muted mt-1">
            Currently at {(((quote.price - quote.week52Low) / (quote.week52High - quote.week52Low)) * 100).toFixed(0)}% of 52-week range
          </div>
        </div>
      </div>
    </div>
  )
}
