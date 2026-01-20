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
    <section ref={containerRef} className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden pt-20 pb-8 md:pb-0">
      
      {/* Background/grid elements */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 px-4 md:px-8 pointer-events-none opacity-20">
        <div className="col-span-1 border-r border-black h-full"></div>
        <div className="col-span-1 border-r border-black h-full hidden md:block"></div>
        <div className="col-span-8"></div>
        <div className="col-span-1 border-l border-black h-full"></div>
        <div className="col-span-1 border-l border-black h-full hidden md:block"></div>
      </div>

      <div className="z-10 container mx-auto px-4 md:px-8 relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center flex-1">
        
        {/* Left: Text */}
        <div className="flex flex-col items-start gap-4 md:gap-6 pt-4 md:pt-0">
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-gray-500 border border-gray-200 px-3 py-1 rounded-full">
                SS26 Collection
            </span>
            <h1 ref={textRef} className="font-heading text-5xl sm:text-6xl md:text-9xl font-bold uppercase leading-[0.9] tracking-tighter">
                <div className="overflow-hidden"><span className="char inline-block">Heavy</span></div>
                <div className="overflow-hidden"><span className="char inline-block">Weight</span></div>
                <div className="overflow-hidden text-gray-300"><span className="char inline-block">Cotton</span></div>
            </h1>
            <p className="font-sans text-sm md:text-base max-w-md text-gray-600 leading-relaxed">
                Defining the grey area between black and white as the color Off-White. Industrial manufacturing meets luxury streetwear.
            </p>
            <div className="mt-4 md:mt-8 flex gap-4">
                <a href="/shop">
                  <Button className="rounded-none bg-black text-white px-6 md:px-8 py-5 md:py-6 uppercase tracking-widest text-xs md:text-sm hover:bg-gray-800 transition-all font-heading">
                      Shop Now
                  </Button>
                </a>
                <a href="/about">
                  <Button variant="outline" className="rounded-none border-black hover:bg-black hover:text-white px-6 md:px-8 py-5 md:py-6 uppercase tracking-widest text-xs md:text-sm transition-all font-heading">
                      Our Story
                  </Button>
                </a>
            </div>
        </div>

        {/* Right: Featured Product (Folded) */}
        <div ref={imageRef} className="relative w-full aspect-square max-h-[50vh] md:max-h-none flex items-center justify-center">
            {/* Decorative circle behind */}
            <div className="absolute w-[80%] h-[80%] border border-black/10 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[60%] h-[60%] border border-black/5 rounded-full" />
            
            {/* Product Image */}
            <div className="group relative w-[70%] md:w-[80%] h-[70%] md:h-[80%] bg-[#F5F5F5] shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700 ease-out">
                <img 
                    src="/images/white-tee.png" 
                    alt="Folded White Tee" 
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 p-4 md:p-8"
                />
                
                {/* Quick Add Button */}
                <button
                  onClick={handleHeroQuickAdd}
                  className="absolute bottom-4 md:bottom-8 left-4 md:left-8 bg-black text-white px-4 md:px-6 py-2 md:py-3 font-mono text-[10px] md:text-xs uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800 flex items-center gap-2"
                >
                  <span>+</span>
                  Add to Bag
                </button>
                
               
             
            </div>
        </div>

      </div>

      {/* Footer / Scroll Indicator */}
      <div className="relative md:absolute md:bottom-8 left-0 right-0 flex justify-between px-4 md:px-8 font-mono text-xs uppercase text-gray-400 mt-4 md:mt-0">
        <span>© 2026 HZRD INC.</span>
        
      </div>

    </section>
  );
}
