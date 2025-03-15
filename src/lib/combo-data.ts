
import { products, categories } from './data';

export interface ComboProduct {
  productId: number;
  quantity: number;
  isRemovable?: boolean;
}

export interface ProductCombo {
  id: number;
  name: string;
  slug: string;
  description: string;
  products: ComboProduct[];
  images: string[];
  phoneTypes: string[];
  discount: number;
  badge?: string;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  salesCount?: number;
  dateAdded: string;
  compatibleWith?: string[];
  wholesaleTiers: {
    minQuantity: number;
    maxQuantity: number | null;
    price: number;
  }[];
  minWholesaleQuantity: number;
}

// Helper function to calculate combo original price (sum of all products prices)
export const calculateComboOriginalPrice = (combo: ProductCombo) => {
  return combo.products.reduce((total, comboProduct) => {
    const product = products.find(p => p.id === comboProduct.productId);
    if (product) {
      return total + (product.price * comboProduct.quantity);
    }
    return total;
  }, 0);
};

// Helper function to calculate combo discounted price
export const calculateComboPrice = (combo: ProductCombo) => {
  const originalPrice = calculateComboOriginalPrice(combo);
  return originalPrice - (originalPrice * combo.discount / 100);
};

// Helper function to get combo products detailed information
export const getComboProductsDetails = (combo: ProductCombo) => {
  return combo.products.map(comboProduct => {
    const product = products.find(p => p.id === comboProduct.productId);
    return {
      ...product,
      quantity: comboProduct.quantity,
      isRemovable: comboProduct.isRemovable
    };
  });
};

