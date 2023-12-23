/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                JetBrains: ['JetBrains Mono', 'monospace'],
                Numans: ['Numans', 'sans-serif']
            },
            colors: {
                'bg-dark-primary': '#373737',
                'bg-dark-bg-secondary': '#3E3E3E',
                'text-dark-primary': '#F5F5F5'
            }
        }
    },
    corePlugins: {
        preflight: false
    },
    darkMode: 'class'
};