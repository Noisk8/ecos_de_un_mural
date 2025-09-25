import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="border-b border-white/10 backdrop-blur sticky top-0 z-50">
      <div className="container-max h-16 flex items-center justify-between">
        <Link href="/" className="graffiti-title text-2xl text-white">GyM</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/mapa" className="text-zinc-300 hover:text-white">Mapa</Link>
          <Link href="/escena-3d" className="text-zinc-300 hover:text-white">3D</Link>
          <Link href="/explorar" className="text-zinc-300 hover:text-white">Explorar</Link>
        </div>
      </div>
    </nav>
  )
}
