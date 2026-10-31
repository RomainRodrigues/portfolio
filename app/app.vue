<script setup lang="ts">
const c = usePortfolio()
// Attribut lang, liens hreflang vers les autres langues, etc.
const localeHead = useLocaleHead()

useHead({
  title: () => c.value.meta.title,
  htmlAttrs: { lang: () => localeHead.value.htmlAttrs.lang },
  link: () => localeHead.value.link,
  meta: () => [
    { name: 'description', content: c.value.meta.description },
    ...localeHead.value.meta,
  ],
})
</script>

<template>
  <NuxtPage />
</template>
