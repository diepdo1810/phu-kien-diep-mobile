
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/ui/CategoryCard';
import ProductCard from '../components/ui/ProductCard';
import ReviewCard from '../components/ui/ReviewCard';
import ProductStatistics from '../components/ui/ProductStatistics';
import { categories, products, reviews } from '@/lib/data';

const Index = () => {
  const featuredCategories = categories.slice(0, 4);
  const featuredProducts = products.filter(product => product.featured).slice(0, 8);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-in appear-first">
            Phụ kiện điện thoại <br className="hidden md:block" />
            <span className="text-yellow-300">chính hãng</span>
          </h1>
          <p className="text-lg md:text-xl max-w-xl mb-8 animate-in appear-second">
            Kho phụ kiện đa dạng, chất lượng cao với giá cả cạnh tranh nhất thị trường
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in appear-third">
            <Link
              to="/products"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              Xem sản phẩm
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Liên hệ ngay
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gray-50 clip-slant" />
      </section>

      {/* Product Statistics Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <ProductStatistics />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Danh mục sản phẩm</h2>
            <Link 
              to="/products" 
              className="text-primary flex items-center hover:underline font-medium"
            >
              Xem tất cả
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <CategoryCard key={category.id} {...category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Sản phẩm nổi bật</h2>
            <Link 
              to="/products" 
              className="text-primary flex items-center hover:underline font-medium"
            >
              Xem tất cả
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Khách hàng nói gì về chúng tôi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredReviews.map((review, index) => (
              <ReviewCard key={review.id} {...review} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Bạn cần tư vấn thêm?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Đội ngũ chuyên viên của chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-blue-50 inline-block transition-colors"
          >
            Liên hệ ngay
          </Link>
        </div>
      </section>

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
