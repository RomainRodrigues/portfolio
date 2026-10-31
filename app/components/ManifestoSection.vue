<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { profile } from '~/data/portfolio'

const root = ref<HTMLElement | null>(null)
const text = ref<HTMLElement | null>(null)

useScrollAnimation(root, ({ reduced }) => {
  if (reduced) return

  // Les mots s'allument un par un au rythme du scroll.
  const split = SplitText.create(text.value!, { type: 'words' })
  gsap.fromTo(split.words, { opacity: 0.12 }, {
    opacity: 1,
    ease: 'none',
    stagger: 0.1,
    scrollTrigger: { trigger: root.value, start: 'top top', end: '+=150%', scrub: true, pin: true },
  })
})
</script>

<template>
  <section id="about" ref="root" class="flex min-h-svh items-center">
    <div class="mx-auto max-w-5xl px-6">
      <p class="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-accent">À propos</p>
      <p ref="text" class="text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[1.1] tracking-tight">
        {{ profile.manifesto }}
      </p>
    </div>
  </section>
</template>
