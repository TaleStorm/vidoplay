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
      "user-button-gray-2": "#44434C",
      shadow: "#E5E5E5",
      "checkbox-border": "#8A898F",
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
         "18": "4.5rem",
         "25": "6.25rem",
         "30": "7.5rem",
         "45": "11.25rem",
         "54": "13.5rem",
         "72": "18rem",
       },
       maxWidth: {
        "33": "8.25rem",
       },
       fontSize: {
         "ui-text": ["0.875rem", {
           lineHeight: "1rem"
         }],
         "lk-header": ["1.75rem", {
           lineHeight: "2rem",
           letterSpacing: "-0.02em"
         }],
         "h1-mobile": ["1.25rem", {
           lineHeight: "1.5rem",
           letterSpacing: "-0.02em"
         }],
         "h2-mobile": ["1rem", {
          lineHeight: "1.25rem",
          letterSpacing: "-0.02em"
         }],
         "h6": ["2.1875rem", {
          lineHeight: "3.125rem",
          letterSpacing: "-0.02em"
         }],
         "smol": ["0.75rem", {
          lineHeight: "1rem"
         }]

       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