// Sample product combos data
export const productCombos: ProductCombo[] = [
  {
    id: 1,
    name: "Trọn bộ phụ kiện iPhone 15 Pro Max",
    slug: "tron-bo-phu-kien-iphone-15-pro-max",
    description: "Combo phụ kiện đầy đủ và hoàn hảo cho iPhone 15 Pro Max của bạn. Bộ sản phẩm bao gồm ốp lưng silicone trong suốt chống sốc, miếng dán cường lực chất lượng cao và cáp sạc nhanh.",
    products: [
      { productId: 1, quantity: 1, isRemovable: true }, // Ốp lưng
      { productId: 4, quantity: 1, isRemovable: true }, // Cáp sạc
      { productId: 5, quantity: 1, isRemovable: false } // Miếng dán cường lực
    ],
    images: [
      "https://images.unsplash.com/photo-1592954536775-3144a9c31848?q=80&w=1000",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1000",
      "https://images.unsplash.com/photo-1616160953762-23afc761534c?q=80&w=1000"
    ],
    phoneTypes: ["iPhone"],
    discount: 15,
    badge: "Hot combo",
    featured: true,
    rating: 4.8,
    reviewCount: 56,
    salesCount: 135,
    dateAdded: "2023-11-15",
    compatibleWith: ["iPhone 15 Pro Max", "iPhone 15 Pro"],
    wholesaleTiers: [
      { minQuantity: 5, maxQuantity: 20, price: 650000 },
      { minQuantity: 21, maxQuantity: 50, price: 620000 },
      { minQuantity: 51, maxQuantity: null, price: 590000 }
    ],
    minWholesaleQuantity: 5
  },
  {
    id: 2,
    name: "Combo phụ kiện Samsung Galaxy S23 Ultra",
    slug: "combo-phu-kien-samsung-galaxy-s23-ultra",
    description: "Bộ phụ kiện cao cấp dành cho Samsung Galaxy S23 Ultra bao gồm miếng dán cường lực, ốp lưng chống sốc và tai nghe không dây cao cấp.",
    products: [
      { productId: 5, quantity: 1, isRemovable: false }, // Miếng dán cường lực
      { productId: 7, quantity: 1, isRemovable: true },  // Ốp lưng
      { productId: 6, quantity: 1, isRemovable: true }   // Tai nghe
    ],
    images: [
      "https://images.unsplash.com/photo-1616160953762-23afc761534c?q=80&w=1000",
      "https://images.unsplash.com/photo-1600086827875-a63b68548250?q=80&w=1000",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000"
    ],
    phoneTypes: ["Samsung"],
    discount: 18,
    badge: "Tiết kiệm 18%",
    featured: true,
    rating: 4.7,
    reviewCount: 42,
    salesCount: 98,
    dateAdded: "2023-12-05",
    compatibleWith: ["Samsung Galaxy S23 Ultra", "Samsung Galaxy S23+"],
    wholesaleTiers: [
      { minQuantity: 5, maxQuantity: 20, price: 1890000 },
      { minQuantity: 21, maxQuantity: 50, price: 1820000 },
      { minQuantity: 51, maxQuantity: null, price: 1750000 }
    ],
    minWholesaleQuantity: 5
  },
  {
    id: 3,
    name: "Combo sạc nhanh Xiaomi",
    slug: "combo-sac-nhanh-xiaomi",
    description: "Trọn bộ sạc nhanh dành cho thiết bị Xiaomi bao gồm sạc nhanh 65W, cáp sạc và sạc dự phòng 20000mAh.",
    products: [
      { productId: 8, quantity: 1, isRemovable: false }, // Sạc nhanh
      { productId: 4, quantity: 1, isRemovable: true },  // Cáp sạc
      { productId: 3, quantity: 1, isRemovable: true }   // Sạc dự phòng
    ],
    images: [
      "https://images.unsplash.com/photo-1606293459339-21457343204b?q=80&w=1000",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1000",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1000"
    ],
    phoneTypes: ["Xiaomi", "Universal"],
    discount: 20,
    badge: "Best seller",
    featured: true,
    rating: 4.9,
    reviewCount: 87,
    salesCount: 210,
    dateAdded: "2024-01-10",
    compatibleWith: ["Tất cả các thiết bị Xiaomi", "Nhiều thiết bị khác"],
    wholesaleTiers: [
      { minQuantity: 5, maxQuantity: 20, price: 2350000 },
      { minQuantity: 21, maxQuantity: 50, price: 2250000 },
      { minQuantity: 51, maxQuantity: null, price: 2150000 }
    ],
    minWholesaleQuantity: 5
  },
  {
    id: 4,
    name: "Bộ phụ kiện cơ bản cho iPhone",
    slug: "bo-phu-kien-co-ban-cho-iphone",
    description: "Combo phụ kiện cơ bản cho tất cả dòng iPhone bao gồm ốp lưng, cáp sạc nhanh và miếng dán cường lực.",
    products: [
      { productId: 1, quantity: 1, isRemovable: true }, // Ốp lưng
      { productId: 4, quantity: 1, isRemovable: true }, // Cáp sạc
      { productId: 5, quantity: 1, isRemovable: true }  // Miếng dán cường lực
    ],
    images: [
      "https://images.unsplash.com/photo-1592954536775-3144a9c31848?q=80&w=1000",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1000",
      "https://images.unsplash.com/photo-1616160953762-23afc761534c?q=80&w=1000"
    ],
    phoneTypes: ["iPhone"],
    discount: 12,
    badge: "Tiết kiệm 12%",
    featured: false,
    rating: 4.5,
    reviewCount: 34,
    salesCount: 67,
    dateAdded: "2024-02-05",
    compatibleWith: ["iPhone series"],
    wholesaleTiers: [
      { minQuantity: 5, maxQuantity: 20, price: 690000 },
      { minQuantity: 21, maxQuantity: 50, price: 650000 },
      { minQuantity: 51, maxQuantity: null, price: 620000 }
    ],
    minWholesaleQuantity: 5
  }
];

// Helper functions for filtering and retrieving combos
export const getComboBySlug = (slug: string) => {
  return productCombos.find(combo => combo.slug === slug);
};

export const getCombosByPhoneType = (phoneType: string) => {
  if (phoneType === 'all') return productCombos;
  return productCombos.filter(combo => combo.phoneTypes.includes(phoneType));
};

export const getFeaturedCombos = (limit = 3) => {
  return productCombos
    .filter(combo => combo.featured)
    .slice(0, limit);
};

export const getRelatedCombos = (comboId: number, phoneTypes: string[], limit = 3) => {
  return productCombos
    .filter(combo => combo.id !== comboId && combo.phoneTypes.some(pt => phoneTypes.includes(pt)))
    .slice(0, limit);
};

// Get all available phone types for filtering
export const getAllPhoneTypes = () => {
  const types = new Set<string>();
  productCombos.forEach(combo => {
    combo.phoneTypes.forEach(type => types.add(type));
  });
  return Array.from(types);
};
