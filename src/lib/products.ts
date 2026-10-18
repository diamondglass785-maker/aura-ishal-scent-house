import auraImg from "@/assets/aura-standin.jpg";
import ishalImg from "@/assets/ishal-standin.jpg";
import heroPoster from "@/assets/hero-poster.jpg";
import amberWave from "@/assets/amber-wave.jpg";

export type GalleryImage = { src: string; alt: string; caption: string; pendingOriginal?: boolean };

export type Product = {
  slug: "aura" | "ishal";
  name: string;
  shortName: string;
  size: string;
  mrp: number;
  price: number;
  image: string;
  tagline: string;
  description: string;
  highlights: string[];
  gallery: GalleryImage[];
  inStock: boolean;
};

/**
 * Temporary stand-in images are used until the brand uploads the original
 * Aura / Ishal photographs. Replace `image` and `gallery[].src` with the originals.
 */
export const PRODUCTS: Record<Product["slug"], Product> = {
  aura: {
    slug: "aura",
    name: "VIP PERFUME AURA",
    shortName: "Aura",
    size: "50ml",
    mrp: 999,
    price: 499,
    image: auraImg,
    tagline: "Bold opening. Warm, memorable character.",
    description:
      "Aura is a distinctive premium fragrance with a bold opening that settles into a warm, memorable character — crafted for those who want to leave a lasting impression.",
    highlights: [
      "Bold, confident opening",
      "Warm, memorable dry-down",
      "Elegant black-and-gold presentation",
      "50ml Eau de Parfum format",
    ],
    gallery: [
      { src: auraImg, alt: "VIP Perfume Aura bottle micro close-up", caption: "Micro close-up", pendingOriginal: true },
      { src: auraImg, alt: "VIP Perfume Aura bottle resting on water", caption: "On still water", pendingOriginal: true },
      { src: heroPoster, alt: "VIP Perfume Aura bottle and box with a watch", caption: "Bottle, box & watch", pendingOriginal: true },
      { src: auraImg, alt: "VIP Perfume Aura bottle side angle", caption: "Side angle", pendingOriginal: true },
    ],
    inStock: true,
  },
  ishal: {
    slug: "ishal",
    name: "VIP PERFUME ISHAL",
    shortName: "Ishal",
    size: "50ml",
    mrp: 999,
    price: 499,
    image: ishalImg,
    tagline: "Distinctive character in black and gold.",
    description:
      "Ishal is a distinctive fragrance presented in elegant black-and-gold packaging — a refined companion for everyday sophistication and special evenings alike.",
    highlights: [
      "Distinctive signature character",
      "Elegant black-and-gold packaging",
      "Ideal for gifting",
      "50ml Eau de Parfum format",
    ],
    gallery: [
      { src: ishalImg, alt: "VIP Perfume Ishal bottle on water", caption: "On water", pendingOriginal: true },
      { src: ishalImg, alt: "VIP Perfume Ishal bottle falling into liquid gold splash", caption: "Golden splash", pendingOriginal: true },
      { src: ishalImg, alt: "Original VIP Perfume Ishal bottle and box", caption: "Bottle & box", pendingOriginal: true },
      { src: amberWave, alt: "Man holding VIP Perfume Ishal", caption: "In hand", pendingOriginal: true },
    ],
    inStock: true,
  },
};

export const PRODUCT_LIST = Object.values(PRODUCTS);

export const discountPct = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

/** Pricing rules. Prices are GST-inclusive; shipping is free (confirm with brand). */
export const SHIPPING_FEE = 0;
export const GST_RATE = 0.18;

export function cartTotals(items: { mrp: number; price: number; qty: number }[]) {
  const mrpTotal = items.reduce((s, i) => s + i.mrp * i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = items.length ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;
  const gstIncluded = Math.round(total - total / (1 + GST_RATE));
  return { mrpTotal, subtotal, savings: mrpTotal - subtotal, shipping, gstIncluded, total };
}

export const CONTACT = {
  phone: "7893393679",
  phoneIntl: "+917893393679",
  whatsapp: "https://wa.me/917893393679",
  instagram: "https://www.instagram.com/vipperfume.india?xtok=MXVneHMzajk0MHY3OQ==",
  amazon: "https://amzn.in/d/0cLmjadw",
};

export const ASSETS = { heroPoster, amberWave };
