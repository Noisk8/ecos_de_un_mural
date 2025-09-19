import Link from 'next/link'
import type { Graffiti } from '@/lib/types'

export default function GraffitiCard({ graffiti }: { graffiti: Graffiti }) {
  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-[16/10] bg-zinc-800">
        <img src={graffiti.image} alt={graffiti.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 space-y-2">
        <div className="text-xs uppercase text-zinc-400">{graffiti.city} {graffiti.year ? `• ${graffiti.year}` : ''}</div>
        <h3 className="text-lg font-semibold">{graffiti.title}</h3>
        <div className="flex flex-wrap gap-2">
          {(graffiti.tags ?? []).map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">#{t}</span>
          ))}
        </div>
        <Link href={`/${graffiti.city}/${graffiti.slug}`} className="inline-block mt-2 text-neon link-underline">Ver detalle</Link>
      </div>
    </article>
  )
}
