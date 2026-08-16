/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F7F3EA',
          dark: '#1E1815',
        },
        burgundy: {
          DEFAULT: '#700D32',
          dark: '#4B0921',
        },
        gold: {
          DEFAULT: '#D6A23C',
          dark: '#C99A3E',
        },
        ink: {
          DEFAULT: '#2B211F',
          dark: '#F0EAE0',
        },
        muted: {
          DEFAULT: '#766D66',
          dark: '#A69C93',
        },
        line: {
          DEFAULT: '#E7DED2',
          dark: '#3A322D',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          dark: '#26201C',
        },
      },
      fontFamily: {
        'ar-heading': ['Alexandria', 'sans-serif'],
        'ar-body': ['IBM Plex Sans Arabic', 'sans-serif'],
        'en-heading': ['Fraunces', 'serif'],
        'en-body': ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}