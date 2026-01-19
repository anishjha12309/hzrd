// Product data store for HZRD store
export type ProductCategory = "t-shirts" | "hoodies" | "pants" | "accessories";

export interface ProductSpecs {
  gsm?: number;
  material?: string;
  fit?: string;
  care?: string[];
  origin?: string;
  features?: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: ProductCategory;
  colors: string[];
  sizes: string[];
  description: string;
  specs: ProductSpecs;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  // T-Shirts
  {
    id: 1,
    name: "GRAPHIC TEE // VOID",
    price: 1999,
    image: "/images/graphic_tee_black_1768837373161.png",
    category: "t-shirts",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    description: "Abstract geometric print on premium heavyweight cotton. Oversized fit with dropped shoulders for a contemporary silhouette.",
    specs: {
      gsm: 240,
      material: "100% Organic Cotton",
      fit: "Oversized / Boxy",
      care: ["Machine wash cold", "Tumble dry low", "Iron inside out", "Do not bleach"],
      origin: "Made in India",
      features: ["Screen printed graphics", "Ribbed crew neck", "Double-stitched hems"],
    },
    featured: true,
  },
  {
    id: 2,
    name: "MINIMAL TEE // STONE",
    price: 1699,
    image: "/images/minimal_tee_grey_1768837403622.png",
    category: "t-shirts",
    colors: ["Grey", "White", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Clean minimal silhouette. Premium washed cotton with a lived-in feel from day one.",
    specs: {
      gsm: 200,
      material: "100% Pre-Washed Cotton",
      fit: "Regular",
      care: ["Machine wash cold", "Hang dry", "Low iron if needed"],
      origin: "Made in India",
      features: ["Garment dyed", "Soft hand feel", "Minimal branding"],
    },
  },
  {
    id: 3,
    name: "FOLDED TEE // WHITE",
    price: 1999,
    image: "/images/white-tee.png",
    category: "t-shirts",
    colors: ["White"],
    sizes: ["S", "M", "L", "XL"],
    description: "Classic white tee elevated with premium fabric and expert construction. A wardrobe essential.",
    specs: {
      gsm: 220,
      material: "100% Supima Cotton",
      fit: "Relaxed",
      care: ["Machine wash cold with like colors", "Tumble dry low", "Iron medium heat"],
      origin: "Made in India",
      features: ["Premium Supima cotton", "Reinforced collar", "Side-seam construction"],
    },
    featured: true,
  },
  {
    id: 4,
    name: "STUDIO TEE // NAVY",
    price: 1799,
    image: "/images/oversized_tee_navy_1768837531155.png",
    category: "t-shirts",
    colors: ["Navy", "Black"],
    sizes: ["S", "M", "L", "XL"],
    description: "Small embroidered logo on chest. Relaxed oversized fit perfect for layering.",
    specs: {
      gsm: 230,
      material: "98% Cotton, 2% Elastane",
      fit: "Oversized",
      care: ["Machine wash cold", "Do not tumble dry", "Iron low"],
      origin: "Made in India",
      features: ["Embroidered logo", "Stretch fabric", "Dropped shoulders"],
    },
  },
  {
    id: 5,
    name: "FOLDED TEE // BEIGE",
    price: 1999,
    image: "/images/beige-tee.png",
    category: "t-shirts",
    colors: ["Beige"],
    sizes: ["M", "L", "XL"],
    description: "Warm earth tone essential. Premium cotton with a rich, natural color.",
    specs: {
      gsm: 220,
      material: "100% Organic Cotton",
      fit: "Regular",
      care: ["Machine wash cold", "Hang dry recommended", "Iron medium"],
      origin: "Made in India",
      features: ["Natural dye", "Eco-friendly", "Soft finish"],
    },
  },

  // Hoodies
  {
    id: 6,
    name: "ESSENTIAL HOODIE // CREAM",
    price: 3299,
    image: "/images/oversized_hoodie_cream_1768837420296.png",
    category: "hoodies",
    colors: ["Cream", "Black"],
    sizes: ["S", "M", "L", "XL"],
    description: "400gsm heavyweight fleece with premium brushed interior. Kangaroo pocket and metal-tipped drawcords.",
    specs: {
      gsm: 400,
      material: "80% Cotton, 20% Polyester Fleece",
      fit: "Oversized",
      care: ["Machine wash cold inside out", "Tumble dry low", "Do not iron print"],
      origin: "Made in India",
      features: ["Brushed fleece interior", "Metal-tipped drawcords", "Ribbed cuffs and hem", "Kangaroo pocket"],
    },
    featured: true,
  },
  {
    id: 7,
    name: "FOLDED HOODIE // BLACK",
    price: 3299,
    image: "/images/black-hoodie.png",
    category: "hoodies",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Signature all-black heavyweight hoodie. Ultimate comfort meets street style.",
    specs: {
      gsm: 400,
      material: "80% Cotton, 20% Polyester Fleece",
      fit: "Oversized",
      care: ["Machine wash cold", "Tumble dry low", "Iron low if needed"],
      origin: "Made in India",
      features: ["Double-layered hood", "Metal eyelets", "Reinforced stitching"],
    },
  },
  {
    id: 8,
    name: "ZIP HOODIE // CHARCOAL",
    price: 3799,
    image: "/images/zip_hoodie_charcoal_1768837637840.png",
    category: "hoodies",
    colors: ["Charcoal", "Black"],
    sizes: ["M", "L", "XL"],
    description: "Full zip with heavy-duty YKK zipper and metal hardware. Premium fleece construction.",
    specs: {
      gsm: 380,
      material: "75% Cotton, 25% Polyester",
      fit: "Regular",
      care: ["Machine wash cold", "Line dry", "Do not bleach"],
      origin: "Made in India",
      features: ["YKK metal zipper", "Split kangaroo pockets", "Adjustable hood", "Metal aglets"],
    },
  },

  // Pants
  {
    id: 9,
    name: "UTILITY CARGO // OLIVE",
    price: 2899,
    image: "/images/cargo_pants_olive_1768837463014.png",
    category: "pants",
    colors: ["Olive"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Multi-pocket utility design with technical buckle details. Relaxed straight leg.",
    specs: {
      gsm: 280,
      material: "100% Cotton Twill",
      fit: "Relaxed Straight",
      care: ["Machine wash cold", "Tumble dry low", "Iron medium"],
      origin: "Made in India",
      features: ["6 utility pockets", "Adjustable waist tabs", "Reinforced knees", "Snap button closures"],
    },
    featured: true,
  },
  {
    id: 10,
    name: "TECH JOGGER // VOID",
    price: 2599,
    image: "/images/jogger_pants_black_1768837502008.png",
    category: "pants",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    description: "Zippered pockets with tapered athletic fit. Stretch fabric for all-day comfort.",
    specs: {
      gsm: 260,
      material: "90% Cotton, 10% Spandex",
      fit: "Tapered / Athletic",
      care: ["Machine wash cold", "Hang dry", "Do not iron"],
      origin: "Made in India",
      features: ["Zipper pockets", "Elastic waistband", "Ribbed ankles", "Reflective details"],
    },
  },
  {
    id: 11,
    name: "CARGO PANT // RED",
    price: 2899,
    image: "/images/p_redcargo.png",
    category: "pants",
    colors: ["Red"],
    sizes: ["28", "30", "32", "34"],
    description: "Bold statement cargo in vibrant red. Full utility pockets with industrial hardware.",
    specs: {
      gsm: 280,
      material: "100% Cotton Twill",
      fit: "Relaxed",
      care: ["Wash separately first time", "Cold wash", "Line dry"],
      origin: "Made in India",
      features: ["Contrast stitching", "Heavy-duty hardware", "6 pockets"],
    },
  },

  // Accessories
  {
    id: 12,
    name: "BRUTALIST RING // SILVER",
    price: 1099,
    image: "/images/silver_chunky_ring_1768837550834.png",
    category: "accessories",
    colors: ["Silver"],
    sizes: ["7", "8", "9", "10", "11"],
    description: "Chunky geometric design with industrial aesthetic. Statement piece for bold style.",
    specs: {
      material: "316L Stainless Steel",
      features: ["Hypoallergenic", "Tarnish resistant", "Polished finish", "8mm band width"],
    },
    featured: true,
  },
  {
    id: 13,
    name: "CUBAN CHAIN // GOLD",
    price: 1399,
    image: "/images/gold_chain_necklace_1768837576354.png",
    category: "accessories",
    colors: ["Gold"],
    sizes: ["18\"", "20\"", "22\""],
    description: "Thick Cuban link chain with secure clasp. 18k gold plated for lasting shine.",
    specs: {
      material: "Stainless Steel, 18K Gold Plated",
      features: ["10mm link width", "Lobster clasp", "Tarnish resistant", "3-layer gold plating"],
    },
  },
  {
    id: 14,
    name: "LOGO CAP // BLACK",
    price: 799,
    image: "/images/streetwear_cap_black_1768837614703.png",
    category: "accessories",
    colors: ["Black", "White"],
    sizes: ["One Size"],
    description: "Structured six-panel snapback with embroidered logo. Adjustable for all head sizes.",
    specs: {
      material: "100% Cotton Twill",
      fit: "Adjustable Snapback",
      features: ["Embroidered logo", "Curved brim", "Breathable eyelets", "Adjustable snap closure"],
    },
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

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}

export const CATEGORIES: { slug: ProductCategory; label: string }[] = [
  { slug: "t-shirts", label: "T-Shirts" },
  { slug: "hoodies", label: "Hoodies" },
  { slug: "pants", label: "Pants" },
  { slug: "accessories", label: "Accessories" },
];
