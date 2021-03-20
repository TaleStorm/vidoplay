module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      background: "#15141F",
      cardBackground: "#1C1B26",
      filmInfoBackground: "rgba(28, 27, 38, 0.5)",

      orange:"#F8634A",
      greySlider:"rgba(255,255,255,0.5)",

      mainText: "#FFFFFD",
      greyText: "#rgba(255,255,255,0.3)",

      doramaTag: "#36A4C9",
      dramaTag: "#A036C9",
      loveTag: "#6B4DC1",
        
    },
    fontFamily: {
      roboto: ['Roboto'],
    },
    extend: {
      backgroundImage: theme => ({
        'slider': "url('/images/slider.png')",
        'dorama': "url('/images/films/dorama.png')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
