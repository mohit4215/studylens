import type {
  StockQuote, OHLCV, TechnicalIndicators, TechnicalSignal, ChartPattern,
  NewsItem, OptionsData, DeliveryData, FundamentalsData, SectorData,
  PeerComparison, AIAnalysis, FullStockData, MarketOverview,
  SectorHeatmapItem, ScannerResult, AIMarketSummary
} from '../types';

// ─── Helper: Generate mock OHLCV history ──────────────────────────────────
function generateHistory(basePrice: number, days = 90): OHLCV[] {
  const history: OHLCV[] = [];
  let price = basePrice * 0.85;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.45) * price * 0.025;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) * (1 + Math.random() * 0.012);
    const low = Math.min(open, close) * (1 - Math.random() * 0.012);
    const volume = Math.floor(Math.random() * 8000000 + 2000000);
    history.push({
      date: date.toISOString().split('T')[0],
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume,
    });
    price = close;
  }
  return history;
}

// ─── Mock Stocks Database ─────────────────────────────────────────────────
const MOCK_STOCKS: Record<string, Partial<FullStockData>> = {
  RELIANCE: {
    quote: {
      symbol: 'RELIANCE', name: 'Reliance Industries Ltd', exchange: 'NSE',
      price: 2987.45, change: 58.30, changePercent: 1.99,
      open: 2935.00, high: 3001.00, low: 2928.50, previousClose: 2929.15,
      volume: 12450000, avgVolume10d: 8900000, avgVolume30d: 7600000, avgVolume90d: 7100000,
      marketCap: 20280000000000,
      week52High: 3217.90, week52Low: 2180.25,
      sector: 'Energy', industry: 'Oil & Gas Refining',
      pe: 28.4, pb: 2.1, eps: 105.2, dividendYield: 0.33, beta: 1.12,
      timestamp: Date.now(),
    },
  },
  TATAMOTORS: {
    quote: {
      symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', exchange: 'NSE',
      price: 987.65, change: 24.35, changePercent: 2.53,
      open: 965.00, high: 998.00, low: 961.50, previousClose: 963.30,
      volume: 18900000, avgVolume10d: 14200000, avgVolume30d: 12800000, avgVolume90d: 11500000,
      marketCap: 3620000000000,
      week52High: 1063.00, week52Low: 620.05,
      sector: 'Automobile', industry: 'Passenger Vehicles',
      pe: 12.8, pb: 2.9, eps: 77.1, dividendYield: 0.0, beta: 1.45,
      timestamp: Date.now(),
    },
  },
  SBIN: {
    quote: {
      symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE',
      price: 812.30, change: -12.45, changePercent: -1.51,
      open: 828.00, high: 831.50, low: 809.10, previousClose: 824.75,
      volume: 22100000, avgVolume10d: 18700000, avgVolume30d: 16900000, avgVolume90d: 15400000,
      marketCap: 7250000000000,
      week52High: 912.10, week52Low: 600.65,
      sector: 'Banking', industry: 'Public Sector Banks',
      pe: 10.2, pb: 1.6, eps: 79.6, dividendYield: 1.72, beta: 1.28,
      timestamp: Date.now(),
    },
  },
  INFY: {
    quote: {
      symbol: 'INFY', name: 'Infosys Ltd', exchange: 'NSE',
      price: 1654.80, change: 32.10, changePercent: 1.98,
      open: 1625.00, high: 1668.00, low: 1620.30, previousClose: 1622.70,
      volume: 9870000, avgVolume10d: 8200000, avgVolume30d: 7400000, avgVolume90d: 7000000,
      marketCap: 6890000000000,
      week52High: 1987.00, week52Low: 1351.50,
      sector: 'Information Technology', industry: 'IT Services',
      pe: 24.6, pb: 7.1, eps: 67.3, dividendYield: 2.1, beta: 0.89,
      timestamp: Date.now(),
    },
  },
  HDFCBANK: {
    quote: {
      symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', exchange: 'NSE',
      price: 1723.55, change: 18.75, changePercent: 1.10,
      open: 1708.00, high: 1735.00, low: 1702.45, previousClose: 1704.80,
      volume: 14560000, avgVolume10d: 11300000, avgVolume30d: 10200000, avgVolume90d: 9800000,
      marketCap: 13100000000000,
      week52High: 1880.00, week52Low: 1363.45,
      sector: 'Banking', industry: 'Private Sector Banks',
      pe: 18.9, pb: 2.4, eps: 91.2, dividendYield: 1.14, beta: 0.95,
      timestamp: Date.now(),
    },
  },
  WIPRO: {
    quote: {
      symbol: 'WIPRO', name: 'Wipro Ltd', exchange: 'NSE',
      price: 492.30, change: -8.65, changePercent: -1.73,
      open: 502.00, high: 504.50, low: 489.80, previousClose: 500.95,
      volume: 7650000, avgVolume10d: 6200000, avgVolume30d: 5800000, avgVolume90d: 5400000,
      marketCap: 2560000000000,
      week52High: 612.00, week52Low: 379.80,
      sector: 'Information Technology', industry: 'IT Services',
      pe: 22.1, pb: 4.1, eps: 22.3, dividendYield: 0.2, beta: 0.82,
      timestamp: Date.now(),
    },
  },
  MARUTI: {
    quote: {
      symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', exchange: 'NSE',
      price: 12845.00, change: 345.20, changePercent: 2.76,
      open: 12510.00, high: 12910.00, low: 12485.50, previousClose: 12499.80,
      volume: 3120000, avgVolume10d: 2450000, avgVolume30d: 2200000, avgVolume90d: 2000000,
      marketCap: 4010000000000,
      week52High: 13680.00, week52Low: 9315.00,
      sector: 'Automobile', industry: 'Passenger Vehicles',
      pe: 29.8, pb: 5.2, eps: 431.0, dividendYield: 0.78, beta: 1.15,
      timestamp: Date.now(),
    },
  },
  ICICIBANK: {
    quote: {
      symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', exchange: 'NSE',
      price: 1298.70, change: 22.45, changePercent: 1.76,
      open: 1278.00, high: 1312.00, low: 1274.60, previousClose: 1276.25,
      volume: 16780000, avgVolume10d: 13500000, avgVolume30d: 12100000, avgVolume90d: 11200000,
      marketCap: 9130000000000,
      week52High: 1389.00, week52Low: 945.10,
      sector: 'Banking', industry: 'Private Sector Banks',
      pe: 17.4, pb: 2.9, eps: 74.6, dividendYield: 0.77, beta: 1.05,
      timestamp: Date.now(),
    },
  },
};

