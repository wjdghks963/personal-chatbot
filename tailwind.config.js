/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        slideOpenKeyFrame:{
          '0%':{
            transform:'scaleX(0)',
            opacity:0,
          },
          '100%':{transform:'scaleX(1)',
          opacity:1,
          }
        },
        slideCloseKeyFrame:{
          '0%':{
            transform:'scaleX(1)',
            opacity:1
          },
          '100%':{
            transform:'scaleX(0)',
            opacity:0
          }
        }
      },
      animation:{
        'slideOpenAnim':'slideOpenKeyFrame 0.5s  linear forwards',
        'slideCloseAnim':'slideCloseKeyFrame 0.5s linear forwards'
      }
    },
  },
  plugins: [],
}


