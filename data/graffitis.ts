import { fetchCommonsMurals, commonsFilePath } from '@/lib/commons'
import { Graffiti } from '@/lib/types'

const CACHE_TTL_MS = 1000 * 60 * 15 // 15 minutos

export const baseGraffitis: Graffiti[] = [
  {
    city: 'medellin',
    slug: 'mural-juanca-aguledo',
    title: 'Mural en homenaje a Juan Camilo "Juanca" Aguledo',
    image: commonsFilePath('Mural en homenaje a Juan Camilo “Juanca” Aguledo 05.jpg'),
    coords: [6.26825, -75.569924],
    year: 2025,
    tags: ['memoria', 'juventud', 'universidad'],
    author: 'Comunidad universitaria UdeA',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mural_en_homenaje_a_Juan_Camilo_%E2%80%9CJuanca%E2%80%9D_Aguledo_05.jpg',
    context:
      'Mural universitario que mantiene viva la memoria de Juan Camilo "Juanca" Aguledo, estudiante y activista de la Universidad de Antioquia.',
    story:
      'Este mural se ubica en un muro exterior del campus de la Universidad de Antioquia, cerca del Bloque 24. La comunidad lo conserva como homenaje a la labor de Juanca por los derechos estudiantiles y la memoria histórica.\n\nEl registro fotográfico fue realizado para Wikimedia Commons en 2025, con la intención de documentar las expresiones de memoria y resistencia cultural dentro de la universidad.',
  },
  {
    city: 'medellin',
    slug: 'mural-ana-fabricia-cordoba',
    title: 'Mural en homenaje a Ana Fabricia Córdoba',
    image: commonsFilePath('Mural en homenaje a Ana Fabricia Córdoba 01.jpg'),
    images: [
      commonsFilePath('Mural en homenaje a Ana Fabricia Córdoba 01.jpg'),
      commonsFilePath('Mural en homenaje a Ana Fabricia Córdoba 02.jpg'),
      commonsFilePath('Mural en homenaje a Ana Fabricia Córdoba 03.jpg'),
    ],
    coords: [6.26861, -75.5692],
    year: 2025,
    tags: ['memoria', 'lideresas', 'victimas'],
    author: 'Colectivos artísticos UdeA',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mural_en_homenaje_a_Ana_Fabricia_C%C3%B3rdoba_01.jpg',
    audio: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Ana_Fabricia_C%C3%B3rdoba_Mural_Audio.mp3',
    context:
      'Homenaje universitario a Ana Fabricia Córdoba, lideresa desplazada y voz de las víctimas del conflicto armado en Colombia.',
    story:
      'La pieza se encuentra en el Bloque 24 de la Universidad de Antioquia, en Medellín. Fue creada por colectivos estudiantiles para mantener viva la memoria de Ana Fabricia y denunciar las violencias que enfrentó como lideresa comunitaria.\n\nEl registro fotográfico de 2025 documenta el mural como parte de las acciones de memoria y resistencia cultural dentro de la universidad.',
  },
  {
    city: 'medellin',
    slug: 'mural-paula-magaly',
    title: 'Mural en homenaje a Paula y Magaly',
    image: commonsFilePath('Mural en homenaje a Paula y Magaly.jpg'),
    images: [
      commonsFilePath('Mural en homenaje a Paula y Magaly.jpg'),
    ],
    coords: [6.26592, -75.570078],
    year: 2025,
    tags: ['memoria', 'universidad', 'resistencia'],
    author: 'Colectivos estudiantiles y de memoria UdeA',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mural_en_homenaje_a_Paula_y_Magaly.jpg',
    context:
      'Mural ubicado en el Bloque 9 de la Universidad de Antioquia (Medellín) que honra la memoria de Paula y Magaly, estudiantes víctimas de la violencia sociopolítica.',
    story:
      'La pieza, realizada por colectivos estudiantiles y de memoria, busca mantener presente la vida de Paula y Magaly y reforzar el compromiso del movimiento universitario con la justicia, la no repetición y la defensa de la vida.\n\nEl registro fotográfico fue elaborado para Wikimedia Commons y forma parte del archivo colaborativo Ecos de un Mural.',
  },
  {
    city: 'medellin',
    slug: 'mural-yo-di-la-orden',
    title: 'Mural “Yo di la orden”',
    image: commonsFilePath('Mural “Yo di la orden”, Universidad de Antioquia 01.jpg'),
    images: [
      commonsFilePath('Mural “Yo di la orden”, Universidad de Antioquia 01.jpg'),
      commonsFilePath('Mural “Yo di la orden”, Universidad de Antioquia 02.jpg'),
    ],
    coords: [6.2685, -75.5676],
    year: 2025,
    tags: ['memoria', 'falsos_positivos', 'denuncia'],
    author: 'Colectivos estudiantiles UdeA',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mural_%E2%80%9CYo_di_la_orden%E2%80%9D,_Universidad_de_Antioquia_01.jpg',
    context:
      'Mural del Bloque 24 de la Universidad de Antioquia inspirado en la consigna “¿Quién dio la orden?”, que denuncia la responsabilidad de altos mandos en los falsos positivos.',
    story:
      'La composición reinterpreta la consigna como “Yo di la orden” y exhibe la figura de un militar sobre un fondo de calaveras, como crítica directa a los crímenes de Estado. Fue documentado para Wikimedia Commons dentro del proyecto Ecos de un Mural.',
  },

  {
    city: 'bogota',
    slug: 'graffiti-2',
    title: 'Resistencia Urbana',
    image: '/bogota/3.jpg',
    coords: [4.648, -74.058],
    year: 2022,
    tags: ['resistencia', 'urbano', 'arte callejero'],
    author: 'Artista Anónimo',
    context:
      'Intervención artística que refleja la resistencia de las comunidades urbanas ante los desafíos sociales y económicos de la ciudad.',
    story:
      'Esta pieza surgió como respuesta a las dinámicas de gentrificación en el sector. El artista utilizó técnicas mixtas para crear una composición que dialoga con el entorno urbano.\n\nLa obra ha sido mantenida por la comunidad local, convirtiéndose en un símbolo de identidad barrial.',
  },
  {
    city: 'bogota',
    slug: 'graffiti-3',
    title: 'Voces de la Periferia',
    image: '/bogota/4.jpeg',
    coords: [4.651, -74.055],
    year: 2023,
    tags: ['periferia', 'comunidad', 'identidad'],
    author: 'Colectivo Sur',
    context:
      'Mural colaborativo que representa las voces y narrativas de las comunidades periféricas de Bogotá, destacando su riqueza cultural y social.',
    story:
      'Resultado de un proceso de co-creación con habitantes del sector. Durante varias semanas se realizaron talleres de cartografía emocional y técnicas de muralismo.\n\nLa obra integra elementos simbólicos propuestos por la comunidad, creando un relato visual de la vida en la periferia urbana.',
  },
]

