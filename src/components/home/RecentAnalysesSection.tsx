import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'

const RECENT = [
  { symbol: 'RELIANCE',    name: 'Reliance Industries',       sentiment: 'bullish', summary: 'Strong Q1 earnings beat + FII buying + breakout above ₹2,950 resistance', time: '2m ago' },
  { symbol: 'TATAMOTORS',  name: 'Tata Motors',               sentiment: 'bullish', summary: 'JLR sales surge + Auto sector momentum + Technical breakout above EMA 200', time: '8m ago' },
  { symbol: 'SBIN',        name: 'State Bank of India',       sentiment: 'bearish', summary: 'Weak NPA data + FII selling + Breakdown below ₹830 key support level', time: '15m ago' },
  { symbol: 'INFY',        name: 'Infosys',                   sentiment: 'bullish', summary: 'IT sector recovery + Golden Cross formation + Positive guidance for FY26', time: '22m ago' },
  { symbol: 'HDFCBANK',    name: 'HDFC Bank',                 sentiment: 'neutral', summary: 'Consolidating near resistance + Mixed FII flow + Q1 results in line with estimates', time: '31m ago' },
  { symbol: 'MARUTI',      name: 'Maruti Suzuki',             sentiment: 'bullish', summary: 'Record monthly sales data + Sector leadership + Volume breakout at ₹12,500', time: '45m ago' },
]

const SENTIMENT_COLOR = {
  bullish: { bg: 'bg-bull/10', text: 'text-bull', border: 'border-bull/20', dot: 'bg-bull' },
  bearish: { bg: 'bg-bear/10', text: 'text-bear', border: 'border-bear/20', dot: 'bg-bear' },
  neutral: { bg: 'bg-warn/10', text: 'text-warn', border: 'border-warn/20', dot: 'bg-warn' },
}

export function RecentAnalysesSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Clock className="w-5 h-5 text-text-secondary" />
          Recent AI Analyses
        </h2>
        <Link href="/dashboard" className="btn-ghost text-sm">See all →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {RECENT.map(item => {
          const colors = SENTIMENT_COLOR[item.sentiment as keyof typeof SENTIMENT_COLOR]
          return (
            <Link key={item.symbol} href={`/stock/${item.symbol}`}
              className="glass-card-hover p-5 group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="font-bold text-text-primary">{item.symbol}</span>
                  <p className="text-xs text-text-muted mt-0.5">{item.name}</p>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border} shrink-0`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                  {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">{item.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">{item.time}</span>
                <span className="text-xs text-brand-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Analysis <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
