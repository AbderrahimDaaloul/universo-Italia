/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: '#e2e8f0',
        // Primary = Italian flag GREEN
        primary: {
          50: '#e9f9f0',
          100: '#c7f0d8',
          200: '#8fe0b3',
          300: '#4fce8b',
          400: '#17b56a',
          500: '#009a4e',
          600: '#008C45', // official Italian flag green
          700: '#00713a',
          800: '#00592f',
          900: '#004225',
        },
        // Accent = Italian flag RED
        accent: {
          50: '#fdeaec',
          100: '#fbd0d3',
          200: '#f5a1a7',
          300: '#ec6b74',
          400: '#e03d48',
          500: '#d81f2a',
          600: '#CD212A', // official Italian flag red
          700: '#a71822',
          800: '#82141b',
          900: '#5e0f15',
        },
        // Warm cream used in place of harsh pure white
        cream: {
          50: '#fdfdfb',
          100: '#f9faf6',
          200: '#F4F5F0', // Italian flag white
          300: '#e9ebe1',
        },
        italian: {
          green: '#008C45',
          white: '#F4F5F0',
          red: '#CD212A',
        },
        // ---- Luxury Italian palette (hero + navbar) ----
        tuscan: {
          light: '#B71C1C',
          DEFAULT: '#9C2A2A',
          dark: '#5e1616',
          deep: '#3a0d0d',
          night: '#1a0808',
        },
        gold: {
          light: '#E6C866',
          DEFAULT: '#D4AF37',
          dark: '#A88A2A',
        },
        olive: {
          light: '#6B8E5A',
          DEFAULT: '#4A7043',
          dark: '#31502c',
        },
        terracotta: {
          light: '#D48B7B',
          DEFAULT: '#C26D5B',
        },
        parchment: {
          light: '#FBF8F1',
          DEFAULT: '#F5F0E6',
          dark: '#E8DFC9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        'flag-wave': 'flagWave 8s ease-in-out infinite',
        'tricolore': 'tricolore 4s ease-in-out infinite',
        'drift-slow': 'drift 32s ease-in-out infinite',
        'drift-slower': 'drift 48s ease-in-out infinite reverse',
        'leaf-sway': 'leafSway 9s ease-in-out infinite',
        'gold-pulse': 'goldPulse 4.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        flagWave: {
          '0%, 100%': { transform: 'skewX(0deg) translateX(0)' },
          '50%': { transform: 'skewX(-4deg) translateX(6px)' },
        },
        tricolore: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-3%, -2%, 0) scale(1.06)' },
        },
        leafSway: {
          '0%, 100%': { transform: 'rotate(0deg) translateY(0)' },
          '50%': { transform: 'rotate(4deg) translateY(-8px)' },
        },
        goldPulse: {
          '0%, 100%': { opacity: '0.35', filter: 'blur(40px)' },
          '50%': { opacity: '0.6', filter: 'blur(52px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/hero-bg.jpg')",
        'tricolore': 'linear-gradient(90deg, #008C45 0%, #008C45 33.33%, #F4F5F0 33.33%, #F4F5F0 66.66%, #CD212A 66.66%, #CD212A 100%)',
        'italian-sheen': 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