// ─── Default mock for unknown symbols ─────────────────────────────────────
function createDefaultMock(symbol: string): Partial<FullStockData> {
  const price = 500 + Math.random() * 2000;
  return {
    quote: {
      symbol, name: `${symbol} Ltd`, exchange: 'NSE',
      price: +price.toFixed(2),
      change: +(price * 0.018).toFixed(2),
      changePercent: 1.8,
      open: +(price * 0.991).toFixed(2),
      high: +(price * 1.015).toFixed(2),
      low: +(price * 0.988).toFixed(2),
      previousClose: +(price * 0.982).toFixed(2),
      volume: 5000000,
      avgVolume10d: 4200000, avgVolume30d: 3800000, avgVolume90d: 3500000,
      marketCap: price * 500000000,
      week52High: +(price * 1.35).toFixed(2),
      week52Low: +(price * 0.65).toFixed(2),
      sector: 'Information Technology', industry: 'IT Services',
      pe: 22.5, pb: 3.2, eps: +(price / 22.5).toFixed(2),
      dividendYield: 1.2, beta: 1.05,
      timestamp: Date.now(),
    },
  };
}

function getMockTechnicals(price: number): TechnicalIndicators {
  return {
    ema20: +(price * 0.978).toFixed(2),
    ema50: +(price * 0.952).toFixed(2),
    ema200: +(price * 0.89).toFixed(2),
    rsi14: +(52 + Math.random() * 28).toFixed(1),
    macd: {
      macd: +(Math.random() * 12 - 3).toFixed(2),
      signal: +(Math.random() * 8 - 2).toFixed(2),
      histogram: +(Math.random() * 6 - 1).toFixed(2),
    },
    adx: +(18 + Math.random() * 25).toFixed(1),
    vwap: +(price * 0.995).toFixed(2),
    upperBand: +(price * 1.028).toFixed(2),
    middleBand: +(price * 0.998).toFixed(2),
    lowerBand: +(price * 0.968).toFixed(2),
    supertrend: { value: +(price * 0.962).toFixed(2), trend: 'up' },
    support: [+(price * 0.95).toFixed(2), +(price * 0.90).toFixed(2), +(price * 0.85).toFixed(2)],
    resistance: [+(price * 1.05).toFixed(2), +(price * 1.10).toFixed(2), +(price * 1.15).toFixed(2)],
  };
}

function getMockSignals(price: number, changePercent: number): TechnicalSignal[] {
  const bullish = changePercent > 0;
  return [
    {
      indicator: 'RSI (14)',
      signal: bullish ? 'BUY' : 'NEUTRAL',
      strength: 'MODERATE',
      value: `${(55 + Math.random() * 20).toFixed(1)}`,
      explanation: bullish
        ? 'RSI is in the 55-70 zone indicating bullish momentum without being overbought. Buying pressure is healthy.'
        : 'RSI is in the neutral 40-55 zone. No clear directional bias currently.',
    },
    {
      indicator: 'MACD',
      signal: bullish ? 'BUY' : 'SELL',
      strength: 'STRONG',
      value: bullish ? 'Bullish Crossover' : 'Bearish Crossover',
      explanation: bullish
        ? 'MACD line has crossed above the signal line generating a bullish crossover. Histogram is positive and widening indicating strengthening momentum.'
        : 'MACD line has crossed below the signal line. Negative histogram indicates selling pressure is building.',
    },
    {
      indicator: 'EMA Trend',
      signal: 'BUY',
      strength: 'STRONG',
      value: 'Price > EMA20 > EMA50 > EMA200',
      explanation: 'The stock is trading above all key moving averages in a perfect bullish alignment. This is a strong uptrend signal known as a "Bullish Stack".',
    },
    {
      indicator: 'ADX',
      signal: 'NEUTRAL',
      strength: 'MODERATE',
      value: `${(22 + Math.random() * 18).toFixed(1)}`,
      explanation: 'ADX above 20 confirms a trending market. The current reading suggests the trend has moderate strength. Values above 25 indicate a strong trend.',
    },
    {
      indicator: 'Supertrend',
      signal: bullish ? 'BUY' : 'SELL',
      strength: bullish ? 'STRONG' : 'MODERATE',
      value: bullish ? 'Above Supertrend' : 'Below Supertrend',
      explanation: bullish
        ? 'Price is trading above the Supertrend indicator (green line below price). This is a bullish signal.'
        : 'Price is trading below the Supertrend indicator (red line above price). This is a bearish signal.',
    },
    {
      indicator: 'Bollinger Bands',
      signal: bullish ? 'BUY' : 'NEUTRAL',
      strength: 'MODERATE',
      value: bullish ? 'Near Upper Band' : 'Middle Band',
      explanation: bullish
        ? 'Price is approaching the upper Bollinger Band. This often indicates strong momentum but can also signal overbought conditions.'
        : 'Price is near the middle Bollinger Band suggesting a neutral stance.',
    },
    {
      indicator: 'VWAP',
      signal: bullish ? 'BUY' : 'SELL',
      strength: 'MODERATE',
      value: bullish ? 'Above VWAP' : 'Below VWAP',
      explanation: bullish
        ? 'Price is trading above the Volume Weighted Average Price. Trading above VWAP is considered bullish by institutional traders.'
        : 'Price is below VWAP indicating selling pressure from institutional levels.',
    },
  ];
}

