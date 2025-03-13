
import { products, categories, brands, type WholesaleTier } from "./data";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price);
};

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const getRelatedProducts = (productId: number, categoryId: number, limit = 4) => {
  return products
    .filter(p => p.id !== productId && p.categoryId === categoryId)
    .slice(0, limit);
};

export const getProductBrand = (brandId: number) => {
  return brands.find(b => b.id === brandId);
};

export const getProductCategory = (categoryId: number) => {
  return categories.find(c => c.id === categoryId);
};

export const getStockStatus = (stock: number) => {
  if (stock > 20) return { status: "Còn hàng", color: "text-green-600" };
  if (stock > 0) return { status: "Sắp hết hàng", color: "text-amber-600" };
  return { status: "Hết hàng", color: "text-red-600" };
};

export const formatWholesaleTier = (tier: WholesaleTier) => {
  const { minQuantity, maxQuantity, price } = tier;
  if (maxQuantity === null) {
    return `${minQuantity}+ chiếc: ${formatPrice(price)}`;
  }
  return `${minQuantity}-${maxQuantity} chiếc: ${formatPrice(price)}`;
};

export const generateShareLinks = (url: string, title: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    copyLink: url
  };
};