let graffitisCache: { data: Graffiti[]; timestamp: number } | null = null

const normalizeText = (value?: string) =>
  (value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const stringsOverlap = (a?: string, b?: string) => {
  const an = normalizeText(a)
  const bn = normalizeText(b)
  if (!an || !bn) return false
  return an.includes(bn) || bn.includes(an)
}

function cloneGraffiti(g: Graffiti): Graffiti {
  return {
    ...g,
    coords: [...g.coords],
    tags: g.tags ? [...g.tags] : undefined,
    images: g.images ? [...g.images] : undefined,
  }
}

function mergeUnique(base: string[] = [], extras: (string | undefined)[] = []): string[] {
  const result: string[] = [...base]
  const seen = new Set(result)
  for (const item of extras) {
    if (!item) continue
    if (!seen.has(item)) {
      seen.add(item)
      result.push(item)
    }
  }
  return result
}

async function buildGraffitis(): Promise<Graffiti[]> {
  const combined = baseGraffitis.map(cloneGraffiti)
  try {
    const commonsMurals = await fetchCommonsMurals()
    for (const mural of commonsMurals) {
      const remoteCover = mural.images[0]?.thumbUrl ?? mural.images[0]?.url
      const remoteImages = mural.images.map((img) => img.url ?? img.thumbUrl)

      const match = combined.find((g) => {
        if (g.city !== mural.city) return false
        const sourceMatch = g.sourceUrl
          ? mural.sourceUrl === g.sourceUrl || mural.images.some((img) => img.sourceUrl === g.sourceUrl)
          : false
        const slugMatch = stringsOverlap(g.slug, mural.slug)
        const titleMatch = stringsOverlap(g.title, mural.title)
        return sourceMatch || slugMatch || titleMatch
      })

      if (match) {
        match.images = mergeUnique(match.images, remoteImages)
        if ((!match.image || match.image.startsWith('/')) && remoteCover) {
          match.image = remoteCover
        }
        if (!match.sourceUrl && mural.sourceUrl) {
          match.sourceUrl = mural.sourceUrl
        }
        if (!match.author && mural.credit) {
          match.author = mural.credit
        }
        if (!match.story && mural.description) {
          match.story = mural.description
        }
      } else if (remoteCover) {
        combined.push({
          city: mural.city,
          slug: mural.slug,
          title: mural.title,
          image: remoteCover,
          images: remoteImages,
          galleryDir: undefined,
          audio: undefined,
          coords: mural.coords,
          year: undefined,
          tags: ['commons'],
          sourceUrl: mural.sourceUrl,
          context: mural.description ?? 'Registro desde Wikimedia Commons.',
          story: mural.description,
          author: mural.credit,
        })
      }
    }
  } catch (error) {
    console.error('No se pudo sincronizar con Wikimedia Commons:', error)
  }
  return combined
}

export async function getGraffitis(): Promise<Graffiti[]> {
  if (graffitisCache && Date.now() - graffitisCache.timestamp < CACHE_TTL_MS) {
    return graffitisCache.data
  }
  const result = await buildGraffitis()
  graffitisCache = { data: result, timestamp: Date.now() }
  return result
}

export async function byCity(city?: string) {
  const data = await getGraffitis()
  if (!city) return data
  return data.filter((g) => g.city === city)
}

export async function findGraffiti(city: string, slug: string) {
  const data = await getGraffitis()
  return data.find((g) => g.city === city && g.slug === slug)
}

export async function allParams() {
  const data = await getGraffitis()
  return data.map((g) => ({ city: g.city, slug: g.slug }))
}
