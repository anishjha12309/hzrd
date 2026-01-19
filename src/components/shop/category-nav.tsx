import Link from "next/link";
import { CATEGORIES, ProductCategory } from "@/lib/product-data";

interface CategoryNavProps {
  activeCategory?: ProductCategory | "all";
}

export function CategoryNav({ activeCategory = "all" }: CategoryNavProps) {
  return (
    <nav className="flex gap-6 md:gap-8 border-b border-gray-200 mb-8">
      <Link
        href="/shop"
        className={`font-mono text-xs uppercase tracking-widest whitespace-nowrap transition-colors pb-3 -mb-[1px] ${
          activeCategory === "all"
            ? "text-black border-b-2 border-black"
            : "text-gray-400 hover:text-black"
        }`}
      >
        All
      </Link>
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/shop/${cat.slug}`}
          className={`font-mono text-xs uppercase tracking-widest whitespace-nowrap transition-colors pb-3 -mb-[1px] ${
            activeCategory === cat.slug
              ? "text-black border-b-2 border-black"
              : "text-gray-400 hover:text-black"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </nav>
  );
}
