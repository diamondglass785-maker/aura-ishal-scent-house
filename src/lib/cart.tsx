import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

export type CartLine = { slug: Product["slug"]; qty: number };
type Ctx = {
  lines: CartLine[];
  count: number;
  add: (slug: Product["slug"], qty?: number) => void;
  setQty: (slug: Product["slug"], qty: number) => void;
  remove: (slug: Product["slug"]) => void;
  clear: () => void;
  wishlist: Product["slug"][];
  toggleWish: (slug: Product["slug"]) => void;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "vip-cart-v1";
const WKEY = "vip-wish-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWish] = useState<Product["slug"][]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "[]") as CartLine[];
      setLines(raw.filter((l) => PRODUCTS[l.slug] && l.qty > 0));
      setWish(JSON.parse(localStorage.getItem(WKEY) || "[]"));
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(lines)); }, [lines, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem(WKEY, JSON.stringify(wishlist)); }, [wishlist, loaded]);

  const clamp = (n: number) => Math.max(1, Math.min(10, Math.floor(n)));
  const value: Ctx = {
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    add: (slug, qty = 1) =>
      setLines((ls) => {
        const ex = ls.find((l) => l.slug === slug);
        return ex ? ls.map((l) => (l.slug === slug ? { ...l, qty: clamp(l.qty + qty) } : l)) : [...ls, { slug, qty: clamp(qty) }];
      }),
    setQty: (slug, qty) => setLines((ls) => ls.map((l) => (l.slug === slug ? { ...l, qty: clamp(qty) } : l))),
    remove: (slug) => setLines((ls) => ls.filter((l) => l.slug !== slug)),
    clear: () => setLines([]),
    wishlist,
    toggleWish: (slug) => setWish((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug])),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
