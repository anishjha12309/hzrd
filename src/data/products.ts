// Product data for search indexing
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  category: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "FOLDED TEE // WHITE",
    price: 325,
    image: "/images/white-tee.png",
    color: "White",
    size: "M",
    category: "T-Shirts",
    description: "Premium heavyweight cotton t-shirt in pristine white. Industrial cut with relaxed fit.",
  },
  {
    id: 2,
    name: "FOLDED HOODIE // BLACK",
    price: 550,
    image: "/images/black-hoodie.png",
    color: "Black",
    size: "L",
    category: "Hoodies",
    description: "Oversized black hoodie with signature graphic print. 400gsm French terry cotton.",
  },
  {
    id: 3,
    name: "FOLDED TEE // BEIGE",
    price: 325,
    image: "/images/beige-tee.png",
    color: "Beige",
    size: "M",
    category: "T-Shirts",
    description: "Earth-tone beige essential tee. Boxy silhouette, pre-shrunk cotton.",
  },
  {
    id: 4,
    name: "FOLDED TEE // WHITE V2",
    price: 325,
    image: "/images/white-tee.png",
    color: "White",
    size: "L",
    category: "T-Shirts",
    description: "Updated white tee with reinforced collar. Minimal branding, maximum comfort.",
  },
  {
    id: 5,
    name: "FOLDED HOODIE // BLACK V2",
    price: 550,
    image: "/images/black-hoodie.png",
    color: "Black",
    size: "XL",
    category: "Hoodies",
    description: "Second generation black hoodie. Enhanced fit with kangaroo pocket.",
  },
  {
    id: 6,
    name: "OVERSIZED CREWNECK // GREY",
    price: 425,
    image: "/images/white-tee.png",
    color: "Grey",
    size: "L",
    category: "Sweatshirts",
    description: "Ultra-soft grey crewneck sweatshirt. Dropped shoulders, ribbed cuffs.",
  },
  {
    id: 7,
    name: "CARGO PANTS // BLACK",
    price: 475,
    image: "/images/black-hoodie.png",
    color: "Black",
    size: "32",
    category: "Pants",
    description: "Technical cargo pants with multiple utility pockets. Tapered leg, adjustable waist.",
  },
  {
    id: 8,
    name: "SILVER RING // INDUSTRIAL",
    price: 125,
    image: "/images/beige-tee.png",
    color: "Silver",
    size: "9",
    category: "Accessories",
    description: "925 Sterling silver ring with industrial finish. Unisex design.",
  },
];
