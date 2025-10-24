import Link from 'next/link'
import Image from 'next/image'
import { getGraffitis } from '@/data/graffitis'
import GraffitiCard from '@/components/GraffitiCard'

export default async function HomePage() {
  const graffitis = await getGraffitis()
  const medellin = graffitis.filter((g) => g.city === 'medellin')
  const bogota = graffitis.filter((g) => g.city === 'bogota')

  const citySections = [
    {
      id: 'medellin' as const,
      name: 'Medellín',
      description: 'Murales universitarios, memoria estudiantil y narrativas de resistencia en la Universidad de Antioquia.',
      background: "url(/medellin/fondoMDE.jpg)",
      previewImage: medellin[0]?.image ?? '/medellin/fondoMDE.jpg',
      pieces: medellin,
    },
    {
      id: 'bogota' as const,
      name: 'Bogotá',
      description: 'Lenguajes comunitarios que tapizan barrios y avenidas, pensando la ciudad como lienzo colectivo.',
      background: "url(/bogota/3.jpg)",
      previewImage: bogota[0]?.image ?? '/bogota/3.jpg',
      pieces: bogota,
    },
  ]

  const totalPieces = graffitis.length

  return (
    <>
      <section className="container-max py-12 space-y-8 text-center">
        <header className="space-y-6 relative">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-neon/30 bg-neon/10 text-xs uppercase tracking-[0.35em] text-neon">
            Archivo vivo Wikimedia
          </span>
          <h1 className="graffiti-title text-5xl md:text-7xl text-neon">Ecos de un Mural</h1>
          <p className="max-w-3xl mx-auto text-lg text-zinc-300">
            Cartografiamos la memoria urbana de Colombia a partir de murales documentados en Wikimedia Commons. Cada obra reúne contexto, autorías y relatos para que sigan vivos en el espacio digital.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/mapa" className="px-5 py-3 rounded-2xl bg-neon/10 text-neon border border-neon/30 hover:bg-neon/20 transition">
              Ver mapa interactivo
            </Link>
            <Link href="/explorar" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition">
              Explorar murales
            </Link>
            <Link href="/escena-3d" className="px-5 py-3 rounded-2xl bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 transition">
              Entorno 3D
            </Link>
          </div>
          <div className="flex justify-center gap-6 text-sm text-zinc-400">
            <span>{totalPieces} piezas documentadas</span>
            <span>{citySections.length} ciudades en expansión</span>
          </div>
        </header>
      </section>

      <section className="container-max space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="graffiti-title text-3xl md:text-4xl text-white">Rutas por ciudad</h2>
          <p className="text-sm text-zinc-400">Haz clic en la ciudad que quieras recorrer y sigue desplazándote para ver todas las piezas.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {citySections.map((city) => (
            <Link
              key={city.id}
              href={`#${city.id}`}
              className="card relative h-48 overflow-hidden group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${city.previewImage})` }}
              />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors" />
              <div className="relative h-full flex flex-col justify-between p-6">
                <div className="space-y-2 text-left">
                  <p className="text-xs uppercase tracking-[0.4em] text-neon/80">Ciudad</p>
                  <h3 className="graffiti-title text-3xl text-white">{city.name}</h3>
                  <p className="text-sm text-zinc-200/80">{city.pieces.length} murales y registros audiovisuales</p>
                </div>
                <span className="text-sm text-neon flex items-center gap-2">
                  Entrar a la ruta <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="https://co.wikimedia.org/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir Wikimedia Colombia en una nueva pestaña"
          className="card px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur flex items-center gap-3 shadow-lg shadow-black/20 hover:bg-white/10 transition"
        >
          <span className="text-base text-zinc-200">Un proyecto de</span>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Wikimedia-Colombia-logo.svg"
            alt="Wikimedia Colombia"
            width={56}
            height={56}
            className="shrink-0"
            priority
          />
        </a>
      </div>

      {citySections.map((city) => {
        const previewCount = Math.min(6, city.pieces.length)
        const preview = city.pieces.slice(0, previewCount)
        return (
          <section
            key={city.id}
            id={city.id}
            className="mt-12 relative min-h-[70vh] lg:min-h-[80vh] rounded-2xl overflow-hidden bg-fixed bg-cover bg-center"
            style={{ backgroundImage: city.background }}
            aria-label={`Sección ${city.name}`}
          >
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative h-full px-4 py-12">
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                  <div className="space-y-3">
                    <h3 className="graffiti-title text-3xl md:text-5xl text-white">{city.name}</h3>
                    <p className="text-zinc-200/90 max-w-2xl">{city.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/mapa#${city.id}`}
                      className="px-4 py-2 rounded-xl bg-neon/10 text-neon border border-neon/30 hover:bg-neon/20 transition"
                    >
                      Ver en mapa
                    </Link>
                    <Link
                      href={`/explorar?city=${city.id}`}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition"
                    >
                      Explorar {city.name}
                    </Link>
                  </div>
                </div>

                {preview.length ? (
                  <div className="overflow-x-auto -mx-4 px-4 pb-6">
                    <div className="flex gap-5 snap-x snap-mandatory">
                      {preview.map((g) => (
                        <div key={`${g.city}-${g.slug}`} className="snap-start min-w-[260px] max-w-sm">
                          <GraffitiCard graffiti={g} />
                        </div>
                      ))}
                      {city.pieces.length > preview.length && (
                        <Link
                          href={`/explorar?city=${city.id}`}
                          className="snap-start min-w-[220px] max-w-[220px] card flex items-center justify-center text-center text-sm text-zinc-200 hover:bg-white/10 transition border-dashed border-white/30"
                        >
                          Ver {city.pieces.length - preview.length} piezas más
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-zinc-200/80">Aún no hemos documentado murales en esta ciudad. ¿Conoces alguno? Súbelo a Wikimedia Commons con la categoría “Ecos de un mural”.</p>
                )}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
