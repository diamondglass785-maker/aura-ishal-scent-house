import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ASSETS, PRODUCTS } from "@/lib/products";

const TITLE = "VIP Perfume Fragrance Notes | Explore Aura and Ishal";
const DESC = "Explore VIP Perfume Aura fragrance notes, scent character, and fragrance layers. Discover the collection and learn more about VIP Perfume Aura and Ishal.";

export const Route = createFileRoute("/explore-fragrance")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "perfume top notes, heart notes, base notes, Aura perfume notes, VIP Perfume fragrance, woody fragrance, amber fragrance, spicy fragrance" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/explore-fragrance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/explore-fragrance" }],
  }),
  component: Explore,
});

/** Aura notes are PROPOSED, pending brand confirmation. */
const AURA_NOTES = {
  confirmed: false,
  family: "Woody · Amber · Spicy (proposed)",
  top: ["Apple", "Bergamot", "Lemon"],
  heart: ["Rose", "Cinnamon", "Cardamom", "Caramel"],
  base: ["Oud", "Amber", "Musk", "Woody Notes"],
};

/** Ishal notes: fill in once confirmed by the brand. Empty = not published. */
const ISHAL_NOTES: { family: string; description: string; top: string[]; heart: string[]; base: string[] } = {
  family: "",
  description: "",
  top: [],
  heart: [],
  base: [],
};

function BurstVisual() {
  return (
    <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ray" x1="0" x2="1"><stop offset="0" stopColor="var(--champagne)" /><stop offset="1" stopColor="var(--gold)" stopOpacity="0" /></linearGradient>
        <radialGradient id="core"><stop offset="0" stopColor="var(--ivory)" /><stop offset="1" stopColor="var(--gold)" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="60" cy="100" r="40" fill="url(#core)" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} className="burst-ray" x="60" y={100 - 1 + (i - 4) * 14} width={330 - Math.abs(i - 4) * 40} height="2" fill="url(#ray)" style={{ transformOrigin: "60px 100px", animationDelay: `${i * 60}ms`, transform: "scaleX(0)" }} />
      ))}
    </svg>
  );
}

function WaveVisual() {
  return (
    <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <path key={i} className="wave-path" d={`M0 ${110 + i * 12} C 80 ${40 + i * 20}, 160 ${180 - i * 10}, 240 ${100 + i * 8} S 360 ${50 + i * 15}, 400 ${100 + i * 10}`} fill="none" stroke="var(--gold)" strokeOpacity={1 - i * 0.3} strokeWidth={2 - i * 0.5} strokeDasharray="1200" strokeDashoffset="1200" style={{ animationDelay: `${i * 300}ms`, filter: "drop-shadow(0 0 6px var(--gold))" }} />
      ))}
    </svg>
  );
}

function AmberVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="flow-strip absolute inset-y-0 left-0 flex w-[200%]">
        <img src={ASSETS.amberWave} alt="" loading="lazy" className="h-full w-1/2 object-cover" />
        <img src={ASSETS.amberWave} alt="" loading="lazy" className="h-full w-1/2 -scale-x-100 object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
    </div>
  );
}

const STAGES = [
  { n: "01", label: "Top Notes", title: "The Strong Burst", time: "Approx. 0–15 minutes", text: "A luminous, high-energy opening that captures attention instantly, then gradually softens.", Visual: BurstVisual },
  { n: "02", label: "Heart Notes", title: "The Signature Character", time: "Approx. 4–6 hours", text: "The fragrance blooms into its true character — a smooth, expanding warmth.", Visual: WaveVisual },
  { n: "03", label: "Base Notes", title: "The Deep Anchor", time: "Up to 24 hours*", text: "A deep golden-amber foundation of woody and musky accords that settles and lingers.", Visual: AmberVisual },
];

function NoteColumn({ title, notes }: { title: string; notes: string[] }) {
  return (
    <div className="border p-6">
      <h4 className="eyebrow">{title}</h4>
      {notes.length ? (
        <ul className="mt-3 space-y-1 font-display text-2xl text-ivory">{notes.map((n) => <li key={n}>{n}</li>)}</ul>
      ) : (
        <p className="mt-3 text-sm italic text-muted-foreground">To be announced</p>
      )}
    </div>
  );
}

