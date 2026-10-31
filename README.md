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
| `npm run pdf` | Construit le site **puis** génère les deux PDF (fait automatiquement au déploiement) |
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

## Le PDF récapitulatif

### Comment ça marche

Le bouton « Télécharger le récap » propose un fichier PDF par langue :

- `romain-rodrigues-recap-fr.pdf`
- `romain-rodrigues-recap-en.pdf`

Ces fichiers **ne sont pas dans le dépôt**. Ils sont **générés automatiquement à chaque déploiement** (voir « Déploiement » plus bas), à partir des pages **`/recap`** (français) et **`/en/recap`** (anglais). Ces pages utilisent les mêmes fichiers `app/content/` que le site.

👉 **Tu n'as rien à faire.** Modifie le contenu, pousse sur `main` : le site **et** les PDF se mettent à jour ensemble.

### Voir le rendu du PDF en local

- **Le plus simple** : lance `npm run dev` et ouvre http://localhost:3000/recap ou http://localhost:3000/en/recap. C'est exactement ce qui sera imprimé dans le PDF.
- **Pour générer les vrais fichiers PDF en local** (facultatif) :
  ```bash
  npx playwright install chromium   # une seule fois sur ta machine
  npm run pdf
  ```
  Les fichiers sont créés dans `public/`. Ils sont ignorés par Git, tu ne peux donc pas les commiter par erreur.

En `npm run dev`, le bouton de téléchargement renvoie une erreur 404 tant que tu n'as pas lancé `npm run pdf` au moins une fois. C'est normal.

### Si le récap ne tient plus sur une page

Le récap doit tenir sur **une seule page A4**. S'il déborde, le script le réduit automatiquement et affiche « contenu trop long, réduit à XX % » (dans le terminal, ou dans les logs du déploiement sur GitHub). Au-delà d'environ 95 %, le texte devient trop petit : raccourcis des descriptions ou retire un élément.

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

Le site est hébergé sur **GitHub Pages**, à l'adresse **https://romrd.fr**.

### Ce qui se passe à chaque push sur `main`

Le workflow `.github/workflows/deploy.yml` se lance automatiquement et :

1. installe les dépendances et Chromium ;
2. construit le site statique ;
3. génère les deux PDF ;
4. publie le tout sur GitHub Pages.

Tu peux suivre son avancement dans l'onglet **Actions** du dépôt, et le relancer à la main avec le bouton **Run workflow**.

### Configuration initiale (une seule fois)

1. **Activer GitHub Pages** : sur GitHub, va dans **Settings → Pages** et choisis **GitHub Actions** dans *Build and deployment → Source*.
2. **Configurer le DNS dans Cloudflare** : modifie les deux enregistrements existants pour qu'ils pointent vers GitHub.

   | Type | Nom | Valeur | Proxy |
   |---|---|---|---|
   | CNAME | `romrd.fr` | `romainrodrigues.github.io` | DNS only (nuage gris) au début |
   | CNAME | `www` | `romainrodrigues.github.io` | DNS only (nuage gris) au début |

   Cloudflare accepte un CNAME sur le domaine racine : c'est le *CNAME flattening*. Ces deux CNAME remplacent les enregistrements A actuels.
   Ne touche pas aux autres sous-domaines (`bigdata`, `kohfrais`, `projetjs`…).
3. **Déclarer le domaine** : dans **Settings → Pages → Custom domain**, saisis `romrd.fr` et enregistre. Le fichier `public/CNAME` le déclare aussi à chaque déploiement. GitHub redirigera automatiquement `www.romrd.fr` vers `romrd.fr`.
4. **HTTPS** : une fois que GitHub affiche *DNS check successful* (de quelques minutes à quelques heures), attends que le certificat soit émis, puis coche **Enforce HTTPS**.
5. **Facultatif, remettre le proxy Cloudflare** (nuage orange) sur les deux enregistrements, comme pour les autres sous-domaines. Dans ce cas, le mode SSL/TLS de Cloudflare doit être **Full** ou **Full (strict)**, jamais *Flexible* : ce mode provoque des boucles de redirection avec *Enforce HTTPS*.

> Pourquoi le nuage gris au début ? Avec le proxy activé, GitHub ne voit que les IP de Cloudflare. Il ne peut alors ni vérifier le domaine ni émettre le certificat HTTPS.

### Changer d'adresse

Si le site change de domaine, mets à jour `public/CNAME` et `i18n.baseUrl` dans `nuxt.config.ts`. Cette URL sert aux liens SEO entre langues ; elle peut aussi être définie par la variable d'environnement `NUXT_PUBLIC_SITE_URL` au moment du build.
