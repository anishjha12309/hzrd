// Product data store for HZRD store
export type ProductCategory = "t-shirts" | "hoodies" | "pants" | "accessories";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
  colors: string[];
  sizes: string[];
  description: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  // T-Shirts
  {
    id: 1,
    name: "GRAPHIC TEE // VOID",
    price: 325,
    image: "/images/graphic_tee_black_1768837373161.png",
    category: "t-shirts",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    description: "Abstract geometric print on premium heavyweight cotton. Oversized fit.",
    featured: true,
  },
  {
    id: 2,
    name: "MINIMAL TEE // STONE",
    price: 275,
    image: "/images/minimal_tee_grey_1768837403622.png",
    category: "t-shirts",
    colors: ["Grey", "White", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Clean minimal silhouette. Premium washed cotton.",
  },
  {
    id: 3,
    name: "FOLDED TEE // WHITE",
    price: 325,
    image: "/images/white-tee.png",
    category: "t-shirts",
    colors: ["White"],
    sizes: ["S", "M", "L", "XL"],
    description: "Classic white tee with signature fold presentation.",
    featured: true,
  },
  {
    id: 4,
    name: "STUDIO TEE // NAVY",
    price: 299,
    image: "/images/oversized_tee_navy_1768837531155.png",
    category: "t-shirts",
    colors: ["Navy", "Black"],
    sizes: ["S", "M", "L", "XL"],
    description: "Small embroidered logo. Relaxed oversized fit.",
  },
  {
    id: 5,
    name: "FOLDED TEE // BEIGE",
    price: 325,
    image: "/images/beige-tee.png",
    category: "t-shirts",
    colors: ["Beige"],
    sizes: ["M", "L", "XL"],
    description: "Warm earth tone essential. Premium cotton.",
  },

  // Hoodies
  {
    id: 6,
    name: "ESSENTIAL HOODIE // CREAM",
    price: 550,
    image: "/images/oversized_hoodie_cream_1768837420296.png",
    category: "hoodies",
    colors: ["Cream", "Black"],
    sizes: ["S", "M", "L", "XL"],
    description: "400gsm heavyweight fleece. Kangaroo pocket.",
    featured: true,
  },
  {
    id: 7,
    name: "FOLDED HOODIE // BLACK",
    price: 550,
    image: "/images/black-hoodie.png",
    category: "hoodies",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Signature all-black heavyweight hoodie.",
  },
  {
    id: 8,
    name: "ZIP HOODIE // CHARCOAL",
    price: 625,
    image: "/images/zip_hoodie_charcoal_1768837637840.png",
    category: "hoodies",
    colors: ["Charcoal", "Black"],
    sizes: ["M", "L", "XL"],
    description: "Full zip with metal hardware. Premium fleece.",
  },

  // Pants
  {
    id: 9,
    name: "UTILITY CARGO // OLIVE",
    price: 475,
    image: "/images/cargo_pants_olive_1768837463014.png",
    category: "pants",
    colors: ["Olive"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Multi-pocket utility design. Technical buckle details.",
    featured: true,
  },
  {
    id: 10,
    name: "TECH JOGGER // VOID",
    price: 425,
    image: "/images/jogger_pants_black_1768837502008.png",
    category: "pants",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    description: "Zippered pockets. Tapered athletic fit.",
  },
  {
    id: 11,
    name: "CARGO PANT // RED",
    price: 475,
    image: "/images/p_redcargo.png",
    category: "pants",
    colors: ["Red"],
    sizes: ["28", "30", "32", "34"],
    description: "Bold statement cargo. Utility pockets.",
  },

  // Accessories
  {
    id: 12,
    name: "BRUTALIST RING // SILVER",
    price: 175,
    image: "/images/silver_chunky_ring_1768837550834.png",
    category: "accessories",
    colors: ["Silver"],
    sizes: ["7", "8", "9", "10", "11"],
    description: "Chunky geometric design. Stainless steel.",
    featured: true,
  },
  {
    id: 13,
    name: "CUBAN CHAIN // GOLD",
    price: 225,
    image: "/images/gold_chain_necklace_1768837576354.png",
    category: "accessories",
    colors: ["Gold"],
    sizes: ["18\"", "20\"", "22\""],
    description: "Thick Cuban link. 18k gold plated.",
  },
  {
    id: 14,
    name: "LOGO CAP // BLACK",
    price: 125,
    image: "/images/streetwear_cap_black_1768837614703.png",
    category: "accessories",
    colors: ["Black", "White"],
    sizes: ["One Size"],
    description: "Structured snapback. Embroidered logo.",
  },
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export const CATEGORIES: { slug: ProductCategory; label: string }[] = [
  { slug: "t-shirts", label: "T-Shirts" },
  { slug: "hoodies", label: "Hoodies" },
  { slug: "pants", label: "Pants" },
  { slug: "accessories", label: "Accessories" },
];
