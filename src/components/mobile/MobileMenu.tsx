
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MessageCircle, Home, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { storeInfo } from '@/lib/data';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import MobileMenuCategories from './MobileMenuCategories';

const MobileMenu = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [openDrawer, setOpenDrawer] = useState(false);
  
  if (!isMobile) return null;

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleMessengerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://m.me/' + storeInfo.facebook.replace(/\//g, ''), '_blank');
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `tel:${storeInfo.phone.replace(/\D/g, '')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="flex items-center justify-around bg-white shadow-lg pb-safe h-16 border-t border-gray-200">
        {/* Danh Mục */}
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
          <DrawerTrigger asChild>
            <button className={cn(
              "flex flex-col items-center justify-center w-1/5 pt-1",
              isActive('/products') && "text-primary"
            )}>
              <Menu className="h-6 w-6" />
              <span className="text-xs mt-1">Danh Mục</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <DrawerHeader>
              <DrawerTitle className="text-center">Danh Mục Sản Phẩm</DrawerTitle>
            </DrawerHeader>
            <MobileMenuCategories closeDrawer={() => setOpenDrawer(false)} />
          </DrawerContent>
        </Drawer>

        {/* Nhắn tin */}
        <button 
          onClick={handleMessengerClick}
          className={cn(
            "flex flex-col items-center justify-center w-1/5 pt-1"
          )}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Nhắn tin</span>
        </button>

        {/* Trang chủ */}
        <Link 
          to="/" 
          className="relative -top-3"
          onClick={handleHomeClick}
        >
          <div className={cn(
            "flex flex-col items-center justify-center w-16 h-16 rounded-full bg-primary shadow-lg text-white transform transition-transform active:scale-95",
            location.pathname === '/' && "bg-primary-foreground text-primary border-2 border-primary"
          )}>
            <Home className="h-8 w-8" />
            <span className="text-xs font-medium">Trang chủ</span>
          </div>
        </Link>

        {/* Hotline */}
        <button 
          onClick={handleCall}
          className={cn(
            "flex flex-col items-center justify-center w-1/5 pt-1"
          )}
        >
          <Phone className="h-6 w-6" />
          <span className="text-xs mt-1">Hotline</span>
        </button>

        {/* Yêu cầu */}
        <Link 
          to="/contact" 
          className={cn(
            "flex flex-col items-center justify-center w-1/5 pt-1",
            isActive('/contact') && "text-primary"
          )}
        >
          <Mail className="h-6 w-6" />
          <span className="text-xs mt-1">Yêu cầu</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
