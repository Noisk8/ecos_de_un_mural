## Mapa y geolocalización

Este documento describe cómo se manejan los puntos geolocalizados ("puntos sensibles") y la configuración del mapa en la app, además de un plan para integrar datos desde Wikidata y las imágenes desde Wikimedia Commons en el futuro.

### Estructura de datos de los puntos

Cada punto sigue la interfaz lógica `Point`:

```ts
type Point = {
  id: string
  title: string
  description?: string
  lat: number
  lng: number
  city?: string
  slug?: string
  imageUrl?: string
}
```

- **id**: identificador único.
- **title**: nombre del punto.
- **description**: texto corto opcional.
- **lat/lng**: coordenadas en WGS84.
- **city/slug**: si existen, se renderiza un enlace `/{city}/{slug}` en el popup.
- **imageUrl**: si existe, se muestra una imagen en el popup.

Los puntos actuales se definen desde el frontend (ver componentes/páginas que los consumen). En una siguiente fase se externalizarán a una API.

### Componente `InteractiveMap`

Props principales:

- **points: Point[]**: lista de puntos a renderizar como marcadores.
- **bounds?: [[number, number], [number, number]]**: si se pasa, el mapa ajusta automáticamente su vista para encuadrar ese rectángulo.
- **theme?: 'osm' | 'light' | 'dark'**: estilo del mapa. Por defecto `'osm'`.

Tiles soportados:

- `'osm'`: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- `'light'`: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`
- `'dark'`: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`

Ejemplo de uso:

```tsx
<InteractiveMap points={points} theme="dark" />
```

Centro y encuadre:

- Si no hay `bounds`, el mapa centra en el primer punto; si no hay puntos, usa Bogotá (4.711, -74.072) como fallback.
- Si hay `bounds`, el mapa ignora `center/zoom` y ajusta al rectángulo dado.

Marcadores y popup:

- El icono por defecto de Leaflet se configura globalmente con `L.Icon.Default.mergeOptions(...)`, evitando pasar `icon` en cada `Marker`.
- Cada `Marker` muestra un `Popup` con `title`, `imageUrl` (si existe), `description` y un enlace a `/{city}/{slug}` si ambos están presentes.

### Atribución y licencias

- Los proveedores de teselas requieren atribución (OSM, Carto, etc.). React Leaflet gestiona el control de atribución del mapa; si se cambia de proveedor, asegúrate de incluir la atribución adecuada del servicio usado.
- Para imágenes externas (Commons) respeta licencias y créditos.

---

## Integración futura con Wikidata y Wikimedia Commons

Objetivo: reemplazar la fuente local de `points` por datos abiertos provenientes de Wikidata (coordenadas, metadatos) y recuperar imágenes desde Wikimedia Commons.

### 1) Consulta a Wikidata (SPARQL)

Ejemplo de consulta SPARQL (ajústala a tus criterios: ciudad, temática, propiedades):

```sparql
# Ejemplo: elementos con coordenadas en Bogotá (código Q2841)
SELECT ?item ?itemLabel ?coord ?image WHERE {
  ?item wdt:P131* wd:Q2841;       # Ubicado en Bogotá
        wdt:P625 ?coord.          # Coordenadas
  OPTIONAL { ?item wdt:P18 ?image } # Imagen asociada (si existe)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "es,en". }
}
LIMIT 200
```

Endpoint: `https://query.wikidata.org/sparql`

#### Cómo lo hacemos en este proyecto

- Creamos un endpoint interno en `app/api/wikidata/ecosistemas/route.ts` que:
  - Envía la consulta SPARQL al endpoint de Wikidata.
  - Convierte el literal `Point(lon lat)` a `lat`/`lng` numéricos.
  - Obtiene una miniatura desde Wikimedia Commons (si hay `P18`) usando la API de MediaWiki.
  - Devuelve `{ points }` en el mismo formato `Point[]` que usa el mapa.
- En el cliente, `components/WikidataEcosystemsMap.tsx` hace `fetch('/api/wikidata/ecosistemas')` y pasa los puntos a `InteractiveMap`.
- `InteractiveMap` es un wrapper de React Leaflet que dibuja marcadores, tarjetas (popups) y soporta temas de teselas.

### 2) Transformar resultados a `Point[]`

Ejemplo simple en TypeScript (Node/Next) para obtener y mapear resultados:

```ts
type WikidataBinding = {
  item: { value: string }
  itemLabel?: { value: string }
  coord: { value: string } // 'Point(lon lat)'
  image?: { value: string } // URL de archivo en Commons
}

async function fetchWikidataPoints(sparql: string): Promise<Point[]> {
  const res = await fetch('https://query.wikidata.org/sparql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/sparql-query',
      'Accept': 'application/sparql-results+json'
    },
    body: sparql
  })

  const data = await res.json()
  const bindings: WikidataBinding[] = data.results.bindings

  return bindings.map((b, idx) => {
    // coord viene como 'Point(lon lat)'
    const match = /Point\(([-0-9.]+) ([-0-9.]+)\)/.exec(b.coord.value)
    const lng = match ? parseFloat(match[1]) : 0
    const lat = match ? parseFloat(match[2]) : 0

    return {
      id: b.item.value.replace('http://www.wikidata.org/entity/', ''),
      title: b.itemLabel?.value ?? 'Sin título',
      lat,
      lng,
      // city/slug podrían derivarse según tu modelo de rutas
      imageUrl: b.image?.value
    }
  })
}
```

