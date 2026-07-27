import type { FullStockData, MarketOverview, ScannerResult, AIMarketSummary } from '../types';
import { getMockStockData, getMockMarketOverview, getMockScannerResults, getMockAIMarketSummary } from './mock-data';

const PROVIDER = process.env.MARKET_DATA_PROVIDER || 'mock';

export interface MarketDataProvider {
  getStockData(symbol: string): Promise<FullStockData>;
  getMarketOverview(): Promise<MarketOverview>;
  getScannerResults(scannerType: string): Promise<ScannerResult[]>;
  getAIMarketSummary(): Promise<AIMarketSummary>;
  searchSymbols(query: string): Promise<{ symbol: string; name: string; exchange: string }[]>;
}

class MockProvider implements MarketDataProvider {
  async getStockData(symbol: string): Promise<FullStockData> {
    await new Promise(r => setTimeout(r, 600)); // Simulate API delay
    return getMockStockData(symbol);
  }
  async getMarketOverview(): Promise<MarketOverview> {
    await new Promise(r => setTimeout(r, 400));
    return getMockMarketOverview();
  }
  async getScannerResults(scannerType: string): Promise<ScannerResult[]> {
    await new Promise(r => setTimeout(r, 500));
    return getMockScannerResults(scannerType);
  }
  async getAIMarketSummary(): Promise<AIMarketSummary> {
    await new Promise(r => setTimeout(r, 300));
    return getMockAIMarketSummary();
  }
  async searchSymbols(query: string): Promise<{ symbol: string; name: string; exchange: string }[]> {
    const allSymbols = [
      { symbol: 'RELIANCE',    name: 'Reliance Industries Ltd',       exchange: 'NSE' },
      { symbol: 'TATAMOTORS',  name: 'Tata Motors Ltd',               exchange: 'NSE' },
      { symbol: 'SBIN',        name: 'State Bank of India',           exchange: 'NSE' },
      { symbol: 'INFY',        name: 'Infosys Ltd',                   exchange: 'NSE' },
      { symbol: 'HDFCBANK',    name: 'HDFC Bank Ltd',                 exchange: 'NSE' },
      { symbol: 'ICICIBANK',   name: 'ICICI Bank Ltd',                exchange: 'NSE' },
      { symbol: 'WIPRO',       name: 'Wipro Ltd',                     exchange: 'NSE' },
      { symbol: 'MARUTI',      name: 'Maruti Suzuki India Ltd',       exchange: 'NSE' },
      { symbol: 'TCS',         name: 'Tata Consultancy Services',     exchange: 'NSE' },
      { symbol: 'BAJFINANCE',  name: 'Bajaj Finance Ltd',             exchange: 'NSE' },
      { symbol: 'HINDALCO',    name: 'Hindalco Industries Ltd',       exchange: 'NSE' },
      { symbol: 'TATASTEEL',   name: 'Tata Steel Ltd',                exchange: 'NSE' },
      { symbol: 'SUNPHARMA',   name: 'Sun Pharmaceutical Industries', exchange: 'NSE' },
      { symbol: 'BHARTIARTL',  name: 'Bharti Airtel Ltd',             exchange: 'NSE' },
      { symbol: 'HCLTECH',     name: 'HCL Technologies Ltd',          exchange: 'NSE' },
      { symbol: 'AXISBANK',    name: 'Axis Bank Ltd',                 exchange: 'NSE' },
      { symbol: 'KOTAKBANK',   name: 'Kotak Mahindra Bank Ltd',       exchange: 'NSE' },
      { symbol: 'LT',          name: 'Larsen & Toubro Ltd',           exchange: 'NSE' },
      { symbol: 'NTPC',        name: 'NTPC Ltd',                      exchange: 'NSE' },
      { symbol: 'POWERGRID',   name: 'Power Grid Corporation',        exchange: 'NSE' },
      { symbol: 'DLF',         name: 'DLF Ltd',                       exchange: 'NSE' },
      { symbol: 'INDIGO',      name: 'InterGlobe Aviation Ltd',       exchange: 'NSE' },
      { symbol: 'M&M',         name: 'Mahindra & Mahindra Ltd',       exchange: 'NSE' },
      { symbol: 'BAJAJ-AUTO',  name: 'Bajaj Auto Ltd',                exchange: 'NSE' },
      { symbol: 'HINDUNILVR',  name: 'Hindustan Unilever Ltd',        exchange: 'NSE' },
      { symbol: 'ITC',         name: 'ITC Ltd',                       exchange: 'NSE' },
      { symbol: 'ASIANPAINT',  name: 'Asian Paints Ltd',              exchange: 'NSE' },
      { symbol: 'ULTRACEMCO',  name: 'UltraTech Cement Ltd',          exchange: 'NSE' },
      { symbol: 'NESTLEIND',   name: 'Nestle India Ltd',              exchange: 'NSE' },
      { symbol: 'ZEEL',        name: 'Zee Entertainment Enterprises', exchange: 'NSE' },
    ];
    const q = query.toLowerCase();
    return allSymbols.filter(s =>
      s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    ).slice(0, 8);
  }
}

// TODO: class YahooProvider implements MarketDataProvider { ... }
// TODO: class UpstoxProvider implements MarketDataProvider { ... }

function createProvider(): MarketDataProvider {
  switch (PROVIDER) {
    // case 'yahoo': return new YahooProvider();
    // case 'upstox': return new UpstoxProvider();
    default: return new MockProvider();
  }
}

export const marketData = createProvider();
