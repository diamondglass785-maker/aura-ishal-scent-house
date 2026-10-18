import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { PRODUCT_LIST } from "@/lib/products";

const TITLE = "Shop VIP Perfume | Aura & Ishal 50ml Online in India";
const DESC = "Shop VIP Perfume Aura and Ishal 50ml online in India at ₹499. Premium long-lasting fragrances in elegant black-and-gold packaging.";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/shop" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

function Shop() {
  return (
    <main className="mx-auto max-w-7xl px-5 pt-36 lg:px-8">
      <Reveal className="text-center">
        <p className="eyebrow">Shop</p>
        <h1 className="mt-3 text-5xl sm:text-6xl text-gold-gradient">The Collection</h1>
        <p className="mt-4 text-muted-foreground">Two distinctive fragrances. Inclusive of all taxes.</p>
      </Reveal>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {PRODUCT_LIST.map((p, i) => <Reveal key={p.slug} delay={i * 120}><ProductCard product={p} /></Reveal>)}
      </div>
    </main>
  );
}
