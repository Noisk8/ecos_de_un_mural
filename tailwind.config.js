/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        concrete: '#1e1e1e',
        neon: '#00ff88',
      },
      backgroundImage: {
        spray: 'radial-gradient(circle at 30% 70%, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.05) 30%, transparent 60%)',
      },
      boxShadow: {
        soft: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 6px 10px -5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}