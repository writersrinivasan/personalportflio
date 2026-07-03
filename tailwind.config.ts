import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: '#CF6A3E',   // Claude primary coral
          purple: '#A84B2A',   // Deep terracotta
          blue: '#E8956A',     // Warm peach
          orange: '#D4795A',   // CTA coral
          dark: '#150B08',     // Very dark warm (hero bg)
          dark2: '#261309',    // Dark warm (stats bg)
          light: '#FDF4EF',    // Warm cream
          light2: '#FAE8DC',   // Light warm
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #CF6A3E 0%, #A84B2A 100%)',
        'hero-gradient': 'linear-gradient(135deg, #150B08 0%, #261309 40%, #3D1C0A 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
