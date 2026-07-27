'use client'

import { Sparkles, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from 'lucide-react'
import type { AIAnalysis } from '@/lib/types'
import { useState } from 'react'

interface Props { analysis: AIAnalysis }

const SENTIMENT_CONFIG = {
  bullish: {
    icon: <TrendingUp className="w-4 h-4" />,
    label: 'Bullish',
    color: 'text-bull',
    bg: 'bg-bull/10',
    border: 'border-bull/25',
    glow: 'shadow-glow-bull',
  },
  bearish: {
    icon: <TrendingDown className="w-4 h-4" />,
    label: 'Bearish',
    color: 'text-bear',
    bg: 'bg-bear/10',
    border: 'border-bear/25',
    glow: 'shadow-glow-bear',
  },
  neutral: {
    icon: <Minus className="w-4 h-4" />,
    label: 'Neutral',
    color: 'text-warn',
    bg: 'bg-warn/10',
    border: 'border-warn/25',
    glow: '',
  },
}

export function AISummaryCard({ analysis }: Props) {
  const [showDrivers, setShowDrivers] = useState(false)
  const cfg = SENTIMENT_CONFIG[analysis.overallSentiment]

  return (
    <div className={`glass-card p-6 border ${cfg.border} relative overflow-hidden`}>
      {/* Background glow */}
      <div className={`absolute inset-0 opacity-[0.03] ${
        analysis.overallSentiment === 'bullish' ? 'bg-bull' :
        analysis.overallSentiment === 'bearish' ? 'bg-bear' : 'bg-warn'
      }`} />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center ${cfg.color}`}>
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="font-bold text-text-primary text-sm">AI Summary</div>
            <div className="text-xs text-text-muted">Powered by StockLens AI</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Confidence */}
          <div className="text-right">
            <div className="text-xs text-text-muted mb-1">Confidence</div>
            <div className="font-bold text-text-primary">{analysis.confidenceScore}%</div>
          </div>
          {/* Sentiment badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
            {cfg.icon} {cfg.label}
          </div>
        </div>
      </div>

      {/* Main Summary */}
      <div className="relative">
        <p className="text-text-primary leading-relaxed text-base font-medium mb-4">
          {analysis.summary}
        </p>

        {/* Why Moving */}
        <div className={`px-4 py-3 rounded-xl ${cfg.bg} border ${cfg.border} mb-4`}>
          <div className={`text-xs font-semibold uppercase tracking-wider ${cfg.color} mb-1.5`}>Why Is It Moving?</div>
          <p className="text-sm text-text-secondary">{analysis.whyMoving}</p>
        </div>

        {/* Key Drivers (Expandable) */}
        <button
          onClick={() => setShowDrivers(!showDrivers)}
          className="flex items-center gap-2 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
        >
          {showDrivers ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showDrivers ? 'Hide' : 'Show'} Key Drivers ({analysis.keyDrivers.length})
        </button>

        {showDrivers && (
          <div className="mt-3 space-y-2 animate-slide-up">
            {analysis.keyDrivers.map((driver, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm">
                <span className={`shrink-0 w-5 h-5 rounded-full ${cfg.bg} ${cfg.color} flex items-center justify-center text-xs font-bold mt-0.5`}>
                  {i + 1}
                </span>
                <span className="text-text-secondary">{driver}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
