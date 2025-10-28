/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          background: '#0c0c0f',
          foreground: '#eaeaea',
          card: '#131316',
          border: '#2b2b2e',
          accent: '#7c3aed', // 보라 포인트
          muted: '#8b8b8b',
        },
        boxShadow: {
          glass: '0 4px 30px rgba(0, 0, 0, 0.5)',
        },
        backdropBlur: {
          xs: '2px',
        },
      },
    },
    plugins: [],
  }
  