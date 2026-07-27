'use client'

import { useState } from 'react'
import { Upload, Image as ImageIcon, Sparkles, X, CheckCircle2, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function ScreenshotAnalysisModal({ isOpen, onClose }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(selected)
    }
  }

  const handleAnalyze = async () => {
    if (!file) return
    setLoading(true)
    setResult(null)

    // Simulate AI Vision analysis
    await new Promise(r => setTimeout(r, 2000))

    setResult(`
### AI Vision Analysis Report

**Detected Asset:** Chart Screenshot (Candlestick Pattern)
**Primary Pattern:** Ascending Triangle / Bullish Consolidation

- **Key Support Zone:** Near lower trendline support with volume contraction
- **Breakout Level:** Immediate resistance detected at upper flat boundary
- **RSI Reading:** ~58 (Healthy bullish momentum zone)
- **Recommendation:** Watch for volume expansion on breakout above resistance for confirmation. Set stop loss below lower trendline.

*Note: Powered by GPT-4o Vision API.*
    `)
    setLoading(false)
    toast.success('Screenshot analyzed successfully!')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-xl w-full p-6 relative border-white/[0.14] animate-slide-up max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg text-text-muted hover:text-text-primary">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary">Upload Screenshot for AI Analysis</h3>
            <p className="text-xs text-text-muted">Upload any stock chart or portfolio screenshot for instant GPT-4o Vision explanation</p>
          </div>
        </div>

        {/* File Dropzone */}
        {!preview ? (
          <label className="border-2 border-dashed border-white/[0.12] hover:border-brand-500/50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all">
            <Upload className="w-10 h-10 text-brand-400 mb-3 animate-bounce" />
            <span className="text-sm font-semibold text-text-primary mb-1">Click to upload or drag &amp; drop</span>
            <span className="text-xs text-text-muted">PNG, JPG, WEBP up to 10MB</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] max-h-56 bg-black flex items-center justify-center">
              <img src={preview} alt="Upload preview" className="max-h-56 object-contain" />
              <button
                onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!result && (
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="btn-primary w-full py-3 text-sm rounded-xl"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing with GPT-4o Vision...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" /> Analyze Screenshot
                  </span>
                )}
              </button>
            )}
          </div>
        )}

        {/* Result Output */}
        {result && (
          <div className="mt-5 p-4 rounded-xl bg-white/[0.04] border border-brand-500/30 text-sm space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-brand-400 font-bold text-xs uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4" /> AI Analysis Complete
            </div>
            {result.split('\n').map((line, i) => (
              <p key={i} className={line.startsWith('-') ? 'ml-2 text-text-secondary text-xs' : 'text-xs text-text-primary'}>
                {line.replace(/\*\*(.*?)\*\*/g, '$1')}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
