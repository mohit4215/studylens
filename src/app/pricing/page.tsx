import type { Metadata } from 'next'
import { Check, Sparkles, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing Plans — StockLens AI',
  description: 'Choose a plan to get unlimited AI stock analyses, real-time scanners, and portfolio health monitoring.',
}

const PLANS = [
  {
    name: 'Retail Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for beginner investors exploring market movements.',
    features: [
      '5 AI Stock Analyses per day',
      'Basic Technical Indicators',
      'Daily AI Market Summary',
      'Delayed Market Data (15m)',
      '1 Custom Watchlist',
    ],
    cta: 'Current Plan',
    popular: false,
  },
  {
    name: 'Pro Trader',
    price: '₹999',
    period: 'month',
    description: 'For active intraday and swing traders needing deep real-time AI insights.',
    features: [
      'Unlimited AI Stock Analyses',
      'All 11 Analysis Panels (Options, Delivery, FII)',
      'Real-time Market Data & Scanners',
      'AI Interactive Chat Assistant',
      'Instant WhatsApp & Browser Alerts',
      'Portfolio AI Health & Risk Analyzer',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Institutional / HNI',
    price: '₹2,999',
    period: 'month',
    description: 'Custom setups, API access, and multi-portfolio continuous monitoring.',
    features: [
      'Everything in Pro Trader',
      'REST API Access for Data & AI Analyses',
      'Upload Chart Screenshot AI Analysis',
      'Priority 1-on-1 AI Custom Prompts',
      'Dedicated Account Manager',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Simple &amp; Transparent Pricing
          </div>
          <h1 className="text-4xl font-black text-text-primary tracking-tight">
            Invest with <span className="gradient-text">AI Superpowers</span>
          </h1>
          <p className="text-text-secondary text-base mt-3">
            Understand WHY stocks move before the market catches up. Cancel anytime.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`glass-card p-8 flex flex-col justify-between relative ${
                plan.popular ? 'border-brand-500 shadow-glow-blue bg-white/[0.05]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-bold uppercase tracking-wider shadow-glow-blue">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
                <p className="text-xs text-text-muted mb-6 leading-relaxed">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-text-primary">{plan.price}</span>
                  <span className="text-xs text-text-muted">/ {plan.period}</span>
                </div>
                <div className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <Check className="w-4 h-4 text-bull shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  plan.popular
                    ? 'btn-primary shadow-glow-blue'
                    : 'bg-white/[0.06] hover:bg-white/[0.1] text-text-primary border border-white/[0.1]'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
