import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import MediaGallery from '@/components/MediaGallery'
import AudioPlayer from '@/components/AudioPlayer'
import MapEmbed from '@/components/MapEmbed'
import { allParams, findGraffiti } from '@/data/graffitis'
import type { Graffiti } from '@/lib/types'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

function imagesFromDir(dir: string | undefined, fallback: Graffiti['image'], extra?: Graffiti['images']) {
  if (dir) {
    const normalized = dir.replace(/^\/+/, '')
    const dirPath = path.join(PUBLIC_DIR, normalized)
    try {
      const files = fs
        .readdirSync(dirPath, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter((name) => /\.(gif|jpe?g|png|webp|avif)$/i.test(name))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

      if (files.length) {
        const assetBase = normalized.split(path.sep).join('/')
        return files.map((file) => `/${assetBase}/${file}`)
      }
    } catch (error) {
      console.warn(`No se pudo leer la carpeta de galería "${dir}":`, error)
    }
  }

  if (extra && extra.length) return extra
  return [fallback]
}

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

  const gallery = imagesFromDir(g.galleryDir, g.image, g.images)

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
