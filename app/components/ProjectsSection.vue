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
    gsap.fromTo(visual, { xPercent: -6 }, {
      xPercent: 6,
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
          <p class="mt-6 text-lg text-ink/70">Des projets perso, du front au back en passant par l’outillage. Continue de scroller.</p>
        </div>
        <article
          v-for="project in projects"
          :key="project.title"
          class="group flex h-[min(78svh,40rem)] w-[min(85vw,32rem)] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
        >
          <div class="relative h-[55%] shrink-0 overflow-hidden">
            <div data-card-visual class="absolute -inset-x-[8%] inset-y-0 transition-transform duration-700 group-hover:scale-105">
              <ProjectVisual :visual="project.visual" />
            </div>
          </div>
          <div class="flex flex-1 flex-col p-7">
            <p class="text-sm text-muted">{{ project.category }} · {{ project.year }}</p>
            <h3 class="mt-1 text-3xl font-semibold tracking-tight">{{ project.title }}</h3>
            <p class="mt-3 text-ink/70">{{ project.description }}</p>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li v-for="tech in project.stack" :key="tech" class="rounded-full bg-white/10 px-3 py-1 text-xs text-ink/80">
                {{ tech }}
              </li>
            </ul>
            <div class="mt-auto flex gap-5 pt-5 text-sm font-medium">
              <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="text-accent hover:underline">Voir le site ↗</a>
              <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="text-ink/70 hover:text-ink">Code source ↗</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
