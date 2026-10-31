export const profile = {
  firstName: 'Romain',
  lastName: 'Rodrigues',
  role: 'Concepteur-développeur',
  tagline: "Je conçois et développe des applications web, de l'idée à la mise en production.",
  manifesto:
    "Développeur web avant tout, j'aime toucher à tout : le front, le back, l'infra et la gestion de projet. Ce qui me motive, c'est de transformer une idée en un produit concret, propre et agréable à utiliser.",
  // TODO : remplacer par la vraie adresse
  email: 'contact@exemple.fr',
  socials: [
    { label: 'GitHub', href: 'https://github.com/RomainRodrigues' },
    // TODO : ajouter LinkedIn
  ],
}

export const process = [
  { title: 'Concevoir.', text: "Comprendre le besoin, poser l'architecture, dessiner l'expérience." },
  { title: 'Développer.', text: 'Un code typé, testé et maintenable, avec Vue et Nuxt au cœur.' },
  { title: 'Piloter.', text: "Cadrer, coordonner et livrer. Du ticket jusqu'à la mise en production." },
]

export interface Experience {
  period: string
  title: string
  place: string
  text: string
  current?: boolean
}

// TODO : vérifier les années
export const experience: Experience[] = [
  {
    period: '2021 — 2023',
    title: 'BUT Informatique',
    place: 'IUT de Lannion',
    text: "Deux années pour poser des bases solides : algorithmique, bases de données, développement web.",
  },
  {
    period: '2022 — 2026',
    title: 'Alternance',
    place: 'Cooperl',
    text: "Quatre ans d'alternance en tant que développeur, sur des projets concrets, en équipe et en production.",
  },
  {
    period: '2023 — 2026',
    title: "Diplôme d'ingénieur informatique",
    place: 'ENSSAT, Lannion',
    text: "Une formation généraliste en informatique, menée en parallèle de l'alternance, avec une spécialisation en intelligence artificielle en dernière année.",
  },
  {
    period: 'Depuis sept. 2026',
    title: 'Concepteur-développeur & chef de projet junior',
    place: 'Cooperl — CDI',
    text: 'Je conçois et développe des applications, et je pilote des projets de bout en bout.',
    current: true,
  },
]

// Un groupe par domaine (une rangée défilante chacun sur le site).
export const skillGroups = [
  { label: 'Web', items: ['Vue', 'Nuxt', 'TypeScript', 'JavaScript', 'Tailwind', 'Nuxt UI', 'GSAP', 'React'] },
  { label: 'Back & outillage', items: ['Node.js', 'Express', 'PHP', 'PostgreSQL', 'Drizzle', 'Docker', 'Git', 'CI/CD'] },
  { label: 'Fondamentaux', items: ['Python', 'C', 'Rust', 'Intelligence artificielle', 'Algorithmique', 'Gestion de projet'] },
]

/** Fichier PDF récapitulatif, généré par `npm run pdf` depuis la page /recap. */
export const recapPdf = '/romain-rodrigues-recap.pdf'

export type ProjectVisual =
  | { kind: 'image', src: string, alt: string }
  | { kind: 'chat' | 'terminal' | 'code' | 'scanner' }

export interface Project {
  title: string
  category: string
  year: string
  description: string
  stack: string[]
  github?: string
  url?: string
  visual: ProjectVisual
}

export const projects: Project[] = [
  {
    title: 'ChatLive',
    category: 'Messagerie instantanée',
    year: '2026',
    description: 'Une messagerie en temps réel inspirée de Discord et Slack, avec serveurs, salons, authentification et mode sombre.',
    stack: ['Nuxt 4', 'Nuxt UI', 'Drizzle', 'PostgreSQL'],
    github: 'https://github.com/RomainRodrigues/ChatLive',
    visual: { kind: 'chat' },
  },
  {
    title: 'Claude Tips',
    category: 'Documentation',
    year: '2026',
    description: 'Un guide pédagogique en français sur Claude Code, rédigé avec Claude Code lui-même grâce à plusieurs agents en parallèle.',
    stack: ['Nuxt Content', 'Nuxt UI', 'Cloudflare'],
    github: 'https://github.com/RomainRodrigues/claude-tips',
    url: 'https://claude.romrd.fr',
    visual: { kind: 'terminal' },
  },
  {
    title: 'PHP CS Fixer Docker',
    category: 'Extension VS Code',
    year: '2026',
    description: 'Formate le PHP avec PHP CS Fixer directement dans les conteneurs Docker, avec une seule configuration globale.',
    stack: ['TypeScript', 'VS Code API', 'Docker'],
    github: 'https://github.com/RomainRodrigues/php-cs-fixer-docker-ext',
    visual: { kind: 'code' },
  },
  {
    title: 'Scanner',
    category: 'Librairie Rust · en cours',
    year: '2026',
    description: 'Un moteur de lecture de QR codes et codes-barres en Rust, pensé pour le flux caméra en temps réel et utilisable depuis Node.js ou le navigateur via WebAssembly.',
    stack: ['Rust', 'WebAssembly', 'napi-rs'],
    visual: { kind: 'scanner' },
  },
]
