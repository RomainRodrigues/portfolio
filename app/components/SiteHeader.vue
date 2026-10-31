<script setup lang="ts">
const c = usePortfolio()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const links = computed(() => [
  { label: c.value.nav.about, target: '#about' },
  { label: c.value.nav.journey, target: '#parcours' },
  { label: c.value.nav.skills, target: '#skills' },
  { label: c.value.nav.projects, target: '#projects' },
  { label: c.value.nav.contact, target: '#contact' },
])

const { $lenis } = useNuxtApp()

function goTo(target: string) {
  if ($lenis) $lenis.scrollTo(target, { duration: 1.4 })
  else document.querySelector(target)?.scrollIntoView()
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl backdrop-saturate-150">
    <nav class="mx-auto flex h-12 max-w-6xl items-center justify-between px-6 text-xs">
      <a href="#top" class="font-semibold tracking-tight text-ink" @click.prevent="goTo('#top')">
        {{ c.identity.firstName }} {{ c.identity.lastName }}
      </a>
      <div class="flex items-center gap-8">
        <ul class="hidden gap-8 sm:flex">
          <li v-for="link in links" :key="link.target">
            <a
              :href="link.target"
              class="text-ink/70 transition-colors hover:text-ink"
              @click.prevent="goTo(link.target)"
            >{{ link.label }}</a>
          </li>
        </ul>
        <!-- Sélecteur de langue (toujours visible, y compris sur mobile) -->
        <ul class="flex gap-1 rounded-full border border-white/15 p-0.5">
          <li v-for="l in locales" :key="l.code">
            <NuxtLink
              :to="switchLocalePath(l.code)"
              :hreflang="l.language"
              class="block rounded-full px-2.5 py-1 uppercase transition-colors"
              :class="l.code === locale ? 'bg-ink text-black' : 'text-ink/70 hover:text-ink'"
            >{{ l.code }}</NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
