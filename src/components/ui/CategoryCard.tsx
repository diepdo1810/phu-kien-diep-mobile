
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface CategoryCardProps {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  index?: number;
}

const CategoryCard = ({ id, name, slug, image, description, index = 0 }: CategoryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Calculate delay for staggered animation
  const animationDelay = `${index * 100}ms`;

  return (
    <Link 
      to={`/products/${slug}`} 
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      style={{ 
        animationDelay,
        opacity: 0,
        transform: 'translateY(20px)',
        animation: 'slideUp 0.5s forwards',
      }}
    >
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-xl" />
      )}
      
      <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
        <img
          src={image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000"}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-sm font-medium text-primary">
          <span>Xem sản phẩm</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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

export default CategoryCard;
