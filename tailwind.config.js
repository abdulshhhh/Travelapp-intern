/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'profile-bg': "url('/src/assets/bg-image.jpg')",
      },
    },
  },
  plugins: [],
};