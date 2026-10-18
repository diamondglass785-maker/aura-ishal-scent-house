import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { ASSETS, PRODUCTS, PRODUCT_LIST } from "@/lib/products";

/** Set to the uploaded brand advertisement video URL once provided. */
const HERO_VIDEO_SRC: string | null = null;

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
  const bg = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const on = () => { if (bg.current) bg.current.style.transform = `translateY(${window.scrollY * 0.25}px)`; };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden">
      <div ref={bg} className="absolute inset-0">
        {HERO_VIDEO_SRC ? (
          <video className="h-full w-full object-cover" src={HERO_VIDEO_SRC} poster={ASSETS.heroPoster} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        ) : (
          <img src={ASSETS.heroPoster} alt="" width={1920} height={1088} className="kenburns h-full w-full object-cover" fetchPriority="high" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-5 text-center">
        <Reveal><p className="eyebrow">The Art of Fine Fragrance</p></Reveal>
        <Reveal delay={150}><h1 className="mt-6 text-5xl leading-[1.05] sm:text-7xl lg:text-8xl text-gold-gradient">LEAVE A LASTING IMPRESSION</h1></Reveal>
        <Reveal delay={300}><p className="mx-auto mt-6 max-w-xl text-base text-ivory/85 sm:text-lg">Discover the distinctive character of VIP PERFUME Aura and Ishal.</p></Reveal>
        <Reveal delay={450} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/shop" className="btn-gold">Explore the Collection</Link>
          <Link to="/explore-fragrance" className="btn-outline-gold">Discover the Scent Journey</Link>
        </Reveal>
      </div>
      <div className="absolute bottom-8 left-1/2 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-gold to-transparent" />
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
              <img src={p.gallery[1].src} alt={p.gallery[1].alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[2s] hover:scale-105" />
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
