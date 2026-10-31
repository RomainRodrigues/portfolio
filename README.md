# Portfolio

Portfolio avec des animations au scroll inspirées d'Apple, en français et en anglais.

- Version française : `/`
- Version anglaise : `/en`
- Récapitulatif PDF téléchargeable en fin de page (un par langue)

## Stack

- **Nuxt 4**, en génération statique (`nuxt generate`)
- **@nuxtjs/i18n** pour le français et l'anglais
- **GSAP + ScrollTrigger + SplitText** pour les animations au scroll
- **Lenis** pour le scroll fluide
- **Tailwind CSS v4**
- **Playwright** pour générer les PDF

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000 (anglais : http://localhost:3000/en)
```

## Commandes

| Commande | Ce qu'elle fait |
|---|---|
| `npm run dev` | Serveur de développement avec rechargement automatique |
| `npm run generate` | Construit le site statique dans `.output/public` |
| `npm run pdf` | Construit le site **puis** régénère les deux PDF dans `public/` |
| `npm run preview` | Sert le site construit, pour le tester comme en production |

---

## Modifier le contenu

Tout le contenu se trouve dans **`app/content/`**. Les composants ne contiennent aucun texte en dur.

| Fichier | Contenu |
|---|---|
| `app/content/fr.ts` | Tous les textes en **français** |
| `app/content/en.ts` | Tous les textes en **anglais** |
| `app/content/shared.ts` | Ce qui ne se traduit pas : nom, email, réseaux sociaux, et pour chaque projet son titre, son année, ses technos, ses liens et son visuel |
| `app/content/types.ts` | La structure commune aux deux langues |

`fr.ts` et `en.ts` doivent avoir exactement la même structure. Si une clé manque dans l'un des deux, `npx nuxi typecheck` et l'éditeur le signalent.

### Exemples

- **Changer un texte** : modifie-le dans `fr.ts` **et** dans `en.ts`.
- **Changer l'email ou ajouter LinkedIn** : `identity` dans `shared.ts`.
- **Ajouter un projet** :
  1. Ajoute son identifiant dans `ProjectId` (`types.ts`), par exemple `'mon-projet'`.
  2. Ajoute une entrée dans `projectsMeta` (`shared.ts`) avec titre, année, technos, liens et visuel. L'ordre du tableau est l'ordre d'affichage.
  3. Ajoute `category` et `description` sous `projects.items['mon-projet']`, dans `fr.ts` **et** dans `en.ts`.
- **Retirer un projet** : fais l'inverse, aux trois mêmes endroits.

---

## Mettre à jour le PDF récapitulatif

### Pourquoi c'est nécessaire

Le bouton « Télécharger le récap » propose un **fichier PDF déjà généré**, rangé dans `public/` :

- `public/romain-rodrigues-recap-fr.pdf`
- `public/romain-rodrigues-recap-en.pdf`

Ces fichiers ne se mettent **pas** à jour tout seuls. Quand tu modifies le contenu, le site change immédiatement, mais les PDF gardent l'ancienne version tant que tu ne les régénères pas.

### Comment ils sont fabriqués

1. Le PDF est construit à partir des pages **`/recap`** (français) et **`/en/recap`** (anglais), au format A4. Elles utilisent les mêmes fichiers `app/content/` que le site : il n'y a rien à ressaisir.
2. `npm run pdf` construit le site, ouvre ces deux pages dans un navigateur invisible (Playwright) et les « imprime » en PDF dans `public/`.

Tu peux ouvrir http://localhost:3000/recap pendant `npm run dev` pour voir le rendu du PDF en direct.

### La procédure, à chaque modification de contenu

**Une seule fois sur ta machine**, installe le navigateur utilisé par Playwright :

```bash
npx playwright install chromium
```

**Ensuite, à chaque modification de contenu :**

1. Modifie `app/content/fr.ts`, `en.ts` ou `shared.ts`.
2. Vérifie le rendu avec `npm run dev`, sur le site et sur `/recap` et `/en/recap`.
3. Régénère les PDF :
   ```bash
   npm run pdf
   ```
   Le terminal doit afficher :
   ```
   PDF généré : public/romain-rodrigues-recap-fr.pdf
   PDF généré : public/romain-rodrigues-recap-en.pdf
   ```
4. Commite le contenu **et** les PDF ensemble :
   ```bash
   git add app/content public/*.pdf
   git commit -m "Mise à jour du contenu"
   git push
   ```

### Si le terminal affiche « contenu trop long, réduit à XX % »

Le récap doit tenir sur **une seule page A4**. S'il déborde, le script le réduit automatiquement pour qu'il rentre, mais le texte devient plus petit. Au-delà d'environ 95 %, mieux vaut raccourcir des descriptions ou retirer un élément.

---

## Structure du code

| Fichier | Rôle |
|---|---|
| `app/content/` | **Tout le contenu** (voir plus haut) |
| `app/composables/usePortfolio.ts` | Renvoie le contenu dans la langue courante |
| `app/plugins/gsap.client.ts` | Enregistre les plugins GSAP et le scroll fluide Lenis |
| `app/composables/useScrollAnimation.ts` | Gère les animations d'un composant : nettoyage automatique et respect de `prefers-reduced-motion` |
| `app/pages/index.vue` | Page d'accueil (assemble les sections) |
| `app/pages/recap.vue` | Page A4 imprimable qui sert à générer les PDF |
| `app/components/SiteHeader.vue` | Navigation et sélecteur de langue FR / EN |
| `app/components/HeroSection.vue` | Titre lettre par lettre, recul et flou au scroll |
| `app/components/ManifestoSection.vue` | Texte qui s'illumine mot par mot |
| `app/components/ProcessSection.vue` | Particules en canvas qui changent de forme au scroll (sphère, puis tore, puis vague) |
| `app/components/TimelineSection.vue` | Parcours : ligne de progression et étapes qui s'allument |
| `app/components/SkillsSection.vue` | Panneau qui s'ouvre en plein écran et rangées de compétences défilantes |
| `app/components/ProjectsSection.vue` | Galerie horizontale épinglée, avec parallaxe |
| `app/components/ProjectVisual.vue` | Visuels des projets (capture ou maquette en CSS) |
| `app/components/EndSection.vue` | « Fin. » et bouton de téléchargement du PDF |
| `scripts/generate-pdf.mjs` | Imprime `/recap` et `/en/recap` en PDF |

### Bonne pratique pour les animations

Ne mets jamais une animation GSAP et une transition CSS (`transition-transform`, `hover:scale-…`) sur **le même élément** : elles se gênent. Mets l'animation GSAP sur un conteneur et la transition CSS sur l'élément à l'intérieur (voir `EndSection.vue` et `ProjectsSection.vue`).

## Accessibilité

Si l'utilisateur a activé « réduire les animations », les animations au scroll sont désactivées et tout le contenu reste lisible.

## Déploiement

L'URL publique du site est définie dans `nuxt.config.ts` (`i18n.baseUrl`, `https://romrd.fr` par défaut). Elle sert aux liens SEO entre langues. Pour la changer sans toucher au code, définis la variable d'environnement `NUXT_PUBLIC_SITE_URL`.
