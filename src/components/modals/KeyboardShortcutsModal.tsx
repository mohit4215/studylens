'use client'

import { X, Command } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const SHORTCUTS = [
  { key: 'Ctrl + K', action: 'Open Global Stock Search' },
  { key: 'Shift + D', action: 'Go to Market Dashboard' },
  { key: 'Shift + S', action: 'Go to AI Scanners' },
  { key: 'Shift + W', action: 'Go to Watchlist' },
  { key: 'Shift + P', action: 'Go to Portfolio Health' },
  { key: 'Esc', action: 'Close Modals & Dropdowns' },
]

export function KeyboardShortcutsModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-6 relative border-white/[0.14] animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg text-text-muted hover:text-text-primary">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <Command className="w-5 h-5 text-brand-400" />
          <h3 className="text-xl font-bold text-text-primary">Keyboard Shortcuts</h3>
        </div>

        <div className="space-y-3">
          {SHORTCUTS.map(s => (
            <div key={s.key} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
              <span className="text-xs text-text-secondary">{s.action}</span>
              <kbd className="px-2.5 py-1 rounded bg-white/[0.08] text-xs font-mono font-semibold text-brand-400 border border-white/[0.1]">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
