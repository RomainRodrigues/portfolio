import type { Content } from './types'

export default {
  meta: {
    title: 'Romain Rodrigues — Portfolio',
    description: 'Portfolio de Romain Rodrigues, concepteur-développeur web.',
  },
  nav: { about: 'À propos', journey: 'Parcours', skills: 'Compétences', projects: 'Projets', contact: 'Contact' },
  hero: {
    role: 'Concepteur-développeur',
    tagline: "Je conçois et développe des applications web, de l'idée à la mise en production.",
    scroll: 'Scroll',
  },
  about: {
    label: 'À propos',
    text: "Développeur web avant tout, j'aime toucher à tout : le front, le back, l'infra et la gestion de projet. Ce qui me motive, c'est de transformer une idée en un produit concret, propre et agréable à utiliser.",
  },
  process: [
    { title: 'Concevoir.', text: "Comprendre le besoin, poser l'architecture, dessiner l'expérience." },
    { title: 'Développer.', text: 'Un code typé, testé et maintenable, avec Vue et Nuxt au cœur.' },
    { title: 'Piloter.', text: "Cadrer, coordonner et livrer. Du ticket jusqu'à la mise en production." },
  ],
  journey: {
    label: 'Parcours',
    titleLine1: "Formé à l'école.",
    titleLine2: 'Forgé sur le terrain.',
    // TODO : vérifier les années
    items: [
      {
        period: '2021 — 2023',
        title: 'BUT Informatique',
        place: 'IUT de Lannion',
        text: 'Deux années pour poser des bases solides : algorithmique, bases de données, développement web.',
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
    ],
  },
  skills: {
    titleBefore: 'Ma',
    titleHighlight: 'boîte à outils',
    groups: [
      { label: 'Web', items: ['Vue', 'Nuxt', 'TypeScript', 'JavaScript', 'Tailwind', 'Nuxt UI', 'GSAP', 'React'] },
      { label: 'Back & outillage', items: ['Node.js', 'Express', 'PHP', 'PostgreSQL', 'Drizzle', 'Docker', 'Git', 'CI/CD'] },
      { label: 'Fondamentaux', items: ['Python', 'C', 'Rust', 'Intelligence artificielle', 'Algorithmique', 'Gestion de projet'] },
    ],
  },
  projects: {
    label: 'Projets',
    title: 'Sélection de travaux.',
    intro: 'Des projets perso, du front au back en passant par l’outillage. Continue de scroller.',
    viewSite: 'Voir le site',
    sourceCode: 'Code source',
    items: {
      'chatlive': {
        category: 'Messagerie instantanée',
        description: 'Une messagerie en temps réel inspirée de Discord et Slack, avec serveurs, salons, authentification et mode sombre.',
      },
      'claude-tips': {
        category: 'Documentation',
        description: 'Un guide pédagogique en français sur Claude Code, rédigé avec Claude Code lui-même grâce à plusieurs agents en parallèle.',
      },
      'php-cs-fixer-docker': {
        category: 'Extension VS Code',
        description: 'Formate le PHP avec PHP CS Fixer directement dans les conteneurs Docker, avec une seule configuration globale.',
      },
      'scanner': {
        category: 'Librairie Rust · en cours',
        description: 'Un moteur de lecture de QR codes et codes-barres en Rust, pensé pour le flux caméra en temps réel et utilisable depuis Node.js ou le navigateur via WebAssembly.',
      },
    },
  },
  end: {
    title: 'Fin.',
    text: "Merci d'avoir scrollé jusqu'ici. Tout ce que vous venez de voir tient sur une seule page.",
    download: 'Télécharger le récap (PDF)',
  },
  recap: {
    pageTitle: 'Récapitulatif',
    profile: 'Profil',
    journey: 'Parcours',
    projects: 'Projets',
    skills: 'Compétences',
    process: 'Façon de travailler',
  },
} satisfies Content
