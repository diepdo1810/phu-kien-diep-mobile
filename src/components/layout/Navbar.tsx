import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  ShoppingBag,
  Phone,
  ShoppingCart,
  Zap,
  Home,
  Info,
  Smartphone,
} from "lucide-react";
import { storeInfo } from "@/lib/data";
import { categories } from "@/lib/data";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const routes = [
    {
      name: "SẢN PHẨM",
      path: "/products",
      icon: <Smartphone className="h-4 w-4" />,
      hasDropdown: true,
    },
    {
      name: "FLASH SALE",
      path: "/flash-sale",
      icon: <Zap className="h-4 w-4" />,
    },
    { name: "TRANG CHỦ", path: "/", icon: <Home className="h-4 w-4" /> },
  ];

  const productDropdownItems = [
    { name: "Sản phẩm", path: "/products" },
    { name: "Combo sản phẩm", path: "/combos" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
      isScrolled
        ? "bg-white/90 shadow-sm backdrop-blur-md"
        : "bg-transparent"
    }`}
  >
    <div className="section-container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">
            {storeInfo.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 laptop:space-x-8">
          {routes.map((route) =>
            route.hasDropdown ? (
              <div key={route.path} className="relative group">
                <Link
                  to={route.path}
                  className={`text-sm font-medium transition-colors hover:text-primary flex items-center ${
                    location.pathname === route.path
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {route.icon && <span className="mr-1">{route.icon}</span>}
                  {route.name}
                </Link>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                  <div className="py-2">
                    {productDropdownItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={route.path}
                to={route.path}
                className={`text-sm font-medium transition-colors hover:text-primary relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                  location.pathname === route.path
                    ? "text-primary after:scale-x-100"
                    : "text-foreground"
                }`}
              >
                <span className="flex items-center">
                  {route.icon && <span className="mr-1">{route.icon}</span>}
                  {route.name}
                </span>
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-48 lg:w-56 laptop:w-64 py-2 px-4 pl-10 text-sm bg-secondary rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </form>

          <Link
            to="/order"
            className="flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/90 transition-colors"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Đặt hàng
          </Link>

          <a
            href={`tel:${storeInfo.phone.replace(/\D/g, "")}`}
            className="flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            <Phone className="mr-2 h-4 w-4" />
            {storeInfo.phone}
          </a>
        </div>

        {/* <button
        onClick={toggleMobileMenu}
        className="md:hidden flex items-center justify-center p-2 rounded-md text-foreground"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button> */}
      </div>
    </div>

    {/* {isMobileMenuOpen && (
    <div className="md:hidden bg-white animate-fade-in">
      <div className="pt-2 pb-4 px-5 space-y-3">
        <form onSubmit={handleSearch} className="relative mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full py-2 px-4 pl-10 text-sm bg-secondary rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </form>

        {routes.map((route) => (
          route.hasDropdown ? (
            <div key={route.path} className="py-2">
              <div className="flex items-center py-2 text-base font-medium text-foreground">
                {route.icon && <span className="mr-2">{route.icon}</span>}
                {route.name}
              </div>
              <div className="pl-6 border-l border-gray-100 mt-1 space-y-2">
                {productDropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center py-1 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={route.path}
              to={route.path}
              className={`flex items-center py-2 text-base font-medium hover:text-primary transition-colors ${location.pathname === route.path ? 'text-primary' : 'text-foreground'}`}
            >
              {route.icon && <span className="mr-2">{route.icon}</span>}
              {route.name}
            </Link>
          )
        ))}

        <Link
          to="/order"
          className="flex items-center py-2 text-base font-medium hover:text-primary transition-colors"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Đặt hàng
        </Link>

        <a href={`tel:${storeInfo.phone.replace(/\D/g, '')}`} className="flex items-center justify-center w-full mt-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
          <Phone className="mr-2 h-4 w-4" />
          {storeInfo.phone}
        </a>
      </div>
    </div>
  )} */}
  </header>
  );
};

export default Navbar;
