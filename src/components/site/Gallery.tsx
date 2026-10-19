import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/products";
import { Button } from "@/components/ui/button";

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const img = images[active] ?? images[0];
  const go = (d: number) => setActive((a) => (a + d + images.length) % images.length);

  useEffect(() => {
    if (!lightbox) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  });

  if (!img) return null;

  return (
    <div>
      <Button variant="ghost"
        type="button"
        className="group relative block h-auto aspect-[4/5] w-full overflow-hidden rounded-none border bg-card p-0 cursor-zoom-in"
        onClick={() => setLightbox(true)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
        aria-label={`Open ${img.alt} in full screen`}
      >
        <img
          src={img.src}
          alt={img.alt}
          width={1024}
          height={1280}
          className="h-full w-full object-contain transition-transform duration-300"
          style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/70 text-champagne"><ZoomIn size={16} /></span>
        {img.pendingOriginal && (
          <span className="absolute bottom-3 left-3 bg-background/80 px-2 py-1 text-[0.6rem] uppercase tracking-widest text-champagne">Preview image · original photo pending</span>
        )}
      </Button>
      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
        {images.map((g, i) => (
          <Button variant="ghost" key={i} type="button" onClick={() => setActive(i)} aria-label={`Show ${g.caption}`} aria-pressed={i === active} className={`h-auto aspect-square overflow-hidden rounded-none border p-0 transition ${i === active ? "border-gold" : "opacity-60 hover:opacity-100"}`}>
            <img src={g.src} alt="" loading="lazy" className="h-full w-full object-contain" />
          </Button>
        ))}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4" role="dialog" aria-modal="true" aria-label="Image gallery" onClick={() => setLightbox(false)}>
          <Button variant="ghost" size="icon" className="absolute right-5 top-5 text-champagne" aria-label="Close gallery" onClick={() => setLightbox(false)}><X size={28} /></Button>
          <Button variant="ghost" size="icon" className="absolute left-3 text-champagne sm:left-8" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); go(-1); }}><ChevronLeft size={36} /></Button>
          <figure className="max-h-full max-w-[calc(100%-5rem)]" onClick={(e) => e.stopPropagation()}>
            <img src={img.src} alt={img.alt} className="max-h-[80vh] max-w-full w-auto object-contain" />
            <figcaption className="mt-3 text-center eyebrow">{active + 1} / {images.length} · {img.caption}</figcaption>
          </figure>
          <Button variant="ghost" size="icon" className="absolute right-3 text-champagne sm:right-8" aria-label="Next image" onClick={(e) => { e.stopPropagation(); go(1); }}><ChevronRight size={36} /></Button>
        </div>
      )}
    </div>
  );
}
