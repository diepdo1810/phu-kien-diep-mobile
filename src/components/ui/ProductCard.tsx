
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Star } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  wholesalePrice: number;
  discount: number;
  images: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  index?: number;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({
  id,
  name,
  slug,
  price,
  wholesalePrice,
  discount,
  images,
  rating,
  reviewCount,
  featured = false,
  index = 0,
}: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Calculate delay for staggered animation
  const animationDelay = `${index * 100}ms`;

  // Handle image hover
  const handleMouseEnter = () => {
    if (images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  const discountedPrice = price - (price * discount) / 100;

  return (
    <Link
      to={`/product/${slug}`}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      style={{
        animationDelay,
        opacity: 0,
        transform: 'translateY(20px)',
        animation: 'slideUp 0.5s forwards',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-xl" />
      )}

      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded">
          -{discount}%
        </div>
      )}

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-10 bg-primary text-white text-xs font-medium px-2.5 py-1 rounded">
          Nổi bật
        </div>
      )}

      {/* Product image */}
      <div className="aspect-square bg-secondary relative overflow-hidden product-img-wrapper">
        <img
          src={images[currentImageIndex] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000"}
          alt={name}
          className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      {/* Product info */}
      <div className="p-5">
        <h3 className="text-base font-medium mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="mx-1.5 text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{reviewCount} đánh giá</span>
        </div>

        {/* Price */}
        <div className="mt-2">
          {discount > 0 ? (
            <div className="flex items-center">
              <span className="text-lg font-bold">{formatPrice(discountedPrice)}</span>
              <span className="ml-2 text-sm line-through text-muted-foreground">
                {formatPrice(price)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold">{formatPrice(price)}</span>
          )}
          <div className="mt-1">
            <span className="text-xs text-muted-foreground">Giá sỉ: {formatPrice(wholesalePrice)}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Link>
  );
};

export default ProductCard;
