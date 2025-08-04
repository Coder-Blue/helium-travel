import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/app.css"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  eslint: {
    config: { standalone: false },
  },

  fonts: {
    defaults: {
      weights: [400, 700],
      styles: ["normal", "italic"],
      subsets: ["latin", "vietnamese"],
    },
  },

  colorMode: {
    dataValue: "theme",
  },
});
