<script setup lang="ts">
import gsap from 'gsap'
import { process } from '~/data/portfolio'

/*
 * Équivalent « sans assets » des séquences d'images d'Apple : un nuage de particules
 * dessiné dans un canvas, dont la forme (sphère → tore → vague) et la rotation
 * sont pilotées par le scroll.
 */

const root = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const reducedMotion = ref(false)

const COUNT = 1600
const state = { morphA: 0, morphB: 0, rotY: 0, rotX: 0.35 }

type Shape = Float32Array
let shapes: [Shape, Shape, Shape] | null = null

function buildShapes(): [Shape, Shape, Shape] {
  const sphere = new Float32Array(COUNT * 3)
  const torus = new Float32Array(COUNT * 3)
  const wave = new Float32Array(COUNT * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  const side = Math.ceil(Math.sqrt(COUNT))

  for (let i = 0; i < COUNT; i++) {
    const o = i * 3
    // Sphère (répartition de Fibonacci)
    const y = 1 - (i / (COUNT - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    sphere[o] = Math.cos(theta) * r
    sphere[o + 1] = y
    sphere[o + 2] = Math.sin(theta) * r

    // Tore
    const u = (i / COUNT) * Math.PI * 2 * 40
    const v = (i / COUNT) * Math.PI * 2
    torus[o] = (1 + 0.38 * Math.cos(u)) * Math.cos(v)
    torus[o + 1] = 0.38 * Math.sin(u)
    torus[o + 2] = (1 + 0.38 * Math.cos(u)) * Math.sin(v)

    // Vague (grille ondulée)
    const gx = ((i % side) / (side - 1)) * 2.8 - 1.4
    const gz = (Math.floor(i / side) / (side - 1)) * 2.8 - 1.4
    wave[o] = gx
    wave[o + 1] = Math.sin(gx * 2.5) * Math.cos(gz * 2.5) * 0.3
    wave[o + 2] = gz
  }
  return [sphere, torus, wave]
}

function draw() {
  const el = canvas.value
  if (!el || !shapes) return
  const ctx = el.getContext('2d')!
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = el.clientWidth
  const h = el.clientHeight
  if (el.width !== Math.round(w * dpr) || el.height !== Math.round(h * dpr)) {
    el.width = Math.round(w * dpr)
    el.height = Math.round(h * dpr)
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)

  const [a, b, c] = shapes
  const size = Math.min(w, h) * 0.32
  const cx = w / 2
  const cy = h / 2
  const cosY = Math.cos(state.rotY), sinY = Math.sin(state.rotY)
  const cosX = Math.cos(state.rotX), sinX = Math.sin(state.rotX)

  for (let i = 0; i < COUNT; i++) {
    const o = i * 3
    // Interpolation entre les trois formes
    let x = a[o]! + (b[o]! - a[o]!) * state.morphA
    let y = a[o + 1]! + (b[o + 1]! - a[o + 1]!) * state.morphA
    let z = a[o + 2]! + (b[o + 2]! - a[o + 2]!) * state.morphA
    x += (c[o]! - x) * state.morphB
    y += (c[o + 1]! - y) * state.morphB
    z += (c[o + 2]! - z) * state.morphB

    // Rotation Y puis X
    const x1 = x * cosY - z * sinY
    const z1 = x * sinY + z * cosY
    const y1 = y * cosX - z1 * sinX
    const z2 = y * sinX + z1 * cosX

    // Projection en perspective
    const p = 3 / (3 + z2)
    const depth = (1 - z2) / 2 // 0 = loin, 1 = proche
    const hue = 210 + (x1 + 1) * 35 // du bleu au violet
    ctx.fillStyle = `hsla(${hue}, 95%, ${55 + depth * 25}%, ${0.25 + depth * 0.75})`
    const s = 1 + depth * 1.6
    ctx.fillRect(cx + x1 * size * p - s / 2, cy + y1 * size * p - s / 2, s, s)
  }
}

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  shapes = buildShapes()
  resizeObserver = new ResizeObserver(draw)
  resizeObserver.observe(canvas.value!)
})
onBeforeUnmount(() => resizeObserver?.disconnect())

useScrollAnimation(root, ({ reduced }) => {
  reducedMotion.value = reduced
  if (reduced) {
    draw()
    return
  }

  const captions = gsap.utils.toArray<HTMLElement>('[data-caption]')
  gsap.set(captions, { autoAlpha: 0, y: 40 })

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    onUpdate: draw,
    scrollTrigger: { trigger: root.value, start: 'top top', end: '+=300%', scrub: 1, pin: true },
  })

  tl.to(state, { rotY: Math.PI * 2.5, rotX: 0.9, duration: 3 }, 0)
    .to(state, { morphA: 1, duration: 0.8, ease: 'power2.inOut' }, 1)
    .to(state, { morphB: 1, duration: 0.8, ease: 'power2.inOut' }, 2)

  captions.forEach((caption, i) => {
    tl.to(caption, { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power2.out' }, i + 0.1)
    if (i < captions.length - 1) {
      tl.to(caption, { autoAlpha: 0, y: -40, duration: 0.25, ease: 'power2.in' }, i + 0.85)
    }
  })

  draw()
})
</script>

<template>
  <section ref="root" class="relative h-svh overflow-hidden">
    <canvas ref="canvas" class="absolute inset-0 size-full" aria-hidden="true" />
    <div
      class="pointer-events-none absolute inset-x-0 bottom-[10svh] px-6"
      :class="reducedMotion ? 'flex flex-col items-center gap-6 sm:flex-row sm:justify-center' : ''"
    >
      <div
        v-for="step in process"
        :key="step.title"
        data-caption
        class="mx-auto max-w-md text-center"
        :class="reducedMotion ? '' : 'absolute inset-x-0 bottom-0'"
      >
        <h2 class="text-4xl font-semibold tracking-tight sm:text-6xl">{{ step.title }}</h2>
        <p class="mt-3 text-lg text-ink/70">{{ step.text }}</p>
      </div>
    </div>
  </section>
</template>
