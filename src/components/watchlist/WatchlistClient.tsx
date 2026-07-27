'use client'

import { useState, useEffect } from 'react'
import { Eye, Plus, Star, Trash2, Bell, Search, X } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface WatchlistItem {
  symbol: string
  name: string
  price: number
  change: number
  targetPrice: number
  stopLoss: number
  alertActive: boolean
}

const DEFAULT_WATCHLIST: WatchlistItem[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2987.45, change: 1.99, targetPrice: 3100, stopLoss: 2880, alertActive: true },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', price: 987.65, change: 2.53, targetPrice: 1050, stopLoss: 940, alertActive: true },
  { symbol: 'SBIN', name: 'State Bank of India', price: 812.30, change: -1.51, targetPrice: 880, stopLoss: 790, alertActive: false },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1654.80, change: 1.98, targetPrice: 1750, stopLoss: 1600, alertActive: true },
]

export function WatchlistClient() {
  const [items, setItems] = useState<WatchlistItem[]>(DEFAULT_WATCHLIST)
  const [showModal, setShowModal] = useState(false)
  const [newSymbol, setNewSymbol] = useState('')
  const [newTarget, setNewTarget] = useState('')
  const [newStop, setNewStop] = useState('')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('stocklens_watchlist')
    if (saved) {
      try { setItems(JSON.parse(saved)) } catch {}
    }
  }, [])

  // Save to localStorage on change
  const updateItems = (newItems: WatchlistItem[]) => {
    setItems(newItems)
    localStorage.setItem('stocklens_watchlist', JSON.stringify(newItems))
  }

  const toggleAlert = (symbol: string) => {
    const updated = items.map(item => {
      if (item.symbol === symbol) {
        const next = !item.alertActive
        toast.success(`AI Alerts ${next ? 'enabled' : 'disabled'} for ${symbol}`)
        return { ...item, alertActive: next }
      }
      return item
    })
    updateItems(updated)
  }

  const removeItem = (symbol: string) => {
    const updated = items.filter(item => item.symbol !== symbol)
    updateItems(updated)
    toast.success(`Removed ${symbol} from watchlist`)
  }

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    const sym = newSymbol.trim().toUpperCase()
    if (!sym) return
    if (items.some(i => i.symbol === sym)) {
      toast.error(`${sym} is already in your watchlist`)
      return
    }

    const newItem: WatchlistItem = {
      symbol: sym,
      name: `${sym} Ltd`,
      price: +(800 + Math.random() * 1200).toFixed(2),
      change: +(Math.random() * 4 - 2).toFixed(2),
      targetPrice: newTarget ? +newTarget : 0,
      stopLoss: newStop ? +newStop : 0,
      alertActive: true,
    }

    updateItems([...items, newItem])
    toast.success(`Added ${sym} to watchlist`)
    setNewSymbol('')
    setNewTarget('')
    setNewStop('')
    setShowModal(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight flex items-center gap-2.5">
            <Eye className="w-8 h-8 text-brand-400" /> Watchlist
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Saved stocks ({items.length}) with AI continuous risk tracking &amp; alerts
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary shrink-0 text-sm py-2.5 px-4 rounded-xl"
        >
          <Plus className="w-4 h-4" /> Add Symbol
        </button>
      </div>

      {/* Watchlist Table */}
      <div className="glass-card p-6">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-text-muted mx-auto mb-3 opacity-40" />
            <h3 className="text-lg font-bold text-text-primary mb-1">Your Watchlist is Empty</h3>
            <p className="text-sm text-text-muted mb-4">Add your favorite stocks to track AI signals and price alerts.</p>
            <button onClick={() => setShowModal(true)} className="btn-outline text-sm">
              + Add First Stock
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-white/[0.06]">
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Symbol</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Price</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Today Change</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Target Price</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Stop Loss</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase tracking-wider">AI Alert</th>
                  <th className="pb-3 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {items.map(stock => (
                  <tr key={stock.symbol} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <Link href={`/stock/${stock.symbol}`} className="hover:text-brand-400 transition-colors">
                        <div className="font-bold text-text-primary">{stock.symbol}</div>
                        <div className="text-xs text-text-muted">{stock.name}</div>
                      </Link>
                    </td>
                    <td className="py-4 font-bold tabular-nums text-text-primary">
                      ₹{stock.price.toLocaleString('en-IN')}
                    </td>
                    <td className={`py-4 font-bold tabular-nums ${stock.change >= 0 ? 'text-bull' : 'text-bear'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </td>
                    <td className="py-4 tabular-nums text-text-secondary">
                      {stock.targetPrice ? `₹${stock.targetPrice}` : '-'}
                    </td>
                    <td className="py-4 tabular-nums text-text-secondary">
                      {stock.stopLoss ? `₹${stock.stopLoss}` : '-'}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => toggleAlert(stock.symbol)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                          stock.alertActive
                            ? 'bg-bull/15 text-bull border border-bull/25 hover:bg-bull/25'
                            : 'bg-white/5 text-text-muted border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <Bell className="w-3 h-3" /> {stock.alertActive ? 'Active' : 'Off'}
                      </button>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/stock/${stock.symbol}`} className="btn-ghost text-xs px-3 py-1.5">
                          View AI
                        </Link>
                        <button
                          onClick={() => removeItem(stock.symbol)}
                          className="btn-ghost p-2 text-bear hover:bg-bear/10 rounded-lg transition-colors"
                          title="Remove from Watchlist"
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

      {/* Add Symbol Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 relative border-white/[0.14] animate-slide-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-text-muted hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-text-primary mb-4">Add to Watchlist</h3>
            <form onSubmit={addItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">Stock Symbol</label>
                <input
                  type="text"
                  required
                  value={newSymbol}
                  onChange={e => setNewSymbol(e.target.value)}
                  placeholder="e.g. TATAMOTORS, RELIANCE, SBIN"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-text-primary focus:outline-none focus:border-brand-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">Target Price (Optional)</label>
                  <input
                    type="number"
                    value={newTarget}
                    onChange={e => setNewTarget(e.target.value)}
                    placeholder="₹ Target"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-text-primary focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">Stop Loss (Optional)</label>
                  <input
                    type="number"
                    value={newStop}
                    onChange={e => setNewStop(e.target.value)}
                    placeholder="₹ Stop Loss"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-text-primary focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-ghost flex-1 py-2.5 text-sm">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 py-2.5 text-sm">
                  Add Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
