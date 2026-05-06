import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4ff',
          100: '#dbe4ff',
          200: '#bac8ff',
          300: '#91a7ff',
          400: '#748ffc',
          500: '#5c7cfa',
          600: '#4c6ef5',
          700: '#364fc7',
          800: '#1E3A5F',
          900: '#0B1F3A',
          950: '#060f1f',
        },
        brand: {
          green: '#10B981',
          'green-dark': '#059669',
          yellow: '#F59E0B',
          'yellow-dark': '#D97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #060f1f 0%, #0B1F3A 50%, #1E3A5F 100%)',
        'card-gradient': 'linear-gradient(135deg, #0B1F3A 0%, #1E3A5F 100%)',
        'green-gradient': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'yellow-gradient': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'navy-lg': '0 10px 40px rgba(11, 31, 58, 0.4)',
        'green-lg': '0 10px 40px rgba(16, 185, 129, 0.3)',
        'yellow-lg': '0 10px 40px rgba(245, 158, 11, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
