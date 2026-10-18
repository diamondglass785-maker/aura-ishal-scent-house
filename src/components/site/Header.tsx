import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { PRODUCT_LIST } from "@/lib/products";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/aura", label: "Aura" },
  { to: "/ishal", label: "Ishal" },
  { to: "/explore-fragrance", label: "Explore Fragrance" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const results = q.trim()
    ? [...PRODUCT_LIST.map((p) => ({ to: `/${p.slug}`, label: p.name, hint: p.tagline })),
       { to: "/explore-fragrance", label: "Explore Fragrance", hint: "Notes & scent timeline" },
       { to: "/contact", label: "Contact", hint: "WhatsApp, call, Instagram" }]
        .filter((r) => (r.label + r.hint).toLowerCase().includes(q.toLowerCase()))
    : [];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-background/90 backdrop-blur-md border-b" : "bg-gradient-to-b from-background/70 to-transparent"}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 lg:px-8">
        <button className="lg:hidden text-champagne" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link to="/" className="font-display text-xl tracking-[0.3em] text-gold-gradient justify-self-center lg:justify-self-start" onClick={() => setOpen(false)}>
          VIP PERFUME
        </Link>
        <nav className="hidden lg:flex justify-center gap-7" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-[0.7rem] uppercase tracking-[0.25em] text-ivory/75 hover:text-champagne transition-colors" activeProps={{ className: "!text-champagne" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-champagne">
          <button aria-label="Search" onClick={() => setSearch(!search)}><Search size={19} /></button>
          <Link to="/cart" aria-label={`Shopping bag, ${count} items`} className="relative">
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-semibold text-onyx">{count}</span>
            )}
          </Link>
        </div>
      </div>

      {search && (
        <div className="border-t bg-background/95 px-5 py-4">
          <form
            className="mx-auto max-w-2xl"
            onSubmit={(e) => { e.preventDefault(); if (results[0]) { navigate({ to: results[0].to }); setSearch(false); setQ(""); } }}
          >
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Aura, Ishal, fragrance notes…" className="field" aria-label="Search the site" />
            {results.length > 0 && (
              <ul className="mt-2 divide-y border">
                {results.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} onClick={() => { setSearch(false); setQ(""); }} className="block px-4 py-3 hover:bg-accent">
                      <span className="block text-sm text-ivory">{r.label}</span>
                      <span className="text-xs text-muted-foreground">{r.hint}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {q && results.length === 0 && <p className="mt-2 text-sm text-muted-foreground">No results.</p>}
          </form>
        </div>
      )}

      {open && (
        <nav className="lg:hidden border-t px-5 pb-8 pt-4" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl text-ivory border-b border-border/50">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
