'use client'

import { useEffect, useState } from 'react'

export default function MediaGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, images.length])

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => { setIdx(i); setOpen(true) }}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-neon/40"
            aria-label={`Abrir imagen ${i+1} de ${images.length}`}
          >
            <img src={src} alt={`Imagen ${i+1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 text-sm text-zinc-300 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
            >
              Cerrar ✕
            </button>
            <div className="relative w-full aspect-[16/10] bg-black rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
              <img src={images[idx]} alt={`Imagen ampliada ${idx+1}`} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="mt-3 flex justify-between">
              <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20" onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}>← Anterior</button>
              <span className="text-sm text-zinc-400">{idx + 1} / {images.length}</span>
              <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20" onClick={() => setIdx((i) => (i + 1) % images.length)}>Siguiente →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
