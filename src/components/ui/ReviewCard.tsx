
import { Star } from 'lucide-react';

interface ReviewCardProps {
  id: number;
  customerName: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  index?: number;
}

const ReviewCard = ({ customerName, avatar, rating, date, text, index = 0 }: ReviewCardProps) => {
  // Calculate delay for staggered animation
  const animationDelay = `${index * 150}ms`;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'fill-amber-400 text-amber-400'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      style={{ 
        animationDelay,
        opacity: 0,
        transform: 'translateY(20px)',
        animation: 'slideUp 0.5s forwards',
      }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary mr-4">
          <img
            src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&background=0D8ABC&color=fff`}
            alt={customerName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h4 className="font-medium">{customerName}</h4>
          <div className="flex items-center mt-1">
            <div className="flex mr-2">{renderStars(rating)}</div>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm">{text}</p>

      <style jsx>{`
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewCard;
