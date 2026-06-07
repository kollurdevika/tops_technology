/** @type {import('tailwindcss').Config} */
module.exports = {
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
        neonGreen: "#B9F641",
        goldAccent: "#ffd700",
        greenAccent: "#00ff88",
        darkCard: "rgba(20, 20, 25, 0.7)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle, rgba(185,246,65,0.15) 0%, rgba(0,0,0,0) 70%)',
      }
    },
  },
  plugins: [],
};
