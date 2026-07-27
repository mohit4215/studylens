import Link from 'next/link'
import { TrendingUp, Twitter, Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center shadow-glow-blue">
                <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg">
                <span className="gradient-text">StockLens</span>
                <span className="text-text-secondary ml-1 font-normal text-sm">AI</span>
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              AI-powered stock analysis that explains WHY any Indian stock is moving — in plain English.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <Twitter className="w-4 h-4" />, href: '#' },
                { icon: <Github className="w-4 h-4" />, href: '#' },
                { icon: <Linkedin className="w-4 h-4" />, href: '#' },
                { icon: <Mail className="w-4 h-4" />, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary text-sm">Product</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Stock Analysis', href: '/stock/RELIANCE' },
                { label: 'Scanners', href: '/scanners' },
                { label: 'Watchlist', href: '/watchlist' },
                { label: 'Portfolio', href: '/portfolio' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary text-sm">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'How It Works', href: '#' },
                { label: 'API Documentation', href: '#' },
                { label: 'Keyboard Shortcuts', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Changelog', href: '#' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary text-sm">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Disclaimer', href: '#' },
                { label: 'Refund Policy', href: '#' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider mt-8 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} StockLens AI. All rights reserved.
          </p>
          <p className="text-xs text-text-muted text-center">
            ⚠️ For educational purposes only. Not SEBI registered. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
