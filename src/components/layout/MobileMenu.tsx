
import { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Home, ChevronDown, Phone, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  path?: string;
  isActive: boolean;
  isHome?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const MenuItem = memo(({ icon, label, path, isActive, isHome = false, onClick, children }: MenuItemProps) => {
  if (children) {
    return (
      <div className="flex-1 flex flex-col items-center">
        {children}
        <span className={cn(
          "text-[10px] mt-1 font-medium",
          isActive ? "text-white" : "text-gray-700"
        )}>
          {label}
        </span>
      </div>
    );
  }

  return (
    <Link 
      to={path || "#"} 
      className="flex-1 flex flex-col items-center" 
      onClick={onClick}
      aria-label={label}
    >
      <div className={cn(
        "flex items-center justify-center w-6 h-6",
        isHome && "w-12 h-12 bg-[#FFD700] rounded-full -mt-5 shadow-md transition-transform active:scale-95",
        isActive && !isHome && "text-white"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-[10px] mt-1 font-medium",
        isActive ? "text-white" : "text-gray-700"
      )}>
        {label}
      </span>
    </Link>
  );
});

MenuItem.displayName = "MenuItem";

const MobileMenu = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [compactMode, setCompactMode] = useState(false);

  // Check window width for compact mode
  useEffect(() => {
    const checkCompactMode = () => {
      setCompactMode(window.innerWidth < 375);
    };
    
    checkCompactMode();
    window.addEventListener('resize', checkCompactMode);
    
    return () => {
      window.removeEventListener('resize', checkCompactMode);
    };
  }, []);

  // Handle scroll to hide/show menu
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Don't render on desktop
  if (!isMobile) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-[#FFD700] border-t border-gray-200 shadow-md z-40 transition-transform duration-300 pb-safe",
        !isVisible && "translate-y-full"
      )}
      style={{ 
        paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))" 
      }}
    >
      <div className="flex items-center justify-between px-2 py-2">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex-1 flex flex-col items-center cursor-pointer">
              <div className={cn(
                "flex items-center justify-center w-6 h-6",
                location.pathname.includes('/products') || location.pathname.includes('/combos') ? "text-white" : ""
              )}>
                <Smartphone className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[10px] mt-1 font-medium flex items-center",
                (location.pathname.includes('/products') || location.pathname.includes('/combos')) ? "text-white" : "text-gray-700"
              )}>
                SẢN PHẨM
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-screen max-w-screen" align="center">
            <div className="grid grid-cols-2 gap-1 p-3">
              <Link to="/products" className="flex flex-col items-center p-2 hover:bg-gray-100 rounded">
                <Smartphone className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Sản phẩm</span>
              </Link>
              <Link to="/combos" className="flex flex-col items-center p-2 hover:bg-gray-100 rounded">
                <ShoppingCart className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Combo sản phẩm</span>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
        
        <MenuItem
          icon={<Search className="w-5 h-5" />}
          label="TÌM KIẾM"
          path="/search"
          isActive={location.pathname === '/search'}
        />
        
        <MenuItem
          icon={<Home className="w-6 h-6" />}
          label="TRANG CHỦ"
          path="/"
          isActive={location.pathname === '/'}
          isHome
        />
        
        <MenuItem
          icon={<ShoppingCart className="w-5 h-5" />}
          label="ĐẶT HÀNG"
          path="/order"
          isActive={location.pathname === '/order'}
        />
        
        <MenuItem
          icon={<Phone className="w-5 h-5" />}
          label="LIÊN HỆ"
          path="/contact"
          isActive={location.pathname === '/contact'}
        />
      </div>
    </div>
  );
};

export default memo(MobileMenu);
