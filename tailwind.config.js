module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind processes all JS/TS files in src
   ],
  theme: {
    extend: {
      colors: {
        customDark: '#17202A',
        lightGold: '#d4d0af',
        skyBlue: '#496595',
        offWhite: '#dbe5f6',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
