import Link from 'next/link'
import Image from 'next/image'
import { graffitis } from '@/data/graffitis'
import GraffitiCard from '@/components/GraffitiCard'

export default function HomePage() {
  return (
    <section className="container-max py-10">
      <header className="text-center space-y-4 relative">
        <h1 className="graffiti-title text-5xl md:text-7xl text-neon">Muros de Dignidad</h1>
        <h2 className='text-2xl text-neon text-bold'>Colaboraotio de memoria historica</h2>
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

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {graffitis.slice(0, 6).map((g) => (
          <GraffitiCard key={`${g.city}-${g.slug}`} graffiti={g} />
        ))}
      </div>
    </section>
  )
}
