import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { ProductCarousel } from "@/components/home/product-carousel";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Hero />
      <Ticker />
      <ProductCarousel />
      <Footer />
    </main>
  );
}
