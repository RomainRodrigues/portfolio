<script setup lang="ts">
import gsap from 'gsap'
const c = usePortfolio()

const root = ref<HTMLElement | null>(null)

useScrollAnimation(root, ({ reduced }) => {
  if (reduced) return

  // « Fin. » arrive de très loin, flou, puis se pose ; le reste apparaît ensuite.
  gsap.timeline({
    scrollTrigger: { trigger: root.value, start: 'top top', end: '+=90%', scrub: 1, pin: true },
  })
    .fromTo('[data-end-title]',
      { scale: 3, opacity: 0, filter: 'blur(24px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 1 })
    .from('[data-end-fade]', { opacity: 0, y: 40, stagger: 0.15, duration: 0.5 }, 0.7)
})
</script>

<template>
  <section id="contact" ref="root" class="relative flex h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
    <div class="pointer-events-none absolute bottom-0 left-1/2 h-[50vh] w-[80vw] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r from-accent/30 to-accent-2/30 blur-[120px]" />

    <h2 data-end-title class="text-gradient relative text-[clamp(6rem,22vw,18rem)] font-semibold leading-none tracking-tighter will-change-transform">
      {{ c.end.title }}
    </h2>

    <p data-end-fade class="relative mt-6 max-w-lg text-lg text-ink/70 sm:text-xl">
      {{ c.end.text }}
    </p>

    <!-- Le wrapper porte l'animation GSAP : le lien a sa propre transition CSS au survol -->
    <div data-end-fade class="relative mt-10">
      <a
        :href="c.pdf"
        download
        class="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-lg font-medium text-black transition-transform hover:scale-105"
      >
        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14" />
        </svg>
        {{ c.end.download }}
      </a>
    </div>

    <ul data-end-fade class="relative mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-ink/60">
      <li v-if="c.identity.email"><a :href="`mailto:${c.identity.email}`" class="transition-colors hover:text-ink">{{ c.identity.email }}</a></li>
      <li v-for="social in c.identity.socials" :key="social.label">
        <a :href="social.href" target="_blank" rel="noopener" class="transition-colors hover:text-ink">{{ social.label }}</a>
      </li>
    </ul>

    <p class="absolute bottom-6 text-xs text-muted">
      © {{ new Date().getFullYear() }} {{ c.identity.firstName }} {{ c.identity.lastName }}
    </p>
  </section>
</template>
