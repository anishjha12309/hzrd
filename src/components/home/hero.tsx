"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowDownRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleHeroQuickAdd = () => {
    addItem({
      id: 100, // Hero featured product
      name: "FOLDED TEE // WHITE",
      price: 325,
      image: "/images/white-tee.png",
      color: "White",
      size: "M",
    });
    toast.success("FOLDED TEE // WHITE added to cart", {
      description: "Size: M / Color: White",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(textRef.current?.querySelectorAll(".char") || [], {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      })
      .from(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      }, "-=0.5");
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-white flex flex-col justify-center items-center overflow-hidden pt-20">
      
      {/* Background/grid elements */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 px-4 md:px-8 pointer-events-none opacity-20">
        <div className="col-span-1 border-r border-black h-full"></div>
        <div className="col-span-1 border-r border-black h-full hidden md:block"></div>
        <div className="col-span-8"></div>
        <div className="col-span-1 border-l border-black h-full"></div>
        <div className="col-span-1 border-l border-black h-full hidden md:block"></div>
      </div>

      <div className="z-10 container mx-auto px-4 md:px-8 relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        
        {/* Left: Text */}
        <div className="flex flex-col items-start gap-6">
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-gray-500 border border-gray-200 px-3 py-1 rounded-full">
                SS26 Collection
            </span>
            <h1 ref={textRef} className="font-heading text-6xl md:text-9xl font-bold uppercase leading-[0.9] tracking-tighter">
                <div className="overflow-hidden"><span className="char inline-block">Heavy</span></div>
                <div className="overflow-hidden"><span className="char inline-block">Weight</span></div>
                <div className="overflow-hidden text-gray-300"><span className="char inline-block">Cotton</span></div>
            </h1>
            <p className="font-sans text-sm md:text-base max-w-md text-gray-600 mt-4 leading-relaxed">
                Defining the grey area between black and white as the color Off-White. Industrial manufacturing meets luxury streetwear.
            </p>
            <div className="mt-8 flex gap-4">
                <Button className="rounded-none bg-black text-white px-8 py-6 uppercase tracking-widest text-sm hover:bg-gray-800 transition-all font-heading">
                    Shop Syntax
                </Button>
                <Button variant="outline" className="rounded-none border-black hover:bg-black hover:text-white px-8 py-6 uppercase tracking-widest text-sm transition-all font-heading">
                    View Lookbook
                </Button>
            </div>
        </div>

        {/* Right: Featured Product (Folded) */}
        <div ref={imageRef} className="relative w-full aspect-square flex items-center justify-center">
            {/* Decorative circle behind */}
            <div className="absolute w-[80%] h-[80%] border border-black/10 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[60%] h-[60%] border border-black/5 rounded-full" />
            
            {/* Product Image */}
            <div className="group relative w-[80%] h-[80%] bg-[#F5F5F5] shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700 ease-out">
                <img 
                    src="/images/white-tee.png" 
                    alt="Folded White Tee" 
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 p-8"
                />
                
                {/* Quick Add Button */}
                <button
                  onClick={handleHeroQuickAdd}
                  className="absolute bottom-8 left-8 bg-black text-white px-6 py-3 font-mono text-xs uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800 flex items-center gap-2"
                >
                  <span>+</span>
                  Add to Bag
                </button>
                
                {/* Floating Tags */}
                <div className="absolute -right-4 top-10 bg-white border border-gray-200 p-2 shadow-sm rotate-12">
                    <ArrowDownRight className="w-4 h-4" />
                </div>
                <div className="absolute -left-4 bottom-10 bg-black text-white px-3 py-1 font-mono text-xs -rotate-6">
                    "TEE"
                </div>
            </div>
        </div>

      </div>

      {/* Footer / Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 font-mono text-xs uppercase text-gray-400">
        <span>© 2026 HZRD INC.</span>
        
      </div>

    </section>
  );
}
