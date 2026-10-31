<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { profile } from '~/data/portfolio'

const root = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)

useScrollAnimation(root, ({ reduced }) => {
  if (reduced) return

  // Entrée : les lettres montent depuis un masque.
  const split = SplitText.create(title.value!, { type: 'chars', mask: 'chars' })
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from(split.chars, { yPercent: 110, duration: 1.4, stagger: 0.035 })
    .from('[data-hero-fade]', { opacity: 0, y: 24, duration: 1.2, stagger: 0.12 }, '-=1')

  // Au scroll : la section reste épinglée, le titre recule et s'efface.
  gsap.timeline({
    scrollTrigger: { trigger: root.value, start: 'top top', end: '+=100%', scrub: true, pin: true },
  })
    .to('[data-hero-content]', { scale: 0.82, opacity: 0, filter: 'blur(12px)', ease: 'none' })
    .to('[data-hero-glow]', { scale: 1.6, opacity: 0, ease: 'none' }, 0)
    .to('[data-hero-scroll]', { opacity: 0, ease: 'none', duration: 0.3 }, 0)
})
</script>

<template>
  <section id="top" ref="root" class="relative flex h-svh items-center justify-center overflow-hidden">
    <div
      data-hero-glow
      class="pointer-events-none absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-accent/40 to-accent-2/40 blur-[120px]"
    />
    <div data-hero-content class="relative px-6 text-center will-change-transform">
      <p data-hero-fade class="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-muted">
        {{ profile.role }}
      </p>
      <h1 ref="title" class="text-[clamp(3.5rem,13vw,11rem)] font-semibold leading-[0.9] tracking-tighter">
        {{ profile.firstName }}<br>{{ profile.lastName }}
      </h1>
      <p data-hero-fade class="mx-auto mt-8 max-w-xl text-lg text-ink/70 sm:text-xl">
        {{ profile.tagline }}
      </p>
    </div>
    <div data-hero-fade data-hero-scroll class="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted">
      Scroll
    </div>
  </section>
</template>
