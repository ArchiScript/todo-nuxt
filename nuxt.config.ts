// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: ['@pinia/nuxt', '@nuxt/fonts'],
  fonts: {
    families: [
      {name: 'Kanit', provider: 'google'},
      {name: 'Inter', provider: 'google'},
    ],
    priority: ['google']
  },
  css: ['@/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        class: 'light',
      },
    },
  },
  debug: true,
})