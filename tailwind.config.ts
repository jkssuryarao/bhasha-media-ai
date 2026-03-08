import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        indiaGreen: '#138808',
        indiaWhite: '#FFFFFF',
      },
      backgroundImage: {
        'gradient-india': 'linear-gradient(135deg, #FF9933 0%, #138808 50%, #FFFFFF 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(255,153,51,0.1) 0%, rgba(19,136,8,0.1) 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 153, 51, 0.3)',
        'glow-green': '0 0 20px rgba(19, 136, 8, 0.3)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
export default config
