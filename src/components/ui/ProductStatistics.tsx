
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, Clock, TrendingUp, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { 
  getMostViewedProducts, 
  getNewestProducts, 
  getBestSellingProducts 
} from "@/lib/product-utils";

interface ProductStatisticsProps {
  className?: string;
}

const ProductStatistics = ({ className = "" }: ProductStatisticsProps) => {
  const [activeTab, setActiveTab] = useState("most-viewed");
  
  // Get products for each category
  const mostViewedProducts = getMostViewedProducts(6);
  const newestProducts = getNewestProducts(6);
  const bestSellingProducts = getBestSellingProducts(6);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold">Thống kê sản phẩm</h2>
          <Link 
            to="/products" 
            className="text-primary flex items-center hover:underline font-medium"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="most-viewed" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Xem nhiều nhất</span>
              <span className="sm:hidden">Xem nhiều</span>
            </TabsTrigger>
            <TabsTrigger value="newest" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Sản phẩm mới</span>
              <span className="sm:hidden">Mới nhất</span>
            </TabsTrigger>
            <TabsTrigger value="best-selling" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Bán chạy nhất</span>
              <span className="sm:hidden">Bán chạy</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="most-viewed" className="mt-0">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {mostViewedProducts.map((product, index) => (
                  <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <ProductCard {...product} index={index}>
                      <div className="absolute top-3 right-3 z-10 bg-primary/90 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {product.viewCount || Math.floor(Math.random() * 1000) + 100}
                      </div>
                    </ProductCard>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end mt-4">
                <CarouselPrevious className="static translate-y-0 mr-2" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </TabsContent>
          
          <TabsContent value="newest" className="mt-0">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {newestProducts.map((product, index) => (
                  <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <ProductCard {...product} index={index}>
                      <div className="absolute top-3 right-3 z-10 bg-green-600 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Mới
                      </div>
                    </ProductCard>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end mt-4">
                <CarouselPrevious className="static translate-y-0 mr-2" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </TabsContent>
          
          <TabsContent value="best-selling" className="mt-0">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {bestSellingProducts.map((product, index) => (
                  <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <ProductCard {...product} index={index}>
                      <div className="absolute top-3 right-3 z-10 bg-amber-500 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Bán chạy
                      </div>
                    </ProductCard>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end mt-4">
                <CarouselPrevious className="static translate-y-0 mr-2" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductStatistics;
