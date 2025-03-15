
import { useState, useEffect } from 'react';
import { Package, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ComboCard from '@/components/combo/ComboCard';
import { Button } from "@/components/ui/button";
import { 
  productCombos, 
  getAllPhoneTypes, 
  getCombosByPhoneType 
} from '@/lib/combo-data';

const Combos = () => {
  const [selectedPhoneType, setSelectedPhoneType] = useState('all');
  const [filteredCombos, setFilteredCombos] = useState(productCombos);
  const phoneTypes = ['all', ...getAllPhoneTypes()];

  useEffect(() => {
    setFilteredCombos(getCombosByPhoneType(selectedPhoneType));
  }, [selectedPhoneType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white pt-16">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-6 w-6" />
              <h1 className="text-3xl md:text-4xl font-bold">Combo phụ kiện</h1>
            </div>
            <p className="text-lg md:text-xl mb-6">
              Tiết kiệm hơn khi mua sỉ với các bộ phụ kiện được thiết kế đặc biệt cho từng dòng điện thoại
            </p>
            <ul className="text-white/90 space-y-2 mb-8">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-yellow-300" />
                <span>Tiết kiệm đến 20% so với mua lẻ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-yellow-300" />
                <span>Đảm bảo tương thích hoàn hảo giữa các phụ kiện</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-yellow-300" />
                <span>Ưu đãi đặc biệt cho đại lý khi mua số lượng lớn</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gray-50 clip-slant" />
      </section>

      {/* Combos Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Lọc theo dòng điện thoại</h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {phoneTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedPhoneType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPhoneType(type)}
                  className="capitalize"
                >
                  {type === 'all' ? 'Tất cả' : type}
                </Button>
              ))}
            </div>
          </div>
          
          {filteredCombos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCombos.map((combo, index) => (
                <ComboCard key={combo.id} combo={combo} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Không tìm thấy combo phù hợp</h3>
              <p className="text-muted-foreground mb-6">
                Không có combo nào khớp với bộ lọc hiện tại. Vui lòng thử lại với điều kiện khác.
              </p>
              <Button onClick={() => setSelectedPhoneType('all')}>
                Xem tất cả combo
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Custom Combo Section */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Tạo combo tùy chỉnh</h2>
                <p className="text-muted-foreground mb-6">
                  Bạn có thể tự tạo bộ phụ kiện theo nhu cầu riêng và vẫn được hưởng ưu đãi khi mua sỉ. 
                  Hãy chọn các sản phẩm phù hợp và nhận báo giá ngay!
                </p>
                <Link 
                  to="/create-combo" 
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Tạo combo ngay
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1000" 
                  alt="Tạo combo tùy chỉnh" 
                  className="rounded-lg object-cover shadow-md w-full h-48 md:h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />

      <style>
        {`
          .clip-slant {
            clip-path: polygon(0 0, 100% 100%, 100% 100%, 0% 100%);
          }
          
          @keyframes Check {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          li {
            animation: Check 0.5s forwards;
            opacity: 0;
          }
          
          li:nth-child(1) { animation-delay: 0.1s; }
          li:nth-child(2) { animation-delay: 0.2s; }
          li:nth-child(3) { animation-delay: 0.3s; }
        `}
      </style>
    </div>
  );
};

export default Combos;
