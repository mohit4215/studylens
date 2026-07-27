import type { Metadata } from 'next'
import { getMockStockData } from '@/lib/market-data/mock-data'
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

// Pre-generate all known stock pages at build time
export async function generateStaticParams() {
  return [
    'RELIANCE', 'TATAMOTORS', 'SBIN', 'INFY', 'HDFCBANK',
    'ICICIBANK', 'WIPRO', 'MARUTI', 'TCS', 'TATASTEEL',
    'HINDALCO', 'SUNPHARMA', 'BHARTIARTL', 'HCLTECH',
    'AXISBANK', 'KOTAKBANK', 'LT', 'BAJFINANCE', 'ITC', 'DLF',
  ].map(symbol => ({ symbol }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const symbol = params.symbol.toUpperCase()
  return {
    title: `${symbol} — Why Is It Moving Today? | StockLens AI`,
    description: `AI-powered analysis of ${symbol}. News, technicals, options, FII data explained in plain English.`,
  }
}

export default function StockPage({ params }: PageProps) {
  const symbol = params.symbol.toUpperCase()
  const data = getMockStockData(symbol)
  const { quote, technicals, signals, patterns, news, options, delivery, fundamentals, sector, peers, aiAnalysis, history } = data

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StockHeader quote={quote} />

        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="xl:col-span-2 space-y-6">
            <AISummaryCard analysis={aiAnalysis} />
            <StockChart history={history} symbol={symbol} technicals={technicals} />
            <NewsPanel news={news} />
            <TechnicalPanel technicals={technicals} signals={signals} price={quote.price} />
            <VolumePanel quote={quote} />
            <PriceActionPanel patterns={patterns} history={history} />
            <OptionsPanel options={options} price={quote.price} />
            <DeliveryPanel delivery={delivery} />
            <SectorPanel sector={sector} />
            <PeerComparisonPanel peers={peers} currentSymbol={symbol} quote={quote} />
            <FundamentalsPanel fundamentals={fundamentals} />
            <RiskAnalysisPanel analysis={aiAnalysis} />
            <AIConclusionPanel analysis={aiAnalysis} quote={quote} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AIChat symbol={symbol} stockName={quote.name} />

            {/* Quick Stats */}
            <div className="glass-card p-5 space-y-3">
              <div className="section-title mb-2">Quick Stats</div>
              {[
                { label: '52W High',       value: `₹${quote.week52High.toLocaleString('en-IN')}` },
                { label: '52W Low',        value: `₹${quote.week52Low.toLocaleString('en-IN')}` },
                { label: 'Market Cap',     value: `₹${(quote.marketCap / 10000000).toFixed(0)} Cr` },
                { label: 'P/E Ratio',      value: quote.pe.toFixed(1) },
                { label: 'P/B Ratio',      value: quote.pb.toFixed(2) },
                { label: 'EPS (TTM)',      value: `₹${quote.eps.toFixed(2)}` },
                { label: 'Dividend Yield', value: `${quote.dividendYield.toFixed(2)}%` },
                { label: 'Beta',           value: quote.beta.toFixed(2) },
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
