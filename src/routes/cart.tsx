import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cartTotals, formatINR, PRODUCTS } from "@/lib/products";

const TITLE = "Shopping Cart | VIP Perfume India";
const DESC = "Review your VIP Perfume order, update quantities, check your order total, and proceed to secure checkout.";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

export function OrderSummary() {
  const { lines } = useCart();
  const items = lines.map((l) => ({ ...PRODUCTS[l.slug], qty: l.qty }));
  const t = cartTotals(items);
  return (
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between"><dt className="text-muted-foreground">MRP total</dt><dd className="line-through text-muted-foreground">{formatINR(t.mrpTotal)}</dd></div>
      <div className="flex justify-between"><dt className="text-muted-foreground">Discount</dt><dd className="text-champagne">− {formatINR(t.savings)}</dd></div>
      <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatINR(t.subtotal)}</dd></div>
      <div className="flex justify-between"><dt>Shipping</dt><dd>{t.shipping ? formatINR(t.shipping) : "Free"}</dd></div>
      <div className="flex justify-between text-muted-foreground"><dt>GST (incl. in price)</dt><dd>{formatINR(t.gstIncluded)}</dd></div>
      <div className="flex justify-between border-t pt-3 text-lg"><dt className="font-display text-2xl">Total</dt><dd className="text-champagne">{formatINR(t.total)}</dd></div>
    </dl>
  );
}

function CartPage() {
  const { lines, setQty, remove } = useCart();
  return (
    <main className="mx-auto max-w-6xl px-5 pt-36 lg:px-8">
      <h1 className="text-5xl text-gold-gradient">Your Shopping Bag</h1>
      {lines.length === 0 ? (
        <div className="mt-12 border p-12 text-center">
          <p className="text-ivory/80">Your bag is empty.</p>
          <Link to="/shop" className="btn-gold mt-6">Explore the collection</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y border-y">
            {lines.map((l) => {
              const p = PRODUCTS[l.slug];
              return (
                <li key={l.slug} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[110px_minmax(0,1fr)_auto]">
                  <Link to={`/${p.slug}`}><img src={p.image} alt={p.name} className="aspect-square w-full object-cover" /></Link>
                  <div className="min-w-0">
                    <Link to={`/${p.slug}`} className="font-display text-2xl text-ivory">{p.name}</Link>
                    <p className="text-xs text-muted-foreground">{p.size}</p>
                    <p className="mt-1 text-sm"><span className="text-champagne">{formatINR(p.price)}</span> <span className="ml-2 text-muted-foreground line-through">{formatINR(p.mrp)}</span></p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center border" role="group" aria-label={`Quantity for ${p.shortName}`}>
                        <button className="p-2 text-champagne" aria-label="Decrease" onClick={() => setQty(l.slug, l.qty - 1)}><Minus size={13} /></button>
                        <span className="w-8 text-center text-sm">{l.qty}</span>
                        <button className="p-2 text-champagne" aria-label="Increase" onClick={() => setQty(l.slug, l.qty + 1)}><Plus size={13} /></button>
                      </div>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive" onClick={() => remove(l.slug)} aria-label={`Remove ${p.shortName}`}><Trash2 size={14} /> Remove</button>
                    </div>
                  </div>
                  <p className="col-span-2 text-right text-ivory sm:col-span-1">{formatINR(p.price * l.qty)}</p>
                </li>
              );
            })}
          </ul>
          <aside className="h-fit border bg-card p-6">
            <h2 className="mb-5 text-3xl">Order summary</h2>
            <OrderSummary />
            <Link to="/checkout" className="btn-gold mt-6 w-full">Proceed to checkout</Link>
            <Link to="/shop" className="mt-3 block text-center text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-champagne">Continue shopping</Link>
          </aside>
        </div>
      )}
    </main>
  );
}
