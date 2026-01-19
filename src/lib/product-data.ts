// Product data store for HZRD store
export type ProductCategory = "t-shirts" | "hoodies" | "pants" | "accessories";

export interface SustainabilityInfo {
  score: number; // 1-100
  carbonFootprint: string;
  waterUsage: string;
  certifications: string[];
  recyclablePackaging: boolean;
  madeLocally: boolean;
}

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
  sustainability: SustainabilityInfo;
  completeTheLook?: number[]; // Product IDs that pair well
  featured?: boolean;
}

// Default sustainability for organic cotton products
const ORGANIC_COTTON_SUSTAINABILITY: SustainabilityInfo = {
  score: 85,
  carbonFootprint: "2.1 kg CO₂",
  waterUsage: "1,200L (70% less than conventional)",
  certifications: ["GOTS Certified", "OEKO-TEX Standard 100"],
  recyclablePackaging: true,
  madeLocally: true,
};

// Default sustainability for blended products
const BLENDED_SUSTAINABILITY: SustainabilityInfo = {
  score: 72,
  carbonFootprint: "3.4 kg CO₂",
  waterUsage: "2,100L",
  certifications: ["OEKO-TEX Standard 100"],
  recyclablePackaging: true,
  madeLocally: true,
};

// Sustainability for accessories
const ACCESSORY_SUSTAINABILITY: SustainabilityInfo = {
  score: 78,
  carbonFootprint: "0.8 kg CO₂",
  waterUsage: "150L",
  certifications: ["Lead-Free", "Nickel-Free"],
  recyclablePackaging: true,
  madeLocally: true,
};

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
    sustainability: { ...ORGANIC_COTTON_SUSTAINABILITY, score: 88 },
    completeTheLook: [10, 15, 19],
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
    sustainability: ORGANIC_COTTON_SUSTAINABILITY,
    completeTheLook: [9, 16, 12],
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
    sustainability: { ...ORGANIC_COTTON_SUSTAINABILITY, score: 90 },
    completeTheLook: [11, 15, 17],
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
    sustainability: BLENDED_SUSTAINABILITY,
    completeTheLook: [10, 16, 18],
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
    sustainability: { ...ORGANIC_COTTON_SUSTAINABILITY, score: 92 },
    completeTheLook: [9, 12, 17],
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
    sustainability: BLENDED_SUSTAINABILITY,
    completeTheLook: [10, 15, 19],
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
    sustainability: BLENDED_SUSTAINABILITY,
    completeTheLook: [11, 12, 16],
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
    sustainability: BLENDED_SUSTAINABILITY,
    completeTheLook: [10, 17, 18],
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
    sustainability: ORGANIC_COTTON_SUSTAINABILITY,
    completeTheLook: [2, 5, 15],
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
    sustainability: BLENDED_SUSTAINABILITY,
    completeTheLook: [1, 6, 18],
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
    sustainability: ORGANIC_COTTON_SUSTAINABILITY,
    completeTheLook: [3, 7, 16],
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
    sustainability: ACCESSORY_SUSTAINABILITY,
    completeTheLook: [1, 7, 10],
    featured: true,
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
    sustainability: { ...ACCESSORY_SUSTAINABILITY, score: 82 },
    completeTheLook: [1, 6, 10],
  },

  // NEW PRODUCTS - Sweatshirts
  {
    id: 15,
    name: "CREWNECK SWEAT // CHARCOAL",
    price: 2799,
    image: "/images/oversized_sweatshirt_grey.png",
    category: "hoodies",
    colors: ["Charcoal", "Cream"],
    sizes: ["S", "M", "L", "XL"],
    description: "Classic crewneck silhouette in premium heavyweight fleece. Clean lines, no distractions.",
    specs: {
      gsm: 380,
      material: "85% Cotton, 15% Polyester",
      fit: "Oversized",
      care: ["Machine wash cold", "Tumble dry low", "Do not bleach"],
      origin: "Made in India",
      features: ["Brushed fleece interior", "Ribbed trims", "Side-seam construction"],
    },
    sustainability: BLENDED_SUSTAINABILITY,
    completeTheLook: [9, 12, 14],
  },

  // NEW - Wide Leg Pants
  {
    id: 16,
    name: "WIDE LEG PANT // VOID",
    price: 2699,
    image: "/images/wide_leg_pants_black.png",
    category: "pants",
    colors: ["Black"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Ultra-wide silhouette with high waist. Maximum movement, maximum statement.",
    specs: {
      gsm: 290,
      material: "100% Cotton Twill",
      fit: "Wide Leg / High Waist",
      care: ["Machine wash cold", "Hang dry", "Iron medium"],
      origin: "Made in India",
      features: ["Wide leg cut", "High waist", "Belt loops", "Back patch pockets"],
    },
    sustainability: ORGANIC_COTTON_SUSTAINABILITY,
    completeTheLook: [2, 4, 12],
  },

  // NEW - Bucket Hat
  {
    id: 17,
    name: "BUCKET HAT // VOID",
    price: 899,
    image: "/images/bucket_hat_black.png",
    category: "accessories",
    colors: ["Black"],
    sizes: ["S/M", "L/XL"],
    description: "Classic bucket silhouette with embroidered logo. Essential outdoor piece.",
    specs: {
      material: "100% Cotton Twill",
      fit: "Regular",
      features: ["Embroidered logo", "Stitched brim", "Breathable", "Packable"],
    },
    sustainability: { ...ACCESSORY_SUSTAINABILITY, score: 86 },
    completeTheLook: [3, 5, 9],
  },

  // NEW - Crossbody Bag
  {
    id: 18,
    name: "TECH SLING // VOID",
    price: 1499,
    image: "/images/crossbody_bag_black.png",
    category: "accessories",
    colors: ["Black"],
    sizes: ["One Size"],
    description: "Technical crossbody with multiple compartments. Urban utility essential.",
    specs: {
      material: "Recycled Nylon, YKK Zippers",
      features: ["Multiple compartments", "Adjustable strap", "Water resistant", "Reflective accents"],
    },
    sustainability: { ...ACCESSORY_SUSTAINABILITY, score: 88, certifications: ["Made from Recycled Materials", "PFC-Free"] },
    completeTheLook: [4, 8, 10],
  },

  // NEW - Socks
  {
    id: 19,
    name: "ESSENTIAL SOCKS // WHITE",
    price: 399,
    image: "/images/socks_pack_white.png",
    category: "accessories",
    colors: ["White", "Black"],
    sizes: ["7-10", "10-13"],
    description: "Premium ribbed crew socks. Comfort and durability in every step.",
    specs: {
      material: "80% Cotton, 18% Polyester, 2% Spandex",
      features: ["Ribbed texture", "Cushioned sole", "Arch support", "Seamless toe"],
    },
    sustainability: { ...ACCESSORY_SUSTAINABILITY, score: 75 },
    completeTheLook: [1, 6, 10],
  },

  // NEW - Beanie
  {
    id: 20,
    name: "RIBBED BEANIE // VOID",
    price: 699,
    image: "/images/beanie_black.png",
    category: "accessories",
    colors: ["Black", "Grey", "Cream"],
    sizes: ["One Size"],
    description: "Soft ribbed knit beanie for cold weather. Fitted with fold-over cuff.",
    specs: {
      material: "100% Acrylic Knit",
      fit: "Fitted / Fold-over Cuff",
      features: ["Ribbed knit", "Soft interior", "Stretchable", "Unisex"],
    },
    sustainability: { ...ACCESSORY_SUSTAINABILITY, score: 70 },
    completeTheLook: [7, 8, 16],
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

export function getCompleteTheLook(product: Product): Product[] {
  if (!product.completeTheLook) return [];
  return product.completeTheLook
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
}

export function getSustainabilityGrade(score: number): { grade: string; color: string } {
  if (score >= 90) return { grade: "A+", color: "text-green-600" };
  if (score >= 80) return { grade: "A", color: "text-green-500" };
  if (score >= 70) return { grade: "B", color: "text-lime-500" };
  if (score >= 60) return { grade: "C", color: "text-yellow-500" };
  return { grade: "D", color: "text-orange-500" };
}

export const CATEGORIES: { slug: ProductCategory; label: string }[] = [
  { slug: "t-shirts", label: "T-Shirts" },
  { slug: "hoodies", label: "Hoodies" },
  { slug: "pants", label: "Pants" },
  { slug: "accessories", label: "Accessories" },
];
