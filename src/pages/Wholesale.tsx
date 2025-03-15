
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Users, ShieldCheck, Truck, Receipt, HelpCircle, ArrowRight, 
  BadgeCheck, Handshake, MessageSquare, TrendingUp, FileText,
  Package, Mail, List, Coins
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WholesaleRegistrationForm from '@/components/wholesale/WholesaleRegistrationForm';
import WholesaleProfitCalculator from '@/components/wholesale/WholesaleProfitCalculator';
import WholesaleProcessDiagram from '@/components/wholesale/WholesaleProcessDiagram';
import WholesalePricingTable from '@/components/wholesale/WholesalePricingTable';
import { storeInfo } from '@/lib/data';

const Wholesale = () => {
  const [activeTab, setActiveTab] = useState("conditions");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Chính sách bán sỉ | {storeInfo.name}</title>
        <meta name="description" content="Tìm hiểu về chính sách bán sỉ và hợp tác đại lý của chúng tôi. Cung cấp các mức giá ưu đãi cho đại lý và khách hàng mua số lượng lớn." />
      </Helmet>
      
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-800 to-indigo-900 pt-24 pb-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Chính sách bán sỉ</h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Trở thành đối tác của chúng tôi và tận hưởng những ưu đãi đặc biệt 
              cùng lợi nhuận hấp dẫn khi bán phụ kiện điện thoại chính hãng
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-white/90">
                <a href="#register">Đăng ký làm đại lý</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <a href="#pricing">Xem bảng giá sỉ</a>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-3 rounded-full mb-3">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <p className="font-medium">100% Hàng chính hãng</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-3 rounded-full mb-3">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <p className="font-medium">Lợi nhuận hấp dẫn</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-3 rounded-full mb-3">
                  <Truck className="h-6 w-6" />
                </div>
                <p className="font-medium">Vận chuyển toàn quốc</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-3 rounded-full mb-3">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className="font-medium">Bảo hành dài hạn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <Tabs 
            defaultValue="conditions" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="overflow-x-auto">
              <TabsList className="h-14 bg-transparent w-full justify-start px-0 py-0 gap-3">
                <TabsTrigger value="conditions" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <List className="mr-2 h-4 w-4" />
                  Điều kiện
                </TabsTrigger>
                <TabsTrigger value="pricing" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <Coins className="mr-2 h-4 w-4" />
                  Bảng giá sỉ
                </TabsTrigger>
                <TabsTrigger value="process" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Quy trình
                </TabsTrigger>
                <TabsTrigger value="payment" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <Receipt className="mr-2 h-4 w-4" />
                  Thanh toán
                </TabsTrigger>
                <TabsTrigger value="shipping" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <Truck className="mr-2 h-4 w-4" />
                  Vận chuyển
                </TabsTrigger>
                <TabsTrigger value="warranty" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Đổi trả & Bảo hành
                </TabsTrigger>
                <TabsTrigger value="faq" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  FAQ
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Conditions Section */}
            <TabsContent value="conditions" className="py-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <List className="mr-3 h-6 w-6 text-primary" />
                  Điều kiện trở thành đại lý
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="mr-2 h-5 w-5 text-primary" />
                        Đại lý cấp 1
                      </CardTitle>
                      <CardDescription>Dành cho đối tác có mức mua hàng lớn</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                          <span>Doanh số tối thiểu: 50 triệu đồng/tháng</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                          <span>Có cửa hàng/showroom hoặc website bán hàng</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                          <span>Cam kết duy trì hợp tác tối thiểu 6 tháng</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                          <span>Đặt cọc 10 triệu đồng (hoàn lại sau 3 tháng)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="mr-2 h-5 w-5 text-primary" />
                        Đại lý cấp 2
                      </CardTitle>
                      <CardDescription>Dành cho đối tác mới bắt đầu</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                          <span>Doanh số tối thiểu: 20 triệu đồng/tháng</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                          <span>Có kênh bán hàng online hoặc offline</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                          <span>Cam kết duy trì hợp tác tối thiểu 3 tháng</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                          <span>Đặt cọc 5 triệu đồng (hoàn lại sau 2 tháng)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-xl font-bold mb-4">Lợi ích khi trở thành đại lý</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-full h-fit">
                      <Coins className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Chiết khấu hấp dẫn</h4>
                      <p className="text-sm text-gray-600">Mức chiết khấu lên đến 25% so với giá bán lẻ</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-full h-fit">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Hỗ trợ marketing</h4>
                      <p className="text-sm text-gray-600">Cung cấp hình ảnh, video và tài liệu marketing</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-full h-fit">
                      <Handshake className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Chính sách đặc biệt</h4>
                      <p className="text-sm text-gray-600">Ưu đãi riêng cho đại lý vào các dịp lễ, Tết</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-full h-fit">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Bảo vệ khu vực</h4>
                      <p className="text-sm text-gray-600">Cam kết không mở thêm đại lý cùng cấp trong phạm vi 5km</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-full h-fit">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Vận chuyển nhanh</h4>
                      <p className="text-sm text-gray-600">Ưu tiên xử lý đơn hàng và giao hàng nhanh chóng</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-full h-fit">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Hỗ trợ phát triển</h4>
                      <p className="text-sm text-gray-600">Tư vấn chiến lược kinh doanh và phát triển thị trường</p>
                    </div>
                  </div>
                </div>
                
                <div id="register" className="bg-indigo-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-6 text-center">Đăng ký thông tin đại lý</h3>
                  <WholesaleRegistrationForm />
                </div>
              </div>
            </TabsContent>

            {/* Pricing Section */}
            <TabsContent value="pricing" className="py-10">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <Coins className="mr-3 h-6 w-6 text-primary" />
                  Bảng giá sỉ
                </h2>
                
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center text-center">
                      <Package className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-bold text-lg mb-1">Tiết kiệm tối đa</h3>
                      <p className="text-sm">Chiết khấu lên đến 25% so với giá bán lẻ khi mua số lượng lớn</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center text-center">
                      <BadgeCheck className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-bold text-lg mb-1">Cam kết chất lượng</h3>
                      <p className="text-sm">100% hàng chính hãng, mới và nguyên seal, không bán hàng tồn kho</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center text-center">
                      <Handshake className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-bold text-lg mb-1">Đặc quyền đại lý</h3>
                      <p className="text-sm">Nhiều ưu đãi độc quyền và chính sách giá đặc biệt dành cho đại lý</p>
                    </div>
                  </div>
                  
                  <div id="pricing-table">
                    <WholesalePricingTable />
                  </div>
                  
                  <div className="mt-6 text-sm text-gray-600">
                    <p>* Bảng giá trên chỉ mang tính chất tham khảo và có thể thay đổi theo thời gian</p>
                    <p>* Vui lòng liên hệ trực tiếp với nhân viên kinh doanh để có báo giá chính xác nhất</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Tính toán lợi nhuận</h3>
                  <p className="mb-6 text-gray-600">Sử dụng công cụ tính toán nhanh dưới đây để ước tính lợi nhuận của bạn khi mua sỉ các sản phẩm của chúng tôi</p>
                  
                  <WholesaleProfitCalculator />
                </div>
              </div>
            </TabsContent>

            {/* Process Section */}
            <TabsContent value="process" className="py-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <ArrowRight className="mr-3 h-6 w-6 text-primary" />
                  Quy trình hợp tác
                </h2>
                
                <WholesaleProcessDiagram />
                
                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-6">Quy trình đặt hàng từ A-Z</h3>
                  
                  <div className="relative border-l-2 border-primary/30 pl-8 pb-4">
                    <div className="mb-8 relative">
                      <div className="absolute -left-10 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">1</div>
                      <h4 className="text-lg font-bold mb-2">Liên hệ đặt hàng</h4>
                      <p className="text-gray-600 mb-2">
                        Đặt hàng qua các kênh: Hotline {storeInfo.phone}, Zalo, Email hoặc trực tiếp tại văn phòng
                      </p>
                      <p className="text-sm text-gray-500">
                        Thông tin cần cung cấp: Mã sản phẩm, số lượng, thông tin giao hàng
                      </p>
                    </div>
                    
                    <div className="mb-8 relative">
                      <div className="absolute -left-10 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">2</div>
                      <h4 className="text-lg font-bold mb-2">Xác nhận đơn hàng</h4>
                      <p className="text-gray-600 mb-2">
                        Nhân viên kinh doanh sẽ gửi báo giá và xác nhận đơn hàng, thông tin thanh toán
                      </p>
                      <p className="text-sm text-gray-500">
                        Thời gian xác nhận: Trong vòng 30 phút - 2 giờ làm việc
                      </p>
                    </div>
                    
                    <div className="mb-8 relative">
                      <div className="absolute -left-10 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">3</div>
                      <h4 className="text-lg font-bold mb-2">Thanh toán</h4>
                      <p className="text-gray-600 mb-2">
                        Đối với đại lý mới: Thanh toán 100% giá trị đơn hàng trước khi giao hàng
                      </p>
                      <p className="text-gray-600 mb-2">
                        Đối với đại lý cấp 1: Có thể thanh toán 50% trước, 50% sau khi nhận hàng (tùy điều kiện)
                      </p>
                      <p className="text-sm text-gray-500">
                        Hình thức thanh toán: Chuyển khoản ngân hàng hoặc ví điện tử
                      </p>
                    </div>
                    
                    <div className="mb-8 relative">
                      <div className="absolute -left-10 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">4</div>
                      <h4 className="text-lg font-bold mb-2">Chuẩn bị hàng & Giao hàng</h4>
                      <p className="text-gray-600 mb-2">
                        Sau khi nhận được thanh toán, đơn hàng sẽ được chuẩn bị và giao trong thời gian:
                      </p>
                      <ul className="list-disc ml-5 text-gray-600 mb-2">
                        <li>Nội thành: 1-2 ngày làm việc</li>
                        <li>Ngoại thành và các tỉnh: 2-5 ngày làm việc</li>
                      </ul>
                      <p className="text-sm text-gray-500">
                        Đơn hàng được đóng gói cẩn thận và bảo mật thông tin đại lý
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-10 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">5</div>
                      <h4 className="text-lg font-bold mb-2">Kiểm tra & Xác nhận</h4>
                      <p className="text-gray-600 mb-2">
                        Đại lý kiểm tra hàng hóa khi nhận hàng và xác nhận với nhân viên giao hàng
                      </p>
                      <p className="text-sm text-gray-500">
                        Thời gian kiểm tra: Ngay tại thời điểm nhận hàng. Nếu có vấn đề, vui lòng liên hệ ngay với bộ phận CSKH
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Chứng nhận từ đối tác</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Cửa hàng TechZone</h4>
                          <p className="text-sm text-gray-500">Đại lý cấp 1 tại TP.HCM</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic text-sm">
                        "Chúng tôi đã hợp tác hơn 2 năm và rất hài lòng với chất lượng sản phẩm cũng như chính sách bán hàng. Đội ngũ nhân viên luôn hỗ trợ nhiệt tình, đơn hàng được xử lý nhanh chóng giúp chúng tôi đáp ứng nhu cầu của khách hàng kịp thời."
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">PhonePhu Shop</h4>
                          <p className="text-sm text-gray-500">Đại lý cấp 2 tại Hà Nội</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic text-sm">
                        "Lợi nhuận khi bán các sản phẩm rất tốt, cùng với chế độ bảo hành dài hạn giúp chúng tôi dễ dàng thuyết phục khách hàng. Tỷ lệ sản phẩm lỗi rất thấp và quy trình đổi trả nhanh chóng, thuận tiện."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Payment Section */}
            <TabsContent value="payment" className="py-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <Receipt className="mr-3 h-6 w-6 text-primary" />
                  Chính sách thanh toán
                </h2>
                
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                  <h3 className="text-xl font-bold mb-4">Phương thức thanh toán</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-bold mb-2 flex items-center">
                        <Receipt className="mr-2 h-5 w-5 text-primary" /> 
                        Chuyển khoản ngân hàng
                      </h4>
                      <p className="text-gray-600 mb-4">Chuyển khoản đến tài khoản doanh nghiệp:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="border-b pb-2">
                          <span className="font-medium block">Ngân hàng Vietcombank</span>
                          <span className="text-gray-600">STK: 1234567890</span>
                          <span className="block text-gray-600">Chủ TK: CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ ABC</span>
                        </li>
                        <li className="border-b pb-2">
                          <span className="font-medium block">Ngân hàng Techcombank</span>
                          <span className="text-gray-600">STK: 0987654321</span>
                          <span className="block text-gray-600">Chủ TK: CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ ABC</span>
                        </li>
                        <li>
                          <span className="font-medium block">Ngân hàng BIDV</span>
                          <span className="text-gray-600">STK: 1122334455</span>
                          <span className="block text-gray-600">Chủ TK: CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ ABC</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-bold mb-2 flex items-center">
                        <Receipt className="mr-2 h-5 w-5 text-primary" /> 
                        Các phương thức khác
                      </h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium block">Ví điện tử MoMo</span>
                            <span className="text-gray-600">SĐT: 0901234567</span>
                            <span className="block text-gray-600">Tên: CÔNG TY TNHH ABC</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium block">Ví điện tử ZaloPay</span>
                            <span className="text-gray-600">SĐT: 0901234567</span>
                            <span className="block text-gray-600">Tên: CÔNG TY TNHH ABC</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium block">Thanh toán tiền mặt</span>
                            <span className="block text-gray-600">Áp dụng khi mua hàng trực tiếp tại kho hoặc với đại lý cấp 1 đã hợp tác lâu dài</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg text-sm">
                    <p className="font-medium mb-1">Lưu ý khi thanh toán:</p>
                    <ul className="list-disc ml-5 text-gray-600 space-y-1">
                      <li>Nội dung chuyển khoản: <span className="font-medium">[Mã đơn hàng] - [Tên đại lý]</span></li>
                      <li>Giữ lại biên lai chuyển khoản để đối chiếu nếu cần</li>
                      <li>Thông báo cho nhân viên kinh doanh sau khi đã thực hiện thanh toán</li>
                      <li>Đơn hàng chỉ được xử lý sau khi thanh toán được xác nhận</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Điều khoản thanh toán</h3>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Đối với đại lý mới</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc ml-5 text-gray-600 space-y-2">
                          <li>Thanh toán 100% giá trị đơn hàng trước khi giao hàng</li>
                          <li>Cần hoàn thành ít nhất 3 đơn hàng đúng hạn để được xem xét áp dụng chính sách công nợ</li>
                          <li>Đặt cọc theo quy định của từng cấp đại lý (hoàn lại sau thời gian quy định)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Đối với đại lý cấp 1</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc ml-5 text-gray-600 space-y-2">
                          <li>Có thể áp dụng chính sách công nợ: Thanh toán 50% trước, 50% trong vòng 7-15 ngày sau khi nhận hàng</li>
                          <li>Hạn mức công nợ tối đa: 100 triệu đồng</li>
                          <li>Thời hạn công nợ: Tối đa 15 ngày kể từ ngày nhận hàng</li>
                          <li>Cần ký hợp đồng công nợ và cam kết thanh toán đúng hạn</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Đối với đại lý cấp 2</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc ml-5 text-gray-600 space-y-2">
                          <li>Có thể áp dụng chính sách công nợ sau 3 tháng hợp tác và doanh số ổn định</li>
                          <li>Hạn mức công nợ tối đa: 30 triệu đồng</li>
                          <li>Thời hạn công nợ: Tối đa 7 ngày kể từ ngày nhận hàng</li>
                          <li>Cần ký cam kết thanh toán và duy trì doanh số tối thiểu</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Chính sách ưu đãi thanh toán</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc ml-5 text-gray-600 space-y-2">
                          <li>Giảm thêm 1% cho đơn hàng thanh toán 100% trước khi giao</li>
                          <li>Giảm thêm 2% cho đơn hàng từ 100 triệu đồng trở lên và thanh toán 100% trước khi giao</li>
                          <li>Tích điểm thưởng: 0.5% giá trị đơn hàng, có thể dùng để trừ vào các đơn hàng tiếp theo</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Chính sách phạt thanh toán trễ hạn</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc ml-5 text-gray-600 space-y-2">
                          <li>Phí phạt: 0.1% giá trị công nợ/ngày trễ hạn</li>
                          <li>Đại lý trễ hạn thanh toán quá 3 lần sẽ bị hủy chính sách công nợ</li>
                          <li>Trễ hạn thanh toán quá 30 ngày: Tạm ngừng cung cấp hàng và có thể chấm dứt hợp đồng đại lý</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </TabsContent>

            {/* Shipping Section */}
            <TabsContent value="shipping" className="py-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <Truck className="mr-3 h-6 w-6 text-primary" />
                  Chính sách vận chuyển
                </h2>
                
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                  <h3 className="text-xl font-bold mb-4">Thời gian giao hàng</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="border rounded-lg p-4 text-center">
                      <div className="bg-primary/10 p-2 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bold mb-1">Nội thành</h4>
                      <p className="text-gray-600 text-sm">1-2 ngày làm việc</p>
                    </div>
                    
                    <div className="border rounded-lg p-4 text-center">
                      <div className="bg-primary/10 p-2 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bold mb-1">Các tỉnh lân cận</h4>
                      <p className="text-gray-600 text-sm">2-3 ngày làm việc</p>
                    </div>
                    
                    <div className="border rounded-lg p-4 text-center">
                      <div className="bg-primary/10 p-2 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bold mb-1">Các tỉnh xa</h4>
                      <p className="text-gray-600 text-sm">3-5 ngày làm việc</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">Phí vận chuyển</h3>
                  
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left border">Giá trị đơn hàng</th>
                          <th className="px-4 py-2 text-left border">Nội thành</th>
                          <th className="px-4 py-2 text-left border">Các tỉnh lân cận</th>
                          <th className="px-4 py-2 text-left border">Các tỉnh xa</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border">Dưới 10 triệu</td>
                          <td className="px-4 py-2 border">30.000đ</td>
                          <td className="px-4 py-2 border">50.000đ</td>
                          <td className="px-4 py-2 border">80.000đ</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2 border">10 - 50 triệu</td>
                          <td className="px-4 py-2 border">Miễn phí</td>
                          <td className="px-4 py-2 border">30.000đ</td>
                          <td className="px-4 py-2 border">50.000đ</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Trên 50 triệu</td>
                          <td className="px-4 py-2 border">Miễn phí</td>
                          <td className="px-4 py-2 border">Miễn phí</td>
                          <td className="px-4 py-2 border">Miễn phí</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 flex items-center">
                      <BadgeCheck className="mr-2 h-5 w-5 text-primary" />
                      Ưu đãi cho đại lý cấp 1
                    </h4>
                    <p className="text-gray-600 mb-2">Miễn phí vận chuyển cho mọi đơn hàng, không phụ thuộc giá trị.</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Quy định vận chuyển</h3>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Đơn vị vận chuyển</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-2">Chúng tôi hợp tác với các đối tác vận chuyển uy tín:</p>
                        <ul className="list-disc ml-5 text-gray-600 space-y-1">
                          <li>Giao hàng nhanh (GHN)</li>
                          <li>Giao hàng tiết kiệm (GHTK)</li>
                          <li>Viettel Post</li>
                          <li>Đội ngũ giao hàng riêng (áp dụng cho nội thành và đơn hàng giá trị cao)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Quy trình giao nhận hàng</AccordionTrigger>
                      <AccordionContent>
                        <ol className="list-decimal ml-5 text-gray-600 space-y-2">
                          <li>Đại lý kiểm tra thông tin đơn hàng khi nhận hàng (số lượng, mẫu mã, tình trạng sản phẩm)</li>
                          <li>Ký xác nhận đã nhận đủ hàng với nhân viên giao hàng</li>
                          <li>Giữ lại biên bản giao nhận làm bằng chứng cho việc bảo hành/đổi trả sau này</li>
                          <li>Thông báo ngay cho bộ phận CSKH nếu phát hiện bất kỳ vấn đề gì với đơn hàng</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Quy định kiểm hàng</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc ml-5 text-gray-600 space-y-2">
                          <li>Đại lý có quyền mở kiện hàng để kiểm tra trước khi xác nhận nhận hàng</li>
                          <li>Thời gian kiểm hàng tối đa: 15 phút</li>
                          <li>Nếu phát hiện sản phẩm lỗi/không đúng mẫu mã, cần ghi chú vào biên bản giao nhận và thông báo ngay cho bộ phận CSKH</li>
                          <li>Sau khi ký nhận hàng mà không có ghi chú, mọi khiếu nại về số lượng và tình trạng bên ngoài sản phẩm sẽ không được giải quyết</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Hình thức đóng gói</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc ml-5 text-gray-600 space-y-2">
                          <li>Các sản phẩm được đóng gói cẩn thận bằng thùng carton chắc chắn</li>
                          <li>Sử dụng lớp xốp chống sốc cho các thiết bị điện tử</li>
                          <li>Niêm phong bằng băng keo có logo công ty</li>
                          <li>Đại lý có thể yêu cầu hình thức đóng gói đặc biệt (có tính phí) nếu có nhu cầu</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Trường hợp bất khả kháng</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-2">Thời gian giao hàng có thể bị ảnh hưởng trong các trường hợp:</p>
                        <ul className="list-disc ml-5 text-gray-600 space-y-1">
                          <li>Thiên tai, lũ lụt, dịch bệnh</li>
                          <li>Sự cố giao thông nghiêm trọng</li>
                          <li>Các vấn đề phát sinh từ đơn vị vận chuyển</li>
                        </ul>
                        <p className="text-gray-600 mt-2">Trong những trường hợp này, chúng tôi sẽ thông báo cho đại lý và phối hợp để tìm phương án giải quyết tốt nhất.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </TabsContent>

            {/* Warranty Section */}
            <TabsContent value="warranty" className="py-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <ShieldCheck className="mr-3 h-6 w-6 text-primary" />
                  Chính sách đổi trả & bảo hành
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <BadgeCheck className="mr-2 h-5 w-5 text-primary" />
                      Chính sách đổi trả
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="border-b pb-3">
                        <h4 className="font-medium mb-2">Điều kiện đổi trả</h4>
                        <ul className="list-disc ml-5 text-gray-600 space-y-1 text-sm">
                          <li>Sản phẩm còn nguyên vẹn, không có dấu hiệu sử dụng</li>
                          <li>Đầy đủ bao bì, phụ kiện đi kèm</li>
                          <li>Có hóa đơn/phiếu xuất kho và biên bản giao nhận</li>
                          <li>Thời gian đổi trả: Trong vòng 7 ngày kể từ ngày nhận hàng</li>
                        </ul>
                      </div>
                      
                      <div className="border-b pb-3">
                        <h4 className="font-medium mb-2">Lý do đổi trả được chấp nhận</h4>
                        <ul className="list-disc ml-5 text-gray-600 space-y-1 text-sm">
                          <li>Sản phẩm bị lỗi kỹ thuật từ nhà sản xuất</li>
                          <li>Sản phẩm không đúng mẫu mã, thông số kỹ thuật như đã đặt</li>
                          <li>Sản phẩm giao không đủ số lượng, không đúng phụ kiện</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Quy trình đổi trả</h4>
                        <ol className="list-decimal ml-5 text-gray-600 space-y-1 text-sm">
                          <li>Liên hệ với nhân viên kinh doanh phụ trách hoặc hotline CSKH</li>
                          <li>Cung cấp thông tin về đơn hàng và lý do đổi trả</li>
                          <li>Nhận mã đổi trả và hướng dẫn đóng gói sản phẩm</li>
                          <li>Gửi sản phẩm về kho theo hướng dẫn</li>
                          <li>Nhận sản phẩm thay thế hoặc hoàn tiền trong vòng 3-5 ngày làm việc</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <ShieldCheck className="mr-2 h-5 w-5 text-primary" />
                      Chính sách bảo hành
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="border-b pb-3">
                        <h4 className="font-medium mb-2">Thời hạn bảo hành</h4>
                        <ul className="list-disc ml-5 text-gray-600 space-y-1 text-sm">
                          <li>Phụ kiện điện tử (sạc, cáp, tai nghe): 12 tháng</li>
                          <li>Ốp lưng, kính cường lực: 1 tháng đối với lỗi sản xuất</li>
                          <li>Pin dự phòng, loa bluetooth: 12 tháng</li>
                          <li>Các sản phẩm khác: Theo chính sách của nhà sản xuất</li>
                        </ul>
                      </div>
                      
                      <div className="border-b pb-3">
                        <h4 className="font-medium mb-2">Điều kiện bảo hành</h4>
                        <ul className="list-disc ml-5 text-gray-600 space-y-1 text-sm">
                          <li>Sản phẩm trong thời hạn bảo hành (tính từ ngày xuất kho)</li>
                          <li>Tem bảo hành còn nguyên vẹn</li>
                          <li>Lỗi được xác định là do nhà sản xuất, không do người sử dụng</li>
                          <li>Không áp dụng cho sản phẩm bị va đập, vô nước, cháy nổ</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Quy trình bảo hành</h4>
                        <ol className="list-decimal ml-5 text-gray-600 space-y-1 text-sm">
                          <li>Đại lý tập hợp các sản phẩm lỗi cần bảo hành</li>
                          <li>Lập danh sách chi tiết và gửi cho nhân viên kinh doanh</li>
                          <li>Nhận mã bảo hành và hướng dẫn gửi sản phẩm</li>
                          <li>Thời gian xử lý bảo hành: 7-15 ngày làm việc</li>
                          <li>Nhận lại sản phẩm đã được bảo hành hoặc sản phẩm thay thế</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Những câu hỏi thường gặp</h3>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Đại lý có được hưởng chính sách bảo hành đặc biệt không?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Có, đại lý cấp 1 và cấp 2 được hưởng chính sách bảo hành ưu tiên với thời gian xử lý nhanh hơn (3-5 ngày làm việc). Ngoài ra, đại lý cấp 1 được hỗ trợ 1-1 cho các sản phẩm lỗi trong 3 tháng đầu tiên kể từ ngày xuất kho.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Làm thế nào để kiểm tra tình trạng bảo hành?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Đại lý có thể kiểm tra tình trạng bảo hành bằng cách liên hệ trực tiếp với nhân viên kinh doanh phụ trách hoặc gọi đến hotline CSKH. Cung cấp mã bảo hành hoặc mã đơn hàng để được kiểm tra nhanh chóng.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Khách hàng cuối có được hưởng chính sách bảo hành không?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Có, khách hàng cuối vẫn được hưởng đầy đủ chính sách bảo hành của sản phẩm. Đại lý có thể chuyển sản phẩm lỗi từ khách hàng cuối về cho chúng tôi để được bảo hành theo quy trình. Chúng tôi khuyến khích đại lý xây dựng chính sách bảo hành riêng cho khách hàng của mình dựa trên chính sách của chúng tôi.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Có được đổi sang sản phẩm khác khi bảo hành không?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Trong trường hợp không thể sửa chữa được sản phẩm lỗi và không có sản phẩm thay thế cùng loại, đại lý có thể yêu cầu đổi sang sản phẩm khác có giá trị tương đương. Nếu sản phẩm mới có giá trị cao hơn, đại lý sẽ cần thanh toán phần chênh lệch.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Làm thế nào để được hoàn tiền khi sản phẩm lỗi?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Hoàn tiền chỉ áp dụng trong trường hợp sản phẩm bị lỗi nghiêm trọng từ nhà sản xuất trong vòng 7 ngày kể từ ngày nhận hàng và không có sản phẩm thay thế. Đại lý cần gửi yêu cầu hoàn tiền cùng với sản phẩm lỗi và đầy đủ giấy tờ liên quan. Thời gian hoàn tiền là 3-5 ngày làm việc sau khi yêu cầu được chấp nhận.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </TabsContent>

            {/* FAQ Section */}
            <TabsContent value="faq" className="py-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <HelpCircle className="mr-3 h-6 w-6 text-primary" />
                  Câu hỏi thường gặp
                </h2>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Làm thế nào để đăng ký trở thành đại lý?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-3">
                          Để đăng ký trở thành đại lý, bạn có thể thực hiện theo các cách sau:
                        </p>
                        <ol className="list-decimal ml-5 text-gray-600 space-y-2">
                          <li>Điền form đăng ký trên website tại mục "Đăng ký làm đại lý"</li>
                          <li>Liên hệ trực tiếp qua hotline: {storeInfo.phone}</li>
                          <li>Gửi email đến địa chỉ: daily@example.com với tiêu đề "Đăng ký làm đại lý"</li>
                          <li>Đến trực tiếp văn phòng của chúng tôi tại địa chỉ: {storeInfo.address}</li>
                        </ol>
                        <p className="text-gray-600 mt-3">
                          Sau khi nhận được thông tin, đội ngũ kinh doanh sẽ liên hệ với bạn trong vòng 24 giờ để tư vấn chi tiết.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Tôi có thể đặt hàng với số lượng nhỏ để thử nghiệm không?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Có, chúng tôi có chính sách cho phép đại lý mới đặt hàng với số lượng nhỏ để thử nghiệm. Tuy nhiên, giá sỉ sẽ được áp dụng theo từng mức số lượng cụ thể. Đối với đơn hàng thử nghiệm dưới mức tối thiểu, giá bán sẽ áp dụng theo mức chiết khấu 5-10% so với giá bán lẻ. Bạn có thể liên hệ với nhân viên kinh doanh để được tư vấn gói sản phẩm thử nghiệm phù hợp với nhu cầu và ngân sách.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Làm thế nào để được hỗ trợ marketing cho cửa hàng?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-3">
                          Chúng tôi cung cấp nhiều hình thức hỗ trợ marketing cho đại lý, bao gồm:
                        </p>
                        <ul className="list-disc ml-5 text-gray-600 space-y-2">
                          <li>Tài liệu marketing: Hình ảnh sản phẩm chất lượng cao, banner, poster, video giới thiệu</li>
                          <li>Tư vấn trưng bày: Hướng dẫn cách trưng bày sản phẩm hiệu quả tại cửa hàng</li>
                          <li>Content marketing: Nội dung mô tả sản phẩm, bài viết so sánh, hướng dẫn sử dụng</li>
                          <li>Đào tạo: Tập huấn về kiến thức sản phẩm, kỹ năng tư vấn và bán hàng</li>
                          <li>Chương trình khuyến mãi: Tham gia các chương trình khuyến mãi độc quyền dành cho đại lý</li>
                        </ul>
                        <p className="text-gray-600 mt-3">
                          Đại lý cấp 1 sẽ được hỗ trợ thêm các vật phẩm quảng cáo như standee, biển hiệu, đồng phục nhân viên và được đào tạo chuyên sâu về sản phẩm.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Giá sỉ có thay đổi không và cập nhật như thế nào?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Giá sỉ có thể thay đổi theo biến động của thị trường và giá từ nhà sản xuất. Chúng tôi cam kết thông báo trước cho đại lý ít nhất 7 ngày nếu có sự thay đổi về giá. Bảng giá sỉ được cập nhật hàng tháng và gửi tới đại lý qua email. Đại lý cũng có thể truy cập vào hệ thống quản lý đại lý trực tuyến để xem bảng giá mới nhất. Đối với các đơn hàng đã xác nhận, giá sẽ được giữ nguyên theo báo giá ban đầu, ngay cả khi có thay đổi giá trong thời gian giao hàng.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Có chính sách bảo vệ khu vực cho đại lý không?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-3">
                          Có, chúng tôi có chính sách bảo vệ khu vực dành cho các đại lý:
                        </p>
                        <ul className="list-disc ml-5 text-gray-600 space-y-2">
                          <li>Đại lý cấp 1: Được bảo vệ trong phạm vi 5km, không mở thêm đại lý cấp 1 khác trong khu vực này</li>
                          <li>Đại lý cấp 2: Được bảo vệ trong phạm vi 2km, không mở thêm đại lý cấp 2 khác trong khu vực này</li>
                        </ul>
                        <p className="text-gray-600 mt-3">
                          Chính sách này chỉ áp dụng khi đại lý duy trì đủ doanh số tối thiểu và thực hiện đúng các điều khoản hợp tác. Trong trường hợp đại lý không đạt doanh số trong 2 tháng liên tiếp, chúng tôi có quyền xem xét lại chính sách bảo vệ khu vực.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-6">
                      <AccordionTrigger>Làm thế nào để biết sản phẩm nào đang bán chạy nhất?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Chúng tôi cung cấp báo cáo thị trường hàng tháng cho đại lý, bao gồm thông tin về các sản phẩm bán chạy nhất, xu hướng thị trường và các sản phẩm mới sắp ra mắt. Đại lý cấp 1 còn được cung cấp thêm dữ liệu phân tích sâu hơn về hành vi mua hàng và xu hướng tiêu dùng. Ngoài ra, nhân viên kinh doanh phụ trách sẽ thường xuyên cập nhật và tư vấn cho đại lý về các sản phẩm nên tập trung kinh doanh theo từng thời điểm và mùa vụ.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-7">
                      <AccordionTrigger>Tôi có thể mua hàng online hay phải đến kho?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Đại lý có thể đặt hàng qua nhiều kênh khác nhau, bao gồm cả hình thức online và offline. Chúng tôi cung cấp hệ thống đặt hàng trực tuyến dành riêng cho đại lý, nơi bạn có thể xem danh sách sản phẩm, kiểm tra tồn kho và đặt hàng 24/7. Ngoài ra, bạn cũng có thể đặt hàng qua Zalo, email hoặc gọi điện trực tiếp cho nhân viên kinh doanh phụ trách. Đối với các đại lý ở gần kho hàng, bạn cũng có thể đến trực tiếp để xem sản phẩm và đặt hàng.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-8">
                      <AccordionTrigger>Có được hỗ trợ cách lắp đặt và tư vấn kỹ thuật không?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Có, chúng tôi cung cấp đầy đủ tài liệu hướng dẫn sử dụng, lắp đặt và tư vấn kỹ thuật cho tất cả các sản phẩm. Đại lý sẽ được tham gia các buổi tập huấn về sản phẩm mới và kỹ thuật. Ngoài ra, chúng tôi còn có đội ngũ hỗ trợ kỹ thuật qua điện thoại và email để giải đáp các thắc mắc. Đối với các sản phẩm cao cấp hoặc phức tạp, chúng tôi có thể cử nhân viên kỹ thuật đến hỗ trợ trực tiếp cho đại lý (áp dụng cho đại lý cấp 1 và các đơn hàng giá trị cao).
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                <div className="mt-10 bg-blue-50 p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Vẫn còn thắc mắc?</h3>
                    <p className="text-gray-600 mb-4">
                      Liên hệ ngay với đội ngũ hỗ trợ đại lý của chúng tôi để được giải đáp mọi thắc mắc.
                    </p>
                  </div>
                  <Button size="lg" className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Liên hệ tư vấn
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <div className="pt-10 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Đối tác kinh doanh</h2>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-70">
            <img src="https://images.unsplash.com/photo-1611930022073-84a47d8aedad?q=80&w=200" alt="Partner 1" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="https://images.unsplash.com/photo-1511200016789-e7b694d91f81?q=80&w=200" alt="Partner 2" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?q=80&w=200" alt="Partner 3" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=200" alt="Partner 4" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="https://images.unsplash.com/photo-1583395838114-c69da7803342?q=80&w=200" alt="Partner 5" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wholesale;
