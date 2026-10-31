<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { profile } from '~/data/portfolio'

const root = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)

useScrollAnimation(root, ({ reduced }) => {
  if (reduced) return

  const split = SplitText.create(title.value!, { type: 'lines', mask: 'lines' })
  gsap.timeline({ scrollTrigger: { trigger: root.value, start: 'top 65%' } })
    .from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.12, ease: 'expo.out' })
    .from('[data-contact-fade]', { opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.8')
})
</script>

<template>
  <section id="contact" ref="root" class="flex min-h-svh flex-col items-center justify-center px-6 py-32 text-center">
    <h2 ref="title" class="max-w-5xl text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.95] tracking-tighter">
      Construisons <span class="text-gradient">quelque chose</span> ensemble.
    </h2>
    <a
      data-contact-fade
      :href="`mailto:${profile.email}`"
      class="mt-12 rounded-full bg-ink px-8 py-4 text-lg font-medium text-black transition-transform hover:scale-105"
    >{{ profile.email }}</a>
    <ul data-contact-fade class="mt-10 flex gap-8 text-ink/70">
      <li v-for="social in profile.socials" :key="social.label">
        <a :href="social.href" target="_blank" rel="noopener" class="transition-colors hover:text-ink">{{ social.label }}</a>
      </li>
    </ul>
    <p data-contact-fade class="mt-24 text-xs text-muted">
      © {{ new Date().getFullYear() }} {{ profile.firstName }} {{ profile.lastName }}
    </p>
  </section>
</template>
