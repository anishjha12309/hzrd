import { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { ProductCarousel } from "@/components/home/product-carousel";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "HZRD | Premium Streetwear India - Limited Edition Drops",
  description:
    "Shop premium streetwear at HZRD. Limited edition t-shirts, hoodies, cargo pants & accessories. Heavyweight cotton, oversized fits, brutalist design. Free shipping on orders above ₹1500.",
  keywords: [
    "streetwear India",
    "premium t-shirts",
    "oversized hoodies",
    "cargo pants",
    "streetwear accessories",
    "limited edition fashion",
    "Delhi streetwear",
  ],
  openGraph: {
    title: "HZRD | Premium Streetwear India",
    description:
      "Limited edition streetwear drops. Heavyweight cotton, oversized fits, brutalist design.",
    type: "website",
  },
  alternates: {
    canonical: "https://hzrd.store",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Hero />
      <Ticker />
      <ProductCarousel />
      <RecentlyViewed />
      <Footer />
    </main>
  );
}
