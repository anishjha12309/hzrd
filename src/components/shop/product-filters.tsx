"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterState {
  colors: string[];
  sizes: string[];
  priceRange: { min: number; max: number };
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableColors: string[];
  availableSizes: string[];
  productCount: number;
}

const PRICE_RANGES = [
  { label: "Under ₹1000", min: 0, max: 1000 },
  { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
  { label: "₹2000 - ₹3000", min: 2000, max: 3000 },
  { label: "Over ₹3000", min: 3000, max: 99999 },
];

function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full font-mono text-xs uppercase tracking-widest"
      >
        {title}
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterContent({
  filters,
  onFilterChange,
  availableColors,
  availableSizes,
  productCount,
  onClearAll,
}: ProductFiltersProps & { onClearAll: () => void }) {
  const [openSections, setOpenSections] = useState({
    color: true,
    size: true,
    price: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFilterChange({ ...filters, colors: newColors });
  };

  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const setPriceRange = (min: number, max: number) => {
    const isCurrentlySelected = filters.priceRange.min === min && filters.priceRange.max === max;
    if (isCurrentlySelected) {
      onFilterChange({ ...filters, priceRange: { min: 0, max: 99999 } });
    } else {
      onFilterChange({ ...filters, priceRange: { min, max } });
    }
  };

  const hasActiveFilters =
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    (filters.priceRange.min > 0 || filters.priceRange.max < 99999);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <span className="font-heading text-lg uppercase tracking-tight">Filters</span>
        <span className="font-mono text-xs text-gray-400">{productCount} products</span>
      </div>

      {/* Filter Sections */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Color Filter */}
        <FilterSection
          title={`Color ${filters.colors.length > 0 ? `(${filters.colors.length})` : ""}`}
          isOpen={openSections.color}
          onToggle={() => toggleSection("color")}
        >
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className={`px-3 py-1.5 text-xs font-mono uppercase border transition-all ${
                  filters.colors.includes(color)
                    ? "bg-black text-white border-black"
                    : "border-gray-200 hover:border-black"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Size Filter */}
        <FilterSection
          title={`Size ${filters.sizes.length > 0 ? `(${filters.sizes.length})` : ""}`}
          isOpen={openSections.size}
          onToggle={() => toggleSection("size")}
        >
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`min-w-[40px] h-9 px-3 text-xs font-mono border transition-all ${
                  filters.sizes.includes(size)
                    ? "bg-black text-white border-black"
                    : "border-gray-200 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Price Filter */}
        <FilterSection
          title="Price"
          isOpen={openSections.price}
          onToggle={() => toggleSection("price")}
        >
          <div className="flex flex-col gap-2">
            {PRICE_RANGES.map((range) => {
              const isSelected =
                filters.priceRange.min === range.min && filters.priceRange.max === range.max;
              return (
                <button
                  key={range.label}
                  onClick={() => setPriceRange(range.min, range.max)}
                  className={`text-left px-3 py-2 text-xs font-mono border transition-all ${
                    isSelected
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-black"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </FilterSection>
      </div>

      {/* Clear All Button */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="mt-4 w-full py-3 border border-gray-200 font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}

export function ProductFilters(props: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const clearAll = () => {
    props.onFilterChange({
      colors: [],
      sizes: [],
      priceRange: { min: 0, max: 99999 },
    });
  };

  const activeCount =
    props.filters.colors.length +
    props.filters.sizes.length +
    (props.filters.priceRange.min > 0 || props.filters.priceRange.max < 99999 ? 1 : 0);

  return (
    <>
      {/* Desktop Filters - Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <FilterContent {...props} onClearAll={clearAll} />
      </div>

      {/* Mobile Filters - Drawer */}
      <div className="lg:hidden">
        <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
          <Drawer.Trigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 font-mono text-xs uppercase tracking-widest hover:border-black transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center bg-black text-white text-[10px] rounded-full">
                  {activeCount}
                </span>
              )}
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-xl max-h-[85vh] flex flex-col">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-4 mb-2" />
              <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-100">
                <Drawer.Title className="font-heading text-xl uppercase">Filters</Drawer.Title>
                <Drawer.Close asChild>
                  <button className="w-8 h-8 flex items-center justify-center">
                    <X className="w-5 h-5" />
                  </button>
                </Drawer.Close>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <FilterContent {...props} onClearAll={clearAll} />
              </div>
              <div className="p-6 border-t border-gray-100">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-black text-white font-heading uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
                >
                  View {props.productCount} Products
                </button>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </>
  );
}

export type { FilterState };
