// ─── Shared TypeScript Types for StockLens AI ─────────────────────────────

export interface StockQuote {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE';
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  volume: number;
  avgVolume10d: number;
  avgVolume30d: number;
  avgVolume90d: number;
  marketCap: number;
  week52High: number;
  week52Low: number;
  sector: string;
  industry: string;
  pe: number;
  pb: number;
  eps: number;
  dividendYield: number;
  beta: number;
  timestamp: number;
}

export interface OHLCV {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TechnicalIndicators {
  ema20: number;
  ema50: number;
  ema200: number;
  rsi14: number;
  macd: {
    macd: number;
    signal: number;
    histogram: number;
  };
  adx: number;
  vwap: number;
  upperBand: number;
  lowerBand: number;
  middleBand: number;
  supertrend: {
    value: number;
    trend: 'up' | 'down';
  };
  support: number[];
  resistance: number[];
}

export interface TechnicalSignal {
  indicator: string;
  signal: 'BUY' | 'SELL' | 'NEUTRAL';
  strength: 'STRONG' | 'MODERATE' | 'WEAK';
  value: string;
  explanation: string;
}

export interface ChartPattern {
  name: string;
  type: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  description: string;
  targetPrice?: number;
  stopLoss?: number;
}

export interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  relevanceScore: number;
  catalystType: 'earnings' | 'macro' | 'sector' | 'company' | 'regulatory' | 'other';
  impact: 'high' | 'medium' | 'low';
}

export interface OptionsData {
  pcr: number;
  maxPain: number;
  impliedVolatility: number;
  callOI: number;
  putOI: number;
  callOIChange: number;
  putOIChange: number;
  callWriting: boolean;
  putWriting: boolean;
  strikesData: OptionsStrike[];
}

export interface OptionsStrike {
  strike: number;
  callOI: number;
  putOI: number;
  callLTP: number;
  putLTP: number;
  callIV: number;
  putIV: number;
}

export interface DeliveryData {
  deliveryPercent: number;
  deliveryVolume: number;
  totalVolume: number;
  deliveryVsAvg: number;
  institutionalParticipation: 'high' | 'medium' | 'low';
  diiActivity: 'buying' | 'selling' | 'neutral';
  fiiActivity: 'buying' | 'selling' | 'neutral';
}

export interface FundamentalsData {
  revenue: number;
  revenueGrowthYoY: number;
  netProfit: number;
  profitGrowthYoY: number;
  eps: number;
  pe: number;
  pb: number;
  roe: number;
  roce: number;
  debtToEquity: number;
  currentRatio: number;
  cashFlow: number;
  promoterHolding: number;
  fiiHolding: number;
  diiHolding: number;
  publicHolding: number;
  fundamentalScore: number;
  trend: 'improving' | 'deteriorating' | 'stable';
}

export interface SectorData {
  sectorName: string;
  sectorChange: number;
  stockRank: number;
  totalStocks: number;
  topPerformers: { symbol: string; change: number }[];
  worstPerformers: { symbol: string; change: number }[];
  isSectorDriven: boolean;
  sectorMomentum: 'strong' | 'moderate' | 'weak';
}

export interface PeerComparison {
  symbol: string;
  name: string;
  price: number;
  change: number;
  marketCap: number;
  pe: number;
  pb: number;
  roe: number;
  revenue: number;
  profitGrowth: number;
}

export interface AIAnalysis {
  symbol: string;
  timestamp: number;
  overallSentiment: 'bullish' | 'bearish' | 'neutral';
  confidenceScore: number;
  summary: string;
  whyMoving: string;
  keyDrivers: string[];
  riskScore: 'low' | 'medium' | 'high';
  riskFactors: string[];
  conclusion: string;
  recommendation: 'buy' | 'hold' | 'sell' | 'watch';
  targetPrice?: number;
  stopLoss?: number;
  timeHorizon: 'intraday' | 'swing' | 'positional' | 'long-term';
}

export interface MarketOverview {
  nifty: IndexData;
  sensex: IndexData;
  bankNifty: IndexData;
  midcap: IndexData;
  indiaVix: number;
  vixChange: number;
  breadth: MarketBreadth;
  fiiDii: FIIDIIData;
  topGainers: StockQuote[];
  topLosers: StockQuote[];
  mostActive: StockQuote[];
  week52Highs: StockQuote[];
  week52Lows: StockQuote[];
  sentiment: 'extreme-greed' | 'greed' | 'neutral' | 'fear' | 'extreme-fear';
  fearGreedValue: number;
}

export interface IndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
}

export interface MarketBreadth {
  advancing: number;
  declining: number;
  unchanged: number;
  advanceDeclineRatio: number;
}

export interface FIIDIIData {
  date: string;
  fiiNetBuy: number;
  diiNetBuy: number;
  fiiGross: number;
  diiGross: number;
}

export interface SectorHeatmapItem {
  sector: string;
  change: number;
  stocks: number;
  topStock: string;
  topStockChange: number;
}

export interface ScannerResult {
  symbol: string;
  name: string;
  price: number;
  change: number;
  signal: string;
  strength: 'strong' | 'moderate' | 'weak';
  description: string;
  indicators: string[];
}

export interface WatchlistItem {
  symbol: string;
  addedAt: string;
  targetPrice?: number;
  stopLoss?: number;
  notes?: string;
  alerts: WatchlistAlert[];
}

export interface WatchlistAlert {
  id: string;
  type: 'price' | 'technical' | 'news' | 'volume';
  condition: string;
  value: number;
  active: boolean;
  triggered: boolean;
}

export interface PortfolioHolding {
  symbol: string;
  name: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
  dayChange: number;
  sector: string;
  weight: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface AIMarketSummary {
  date: string;
  summary: string;
  bullets: string[];
  biggestEvents: string[];
  strongSectors: string[];
  weakSectors: string[];
  bestBreakouts: string[];
  worstBreakdowns: string[];
  marketMood: string;
  generatedAt: string;
}

export interface FullStockData {
  quote: StockQuote;
  history: OHLCV[];
  technicals: TechnicalIndicators;
  signals: TechnicalSignal[];
  patterns: ChartPattern[];
  news: NewsItem[];
  options: OptionsData;
  delivery: DeliveryData;
  fundamentals: FundamentalsData;
  sector: SectorData;
  peers: PeerComparison[];
  aiAnalysis: AIAnalysis;
}
