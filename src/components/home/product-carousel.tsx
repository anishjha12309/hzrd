"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

const PRODUCTS = [
  {
    id: 1,
    name: "FOLDED TEE // WHITE",
    price: 325,
    image: "/images/white-tee.png",
    color: "White",
    size: "M",
  },
  {
    id: 2,
    name: "FOLDED HOODIE // BLACK",
    price: 550,
    image: "/images/black-hoodie.png",
    color: "Black",
    size: "L",
  },
  {
    id: 3,
    name: "FOLDED TEE // BEIGE",
    price: 325,
    image: "/images/beige-tee.png",
    color: "Beige",
    size: "M",
  },
  {
    id: 4,
    name: "FOLDED TEE // WHITE V2",
    price: 325,
    image: "/images/white-tee.png",
    color: "White",
    size: "L",
  },
  {
    id: 5,
    name: "FOLDED HOODIE // BLACK V2",
    price: 550,
    image: "/images/black-hoodie.png",
    color: "Black",
    size: "XL",
  },
];

export function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const handleQuickAdd = (product: typeof PRODUCTS[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.color,
      size: product.size,
    });
    toast.success(`${product.name} added to cart`, {
      description: `Size: ${product.size} / Color: ${product.color}`,
    });
  };

  return (
    <section className="py-24 border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4 md:px-8 mb-12 flex justify-between items-end">
        <div>
          <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
            The Archive
          </span>
          <h2 className="font-heading text-4xl uppercase tracking-tighter">Latest Arrivals</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="p-3 border border-gray-100 hover:bg-black hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="p-3 border border-gray-100 hover:bg-black hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="flex-[0_0_80%] md:flex-[0_0_30%] min-w-0 pl-4">
              <div className="group relative cursor-pointer">
                <div className="aspect-[4/5] bg-brand-off relative overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply p-12 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Quick Add Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAdd(product);
                    }}
                    className="absolute bottom-4 left-4 bg-white px-4 py-2 text-xs font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 translate-y-2 group-hover:translate-y-0 hover:bg-black hover:text-white flex items-center gap-2 border border-transparent hover:border-black"
                  >
                    <Plus className="w-3 h-3" />
                    Quick Add
                  </button>
                </div>

                <div className="flex justify-between items-start">
                  <h3 className="font-sans text-sm font-medium uppercase group-hover:underline decoration-1 underline-offset-4">
                    {product.name}
                  </h3>
                  <span className="font-mono text-sm text-gray-500">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
