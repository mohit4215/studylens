import { NextResponse } from 'next'
import { marketData } from '@/lib/market-data'
import { buildStockAnalysisPrompt } from '@/lib/ai/prompts'

export async function POST(request: Request) {
  try {
    const { symbol } = await request.json()
    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 })
    }

    const data = await marketData.getStockData(symbol)
    const prompt = buildStockAnalysisPrompt(data)

    // If OpenAI key is available, call OpenAI API
    if (process.env.OPENAI_API_KEY) {
      const { OpenAI } = await import('openai')
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      })
      const aiResponse = completion.choices[0]?.message?.content || data.aiAnalysis.summary
      return NextResponse.json({
        analysis: {
          ...data.aiAnalysis,
          summary: aiResponse,
        },
      })
    }

    // Fallback to provider AI analysis if key is not configured
    return NextResponse.json({ analysis: data.aiAnalysis })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to analyze stock' }, { status: 500 })
  }
}
