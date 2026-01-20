"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Heart, Truck, ExternalLink } from "lucide-react";
import { Product } from "@/lib/product-data";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { toast } from "sonner";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[Math.floor(product.sizes.length / 2)]);
      setQuantity(1);
      setIsWishlisted(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColor,
        size: selectedSize,
      });
    }
    toast.success(`${product.name} added to cart`, {
      description: `${selectedColor} / ${selectedSize} × ${quantity}`,
    });
    onClose();
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    const nowInWishlist = !isWishlisted;
    setIsWishlisted(nowInWishlist);
    toast.success(nowInWishlist ? "Added to wishlist" : "Removed from wishlist");
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-4xl md:max-h-[85vh] bg-white z-50 overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-black hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Product Image */}
              <div className="w-full md:w-1/2 bg-[#F5F5F5] relative aspect-square md:aspect-auto">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover mix-blend-multiply p-8 md:p-12"
                />
                {product.featured && (
                  <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-mono text-xs uppercase">
                    Featured
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                {/* Category */}
                <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                  {product.category.replace("-", " ")}
                </span>

                {/* Name & Price */}
                <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-tighter mt-2 mb-2">
                  {product.name}
                </h2>
                <p className="font-heading text-xl md:text-2xl mb-4">
                  ₹{product.price.toLocaleString()}
                </p>

                {/* Description */}
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {product.description}
                </p>

                {/* Color Selection */}
                {product.colors.length > 0 && (
                  <div className="mb-5">
                    <span className="font-mono text-xs uppercase tracking-widest mb-2 block">
                      Color: <span className="text-gray-500">{selectedColor}</span>
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 border font-mono text-xs uppercase transition-all ${
                            selectedColor === color
                              ? "border-black bg-black text-white"
                              : "border-gray-200 hover:border-black"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                <div className="mb-5">
                  <span className="font-mono text-xs uppercase tracking-widest mb-2 block">
                    Size: <span className="text-gray-500">{selectedSize}</span>
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[40px] h-10 px-3 border font-mono text-xs transition-all ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex gap-3 mb-5">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-12 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 h-12 flex items-center justify-center font-mono text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-12 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-12 bg-black text-white font-heading uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart — ₹{(product.price * quantity).toLocaleString()}
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={handleWishlistToggle}
                    className={`w-12 h-12 flex items-center justify-center border transition-all ${
                      isWishlisted
                        ? "bg-black border-black text-white"
                        : "border-gray-200 hover:border-black"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Shipping Info */}
                <div className="flex items-center gap-2 text-gray-500 mb-5 py-3 border-t border-gray-100">
                  <Truck className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase">Free shipping on ₹1500+</span>
                </div>

                {/* View Full Details */}
                <Link
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:underline underline-offset-4"
                >
                  View Full Details
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
