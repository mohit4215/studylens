'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const SUGGESTIONS = [
  'RELIANCE', 'TATAMOTORS', 'HDFCBANK', 'INFY', 'SBIN', 'ICICIBANK', 'MARUTI', 'TCS'
]

const STATS = [
  { label: 'Stocks Covered', value: '2,000+' },
  { label: 'AI Analyses', value: '50K+' },
  { label: 'Accuracy Score', value: '94%' },
  { label: 'Active Users', value: '12K+' },
]

export function HeroSection() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const router = useRouter()

  const handleSearch = (q?: string) => {
    const symbol = (q || query).trim().toUpperCase()
    if (symbol) {
      router.push(`/stock/${symbol}`)
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl" />
      
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(42,173,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(42,173,255,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-sm font-medium mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Powered by GPT-4o · NSE & BSE
          <span className="w-1.5 h-1.5 rounded-full bg-bull animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
        >
          Understand{' '}
          <span className="gradient-text">WHY</span>
          <br />
          every stock moves.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Enter any NSE/BSE stock symbol and get an instant AI explanation covering news, technicals, options, FII data, and risk — all in plain English.
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-6"
        >
          <div
            className={`relative flex items-center gap-3 p-2 rounded-2xl border transition-all duration-300 ${
              focused
                ? 'border-brand-500/60 bg-white/[0.06] shadow-glow-blue'
                : 'border-white/[0.12] bg-white/[0.04]'
            }`}
          >
            <div className="flex-1 flex items-center gap-3 pl-4">
              <Search className="w-5 h-5 text-text-muted shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Enter stock symbol… RELIANCE, TATAMOTORS, SBIN"
                className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted text-lg font-medium focus:outline-none py-2"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
            <button
              onClick={() => handleSearch()}
              className="btn-primary px-6 py-3 text-base rounded-xl shrink-0"
            >
              <span>Analyze</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Quick Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          <span className="text-sm text-text-muted">Try:</span>
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => handleSearch(s)}
              className="px-3 py-1 rounded-lg bg-white/[0.05] hover:bg-brand-500/20 text-sm font-medium text-text-secondary hover:text-brand-400 border border-white/[0.06] hover:border-brand-500/30 transition-all duration-200"
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black text-text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-9 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  )
}
