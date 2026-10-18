import { createFileRoute } from "@tanstack/react-router";
import { ProductDetail, productHead } from "@/components/site/ProductDetail";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/ishal")({
  head: () =>
    productHead(
      PRODUCTS.ishal,
      "VIP Perfume Ishal 50ml | Premium Long-Lasting Fragrance",
      "Explore VIP Perfume Ishal 50ml, a distinctive fragrance presented in elegant black-and-gold packaging. Discover Ishal and shop VIP Perfume online in India.",
      "VIP Perfume Ishal, Ishal perfume price, buy Ishal perfume online, premium perfume India, luxury fragrance, long lasting perfume",
    ),
  component: () => <ProductDetail product={PRODUCTS.ishal} />,
});
