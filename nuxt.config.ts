import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#000000' },
      ],
    },
  },
  i18n: {
    // URL publique du site, utilisée pour les liens SEO entre langues (hreflang).
    baseUrl: import.meta.env.NUXT_PUBLIC_SITE_URL || 'https://romrd.fr',
    // Français à la racine (/), anglais sous /en
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français' },
      { code: 'en', language: 'en-US', name: 'English' },
    ],
    // Pas de redirection automatique selon la langue du navigateur :
    // chaque URL affiche toujours la même langue (plus simple et plus prévisible).
    detectBrowserLanguage: false,
  },
})
