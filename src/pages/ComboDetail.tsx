
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Package, ChevronRight, Gift, Star, Check, Plus, AlertCircle, ShoppingBag,
  Percent, CreditCard
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ComboCard from '@/components/combo/ComboCard';
import ComboProductItem from '@/components/combo/ComboProductItem';
import ProductGallery from '@/components/product/ProductGallery';
import ZaloContact from '@/components/product/ZaloContact';
import ShareProductsButton from '@/components/product/ShareProductsButton';
import { 
  getComboBySlug, 
  getRelatedCombos,
  calculateComboOriginalPrice,
  calculateComboPrice,
  getComboProductsDetails
} from '@/lib/combo-data';
import { formatPrice } from '@/lib/product-utils';
import { products, reviews } from '@/lib/data';

const ComboDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [combo, setCombo] = useState<any>(null);
  const [comboProducts, setComboProducts] = useState<any[]>([]);
  const [relatedCombos, setRelatedCombos] = useState<any[]>([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [comboReviews, setComboReviews] = useState<any[]>([]);
  
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    // Simulate API fetch
    setTimeout(() => {
      if (slug) {
        const comboData = getComboBySlug(slug);
        
        if (comboData) {
          setCombo(comboData);
          
          // Get combo products details
          const productDetails = getComboProductsDetails(comboData);
          setComboProducts(productDetails);
          
          // Calculate prices
          const originalPrice = calculateComboOriginalPrice(comboData);
          const discountedPrice = calculateComboPrice(comboData);
          setOriginalPrice(originalPrice);
          setDiscountedPrice(discountedPrice);
          
          // Get related combos
          const related = getRelatedCombos(comboData.id, comboData.phoneTypes);
          setRelatedCombos(related);
          
          // Get sample reviews (using product reviews for demo)
          const sampleReviews = reviews.slice(0, 3);
          setComboReviews(sampleReviews);
        }
      }
      
      setIsLoading(false);
    }, 500);
  }, [slug]);
  
  // Calculate savings
  const savingAmount = originalPrice - discountedPrice;
  const savingPercentage = Math.round((savingAmount / originalPrice) * 100);
  
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
  
  if (!combo) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow pt-16 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Không tìm thấy combo</h1>
            <p className="text-muted-foreground mb-6">Combo bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
            <Link 
              to="/combos"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Xem tất cả combo
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
              <Link to="/combos" className="text-muted-foreground hover:text-primary">Combo phụ kiện</Link>
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              <span className="text-foreground font-medium truncate">{combo.name}</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Combo Gallery */}
            <div>
              <ProductGallery images={combo.images} name={combo.name} />
            </div>
            
            {/* Combo Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {combo.badge && (
                  <Badge variant="default" className="bg-primary">
                    {combo.badge}
                  </Badge>
                )}
                
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                  <Package className="mr-1 h-3 w-3" />
                  {combo.products.length} sản phẩm
                </Badge>
                
                {combo.phoneTypes.map((type: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {type}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-2xl font-bold mb-2">{combo.name}</h1>
              
              {/* Ratings */}
              {combo.rating && (
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < Math.floor(combo.rating) 
                            ? 'fill-amber-400 text-amber-400' 
                            : i < combo.rating 
                              ? 'fill-amber-400 text-amber-400 fill-half' 
                              : 'fill-gray-200 text-gray-200'
                        }`} 
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{combo.rating.toFixed(1)}</span>
                  </div>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{combo.reviewCount} đánh giá</span>
                </div>
              )}
              
              {/* Description */}
              <p className="text-muted-foreground mb-4">
                {combo.description}
              </p>
              
              {/* Prices & Savings */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-end gap-2 mb-2">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-lg line-through text-muted-foreground">
                    {formatPrice(originalPrice)}
                  </span>
                </div>
                
                <div className="flex items-center text-green-600 font-medium">
                  <Percent className="h-4 w-4 mr-1" />
                  <span>Tiết kiệm {formatPrice(savingAmount)} ({savingPercentage}%)</span>
                </div>
              </div>
              
              {/* Compatible With */}
              {combo.compatibleWith && combo.compatibleWith.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Tương thích với:</p>
                  <div className="flex flex-wrap gap-1">
                    {combo.compatibleWith.map((device: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-gray-100">
                        {device}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Wholesale Info */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <p className="font-medium">Giá sỉ (tối thiểu {combo.minWholesaleQuantity} bộ)</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {combo.wholesaleTiers.map((tier: any, index: number) => (
                    <div key={index} className="flex justify-between items-center rounded-md border px-2 py-1 text-sm">
                      <span>{tier.minQuantity}{tier.maxQuantity ? `-${tier.maxQuantity}` : '+'} bộ:</span>
                      <span className="font-medium text-primary">{formatPrice(tier.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Benefits */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-5 w-5 text-primary" />
                  <p className="font-medium">Lợi ích khi mua combo</p>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Tiết kiệm đến {savingPercentage}% so với mua lẻ từng sản phẩm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Đảm bảo tương thích hoàn hảo giữa các phụ kiện</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Ưu đãi đặc biệt khi mua số lượng lớn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Giao hàng miễn phí cho đơn hàng trên 1 triệu đồng</span>
                  </li>
                </ul>
              </div>
              
              {/* Call to action */}
              <div>
                <ZaloContact productName={combo.name} productUrl={window.location.href} />
              </div>
            </div>
          </div>
          
          {/* Combo Details Tabs */}
          <div className="mt-10">
            <Tabs defaultValue="products">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="products" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>Sản phẩm trong combo</span>
                </TabsTrigger>
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Chính sách đại lý</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Đánh giá</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Danh sách sản phẩm trong combo</h3>
                  <Link 
                    to="/create-combo" 
                    className="text-primary text-sm font-medium flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Tạo combo tùy chỉnh
                  </Link>
                </div>
                
                <div className="space-y-3 mb-4">
                  {comboProducts.map((product, index) => (
                    <ComboProductItem 
                      key={index}
                      product={product}
                      quantity={product.quantity}
                      isRemovable={product.isRemovable}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <div className="text-sm text-muted-foreground">Tổng giá nếu mua lẻ:</div>
                    <div className="text-lg line-through text-muted-foreground">{formatPrice(originalPrice)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Giá combo:</div>
                    <div className="text-xl font-bold text-primary">{formatPrice(discountedPrice)}</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <h3 className="text-lg font-medium mb-4">Chính sách đại lý</h3>
                
                <div className="prose max-w-none">
                  <p>
                    Chúng tôi cung cấp các ưu đãi đặc biệt cho đại lý khi mua các combo sản phẩm với số lượng lớn.
                  </p>
                  
                  <h4>Điều kiện trở thành đại lý:</h4>
                  <ul>
                    <li>Đặt hàng tối thiểu 20 combo/tháng</li>
                    <li>Ký hợp đồng đại lý với thời hạn tối thiểu 6 tháng</li>
                    <li>Đặt cọc theo quy định của công ty</li>
                  </ul>
                  
                  <h4>Quyền lợi đại lý:</h4>
                  <ul>
                    <li>Hưởng chiết khấu cao hơn so với mua lẻ</li>
                    <li>Được hỗ trợ marketing và quảng cáo sản phẩm</li>
                    <li>Được ưu tiên nhận hàng mới</li>
                    <li>Có nhân viên hỗ trợ riêng</li>
                    <li>Chính sách đổi trả linh hoạt</li>
                  </ul>
                  
                  <p>
                    Để biết thêm chi tiết về chính sách đại lý và đăng ký trở thành đại lý, vui lòng liên hệ với chúng 
                    tôi qua Zalo hoặc hotline: 1900.1234.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <h3 className="text-lg font-medium mb-4">Đánh giá từ khách hàng</h3>
                
                {comboReviews.length > 0 ? (
                  <div className="space-y-4">
                    {comboReviews.map((review) => (
                      <div key={review.id} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                            <img 
                              src={review.avatar}
                              alt={review.customerName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{review.customerName}</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                          <div className="ml-auto flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < review.rating 
                                    ? 'fill-amber-400 text-amber-400' 
                                    : 'fill-gray-200 text-gray-200'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{review.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Chưa có đánh giá nào cho combo này</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Combos */}
          {relatedCombos.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">Combo tương tự</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedCombos.map((combo, index) => (
                  <ComboCard key={combo.id} combo={combo} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComboDetail;
