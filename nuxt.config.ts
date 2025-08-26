import tailwindcss from "@tailwindcss/vite";

import env from "./app/lib/env";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/app.css"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-csurf",
    "nuxt-maplibre",
    "nuxt-easy-lightbox",
  ],

  vite: {
    plugins: [tailwindcss()],

    optimizeDeps: {
      include: ["maplibre-gl"],
    },

    server: {
      watch: {
        ignored: ["./docker-data/*"],
      },
    },
  },

  runtimeConfig: {
    public: {
      s3BucketUrl: env.S3_BUCKET_URL,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "vi-VN" },
    },
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
