import MapEmbed from '@/components/MapEmbed'

export const metadata = { title: 'Mapa | Graffiti y Memoria' }

export default function MapaPage() {
  return (
    <section className="container-max py-8 space-y-6">
      <header>
        <h2 className="graffiti-title text-4xl">Mapa</h2>
        <p className="text-zinc-400">Explora los puntos por ciudad. (Iframe de OSM sin permisos)</p>
      </header>
      <div className="card p-2">
        <MapEmbed />
      </div>
    </section>
  )
}
