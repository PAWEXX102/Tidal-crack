import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: { "25": "repeat(25, minmax(0, 1fr))" },
      gridTemplateRows: { "25": "repeat(25, minmax(0, 1fr))" },
      gridColumn: { "span-15": "span 15 / span 15" },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
