// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/sanity", "@nuxt/image"],
  sanity: {
    projectId: process.env.NUXT_SANITY_ID,
    apiVersion: process.env.NUXT_SANITY_API_VERSION || '2024-03-15',
  },
  image: {
    format: ['webp'],
    provider: 'sanity',
    sanity: {
      format: ['webp'],
      projectId: 'g7vrqfyp',
      // Defaults to 'production'
      // dataset: 'development'
      visualEditing: {
        mode: 'visual-editing',
        token: process.env.NUXT_SANITY_VISUAL_EDITING_TOKEN,
        studioUrl: process.env.NUXT_SANITY_VISUAL_EDITING_STUDIO_URL,
        stega: true,
      },
    },
  }
})