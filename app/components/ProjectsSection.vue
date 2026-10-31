<script setup lang="ts">
import gsap from 'gsap'
import { projects } from '~/data/portfolio'

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)

useScrollAnimation(root, ({ reduced }) => {
  if (reduced) return

  const distance = () => track.value!.scrollWidth - window.innerWidth

  // Le scroll vertical fait défiler la galerie horizontalement.
  const scroll = gsap.to(track.value, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: root.value,
      start: 'top top',
      end: () => `+=${distance()}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  })

  // Parallaxe interne à chaque carte, synchronisée avec le défilement horizontal.
  gsap.utils.toArray<HTMLElement>('[data-card-visual]').forEach((visual) => {
    gsap.fromTo(visual, { xPercent: -12 }, {
      xPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: visual.parentElement,
        containerAnimation: scroll,
        start: 'left right',
        end: 'right left',
        scrub: true,
      },
    })
  })
})
</script>

<template>
  <section id="projects" ref="root" class="relative flex h-svh flex-col justify-center overflow-hidden">
    <div class="projects-viewport">
      <div ref="track" class="flex w-max items-center gap-8 px-[8vw]">
        <div class="w-[min(80vw,28rem)] shrink-0">
          <p class="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">Projets</p>
          <h2 class="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-none tracking-tighter">
            Sélection de travaux.
          </h2>
          <p class="mt-6 text-lg text-ink/70">Quelques réalisations récentes. Continue de scroller.</p>
        </div>
        <article
          v-for="project in projects"
          :key="project.title"
          class="group relative h-[min(70svh,34rem)] w-[min(80vw,30rem)] shrink-0 overflow-hidden rounded-[2rem] border border-white/10"
        >
          <div
            data-card-visual
            class="absolute -inset-x-[15%] inset-y-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105"
            :class="project.gradient"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div class="absolute inset-x-0 bottom-0 p-8">
            <p class="text-sm text-ink/70">{{ project.category }} · {{ project.year }}</p>
            <h3 class="mt-1 text-3xl font-semibold tracking-tight">{{ project.title }}</h3>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