function Explore() {
  return (
    <main className="pt-32">
      <section className="mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <p className="eyebrow">Explore Fragrance</p>
          <h1 className="mt-3 text-5xl sm:text-6xl text-gold-gradient">The Scent Timeline</h1>
          <p className="mt-5 text-ivory/75">How a VIP Perfume unfolds on skin — from a bright first burst to a deep, lasting anchor.</p>
        </Reveal>
      </section>

      <section className="relative mx-auto mt-16 max-w-7xl px-5 lg:px-8" aria-label="Scent timeline">
        <div className="absolute bottom-0 left-8 top-0 w-px bg-gradient-to-b from-gold via-champagne/40 to-transparent lg:left-1/2" aria-hidden="true" />
        <ol className="space-y-20">
          {STAGES.map((s, i) => (
            <li key={s.n}>
              <Reveal className={`stage relative grid items-center gap-8 pl-12 lg:grid-cols-2 lg:gap-16 lg:pl-0`}>
                <span className="absolute left-[26px] top-2 h-3 w-3 rounded-full bg-gold shadow-gold lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true" />
                <div className={`aspect-[2/1] overflow-hidden border bg-card ${i % 2 ? "lg:order-2" : ""}`}><s.Visual /></div>
                <div className={i % 2 ? "lg:text-right" : ""}>
                  <p className="eyebrow">Stage {s.n} · {s.label}</p>
                  <h2 className="mt-2 text-4xl text-ivory">{s.title}</h2>
                  <p className="mt-2 text-champagne">{s.time}</p>
                  <p className="mt-4 text-ivory/75">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-12 text-center text-xs text-muted-foreground">*Timelines are illustrative. Actual longevity varies with skin type, climate and application and has not yet been verified by testing.</p>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-5 lg:px-8" aria-labelledby="aura-pyramid">
        <Reveal className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
          <img src={PRODUCTS.aura.image} alt="VIP Perfume Aura bottle" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          <div>
            <p className="eyebrow">Fragrance Pyramid</p>
            <h2 id="aura-pyramid" className="mt-2 text-5xl text-gold-gradient">Aura</h2>
            <p className="mt-2 text-sm text-champagne">{AURA_NOTES.family}</p>
            <p className="mt-2 inline-block border border-gold/50 px-2 py-1 text-[0.65rem] uppercase tracking-widest text-champagne">Proposed notes · pending brand confirmation</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <NoteColumn title="Top" notes={AURA_NOTES.top} />
              <NoteColumn title="Heart" notes={AURA_NOTES.heart} />
              <NoteColumn title="Base" notes={AURA_NOTES.base} />
            </div>
            <Link to="/aura" className="btn-gold mt-8">Shop Aura</Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-5 lg:px-8" aria-labelledby="ishal-pyramid">
        <Reveal className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="lg:order-1 order-2">
            <p className="eyebrow">Fragrance Pyramid</p>
            <h2 id="ishal-pyramid" className="mt-2 text-5xl text-gold-gradient">Ishal</h2>
            <p className="mt-2 text-sm text-champagne">{ISHAL_NOTES.family || "Fragrance family to be announced"}</p>
            <p className="mt-3 text-ivory/75">{ISHAL_NOTES.description || PRODUCTS.ishal.description}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <NoteColumn title="Top" notes={ISHAL_NOTES.top} />
              <NoteColumn title="Heart" notes={ISHAL_NOTES.heart} />
              <NoteColumn title="Base" notes={ISHAL_NOTES.base} />
            </div>
            <Link to="/ishal" className="btn-gold mt-8">Shop Ishal</Link>
          </div>
          <img src={PRODUCTS.ishal.image} alt="VIP Perfume Ishal bottle" loading="lazy" className="order-1 lg:order-2 aspect-[4/5] w-full object-cover" />
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-4xl px-5 lg:px-8" aria-labelledby="compare">
        <Reveal>
          <h2 id="compare" className="text-center text-4xl text-ivory">Aura & Ishal at a glance</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b"><th className="py-3 eyebrow"> </th><th className="py-3 eyebrow">Aura</th><th className="py-3 eyebrow">Ishal</th></tr></thead>
              <tbody className="text-ivory/85">
                {[
                  ["Size", PRODUCTS.aura.size, PRODUCTS.ishal.size],
                  ["Price", "₹499 (MRP ₹999)", "₹499 (MRP ₹999)"],
                  ["Character", PRODUCTS.aura.tagline, PRODUCTS.ishal.tagline],
                  ["Packaging", "Black & gold", "Black & gold"],
                ].map(([k, a, b]) => (
                  <tr key={k} className="border-b border-border/50"><td className="py-3 text-muted-foreground">{k}</td><td className="py-3">{a}</td><td className="py-3">{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/aura" className="btn-outline-gold">View Aura</Link>
            <Link to="/ishal" className="btn-outline-gold">View Ishal</Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
