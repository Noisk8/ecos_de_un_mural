export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10">
      <div className="container-max py-6 text-sm text-zinc-400 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Graffiti y Memoria — Proyecto de archivo vivo.</p>
        <p>Contenido con fines educativos/culturales. Respeta autorías y licencias.</p>
      </div>
    </footer>
  )
}
