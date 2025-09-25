import { NextResponse } from 'next/server'

// Esta ruta ejecuta una consulta SPARQL contra Wikidata para obtener
// elementos ubicados en Colombia que tengan coordenadas (P625) y, si existe,
// una imagen (P18). Luego transforma el resultado al formato Point[] que usa el mapa
// y trata de resolver una miniatura desde Wikimedia Commons.

// Punto de ejemplo: ecosistemas en Colombia con coordenadas
// Nota: Ajusta la consulta para tu caso real (clases, filtros, límites)
// Consulta SPARQL: item + etiqueta + descripción + coordenadas + imagen (opcional)
const SPARQL = `
SELECT ?item ?itemLabel ?itemDescription ?coord ?image WHERE {
  ?item wdt:P625 ?coord .
  ?item wdt:P17 wd:Q739 .        # País: Colombia
  OPTIONAL { ?item wdt:P18 ?image } # Imagen del ítem (si existe)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "es,en". }
}
LIMIT 150
`

// Estructura parcial de cada binding de Wikidata que consumimos
type Binding = {
  item: { value: string }
  itemLabel?: { value: string }
  itemDescription?: { value: string }
  coord: { value: string } // Point(lon lat)
  image?: { value: string } // URL o título de Commons
}

// Método GET: retorna { points } listos para el mapa
export async function GET() {
  try {
    // Llamada al endpoint SPARQL de Wikidata
    const res = await fetch('https://query.wikidata.org/sparql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-query',
        'Accept': 'application/sparql-results+json',
        // Etiqueta de cortesía según política de Wikidata
        'User-Agent': 'graffiti-y-memoria/0.1 (contacto-proyecto@example.com)'
      },
      body: SPARQL,
      // Next fetch options para cacheado si se desea:
      // @ts-ignore
      next: { revalidate: 60 * 60 } // 1h
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'wikidata_error', status: res.status }, { status: 500 })
    }
    const json = await res.json()
    const bindings: Binding[] = json.results.bindings

    const thumbUrls: Record<string, string | undefined> = {}

    // Prepara títulos de Commons si la imagen viene como URL de entidad o filename
    const imageTitles = bindings
      .map((b) => b.image?.value)
      .filter(Boolean)
      .map((u) => {
        // Si ya es una URL directa (raramente en P18), se usará tal cual
        // Si es un archivo/título, normalizamos a 'File:<name>'
        try {
          const url = new URL(u as string)
          const path = decodeURIComponent(url.pathname)
          const last = path.split('/').pop() || ''
          if (last) return `File:${last}`
        } catch {
          // No era URL, puede ser ya un nombre de archivo/título
        }
        const raw = (u as string).replace(/^File:/i, '')
        return `File:${raw}`
      })

    // Si tenemos títulos, consultamos MediaWiki para thumbs de ~720px de ancho
    if (imageTitles.length) {
      const titlesParam = encodeURIComponent(imageTitles.join('|'))
      const commons = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&iiurlwidth=720&format=json&origin=*&titles=${titlesParam}`
      )
      if (commons.ok) {
        const cj = await commons.json()
        const pages = cj?.query?.pages ?? {}
        Object.values<any>(pages).forEach((p) => {
          const ii = p?.imageinfo?.[0]
          if (ii?.thumburl) {
            thumbUrls[p.title] = ii.thumburl as string
          }
        })
      }
    }

    // Mapeo a Point[] consumido por el componente del mapa
    const points = bindings
      .map((b) => {
        const m = /Point\(([-0-9.]+) ([-0-9.]+)\)/.exec(b.coord.value)
        if (!m) return null
        const lng = parseFloat(m[1])
        const lat = parseFloat(m[2])
        const id = b.item.value.replace('http://www.wikidata.org/entity/', '')
        const itemUrl = `https://www.wikidata.org/wiki/${id}`

        // Resuelve thumb si hay imagen
        let imageUrl: string | undefined
        if (b.image?.value) {
          try {
            const url = new URL(b.image.value)
            // Si es URL directa
            imageUrl = url.toString()
          } catch {
            const title = `File:${b.image.value.replace(/^File:/i, '')}`
            imageUrl = thumbUrls[title]
          }
        }
        return {
          id,
          title: b.itemLabel?.value ?? id,
          lat,
          lng,
          description: b.itemDescription?.value,
          imageUrl,
          sourceUrl: itemUrl,
        }
      })
      .filter(Boolean)

    return NextResponse.json({ points })
  } catch (err) {
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}


