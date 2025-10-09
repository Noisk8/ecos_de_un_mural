'use client'

type Props = { src: string; title?: string; transcript?: string }

export default function AudioPlayer({ src, title, transcript }: Props) {
  const normalized = src.toLowerCase()
  const mime =
    normalized.endsWith('.ogg') ? 'audio/ogg' :
    normalized.endsWith('.wav') ? 'audio/wav' :
    normalized.endsWith('.webm') ? 'audio/webm' :
    'audio/mpeg'

  return (
    <figure>
      {title && <figcaption className="mb-2 text-sm text-zinc-300">{title}</figcaption>}
      <audio controls preload="metadata" className="w-full">
        <source src={src} type={mime} />
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
