// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  devServer: {
    port: 4000,
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/apollo",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/leaflet",
  ],
  apollo: {
    autoImports: true,
    clients: {
      default: {
        httpEndpoint: "https://sirefcode.hasura.app/v1/graphql",
        httpLinkOptions: {
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
          },
        },
      },
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "~/tailwind.config.js",
  },
});
