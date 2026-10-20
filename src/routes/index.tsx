import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, ShieldCheck, Truck, MessageCircle, Pause, Play, Volume2, VolumeX, Maximize } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { ASSETS, PRODUCTS, PRODUCT_LIST } from "@/lib/products";

const TITLE = "VIP Perfume India | Premium Long-Lasting Fragrances";
const DESC = "Discover VIP Perfume Aura and Ishal. Explore premium fragrances, sophisticated scent profiles and long-lasting perfumes. Shop online in India.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "VIP perfume India, premium perfume, luxury perfume, long lasting perfume, buy perfume online India, VIP Perfume Aura, VIP Perfume Ishal" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.current?.play().catch(() => setPlaying(false));
    }
  }, []);
  return (
    <section className="relative h-[90svh] min-h-[520px] overflow-hidden bg-background">
      <div className="absolute inset-0">
        {failed ? <img src={ASSETS.filmPoster} alt="VIP Perfume Aura bottle and presentation box" className="h-full w-full object-contain" /> :
          <video ref={video} className="h-full w-full object-contain" poster={ASSETS.filmPoster} muted={muted} loop playsInline preload="auto" aria-label="VIP Perfume brand film" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
            <source src={ASSETS.brandFilmWebm} type="video/webm" />
            <source src={ASSETS.brandFilm} type="video/mp4" />
          </video>}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
      {!failed && <div className="absolute right-5 top-28 z-20 flex gap-2">
        <Button variant="outline" size="icon" title={playing ? "Pause video" : "Play video"} aria-label={playing ? "Pause video" : "Play video"} onClick={() => { const v = video.current; if (!v) return; if (v.paused) v.play().catch(() => setPlaying(false)); else v.pause(); }}>{playing ? <Pause /> : <Play />}</Button>
        <Button variant="outline" size="icon" title={muted ? "Turn sound on" : "Mute video"} aria-label={muted ? "Turn sound on" : "Mute video"} onClick={() => setMuted((m) => !m)}>{muted ? <VolumeX /> : <Volume2 />}</Button>
        <Button variant="outline" size="icon" title="Full screen video" aria-label="Full screen video" onClick={() => video.current?.requestFullscreen?.().catch(() => {})}><Maximize /></Button>
      </div>}
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-end px-5 pb-8 text-center">
        <Reveal><p className="eyebrow">The Art of Fine Fragrance</p></Reveal>
        <Reveal delay={150}><h1 className="mt-3 text-4xl leading-[1.05] sm:text-6xl text-gold-gradient">VIP PERFUME</h1></Reveal>
        <Reveal delay={300}><p className="mx-auto mt-3 max-w-xl text-sm text-ivory/85 sm:text-lg">Leave a lasting impression. Discover Aura and Ishal.</p></Reveal>
        <Reveal delay={450} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link to="/shop" className="btn-gold">Explore the Collection</Link>
          <Link to="/explore-fragrance" className="btn-outline-gold">Discover the Scent Journey</Link>
        </Reveal>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8" aria-labelledby="collection">
        <Reveal className="text-center">
          <p className="eyebrow">The Collection</p>
          <h2 id="collection" className="mt-3 text-4xl sm:text-5xl text-ivory">Two signatures. One legacy.</h2>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {PRODUCT_LIST.map((p, i) => (
            <Reveal key={p.slug} delay={i * 150}><ProductCard product={p} /></Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-28">
        <img src={ASSETS.amberWave} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <Reveal className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-xl">
            <p className="eyebrow">The VIP Experience</p>
            <h2 className="mt-3 text-4xl sm:text-5xl text-ivory">Crafted to be remembered</h2>
            <p className="mt-6 leading-relaxed text-ivory/80">Every VIP Perfume begins with a bold first impression and unfolds into a warm, lingering character. Presented in black and gold — a quiet statement of confidence.</p>
            <Link to="/explore-fragrance" className="btn-outline-gold mt-8">Explore the fragrance</Link>
          </div>
        </Reveal>
      </section>

      {PRODUCT_LIST.map((p, i) => (
        <section key={p.slug} className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 lg:px-8">
          <Reveal className={i % 2 ? "md:order-2" : ""}>
            <div className="overflow-hidden">
               <img src={(p.gallery[1] ?? p.gallery[0])?.src} alt={(p.gallery[1] ?? p.gallery[0])?.alt} loading="lazy" className="aspect-[4/5] w-full object-contain transition-transform duration-[2s] hover:scale-105" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow">Showcase · {p.size}</p>
            <h2 className="mt-3 text-5xl text-gold-gradient">{p.shortName}</h2>
            <p className="mt-4 font-display text-2xl italic text-champagne">{p.tagline}</p>
            <p className="mt-4 text-ivory/75">{p.description}</p>
            <Link to={`/${p.slug}`} className="btn-gold mt-8">Shop {p.shortName}</Link>
          </Reveal>
        </section>
      ))}

      <section className="border-y bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Truck, t: "Pan-India shipping", d: "Delivered to your doorstep" },
            { icon: ShieldCheck, t: "Secure checkout", d: "Trusted Indian payments" },
            { icon: Gift, t: "Gift-ready packaging", d: "Black & gold presentation" },
            { icon: MessageCircle, t: "WhatsApp support", d: "Talk to us anytime" },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className="flex items-start gap-4">
              <I className="shrink-0 text-gold" size={26} strokeWidth={1.2} />
              <div><p className="text-sm uppercase tracking-[0.2em] text-ivory">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-32 text-center">
        <img src={PRODUCTS.ishal.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <Reveal className="relative px-5">
          <h2 className="text-5xl sm:text-6xl text-gold-gradient">Shop the Collection</h2>
          <p className="mt-4 text-ivory/80">Aura & Ishal — now 50% off.</p>
          <Link to="/shop" className="btn-gold mt-8">Shop now</Link>
        </Reveal>
      </section>
    </main>
  );
}
