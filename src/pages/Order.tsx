
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import OrderForm from '@/components/order/OrderForm';
import OrderSummary from '@/components/order/OrderSummary';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const Order = () => {
  const [formData, setFormData] = useState<any>(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setShowSummary(true);
  };

  const handleEditOrder = () => {
    setShowSummary(false);
  };

  const handleConfirmOrder = () => {
    // Trong tương lai có thể thêm code gửi đơn hàng thực tế tại đây
    // Reset form và hiển thị thông báo thành công
    setFormData(null);
    setShowSummary(false);
  };

  return (
    <>
      <Helmet>
        <title>Đặt hàng nhanh | Phụ kiện điện thoại</title>
        <meta name="description" content="Đặt hàng nhanh chóng các sản phẩm phụ kiện điện thoại với giá sỉ tốt nhất." />
      </Helmet>
      <Navbar />
      <div className="container mx-auto mt-8 mb-20 px-4 md:px-6">
        <h1 className="text-3xl font-bold text-center mb-8">Đặt hàng nhanh</h1>
        <div className="max-w-4xl mx-auto">
          {showSummary ? (
            <OrderSummary 
              formData={formData} 
              onEdit={handleEditOrder} 
              onConfirm={handleConfirmOrder}
            />
          ) : (
            <OrderForm onSubmit={handleFormSubmit} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;
