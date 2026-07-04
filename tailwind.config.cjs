/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D0D0D',
          light: '#1A1A1A',
          lighter: '#2A2A2A',
        },
        accent: {
          DEFAULT: '#C8A96B',
          light: '#E2D1A8',
          dark: '#8B7340',
          muted: 'rgba(200, 169, 107, 0.15)',
        },
        surface: {
          DEFAULT: '#111111',
          card: '#161616',
          elevated: '#1E1E1E',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0A0',
          muted: '#666666',
          accent: '#C8A96B',
        },
        border: {
          DEFAULT: 'rgba(200, 169, 107, 0.15)',
          light: 'rgba(255, 255, 255, 0.06)',
          accent: 'rgba(200, 169, 107, 0.3)',
        },
        rose: {
          DEFAULT: '#B76E79',
          light: '#E8B4BC',
        },
        sage: '#7A8B6F',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      height: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at center, rgba(200, 169, 107, 0.08) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(200, 169, 107, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(200, 169, 107, 0.2)' },
        },
      },
    },
  },
  plugins: [],
}
