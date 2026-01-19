"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Minus, Plus, Check, Ruler, Truck, RotateCcw, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getProductById, getRelatedProducts, Product } from "@/lib/product-data";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { Footer } from "@/components/layout/footer";

export default function ProductPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "care">("details");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const p = getProductById(productId);
    if (p) {
      setProduct(p);
      setSelectedColor(p.colors[0]);
      setSelectedSize(p.sizes[0]);
      setRelatedProducts(getRelatedProducts(p, 4));
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-black"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
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
  };

  return (
    <main className="min-h-screen bg-white pt-24 md:pt-28">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center gap-2 font-mono text-xs text-gray-400 uppercase">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/shop/${product.category}`} className="hover:text-black transition-colors">
            {product.category.replace("-", " ")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-[4/5] bg-[#F5F5F5] relative overflow-hidden sticky top-28">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover mix-blend-multiply p-8 md:p-16"
                priority
              />
              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center border transition-all ${
                  isWishlisted
                    ? "bg-black border-black text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-black"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="py-4 lg:py-8">
            {/* Category */}
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
              {product.category.replace("-", " ")}
            </span>

            {/* Name & Price */}
            <h1 className="font-heading text-3xl md:text-4xl uppercase tracking-tighter mt-2 mb-4">
              {product.name}
            </h1>
            <p className="font-heading text-2xl md:text-3xl mb-6">
              ₹{product.price.toLocaleString()}
            </p>

            {/* Description */}
            <p className="font-sans text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-widest">
                    Color: <span className="text-gray-500">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border font-mono text-xs uppercase transition-all ${
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
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-widest">
                  Size: <span className="text-gray-500">{selectedSize}</span>
                </span>
                <Link
                  href="/size-guide"
                  className="font-mono text-xs uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-1"
                >
                  <Ruler className="w-3 h-3" />
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-12 px-4 border font-mono text-sm transition-all ${
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
            <div className="flex gap-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-14 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-14 flex items-center justify-center font-mono text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-14 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-black text-white font-heading uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Add to Cart — ₹{(product.price * quantity).toLocaleString()}
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400" />
                <span className="font-mono text-xs uppercase text-gray-600">Free Shipping 1500+</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-gray-400" />
                <span className="font-mono text-xs uppercase text-gray-600">14 Day Returns</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-100 pt-8">
              <div className="flex gap-8 mb-6 border-b border-gray-100">
                {(["details", "specs", "care"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 font-mono text-xs uppercase tracking-widest transition-colors relative ${
                      activeTab === tab ? "text-black" : "text-gray-400 hover:text-black"
                    }`}
                  >
                    {tab === "details" ? "Details" : tab === "specs" ? "Specifications" : "Care"}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "details" && (
                    <div className="space-y-4">
                      <p className="font-sans text-gray-600 leading-relaxed">
                        {product.description}
                      </p>
                      {product.specs.features && (
                        <ul className="space-y-2">
                          {product.specs.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 font-sans text-sm text-gray-600">
                              <Check className="w-4 h-4 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {activeTab === "specs" && (
                    <div className="space-y-4">
                      <table className="w-full">
                        <tbody className="divide-y divide-gray-100">
                          {product.specs.gsm && (
                            <tr>
                              <td className="py-3 font-mono text-xs uppercase text-gray-400 w-1/3">Fabric Weight</td>
                              <td className="py-3 font-sans text-sm">{product.specs.gsm} GSM</td>
                            </tr>
                          )}
                          {product.specs.material && (
                            <tr>
                              <td className="py-3 font-mono text-xs uppercase text-gray-400">Material</td>
                              <td className="py-3 font-sans text-sm">{product.specs.material}</td>
                            </tr>
                          )}
                          {product.specs.fit && (
                            <tr>
                              <td className="py-3 font-mono text-xs uppercase text-gray-400">Fit</td>
                              <td className="py-3 font-sans text-sm">{product.specs.fit}</td>
                            </tr>
                          )}
                          {product.specs.origin && (
                            <tr>
                              <td className="py-3 font-mono text-xs uppercase text-gray-400">Origin</td>
                              <td className="py-3 font-sans text-sm">{product.specs.origin}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === "care" && (
                    <div className="space-y-3">
                      {product.specs.care ? (
                        product.specs.care.map((instruction, i) => (
                          <div key={i} className="flex items-center gap-3 font-sans text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            {instruction}
                          </div>
                        ))
                      ) : (
                        <p className="font-sans text-sm text-gray-500">
                          Please follow standard care instructions for this product.
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-[#FAFAFA] border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="font-heading text-2xl uppercase tracking-tighter mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group">
                  <div className="aspect-[4/5] bg-white relative overflow-hidden mb-3">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover mix-blend-multiply p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-sans text-sm font-medium uppercase group-hover:underline leading-tight">
                    {p.name}
                  </h3>
                  <p className="font-mono text-sm text-gray-500 mt-1">₹{p.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
