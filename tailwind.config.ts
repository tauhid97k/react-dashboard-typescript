import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      keyframes: {
        'slide-down': {
          from: { height: '0px' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'slide-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0px' },
        },
        'modal-show': {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -25%) scale(0.95)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -25%) scale(1)' },
        },
        'modal-hide': {
          from: { opacity: '1', transform: 'translate(-50%, -25%) scale(1)' },
          to: {
            opacity: '0',
            transform: 'translate(-50%, -25%) scale(0.95)',
          },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.2s ease-out',
        'slide-up': 'slide-up 0.2s ease-out',
        'modal-show': 'modal-show 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        'modal-hide': 'modal-hide 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
}

export default config
