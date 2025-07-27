import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f766e',    // teal-700
        secondary: '#a3e635',  // lime-400
        accent: '#84cc16',     // lime-500
        background: '#134e4a', // teal-900
        textLight: '#f3f4f6',  // gray-100
        textDark: '#1f2937',   // gray-800
      }
    },
  },
  plugins: [daisyui],
};
