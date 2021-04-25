module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {      
      black: "#000000",
      white: "#FFFFFF",

      background: "#15141F",
      "sub-gray": "#313043",
      "user-button-gray": "#4F4E59",
      shadow: "#E5E5E5",
      popupBackground: "#1C1B26",
      popupBorder: "#646464",
      cardBackground: "#232230",
      filmInfoBackground: "rgba(28, 27, 38, 0.5)",
      filmReviewBackground: "#313043",

      orange:"#F8634A",
      white: "#fff",
      greySlider:"rgba(255,255,255,0.5)",

      mainText: "#FFFFFD",

      doramaTag: "#36A4C9",
      dramaTag: "#A036C9",
      loveTag: "#6B4DC1",

      playerMain: "#232230",
      playerSecond: "#F8634A"
        
    },
    fontFamily: {
      roboto: ["Roboto"],
    },
    extend: {
      backgroundImage: (theme) => ({
        'slider': "url('/images/slider.png')",
        'dorama': "url('/images/dorama.png')",
       }),
       height: {
        "10.5": '2.625rem',
       },
       margin: {
        '-10.5': '-2.625rem',
       },
       spacing: {
         "72": "18rem",
         "25": "6.25rem",
         "30": "7.5rem"
       },
       fontSize: {
         "ui-text": ["14px", {
           lineHeight: "16px"
         }],
         "lk-header": ["28px", {
           lineHeight: "32px",
           letterSpacing: "-0.02em"
         }],
         "h1-mobile": ["20px", {
           lineHeight: "24px",
           letterSpacing: "-0.02em"
         }],
         "h2-mobile": ["16px", {
          lineHeight: "20px",
          letterSpacing: "-0.02em"
         }]

       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