function getMockPatterns(bullish: boolean): ChartPattern[] {
  if (bullish) {
    return [
      {
        name: 'Bullish Flag',
        type: 'bullish',
        confidence: 78,
        description: 'After a strong upward move (flagpole), the stock is consolidating in a tight downward channel (flag). This is a continuation pattern suggesting the uptrend will resume.',
      },
      {
        name: 'Higher Highs & Higher Lows',
        type: 'bullish',
        confidence: 85,
        description: 'The stock is making progressively higher highs and higher lows — the fundamental definition of an uptrend. Each pullback is finding support at higher levels.',
      },
    ];
  } else {
    return [
      {
        name: 'Bearish Engulfing',
        type: 'bearish',
        confidence: 72,
        description: 'A large red candle has engulfed the previous green candle. This reversal pattern at resistance suggests sellers have taken control.',
      },
      {
        name: 'Lower Highs Formation',
        type: 'bearish',
        confidence: 68,
        description: 'The stock is making lower highs suggesting weakening momentum. Each rally is being sold at progressively lower levels.',
      },
    ];
  }
}

function getMockNews(symbol: string, name: string): NewsItem[] {
  return [
    {
      title: `${name} Q1 FY26 Results: Net Profit Beats Estimates by 12%`,
      summary: `${name} reported a net profit of ₹8,420 crore for Q1 FY26, surpassing analyst estimates of ₹7,520 crore. Revenue grew 18% year-over-year driven by strong domestic demand and improved margins.`,
      source: 'Economic Times',
      url: '#',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      sentiment: 'positive',
      relevanceScore: 0.95,
      catalystType: 'earnings',
      impact: 'high',
    },
    {
      title: `FII Buy ${name} Shares Worth ₹1,240 Crore in Bulk Deal`,
      summary: `A leading foreign institutional investor purchased a significant stake in ${name} through a bulk deal on NSE. This is the largest single FII purchase in the stock this quarter.`,
      source: 'Business Standard',
      url: '#',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      sentiment: 'positive',
      relevanceScore: 0.88,
      catalystType: 'company',
      impact: 'high',
    },
    {
      title: `${name} Announces New Expansion Plan with ₹15,000 Crore Capex`,
      summary: `The company's board has approved a capital expenditure plan of ₹15,000 crore over the next 3 years to expand manufacturing capacity and enter new business verticals.`,
      source: 'Mint',
      url: '#',
      publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      sentiment: 'positive',
      relevanceScore: 0.82,
      catalystType: 'company',
      impact: 'medium',
    },
    {
      title: 'RBI Policy: Interest Rates Unchanged at 6.5%, Stance Remains Accommodative',
      summary: 'The Reserve Bank of India kept the repo rate unchanged at 6.5% in its latest monetary policy committee meeting, maintaining an accommodative stance.',
      source: 'NDTV Profit',
      url: '#',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      sentiment: 'neutral',
      relevanceScore: 0.65,
      catalystType: 'macro',
      impact: 'medium',
    },
    {
      title: `Nifty 50 Touches Record High; ${name} Among Top Gainers`,
      summary: 'Indian equity benchmarks reached all-time highs with broad-based buying across sectors. FII inflows of over $800 million this week are supporting the rally.',
      source: 'Moneycontrol',
      url: '#',
      publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
      sentiment: 'positive',
      relevanceScore: 0.72,
      catalystType: 'sector',
      impact: 'medium',
    },
  ];
}

function getMockOptions(price: number): OptionsData {
  const roundedPrice = Math.round(price / 50) * 50;
  const strikes: OptionsData['strikesData'] = [];
  for (let i = -5; i <= 5; i++) {
    const strike = roundedPrice + i * 50;
    strikes.push({
      strike,
      callOI: Math.floor(Math.random() * 800000 + 100000),
      putOI: Math.floor(Math.random() * 900000 + 100000),
      callLTP: Math.max(1, +(price - strike + Math.random() * 20).toFixed(2)),
      putLTP: Math.max(1, +(strike - price + Math.random() * 20).toFixed(2)),
      callIV: +(18 + Math.random() * 15).toFixed(1),
      putIV: +(20 + Math.random() * 15).toFixed(1),
    });
  }
  return {
    pcr: +(0.8 + Math.random() * 0.7).toFixed(2),
    maxPain: roundedPrice - 50,
    impliedVolatility: +(18 + Math.random() * 12).toFixed(1),
    callOI: 4250000,
    putOI: 3890000,
    callOIChange: 285000,
    putOIChange: 142000,
    callWriting: true,
    putWriting: false,
    strikesData: strikes,
  };
}

