
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import { storeInfo } from '@/lib/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Store Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">{storeInfo.name}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{storeInfo.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary shrink-0" />
                <a href={`tel:${storeInfo.phone.replace(/\D/g, '')}`} className="text-sm hover:text-primary transition-colors">
                  {storeInfo.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary shrink-0" />
                <a href={`mailto:${storeInfo.email}`} className="text-sm hover:text-primary transition-colors">
                  {storeInfo.email}
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span className="text-sm">{storeInfo.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-primary transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products/op-lung" className="text-sm hover:text-primary transition-colors">
                  Ốp lưng
                </Link>
              </li>
              <li>
                <Link to="/products/tai-nghe" className="text-sm hover:text-primary transition-colors">
                  Tai nghe
                </Link>
              </li>
              <li>
                <Link to="/products/sac-du-phong" className="text-sm hover:text-primary transition-colors">
                  Sạc dự phòng
                </Link>
              </li>
              <li>
                <Link to="/products/cap-sac" className="text-sm hover:text-primary transition-colors">
                  Cáp sạc
                </Link>
              </li>
              <li>
                <Link to="/products/mieng-dan-cuong-luc" className="text-sm hover:text-primary transition-colors">
                  Miếng dán cường lực
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Đăng ký nhận tin</h3>
            <p className="text-sm mb-4">Nhận thông tin về sản phẩm mới và khuyến mãi</p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-4 py-2 text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 text-sm font-medium rounded-r-md hover:bg-primary/90 transition-colors"
                >
                  Đăng ký
                </button>
              </div>
            </form>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href={storeInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={storeInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={storeInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-sm">
            © {currentYear} {storeInfo.name}. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
