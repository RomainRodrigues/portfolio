<script setup lang="ts">
import { profile } from '~/data/portfolio'

const links = [
  { label: 'À propos', target: '#about' },
  { label: 'Parcours', target: '#parcours' },
  { label: 'Compétences', target: '#skills' },
  { label: 'Projets', target: '#projects' },
  { label: 'Contact', target: '#contact' },
]

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
        {{ profile.firstName }} {{ profile.lastName }}
      </a>
      <ul class="hidden gap-8 sm:flex">
        <li v-for="link in links" :key="link.target">
          <a
            :href="link.target"
            class="text-ink/70 transition-colors hover:text-ink"
            @click.prevent="goTo(link.target)"
          >{{ link.label }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
