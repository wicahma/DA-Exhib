/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Montserrat','ui-sans-serif', 'system-ui',],
      'serif': ['Waiting for the Sunrise', 'Georgia',],
      'mono': ['ui-monospace', 'SFMono-Regular',],
      'display': ['Oswald',],
      'body': ['Montserrat',],
    },
    extend: {},
  },
  plugins: [require("daisyui"),  require('@tailwindcss/forms'),],
  daisyui: {
    styled: false,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
