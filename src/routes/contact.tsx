import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MessageCircle, Phone, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/products";

const TITLE = "Contact VIP Perfume India | WhatsApp and Customer Support";
const DESC = "Contact VIP Perfume for product enquiries, order assistance, and customer support. Connect with us on WhatsApp or Instagram.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(2, "Enter a subject").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});
type F = z.infer<typeof schema>;

function Contact() {
  const [f, setF] = useState<F>({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState<Partial<Record<keyof F, string>>>({});
  const actions = [
    { href: CONTACT.whatsapp, label: "Chat on WhatsApp", icon: MessageCircle, primary: true },
    { href: `tel:${CONTACT.phoneIntl}`, label: "Call us", icon: Phone },
    { href: CONTACT.instagram, label: "Follow on Instagram", icon: Instagram },
    { href: CONTACT.amazon, label: "Shop on Amazon", icon: ShoppingCart },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) {
      const x: typeof err = {};
      r.error.issues.forEach((i) => { x[i.path[0] as keyof F] = i.message; });
      return setErr(x);
    }
    setErr({});
    const text = `Subject: ${r.data.subject}\nFrom: ${r.data.name} (${r.data.email})\n\n${r.data.message}`;
    window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    toast.success("Opening WhatsApp to send your message");
    setF({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="mx-auto max-w-6xl px-5 pt-36 lg:px-8">
      <Reveal className="text-center">
        <p className="eyebrow">Customer care</p>
        <h1 className="mt-3 text-5xl sm:text-6xl text-gold-gradient">Contact VIP Perfume</h1>
        <p className="mt-4 text-ivory/75">Product enquiries, order help or gifting advice — we're a message away.</p>
        <p className="mt-2 text-champagne">WhatsApp / Call: +91 {CONTACT.phone}</p>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map(({ href, label, icon: I, primary }) => (
          <a key={label} href={href} target={href.startsWith("tel") ? undefined : "_blank"} rel="noopener noreferrer" className={primary ? "btn-gold !py-5" : "btn-outline-gold !py-5"}>
            <I size={16} /> {label}
          </a>
        ))}
      </div>

      <section className="mt-20 grid gap-12 lg:grid-cols-2">
        <form onSubmit={submit} noValidate className="space-y-5">
          <h2 className="text-3xl">Send us a message</h2>
          {(["name", "email", "subject"] as const).map((k) => (
            <label key={k} className="block">
              <span className="eyebrow mb-2 block">{k}</span>
              <input className="field" type={k === "email" ? "email" : "text"} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} />
              {err[k] && <span className="mt-1 block text-xs text-destructive">{err[k]}</span>}
            </label>
          ))}
          <label className="block">
            <span className="eyebrow mb-2 block">Message</span>
            <textarea className="field min-h-36" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} aria-invalid={!!err.message} />
            {err.message && <span className="mt-1 block text-xs text-destructive">{err.message}</span>}
          </label>
          <button className="btn-gold w-full" type="submit">Send message</button>
        </form>
        <div id="returns" className="scroll-mt-28 border bg-card p-8">
          <h2 className="text-3xl">Shipping & returns</h2>
          <p className="mt-4 text-sm leading-relaxed text-ivory/75">We ship across India. Delivery timelines are confirmed with your order. If your product arrives damaged or incorrect, contact us on WhatsApp with your order number and photos, and our team will help resolve it.</p>
          <p className="mt-4 text-xs text-muted-foreground">Full return-policy terms will be published here once finalised by VIP Perfume.</p>
        </div>
      </section>
    </main>
  );
}
