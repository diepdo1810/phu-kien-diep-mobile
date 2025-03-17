
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuHubCardProps {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  colorClass?: string;
  index?: number;
}

const MenuHubCard = ({ 
  title, 
  description, 
  path, 
  icon: Icon, 
  colorClass = "from-blue-600 to-blue-400",
  index = 0 
}: MenuHubCardProps) => {
  // Calculate animation delay based on index
  const animationDelay = `${index * 100}ms`;

  return (
    <Link 
      to={path}
      className="flex flex-col h-full overflow-hidden rounded-xl bg-white border border-border shadow-sm hover:shadow-md transition-all duration-300 group animate-in"
      style={{ 
        animationDelay,
        opacity: 0,
        transform: 'translateY(10px)'
      }}
    >
      <div className={cn(
        "p-6 flex flex-col h-full",
        "bg-gradient-to-br text-white",
        colorClass
      )}>
        <div className="mb-4 inline-flex p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <Icon className="h-8 w-8" />
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>
        
        <p className="text-white/80 mb-6 flex-grow">
          {description}
        </p>
        
        <div className="flex items-center mt-auto text-sm font-medium">
          <span>Xem chi tiết</span>
          <span className="ml-2 w-5 h-5 rounded-full bg-white/30 inline-flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MenuHubCard;
