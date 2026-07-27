import { Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { AIAnalysis, StockQuote } from '@/lib/types'

interface Props { analysis: AIAnalysis; quote: StockQuote }

const SENTIMENT_CFG = {
  bullish: { label: '🐂 Bullish', color: 'text-bull', bg: 'bg-bull/10', border: 'border-bull/25' },
  bearish: { label: '🐻 Bearish', color: 'text-bear', bg: 'bg-bear/10', border: 'border-bear/25' },
  neutral: { label: '⚖️ Neutral', color: 'text-warn', bg: 'bg-warn/10', border: 'border-warn/25' },
}

export function AIConclusionPanel({ analysis, quote }: Props) {
  const cfg = SENTIMENT_CFG[analysis.overallSentiment]

  return (
    <div className={`glass-card p-6 border ${cfg.border} relative overflow-hidden`}>
      <div className={`absolute inset-0 opacity-[0.03] ${
        analysis.overallSentiment === 'bullish' ? 'bg-bull' : analysis.overallSentiment === 'bearish' ? 'bg-bear' : 'bg-warn'
      }`} />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="section-title">
            <Sparkles className="w-4 h-4 text-brand-400" />
            AI Conclusion
          </div>
          <span className={`px-3 py-1.5 rounded-xl text-sm font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
            {cfg.label}
          </span>
        </div>

        <p className="text-text-secondary leading-relaxed mb-5">{analysis.conclusion}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
            <div className="text-xs text-text-muted mb-1">Sentiment</div>
            <div className={`font-bold text-sm capitalize ${cfg.color}`}>{analysis.overallSentiment}</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
            <div className="text-xs text-text-muted mb-1">Confidence</div>
            <div className="font-bold text-sm text-text-primary">{analysis.confidenceScore}%</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
            <div className="text-xs text-text-muted mb-1">Time Horizon</div>
            <div className="font-bold text-sm text-text-primary capitalize">{analysis.timeHorizon}</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-warn/[0.08] border border-warn/20">
          <p className="text-xs text-warn/90 leading-relaxed">
            ⚠️ <strong>Disclaimer:</strong> This AI analysis is for educational purposes only. StockLens AI is not a SEBI-registered investment advisor. Past patterns do not guarantee future returns. Please consult a qualified financial advisor before investing.
          </p>
        </div>
      </div>
    </div>
  )
}
