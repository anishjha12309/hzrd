<p align="center">
  <img src="public/images/hzrd-logo.svg" alt="HZRD" width="120" />
</p>

<h1 align="center">
  <strong>H Z R D</strong>
</h1>

<p align="center">
  <em>"Defining the grey area between black and white."</em>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#payment">Payment</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind" />
</p>

---

## `// ABOUT`

**HZRD** is a high-velocity, cutting-edge e-commerce fashion flagship built for Indian Gen Z. Inspired by the minimalist, motion-heavy, brutalist-chic aesthetic of Off-White and luxury streetwear brands.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ██   ██ ███████ ██████  ██████                           │
│   ██   ██    ███  ██   ██ ██   ██                          │
│   ███████   ███   ██████  ██   ██                          │
│   ██   ██  ███    ██   ██ ██   ██                          │
│   ██   ██ ███████ ██   ██ ██████                           │
│                                                             │
│   S T R E E T W E A R   //   L I M I T E D   E D I T I O N │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## `// FEATURES`

| Feature | Description |
|---------|-------------|
| **Shop** | Browse all products with category filtering |
| **Cart** | Add, remove, update quantities with Zustand persistence |
| **Search** | Instant search powered by Orama full-text search |
| **Checkout** | Complete checkout flow with shipping form |
| **Payments** | Razorpay integration (Test Mode) |
| **Order Tracking** | Real-time order status timeline |
| **Responsive** | Mobile-first design across all pages |

### Pages

```
/                   → Home (Hero + Product Carousel)
/shop               → All Products
/shop/t-shirts      → T-Shirts Category
/shop/hoodies       → Hoodies Category
/shop/pants         → Pants Category
/shop/accessories   → Accessories Category
/checkout           → Checkout with Payment
/order-success      → Order Confirmation
/track-order        → Track Your Order
/about              → Brand Story
/contact            → Contact Form
/faq                → Frequently Asked Questions
/size-guide         → Size Charts
/shipping           → Shipping & Returns Policy
```

---

## `// TECH STACK`

```
FRAMEWORK       Next.js 16 (App Router, RSC)
UI              React 19
STYLING         Tailwind CSS 4.0
STATE           Zustand (Persisted Cart)
SEARCH          @orama/orama
PAYMENTS        Razorpay
ANIMATIONS      Framer Motion, GSAP
COMPONENTS      Radix UI, Vaul (Drawers)
CAROUSEL        Embla Carousel
ICONS           Lucide React
NOTIFICATIONS   Sonner
```

---

## `// GETTING STARTED`

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/anishjha12309/hzrd.git
cd hzrd/hzrd-store

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
# Razorpay (Test Mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## `// PROJECT STRUCTURE`

```
hzrd-store/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── create-order/  # Razorpay order creation
│   │   │   └── verify-payment/# Payment verification
│   │   ├── shop/              # Shop pages
│   │   ├── checkout/          # Checkout page
│   │   ├── order-success/     # Order confirmation
│   │   └── ...                # Other pages
│   ├── components/
│   │   ├── layout/            # Navbar, Footer
│   │   ├── home/              # Hero, Carousel
│   │   ├── shop/              # ProductGrid, CategoryNav
│   │   ├── cart/              # CartDrawer
│   │   ├── menu/              # MenuDrawer
│   │   └── search/            # SearchDrawer
│   ├── lib/
│   │   ├── product-data.ts    # Product catalog
│   │   └── search.ts          # Orama search
│   └── store/
│       └── cart-store.ts      # Zustand cart state
├── public/
│   └── images/                # Product images
└── ...
```

---

## `// PAYMENT`

### Razorpay Test Mode

This project uses Razorpay in test mode. Use these test cards:

| Card Type | Number | CVV | Expiry |
|-----------|--------|-----|--------|
| **Success** | `4111 1111 1111 1111` | Any | Any future |
| **Failure** | `4000 0000 0000 0002` | Any | Any future |

---

## `// DESIGN SYSTEM`

```css
/* Typography */
--font-heading: 'Oswald', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Colors */
--bg-primary: #F4F4F0;
--bg-secondary: #EAEAE5;
--text-primary: #000000;
--text-muted: #6B7280;

/* Design Principles */
- Brutalist borders
- Industrial grid layouts
- Stark black/white contrast
- Generous whitespace
- Uppercase headings
- Monospace labels
```

---

## `// LICENSE`

MIT © 2026 HZRD

---

<p align="center">
  <strong>HEAVY WEIGHT COTTON</strong>
  <br />
  <em>Built for the bold. Limited editions only.</em>
</p>

<p align="center">
  <sub>Made with ◼ by HZRD</sub>
</p>
