/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#2F6B4F',
          dark: '#23533D',
          light: '#3C8261',
        },
        cream: {
          DEFAULT: '#FAF7F0',
          dark: '#F3EEDB',
        },
        sage: {
          DEFAULT: '#E4EDE6',
          dark: '#D1E0D4',
          light: '#F0F5F1',
        },
        charcoal: {
          DEFAULT: '#1F2A24',
          muted: '#4A5750',
          light: '#728078',
        },
        amber: {
          DEFAULT: '#E0A83B',
          dark: '#C7922D',
          light: '#FDF6E8',
        },
        clay: {
          DEFAULT: '#C4553D',
          dark: '#A63F29',
          light: '#FBEBE8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
        display: ['Poppins', 'Noto Sans Devanagari', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
};

