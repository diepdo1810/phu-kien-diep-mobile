
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  discount: number;
  discountedPrice: number;
  images: string[];
}

interface ProductSelectionContextType {
  selectedProducts: Product[];
  isSelected: (product: { id: number }) => boolean;
  toggleSelection: (product: Product) => void;
  clearSelection: () => void;
  shareViaZalo: () => void;
}

const ProductSelectionContext = createContext<ProductSelectionContextType | undefined>(undefined);

export const ProductSelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('selectedProducts');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever selection changes
  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const isSelected = (product: { id: number }) => {
    return selectedProducts.some(p => p.id === product.id);
  };

  const toggleSelection = (product: Product) => {
    setSelectedProducts(prev => {
      if (isSelected(product)) {
        toast(`${product.name} đã xóa khỏi danh sách`);
        return prev.filter(p => p.id !== product.id);
      } else {
        toast.success(`${product.name} đã thêm vào danh sách`);
        return [...prev, product];
      }
    });
  };

  const clearSelection = () => {
    setSelectedProducts([]);
    toast.info('Đã xóa tất cả sản phẩm khỏi danh sách');
  };

  const shareViaZalo = () => {
    if (selectedProducts.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm để chia sẻ');
      return;
    }

    const baseUrl = window.location.origin;
    
    // Create message text
    let message = '📋 *DANH SÁCH SẢN PHẨM QUAN TÂM*\n\n';
    
    // Add each product to the message
    selectedProducts.forEach((product, index) => {
      const productUrl = `${baseUrl}/product/${product.slug}`;
      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
      }).format(product.discountedPrice);
      
      message += `${index + 1}. ${product.name}\n`;
      message += `💰 Giá: ${formattedPrice}\n`;
      message += `🔗 Link: ${productUrl}\n\n`;
    });
    
    // Add footer
    message += '-----\nVui lòng tư vấn giúp tôi các sản phẩm trên. Xin cảm ơn!';
    
    // Create Zalo share URL
    const { phoneNumber } = { phoneNumber: '0123456789' }; // Get from zaloInfo
    const zaloUrl = `https://zalo.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open Zalo if available, otherwise show instructions
    try {
      window.open(zaloUrl, '_blank');
    } catch (error) {
      toast.error('Không thể mở Zalo. Vui lòng cài đặt ứng dụng Zalo hoặc mở trên thiết bị di động.');
    }
  };

  return (
    <ProductSelectionContext.Provider
      value={{
        selectedProducts,
        isSelected,
        toggleSelection,
        clearSelection,
        shareViaZalo
      }}
    >
      {children}
    </ProductSelectionContext.Provider>
  );
};

export const useProductSelection = () => {
  const context = useContext(ProductSelectionContext);
  if (context === undefined) {
    throw new Error('useProductSelection must be used within a ProductSelectionProvider');
  }
  return context;
};
