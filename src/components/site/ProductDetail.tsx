import { Link, useNavigate } from "@tanstack/react-router";
import { Check, Heart, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { discountPct, formatINR, PRODUCT_LIST, type Product } from "@/lib/products";
import { Gallery } from "./Gallery";
import { Reveal } from "./Reveal";

export function ProductDetail({ product }: { product: Product }) {
  const { add, wishlist, toggleWish } = useCart();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const wished = wishlist.includes(product.slug);
  const other = PRODUCT_LIST.find((p) => p.slug !== product.slug)!;

  return (
    <main className="pt-24">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 py-4 text-xs text-muted-foreground lg:px-8">
        <Link to="/" className="hover:text-champagne">Home</Link> / <Link to="/shop" className="hover:text-champagne">Shop</Link> / <span className="text-champagne">{product.shortName}</span>
      </nav>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Gallery images={product.gallery} />
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Eau de Parfum · {product.size}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl text-gold-gradient">{product.name}</h1>
          <p className="mt-3 font-display text-xl italic text-champagne">{product.tagline}</p>
          <div className="mt-6 flex items-baseline gap-4">
            <span className="text-3xl font-light text-ivory">{formatINR(product.price)}</span>
            <span className="text-muted-foreground line-through">{formatINR(product.mrp)}</span>
            <span className="bg-gold px-2 py-0.5 text-xs font-semibold text-onyx">{discountPct(product)}% OFF</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>
          <p className="mt-6 leading-relaxed text-ivory/80">{product.description}</p>
          <ul className="mt-6 space-y-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-ivory/85"><Check size={15} className="text-gold" /> {h}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm"><span className={product.inStock ? "text-champagne" : "text-destructive"}>●</span> {product.inStock ? "In stock — ready to ship" : "Out of stock"}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center border" role="group" aria-label="Quantity">
              <button className="p-3 text-champagne" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={14} /></button>
              <span className="w-10 text-center" aria-live="polite">{qty}</span>
              <button className="p-3 text-champagne" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))}><Plus size={14} /></button>
            </div>
            <button
              className={`grid h-[46px] w-[46px] place-items-center border transition ${wished ? "bg-gold text-onyx" : "text-champagne"}`}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wished}
              onClick={() => { toggleWish(product.slug); toast(wished ? "Removed from wishlist" : "Saved to wishlist"); }}
            >
              <Heart size={18} fill={wished ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button className="btn-outline-gold" disabled={!product.inStock} onClick={() => { add(product.slug, qty); toast.success(`${product.shortName} × ${qty} added to bag`, { action: { label: "View bag", onClick: () => navigate({ to: "/cart" }) } }); }}>Add to cart</button>
            <button className="btn-gold" disabled={!product.inStock} onClick={() => { add(product.slug, qty); navigate({ to: "/checkout" }); }}>Buy now</button>
          </div>

          <div className="mt-8 space-y-3 border-t pt-6 text-sm text-ivory/75">
            <p className="flex gap-3"><Truck size={17} className="shrink-0 text-gold" /> Shipping across India. Delivery timelines are shared on order confirmation.</p>
            <p className="flex gap-3"><RotateCcw size={17} className="shrink-0 text-gold" /> <span>Questions about returns? See our <Link to="/contact" hash="returns" className="text-champagne underline underline-offset-4">return policy</Link>.</span></p>
          </div>
          <Link to="/explore-fragrance" className="mt-6 inline-block text-xs uppercase tracking-[0.25em] text-champagne hover:underline">Explore the scent journey →</Link>
        </div>
      </section>

      <Reveal as="section" className="mx-auto mt-24 max-w-7xl px-5 lg:px-8">
        <p className="eyebrow">Also in the collection</p>
        <Link to={`/${other.slug}`} className="group mt-4 grid items-center gap-6 border p-5 sm:grid-cols-[160px_1fr_auto]">
          <img src={other.image} alt={other.name} loading="lazy" className="aspect-square w-full object-cover sm:w-40" />
          <div>
            <h2 className="text-3xl text-ivory">{other.name}</h2>
            <p className="text-muted-foreground">{other.tagline}</p>
          </div>
          <span className="btn-outline-gold">View {other.shortName}</span>
        </Link>
      </Reveal>
    </main>
  );
}

export function productHead(p: Product, title: string, description: string, keywords: string) {
  const path = `/${p.slug}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.description,
          brand: { "@type": "Brand", name: "VIP Perfume" },
          offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", url: path },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Shop", item: "/shop" },
            { "@type": "ListItem", position: 3, name: p.shortName, item: path },
          ],
        }),
      },
    ],
  };
}
