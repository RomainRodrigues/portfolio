// Contenu commun à toutes les langues (rien à traduire ici).
import type { ProjectId } from './types'

export const identity: {
  firstName: string
  lastName: string
  /** Optionnel : si renseigné, il s'affiche en fin de page et dans le PDF. */
  email?: string
  socials: { label: string, href: string }[]
} = {
  firstName: 'Romain',
  lastName: 'Rodrigues',
  socials: [
    { label: 'GitHub', href: 'https://github.com/RomainRodrigues' },
  ],
}

export type ProjectVisual =
  | { kind: 'image', src: string, alt: string }
  | { kind: 'chat' | 'terminal' | 'code' | 'scanner' }

export interface ProjectMeta {
  id: ProjectId
  title: string
  year: string
  stack: string[]
  github?: string
  url?: string
  visual: ProjectVisual
}

// L'ordre de ce tableau est l'ordre d'affichage des projets.
export const projectsMeta: ProjectMeta[] = [
  {
    id: 'chatlive',
    title: 'ChatLive',
    year: '2026',
    stack: ['Nuxt 4', 'Nuxt UI', 'Drizzle', 'PostgreSQL'],
    github: 'https://github.com/RomainRodrigues/ChatLive',
    visual: { kind: 'chat' },
  },
  {
    id: 'claude-tips',
    title: 'Claude Tips',
    year: '2026',
    stack: ['Nuxt Content', 'Nuxt UI', 'Cloudflare'],
    github: 'https://github.com/RomainRodrigues/claude-tips',
    url: 'https://claude.romrd.fr',
    visual: { kind: 'terminal' },
  },
  {
    id: 'php-cs-fixer-docker',
    title: 'PHP CS Fixer Docker',
    year: '2026',
    stack: ['TypeScript', 'VS Code API', 'Docker'],
    github: 'https://github.com/RomainRodrigues/php-cs-fixer-docker-ext',
    visual: { kind: 'code' },
  },
  {
    id: 'scanner',
    title: 'Scanner',
    year: '2026',
    stack: ['Rust', 'WebAssembly', 'napi-rs'],
    // Dépôt privé : pas de lien
    visual: { kind: 'scanner' },
  },
]

/** Chemin du PDF récapitulatif d'une langue (généré par `npm run pdf`). */
export const recapPdfPath = (locale: string) => `/romain-rodrigues-recap-${locale}.pdf`
