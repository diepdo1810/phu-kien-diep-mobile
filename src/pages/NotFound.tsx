
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 pt-16">
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">Không tìm thấy trang</p>
          <p className="text-gray-500 mb-8">Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.</p>
          <a href="/" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Quay về trang chủ
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
