import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        green: {
          90: "#EEF6F0",
          80: "#D5EBDC",
          70: "#A2D7B1",
          60: "#77CF90",
          50: "#4AC96E",
          40: "#28B851",
          30: "#15993A",
          20: "#0B6E27",
          10: "#042F10",
          "05": "#011808",
        },
        red: {
          90: "#F6EEEE",
          80: "#EBD5D5",
          70: "#D7A2A2",
          60: "#CF7777",
          50: "#C94A4A",
          40: "#B82828",
          30: "#991515",
          20: "#6E0B0B",
          10: "#2F0404",
          "05": "#180101",
        },
        orange: {
          90: "#FFEFE5",
          80: "#FDD8C3",
          70: "#F8AD81",
          60: "#F08E56",
          50: "#E7702C",
          40: "#D05E1B",
          30: "#994515",
          20: "#6E2F0B",
          10: "#2F2404",
          "05": "#181201",
        },
        black: {
          90: "#F2F2F2",
          80: "#E0E0E0",
          70: "#BDBDBD",
          60: "#A3A3A3",
          50: "#8A8A8A",
          40: "#707070",
          30: "#575757",
          20: "#3D3D3D",
          10: "#262626",
          "05": "#0D0D0D",
        },
        white: {
          1: "#FFFFFF",
          2: "#FAFAFA",
          3: "#F2F2F2",
        },
      },
      fontFamily: {
        regular: ["Regular"],
        medium: ["Medium"],
        bold: ["Bold"],
        italic: ["Italic"],
        "bold-italic": ["BoldItalic"],
        black: ["Black"],
      },
    },
  },
  plugins: [],
};

export default config;
