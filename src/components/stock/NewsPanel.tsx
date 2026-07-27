import { Newspaper, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { NewsItem } from '@/lib/types'

interface Props { news: NewsItem[] }

const SENTIMENT_CFG = {
  positive: { icon: <TrendingUp className="w-3 h-3" />,   text: 'text-bull', bg: 'bg-bull/10', border: 'border-bull/20', label: 'Positive' },
  negative: { icon: <TrendingDown className="w-3 h-3" />, text: 'text-bear', bg: 'bg-bear/10', border: 'border-bear/20', label: 'Negative' },
  neutral:  { icon: <Minus className="w-3 h-3" />,        text: 'text-warn', bg: 'bg-warn/10', border: 'border-warn/20', label: 'Neutral'  },
}

const IMPACT_CFG = {
  high:   'text-bear font-bold',
  medium: 'text-warn',
  low:    'text-text-muted',
}

const CATALYST_LABELS: Record<string, string> = {
  earnings: '💰 Earnings',
  macro: '🌏 Macro',
  sector: '📊 Sector',
  company: '🏢 Company',
  regulatory: '⚖️ Regulatory',
  other: '📰 News',
}

function NewsCard({ item }: { item: NewsItem }) {
  const sc = SENTIMENT_CFG[item.sentiment]
  return (
    <div className={`p-4 rounded-xl border ${sc.border} bg-white/[0.02] hover:bg-white/[0.04] transition-colors`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold flex items-center gap-1 ${sc.bg} ${sc.text} ${sc.border}`}>
            {sc.icon} {sc.label}
          </span>
          <span className="text-xs text-text-muted bg-white/[0.04] px-2 py-0.5 rounded-full">
            {CATALYST_LABELS[item.catalystType] || item.catalystType}
          </span>
          <span className={`text-xs uppercase tracking-wide ${IMPACT_CFG[item.impact]}`}>
            {item.impact} impact
          </span>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-xs text-text-muted">{new Date(item.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-xs text-brand-400 mt-0.5">Relevance: {Math.round(item.relevanceScore * 100)}%</div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-text-primary leading-snug mb-2">{item.title}</h3>
      <p className="text-xs text-text-secondary leading-relaxed mb-3">{item.summary}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted">{item.source}</span>
        <a
          href={item.url}
          className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

export function NewsPanel({ news }: Props) {
  const highImpact = news.filter(n => n.impact === 'high')
  const other      = news.filter(n => n.impact !== 'high')

  return (
    <div className="glass-card p-6">
      <div className="section-title mb-4">
        <Newspaper className="w-4 h-4 text-brand-400" />
        News Impact
      </div>

      {highImpact.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-bear uppercase tracking-wider mb-2">High Impact Events</div>
          <div className="space-y-3">
            {highImpact.map((item, i) => <NewsCard key={i} item={item} />)}
          </div>
        </div>
      )}

      {other.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Other News</div>
          <div className="space-y-3">
            {other.map((item, i) => <NewsCard key={i} item={item} />)}
          </div>
        </div>
      )}
    </div>
  )
}