function getMockDelivery(bullish: boolean): DeliveryData {
  return {
    deliveryPercent: bullish ? 62.4 : 38.2,
    deliveryVolume: 7800000,
    totalVolume: 12500000,
    deliveryVsAvg: bullish ? 1.42 : 0.72,
    institutionalParticipation: bullish ? 'high' : 'low',
    diiActivity: bullish ? 'buying' : 'neutral',
    fiiActivity: bullish ? 'buying' : 'selling',
  };
}

function getMockFundamentals(): FundamentalsData {
  return {
    revenue: 445000,
    revenueGrowthYoY: 18.5,
    netProfit: 78500,
    profitGrowthYoY: 24.2,
    eps: 105.2,
    pe: 28.4,
    pb: 2.1,
    roe: 16.8,
    roce: 14.2,
    debtToEquity: 0.38,
    currentRatio: 1.65,
    cashFlow: 52000,
    promoterHolding: 50.4,
    fiiHolding: 22.8,
    diiHolding: 14.6,
    publicHolding: 12.2,
    fundamentalScore: 78,
    trend: 'improving',
  };
}

function getMockSector(sectorName: string, bullish: boolean): SectorData {
  return {
    sectorName,
    sectorChange: bullish ? 1.85 : -0.92,
    stockRank: bullish ? 3 : 18,
    totalStocks: 25,
    topPerformers: [
      { symbol: 'TATAMOTORS', change: 2.53 },
      { symbol: 'MARUTI',     change: 2.76 },
      { symbol: 'M&M',        change: 1.98 },
    ],
    worstPerformers: [
      { symbol: 'ASHOKLEY', change: -1.12 },
      { symbol: 'EICHER',   change: -0.78 },
    ],
    isSectorDriven: bullish,
    sectorMomentum: bullish ? 'strong' : 'weak',
  };
}

function getMockPeers(symbol: string): PeerComparison[] {
  const peers: Record<string, PeerComparison[]> = {
    RELIANCE: [
      { symbol: 'ONGC',  name: 'Oil & Natural Gas Corp', price: 286.5,  change: 0.82,  marketCap: 3600000000000, pe: 9.2,  pb: 1.1, roe: 12.1, revenue: 612000, profitGrowth: 8.4 },
      { symbol: 'IOC',   name: 'Indian Oil Corp',         price: 178.3,  change: -0.45, marketCap: 2520000000000, pe: 8.6,  pb: 1.2, roe: 14.2, revenue: 890000, profitGrowth: 5.8 },
      { symbol: 'BPCL',  name: 'Bharat Petroleum',        price: 398.7,  change: 1.12,  marketCap: 1730000000000, pe: 11.4, pb: 1.8, roe: 18.6, revenue: 456000, profitGrowth: 12.1 },
    ],
    TATAMOTORS: [
      { symbol: 'MARUTI',    name: 'Maruti Suzuki India', price: 12845, change: 2.76, marketCap: 4010000000000, pe: 29.8, pb: 5.2, roe: 18.4, revenue: 145000, profitGrowth: 22.3 },
      { symbol: 'M&M',       name: 'Mahindra & Mahindra', price: 3124,  change: 1.98, marketCap: 3890000000000, pe: 26.4, pb: 4.8, roe: 19.2, revenue: 138000, profitGrowth: 28.7 },
      { symbol: 'BAJAJ-AUTO',name: 'Bajaj Auto',           price: 9845,  change: 0.56, marketCap: 2850000000000, pe: 32.1, pb: 8.4, roe: 26.8, revenue: 48000,  profitGrowth: 18.9 },
    ],
    SBIN: [
      { symbol: 'HDFCBANK',  name: 'HDFC Bank',  price: 1723.55, change: 1.10,  marketCap: 13100000000000, pe: 18.9, pb: 2.4, roe: 16.8, revenue: 185000, profitGrowth: 33.5 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1298.70, change: 1.76,  marketCap: 9130000000000,  pe: 17.4, pb: 2.9, roe: 18.2, revenue: 168000, profitGrowth: 28.9 },
      { symbol: 'BANKBARODA',name: 'Bank of Baroda', price: 258.4, change: -0.88, marketCap: 1340000000000, pe: 7.8,  pb: 1.1, roe: 14.8, revenue: 112000, profitGrowth: 16.2 },
    ],
  };
  return peers[symbol] || [
    { symbol: 'TCS',  name: 'Tata Consultancy Services', price: 4210,   change: 0.45,  marketCap: 15200000000000, pe: 31.2, pb: 12.1, roe: 48.2, revenue: 241000, profitGrowth: 8.2 },
    { symbol: 'INFY', name: 'Infosys',                   price: 1654.80, change: 1.98, marketCap: 6890000000000,  pe: 24.6, pb: 7.1,  roe: 32.4, revenue: 158000, profitGrowth: 11.4 },
    { symbol: 'WIPRO',name: 'Wipro',                     price: 492.30,  change: -1.73, marketCap: 2560000000000, pe: 22.1, pb: 4.1,  roe: 18.6, revenue: 90000,  profitGrowth: 4.8 },
  ];
}

