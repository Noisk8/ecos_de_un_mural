import { getGraffitis } from '@/data/graffitis'
import ExplorerClient from '@/components/ExplorerClient'

export default async function ExplorarPage() {
  const graffitis = await getGraffitis()
  return <ExplorerClient graffitis={graffitis} />
}
