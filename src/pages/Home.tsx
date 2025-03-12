
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Banner from '@/components/ui/Banner';
import CategoryCard from '@/components/ui/CategoryCard';
import ProductCard from '@/components/ui/ProductCard';
import ReviewCard from '@/components/ui/ReviewCard';
import { categories, products, reviews } from '@/lib/data';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Get featured products
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  
  // Get best selling categories (just using the first 6 for demo)
  const popularCategories = categories.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Banner Section */}
        <section className="relative">
          <Banner />
        </section>

        {/* Categories Section */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Danh mục phổ biến</h2>
                <p className="text-muted-foreground mt-2">Khám phá các danh mục sản phẩm được ưa chuộng nhất</p>
              </div>
              <Link 
                to="/products" 
                className="hidden md:flex items-center text-primary hover:underline font-medium"
              >
                Xem tất cả
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-muted rounded-xl animate-pulse h-64"></div>
                ))
              ) : (
                popularCategories.map((category, index) => (
                  <CategoryCard 
                    key={category.id} 
                    {...category} 
                    index={index} 
                  />
                ))
              )}
            </div>
            
            <div className="mt-6 text-center md:hidden">
              <Link 
                to="/products" 
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                Xem tất cả danh mục
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="section-padding bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Sản phẩm nổi bật</h2>
                <p className="text-muted-foreground mt-2">Những sản phẩm chất lượng cao được nhiều khách hàng lựa chọn</p>
              </div>
              <Link 
                to="/products" 
                className="hidden md:flex items-center text-primary hover:underline font-medium"
              >
                Xem tất cả
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="bg-muted rounded-xl animate-pulse h-80"></div>
                ))
              ) : (
                featuredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    {...product} 
                    index={index} 
                  />
                ))
              )}
            </div>
            
            <div className="mt-6 text-center md:hidden">
              <Link 
                to="/products" 
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                Xem tất cả sản phẩm
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Khách hàng nói gì về chúng tôi</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Những đánh giá chân thực từ khách hàng đã trải nghiệm sản phẩm và dịch vụ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-muted rounded-xl animate-pulse h-48"></div>
                ))
              ) : (
                reviews.map((review, index) => (
                  <ReviewCard 
                    key={review.id} 
                    {...review} 
                    index={index} 
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Tìm phụ kiện điện thoại phù hợp với bạn
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Chúng tôi cung cấp đa dạng phụ kiện chính hãng, chất lượng cao với giá ưu đãi nhất
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-primary hover:bg-white/90 transition-colors"
            >
              Khám phá ngay
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
