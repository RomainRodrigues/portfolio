<script setup lang="ts">
import gsap from 'gsap'
const c = usePortfolio()

const root = ref<HTMLElement | null>(null)

useScrollAnimation(root, ({ reduced }) => {
  if (reduced) return

  // La ligne se dessine au fil du scroll…
  gsap.fromTo('[data-line]', { scaleY: 0 }, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: '[data-timeline]', start: 'top 60%', end: 'bottom 60%', scrub: true },
  })

  // …et chaque étape s'allume quand elle passe au centre de l'écran.
  gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step) => {
    gsap.timeline({
      scrollTrigger: { trigger: step, start: 'top 75%', end: 'top 45%', scrub: true },
    })
      .fromTo(step, { opacity: 0.15, x: 40 }, { opacity: 1, x: 0, ease: 'power2.out' })
      .fromTo(step.querySelector('[data-dot]'), { scale: 0.4 }, { scale: 1, ease: 'back.out(3)' }, 0)
  })

  gsap.from('[data-timeline-title]', {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: { trigger: root.value, start: 'top 70%' },
  })
})
</script>

<template>
  <section id="parcours" ref="root" class="mx-auto max-w-5xl px-6 py-40">
    <div data-timeline-title class="mb-24">
      <p class="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">{{ c.journey.label }}</p>
      <h2 class="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-none tracking-tighter">
        {{ c.journey.titleLine1 }}<br><span class="text-gradient">{{ c.journey.titleLine2 }}</span>
      </h2>
    </div>

    <ol data-timeline class="relative">
      <!-- Rail + ligne de progression -->
      <div class="absolute bottom-0 left-[7px] top-2 w-px bg-white/10" />
      <div data-line class="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent to-accent-2" />

      <li v-for="item in c.journey.items" :key="item.title + item.period" data-step class="relative pb-20 pl-12 last:pb-0">
        <span
          data-dot
          class="absolute left-0 top-2 size-[15px] rounded-full border-2 border-black"
          :class="item.current ? 'bg-accent-2 shadow-[0_0_24px_var(--color-accent-2)]' : 'bg-accent'"
        />
        <p class="text-sm font-medium text-muted">{{ item.period }}</p>
        <h3 class="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">{{ item.title }}</h3>
        <p class="mt-2 text-lg text-ink/80">{{ item.place }}</p>
        <p class="mt-4 max-w-2xl text-lg text-ink/60">{{ item.text }}</p>
      </li>
    </ol>
  </section>
</template>
