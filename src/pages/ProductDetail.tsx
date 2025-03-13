import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, Package, Info, FileText, Award, ChevronRight, Star, AlertCircle, Share2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGallery from '@/components/product/ProductGallery';
import ProductShare from '@/components/product/ProductShare';
import ZaloContact from '@/components/product/ZaloContact';
import WholesalePricing from '@/components/product/WholesalePricing';
import ProductCard from '@/components/ui/ProductCard';
import ReviewCard from '@/components/ui/ReviewCard';
import ShareProductsButton from '@/components/product/ShareProductsButton';
import { useProductSelection } from '@/hooks/useProductSelection';
import { 
  getProductBySlug, getProductBrand, getProductCategory, 
  getRelatedProducts, getStockStatus, formatPrice 
} from '@/lib/product-utils';
import { reviews } from '@/lib/data';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<any>(null);
  const [brand, setBrand] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [productReviews, setProductReviews] = useState<any[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const { isSelected, toggleSelection } = useProductSelection();
  
  useEffect(() => {
    // Scroll to top when navigating to a new product
    window.scrollTo(0, 0);
    
    setIsLoading(true);
    
    // Simulate API fetch with a small delay
    setTimeout(() => {
      if (slug) {
        const productData = getProductBySlug(slug);
        
        if (productData) {
          setProduct(productData);
          
          // Get brand and category
          const brandData = getProductBrand(productData.brandId);
          const categoryData = getProductCategory(productData.categoryId);
          setBrand(brandData);
          setCategory(categoryData);
          
          // Get related products
          const related = getRelatedProducts(productData.id, productData.categoryId);
          setRelatedProducts(related);
          
          // Get product reviews
          const productReviewData = reviews.filter(review => review.productId === productData.id);
          setProductReviews(productReviewData);
        }
      }
      
      setIsLoading(false);
    }, 500);
  }, [slug]);
  
  // Calculate discounted price
  const getDiscountedPrice = () => {
    if (!product) return 0;
    return product.price - (product.price * product.discount) / 100;
  };
  
  // Get stock status text and color
  const stockStatus = product ? getStockStatus(product.stock) : { status: '', color: '' };
  
  // Current full URL for sharing
  const currentUrl = `${window.location.origin}${location.pathname}`;

  const handleAddToSelection = () => {
    if (product) {
      const productToAdd = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        discount: product.discount,
        discountedPrice: getDiscountedPrice(),
        images: product.images
      };
      
      toggleSelection(productToAdd);
    }
  };
  
  const toggleRelatedProductSelection = () => {
    setSelectionMode(!selectionMode);
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow pt-16 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 animate-pulse rounded-xl aspect-square"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 animate-pulse rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-10 bg-gray-200 animate-pulse rounded w-full"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow pt-16 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Không tìm thấy sản phẩm</h1>
            <p className="text-muted-foreground mb-6">Sản phẩm bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
            <Link 
              to="/products"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Breadcrumbs */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary">Trang chủ</Link>
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              <Link to="/products" className="text-muted-foreground hover:text-primary">Sản phẩm</Link>
              {category && (
                <>
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                  <Link 
                    to={`/products/${category.slug}`} 
                    className="text-muted-foreground hover:text-primary"
                  >
                    {category.name}
                  </Link>
                </>
              )}
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              <span className="text-foreground font-medium truncate">{product.name}</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Gallery */}
            <div>
              <ProductGallery images={product.images} name={product.name} />
            </div>
            
            {/* Product Info */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleAddToSelection}
                >
                  {isSelected({ id: product.id }) ? (
                    <>Đã thêm vào danh sách</>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4" />
                      Thêm vào danh sách
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-sm text-muted-foreground">Mã: <span className="font-medium text-foreground">{product.sku}</span></div>
                {brand && (
                  <div className="text-sm text-muted-foreground">Thương hiệu: <span className="font-medium text-foreground">{brand.name}</span></div>
                )}
              </div>
              
              {/* Ratings */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-amber-400 text-amber-400' 
                          : i < product.rating 
                            ? 'fill-amber-400 text-amber-400 fill-half' 
                            : 'fill-gray-200 text-gray-200'
                      }`} 
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating.toFixed(1)}</span>
                </div>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{product.reviewCount} đánh giá</span>
              </div>
              
              {/* Regular Price & Discount */}
              <div className="mb-4">
                {product.discount > 0 ? (
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(getDiscountedPrice())}
                    </span>
                    <span className="text-lg line-through text-muted-foreground">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </div>
                )}
                <div className="text-sm text-muted-foreground mt-1">
                  Giá bán lẻ tham khảo - Vui lòng liên hệ để có giá tốt nhất
                </div>
              </div>
              
              {/* Wholesale Pricing */}
              <WholesalePricing 
                wholesaleTiers={product.wholesaleTiers} 
                minWholesaleQuantity={product.minWholesaleQuantity}
              />
              
              {/* Stock Status */}
              <div className="mt-4 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                <span className="text-sm">Tình trạng: </span>
                <span className={`ml-1 text-sm font-medium ${stockStatus.color}`}>
                  {stockStatus.status}
                </span>
                {product.stock > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    (Còn {product.stock} sản phẩm)
                  </span>
                )}
              </div>
              
              {/* Wholesale Minimum */}
              <div className="mt-2 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                <span className="text-sm">Mua sỉ tối thiểu: </span>
                <span className="ml-1 text-sm font-medium">
                  {product.minWholesaleQuantity} sản phẩm
                </span>
              </div>
              
              {/* Call to action */}
              <div className="mt-6">
                <ZaloContact productName={product.name} productUrl={currentUrl} />
              </div>
              
              {/* Share */}
              <div className="mt-4 flex justify-center">
                <ProductShare url={currentUrl} title={product.name} />
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-10">
            <Tabs defaultValue="description">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="description" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Mô tả</span>
                </TabsTrigger>
                <TabsTrigger value="specifications" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>Thông số kỹ thuật</span>
                </TabsTrigger>
                <TabsTrigger value="warranty" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>Bảo hành</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Mô tả sản phẩm</h3>
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Thông số kỹ thuật</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications.map((spec: any, index: number) => (
                    <div key={index} className="flex">
                      <div className="w-1/2 font-medium">{spec.name}:</div>
                      <div className="w-1/2">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="warranty" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Chính sách bảo hành</h3>
                <div className="prose max-w-none">
                  <p>{product.warranty}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Reviews Section */}
          {productReviews.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Đánh giá từ khách hàng</h2>
                <span className="text-sm text-muted-foreground">{productReviews.length} đánh giá</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productReviews.map((review, index) => (
                  <ReviewCard 
                    key={review.id}
                    id={review.id}
                    customerName={review.customerName}
                    avatar={review.avatar}
                    rating={review.rating}
                    date={review.date}
                    text={review.text}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Sản phẩm liên quan</h2>
                {relatedProducts.length > 1 && (
                  <Button 
                    variant={selectionMode ? "default" : "outline"} 
                    size="sm"
                    onClick={toggleRelatedProductSelection}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>{selectionMode ? 'Hủy chọn' : 'Chọn sản phẩm'}</span>
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard 
                    key={relatedProduct.id}
                    {...relatedProduct}
                    index={index}
                    selectable={selectionMode}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Share Products Button */}
        <ShareProductsButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
