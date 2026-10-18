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
        brand: {
          blue:   '#0047AB',  // PRIMARY — CTAs, headings, borders
          navy:   '#002D6E',  // DARK — hero bg, dark sections
          sky:    '#DCE8F7',  // LIGHT — card bg, section bg, borders
          silver: '#C0C0C0',  // ACCENT — subtle decorative
          ink:    '#0B1B33',  // TEXT — body copy
          white:  '#FFFFFF',
          // Legacy aliases
          ice:    '#DCE8F7',
          powder: '#DCE8F7',
          royal:  '#0047AB',
        },
      },
      fontFamily: {
        nura: ['Poppins', "'Helvetica Neue'", 'Arial', 'sans-serif'],
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
