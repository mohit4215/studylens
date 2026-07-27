import { Package } from 'lucide-react'
import type { DeliveryData } from '@/lib/types'

interface Props { delivery: DeliveryData }

export function DeliveryPanel({ delivery }: Props) {
  const isHighDelivery = delivery.deliveryPercent > 55

  return (
    <div className="glass-card p-6">
      <div className="section-title mb-4">
        <Package className="w-4 h-4 text-brand-400" />
        Delivery Analysis
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-xs text-text-muted mb-2">Delivery Percentage</div>
          <div className={`text-4xl font-black tabular-nums mb-2 ${isHighDelivery ? 'text-bull' : 'text-text-primary'}`}>
            {delivery.deliveryPercent.toFixed(1)}%
          </div>
          <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isHighDelivery ? 'bg-bull' : 'bg-warn'
              }`}
              style={{ width: `${delivery.deliveryPercent}%` }}
            />
          </div>
          <p className="text-sm text-text-secondary">
            {isHighDelivery
              ? '✅ High delivery % indicates genuine buying interest. Investors are taking delivery of shares rather than squaring off intraday positions. This is a quality signal.'
              : '⚠️ Moderate delivery % suggests mixed interest. A significant portion of today\'s volume is intraday. Monitor delivery trends over next few days.'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <div className="text-xs text-text-muted mb-1">vs Average Delivery</div>
            <div className={`font-bold text-lg ${delivery.deliveryVsAvg > 1 ? 'text-bull' : 'text-bear'}`}>
              {delivery.deliveryVsAvg.toFixed(2)}x average
            </div>
            <p className="text-xs text-text-secondary mt-1">
              {delivery.deliveryVsAvg > 1.3
                ? 'Significantly above average — strong accumulation signal'
                : delivery.deliveryVsAvg > 1
                ? 'Slightly above average — mild accumulation'
                : 'Below average — possible distribution'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl border text-center ${
              delivery.fiiActivity === 'buying' ? 'border-bull/20 bg-bull/[0.05]' : delivery.fiiActivity === 'selling' ? 'border-bear/20 bg-bear/[0.05]' : 'border-white/[0.06]'
            }`}>
              <div className="text-xs text-text-muted mb-1">FII Activity</div>
              <div className={`font-bold text-sm capitalize ${
                delivery.fiiActivity === 'buying' ? 'text-bull' : delivery.fiiActivity === 'selling' ? 'text-bear' : 'text-warn'
              }`}>{delivery.fiiActivity}</div>
            </div>
            <div className={`p-3 rounded-xl border text-center ${
              delivery.diiActivity === 'buying' ? 'border-bull/20 bg-bull/[0.05]' : delivery.diiActivity === 'selling' ? 'border-bear/20 bg-bear/[0.05]' : 'border-white/[0.06]'
            }`}>
              <div className="text-xs text-text-muted mb-1">DII Activity</div>
              <div className={`font-bold text-sm capitalize ${
                delivery.diiActivity === 'buying' ? 'text-bull' : delivery.diiActivity === 'selling' ? 'text-bear' : 'text-warn'
              }`}>{delivery.diiActivity}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
