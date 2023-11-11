/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        JetBrains: ['JetBrains Mono', 'monospace'],
        Numans: ['Numans', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    preflight: false,
  }
};
