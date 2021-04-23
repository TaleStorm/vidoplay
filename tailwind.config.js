module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      background: "#15141F",
      shadow: "#E5E5E5",
      popupBackground: "#1C1B26",
      popupBorder: "#646464",
      cardBackground: "#232230",
      filmInfoBackground: "rgba(28, 27, 38, 0.5)",

      orange:"#F8634A",
      greySlider:"rgba(255,255,255,0.5)",

      mainText: "#FFFFFD",

      doramaTag: "#36A4C9",
      dramaTag: "#A036C9",
      loveTag: "#6B4DC1",

      playerMain: "#232230",
      playerSecond: "#F8634A"
        
    },
    fontFamily: {
      roboto: ['Roboto'],
    },
    extend: {
      backgroundImage: theme => ({
        'slider': "url('/images/slider.png')",
        'dorama': "url('/images/dorama.png')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