function getMockAIAnalysis(symbol: string, name: string, bullish: boolean): AIAnalysis {
  return {
    symbol,
    timestamp: Date.now(),
    overallSentiment: bullish ? 'bullish' : 'bearish',
    confidenceScore: bullish ? 78 : 65,
    summary: bullish
      ? `${name} is gaining strongly today driven by a powerful combination of better-than-expected quarterly earnings, heavy institutional accumulation, bullish technical breakout above key resistance levels, and strong positive momentum across the broader sector. The stock is outperforming its peers and shows signs of sustainable upward movement.`
      : `${name} is under selling pressure today as weak quarterly numbers disappointed the street, FII outflows continued for the third consecutive session, and the broader sector is facing headwinds. Technical indicators suggest caution with the stock trading below key support levels.`,
    whyMoving: bullish
      ? 'Strong Q1 FY26 earnings beat + FII bulk buying + Technical breakout above 200 EMA + Sector tailwinds from positive macro data'
      : 'Disappointing Q1 results + FII selling + Technical breakdown below 50 EMA + Sector rotation away from this segment',
    keyDrivers: bullish
      ? ['Earnings beat by 12% vs estimates', 'FII net bought ₹1,240 Cr', 'Breakout above ₹2,950 resistance', 'Auto sector up 1.85% today', 'Strong delivery volume at 62%']
      : ['Revenue miss by 8% vs estimates', 'FII net sold ₹890 Cr', 'Breakdown below ₹830 support', 'Sector underperforming Nifty by -2.4%', 'Low delivery at 38%'],
    riskScore: bullish ? 'medium' : 'high',
    riskFactors: bullish
      ? ['Near 52-week high resistance', 'RSI approaching overbought at 72', 'F&O expiry this week may cause volatility', 'Global crude prices remain elevated']
      : ['High promoter pledge levels', 'Upcoming results could disappoint further', 'Strong resistance at current levels', 'Overall market sentiment turning cautious'],
    conclusion: bullish
      ? `${name} presents a compelling bullish case for swing traders with a 3-5% upside potential in the near term. The convergence of strong fundamentals, institutional buying, and technical breakout creates a high-probability setup. However, manage risk carefully near the 52-week high. Set a stop-loss below the breakout level. This is not a financial recommendation — please do your own research before investing.`
      : `${name} is in a short-term bearish phase with multiple headwinds working against it simultaneously. For existing holders, protecting capital should be the priority. Fresh long positions are inadvisable until the stock stabilises above key support. This is not a financial recommendation.`,
    recommendation: bullish ? 'buy' : 'hold',
    targetPrice: undefined,
    stopLoss: undefined,
    timeHorizon: 'swing',
  };
}

// ─── Main export: getMockStockData ────────────────────────────────────────
export function getMockStockData(symbol: string): FullStockData {
  const upperSymbol = symbol.toUpperCase();
  const base = MOCK_STOCKS[upperSymbol] || createDefaultMock(upperSymbol);
  const quote = base.quote!;
  const bullish = quote.changePercent > 0;

  return {
    quote,
    history: generateHistory(quote.price),
    technicals: getMockTechnicals(quote.price),
    signals: getMockSignals(quote.price, quote.changePercent),
    patterns: getMockPatterns(bullish),
    news: getMockNews(upperSymbol, quote.name),
    options: getMockOptions(quote.price),
    delivery: getMockDelivery(bullish),
    fundamentals: getMockFundamentals(),
    sector: getMockSector(quote.sector, bullish),
    peers: getMockPeers(upperSymbol),
    aiAnalysis: getMockAIAnalysis(upperSymbol, quote.name, bullish),
  };
}

