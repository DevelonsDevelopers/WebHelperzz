/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
      },
      colors: {
        primary: "#119DED",
        secondary: "#12937C",
        text: "#262626",
        bgLightBlue: "#B7E2FA",
      },
      boxShadow: {
        'custom': '4px 4px 9px #119ded',
      },
    },
  },
  plugins: [],
}
