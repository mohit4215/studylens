import { Shield, AlertTriangle, AlertCircle } from 'lucide-react'
import type { AIAnalysis } from '@/lib/types'

interface Props { analysis: AIAnalysis }

const RISK_CONFIG = {
  low:    { label: 'Low Risk',    color: 'text-bull', bg: 'bg-bull/10',  border: 'border-bull/25',  icon: <Shield className="w-5 h-5 text-bull" />,        barWidth: '30%',  barColor: 'bg-bull' },
  medium: { label: 'Medium Risk', color: 'text-warn', bg: 'bg-warn/10',  border: 'border-warn/25',  icon: <AlertTriangle className="w-5 h-5 text-warn" />, barWidth: '60%',  barColor: 'bg-warn' },
  high:   { label: 'High Risk',   color: 'text-bear', bg: 'bg-bear/10',  border: 'border-bear/25',  icon: <AlertCircle className="w-5 h-5 text-bear" />,   barWidth: '90%',  barColor: 'bg-bear' },
}

export function RiskAnalysisPanel({ analysis }: Props) {
  const cfg = RISK_CONFIG[analysis.riskScore]

  return (
    <div className={`glass-card p-6 border ${cfg.border}`}>
      <div className="section-title mb-4">
        {cfg.icon} Risk Analysis
      </div>

      {/* Risk Gauge */}
      <div className={`p-5 rounded-xl ${cfg.bg} border ${cfg.border} mb-5`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text-secondary">Overall Risk Score</span>
          <span className={`font-black text-lg ${cfg.color}`}>{cfg.label}</span>
        </div>
        <div className="h-3 bg-white/[0.1] rounded-full overflow-hidden">
          <div className={`h-full ${cfg.barColor} rounded-full transition-all duration-1000`} style={{ width: cfg.barWidth }} />
        </div>
        <div className="flex justify-between text-xs text-text-muted mt-1.5">
          <span>Low</span><span>Medium</span><span>High</span>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Risk Factors</div>
        {analysis.riskFactors.map((factor, i) => (
          <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className={`shrink-0 w-5 h-5 rounded-full ${cfg.bg} ${cfg.color} flex items-center justify-center text-xs font-bold mt-0.5`}>!</span>
            <span className="text-sm text-text-secondary">{factor}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
