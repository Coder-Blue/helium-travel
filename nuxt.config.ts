import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  modules: ["@nuxt/eslint", "@nuxtjs/google-fonts", "@nuxt/icon"],

  css: ["~/assets/css/app.css"],

  googleFonts: {
    families: {
      Manrope: {
        wght: [200, 300, 400, 500, 600, 700, 800],
      },
    },
    display: "swap",
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
});
