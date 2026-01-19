import Link from "next/link";
import { CATEGORIES, ProductCategory } from "@/lib/product-data";

interface CategoryNavProps {
  activeCategory?: ProductCategory | "all";
}

export function CategoryNav({ activeCategory = "all" }: CategoryNavProps) {
  return (
    <nav className="flex gap-6 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
      <Link
        href="/shop"
        className={`font-mono text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${
          activeCategory === "all"
            ? "text-black underline underline-offset-4"
            : "text-gray-400 hover:text-black"
        }`}
      >
        All
      </Link>
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/shop/${cat.slug}`}
          className={`font-mono text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${
            activeCategory === cat.slug
              ? "text-black underline underline-offset-4"
              : "text-gray-400 hover:text-black"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </nav>
  );
}
