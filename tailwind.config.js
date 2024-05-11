/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'custom-gray': '#333533',
          'custom-light-gray':'#242423',
          'custom-black': '#0a0908',
          'custom-yellow':'#ffb703',
          'custom-white':'#dad7cd'
          
        },
      
    },
  },
  plugins: [],
}
