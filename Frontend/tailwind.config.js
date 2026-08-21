/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14213D",
          light: "#243352",
        },
        paper: "#FAF9F4",
        card: "#FFFFFF",
        line: "#E4E1D6",
        gold: {
          DEFAULT: "#E3B23C",
          dark: "#C89526",
        },
        sage: {
          DEFAULT: "#3F6659",
          light: "#EAF0EC",
        },
        clay: {
          DEFAULT: "#B5533C",
          light: "#F7EAE5",
        },
        slate: {
          DEFAULT: "#6B7280",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
}

