
import { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Zap, Info, FileText, ChevronUp } from 'lucide-react';
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
        "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-40 transition-transform duration-300 pb-safe",
        !isVisible && "translate-y-full"
      )}
      style={{ 
        paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))" 
      }}
    >
      <div className="flex items-center justify-between px-2 py-2">
        {(!compactMode || compactMode) && (
          <Drawer>
            <DrawerTrigger asChild>
              <MenuItem
                icon={<Package className="w-5 h-5" />}
                label="SẢN PHẨM"
                isActive={location.pathname.includes('/products')}
              />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Danh mục sản phẩm</DrawerTitle>
                <DrawerDescription>
                  Chọn danh mục sản phẩm bạn muốn xem
                </DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-4 p-4">
                <Link to="/products/thit-tuoi" className="flex items-center p-2 border rounded-md hover:bg-muted">
                  Thịt tươi
                </Link>
                <Link to="/products/hai-san" className="flex items-center p-2 border rounded-md hover:bg-muted">
                  Hải sản
                </Link>
                <Link to="/products/rau-cu" className="flex items-center p-2 border rounded-md hover:bg-muted">
                  Rau củ
                </Link>
                <Link to="/products/trai-cay" className="flex items-center p-2 border rounded-md hover:bg-muted">
                  Trái cây
                </Link>
              </div>
              <DrawerFooter>
                <Link to="/products" className="w-full">
                  <div className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                    Xem tất cả sản phẩm
                  </div>
                </Link>
                <DrawerClose className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                  Đóng
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
        
        {!compactMode && (
          <MenuItem
            icon={<Zap className="w-5 h-5" />}
            label="FLASH SALE"
            path="/flash-sale"
            isActive={location.pathname === '/flash-sale'}
          />
        )}
        
        <MenuItem
          icon={<Home className="w-6 h-6" />}
          label="TRANG CHỦ"
          path="/"
          isActive={location.pathname === '/'}
          isHome
        />
        
        {!compactMode && (
          <MenuItem
            icon={<Info className="w-5 h-5" />}
            label="GIỚI THIỆU"
            path="/about"
            isActive={location.pathname === '/about'}
          />
        )}
        
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
              <Link to="/terms/warranty">Bảo hành - Đổi trả</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/terms/ordering">Quy định đặt hàng</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/terms/shipping">Thanh toán - Giao hàng</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default memo(MobileMenu);
