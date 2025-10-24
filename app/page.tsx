import Link from 'next/link'
import Image from 'next/image'
import { getGraffitis } from '@/data/graffitis'
import GraffitiCard from '@/components/GraffitiCard'

export default async function HomePage() {
  const graffitis = await getGraffitis()
  return (
    <section className="container-max py-10">
      <header className="text-center space-y-4 relative">
        <h1 className="graffiti-title text-5xl md:text-7xl text-neon">Ecos de un Mural</h1>
        <h2 className='text-2xl text-neon text-bold'>Colaboratorio de memoria historica</h2>
        <p className="text-zinc-300 max-w-2xl mx-auto">
      Este proyecto busca visualizar las obras de arte urbano de las ciudades de colombia donde los artistas han dejado un legado para la memoria gistorica del pais
      </p>
  <p>    Los contenidos de este proyectos son datos indexados desde las plataforma sdel ecosistema de Wikimedia</p>
 
   <div className="flex gap-3 justify-center pt-4">
          <Link href="/mapa" className="px-5 py-3 rounded-2xl bg-neon/10 text-neon border border-neon/30 hover:bg-neon/20 transition">Ver mapa</Link>
          <Link href="/escena-3d" className="px-5 py-3 rounded-2xl bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 transition">Entorno 3D</Link>
          <Link href="/explorar" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">Explorar</Link>
        </div>

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
      </header>

      <section
        className="mt-12 relative min-h-[70vh] lg:min-h-[80vh] rounded-2xl overflow-hidden bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url(/medellin/fondoMDE.jpg)" }}
        aria-label="Sección Medellín"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full px-4 py-10">
          <div className="max-w-6xl mx-auto">
            <h3 className="graffiti-title text-3xl md:text-4xl mb-6 text-white">Medellín</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {graffitis.filter(g => g.city === 'medellin').slice(0, 2).map((g) => (
                <GraffitiCard key={`${g.city}-${g.slug}`} graffiti={g} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="mt-10 relative min-h-[70vh] lg:min-h-[80vh] rounded-2xl overflow-hidden bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url(/bogota/3.jpg)" }}
        aria-label="Sección Bogotá"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full px-4 py-10">
          <div className="max-w-6xl mx-auto">
            <h3 className="graffiti-title text-3xl md:text-4xl mb-6 text-white">Bogotá</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {graffitis.filter(g => g.city === 'bogota').slice(0, 2).map((g) => (
                <GraffitiCard key={`${g.city}-${g.slug}`} graffiti={g} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
