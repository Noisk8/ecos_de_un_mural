const COMMONS_API = 'https://commons.wikimedia.org/w/api.php'
const CATEGORY_TITLE = 'Category:Ecos_de_un_mural'

type City = 'medellin' | 'bogota'

export function commonsFilePath(fileName: string, width = 1600): string {
  const trimmed = fileName.replace(/^File:/, '').trim()
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(trimmed)}?width=${width}`
}

type CommonsImage = {
  url: string
  thumbUrl: string
  sourceUrl: string
  description?: string
}

export type CommonsMural = {
  city: City
  slug: string
  title: string
  description?: string
  coords: [number, number]
  credit?: string
  images: CommonsImage[]
  sourceUrl?: string
}

type CommonsApiResponse = {
  continue?: { continue?: string; gcmcontinue?: string }
  query?: { pages?: CommonsApiPage[] }
}

type CommonsApiPage = {
  pageid: number
  title: string
  fullurl?: string
  coordinates?: Array<{ lat: number; lon: number }>
  imageinfo?: Array<{
    descriptionurl?: string
    url: string
    thumburl?: string
    canonicaltitle?: string
    extmetadata?: Record<string, { value?: string }>
  }>
}

type CityBounds = {
  lat: [number, number]
  lng: [number, number]
}

const CITY_BOUNDS: Record<City, CityBounds> = {
  medellin: {
    lat: [6.15, 6.35],
    lng: [-75.65, -75.45],
  },
  bogota: {
    lat: [4.45, 4.85],
    lng: [-74.25, -73.9],
  },
}

function determineCity(lat: number, lng: number): City | null {
  for (const [city, bounds] of Object.entries(CITY_BOUNDS) as Array<[City, CityBounds]>) {
    if (lat >= bounds.lat[0] && lat <= bounds.lat[1] && lng >= bounds.lng[0] && lng <= bounds.lng[1]) {
      return city
    }
  }
  return null
}

function slugify(value: string): string {
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
  return normalized || 'mural'
}

function stripHtml(value?: string): string | undefined {
  if (!value) return undefined
  const text = value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
  return text || undefined
}

function toKey(city: City, lat: number, lng: number): string {
  return `${city}-${lat.toFixed(4)}-${lng.toFixed(4)}`
}

export async function fetchCommonsMurals(): Promise<CommonsMural[]> {
  const groups = new Map<string, CommonsMural>()
  let gcmcontinue: string | undefined

  while (true) {
    const searchParams = new URLSearchParams({
      action: 'query',
      format: 'json',
      formatversion: '2',
      origin: '*',
      prop: 'coordinates|imageinfo|info',
      inprop: 'url',
      iiprop: 'url|mime|size|extmetadata',
      iiurlwidth: '1200',
      generator: 'categorymembers',
      gcmtitle: CATEGORY_TITLE,
      gcmtype: 'file',
      gcmlimit: '50',
    })

    if (gcmcontinue) {
      searchParams.set('gcmcontinue', gcmcontinue)
    }

    const res = await fetch(`${COMMONS_API}?${searchParams.toString()}`, {
      headers: {
        'User-Agent': 'EcosDeUnMural/0.1 (https://co.wikimedia.org/)',
      },
    })

    if (!res.ok) {
      throw new Error(`Commons API error: ${res.status}`)
    }

    const data: CommonsApiResponse = await res.json()
    const pages = data.query?.pages ?? []

    for (const page of pages) {
      const coords = page.coordinates?.[0]
      const info = page.imageinfo?.[0]
      if (!coords || !info) continue

      const city = determineCity(coords.lat, coords.lon)
      if (!city) continue

      const description = stripHtml(info.extmetadata?.ImageDescription?.value) ??
        stripHtml(info.extmetadata?.ObjectName?.value)
      const title =
        stripHtml(info.extmetadata?.ObjectName?.value) ??
        stripHtml(info.extmetadata?.EnglishTitle?.value) ??
        page.title.replace(/^File:/, '').replace(/_/g, ' ')

      const credit = stripHtml(info.extmetadata?.Artist?.value) ??
        stripHtml(info.extmetadata?.Credit?.value)

      const fileName = (info.canonicaltitle ?? page.title).replace(/^File:/, '')
      const imageUrl = commonsFilePath(fileName)
      const thumbUrl = commonsFilePath(fileName, 1200)

      const key = toKey(city, coords.lat, coords.lon)
      const slug = slugify(title ?? page.title)
      const sourceUrl = info.descriptionurl ?? page.fullurl ?? info.url

      let group = groups.get(key)
      if (!group) {
        group = {
          city,
          slug,
          title: title ?? slug,
          description: description,
          coords: [coords.lat, coords.lon],
          credit,
          images: [],
          sourceUrl,
        }
        groups.set(key, group)
      }

      const imageEntry: CommonsImage = {
        url: imageUrl,
        thumbUrl: thumbUrl,
        sourceUrl,
        description,
      }

      const exists = group.images.some((img) => img.url === imageEntry.url)
      if (!exists) {
        group.images.push(imageEntry)
      }

      // Prefer richer title/description if later entries provide it
      if (!group.description && description) {
        group.description = description
      }
      if ((!group.title || group.title === group.slug) && title) {
        group.title = title
      }
      if (!group.credit && credit) {
        group.credit = credit
      }
    }

    if (!data.continue?.gcmcontinue) break
    gcmcontinue = data.continue.gcmcontinue
  }

  return Array.from(groups.values())
}

export function distanceMeters(a: [number, number], b: [number, number]): number {
  const [lat1, lon1] = a
  const [lat2, lon2] = b
  const toRad = (deg: number) => (deg * Math.PI) / 180

  const R = 6371000 // Earth radius in meters
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const sinLat = Math.sin(dLat / 2)
  const sinLon = Math.sin(dLon / 2)
  const aa = sinLat * sinLat + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * sinLon * sinLon
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa))
  return R * c
}
