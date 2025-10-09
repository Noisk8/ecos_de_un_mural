import { NextResponse } from 'next/server'

// Para el ejercicio del mapa de pruebas devolvemos un conjunto mínimo de puntos,
// usando directamente los metadatos de los archivos de Wikimedia Commons
// compartidos por la persona usuaria. Esto evita llamadas externas y asegura
// que el mapa muestre exactamente las variantes del mural solicitado.

const points = [
  {
    id: 'commons-memoria-viva',
    title: 'Memoria Viva — Universidad Nacional de Colombia (Medellín)',
    description:
      'Mural registrado en Wikimedia Commons. Forma parte de la Universidad Nacional de Colombia, sede Medellín, y funciona como un recordatorio de la memoria colectiva del campus.',
    lat: 6.26123,
    lng: -75.577675,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Unalmed_-_Mural_Memoria_Viva.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Unalmed_-_Mural_Memoria_Viva.jpg',
  },
  {
    id: 'commons-memoria-viva-detalle',
    title: 'Memoria Viva (detalle) — Universidad Nacional de Colombia',
    description:
      'Detalle del mural “Memoria Viva” almacenado en Wikimedia Commons. Destaca los motivos simbólicos presentes en la obra completa.',
    lat: 6.26123,
    lng: -75.577675,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Unalmed_-_Mural_Memoria_Viva%2C_detalle.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Unalmed_-_Mural_Memoria_Viva,_detalle.jpg',
  },
  {
    id: 'commons-murales-entrada-unal-2021-01',
    title: 'Murales en la entrada — Universidad Nacional Medellín (2021)',
    description:
      'Registro de los murales en la entrada principal del campus Medellín de la Universidad Nacional de Colombia, capturado durante mayo de 2021.',
    lat: 6.259804,
    lng: -75.579918,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/3f/Murales_en_la_entrada_a_la_Universidad_Nacional%2C_sede_Medell%C3%ADn_-_mayo_de_2021_-_01.jpg',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Murales_en_la_entrada_a_la_Universidad_Nacional,_sede_Medell%C3%ADn_-_mayo_de_2021_-_01.jpg',
  },
]

export async function GET() {
  return NextResponse.json({ points })
}
