import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
  ],

  css: ["~/assets/css/app.css"],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  googleFonts: {
    families: {
      Manrope: {
        wght: [200, 300, 400, 500, 600, 700, 800],
      },
    },
    display: "swap",
  },

  colorMode: {
    dataValue: "theme",
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
});
