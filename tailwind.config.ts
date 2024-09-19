import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        dark_1: "var(--dark-1)",
        dark_2: "var(--dark-2)",
        dark_3: "var(--dark-3)",
        dark_4: "var(--dark-4)",
        light_1: "var(--light-1)",
        light_2: "var(--light-2)",
        light_3: "var(--light-3)",
        light_4: "var(--light-4)",
        gradient: "var(--gradient)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("daisyui")],
};
export default config;
