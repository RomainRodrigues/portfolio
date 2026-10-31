# Portfolio

Portfolio avec des animations au scroll inspirées d'Apple.

## Stack

- **Nuxt 4**, en génération statique (`nuxt generate`)
- **GSAP + ScrollTrigger + SplitText** pour les animations au scroll
- **Lenis** pour le scroll fluide
- **Tailwind CSS v4**

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # site statique dans .output/public
npm run pdf        # régénère le PDF récapitulatif (public/romain-rodrigues-recap.pdf)
```

> Après chaque modification de `app/data/portfolio.ts`, relancer `npm run pdf` et commiter le PDF.
> En local, Playwright a besoin de Chromium : `npx playwright install chromium` (une seule fois).

## Structure

| Fichier | Rôle |
|---|---|
| `app/data/portfolio.ts` | **Tout le contenu** (textes, parcours, compétences, projets), utilisé par le site et par le PDF |
| `app/plugins/gsap.client.ts` | Enregistrement des plugins GSAP et du scroll fluide Lenis |
| `app/composables/useScrollAnimation.ts` | Gère les animations d'un composant : nettoyage automatique et respect de `prefers-reduced-motion` |
| `app/components/HeroSection.vue` | Titre lettre par lettre, recul et flou au scroll |
| `app/components/ManifestoSection.vue` | Texte qui s'illumine mot par mot |
| `app/components/ProcessSection.vue` | Particules en canvas qui changent de forme au scroll (sphère, puis tore, puis vague) |
| `app/components/SkillsSection.vue` | Panneau qui s'ouvre en plein écran et rangées de compétences défilantes |
| `app/components/ProjectsSection.vue` | Galerie horizontale épinglée, avec parallaxe |
| `app/components/TimelineSection.vue` | Parcours : ligne de progression et étapes qui s'allument |
| `app/components/EndSection.vue` | « Fin. » et bouton de téléchargement du PDF récapitulatif |
| `app/pages/recap.vue` | Page A4 imprimable qui sert à générer le PDF |
| `scripts/generate-pdf.mjs` | Imprime `/recap` en PDF avec Playwright |

## Accessibilité

Si l'utilisateur a activé « réduire les animations », les animations au scroll sont désactivées et tout le contenu reste lisible.
