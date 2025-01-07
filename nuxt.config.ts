// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/sanity", "@nuxt/image"],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag == 'mux-player'
    }
  },
  sanity: {
    projectId: process.env.NUXT_SANITY_ID,
    apiVersion: process.env.NUXT_SANITY_API_VERSION || '2024-03-15',
    visualEditing: {
      mode: 'visual-editing',
      token: process.env.NUXT_SANITY_VISUAL_EDITING_TOKEN,
      studioUrl: process.env.NUXT_SANITY_VISUAL_EDITING_STUDIO_URL,
      stega: true,
    },
  },
  image: {
    format: ['webp'],
    provider: 'sanity',
    sanity: {
      format: ['webp'],
      projectId: process.env.NUXT_SANITY_ID,
      // Defaults to 'production'
      // dataset: 'development'
    },
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
  }
})