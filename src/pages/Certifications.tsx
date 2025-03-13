
import { useState } from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { brands } from '@/lib/data';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  certificateUrl?: string;
}

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  logo: string;
}

// Mock data for partners and certifications
const partners: Partner[] = [
  {
    id: 1,
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1570958231635-83245c163667?q=80&w=500",
    description: "Đại lý ủy quyền chính thức của Apple tại Việt Nam",
    certificateUrl: "#certificate-apple",
  },
  {
    id: 2,
    name: "Samsung",
    logo: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=500",
    description: "Đối tác phân phối phụ kiện chính hãng Samsung",
    certificateUrl: "#certificate-samsung",
  },
  {
    id: 3,
    name: "Xiaomi",
    logo: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=500",
    description: "Nhà phân phối chính thức sản phẩm Xiaomi",
    certificateUrl: "#certificate-xiaomi",
  },
  {
    id: 4,
    name: "Anker",
    logo: "https://images.unsplash.com/photo-1678533994012-5d94251fedc6?q=80&w=500",
    description: "Đại lý phân phối sản phẩm Anker tại Việt Nam",
    certificateUrl: "#certificate-anker",
  },
  {
    id: 5,
    name: "Baseus",
    logo: "https://images.unsplash.com/photo-1661347334252-d16b016caabb?q=80&w=500",
    description: "Đối tác chính thức của Baseus tại thị trường Việt Nam",
    certificateUrl: "#certificate-baseus",
  },
  {
    id: 6,
    name: "JBL",
    logo: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=500",
    description: "Đại lý phân phối sản phẩm âm thanh JBL chính hãng",
    certificateUrl: "#certificate-jbl",
  },
];

// Mock testimonials
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "TechAccessories là đối tác phân phối xuất sắc, mang đến sự tin cậy và chất lượng dịch vụ hàng đầu cho khách hàng.",
    author: "Nguyễn Văn A",
    position: "Giám đốc kinh doanh",
    company: "Apple Vietnam",
    logo: "https://images.unsplash.com/photo-1570958231635-83245c163667?q=80&w=200",
  },
  {
    id: 2,
    quote: "Chúng tôi đánh giá cao cam kết về chất lượng sản phẩm và dịch vụ khách hàng mà TechAccessories mang lại.",
    author: "Trần Thị B",
    position: "Giám đốc phát triển",
    company: "Samsung Electronics",
    logo: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=200",
  },
  {
    id: 3,
    quote: "Với hơn 5 năm hợp tác, TechAccessories đã chứng minh được vị thế là đối tác đáng tin cậy trong việc phân phối phụ kiện công nghệ.",
    author: "Lê Văn C",
    position: "Trưởng phòng đối tác",
    company: "Xiaomi Vietnam",
    logo: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=200",
  },
];

const Certifications = () => {
  const [activeTab, setActiveTab] = useState<'partners' | 'testimonials'>('partners');

  return (
    <div className="container mx-auto px-4 py-24 mt-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Chứng nhận & Đối tác</h1>
        <p className="text-center text-muted-foreground mb-8 md:text-lg">
          Chúng tôi tự hào là đối tác chính thức của các thương hiệu công nghệ hàng đầu,
          cam kết mang đến sản phẩm chính hãng với chất lượng cao nhất.
        </p>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-5 py-2.5 text-sm font-medium rounded-l-lg ${
                activeTab === 'partners'
                  ? 'text-white bg-primary hover:bg-primary/90'
                  : 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('partners')}
            >
              Đối tác & Chứng nhận
            </button>
            <button
              type="button"
              className={`px-5 py-2.5 text-sm font-medium rounded-r-lg ${
                activeTab === 'testimonials'
                  ? 'text-white bg-primary hover:bg-primary/90'
                  : 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('testimonials')}
            >
              Lời chứng thực
            </button>
          </div>
        </div>

        {activeTab === 'partners' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {partners.map((partner) => (
                <Card key={partner.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-6">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">{partner.name}</h3>
                      <p className="text-muted-foreground mt-2">{partner.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={partner.certificateUrl}>
                        Xem chứng nhận
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-8 mb-16">
              <h2 className="text-2xl font-semibold text-center mb-6">Cam kết của chúng tôi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sản phẩm chính hãng 100%</h3>
                    <p className="text-muted-foreground text-sm">Tất cả sản phẩm được nhập khẩu trực tiếp từ nhà sản xuất hoặc nhà phân phối chính thức.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Bảo hành chính hãng</h3>
                    <p className="text-muted-foreground text-sm">Sản phẩm được bảo hành theo chính sách của nhà sản xuất và có hóa đơn chứng minh nguồn gốc.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Kiểm định chất lượng</h3>
                    <p className="text-muted-foreground text-sm">Mỗi sản phẩm đều được kiểm tra kỹ lưỡng trước khi đến tay khách hàng.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Giá trị thương hiệu</h3>
                    <p className="text-muted-foreground text-sm">Chúng tôi là đối tác tin cậy, được các thương hiệu lớn công nhận và cấp chứng nhận.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6">Thương hiệu hợp tác</h2>
              <div className="flex flex-wrap justify-center gap-8 items-center mb-10">
                {brands.map((brand) => (
                  <div key={brand.id} className="w-24 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                    <span className="text-xl font-bold text-gray-500 hover:text-primary transition-colors">{brand.name}</span>
                  </div>
                ))}
              </div>
              <Separator className="mb-10" />
              <div>
                <p className="text-muted-foreground mb-6">
                  Muốn biết thêm thông tin về chứng nhận đại lý và hợp tác kinh doanh?
                </p>
                <Button>
                  Tìm hiểu thêm
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.logo} 
                    alt={testimonial.company} 
                    className="w-12 h-12 object-contain rounded-full" 
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.author}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
                <blockquote className="text-lg italic border-l-4 border-primary pl-4 py-1">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
            
            <div className="bg-gray-50 rounded-lg p-8 text-center mt-12">
              <h2 className="text-2xl font-semibold mb-4">Trở thành đối tác của chúng tôi</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Chúng tôi luôn tìm kiếm cơ hội hợp tác với các thương hiệu và nhà phân phối uy tín để mở rộng danh mục sản phẩm chính hãng.
              </p>
              <Button>
                Liên hệ hợp tác
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;
