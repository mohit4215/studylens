'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown } from 'lucide-react'

const TICKER_DATA = [
  { symbol: 'NIFTY 50', value: '24,856.15', change: '+312.45', pct: '+1.27%', up: true },
  { symbol: 'SENSEX', value: '81,432.65', change: '+1,024.80', pct: '+1.27%', up: true },
  { symbol: 'BANK NIFTY', value: '52,847.30', change: '-245.60', pct: '-0.46%', up: false },
  { symbol: 'INDIA VIX', value: '13.45', change: '-0.82', pct: '-5.75%', up: false },
  { symbol: 'RELIANCE', value: '₹2,987.45', change: '+58.30', pct: '+1.99%', up: true },
  { symbol: 'TATAMOTORS', value: '₹987.65', change: '+24.35', pct: '+2.53%', up: true },
  { symbol: 'SBIN', value: '₹812.30', change: '-12.45', pct: '-1.51%', up: false },
  { symbol: 'INFY', value: '₹1,654.80', change: '+32.10', pct: '+1.98%', up: true },
  { symbol: 'HDFCBANK', value: '₹1,723.55', change: '+18.75', pct: '+1.10%', up: true },
  { symbol: 'MARUTI', value: '₹12,845.00', change: '+345.20', pct: '+2.76%', up: true },
  { symbol: 'WIPRO', value: '₹492.30', change: '-8.65', pct: '-1.73%', up: false },
  { symbol: 'ICICIBANK', value: '₹1,298.70', change: '+22.45', pct: '+1.76%', up: true },
]

export function TickerStrip() {
  const double = [...TICKER_DATA, ...TICKER_DATA]

  return (
    <div className="bg-surface-50 border-y border-white/[0.06] py-2.5 overflow-hidden">
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {double.map((item, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-text-secondary">{item.symbol}</span>
              <span className="text-xs font-bold text-text-primary tabular-nums">{item.value}</span>
              <span className={`text-xs font-semibold tabular-nums flex items-center gap-1 ${
                item.up ? 'text-bull' : 'text-bear'
              }`}>
                {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {item.pct}
              </span>
              <span className="text-white/10 ml-2">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
