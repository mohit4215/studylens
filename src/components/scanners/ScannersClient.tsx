'use client'

import { useState } from 'react'
import { Zap, ArrowUpRight, Sparkles, Filter, Search } from 'lucide-react'
import Link from 'next/link'
import type { ScannerResult } from '@/lib/types'

interface ScannerOption {
  key: string
  title: string
  desc: string
  icon: string
  tag: string
}

interface Props {
  scanners: ScannerOption[]
  initialType: string
  initialResults: ScannerResult[]
}

export function ScannersClient({ scanners, initialType, initialResults }: Props) {
  const [activeType, setActiveType] = useState(initialType)
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<ScannerResult[]>(initialResults)
  const [loading, setLoading] = useState(false)

  const selectScanner = async (key: string) => {
    setActiveType(key)
    setLoading(true)
    try {
      // Fetch scanner results from API or fallback
      const mockData = await import('@/lib/market-data/mock-data')
      const res = mockData.getMockScannerResults(key)
      setResults(res)
    } catch {
      // Keep existing if error
    } finally {
      setLoading(false)
    }
  }

  const currentScanner = scanners.find(s => s.key === activeType) || scanners[0]

  const filteredResults = results.filter(r =>
    r.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-text-primary tracking-tight flex items-center gap-2.5">
          <Zap className="w-8 h-8 text-warn" /> AI Stock Scanners
        </h1>
        <p className="text-text-muted text-sm mt-1">Real-time technical and volume scanners with instant AI explanations</p>
      </div>

      {/* Scanner Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {scanners.map(s => {
          const isActive = s.key === activeType
          return (
            <button
              key={s.key}
              onClick={() => selectScanner(s.key)}
              className={`p-4 rounded-2xl border transition-all text-left ${
                isActive
                  ? 'border-brand-500 bg-brand-500/10 shadow-glow-blue'
                  : 'border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06]'
              }`}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-xs font-bold text-text-primary leading-tight mb-1">{s.title}</div>
              <div className="text-[10px] text-text-muted">{s.tag}</div>
            </button>
          )
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter scanned results..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-text-primary focus:outline-none focus:border-brand-500"
          />
        </div>
        <span className="text-xs text-text-muted font-medium">
          Showing {filteredResults.length} of {results.length} scanned stocks
        </span>
      </div>

      {/* Results Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <span className="text-2xl">{currentScanner.icon}</span> {currentScanner.title}
            </h2>
            <p className="text-xs text-text-muted mt-0.5">{currentScanner.desc}</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 font-semibold">
            {filteredResults.length} Matches
          </span>
        </div>

        {loading ? (
          <div className="space-y-4 py-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-28 skeleton rounded-2xl" />
            ))}
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No stocks matched your search filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map(r => (
              <div key={r.symbol} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Link href={`/stock/${r.symbol}`} className="font-bold text-lg text-text-primary hover:text-brand-400 transition-colors">
                          {r.symbol}
                        </Link>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          r.strength === 'strong' ? 'bg-bull/15 text-bull' : 'bg-warn/15 text-warn'
                        }`}>
                          {r.strength}
                        </span>
                      </div>
                      <div className="text-xs text-text-muted">{r.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-lg font-black text-text-primary tabular-nums">₹{r.price.toLocaleString('en-IN')}</div>
                      <div className={`text-xs font-bold tabular-nums ${r.change >= 0 ? 'text-bull' : 'text-bear'}`}>
                        {r.change >= 0 ? '+' : ''}{r.change.toFixed(2)}%
                      </div>
                    </div>
                    <Link href={`/stock/${r.symbol}`} className="btn-primary py-2 px-4 text-xs rounded-xl">
                      Analyze <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* AI Description */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                  <div className="flex items-center gap-1.5 text-xs text-brand-400 font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> AI Signal Explanation
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{r.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {r.indicators.map((ind, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-text-muted font-medium">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
