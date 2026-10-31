import gsap from 'gsap'
import type { Ref } from 'vue'

interface AnimationContext {
  /** true si l'utilisateur a demandé à réduire les animations */
  reduced: boolean
}

/**
 * Déclare les animations GSAP d'un composant, limitées à `scope`.
 * Tout (tweens, ScrollTriggers, SplitText) est nettoyé automatiquement au démontage
 * et rejoué si la préférence prefers-reduced-motion change.
 */
export function useScrollAnimation(
  scope: Ref<HTMLElement | null>,
  setup: (ctx: AnimationContext) => void | (() => void),
) {
  let mm: gsap.MatchMedia | undefined

  onMounted(() => {
    if (!scope.value) return
    mm = gsap.matchMedia(scope.value)
    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => setup({ reduced: Boolean(context.conditions?.reduced) }),
    )
  })

  onBeforeUnmount(() => mm?.revert())
}
