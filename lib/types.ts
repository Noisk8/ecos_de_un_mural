export type Graffiti = {
  city: 'medellin' | 'bogota';
  slug: string;
  title: string;
  image: string;           // portada
  images?: string[];       // galería
  galleryDir?: string;     // directorio en /public para la galería
  audio?: string;          // /public/media/audio/... (mp3/ogg)
  coords: [number, number];// [lat, lng]
  year?: number;
  tags?: string[];
  context: string;         // breve
  story?: string;          // largo
  author?: string;
};
