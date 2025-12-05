/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#EC4899",
        success: "#10B981",
        error: "#EF4444"
      },
      backgroundImage: {
        "cosmic-gradient": "linear-gradient(to bottom right, rgba(99,102,241,0.10), rgba(249,250,251,1))"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
};
