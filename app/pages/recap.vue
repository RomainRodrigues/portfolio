<script setup lang="ts">
import { experience, process, profile, projects, skillGroups } from '~/data/portfolio'

// Page imprimable (format A4) : c'est elle qui sert à générer le PDF (`npm run pdf`).
useHead({
  title: `${profile.firstName} ${profile.lastName} — Récapitulatif`,
  htmlAttrs: { class: 'print-page' },
  meta: [{ name: 'robots', content: 'noindex' }],
})

const contacts = [
  { label: profile.email, href: `mailto:${profile.email}` },
  ...profile.socials.map(s => ({ label: s.href.replace(/^https?:\/\/(www\.)?/, ''), href: s.href })),
]
</script>

<template>
  <article class="recap mx-auto bg-white text-[#1d1d1f]">
    <header class="flex items-end justify-between gap-8 border-b border-black/10 pb-5">
      <div>
        <p class="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2997ff]">{{ profile.role }}</p>
        <h1 class="mt-1 text-3xl font-semibold tracking-tight">{{ profile.firstName }} {{ profile.lastName }}</h1>
        <p class="mt-2 max-w-md text-sm text-black/60">{{ profile.tagline }}</p>
      </div>
      <ul class="shrink-0 space-y-1 text-right text-xs text-black/70">
        <li v-for="c in contacts" :key="c.href"><a :href="c.href">{{ c.label }}</a></li>
      </ul>
    </header>

    <div class="mt-5 grid grid-cols-[1fr_14rem] gap-9">
      <div class="space-y-5">
        <section>
          <h2 class="recap-title">Profil</h2>
          <p class="text-[13px] leading-relaxed text-black/75">{{ profile.manifesto }}</p>
        </section>

        <section>
          <h2 class="recap-title">Parcours</h2>
          <ol class="space-y-2 border-l border-black/10 pl-4">
            <li v-for="item in experience" :key="item.title + item.period" class="relative">
              <span class="absolute -left-[21px] top-1.5 size-2 rounded-full" :class="item.current ? 'bg-[#bf5af2]' : 'bg-[#2997ff]'" />
              <p class="text-[11px] text-black/50">{{ item.period }} · {{ item.place }}</p>
              <p class="text-sm font-semibold">{{ item.title }}</p>
              <p class="text-xs leading-relaxed text-black/65">{{ item.text }}</p>
            </li>
          </ol>
        </section>

        <section>
          <h2 class="recap-title">Projets</h2>
          <ul class="space-y-2">
            <li v-for="project in projects" :key="project.title">
              <p class="text-sm font-semibold">
                {{ project.title }}
                <span class="font-normal text-black/50">· {{ project.category }} · {{ project.year }}</span>
              </p>
              <p class="text-xs leading-relaxed text-black/65">{{ project.description }}</p>
              <p class="mt-0.5 text-[11px] text-black/50">
                {{ project.stack.join(' · ') }}
                <template v-if="project.url ?? project.github"> — <a :href="project.url ?? project.github" class="text-[#2997ff]">{{ (project.url ?? project.github)!.replace(/^https?:\/\//, '') }}</a></template>
              </p>
            </li>
          </ul>
        </section>
      </div>

      <aside class="space-y-5">
        <section>
          <h2 class="recap-title">Compétences</h2>
          <div v-for="group in skillGroups" :key="group.label" class="mb-4">
            <p class="mb-1.5 text-[11px] font-medium text-black/50">{{ group.label }}</p>
            <ul class="flex flex-wrap gap-1.5">
              <li v-for="skill in group.items" :key="skill" class="rounded-full bg-black/5 px-2.5 py-1 text-[11px]">{{ skill }}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="recap-title">Façon de travailler</h2>
          <ul class="space-y-2.5">
            <li v-for="step in process" :key="step.title">
              <p class="text-sm font-semibold">{{ step.title }}</p>
              <p class="text-xs leading-relaxed text-black/65">{{ step.text }}</p>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.recap {
  width: 210mm;
  min-height: 297mm;
  padding: 10mm 13mm;
}

.recap-title {
  margin-bottom: 0.75rem;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #2997ff;
}
</style>

<style>
@page {
  size: A4;
  margin: 0;
}

html.print-page {
  background: #f5f5f7;
}

@media print {
  html.print-page {
    background: #fff;
  }
}
</style>
