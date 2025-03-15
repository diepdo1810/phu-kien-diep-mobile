
import { useState } from 'react';
import { MinusCircle, PlusCircle, X } from 'lucide-react';
import { formatPrice } from '@/lib/product-utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ComboProductItemProps {
  product: any;
  quantity: number;
  isRemovable?: boolean;
  onQuantityChange?: (id: number, newQuantity: number) => void;
  onRemove?: (id: number) => void;
  showControls?: boolean;
}

const ComboProductItem = ({ 
  product, 
  quantity, 
  isRemovable = false, 
  onQuantityChange,
  onRemove,
  showControls = false
}: ComboProductItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleIncrement = () => {
    if (onQuantityChange && product) {
      onQuantityChange(product.id, quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (onQuantityChange && product && quantity > 1) {
      onQuantityChange(product.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    if (onRemove && product) {
      onRemove(product.id);
    }
  };
  
  if (!product) return null;
  
  return (
    <div 
      className="flex items-stretch border rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-24 w-24 flex-shrink-0 bg-gray-100">
        <img 
          src={product.images?.[0]} 
          alt={product.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex-grow p-3 flex flex-col justify-between">
        <div>
          <Link
            to={`/product/${product.slug}`}
            className="font-medium hover:text-primary transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
          <div className="text-sm text-muted-foreground mt-1">
            {formatPrice(product.price)} x {quantity}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm font-medium">
            {formatPrice(product.price * quantity)}
          </div>
          
          {showControls && (
            <div className="flex items-center gap-1">
              {isRemovable && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={handleDecrement}
                disabled={quantity <= 1}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              
              <span className="w-8 text-center">{quantity}</span>
              
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={handleIncrement}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComboProductItem;
