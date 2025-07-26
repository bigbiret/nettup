/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        // Primærfarger fra style guide
        'dark-blue': '#1E3A8A',
        'clear-blue': '#3B82F6',
        'hover-blue': '#2563EB',
        'background': '#F9FAFB',
        'main-text': '#111827',
        'secondary-text': '#6B7280',
        'card-background': '#E5E7EB',
        'separator': '#D1D5DB',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'bold': '700',
      }
    },
  },
  plugins: [],
} 