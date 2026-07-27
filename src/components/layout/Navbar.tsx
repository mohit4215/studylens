'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, TrendingUp, Bell, User, Menu, X, Zap, BarChart2, Eye, Camera, Command } from 'lucide-react'
import { clsx } from 'clsx'
import { ScreenshotAnalysisModal } from '@/components/modals/ScreenshotAnalysisModal'
import { KeyboardShortcutsModal } from '@/components/modals/KeyboardShortcutsModal'

const TRENDING = ['RELIANCE', 'TATAMOTORS', 'HDFCBANK', 'INFY', 'SBIN', 'MARUTI']

interface SearchResult {
  symbol: string
  name: string
  exchange: string
}

export function Navbar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScreenshotModal, setShowScreenshotModal] = useState(false)
  const [showShortcutsModal, setShowShortcutsModal] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setShowResults(true)
      }
      if (e.shiftKey && e.key === 'D') router.push('/dashboard')
      if (e.shiftKey && e.key === 'S') router.push('/scanners')
      if (e.shiftKey && e.key === 'W') router.push('/watchlist')
      if (e.shiftKey && e.key === 'P') router.push('/portfolio')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => search(query), 200)
    return () => clearTimeout(timer)
  }, [query, search])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/stock/${query.trim().toUpperCase()}`)
      setShowResults(false)
      setQuery('')
    }
    if (e.key === 'Escape') setShowResults(false)
  }

  const goToStock = (symbol: string) => {
    router.push(`/stock/${symbol}`)
    setShowResults(false)
    setQuery('')
  }

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-surface/80 backdrop-blur-xl border-b border-white/[0.06] shadow-glass'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center shadow-glow-blue group-hover:scale-110 transition-transform duration-200">
                <TrendingUp className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg tracking-tight">
                <span className="gradient-text">StockLens</span>
                <span className="text-text-secondary ml-1 font-normal text-sm">AI</span>
              </span>
            </Link>

            {/* Search Bar — Desktop */}
            <div ref={dropdownRef} className="hidden md:flex flex-1 max-w-lg mx-6 relative">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setShowResults(true) }}
                  onFocus={() => setShowResults(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search stocks… (Ctrl+K)"
                  className={clsx(
                    'w-full pl-10 pr-16 py-2.5 rounded-xl text-sm',
                    'bg-white/[0.05] border border-white/[0.08] text-text-primary placeholder:text-text-muted',
                    'focus:outline-none focus:border-brand-500/50 focus:bg-white/[0.08] focus:shadow-glow-blue',
                    'transition-all duration-200'
                  )}
                />
                <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] bg-white/[0.08] text-text-muted font-mono border border-white/[0.1]">
                  ⌘K
                </kbd>
              </div>

              {/* Search Dropdown */}
              {showResults && (query.trim() || results.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden z-50 animate-slide-up">
                  {results.length > 0 ? (
                    <>
                      <div className="px-3 py-2 border-b border-white/[0.05]">
                        <span className="text-xs text-text-muted uppercase tracking-wider">Search Results</span>
                      </div>
                      {results.map(r => (
                        <button
                          key={r.symbol}
                          onClick={() => goToStock(r.symbol)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.05] transition-colors text-left"
                        >
                          <div>
                            <span className="font-semibold text-text-primary text-sm">{r.symbol}</span>
                            <p className="text-xs text-text-secondary truncate">{r.name}</p>
                          </div>
                          <span className="text-xs text-brand-400 font-medium">{r.exchange}</span>
                        </button>
                      ))}
                    </>
                  ) : query.trim() ? (
                    <div className="px-4 py-3 text-sm text-text-muted">No results for &quot;{query}&quot;</div>
                  ) : null}

                  {/* Trending */}
                  <div className="px-3 py-2 border-t border-white/[0.05]">
                    <span className="text-xs text-text-muted uppercase tracking-wider">Trending</span>
                  </div>
                  <div className="flex flex-wrap gap-2 px-3 py-2">
                    {TRENDING.map(s => (
                      <button
                        key={s}
                        onClick={() => goToStock(s)}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-brand-500/20 text-xs font-medium text-text-secondary hover:text-brand-400 transition-all duration-200"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Nav Links — Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/dashboard" icon={<BarChart2 className="w-4 h-4" />}>Dashboard</NavLink>
              <NavLink href="/scanners" icon={<Zap className="w-4 h-4" />}>Scanners</NavLink>
              <NavLink href="/watchlist" icon={<Eye className="w-4 h-4" />}>Watchlist</NavLink>
              <NavLink href="/portfolio" icon={<BarChart2 className="w-4 h-4" />}>Portfolio</NavLink>

              <div className="ml-2 flex items-center gap-1.5 border-l border-white/[0.08] pl-3">
                <button
                  onClick={() => setShowScreenshotModal(true)}
                  className="btn-ghost p-2 rounded-xl text-brand-400 hover:bg-brand-500/10"
                  title="Upload Chart Screenshot for AI Analysis"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowShortcutsModal(true)}
                  className="btn-ghost p-2 rounded-xl"
                  title="Keyboard Shortcuts"
                >
                  <Command className="w-4 h-4" />
                </button>
                <Link href="/settings" className="btn-ghost p-2 rounded-xl" title="Settings">
                  <User className="w-4 h-4" />
                </Link>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden btn-ghost p-2 rounded-xl"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/[0.07] bg-surface/95 backdrop-blur-xl animate-slide-up">
            <div className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search stocks…"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white/[0.05] border border-white/[0.08] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500/50"
                />
              </div>
            </div>
            <nav className="px-4 py-2 space-y-1 pb-4">
              {[
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/scanners', label: 'Scanners' },
                { href: '/watchlist', label: 'Watchlist' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/pricing', label: 'Pricing Plans' },
                { href: '/settings', label: 'Settings' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/[0.05] font-medium transition-colors"
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={() => { setMobileOpen(false); setShowScreenshotModal(true); }}
                className="w-full text-left px-4 py-3 rounded-xl text-brand-400 bg-brand-500/10 font-semibold flex items-center gap-2"
              >
                <Camera className="w-4 h-4" /> AI Chart Screenshot Analyzer
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Modals */}
      <ScreenshotAnalysisModal isOpen={showScreenshotModal} onClose={() => setShowScreenshotModal(false)} />
      <KeyboardShortcutsModal isOpen={showShortcutsModal} onClose={() => setShowShortcutsModal(false)} />
    </>
  )
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/[0.05] transition-all duration-200"
    >
      {icon}
      {children}
    </Link>
  )
}
