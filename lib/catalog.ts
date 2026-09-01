export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "Hookahs" | "Tobacco" | "Bowls" | "Accessories" | "Charcoal";
  price: number;
  salePrice?: number;
  rating: number;
  inStock: boolean;
  image: string;
  description: string;
  specs: Record<string, string>;
}

export const products: Product[] = [
  {
    id: "whm-001",
    slug: "alpha-hookah-model-x-black-matte",
    name: "Model X - Black Matte",
    brand: "Alpha Hookah",
    category: "Hookahs",
    price: 189.99,
    salePrice: 169.99,
    rating: 4.9,
    inStock: true,
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
    description: "Iconic vertical purge system with anodized aluminum and stainless steel internal construction.",
    specs: {
      Height: "42 cm",
      Material: "Stainless Steel & Anodized Aluminum",
      Origin: "Russia",
    },
  },
  {
    id: "whm-002",
    slug: "musthave-pinkman-100g",
    name: "Pinkman 100g (Grapefruit, Strawberry, Raspberry)",
    brand: "MustHave",
    category: "Tobacco",
    price: 22.0,
    rating: 4.8,
    inStock: true,
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80",
    description: "The benchmark berry blend featuring wild strawberry, raspberry syrup, and fresh grapefruit squeeze.",
    specs: {
      Weight: "100g",
      Strength: "Medium-Strong",
      Cut: "Fine Burley",
    },
  },
  {
    id: "whm-003",
    slug: "oblako-phunnel-m-glazed",
    name: "Phunnel M - Glazed White/Black",
    brand: "Oblako",
    category: "Bowls",
    price: 34.5,
    rating: 4.7,
    inStock: true,
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80",
    description: "White clay glazed phunnel bowl optimized for high-flavor heat retention and even burn.",
    specs: {
      Capacity: "18-23g",
      Material: "White Ceramic Glaze",
      Compatibility: "Kaloud / Foil",
    },
  },
];