// ─── Market Overview Mock ─────────────────────────────────────────────────
export function getMockMarketOverview(): MarketOverview {
  return {
    nifty:    { name: 'NIFTY 50',         value: 24856.15,  change: 312.45,   changePercent: 1.27,  high: 24912.00, low: 24548.30 },
    sensex:   { name: 'SENSEX',           value: 81432.65,  change: 1024.80,  changePercent: 1.27,  high: 81578.90, low: 80412.00 },
    bankNifty:{ name: 'BANK NIFTY',       value: 52847.30,  change: -245.60,  changePercent: -0.46, high: 53120.00, low: 52650.00 },
    midcap:   { name: 'NIFTY MIDCAP 100', value: 56789.40,  change: 445.20,   changePercent: 0.79,  high: 56924.00, low: 56340.00 },
    indiaVix: 13.45,
    vixChange: -0.82,
    breadth: { advancing: 1478, declining: 892, unchanged: 145, advanceDeclineRatio: 1.66 },
    fiiDii: {
      date: new Date().toISOString().split('T')[0],
      fiiNetBuy: 2840,
      diiNetBuy: -1240,
      fiiGross: 18420,
      diiGross: 12380,
    },
    topGainers: [
      { symbol: 'MARUTI',    name: 'Maruti Suzuki',      price: 12845,   change: 345.20,  changePercent: 2.76,  open:12510, high:12910,  low:12485, previousClose:12499, volume:3120000,  avgVolume10d:2450000,  avgVolume30d:2200000,  avgVolume90d:2000000,  marketCap:4010000000000,  week52High:13680, week52Low:9315,  sector:'Automobile',           industry:'Cars',         pe:29.8, pb:5.2, eps:431,   dividendYield:0.78, beta:1.15, timestamp:Date.now() },
      { symbol: 'TATAMOTORS',name: 'Tata Motors',        price: 987.65,  change: 24.35,   changePercent: 2.53,  open:965,   high:998,    low:961,   previousClose:963,   volume:18900000, avgVolume10d:14200000, avgVolume30d:12800000, avgVolume90d:11500000, marketCap:3620000000000,  week52High:1063,  week52Low:620,  sector:'Automobile',           industry:'Cars',         pe:12.8, pb:2.9, eps:77.1,  dividendYield:0,    beta:1.45, timestamp:Date.now() },
      { symbol: 'RELIANCE',  name: 'Reliance Ind.',      price: 2987.45, change: 58.30,   changePercent: 1.99,  open:2935,  high:3001,   low:2928,  previousClose:2929,  volume:12450000, avgVolume10d:8900000,  avgVolume30d:7600000,  avgVolume90d:7100000,  marketCap:20280000000000, week52High:3217,  week52Low:2180, sector:'Energy',               industry:'Oil Gas',      pe:28.4, pb:2.1, eps:105.2, dividendYield:0.33, beta:1.12, timestamp:Date.now() },
      { symbol: 'INFY',      name: 'Infosys',            price: 1654.80, change: 32.10,   changePercent: 1.98,  open:1625,  high:1668,   low:1620,  previousClose:1622,  volume:9870000,  avgVolume10d:8200000,  avgVolume30d:7400000,  avgVolume90d:7000000,  marketCap:6890000000000,  week52High:1987,  week52Low:1351, sector:'Information Technology',industry:'IT Services',  pe:24.6, pb:7.1, eps:67.3,  dividendYield:2.1,  beta:0.89, timestamp:Date.now() },
      { symbol: 'ICICIBANK', name: 'ICICI Bank',         price: 1298.70, change: 22.45,   changePercent: 1.76,  open:1278,  high:1312,   low:1274,  previousClose:1276,  volume:16780000, avgVolume10d:13500000, avgVolume30d:12100000, avgVolume90d:11200000, marketCap:9130000000000,  week52High:1389,  week52Low:945,  sector:'Banking',              industry:'Banks',        pe:17.4, pb:2.9, eps:74.6,  dividendYield:0.77, beta:1.05, timestamp:Date.now() },
    ],
    topLosers: [
      { symbol: 'SBIN',    name: 'State Bank of India', price: 812.30,  change: -12.45, changePercent: -1.51, open:828, high:831, low:809, previousClose:824, volume:22100000, avgVolume10d:18700000, avgVolume30d:16900000, avgVolume90d:15400000, marketCap:7250000000000,  week52High:912, week52Low:600, sector:'Banking',              industry:'Banks',       pe:10.2, pb:1.6, eps:79.6, dividendYield:1.72, beta:1.28, timestamp:Date.now() },
      { symbol: 'WIPRO',   name: 'Wipro Ltd',           price: 492.30,  change: -8.65,  changePercent: -1.73, open:502, high:504, low:489, previousClose:500, volume:7650000,  avgVolume10d:6200000,  avgVolume30d:5800000,  avgVolume90d:5400000,  marketCap:2560000000000,  week52High:612, week52Low:379, sector:'Information Technology',industry:'IT Services', pe:22.1, pb:4.1, eps:22.3, dividendYield:0.2,  beta:0.82, timestamp:Date.now() },
      { symbol: 'HCLTECH', name: 'HCL Technologies',   price: 1589.45, change: -22.30, changePercent: -1.38, open:1612,high:1618,low:1582,previousClose:1611, volume:6240000,  avgVolume10d:5100000,  avgVolume30d:4800000,  avgVolume90d:4500000,  marketCap:4310000000000,  week52High:1960,week52Low:1235,sector:'Information Technology',industry:'IT Services', pe:26.8, pb:6.2, eps:59.3, dividendYield:3.2,  beta:0.76, timestamp:Date.now() },
    ],
    mostActive: [
      { symbol: 'SBIN',      name: 'SBI',         price: 812.30,  change: -12.45, changePercent: -1.51, open:828, high:831,  low:809,  previousClose:824,  volume:22100000, avgVolume10d:18700000, avgVolume30d:16900000, avgVolume90d:15400000, marketCap:7250000000000, week52High:912, week52Low:600, sector:'Banking',     industry:'Banks', pe:10.2, pb:1.6, eps:79.6, dividendYield:1.72, beta:1.28, timestamp:Date.now() },
      { symbol: 'TATAMOTORS',name: 'Tata Motors', price: 987.65,  change: 24.35,  changePercent: 2.53,  open:965, high:998,  low:961,  previousClose:963,  volume:18900000, avgVolume10d:14200000, avgVolume30d:12800000, avgVolume90d:11500000, marketCap:3620000000000, week52High:1063,week52Low:620, sector:'Automobile',  industry:'Cars',  pe:12.8, pb:2.9, eps:77.1, dividendYield:0,    beta:1.45, timestamp:Date.now() },
    ],
    week52Highs: [
      { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 12845, change: 345.20, changePercent: 2.76, open:12510, high:12910, low:12485, previousClose:12499, volume:3120000, avgVolume10d:2450000, avgVolume30d:2200000, avgVolume90d:2000000, marketCap:4010000000000, week52High:13680, week52Low:9315, sector:'Automobile', industry:'Cars', pe:29.8, pb:5.2, eps:431, dividendYield:0.78, beta:1.15, timestamp:Date.now() },
    ],
    week52Lows: [],
    sentiment: 'greed',
    fearGreedValue: 68,
  };
}

