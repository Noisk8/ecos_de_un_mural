import { Graffiti } from '@/lib/types'

export const graffitis: Graffiti[] = [
  {
    city: 'medellin',
    slug: 'graffiti-2',
    title: 'Territorio y Vida',
    image: '/medellin/1.jpg',
    coords: [6.261, -75.565],
    year: 2022,
    tags: ['territorio', 'vida', 'transformación'],
    author: 'Colectivo Territorio',
    context:
      'Obra que celebra la transformación social del territorio a través del arte comunitario y la memoria colectiva.',
    story:
      'Este mural fue creado en colaboración con jóvenes del barrio que participaron en talleres de arte urbano y narración oral.\n\nLa pieza refleja los procesos de cambio social y la apropiación positiva del territorio por parte de sus habitantes.',
  },
  {
    city: 'medellin',
    slug: 'graffiti-3',
    title: 'Cultura y Resistencia',
    image: '/medellin/2.jpg',
    coords: [6.258, -75.572],
    year: 2023,
    tags: ['cultura', 'resistencia', 'juventud'],
    author: 'Red Juvenil MDE',
    context:
      'Expresión artística que manifiesta la resistencia cultural de los jóvenes ante las dinámicas de violencia y exclusión social.',
    story:
      'Obra colectiva realizada por un grupo de jóvenes artistas locales durante un proceso de formación en técnicas de muralismo.\n\nEl mural incorpora símbolos de la cultura popular urbana y se ha convertido en punto de encuentro para actividades culturales del barrio.',
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

export function byCity(city?: string) {
  if (!city) return graffitis
  return graffitis.filter((g) => g.city === city)
}

export function findGraffiti(city: string, slug: string) {
  return graffitis.find((g) => g.city === city && g.slug === slug)
}

export function allParams() {
  return graffitis.map((g) => ({ city: g.city, slug: g.slug }))
}
