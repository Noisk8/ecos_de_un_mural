'use client'

type Props = { src: string; title?: string; transcript?: string }

export default function AudioPlayer({ src, title, transcript }: Props) {
  return (
    <figure>
      {title && <figcaption className="mb-2 text-sm text-zinc-300">{title}</figcaption>}
      <audio controls preload="metadata" className="w-full">
        <source src={src} type="audio/mpeg" />
        Tu navegador no soporta audio HTML5.
      </audio>
      {transcript && (
        <details className="mt-2 text-sm text-zinc-400">
          <summary className="cursor-pointer">Transcripción</summary>
          <div className="mt-2 whitespace-pre-wrap">{transcript}</div>
        </details>
      )}
    </figure>
  )
}
