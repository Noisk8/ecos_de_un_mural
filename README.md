# Ecos de un mural

Memorial digital colaborativo que documenta murales y expresiones de arte urbano en Colombia utilizando el ecosistema Wikimedia (Commons + Wikidata) como base de conocimiento.

## Árbol del proyecto

```
ecos_de_un_mural/
├── app/
│   ├── [city]/[slug]/page.tsx
│   ├── api/wikidata/ecosistemas/route.ts
│   ├── escena-3d/page.tsx
│   ├── explorar/page.tsx
│   ├── mapa/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AudioPlayer.tsx
│   ├── ExplorerClient.tsx
│   ├── Footer.tsx
│   ├── GraffitiCard.tsx
│   ├── InteractiveMap.tsx
│   ├── MapEmbed.tsx
│   ├── MediaGallery.tsx
│   ├── NavBar.tsx
│   └── WikidataEcosystemsMap.tsx
├── data/
│   └── graffitis.ts
├── docs/
│   └── Mapa.md
├── lib/
│   ├── commons.ts
│   └── types.ts
├── public/
│   ├── bogota/
│   │   ├── 3.jpg
│   │   └── 4.jpeg
│   └── medellin/
│       └── fondoMDE.jpg
├── Task.md
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Scripts disponibles

```bash
npm i
npm run dev
npm run build
```

## Recursos Wikimedia

- Categoría oficial en Commons para el proyecto: [Category:Ecos de un mural](https://commons.wikimedia.org/wiki/Category:Ecos_de_un_mural). Úsala como punto de partida en consultas SPARQL para filtrar obras relacionadas antes de procesar metadatos en la API interna.
- Cada archivo nuevo que se suba a la categoría, con coordenadas en Medellín o Bogotá, se sincroniza automáticamente: se mostrará en `/explorar`, `/mapa` y tendrá página propia bajo `/{city}/{slug}` tras la siguiente revalidación (≈15 min).
