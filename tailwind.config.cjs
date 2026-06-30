/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF7F2',
          dark: '#F0EBE3',
        },
        'warm-brown': '#8B6F4E',
        'deep-brown': '#3D2B1F',
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E8D5B0',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
        },
        rose: {
          DEFAULT: '#B76E79',
          light: '#E8B4BC',
        },
        sage: '#7A8B6F',
        ivory: '#FFFFF0',
        muted: '#6B6358',
        overlay: 'rgba(26, 26, 26, 0.7)',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      height: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      width: {
        '4.5': '1.125rem',
      },
    },
  },
  plugins: [],
}
