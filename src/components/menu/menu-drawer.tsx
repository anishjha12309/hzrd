"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const MENU_ITEMS = [
  { label: "Shop All", href: "/shop", highlight: true },
  { label: "T-Shirts", href: "/shop/t-shirts" },
  { label: "Hoodies", href: "/shop/hoodies" },
  { label: "Pants", href: "/shop/pants" },
  { label: "Accessories", href: "/shop/accessories" },
];

const SECONDARY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "FAQ", href: "/faq" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
];

export function MenuDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => {
        if (open) {
          // Blur the trigger to prevent aria-hidden focus warning
          (document.activeElement as HTMLElement)?.blur();
        }
        setIsOpen(open);
      }} direction="left" noBodyStyles>
      <Drawer.Trigger asChild>
        <button className="group flex items-center gap-2">
          <Menu className="w-6 h-6" />
          <span className="hidden md:block font-mono text-xs uppercase tracking-widest group-hover:underline">
            Menu
          </span>
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm" />
        <Drawer.Content className="fixed left-0 top-0 bottom-0 w-full md:w-[600px] bg-black text-white z-50 outline-none overflow-hidden">
          <Drawer.Title className="sr-only">Navigation Menu</Drawer.Title>
          <Drawer.Description className="sr-only">Browse shop categories and site navigation</Drawer.Description>
          
          <div className="h-full flex flex-col p-8 md:p-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-16">
              <span className="font-heading text-2xl tracking-tighter">HZRD™</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1">
              <ul className="space-y-2">
                <AnimatePresence>
                  {MENU_ITEMS.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group flex items-center justify-between py-3 border-b border-white/10 hover:border-white transition-colors"
                      >
                        <span
                          className={`font-heading text-4xl md:text-6xl uppercase tracking-tight transition-all duration-300 ${
                            hoveredIndex !== null && hoveredIndex !== index
                              ? "opacity-30"
                              : "opacity-100"
                          } ${item.highlight ? "text-white" : "text-white/80"}`}
                        >
                          {item.label}
                        </span>
                        <ArrowUpRight
                          className={`w-6 h-6 transition-all duration-300 ${
                            hoveredIndex === index
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-4"
                          }`}
                        />
                      </Link>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </nav>

            {/* Secondary Links */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-12">
              {SECONDARY_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-xs uppercase text-white/50 hover:text-white transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end">
              {/* Social Links */}
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-white/20 hover:bg-white hover:text-black transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <span className="font-mono text-xs text-white/30">
                © 2026 HZRD INC.
              </span>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-5 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-heading text-[80px] fill-current"
                >
                  H
                </text>
              </svg>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
