import type { Metadata } from 'next'
import { BarChart3, Users, Zap, Activity, Cpu } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin & Analytics — StockLens AI',
  description: 'System health, AI token usage, active users, and platform analytics.',
}

export default function AdminPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-8 h-8 text-brand-400" /> Admin &amp; Analytics Console
          </h1>
          <p className="text-text-muted text-sm mt-1">Platform health, AI inference telemetry &amp; market data status</p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Users (24h)', value: '3,420', sub: '+12% from yesterday', icon: <Users className="w-4 h-4 text-brand-400" /> },
            { label: 'AI Analyses Generated', value: '18,940', sub: 'Avg 420ms response time', icon: <Cpu className="w-4 h-4 text-bull" /> },
            { label: 'Market API Status', value: 'Healthy (100%)', sub: 'Provider: Mock / Yahoo', icon: <Activity className="w-4 h-4 text-bull" /> },
            { label: 'Alerts Delivered', value: '1,240', sub: 'Push / Browser', icon: <Zap className="w-4 h-4 text-warn" /> },
          ].map(stat => (
            <div key={stat.label} className="glass-card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-muted">{stat.label}</span>
                {stat.icon}
              </div>
              <div className="text-2xl font-black text-text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-text-muted">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Telemetry Logs */}
        <div className="glass-card p-6">
          <div className="section-title mb-4">Live System Logs</div>
          <div className="font-mono text-xs space-y-2 bg-black/40 p-4 rounded-xl border border-white/[0.05] text-text-secondary">
            <div>[2026-07-27 14:15:22] <span className="text-bull">INFO</span> Market data cache refreshed for 30 NSE symbols</div>
            <div>[2026-07-27 14:15:18] <span className="text-brand-400">AI</span> Prompt generated for RELIANCE analysis (842 tokens)</div>
            <div>[2026-07-27 14:15:12] <span className="text-bull">INFO</span> Scanner executed: High Volume Breakout (3 matches)</div>
            <div>[2026-07-27 14:14:55] <span className="text-bull">INFO</span> User session authenticated via Auth Provider</div>
          </div>
        </div>
      </div>
    </div>
  )
}