// ─── Sector Heatmap Mock ──────────────────────────────────────────────────
export function getMockSectorHeatmap(): SectorHeatmapItem[] {
  return [
    { sector: 'Automobile',  change: 1.85,  stocks: 14, topStock: 'MARUTI',    topStockChange: 2.76 },
    { sector: 'Banking',     change: 0.42,  stocks: 22, topStock: 'ICICIBANK', topStockChange: 1.76 },
    { sector: 'IT',          change: -0.68, stocks: 18, topStock: 'INFY',      topStockChange: 1.98 },
    { sector: 'Pharma',      change: 1.12,  stocks: 16, topStock: 'SUNPHARMA', topStockChange: 2.10 },
    { sector: 'FMCG',        change: 0.28,  stocks: 12, topStock: 'HINDUNILVR',topStockChange: 0.84 },
    { sector: 'Metals',      change: 2.14,  stocks: 15, topStock: 'TATASTEEL', topStockChange: 3.42 },
    { sector: 'Realty',      change: 1.68,  stocks: 10, topStock: 'DLF',       topStockChange: 2.85 },
    { sector: 'Energy',      change: 0.92,  stocks: 8,  topStock: 'RELIANCE',  topStockChange: 1.99 },
    { sector: 'Infra',       change: 1.34,  stocks: 13, topStock: 'L&T',       topStockChange: 1.76 },
    { sector: 'Telecom',     change: -0.45, stocks: 5,  topStock: 'BHARTIARTL',topStockChange: 0.22 },
    { sector: 'Media',       change: -1.24, stocks: 8,  topStock: 'ZEEL',      topStockChange: -0.85 },
    { sector: 'Aviation',    change: 0.76,  stocks: 4,  topStock: 'INDIGO',    topStockChange: 1.23 },
  ];
}

// ─── Scanner Mock ─────────────────────────────────────────────────────────
export function getMockScannerResults(scannerType: string): ScannerResult[] {
  const allResults: Record<string, ScannerResult[]> = {
    'high-volume-breakout': [
      { symbol: 'TATASTEEL', name: 'Tata Steel',       price: 178.45,  change: 3.42, signal: 'Volume Breakout',   strength: 'strong',   description: 'Volume is 3.2x the 30-day average with price breaking above the 52-week high. Institutional accumulation detected.', indicators: ['Volume 3.2x avg', '52W High Breakout', 'RSI 68'] },
      { symbol: 'MARUTI',    name: 'Maruti Suzuki',    price: 12845,   change: 2.76, signal: 'Breakout + Volume', strength: 'strong',   description: 'Price breakout from consolidation zone with 2.8x average volume. Strong delivery at 68%.', indicators: ['Volume 2.8x avg', 'Pattern Breakout', 'EMA Bullish'] },
      { symbol: 'HINDALCO',  name: 'Hindalco',         price: 698.30,  change: 2.15, signal: 'Volume Surge',      strength: 'moderate', description: 'Significant volume spike with 1.9x average. Price retesting breakout level.', indicators: ['Volume 1.9x avg', 'Retest Breakout'] },
    ],
    'ema-crossover': [
      { symbol: 'RELIANCE',  name: 'Reliance Industries', price: 2987.45, change: 1.99, signal: 'EMA 20/50 Crossover', strength: 'strong',   description: 'EMA 20 crossed above EMA 50 today — a bullish momentum signal. Price also above EMA 200.', indicators: ['EMA 20 > EMA 50', 'Price > EMA 200', 'ADX 28'] },
      { symbol: 'ICICIBANK', name: 'ICICI Bank',           price: 1298.70, change: 1.76, signal: 'Golden Cross Setup',  strength: 'moderate', description: 'EMA 50 approaching EMA 200 from below — potential golden cross in 2-3 sessions.', indicators: ['EMA 50/200 Near', 'RSI 62', 'MACD Positive'] },
    ],
    'rsi-oversold': [
      { symbol: 'WIPRO',   name: 'Wipro Ltd',     price: 492.30,  change: -1.73, signal: 'RSI Oversold Bounce', strength: 'moderate', description: 'RSI touched 28 yesterday and is now recovering to 32. Potential bounce candidate from oversold levels.', indicators: ['RSI 32 (was 28)', 'Near Support', 'Bullish Divergence'] },
      { symbol: 'HCLTECH', name: 'HCL Tech',      price: 1589.45, change: -1.38, signal: 'RSI Oversold',        strength: 'weak',     description: 'RSI at 31 indicating oversold conditions. Watch for reversal signal before entering.', indicators: ['RSI 31', 'Near 200 EMA', 'Put Writing Detected'] },
    ],
    'golden-cross': [
      { symbol: 'INFY', name: 'Infosys', price: 1654.80, change: 1.98, signal: 'Golden Cross Confirmed', strength: 'strong', description: 'EMA 50 crossed above EMA 200 yesterday. Price confirmed the signal with strong volume today.', indicators: ['EMA 50 > EMA 200', 'Volume Confirmation', 'RSI 65'] },
    ],
    'macd-bullish': [
      { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2987.45, change: 1.99, signal: 'MACD Bullish Crossover',  strength: 'strong', description: 'MACD line crossed signal line with expanding positive histogram. Strong buy signal.', indicators: ['MACD Crossover', 'Positive Histogram', 'Above EMA 20'] },
      { symbol: 'MARUTI',   name: 'Maruti Suzuki',       price: 12845,   change: 2.76, signal: 'MACD Bullish + Volume', strength: 'strong', description: 'Bullish MACD crossover supported by 2.5x volume. Conviction move.', indicators: ['MACD Crossover', 'Volume 2.5x', 'RSI 67'] },
    ],
    'supertrend-buy': [
      { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 987.65,  change: 2.53, signal: 'Supertrend Buy',           strength: 'strong',   description: 'Supertrend indicator flipped to BUY signal today. Price trading well above the Supertrend line.', indicators: ['Supertrend BUY', 'EMA Bullish Stack', 'ADX 32'] },
      { symbol: 'INFY',       name: 'Infosys',     price: 1654.80, change: 1.98, signal: 'Supertrend Continuation', strength: 'moderate', description: 'Supertrend has been in BUY mode for 12 sessions. Price pulling back to Supertrend support.', indicators: ['Supertrend BUY 12d', 'EMA 20 Support', 'RSI 58'] },
    ],
    'gap-up': [
      { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 12845, change: 2.76, signal: 'Gap Up Breakout', strength: 'strong', description: 'Opened 2.2% above previous close and sustained the gap throughout the session.', indicators: ['Gap 2.2%', 'Gap Held', 'Volume 3x'] },
    ],
    'rsi-overbought': [
      { symbol: 'HINDALCO', name: 'Hindalco Industries', price: 698.30, change: 2.15, signal: 'RSI Overbought', strength: 'moderate', description: 'RSI at 78 indicating overbought conditions. Strong momentum but watch for pullback.', indicators: ['RSI 78', 'Near Resistance', 'BB Upper Band'] },
    ],
    'macd-bearish': [
      { symbol: 'WIPRO',   name: 'Wipro Ltd',     price: 492.30,  change: -1.73, signal: 'MACD Bearish Crossover', strength: 'strong', description: 'MACD line crossed below signal line. Expanding negative histogram signals increasing selling pressure.', indicators: ['MACD Crossover', 'Negative Histogram', 'Below EMA 20'] },
      { symbol: 'HCLTECH', name: 'HCL Tech',      price: 1589.45, change: -1.38, signal: 'MACD Bearish',           strength: 'moderate', description: 'MACD in negative territory. Signal line confirmation expected soon.', indicators: ['MACD Negative', 'Below VWAP'] },
    ],
    'gap-down': [
      { symbol: 'SBIN',  name: 'State Bank of India', price: 812.30, change: -1.51, signal: 'Gap Down', strength: 'moderate', description: 'Opened 1.8% below previous close. Gap not yet filled — potential continuation downward.', indicators: ['Gap Down 1.8%', 'Below VWAP', 'High Volume'] },
    ],
  };
  return allResults[scannerType] || allResults['high-volume-breakout'];
}

