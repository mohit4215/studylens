import type { Metadata } from 'next'
import { Settings, User, Bell, Key, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Settings — StockLens AI',
  description: 'Manage your profile, API keys, notifications, and security preferences.',
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight flex items-center gap-2.5">
            <Settings className="w-8 h-8 text-brand-400" /> Account &amp; Settings
          </h1>
          <p className="text-text-muted text-sm mt-1">Configure your AI preferences, API keys, and notification channels</p>
        </div>

        {/* Profile Card */}
        <div className="glass-card p-6 space-y-4">
          <div className="section-title">
            <User className="w-4 h-4 text-brand-400" /> Profile Information
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Full Name</label>
              <input type="text" defaultValue="Pro Investor" className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-text-primary focus:outline-none focus:border-brand-500/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Email Address</label>
              <input type="email" defaultValue="trader@stocklens.ai" className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-text-primary focus:outline-none focus:border-brand-500/50" />
            </div>
          </div>
        </div>

        {/* API Key Configuration */}
        <div className="glass-card p-6 space-y-4">
          <div className="section-title">
            <Key className="w-4 h-4 text-warn" /> Custom API Credentials
          </div>
          <p className="text-xs text-text-muted">Enter your OpenAI or Upstox API keys to run custom queries directly with your account credentials.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">OpenAI API Key</label>
              <input type="password" placeholder="sk-proj-..." className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-text-primary focus:outline-none focus:border-brand-500/50" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card p-6 space-y-4">
          <div className="section-title">
            <Bell className="w-4 h-4 text-bull" /> Notification Channels
          </div>
          <div className="space-y-3">
            {[
              { title: 'Browser Push Notifications', desc: 'Instant alerts when stock triggers breakout or RSI overbought/oversold' },
              { title: 'AI Daily Summary Email', desc: 'Receive daily market digest every trading day at 4:00 PM IST' },
              { title: 'Portfolio Risk Warning', desc: 'Get alerted if a holding breaks key 200-day EMA support' },
            ].map((n, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div>
                  <div className="text-sm font-semibold text-text-primary">{n.title}</div>
                  <div className="text-xs text-text-muted">{n.desc}</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-500 rounded cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
