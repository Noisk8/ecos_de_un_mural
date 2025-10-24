import { Graffiti } from '@/lib/types'

export const graffitis: Graffiti[] = [
  {
    city: 'medellin',
    slug: 'mural-juanca-aguledo',
    title: 'Mural en homenaje a Juan Camilo "Juanca" Aguledo',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Mural_en_homenaje_a_Juan_Camilo_%E2%80%9CJuanca%E2%80%9D_Aguledo_05.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Mural_en_homenaje_a_Ana_Fabricia_C%C3%B3rdoba_01.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/9/96/Mural_en_homenaje_a_Ana_Fabricia_C%C3%B3rdoba_01.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/94/Mural_en_homenaje_a_Ana_Fabricia_C%C3%B3rdoba_03.jpg',
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
    slug: 'graffiti-3',
    title: 'Cultura y Resistencia',
    image: '/medellin/UdeA2.jpg',
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
