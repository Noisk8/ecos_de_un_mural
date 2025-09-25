import dynamic from 'next/dynamic'
import { graffitis } from '@/data/graffitis'
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), { ssr: false })
const WikidataEcosystemsMap = dynamic(() => import('@/components/WikidataEcosystemsMap'), { ssr: false })

export const metadata = { title: 'Mapa | Graffiti y Memoria' }

export default function MapaPage() {
  const points = graffitis.map((g, idx) => ({
    id: `${g.city}-${g.slug}-${idx}`,
    title: g.title,
    description: g.context,
    lat: g.coords[0],
    lng: g.coords[1],
    city: g.city,
    slug: g.slug,
    imageUrl: g.image,
  }))
  // Colombia approximate bounds: [southWest, northEast]
  const colombiaBounds: [[number, number], [number, number]] = [
    [ -4.5, -79.1 ], // SW
    [ 13.5, -66.8 ], // NE
  ]
  return (
    <section className="container-max py-8 space-y-6">
      <header>
        <h2 className="graffiti-title text-4xl">Mapa</h2>
        <p className="text-zinc-400">Explora los puntos por ciudad.</p>
      </header>
      <div className="card p-2">
        <InteractiveMap points={points} bounds={colombiaBounds} />
      </div>

      <section className="space-y-2">
        <h3 className="graffiti-title text-2xl">Mapa de prueba (Wikidata: ecosistemas)</h3>
        <p className="text-zinc-400">Puntos cargados en vivo desde Wikidata (consulta SPARQL) para ecosistemas en Colombia.</p>
        <WikidataEcosystemsMap />
      </section>
    </section>
  )
}
