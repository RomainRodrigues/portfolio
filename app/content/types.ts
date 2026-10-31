// Structure du contenu traduisible : fr.ts et en.ts doivent la respecter
// (TypeScript signale toute clé manquante).

export type ProjectId = 'chatlive' | 'claude-tips' | 'php-cs-fixer-docker' | 'scanner'

export interface Experience {
  period: string
  title: string
  place: string
  text: string
  current?: boolean
}

export interface Content {
  meta: { title: string, description: string }
  nav: { about: string, journey: string, skills: string, projects: string, contact: string }
  hero: { role: string, tagline: string, scroll: string }
  about: { label: string, text: string }
  process: { title: string, text: string }[]
  journey: { label: string, titleLine1: string, titleLine2: string, items: Experience[] }
  skills: { titleBefore: string, titleHighlight: string, groups: { label: string, items: string[] }[] }
  projects: {
    label: string
    title: string
    intro: string
    viewSite: string
    sourceCode: string
    items: Record<ProjectId, { category: string, description: string }>
  }
  end: { title: string, text: string, download: string }
  recap: { pageTitle: string, profile: string, journey: string, projects: string, skills: string, process: string }
}
