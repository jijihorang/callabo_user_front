/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        heartBreak: {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.2) rotate(15deg)" },
          "60%": { transform: "scale(0.8) rotate(-15deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
        heartBeat: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        heartBreak: "heartBreak 0.5s ease-in-out",
        heartBeat: "heartBeat 0.5s ease-in-out",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
