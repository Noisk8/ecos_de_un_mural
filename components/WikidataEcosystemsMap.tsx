"use client";

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'

// Este componente cliente solicita puntos a la API interna de Wikidata
// y los renderiza usando el componente genérico InteractiveMap.
// Está pensado como un mapa de prueba/demostración del flujo Wikidata -> Mapa.

type Point = {
  id: string
  title: string
  lat: number
  lng: number
  description?: string
  imageUrl?: string
  city?: string
  slug?: string
  sourceUrl?: string
}

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), { ssr: false })

export default function WikidataEcosystemsMap() {
  const [points, setPoints] = useState<Point[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Al montar, consulta la API /api/wikidata/ecosistemas y guarda los puntos
  useEffect(() => {
    let mounted = true
    async function run() {
      try {
        setLoading(true)
        const res = await fetch('/api/wikidata/ecosistemas')
        if (!res.ok) throw new Error('Error al consultar Wikidata')
        const data = await res.json()
        if (!mounted) return
        setPoints(data.points ?? [])
        setError(null)
      } catch (e: any) {
        if (!mounted) return
        setError(e?.message ?? 'Error desconocido')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [])

  // Encadre aproximado de Colombia para visualizar resultados en el país
  const colombiaBounds: [[number, number], [number, number]] = useMemo(
    () => [ [ -4.5, -79.1 ], [ 13.5, -66.8 ] ],
    []
  )

  if (loading) {
    return <div className="p-4 text-zinc-300">Cargando ecosistemas desde Wikidata…</div>
  }
  if (error) {
    return <div className="p-4 text-red-400">{error}</div>
  }

  // Render del mapa con tema claro y nota de atribuciones
  return (
    <div className="card p-2">
      <InteractiveMap points={points} bounds={colombiaBounds} theme="dark" />
      <div className="mt-3 text-xs text-zinc-500">
        Fuente de datos: <a className="underline" href="https://query.wikidata.org/" target="_blank" rel="noreferrer">Wikidata</a> y miniaturas de <a className="underline" href="https://commons.wikimedia.org/" target="_blank" rel="noreferrer">Wikimedia Commons</a>.
      </div>
    </div>
  )
}


