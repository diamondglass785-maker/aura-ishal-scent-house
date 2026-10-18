import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useCart } from "@/lib/cart";
import { cartTotals, CONTACT, formatINR, PRODUCTS } from "@/lib/products";
import { OrderSummary } from "./cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | VIP Perfume India" },
      { name: "description", content: "Enter your delivery details and place your VIP Perfume order securely." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Secure Checkout | VIP Perfume India" },
      { property: "og:description", content: "Enter your delivery details and place your VIP Perfume order securely." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  address: z.string().trim().min(5, "Enter your address").max(300),
  city: z.string().trim().min(2, "Enter your city").max(80),
  state: z.string().trim().min(2, "Enter your state").max(80),
  postal: z.string().trim().regex(/^\d{6}$/, "Enter a 6-digit PIN code"),
  country: z.string().trim().min(2).max(60),
});
type Form = z.infer<typeof schema>;

const FIELDS: { k: keyof Form; label: string; type?: string; full?: boolean; auto?: string }[] = [
  { k: "name", label: "Full name", full: true, auto: "name" },
  { k: "email", label: "Email", type: "email", auto: "email" },
  { k: "mobile", label: "Mobile", type: "tel", auto: "tel-national" },
  { k: "address", label: "Address", full: true, auto: "street-address" },
  { k: "city", label: "City", auto: "address-level2" },
  { k: "state", label: "State", auto: "address-level1" },
  { k: "postal", label: "PIN code", auto: "postal-code" },
  { k: "country", label: "Country", auto: "country-name" },
];

function Checkout() {
  const { lines, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({ name: "", email: "", mobile: "", address: "", city: "", state: "", postal: "", country: "India" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-5 pt-40 text-center">
        <h1 className="text-4xl text-ivory">Your bag is empty</h1>
        <Link to="/shop" className="btn-gold mt-6">Shop the collection</Link>
      </main>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as keyof Form] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const items = lines.map((l) => ({ ...PRODUCTS[l.slug], qty: l.qty }));
    const t = cartTotals(items);
    const orderId = `VIP-${Date.now().toString(36).toUpperCase()}`;
    const order = { orderId, createdAt: new Date().toISOString(), customer: r.data, items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })), total: t.total, paymentStatus: "pending" };
    sessionStorage.setItem("vip-last-order", JSON.stringify(order));
    const msg = [
      `New order request ${orderId}`,
      ...order.items.map((i) => `• ${i.name} × ${i.qty} — ${formatINR(i.price * i.qty)}`),
      `Total: ${formatINR(t.total)}`,
      `Name: ${r.data.name}`, `Mobile: ${r.data.mobile}`, `Email: ${r.data.email}`,
      `Address: ${r.data.address}, ${r.data.city}, ${r.data.state} ${r.data.postal}, ${r.data.country}`,
    ].join("\n");
    window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    clear();
    navigate({ to: "/order-confirmation" });
  };

  return (
    <main className="mx-auto max-w-6xl px-5 pt-36 lg:px-8">
      <h1 className="text-5xl text-gold-gradient">Checkout</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
          <h2 className="sm:col-span-2 text-3xl">Delivery details</h2>
          {FIELDS.map((f) => (
            <label key={f.k} className={f.full ? "sm:col-span-2" : ""}>
              <span className="eyebrow mb-2 block">{f.label}</span>
              <input
                className="field"
                type={f.type || "text"}
                autoComplete={f.auto}
                value={form[f.k]}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                aria-invalid={!!errors[f.k]}
              />
              {errors[f.k] && <span className="mt-1 block text-xs text-destructive">{errors[f.k]}</span>}
            </label>
          ))}
          <div className="sm:col-span-2 border border-gold/40 bg-card p-5 text-sm text-ivory/80">
            <p className="eyebrow mb-2">Payment</p>
            <p>Online payment (Razorpay) is being set up. For now, your order request is sent to our team on WhatsApp, who will confirm availability and share a secure payment link. <strong className="text-champagne">No payment is taken on this page.</strong></p>
          </div>
          <button type="submit" className="btn-gold sm:col-span-2">Place order request</button>
        </form>
        <aside className="h-fit border bg-card p-6">
          <h2 className="mb-4 text-3xl">Order summary</h2>
          <ul className="mb-5 space-y-3">
            {lines.map((l) => (
              <li key={l.slug} className="flex items-center gap-3 text-sm">
                <img src={PRODUCTS[l.slug].image} alt="" className="h-14 w-14 object-cover" />
                <span className="flex-1">{PRODUCTS[l.slug].name} × {l.qty}</span>
                <span>{formatINR(PRODUCTS[l.slug].price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <OrderSummary />
        </aside>
      </div>
    </main>
  );
}
