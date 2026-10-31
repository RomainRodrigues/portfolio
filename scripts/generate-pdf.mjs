// Génère un PDF récapitulatif par langue à partir des pages /recap et /en/recap du site statique.
// Usage : npm run pdf  (lance d'abord `nuxt generate`)
import { createServer } from 'node:http'
import { readFile, copyFile } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { chromium } from 'playwright'

const root = resolve('.output/public')
// Une entrée par langue : page à imprimer → nom du fichier (voir recapPdfPath dans app/content/shared.ts)
const targets = [
  { page: '/recap/', file: 'romain-rodrigues-recap-fr.pdf' },
  { page: '/en/recap/', file: 'romain-rodrigues-recap-en.pdf' },
]
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp' }

// Mini serveur statique pour .output/public
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  if (path.endsWith('/')) path += 'index.html'
  try {
    const file = join(root, path)
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
    res.end(await readFile(file))
  }
  catch {
    res.writeHead(404).end()
  }
}).listen(0)

const { port } = server.address()
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  for (const { page: path, file } of targets) {
    const output = resolve('public', file)
    await page.goto(`http://localhost:${port}${path}`, { waitUntil: 'networkidle' })
    // Sécurité : si le contenu dépasse une page A4, on le réduit pour qu'il tienne sur une seule.
    const A4_HEIGHT = 1123 // 297 mm à 96 dpi, arrondi au pixel supérieur
    const height = await page.evaluate(() => document.querySelector('.recap').scrollHeight)
    const scale = Math.min(1, A4_HEIGHT / height)
    if (scale < 1) console.warn(`${file} : contenu trop long, réduit à ${(scale * 100).toFixed(1)} %`)
    await page.pdf({ path: output, format: 'A4', printBackground: true, scale, pageRanges: '1' })
    // Copie aussi dans le build pour qu'il soit à jour sans regénérer le site.
    await copyFile(output, join(root, file))
    console.log(`PDF généré : public/${file}`)
  }
}
finally {
  await browser.close()
  server.close()
}
