/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        primary: "#FFD700", // Kuning Cerah
        secondary: "#002366", // Biru Tua
        merah: "#D32F2F", // Merah Cerah
        coklat: "#B8860B", // Coklat/Emas
        gelap: "#1f2937", // Hitam
      },
    },
  },
  plugins: [],
};
