import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'StockLens AI — Understand WHY Every Stock Moves',
    template: '%s | StockLens AI',
  },
  description:
    'StockLens AI explains why any NSE/BSE stock is moving using artificial intelligence. Get instant AI-powered analysis covering news, technicals, options, and fundamentals.',
  keywords: [
    'stock analysis', 'NSE', 'BSE', 'Indian stocks', 'AI stock analysis',
    'technical analysis', 'stock market', 'Nifty', 'Sensex', 'options analysis',
  ],
  authors: [{ name: 'StockLens AI' }],
  openGraph: {
    title: 'StockLens AI — Understand WHY Every Stock Moves',
    description: 'AI-powered stock analysis for Indian markets. Explains why stocks move in plain English.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'StockLens AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StockLens AI',
    description: 'AI explains why any stock moves. NSE/BSE analysis in plain English.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-surface text-text-primary antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a1f2e',
                color: '#f0f4ff',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
