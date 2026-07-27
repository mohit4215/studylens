'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, User, Sparkles } from 'lucide-react'
import { clsx } from 'clsx'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Props {
  symbol: string
  stockName: string
}

const QUICK_QUESTIONS = [
  'What is the support level?',
  'Is this a good buy?',
  'What is the stop loss?',
  'What target is possible?',
  'How are the fundamentals?',
  'What does RSI tell us?',
]

const MOCK_RESPONSES: Record<string, string> = {
  'support': 'Based on technical analysis, key support levels for this stock are at the EMA 50 (first support) and EMA 200 (major support). If the price falls below EMA 50, watch for EMA 200 as a bounce zone. Also note horizontal support levels from recent swing lows.\n\n⚠️ Educational analysis only, not financial advice.',
  'buy': 'Whether to buy depends on your risk tolerance and horizon. Current AI signals show a bullish setup: strong EMA alignment, positive MACD crossover, and high delivery volume. For swing traders, a breakout above today\'s high could be a trigger. Set a stop loss below the recent swing low.\n\n⚠️ Always do your own research. Not financial advice.',
  'stop': 'A logical stop loss would be just below the nearest support level — typically 2-3% below entry price. For positional trades, below EMA 50 is common. For intraday, below the day\'s low or VWAP. Never risk more than 1-2% of capital per trade.\n\n⚠️ Not financial advice.',
  'target': 'Using the next resistance level, upside potential is around 5-8% near term. The first target is the recent swing high. If broken with volume, next resistance becomes target. Maintain a 2:1 reward-to-risk ratio minimum.\n\n⚠️ Price targets are estimates, not guarantees.',
  'fundamental': 'The fundamental picture shows improving financials with strong revenue and profit growth. ROE is healthy. PE ratio is in a fair valuation zone. Promoter holding is stable. Overall, fundamentals support a bullish view.\n\n⚠️ Check latest quarterly results.',
  'rsi': 'RSI (Relative Strength Index) measures momentum on a 0-100 scale. Above 70 = overbought, below 30 = oversold. Current RSI is 55-68 indicating healthy bullish momentum without being overbought.\n\n⚠️ Use multiple indicators together.',
}

function getResponse(question: string): string {
  const q = question.toLowerCase()
  if (q.includes('support') || q.includes('level')) return MOCK_RESPONSES['support']
  if (q.includes('buy') || q.includes('purchase') || q.includes('good')) return MOCK_RESPONSES['buy']
  if (q.includes('stop') || q.includes('loss')) return MOCK_RESPONSES['stop']
  if (q.includes('target') || q.includes('upside') || q.includes('price')) return MOCK_RESPONSES['target']
  if (q.includes('fundamental') || q.includes('roe') || q.includes('pe') || q.includes('earning')) return MOCK_RESPONSES['fundamental']
  if (q.includes('rsi') || q.includes('momentum') || q.includes('indicator')) return MOCK_RESPONSES['rsi']
  return `Analyzing ${question}... Based on live technicals & fundamentals, momentum remains favorable. Connect OpenAI API key for full dynamic AI responses!\n\n⚠️ Educational only, not financial advice.`
}

export function AIChat({ symbol, stockName }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm StockLens AI. Ask me anything about **${stockName}** (${symbol}) — support levels, targets, stop loss, fundamentals, or technical signals.`,
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (question?: string) => {
    const q = question || input.trim()
    if (!q) return
    setInput('')
    const userMsg: Message = { role: 'user', content: q, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const response = getResponse(q)
    setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }])
    setLoading(false)
  }

  return (
    <div className="glass-card flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center gap-2.5 p-4 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-xl bg-brand-500/20 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-brand-400" />
        </div>
        <div>
          <div className="font-semibold text-sm text-text-primary">AI Chat Assistant</div>
          <div className="text-xs text-text-muted flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-bull rounded-full animate-pulse" />
            Ask about {symbol}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={clsx('flex gap-2.5', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
            <div className={clsx('w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5', msg.role === 'assistant' ? 'bg-brand-500/20' : 'bg-white/10')}>
              {msg.role === 'assistant'
                ? <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                : <User className="w-3.5 h-3.5 text-text-muted" />}
            </div>
            <div className={clsx('max-w-[85%] p-3 rounded-xl text-sm leading-relaxed', msg.role === 'assistant' ? 'bg-white/[0.05] text-text-secondary' : 'bg-brand-500/20 text-text-primary')}>
              {msg.content.split('\n').map((line, j) => (
                <p key={j} className={j > 0 ? 'mt-2' : ''}>
                  {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                </p>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
            </div>
            <div className="bg-white/[0.05] rounded-xl p-3 flex items-center gap-1">
              {[0, 1, 2].map(i => (
                <span key={i} className="w-1.5 h-1.5 bg-brand-400/60 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-4 pb-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {QUICK_QUESTIONS.map(q => (
            <button key={q} onClick={() => send(q)}
              className="shrink-0 text-xs px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-brand-500/20 text-text-muted hover:text-brand-400 border border-white/[0.06] hover:border-brand-500/30 transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask about support, target, stop loss…"
            className="flex-1 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500/50 transition-all"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-glow-blue"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
