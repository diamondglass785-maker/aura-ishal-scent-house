import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { discountPct, formatINR, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="group relative overflow-hidden border bg-card transition-shadow duration-700 hover:shadow-gold">
      <Link to={`/${product.slug}`} className="block overflow-hidden">
        <img src={product.image} alt={`${product.name} ${product.size} bottle`} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
      </Link>
      <span className="absolute left-4 top-4 bg-gold px-2 py-0.5 text-[0.65rem] font-semibold text-onyx">{discountPct(product)}% OFF</span>
      <div className="p-6">
        <p className="eyebrow">{product.size} · Eau de Parfum</p>
        <h3 className="mt-2 text-3xl text-ivory"><Link to={`/${product.slug}`}>{product.name}</Link></h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-xl text-champagne">{formatINR(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatINR(product.mrp)}</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link to={`/${product.slug}`} className="btn-outline-gold !px-3">Discover</Link>
          <button className="btn-gold !px-3" onClick={() => { add(product.slug); toast.success(`${product.shortName} added to bag`); }}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}