Notas:

- Para búsquedas temáticas (p. ej. “murales”, “arte urbano”) añade filtros por propiedades de Wikidata relevantes (instancia de, tema, autor, etc.).
- Implementa caché del lado servidor para evitar limitar la API pública de Wikidata.

### 3) Imágenes desde Wikimedia Commons

Si `wdt:P18` está presente, puede ser una URL de Commons o un nombre de archivo. Para obtener miniaturas optimizadas:

Opción rápida (thumb CDN):

```text
https://commons.wikimedia.org/wiki/Special:FilePath/<NOMBRE_DE_ARCHIVO>?width=640
```

O con la API de MediaWiki para mayor control:

```bash
GET https://commons.wikimedia.org/w/api.php
  ?action=query&prop=imageinfo&iiprop=url&iiurlwidth=640&format=json
  &titles=File:<NOMBRE_DE_ARCHIVO>
```

Del JSON extraes `imageinfo[0].thumburl` para usar como `imageUrl`.

### 4) Integración en Next.js

Recomendación: crear un endpoint interno y consumirlo desde el cliente.

1. Endpoint en `app/api/puntos/route.ts` que:
   - Ejecuta la consulta SPARQL.
   - Normaliza a `Point[]`.
   - Aplica caché (`revalidate`) o un KV/archivo temporal.

2. En el cliente, reemplazar la fuente local de puntos por `fetch('/api/puntos')` y pasarlos a `InteractiveMap`.

En este repositorio ya hay un ejemplo funcional:

- API: `app/api/wikidata/ecosistemas/route.ts`
- Cliente: `components/WikidataEcosystemsMap.tsx`
- Página: `app/mapa/page.tsx` (sección "Mapa de prueba (Wikidata: ecosistemas)")

La tarjeta del popup incluye título, miniatura (si existe), descripción breve de Wikidata (si existe) y un enlace a la fuente en Wikidata.

### Caso actual: murales de la Universidad Nacional (Medellín) desde Wikimedia Commons

Para el ejercicio de pruebas se añadieron tres nodos estáticos al mapa con datos tomados de Wikimedia Commons:

- Archivo general del mural principal “Memoria Viva”: [`File:Unalmed_-_Mural_Memoria_Viva.jpg`](https://commons.wikimedia.org/wiki/File:Unalmed_-_Mural_Memoria_Viva.jpg) — coordenadas `6.26123, -75.577675`.
- Detalle del mismo mural: [`File:Unalmed_-_Mural_Memoria_Viva,_detalle.jpg`](https://commons.wikimedia.org/wiki/File:Unalmed_-_Mural_Memoria_Viva,_detalle.jpg) — mismas coordenadas `6.26123, -75.577675`.
- Murales en la entrada principal del campus (mayo 2021): [`File:Murales_en_la_entrada_a_la_Universidad_Nacional,_sede_Medellín_-_mayo_de_2021_-_01.jpg`](https://commons.wikimedia.org/wiki/File:Murales_en_la_entrada_a_la_Universidad_Nacional,_sede_Medell%C3%ADn_-_mayo_de_2021_-_01.jpg) — coordenadas `6.259804, -75.579918`.

Los metadatos de cada archivo incluyen la clave `wgCoordinates`. Se consultaron con `curl` y se asignaron directamente en el frontend para asegurar que los marcadores se posicionen en los lugares registrados por las fotografías.

- Los puntos visibles en la tarjeta “Mapa” se configuran en `app/mapa/page.tsx`, donde se arma un arreglo literal de `Point[]` con los campos `id`, `title`, `description`, `lat`, `lng`, `imageUrl` y `sourceUrl`. Los dos objetos de “Memoria Viva” comparten coordenadas; el punto de la entrada pertenece a otro sector del campus.
- El mapa de pruebas que consume la API (`WikidataEcosystemsMap`) reutiliza los mismos valores en `app/api/wikidata/ecosistemas/route.ts`, que ahora responde `{ points }` con los tres elementos. De esta forma, tanto el mapa principal como el de prueba presentan los mismos marcadores enfocados en la Universidad Nacional.
- `InteractiveMap` recibe el arreglo de puntos y renderiza cada uno como un `Marker` de React Leaflet. Cuando detecta múltiples puntos con las mismas coordenadas, desplaza ligeramente los duplicados para que no queden solapados (`useMemo` aplica un delta incremental de `0.00012` en latitud y longitud). Además, cuando están presentes `imageUrl` y `sourceUrl`, muestra la miniatura proporcionada por Commons y un enlace directo a la ficha del archivo.

Cuando se requiera incorporar más obras desde Wikimedia Commons, basta con repetir el flujo:

1. Obtener la URL del archivo y consultar sus coordenadas (`wgCoordinates` → `[lat, lng]`).
2. Añadir un nuevo objeto al arreglo de `Point[]` correspondiente (p. ej., en `app/mapa/page.tsx` o en la respuesta del endpoint que alimente al mapa).
3. Opcionalmente, incluir `sourceUrl` apuntando al recurso original para mantener la referencia y los créditos adecuados.

### 5) Consideraciones

- **Rendimiento**: paginación o límites; agrupar puntos por zoom si hay demasiados.
- **CORS y cuotas**: preferir server-side fetch + caché.
- **Datos faltantes**: no todos los ítems tienen imagen; manejar `imageUrl` opcional.
- **Atribución**: incluir créditos a OSM/Carto y a los autores/licencias de Commons.
