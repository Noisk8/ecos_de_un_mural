export const OSM_IFRAME_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=-74.0059,40.7128,-73.9352,40.7589&layer=mapnik";

const OSM_IFRAME_SANDBOX = "allow-scripts allow-same-origin";
const OSM_IFRAME_ALLOW = "geolocation 'none'";

export default function MapEmbed() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
        <iframe
          width="100%"
          height="100%"
          frameBorder={0}
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={OSM_IFRAME_SRC}
          title="Mapa OSM"
          sandbox={OSM_IFRAME_SANDBOX}
          allow={OSM_IFRAME_ALLOW}
          loading="lazy"
          className="absolute inset-0 w-full h-full block"
        />
      </div>
    </div>
  );
}
