"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

type Point = {
  id: string;
  title: string;
  description?: string
  lat: number
  lng: number
  city?: string
  slug?: string
  imageUrl?: string
}

// Set Leaflet default marker icon globally to avoid passing `icon` per Marker
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Temas de teselas disponibles; se seleccionan vía prop `theme`
type MapTheme = 'osm' | 'light' | 'dark'

// Componente de mapa reutilizable basado en React Leaflet.
// - Si `bounds` existe, el mapa ajusta la vista al rectángulo.
// - Si no, centra en el primer punto o usa Bogotá como fallback.
// - `theme` cambia el proveedor de teselas (OSM, Carto light/dark).
export default function InteractiveMap({
  points,
  bounds,
  theme = 'osm',
}: {
  points: Point[]
  bounds?: [[number, number], [number, number]]
  theme?: MapTheme
}) {
  const center: [number, number] = points.length
    ? [points[0].lat, points[0].lng]
    : [4.711, -74.072] // Bogotá fallback

  const tileUrl =
    theme === 'light'
      ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      : theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  return (
    <div className="w-full h-[70vh] rounded-md overflow-hidden">
      {bounds ? (
        <MapContainer bounds={bounds} style={{ width: '100%', height: '100%' }}>
          <TileLayer url={tileUrl} />
          {points.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              <Popup minWidth={320} maxWidth={400}>
                <div className="space-y-2 max-w-[380px]">
                  <div className="font-semibold leading-tight">{p.title}</div>
                  {p.imageUrl ? (
                    <div className="mt-1 overflow-hidden rounded">
                      <img src={p.imageUrl} alt={p.title} className="block w-full h-auto" />
                    </div>
                  ) : null}
                  {p.description ? <p className="text-sm text-zinc-300">{p.description}</p> : null}
                  <div className="text-xs flex flex-wrap gap-2">
                    {p.city && p.slug ? (
                      <a className="text-blue-400 underline" href={`/${p.city}/${p.slug}`}>Ver detalle</a>
                    ) : null}
                    {'sourceUrl' in p && (p as any).sourceUrl ? (
                      <a className="text-blue-400 underline" href={(p as any).sourceUrl} target="_blank" rel="noreferrer">Fuente: Wikidata</a>
                    ) : null}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <MapContainer center={center} zoom={12} style={{ width: '100%', height: '100%' }}>
          <TileLayer url={tileUrl} />
          {points.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              <Popup minWidth={320} maxWidth={400}>
                <div className="space-y-2 max-w-[380px]">
                  <div className="font-semibold leading-tight">{p.title}</div>
                  {p.imageUrl ? (
                    <div className="mt-1 overflow-hidden rounded">
                      <img src={p.imageUrl} alt={p.title} className="block w-full h-auto" />
                    </div>
                  ) : null}
                  {p.description ? <p className="text-sm text-zinc-300">{p.description}</p> : null}
                  <div className="text-xs flex flex-wrap gap-2">
                    {p.city && p.slug ? (
                      <a className="text-blue-400 underline" href={`/${p.city}/${p.slug}`}>Ver detalle</a>
                    ) : null}
                    {'sourceUrl' in p && (p as any).sourceUrl ? (
                      <a className="text-blue-400 underline" href={(p as any).sourceUrl} target="_blank" rel="noreferrer">Fuente: Wikidata</a>
                    ) : null}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  )
}


