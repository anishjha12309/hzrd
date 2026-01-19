"use client";

import Link from "next/link";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchDrawer } from "@/components/search/search-drawer";
import { MenuDrawer } from "@/components/menu/menu-drawer";
import { WishlistDrawer } from "@/components/wishlist/wishlist-drawer";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-4" : "bg-transparent py-6"}`} style={{ width: '100%' }}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Left: Menu Drawer */}
        <div className="flex items-center gap-4">
          <MenuDrawer />
        </div>

        {/* Center: Brand */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tighter uppercase">HZRD™</h1>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
            <SearchDrawer />
            <WishlistDrawer />
            <CartDrawer />
        </div>
      </div>
    </nav>
  );
}

