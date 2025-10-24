"use client";

import { useEffect, useMemo, useState } from 'react'
import GraffitiCard from '@/components/GraffitiCard'
import type { Graffiti } from '@/lib/types'

type CityFilter = 'todas' | 'medellin' | 'bogota'

export default function ExplorerClient({
  graffitis,
  initialCity = 'todas',
  initialQuery = '',
}: {
  graffitis: Graffiti[]
  initialCity?: CityFilter
  initialQuery?: string
}) {
  const [q, setQ] = useState(initialQuery)
  const [city, setCity] = useState<CityFilter>(initialCity)

  useEffect(() => {
    setCity(initialCity)
  }, [initialCity])

  useEffect(() => {
    setQ(initialQuery)
  }, [initialQuery])

  const list = useMemo(() => {
    const haystack = q.toLowerCase()
    return graffitis.filter((g) => {
      const inCity = city === 'todas' || g.city === city
      const text = (g.title + ' ' + g.context + ' ' + (g.tags ?? []).join(' ')).toLowerCase()
      return inCity && text.includes(haystack)
    })
  }, [q, city, graffitis])

  const listMedellin = useMemo(() => list.filter((g) => g.city === 'medellin'), [list])
  const listBogota = useMemo(() => list.filter((g) => g.city === 'bogota'), [list])

  return (
    <section className="container-max py-8 space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="graffiti-title text-4xl">Explorar</h2>
          <p className="text-zinc-400">Filtra por ciudad y busca por texto/etiquetas.</p>
        </div>
        <div className="flex gap-3">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value as any)}
            className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2"
          >
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

      {(city === 'todas' || city === 'medellin') && (
        <section
          className="mt-4 relative min-h-[60vh] lg:min-h-[70vh] rounded-2xl overflow-hidden bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url(/medellin/1.jpg)" }}
          aria-label="Sección Medellín"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <h3 className="graffiti-title text-3xl md:text-4xl mb-6 text-white">Medellín</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listMedellin.map((g) => (
                  <GraffitiCard key={`${g.city}-${g.slug}`} graffiti={g} />
                ))}
                {!listMedellin.length && (
                  <p className="text-zinc-300">Sin resultados para Medellín.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {(city === 'todas' || city === 'bogota') && (
        <section
          className="mt-6 relative min-h-[60vh] lg:min-h-[70vh] rounded-2xl overflow-hidden bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url(/bogota/3.jpg)" }}
          aria-label="Sección Bogotá"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <h3 className="graffiti-title text-3xl md:text-4xl mb-6 text-white">Bogotá</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listBogota.map((g) => (
                  <GraffitiCard key={`${g.city}-${g.slug}`} graffiti={g} />
                ))}
                {!listBogota.length && (
                  <p className="text-zinc-300">Sin resultados para Bogotá.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  )
}
