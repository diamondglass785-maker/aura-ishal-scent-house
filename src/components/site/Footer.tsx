import { Link } from "@tanstack/react-router";
import { CONTACT } from "@/lib/products";

export function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="h-px shimmer-line" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-2xl tracking-[0.3em] text-gold-gradient">VIP PERFUME</p>
          <p className="mt-3 text-sm text-muted-foreground">The art of fine fragrance. Made for India.</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Shop</p>
          <ul className="space-y-2 text-sm text-ivory/80">
            <li><Link to="/shop" className="hover:text-champagne">All fragrances</Link></li>
            <li><Link to="/aura" className="hover:text-champagne">VIP Perfume Aura</Link></li>
            <li><Link to="/ishal" className="hover:text-champagne">VIP Perfume Ishal</Link></li>
            <li><Link to="/cart" className="hover:text-champagne">Shopping bag</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Discover</p>
          <ul className="space-y-2 text-sm text-ivory/80">
            <li><Link to="/explore-fragrance" className="hover:text-champagne">Explore fragrance</Link></li>
            <li><Link to="/contact" className="hover:text-champagne">Contact</Link></li>
            <li><Link to="/contact" hash="returns" className="hover:text-champagne">Shipping & returns</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Connect</p>
          <ul className="space-y-2 text-sm text-ivory/80">
            <li><a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-champagne">WhatsApp</a></li>
            <li><a href={`tel:${CONTACT.phoneIntl}`} className="hover:text-champagne">+91 {CONTACT.phone}</a></li>
            <li><a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-champagne">Instagram</a></li>
            <li><a href={CONTACT.amazon} target="_blank" rel="noopener noreferrer" className="hover:text-champagne">Shop on Amazon</a></li>
          </ul>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} VIP Perfume India. All rights reserved.</p>
    </footer>
  );
}
