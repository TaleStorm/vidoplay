module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {      
      black: "#000000",
      white: "#FFFFFF",

      inactive: "#8A898F",

      transparent: "#00000000",
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

      "voice-button-voted": "#363548",
      "voice-button-voted-hover": "#333243",
      "user-bg": "#6B6B70",
      orange:"#F8634A",
      white: "#fff",
      greySlider:"rgba(255,255,255,0.5)",

      mainText: "#FFFFFD",
      secondaryText: "#c8c6d2",

      doramaTag: "#36A4C9",
      dramaTag: "#A036C9",
      loveTag: "#6B4DC1",

      playerMain: "#232230",
      playerSecond: "#F8634A",

      "button-hover": "#D3533E",
      "error-red": "#FF4343"
        
    },
    fontFamily: {
      roboto: ["Roboto"],
      inter: ["Inter"]
    },
    extend: {
      transitionDuration: {
        400: "400ms"
      },
      animation: {
        "card-hover": "card-hover 0.5s ease-out"
      },
      keyframes: {
        "card-hover": {
            "0%": {
              transform: "translateY(0px)",
              boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)"
            },
            "100%": {
              transform: "translateY(-10px)",
              boxShadow: "0px 8px 15px -8px #A036C9B2"
            }
        }
      },
      boxShadow: {
        "card-hover": "0px 8px 15px -10px rgba(160, 54, 201, 0.7)"
      },
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
         "13": "3.25rem",
         "18": "4.5rem",
         "22": "5.5rem",
         "25": "6.25rem",
         "30": "7.5rem",
         "45": "11.25rem",
         "54": "13.5rem",
         "58": "14.5rem",
         "68": "17rem",
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
         }],
         "h7" : ["1.5rem", {
           lineHeight: "1.5rem",
           letterSpacing: "-0.02em"
         }]

       }
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
