/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
         fontFamily: {
        bebas: ['var(--font-bebas-neue)'],
        robotoCondensed: ['var(--font-roboto-condensed)'],
      },
      screens: {
        
        xs: '300px', // everything below 500px will be treated as 'xs'
      },
     },
  },
  plugins: [],
}