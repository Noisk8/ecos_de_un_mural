import { getGraffitis } from '@/data/graffitis'
import ExplorerClient from '@/components/ExplorerClient'

export default async function ExplorarPage({
  searchParams,
}: {
  searchParams?: { city?: string; q?: string }
}) {
  const graffitis = await getGraffitis()

  const rawCity = searchParams?.city?.toLowerCase()
  const initialCity =
    rawCity === 'medellin' || rawCity === 'bogota' ? (rawCity as 'medellin' | 'bogota') : 'todas'

  const initialQuery = typeof searchParams?.q === 'string' ? searchParams.q : ''

  return (
    <ExplorerClient
      graffitis={graffitis}
      initialCity={initialCity}
      initialQuery={initialQuery}
    />
  )
}
