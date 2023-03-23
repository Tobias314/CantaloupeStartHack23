/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                flash: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                }
            },
            animation: {
                flash: 'flash 0.7s ease-out'
            },
            colors: {
                SET_3: {
                    first: '#8dd3c7',
                    third: '#bebada',
                    fourth: '#fb8072',
                    fifth: '#80b1d3',
                    sixth: '#fdb462',
                    seventh: '#b3de69',
                    eight: '#fccde5',
                    ninth: '#d9d9d9',
                    tenth: '#bc80bd',
                    eleventh: '#ccebc5',
                    twelfth: '#ffed6f'
                }
            },
        }
    },
    plugins: []
}
