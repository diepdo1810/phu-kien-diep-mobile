
import { Link } from 'react-router-dom';
import { Star, Package, Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { 
  ProductCombo, 
  calculateComboOriginalPrice, 
  calculateComboPrice,
  getComboProductsDetails
} from '@/lib/combo-data';
import { formatPrice } from '@/lib/product-utils';

interface ComboCardProps {
  combo: ProductCombo;
  index?: number;
}

const ComboCard = ({ combo, index = 0 }: ComboCardProps) => {
  const originalPrice = calculateComboOriginalPrice(combo);
  const discountedPrice = calculateComboPrice(combo);
  const comboProducts = getComboProductsDetails(combo);
  const savingAmount = originalPrice - discountedPrice;
  const savingPercentage = Math.round((savingAmount / originalPrice) * 100);
  
  const animationDelay = `${index * 100}ms`;
  
  return (
    <Link
      to={`/combos/${combo.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
      style={{
        animationDelay,
        opacity: 0,
        transform: 'translateY(20px)',
        animation: 'slideUp 0.5s forwards',
      }}
    >
      {/* Combo main image */}
      <div className="relative">
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img 
            src={combo.images[0]} 
            alt={combo.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Badge */}
        {combo.badge && (
          <Badge 
            variant="default" 
            className="absolute top-3 left-3 bg-primary text-white px-2 py-1"
          >
            {combo.badge}
          </Badge>
        )}
        
        {/* Product count badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-sm font-medium px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Package className="h-4 w-4 text-primary" />
          <span>{combo.products.length} sản phẩm</span>
        </div>
      </div>
      
      {/* Combo info */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {combo.name}
        </h3>
        
        {/* Ratings */}
        {combo.rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="ml-1 text-sm font-medium">{combo.rating.toFixed(1)}</span>
            </div>
            <span className="mx-1.5 text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{combo.reviewCount} đánh giá</span>
          </div>
        )}
        
        {/* Products in combo */}
        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-2">Bao gồm:</p>
          <ul className="space-y-2">
            {comboProducts.slice(0, 3).map((product, idx) => (
              product && (
                <li key={idx} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md border bg-muted overflow-hidden flex-shrink-0">
                    <img 
                      src={product.images?.[0]} 
                      alt={product.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm line-clamp-1 flex-grow">
                    {product.quantity > 1 ? `${product.quantity}x ` : ''}{product.name}
                  </span>
                </li>
              )
            ))}
            
            {comboProducts.length > 3 && (
              <li className="text-xs text-muted-foreground">
                + {comboProducts.length - 3} sản phẩm khác
              </li>
            )}
          </ul>
        </div>
        
        {/* Prices */}
        <div className="mt-auto">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-lg font-bold text-primary">
                {formatPrice(discountedPrice)}
              </span>
              <span className="ml-2 text-sm line-through text-muted-foreground">
                {formatPrice(originalPrice)}
              </span>
            </div>
            <div className="flex items-center text-sm text-green-600 font-medium mt-1">
              <Check className="h-4 w-4 mr-1" />
              Tiết kiệm {formatPrice(savingAmount)} ({savingPercentage}%)
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes slideUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Link>
  );
};

export default ComboCard;
