'use client'

import { useMemo, useState } from 'react'
import { graffitis } from '@/data/graffitis'
import GraffitiCard from '@/components/GraffitiCard'

export default function ExplorarPage() {
  const [q, setQ] = useState('')
  const [city, setCity] = useState<'todas' | 'medellin' | 'bogota'>('todas')

  const list = useMemo(() => {
    return graffitis.filter((g) => {
      const inCity = city === 'todas' || g.city === city
      const hay = (g.title + ' ' + g.context + ' ' + (g.tags ?? []).join(' ')).toLowerCase()
      const ok = hay.includes(q.toLowerCase())
      return inCity && ok
    })
  }, [q, city])

  return (
    <section className="container-max py-8 space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="graffiti-title text-4xl">Explorar</h2>
          <p className="text-zinc-400">Filtra por ciudad y busca por texto/etiquetas.</p>
        </div>
        <div className="flex gap-3">
          <select value={city} onChange={(e) => setCity(e.target.value as any)} className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2">
            <option value="todas">Todas las ciudades</option>
            <option value="medellin">Medellín</option>
            <option value="bogota">Bogotá</option>
          </select>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar... (ej. memoria, paro)"
            className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 min-w-[240px]"
          />
        </div>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((g) => (
          <GraffitiCard key={`${g.city}-${g.slug}`} graffiti={g} />
        ))}
        {!list.length && (
          <p className="text-zinc-400">Sin resultados. Prueba con otras palabras.</p>
        )}
      </div>
    </section>
  )
}
