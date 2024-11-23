import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "330px",
        sms: "386px",
        smm: "410px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        lgx: "1180px",
        xl: "1280px",
        xll: "1380px",
        xxl: "1600px",
      },
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
        jacquard: ["Jacquard 12", "system - ui"],
      },
      colors: {
        customBorder: "hsl(230 11.63% 17%)",
        borderCol: "hsl(230 11.63% 17%)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        logoBg: "linear-gradient(145deg, rgb(200, 19, 236), rgb(19, 91, 236))",
      },
    },
  },
  plugins: [],
};
export default config;
