import { allParams, findGraffiti } from '@/data/graffitis'
import MediaGallery from '@/components/MediaGallery'
import AudioPlayer from '@/components/AudioPlayer'
import MapEmbed from '@/components/MapEmbed'
import Link from 'next/link'

export async function generateStaticParams() {
  return allParams()
}

export async function generateMetadata({ params }: { params: { city: string; slug: string } }) {
  const g = findGraffiti(params.city, params.slug)
  return {
    title: g ? `${g.title} | ${g.city} | Graffiti y Memoria` : 'Graffiti | Detalle',
    description: g?.context ?? 'Detalle de graffiti',
  }
}

export default function GraffitiDetail({ params }: { params: { city: string; slug: string } }) {
  const g = findGraffiti(params.city, params.slug)
  if (!g) {
    return (
      <section className="container-max py-10">
        <p className="text-zinc-400">No encontramos esta pieza. <Link href="/explorar" className="text-neon">Volver a explorar</Link></p>
      </section>
    )
  }

  const gallery = g.images && g.images.length ? g.images : [g.image]

  return (
    <section className="container-max py-8 space-y-10">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 bg-zinc-800">
          <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-3">
          <div className="text-xs uppercase text-zinc-400">{g.city} {g.year ? `• ${g.year}` : ''}</div>
          <h1 className="graffiti-title text-4xl">{g.title}</h1>
          <p className="text-zinc-300 leading-relaxed">{g.context}</p>
          {g.author && <p className="text-zinc-400 text-sm">Autoría/Colectivo: <span className="text-white">{g.author}</span></p>}
          <div className="flex flex-wrap gap-2 pt-2">
            {(g.tags ?? []).map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">#{t}</span>
            ))}
          </div>
          <div className="pt-3">
            <Link href={`/explorar`} className="text-neon link-underline">← Volver a explorar</Link>
          </div>
        </div>
      </div>

      {g.story && (
        <article className="prose prose-invert max-w-none">
          {g.story.split('\n\n').map((para, i) => (
            <p key={i} className="text-zinc-300">{para}</p>
          ))}
        </article>
      )}

      <section className="space-y-4">
        <h2 className="graffiti-title text-2xl">Galería</h2>
        <div className="card p-3">
          <MediaGallery images={gallery} />
        </div>
      </section>

      {g.audio && (
        <section className="space-y-4">
          <h2 className="graffiti-title text-2xl">Audio</h2>
          <div className="card p-4">
            <AudioPlayer src={g.audio} title={`Audio — ${g.title}`} />
            <p className="text-sm text-zinc-400 mt-2">Escucha un testimonio, registro o ambiente del proceso.</p>
          </div>
        </section>
      )}

      <div className="card p-2">
        <MapEmbed />
      </div>
    </section>
  )
}
