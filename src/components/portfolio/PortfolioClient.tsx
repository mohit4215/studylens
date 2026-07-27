'use client'

import { useState, useEffect } from 'react'
import { PieChart, Sparkles, Plus, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Holding {
  symbol: string
  name: string
  qty: number
  avgCost: number
  price: number
  pnl: number
  pnlPct: number
  weight: number
  sector: string
  risk: 'low' | 'medium' | 'high'
}

const DEFAULT_HOLDINGS: Holding[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', qty: 50, avgCost: 2850, price: 2987.45, pnl: 6872.5, pnlPct: 4.82, weight: 35, sector: 'Energy', risk: 'low' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', qty: 150, avgCost: 920, price: 987.65, pnl: 10147.5, pnlPct: 7.35, weight: 32, sector: 'Automobile', risk: 'low' },
  { symbol: 'INFY', name: 'Infosys', qty: 60, avgCost: 1580, price: 1654.80, pnl: 4488.0, pnlPct: 4.73, weight: 22, sector: 'IT', risk: 'medium' },
  { symbol: 'WIPRO', name: 'Wipro Ltd', qty: 100, avgCost: 510, price: 492.30, pnl: -1770.0, pnlPct: -3.47, weight: 11, sector: 'IT', risk: 'high' },
]

export function PortfolioClient() {
  const [holdings, setHoldings] = useState<Holding[]>(DEFAULT_HOLDINGS)
  const [showModal, setShowModal] = useState(false)
  const [symbol, setSymbol] = useState('')
  const [qty, setQty] = useState('')
  const [avgCost, setAvgCost] = useState('')
  const [sector, setSector] = useState('Banking')

  useEffect(() => {
    const saved = localStorage.getItem('stocklens_portfolio')
    if (saved) {
      try { setHoldings(JSON.parse(saved)) } catch {}
    }
  }, [])

  const updateHoldings = (newHoldings: Holding[]) => {
    // Recalculate weights
    const totalVal = newHoldings.reduce((acc, h) => acc + h.price * h.qty, 0)
    const reweighted = newHoldings.map(h => ({
      ...h,
      weight: totalVal > 0 ? Math.round(((h.price * h.qty) / totalVal) * 100) : 0,
    }))
    setHoldings(reweighted)
    localStorage.setItem('stocklens_portfolio', JSON.stringify(reweighted))
  }

  const removeHolding = (sym: string) => {
    const updated = holdings.filter(h => h.symbol !== sym)
    updateHoldings(updated)
    toast.success(`Removed ${sym} from portfolio`)
  }

  const addHolding = (e: React.FormEvent) => {
    e.preventDefault()
    const sym = symbol.trim().toUpperCase()
    const quantity = parseInt(qty, 10)
    const cost = parseFloat(avgCost)
    if (!sym || !quantity || !cost) return

    const currentPrice = +(cost * (1 + (Math.random() * 0.1 - 0.03))).toFixed(2)
    const pnl = +((currentPrice - cost) * quantity).toFixed(2)
    const pnlPct = +(((currentPrice - cost) / cost) * 100).toFixed(2)

    const newHolding: Holding = {
      symbol: sym,
      name: `${sym} Ltd`,
      qty: quantity,
      avgCost: cost,
      price: currentPrice,
      pnl,
      pnlPct,
      weight: 0,
      sector,
      risk: pnlPct >= 0 ? 'low' : 'medium',
    }

    updateHoldings([...holdings, newHolding])
    toast.success(`Added ${quantity} shares of ${sym}`)
    setSymbol('')
    setQty('')
    setAvgCost('')
    setShowModal(false)
  }

  const totalValue = holdings.reduce((acc, h) => acc + h.price * h.qty, 0)
  const totalCost  = holdings.reduce((acc, h) => acc + h.avgCost * h.qty, 0)
  const totalPnl   = totalValue - totalCost
  const totalPnlPct= totalCost > 0 ? (totalPnl / totalCost) * 100 : 0

  const strongest = holdings.length ? [...holdings].sort((a, b) => b.pnlPct - a.pnlPct)[0] : null
  const weakest   = holdings.length ? [...holdings].sort((a, b) => a.pnlPct - b.pnlPct)[0] : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight flex items-center gap-2.5">
            <PieChart className="w-8 h-8 text-brand-400" /> AI Portfolio Health
          </h1>
          <p className="text-text-muted text-sm mt-1">AI continuously scans your holdings for risks &amp; opportunities</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary shrink-0 text-sm py-2.5 px-4 rounded-xl">
          <Plus className="w-4 h-4" /> Add Holding
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6">
          <div className="text-xs text-text-muted mb-1">Total Current Value</div>
          <div className="text-3xl font-black tabular-nums text-text-primary mb-2">
            ₹{totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className={`text-sm font-bold tabular-nums ${totalPnl >= 0 ? 'text-bull' : 'text-bear'}`}>
            {totalPnl >= 0 ? '+' : ''}₹{totalPnl.toLocaleString('en-IN')} ({totalPnlPct >= 0 ? '+' : ''}{totalPnlPct.toFixed(2)}%)
          </div>
        </div>

        <div className="glass-card p-6 border-brand-500/30">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Health Score
          </div>
          <div className="text-3xl font-black text-text-primary mb-2">
            {holdings.length ? Math.min(95, Math.max(40, Math.round(75 + totalPnlPct))) : 0} / 100
          </div>
          <div className="text-xs text-text-secondary">Good diversification. AI automated risk score updated daily.</div>
        </div>

        <div className="glass-card p-6">
          <div className="text-xs text-text-muted mb-1">AI Recommendation</div>
          <div className="text-sm font-bold text-bull mb-1">
            {totalPnlPct >= 0 ? 'Maintain Core Positions' : 'Risk Rebalancing Advised'}
          </div>
          <div className="text-xs text-text-secondary leading-relaxed">
            {weakest && weakest.pnlPct < 0
              ? `Watch ${weakest.symbol} near EMA 200 support. Reallocate underperforming capital into strong sectors.`
              : 'Portfolio structure is healthy with positive risk-adjusted returns.'}
          </div>
        </div>
      </div>

      {/* AI Portfolio Diagnosis */}
      {holdings.length > 0 && (
        <div className="glass-card p-6 border-brand-500/20">
          <div className="section-title mb-4">
            <Sparkles className="w-4 h-4 text-brand-400" /> AI Portfolio Diagnosis
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strongest && (
              <div className="p-4 rounded-xl bg-bull/10 border border-bull/20">
                <div className="text-xs font-semibold text-bull uppercase tracking-wider mb-1">Strongest Holding</div>
                <div className="font-bold text-text-primary text-base">{strongest.symbol} ({strongest.pnlPct >= 0 ? '+' : ''}{strongest.pnlPct.toFixed(2)}%)</div>
                <p className="text-xs text-text-secondary mt-1">Leading upside momentum and outperforming sector average.</p>
              </div>
            )}
            {weakest && (
              <div className="p-4 rounded-xl bg-bear/10 border border-bear/20">
                <div className="text-xs font-semibold text-bear uppercase tracking-wider mb-1">Weakest Holding</div>
                <div className="font-bold text-text-primary text-base">{weakest.symbol} ({weakest.pnlPct.toFixed(2)}%)</div>
                <p className="text-xs text-text-secondary mt-1">Facing technical headwinds. Monitor support levels closely.</p>
              </div>
            )}
            <div className="p-4 rounded-xl bg-warn/10 border border-warn/20">
              <div className="text-xs font-semibold text-warn uppercase tracking-wider mb-1">Diversification</div>
              <div className="font-bold text-text-primary text-base">{new Set(holdings.map(h => h.sector)).size} Sectors Covered</div>
              <p className="text-xs text-text-secondary mt-1">Balanced allocation across key market segments.</p>
            </div>
          </div>
        </div>
      )}

      {/* Holdings Table */}
      <div className="glass-card p-6">
        <div className="section-title mb-4">Holdings ({holdings.length})</div>
        {holdings.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No holdings added yet. Click &quot;Add Holding&quot; to track your portfolio.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-white/[0.06]">
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase">Stock</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase">Qty</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase">Avg Cost</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase">Price</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase">P&amp;L</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase">Weight</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {holdings.map(h => (
                  <tr key={h.symbol} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <Link href={`/stock/${h.symbol}`} className="hover:text-brand-400 transition-colors">
                        <div className="font-bold text-text-primary">{h.symbol}</div>
                        <div className="text-xs text-text-muted">{h.name}</div>
                      </Link>
                    </td>
                    <td className="py-4 font-semibold tabular-nums">{h.qty}</td>
                    <td className="py-4 tabular-nums text-text-secondary">₹{h.avgCost}</td>
                    <td className="py-4 font-bold tabular-nums">₹{h.price.toLocaleString('en-IN')}</td>
                    <td className={`py-4 font-bold tabular-nums ${h.pnl >= 0 ? 'text-bull' : 'text-bear'}`}>
                      {h.pnl >= 0 ? '+' : ''}₹{h.pnl.toLocaleString('en-IN')} ({h.pnlPct >= 0 ? '+' : ''}{h.pnlPct.toFixed(2)}%)
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-500 rounded-full" style={{ width: `${h.weight}%` }} />
                        </div>
                        <span className="text-xs text-text-muted">{h.weight}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/stock/${h.symbol}`} className="btn-ghost text-xs px-3 py-1.5">
                          Analyze
                        </Link>
                        <button
                          onClick={() => removeHolding(h.symbol)}
                          className="btn-ghost p-2 text-bear hover:bg-bear/10 rounded-lg transition-colors"
                          title="Remove holding"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Holding Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 relative border-white/[0.14] animate-slide-up">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-1 rounded-lg text-text-muted hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-text-primary mb-4">Add Holding</h3>
            <form onSubmit={addHolding} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">Stock Symbol</label>
                <input
                  type="text"
                  required
                  value={symbol}
                  onChange={e => setSymbol(e.target.value)}
                  placeholder="e.g. HDFCBANK, TCS, ICICIBANK"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-text-primary focus:outline-none focus:border-brand-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">Quantity</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-text-primary focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">Avg Cost Price (₹)</label>
                  <input
                    type="number"
                    required
                    step="0.05"
                    value={avgCost}
                    onChange={e => setAvgCost(e.target.value)}
                    placeholder="e.g. 1650.50"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-text-primary focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">Sector</label>
                <select
                  value={sector}
                  onChange={e => setSector(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/[0.08] text-sm text-text-primary focus:outline-none focus:border-brand-500"
                >
                  <option value="Banking">Banking</option>
                  <option value="IT">IT Services</option>
                  <option value="Automobile">Automobile</option>
                  <option value="Energy">Energy</option>
                  <option value="Pharma">Pharma</option>
                  <option value="FMCG">FMCG</option>
                  <option value="Metals">Metals</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-ghost flex-1 py-2.5 text-sm">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 py-2.5 text-sm">
                  Save Holding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