// ─── AI Market Summary Mock ───────────────────────────────────────────────
export function getMockAIMarketSummary(): AIMarketSummary {
  return {
    date: new Date().toISOString().split('T')[0],
    summary: 'Indian markets closed on a strong positive note with Nifty 50 gaining 1.27% driven by broad-based buying. FII inflows of ₹2,840 crore provided strong tailwind while metals and auto sectors led the charge. India VIX cooled off to 13.45, signaling reduced market anxiety.',
    bullets: [
      'Nifty 50 gained 312 points (+1.27%) to close at 24,856 — approaching all-time high territory',
      'FII bought ₹2,840 Cr net; DII sold ₹1,240 Cr — foreign flows dominated',
      'Metals sector surged 2.14% on strong global commodity prices',
      'India VIX fell 5.75% to 13.45 — market confidence is rising',
      'Market breadth: 1,478 advances vs 892 declines — broad-based participation',
    ],
    biggestEvents: [
      'Tata Motors Q1 FY26 earnings beat estimates by 15% — shares hit 52-week high',
      'RBI Deputy Governor hints at potential rate cut in next MPC meeting',
      'Global markets rallied after US Fed minutes showed dovish tilt',
      'Crude oil dipped below $75/barrel — positive for Indian economy',
    ],
    strongSectors: ['Metals (+2.14%)', 'Automobile (+1.85%)', 'Realty (+1.68%)', 'Pharma (+1.12%)'],
    weakSectors: ['Media (-1.24%)', 'IT (-0.68%)', 'Telecom (-0.45%)'],
    bestBreakouts: ['TATASTEEL: 52-week high breakout with 3x volume', 'MARUTI: Consolidation breakout post earnings', 'DLF: Realty sector leader breaking out'],
    worstBreakdowns: ['WIPRO: Breakdown below ₹500 support on weak results', 'HCLTECH: Below 200-day EMA on heavy selling'],
    marketMood: 'Bullish with greed sentiment. Fear & Greed index at 68 (Greed zone). Participate with disciplined risk management.',
    generatedAt: new Date().toISOString(),
  };
}

// ─── Trending Stocks Mock ─────────────────────────────────────────────────
export const TRENDING_STOCKS = [
  { symbol: 'RELIANCE',   name: 'Reliance Industries', change: 1.99 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors',          change: 2.53 },
  { symbol: 'HDFCBANK',   name: 'HDFC Bank',            change: 1.10 },
  { symbol: 'INFY',       name: 'Infosys',              change: 1.98 },
  { symbol: 'ICICIBANK',  name: 'ICICI Bank',           change: 1.76 },
  { symbol: 'SBIN',       name: 'State Bank of India',  change: -1.51 },
  { symbol: 'MARUTI',     name: 'Maruti Suzuki',        change: 2.76 },
  { symbol: 'WIPRO',      name: 'Wipro',                change: -1.73 },
];
