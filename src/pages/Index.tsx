
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Newspaper, 
  Search, 
  ShoppingCart, 
  Phone, 
  Package, 
  ShoppingBag, 
  Award, 
  Users, 
  Mail 
} from 'lucide-react';
import Footer from '@/components/layout/Footer';
import CategoryCard from '../components/ui/CategoryCard';
import ProductCard from '../components/ui/ProductCard';
import ReviewCard from '../components/ui/ReviewCard';
import ProductStatistics from '../components/ui/ProductStatistics';
import MenuHubCard from '../components/ui/MenuHubCard';
import { Button } from '../components/ui/button';
import { categories, products, reviews } from '@/lib/data';
import { storeInfo } from '@/lib/data';
import { getLatestArticles } from '@/lib/news-data';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredCategories = categories.slice(0, 4);
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  const featuredReviews = reviews.slice(0, 3);
  const latestNews = getLatestArticles(3);

  const menuItems = [
    {
      title: "Sản phẩm",
      description: "Khám phá đa dạng phụ kiện điện thoại chính hãng với giá ưu đãi",
      path: "/products",
      icon: ShoppingBag,
      colorClass: "from-blue-600 to-blue-400"
    },
    {
      title: "Combo sản phẩm",
      description: "Tiết kiệm hơn với các bộ combo phụ kiện đa dạng",
      path: "/combos",
      icon: Package,
      colorClass: "from-purple-600 to-purple-400"
    },
    {
      title: "Tin tức",
      description: "Cập nhật tin tức mới nhất về công nghệ và phụ kiện điện thoại",
      path: "/news",
      icon: Newspaper,
      colorClass: "from-green-600 to-green-400"
    },
    {
      title: "Chứng nhận",
      description: "Xem các chứng nhận và giấy tờ pháp lý của cửa hàng",
      path: "/certifications",
      icon: Award,
      colorClass: "from-yellow-600 to-yellow-400"
    },
    {
      title: "Bán sỉ",
      description: "Thông tin và chính sách dành cho đại lý và khách hàng mua số lượng lớn",
      path: "/wholesale",
      icon: Users,
      colorClass: "from-red-600 to-red-400"
    },
    {
      title: "Liên hệ",
      description: "Địa chỉ cửa hàng và thông tin liên lạc",
      path: "/contact",
      icon: Mail,
      colorClass: "from-teal-600 to-teal-400"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo, Search and Call To Action */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="section-container py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">{storeInfo.name}</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full sm:w-56 md:w-64 lg:w-72 py-2 px-4 pl-10 text-sm bg-secondary rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>

            <div className="flex items-center gap-3">
              <Link 
                to="/order" 
                className="flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/90 transition-colors"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Đặt hàng
              </Link>

              <a 
                href={`tel:${storeInfo.phone.replace(/\D/g, '')}`} 
                className="flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                <Phone className="mr-2 h-4 w-4" />
                {storeInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="section-container py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-in appear-first">
            Phụ kiện điện thoại <br className="hidden md:block" />
            <span className="text-yellow-300">chính hãng</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-xl mb-6 sm:mb-8 animate-in appear-second">
            Kho phụ kiện đa dạng, chất lượng cao với giá cả cạnh tranh nhất thị trường
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gray-50 clip-slant" />
      </section>

      {/* Menu Hub Section */}
      <section className="py-12 -mt-10 relative z-10">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <MenuHubCard
                key={item.path}
                title={item.title}
                description={item.description}
                path={item.path}
                icon={item.icon}
                colorClass={item.colorClass}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="section-container">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Sản phẩm nổi bật</h2>
            <Link 
              to="/products" 
              className="text-primary flex items-center hover:underline font-medium"
            >
              Xem tất cả
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12">Khách hàng nói gì về chúng tôi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review, index) => (
              <ReviewCard key={review.id} {...review} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="section-container text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Bạn cần tư vấn thêm?</h2>
          <p className="max-w-2xl mx-auto mb-6 text-white/80">
            Đội ngũ chuyên viên của chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-blue-50 inline-block transition-colors"
          >
            Liên hệ ngay
          </Link>
        </div>
      </section>
      
      <Footer />

      <style>
        {`
          .clip-slant {
            clip-path: polygon(0 0, 100% 100%, 100% 100%, 0% 100%);
          }
        `}
      </style>
    </div>
  );
};

export default Index;
