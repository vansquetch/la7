// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  css: ["~/assets/css/main.css", "leaflet/dist/leaflet.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  supabase: {
    redirect: false,
  },
  modules: [
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
    "@nuxtjs/leaflet",
  ],
});
