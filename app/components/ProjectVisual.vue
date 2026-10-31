<script setup lang="ts">
import type { ProjectVisual } from '~/data/portfolio'

defineProps<{ visual: ProjectVisual }>()
</script>

<template>
  <!-- Capture réelle -->
  <img
    v-if="visual.kind === 'image'"
    :src="visual.src"
    :alt="visual.alt"
    loading="lazy"
    class="size-full object-cover"
  >

  <!-- Maquette : messagerie -->
  <div v-else-if="visual.kind === 'chat'" class="flex size-full bg-gradient-to-br from-emerald-500/30 via-[#0b1f1a] to-black p-6" aria-hidden="true">
    <div class="flex w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111214]/90 shadow-2xl">
      <div class="flex w-14 flex-col items-center gap-3 bg-black/40 py-4">
        <span class="size-9 rounded-2xl bg-emerald-400" />
        <span class="size-9 rounded-full bg-white/10" />
        <span class="size-9 rounded-full bg-white/10" />
      </div>
      <div class="hidden w-32 flex-col gap-2 border-r border-white/5 p-4 text-xs text-ink/50 sm:flex">
        <span class="font-semibold text-ink/80">Équipe Dev</span>
        <span class="rounded bg-white/10 px-2 py-1 text-ink"># general-chat</span>
        <span class="px-2"># front</span>
        <span class="px-2"># back</span>
      </div>
      <div class="flex flex-1 flex-col justify-end gap-3 p-4 text-xs">
        <div v-for="(msg, i) in ['On merge la PR ce soir ?', 'Oui, la CI est verte 🎉', 'Parfait, je déploie !']" :key="i" class="flex gap-2">
          <span class="size-7 shrink-0 rounded-full" :class="i % 2 ? 'bg-sky-400' : 'bg-emerald-400'" />
          <div>
            <p class="font-semibold text-ink/80">{{ i % 2 ? 'Léa' : 'Romain' }}</p>
            <p class="text-ink/60">{{ msg }}</p>
          </div>
        </div>
        <div class="mt-1 rounded-lg bg-white/5 px-3 py-2 text-ink/30">Envoyer un message dans #general-chat</div>
      </div>
    </div>
  </div>

  <!-- Maquette : terminal -->
  <div v-else-if="visual.kind === 'terminal'" class="flex size-full items-center bg-gradient-to-br from-orange-500/40 via-[#2a140b] to-black p-6" aria-hidden="true">
    <div class="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]/95 font-mono text-xs shadow-2xl sm:text-sm">
      <div class="flex gap-2 border-b border-white/5 px-4 py-3">
        <span class="size-3 rounded-full bg-[#ff5f57]" /><span class="size-3 rounded-full bg-[#febc2e]" /><span class="size-3 rounded-full bg-[#28c840]" />
      </div>
      <div class="space-y-2 p-5 leading-relaxed">
        <p><span class="text-orange-400">❯</span> claude</p>
        <p class="text-ink/50">✻ Bienvenue dans Claude Code</p>
        <p><span class="text-orange-300">&gt;</span> Explique-moi les sous-agents</p>
        <p class="text-ink/70">Un sous-agent est une instance de Claude qui travaille en parallèle sur une tâche précise…</p>
        <p class="text-ink/30">▍</p>
      </div>
    </div>
  </div>

  <!-- Maquette : éditeur de code -->
  <div v-else class="flex size-full items-center bg-gradient-to-br from-indigo-500/40 via-[#0e1030] to-black p-6" aria-hidden="true">
    <div class="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e2e]/95 font-mono text-xs shadow-2xl sm:text-sm">
      <div class="flex items-center justify-between border-b border-white/5 px-4 py-2 text-ink/50">
        <span>UserController.php</span>
        <span class="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300">✓ Formaté dans Docker</span>
      </div>
      <div class="space-y-1 p-5 leading-relaxed">
        <p><span class="text-violet-400">final class</span> <span class="text-amber-300">UserController</span></p>
        <p>{</p>
        <p class="pl-4"><span class="text-violet-400">public function</span> <span class="text-sky-300">show</span>(<span class="text-amber-300">int</span> $id): <span class="text-amber-300">User</span></p>
        <p class="pl-4">{</p>
        <p class="pl-8"><span class="text-violet-400">return</span> $this-&gt;<span class="text-sky-300">users</span>-&gt;<span class="text-sky-300">find</span>($id);</p>
        <p class="pl-4">}</p>
        <p>}</p>
      </div>
    </div>
  </div>
</template>
