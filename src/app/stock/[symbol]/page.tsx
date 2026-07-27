import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { marketData } from '@/lib/market-data'
import { StockHeader } from '@/components/stock/StockHeader'
import { AISummaryCard } from '@/components/stock/AISummaryCard'
import { NewsPanel } from '@/components/stock/NewsPanel'
import { TechnicalPanel } from '@/components/stock/TechnicalPanel'
import { VolumePanel } from '@/components/stock/VolumePanel'
import { PriceActionPanel } from '@/components/stock/PriceActionPanel'
import { OptionsPanel } from '@/components/stock/OptionsPanel'
import { DeliveryPanel } from '@/components/stock/DeliveryPanel'
import { SectorPanel } from '@/components/stock/SectorPanel'
import { PeerComparisonPanel } from '@/components/stock/PeerComparisonPanel'
import { FundamentalsPanel } from '@/components/stock/FundamentalsPanel'
import { RiskAnalysisPanel } from '@/components/stock/RiskAnalysisPanel'
import { AIConclusionPanel } from '@/components/stock/AIConclusionPanel'
import { AIChat } from '@/components/stock/AIChat'
import { StockChart } from '@/components/stock/StockChart'

interface PageProps {
  params: { symbol: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const symbol = params.symbol.toUpperCase()
  return {
    title: `${symbol} Stock Analysis — Why Is ${symbol} Moving Today?`,
    description: `AI-powered analysis of ${symbol}. Understand why ${symbol} is moving today — news, technicals, options, FII data, and risk analysis in plain English.`,
  }
}

export default async function StockPage({ params }: PageProps) {
  const symbol = params.symbol.toUpperCase()

  let data
  try {
    data = await marketData.getStockData(symbol)
  } catch (err) {
    notFound()
  }

  const { quote, technicals, signals, patterns, news, options, delivery, fundamentals, sector, peers, aiAnalysis, history } = data

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stock Header */}
        <StockHeader quote={quote} />

        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="xl:col-span-2 space-y-6">
            {/* 0. AI Summary — Always First */}
            <AISummaryCard analysis={aiAnalysis} />

            {/* Chart */}
            <StockChart history={history} symbol={symbol} technicals={technicals} />

            {/* 1. News Impact */}
            <NewsPanel news={news} />

            {/* 2. Technical Analysis */}
            <TechnicalPanel technicals={technicals} signals={signals} price={quote.price} />

            {/* 3. Volume Analysis */}
            <VolumePanel quote={quote} />

            {/* 4. Price Action & Patterns */}
            <PriceActionPanel patterns={patterns} history={history} />

            {/* 5. Options Analysis */}
            <OptionsPanel options={options} price={quote.price} />

            {/* 6. Delivery Analysis */}
            <DeliveryPanel delivery={delivery} />

            {/* 7. Sector Analysis */}
            <SectorPanel sector={sector} />

            {/* 8. Peer Comparison */}
            <PeerComparisonPanel peers={peers} currentSymbol={symbol} quote={quote} />

            {/* 9. Fundamentals */}
            <FundamentalsPanel fundamentals={fundamentals} />

            {/* 10. Risk Analysis */}
            <RiskAnalysisPanel analysis={aiAnalysis} />

            {/* 11. AI Conclusion */}
            <AIConclusionPanel analysis={aiAnalysis} quote={quote} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Chat */}
            <AIChat symbol={symbol} stockName={quote.name} />

            {/* Quick Stats */}
            <div className="glass-card p-5 space-y-3">
              <div className="section-title mb-2">Quick Stats</div>
              {[
                { label: '52W High', value: `₹${quote.week52High.toLocaleString('en-IN')}` },
                { label: '52W Low',  value: `₹${quote.week52Low.toLocaleString('en-IN')}` },
                { label: 'Market Cap', value: `₹${(quote.marketCap / 10000000).toFixed(0)} Cr` },
                { label: 'P/E Ratio',  value: quote.pe.toFixed(1) },
                { label: 'P/B Ratio',  value: quote.pb.toFixed(2) },
                { label: 'EPS (TTM)', value: `₹${quote.eps.toFixed(2)}` },
                { label: 'Dividend Yield', value: `${quote.dividendYield.toFixed(2)}%` },
                { label: 'Beta',      value: quote.beta.toFixed(2) },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-text-muted">{item.label}</span>
                  <span className="font-semibold text-text-primary tabular-nums">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Key Levels */}
            <div className="glass-card p-5">
              <div className="section-title mb-3">Key Levels</div>
              <div className="space-y-2">
                <div className="text-xs text-text-muted uppercase tracking-wider mb-2">Resistance</div>
                {technicals.resistance.map((r, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-bear">R{i + 1}</span>
                    <span className="font-semibold tabular-nums text-text-primary">₹{r.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="divider" />
                <div className="text-xs text-text-muted uppercase tracking-wider mb-2">Support</div>
                {technicals.support.map((s, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-bull">S{i + 1}</span>
                    <span className="font-semibold tabular-nums text-text-primary">₹{s.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
