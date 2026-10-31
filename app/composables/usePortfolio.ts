import en from '~/content/en'
import fr from '~/content/fr'
import { identity, projectsMeta, recapPdfPath } from '~/content/shared'
import type { Content } from '~/content/types'

const contents: Record<string, Content> = { fr, en }

/** Contenu du portfolio dans la langue courante. */
export function usePortfolio() {
  const { locale } = useI18n()

  return computed(() => {
    const t = contents[locale.value] ?? fr
    return {
      ...t,
      identity,
      pdf: recapPdfPath(locale.value),
      // Fusionne les infos communes (liens, technos…) avec les textes traduits.
      projectList: projectsMeta.map(meta => ({ ...meta, ...t.projects.items[meta.id] })),
    }
  })
}
