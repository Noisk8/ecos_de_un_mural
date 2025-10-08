import Link from 'next/link'
import Image from 'next/image'

export default function NavBar() {
  return (
    <nav className="border-b border-white/10 backdrop-blur sticky top-0 z-50">
      <div className="container-max h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Wikimedia-Colombia-logo.svg"
            alt="Wikimedia Colombia"
            width={32}
            height={32}
            priority
          />
          <span className="graffiti-title text-2xl text-white">Murales</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/mapa" className="text-zinc-300 hover:text-white">Mapa</Link>
          <Link href="/escena-3d" className="text-zinc-300 hover:text-white">3D</Link>
          <Link href="/explorar" className="text-zinc-300 hover:text-white">Explorar</Link>
        </div>
      </div>
    </nav>
  )
}
