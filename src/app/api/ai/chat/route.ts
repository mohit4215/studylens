import { NextResponse } from 'next'
import { CHAT_SYSTEM_PROMPT } from '@/lib/ai/prompts'

export async function POST(request: Request) {
  try {
    const { messages, symbol } = await request.json()
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array required' }, { status: 400 })
    }

    if (process.env.OPENAI_API_KEY) {
      const { OpenAI } = await import('openai')
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: `${CHAT_SYSTEM_PROMPT}\nCurrently analyzing symbol: ${symbol}` },
          ...messages,
        ],
        temperature: 0.5,
      })
      const reply = completion.choices[0]?.message?.content || 'I could not process that request right now.'
      return NextResponse.json({ reply })
    }

    // Fallback if no API key
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop()?.content || ''
    return NextResponse.json({
      reply: `Regarding "${lastUserMessage}" for ${symbol}: Key technical support is holding firmly and volume metrics remain positive. Connect your OpenAI API key in .env.local to enable full dynamic AI answers!\n\n⚠️ Educational only, not financial advice.`,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Chat failed' }, { status: 500 })
  }
}
