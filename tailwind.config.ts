import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        // Brand
        brand: {
          50:  '#eefbff',
          100: '#d8f4ff',
          200: '#baebff',
          300: '#8bdfff',
          400: '#54caff',
          500: '#2aadff',
          600: '#0d8ef5',
          700: '#0a74e1',
          800: '#0f5db6',
          900: '#134f8e',
          950: '#0f3260',
        },
        // Surface system
        surface: {
          DEFAULT: '#0a0d14',
          50:  '#141720',
          100: '#1a1f2e',
          200: '#212638',
          300: '#2a3045',
        },
        // Status
        bull:  '#00d97e',
        bear:  '#ff4d6d',
        warn:  '#ffb038',
        info:  '#2aadff',
        // Text
        text: {
          primary:   '#f0f4ff',
          secondary: '#8b95b0',
          muted:     '#4a5270',
        },
        // Border
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          strong:  'rgba(255,255,255,0.14)',
        },
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass':             'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        'hero-glow':         'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(42,173,255,0.18) 0%, transparent 70%)',
        'card-glow-bull':    'linear-gradient(135deg, rgba(0,217,126,0.06) 0%, transparent 100%)',
        'card-glow-bear':    'linear-gradient(135deg, rgba(255,77,109,0.06) 0%, transparent 100%)',
      },
      boxShadow: {
        'glass':     '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)',
        'glass-lg':  '0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.09)',
        'glow-blue': '0 0 24px rgba(42,173,255,0.25)',
        'glow-bull': '0 0 20px rgba(0,217,126,0.2)',
        'glow-bear': '0 0 20px rgba(255,77,109,0.2)',
      },
      animation: {
        'fade-in':     'fadeIn 0.4s ease-out',
        'slide-up':    'slideUp 0.4s ease-out',
        'slide-in-r':  'slideInRight 0.3s ease-out',
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'shimmer':     'shimmer 1.5s infinite',
        'ticker':      'ticker 40s linear infinite',
        'glow-pulse':  'glowPulse 2s ease-in-out infinite',
        'float':       'float 3s ease-in-out infinite',
        'number-up':   'numberUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(42,173,255,0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(42,173,255,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        numberUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
