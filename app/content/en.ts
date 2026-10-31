import type { Content } from './types'

export default {
  meta: {
    title: 'Romain Rodrigues — Portfolio',
    description: 'Portfolio of Romain Rodrigues, web software engineer.',
  },
  nav: { about: 'About', journey: 'Journey', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
  hero: {
    role: 'Software engineer',
    tagline: 'I design and build web applications, from first idea to production.',
    scroll: 'Scroll',
  },
  about: {
    label: 'About',
    text: "A web developer at heart, I love working across the whole stack: front end, back end, infrastructure and project management. What drives me is turning an idea into a real product that is clean and a pleasure to use.",
  },
  process: [
    { title: 'Design.', text: 'Understand the need, shape the architecture, craft the experience.' },
    { title: 'Build.', text: 'Typed, tested and maintainable code, with Vue and Nuxt at its core.' },
    { title: 'Lead.', text: 'Scope, coordinate and ship. From the first ticket to production.' },
  ],
  journey: {
    label: 'Journey',
    titleLine1: 'Trained at school.',
    titleLine2: 'Forged in the field.',
    items: [
      {
        period: '2021 — 2023',
        title: 'Bachelor in Computer Science (BUT)',
        place: 'IUT de Lannion, France',
        text: 'Two years laying solid foundations: algorithms, databases and web development.',
      },
      {
        period: '2022 — 2026',
        title: 'Work-study program',
        place: 'Cooperl',
        text: 'Four years as an apprentice developer, working on real projects, in a team and in production.',
      },
      {
        period: '2023 — 2026',
        title: 'Engineering degree in Computer Science',
        place: 'ENSSAT, Lannion, France',
        text: "A broad, Master's-level engineering degree in computer science, completed alongside the work-study program, with a specialization in artificial intelligence in the final year.",
      },
      {
        period: 'Since Sept. 2026',
        title: 'Software engineer & junior project manager',
        place: 'Cooperl — Full-time',
        text: 'I design and build applications, and lead projects from start to finish.',
        current: true,
      },
    ],
  },
  skills: {
    titleBefore: 'My',
    titleHighlight: 'toolbox',
    groups: [
      { label: 'Web', items: ['Vue', 'Nuxt', 'TypeScript', 'JavaScript', 'Tailwind', 'Nuxt UI', 'GSAP', 'React'] },
      { label: 'Back end & tooling', items: ['Node.js', 'Express', 'PHP', 'PostgreSQL', 'Drizzle', 'Docker', 'Git', 'CI/CD'] },
      { label: 'Foundations', items: ['Python', 'C', 'Rust', 'Artificial intelligence', 'Algorithms', 'Project management'] },
    ],
  },
  projects: {
    label: 'Projects',
    title: 'Selected work.',
    intro: 'Side projects, from front end to back end and developer tooling. Keep scrolling.',
    viewSite: 'Visit site',
    sourceCode: 'Source code',
    items: {
      'chatlive': {
        category: 'Instant messaging',
        description: 'A real-time chat app inspired by Discord and Slack, with servers, channels, authentication and dark mode.',
      },
      'claude-tips': {
        category: 'Documentation',
        description: 'A beginner-friendly French guide to Claude Code, written with Claude Code itself using several agents in parallel.',
      },
      'php-cs-fixer-docker': {
        category: 'VS Code extension',
        description: 'Formats PHP with PHP CS Fixer right inside your Docker containers, with a single global configuration.',
      },
      'scanner': {
        category: 'Rust library · in progress',
        description: 'A QR code and barcode scanning engine written in Rust, built for real-time camera streams and usable from Node.js or the browser via WebAssembly.',
      },
    },
  },
  end: {
    title: 'The end.',
    text: "Thanks for scrolling all the way down. Everything you've just seen fits on a single page.",
    download: 'Download the summary (PDF)',
  },
  recap: {
    pageTitle: 'Summary',
    profile: 'Profile',
    journey: 'Journey',
    projects: 'Projects',
    skills: 'Skills',
    process: 'How I work',
  },
} satisfies Content
