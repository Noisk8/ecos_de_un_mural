import dynamic from 'next/dynamic'
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), { ssr: false })
const WikidataEcosystemsMap = dynamic(() => import('@/components/WikidataEcosystemsMap'), { ssr: false })

export const metadata = { title: 'Mapa | Graffiti y Memoria' }

export default function MapaPage() {
  const points = [
    {
      id: 'memoria-viva',
      title: 'Memoria Viva — Universidad Nacional de Colombia (Medellín)',
      description:
        'Mural registrado en Wikimedia Commons. Forma parte de la Universidad Nacional de Colombia, sede Medellín.',
      lat: 6.26123,
      lng: -75.577675,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Unalmed_-_Mural_Memoria_Viva.jpg',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Unalmed_-_Mural_Memoria_Viva.jpg',
    },
    {
      id: 'memoria-viva-detalle',
      title: 'Memoria Viva (detalle) — Universidad Nacional de Colombia',
      description:
        'Detalle del mural “Memoria Viva” capturado para Wikimedia Commons. Resalta los elementos simbólicos de la obra.',
      lat: 6.26123,
      lng: -75.577675,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Unalmed_-_Mural_Memoria_Viva%2C_detalle.jpg',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Unalmed_-_Mural_Memoria_Viva,_detalle.jpg',
    },
    {
      id: 'murales-entrada-unal-2021-01',
      title: 'Murales en la entrada — Universidad Nacional Medellín (2021)',
      description:
        'Registro fotográfico de los murales ubicados en la entrada principal de la Universidad Nacional de Colombia, sede Medellín.',
      lat: 6.259804,
      lng: -75.579918,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Murales_en_la_entrada_a_la_Universidad_Nacional%2C_sede_Medell%C3%ADn_-_mayo_de_2021_-_01.jpg',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Murales_en_la_entrada_a_la_Universidad_Nacional,_sede_Medell%C3%ADn_-_mayo_de_2021_-_01.jpg',
    },
  ]
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
