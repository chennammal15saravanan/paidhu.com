/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#ede7d7', // Light Premium Background (Cream)
          card: '#ffffff', // Clean white cards
          border: 'rgba(102, 38, 84, 0.08)' // Subtle plum borders
        },
        primary: {
          50: '#fcfaf6',
          100: '#f9f6ed',
          500: '#662654', // Main brand plum
          600: '#80326b',
          700: '#4d1c3f',
          900: '#33122a',
        },
        accent: {
          cream: '#ede7d7',
          plum: '#662654',
          gold: '#d4af37',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulse-glow 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.02)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(102, 38, 84, 0.2))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(102, 38, 84, 0.4))' },
        }
      }
    },
  },
  plugins: [],
}
