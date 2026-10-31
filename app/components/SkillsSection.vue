<script setup lang="ts">
import gsap from 'gsap'
import { skillGroups } from '~/data/portfolio'

const root = ref<HTMLElement | null>(null)

useScrollAnimation(root, ({ reduced }) => {
  if (reduced) return

  // Le panneau s'ouvre comme une fenêtre jusqu'à remplir l'écran.
  gsap.timeline({
    scrollTrigger: { trigger: root.value, start: 'top top', end: '+=120%', scrub: true, pin: true },
  })
    .fromTo('[data-panel]',
      { clipPath: 'inset(22% 18% round 48px)' },
      { clipPath: 'inset(0% 0% round 0px)', ease: 'power1.inOut' })
    .from('[data-panel-title]', { scale: 0.7, opacity: 0, ease: 'power1.out' }, 0)

  // Les rangées de compétences glissent en sens opposés.
  gsap.utils.toArray<HTMLElement>('[data-marquee]').forEach((row, i) => {
    gsap.fromTo(row, { xPercent: i % 2 ? -25 : 0 }, {
      xPercent: i % 2 ? 0 : -25,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom+=120% top', scrub: true },
    })
  })
})
</script>

<template>
  <section id="skills" ref="root" class="relative h-svh overflow-hidden">
    <div
      data-panel
      class="absolute inset-0 flex flex-col justify-center gap-10 overflow-hidden bg-gradient-to-br from-[#0b1a33] via-[#1a0f2e] to-black"
    >
      <h2 data-panel-title class="px-6 text-center text-[clamp(2.5rem,7vw,6rem)] font-semibold tracking-tighter">
        Ma <span class="text-gradient">boîte à outils</span>.
      </h2>
      <div class="flex flex-col gap-4">
        <div v-for="group in skillGroups" :key="group.label" data-marquee class="flex w-max gap-4 whitespace-nowrap">
          <span
            v-for="n in 3"
            :key="n"
            class="contents"
          >
            <span
              v-for="skill in group.items"
              :key="`${n}-${skill}`"
              class="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-2xl font-medium backdrop-blur sm:text-4xl"
            >{{ skill }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
