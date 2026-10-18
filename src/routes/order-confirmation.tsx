import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CONTACT, formatINR } from "@/lib/products";

type Order = { orderId: string; items: { name: string; qty: number; price: number }[]; total: number; paymentStatus: string; customer: { name: string } };

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Received | VIP Perfume India" },
      { name: "description", content: "Your VIP Perfume order request has been received." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Order Received | VIP Perfume India" },
      { property: "og:description", content: "Your VIP Perfume order request has been received." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => { try { setOrder(JSON.parse(sessionStorage.getItem("vip-last-order") || "null")); } catch { /* ignore */ } }, []);

  if (!order) {
    return (
      <main className="mx-auto max-w-xl px-5 pt-40 text-center">
        <h1 className="text-4xl text-ivory">No recent order found</h1>
        <Link to="/shop" className="btn-gold mt-6">Shop the collection</Link>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-2xl px-5 pt-36">
      <p className="eyebrow">Thank you, {order.customer.name}</p>
      <h1 className="mt-3 text-5xl text-gold-gradient">Order request received</h1>
      <div className="mt-8 border bg-card p-6">
        <div className="flex flex-wrap justify-between gap-2 text-sm">
          <span>Order number: <strong className="text-champagne">{order.orderId}</strong></span>
          <span>Payment status: <strong className="text-champagne">Pending — not yet paid</strong></span>
        </div>
        <ul className="mt-6 divide-y border-y text-sm">
          {order.items.map((i) => (
            <li key={i.name} className="flex justify-between py-3"><span>{i.name} × {i.qty}</span><span>{formatINR(i.price * i.qty)}</span></li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between font-display text-2xl"><span>Total</span><span className="text-champagne">{formatINR(order.total)}</span></p>
      </div>
      <p className="mt-6 text-sm text-ivory/75">Our team will confirm your order on WhatsApp and share a secure payment link. If WhatsApp didn't open, message us with your order number.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi, my order number is ${order.orderId}`)}`} target="_blank" rel="noopener noreferrer" className="btn-gold">Message us on WhatsApp</a>
        <Link to="/" className="btn-outline-gold">Back to home</Link>
      </div>
    </main>
  );
}
