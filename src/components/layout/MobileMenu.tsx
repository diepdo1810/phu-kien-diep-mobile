
import { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Zap, Info, FileText, ChevronUp, Phone, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

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
          isActive ? "text-[#FFD700]" : "text-gray-700"
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
        isActive && !isHome && "text-[#FFD700]"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-[10px] mt-1 font-medium",
        isActive ? "text-[#FFD700]" : "text-gray-700"
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
        <MenuItem
          icon={<Smartphone className="w-5 h-5" />}
          label="SẢN PHẨM"
          path="/products"
          isActive={location.pathname.includes('/products')}
        />
        
        <MenuItem
          icon={<Zap className="w-5 h-5" />}
          label="FLASH SALE"
          path="/flash-sale"
          isActive={location.pathname === '/flash-sale'}
        />
        
        <MenuItem
          icon={<Home className="w-6 h-6" />}
          label="TRANG CHỦ"
          path="/"
          isActive={location.pathname === '/'}
          isHome
        />
        
        <MenuItem
          icon={<Info className="w-5 h-5" />}
          label="GIỚI THIỆU"
          path="/about"
          isActive={location.pathname === '/about'}
        />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex-1 flex flex-col items-center cursor-pointer">
              <div className={cn(
                "flex items-center justify-center w-6 h-6",
                location.pathname.includes('/terms') && "text-[#FFD700]"
              )}>
                <FileText className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[10px] mt-1 font-medium",
                location.pathname.includes('/terms') ? "text-[#FFD700]" : "text-gray-700"
              )}>
                QUY ĐỊNH
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link to="/terms/warranty">BẢO HÀNH - ĐỔI TRẢ</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/terms/ordering">QUY ĐỊNH ĐẶT HÀNG</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/terms/shipping">THANH TOÁN - GIAO HÀNG</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default memo(MobileMenu);
