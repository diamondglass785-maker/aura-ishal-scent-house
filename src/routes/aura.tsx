import { createFileRoute } from "@tanstack/react-router";
import { ProductDetail, productHead } from "@/components/site/ProductDetail";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/aura")({
  head: () =>
    productHead(
      PRODUCTS.aura,
      "VIP Perfume Aura 50ml | Long-Lasting Premium Fragrance",
      "Discover VIP Perfume Aura 50ml, a distinctive premium fragrance with a bold opening and a warm, memorable character. Explore Aura and shop online in India.",
      "VIP Perfume Aura, Aura perfume India, buy VIP Perfume Aura, Aura perfume price, premium fragrance, long lasting perfume, woody fragrance, amber fragrance, oud fragrance",
    ),
  component: () => <ProductDetail product={PRODUCTS.aura} />,
});
