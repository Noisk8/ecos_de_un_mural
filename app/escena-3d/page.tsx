export const metadata = { title: 'Entorno 3D | Graffiti y Memoria' }

export default function ScenePage() {
  return (
    <section className="container-max py-8 space-y-6">
      <header>
        <h2 className="graffiti-title text-4xl">Entorno 3D</h2>
        <p className="text-zinc-400">Placeholder de muro virtual 3D (sin dependencias extra).</p>
      </header>
      <div className="card p-2 h-[520px] grid place-items-center">
        <div className="text-zinc-300 text-center">
          <div className="text-6xl">🧱</div>
          <p className="mt-2">Aquí puedes integrar Three.js más adelante</p>
        </div>
      </div>
    </section>
  )
}
