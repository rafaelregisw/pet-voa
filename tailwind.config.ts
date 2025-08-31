import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'midnight': {
          DEFAULT: '#000814',
          50: '#001D3D',
          100: '#003566',
          200: '#0A1628',
          300: '#000814',
          400: '#000411',
          500: '#000000',
        },
        'ice': {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF',
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
        },
        'electric': {
          DEFAULT: '#00B4D8',
          50: '#CAF0F8',
          100: '#90E0EF',
          200: '#00B4D8',
          300: '#0096C7',
          400: '#0077B6',
          500: '#023E8A',
        },
        'neon': {
          DEFAULT: '#7209B7',
          50: '#F72585',
          100: '#B5179E',
          200: '#7209B7',
          300: '#560BAD',
          400: '#480CA8',
          500: '#3A0CA3',
        },
        'slate': {
          DEFAULT: '#1E293B',
          50: '#64748B',
          100: '#475569',
          200: '#334155',
          300: '#1E293B',
          400: '#0F172A',
          500: '#020617',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Syne', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide': 'slide 1s ease-out',
        'fade': 'fade 0.5s ease-out',
        'scale': 'scale 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        wave: {
          '0%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
          '100%': { transform: 'rotate(-3deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(195, 100%, 50%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(270, 100%, 50%, 0.3) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}
export default config