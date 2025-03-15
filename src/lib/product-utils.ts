
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

// New statistics functions
export const getMostViewedProducts = (limit = 4) => {
  return [...products]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);
};

export const getNewestProducts = (limit = 4) => {
  return [...products]
    .sort((a, b) => {
      const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
      const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit);
};

export const getBestSellingProducts = (limit = 4) => {
  return [...products]
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, limit);
};

// New function for product search based on user query
export const searchProducts = (query: string) => {
  const searchTerms = query.toLowerCase().split(' ');
  
  // Filter products that match any of the search terms
  return products.filter(product => {
    const name = product.name.toLowerCase();
    const description = product.description.toLowerCase();
    const categoryName = categories.find(c => c.id === product.categoryId)?.name.toLowerCase() || '';
    const brandName = brands.find(b => b.id === product.brandId)?.name.toLowerCase() || '';
    
    // Check if any search term is found in product details
    return searchTerms.some(term => 
      name.includes(term) || 
      description.includes(term) || 
      categoryName.includes(term) || 
      brandName.includes(term)
    );
  });
};
