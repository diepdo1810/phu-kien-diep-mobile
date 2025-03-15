
import { ArrowRight, FileText, Package, CreditCard, Truck, CheckCircle, PhoneCall } from "lucide-react";

const WholesaleProcessDiagram = () => {
  const steps = [
    {
      icon: <PhoneCall className="h-6 w-6 text-white" />,
      title: "Liên hệ tư vấn",
      description: "Đại lý liên hệ qua hotline hoặc form đăng ký để được tư vấn chi tiết về chính sách bán sỉ"
    },
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: "Ký hợp đồng",
      description: "Tiến hành ký hợp đồng đại lý, thỏa thuận về điều khoản hợp tác và chính sách bán hàng"
    },
    {
      icon: <Package className="h-6 w-6 text-white" />,
      title: "Đặt hàng",
      description: "Đại lý tiến hành đặt hàng qua các kênh như email, hotline hoặc trực tiếp qua nhân viên kinh doanh"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-white" />,
      title: "Thanh toán",
      description: "Xác nhận đơn hàng và thực hiện thanh toán theo phương thức đã thỏa thuận trong hợp đồng"
    },
    {
      icon: <Truck className="h-6 w-6 text-white" />,
      title: "Vận chuyển",
      description: "Đơn hàng được chuẩn bị và giao đến địa chỉ đại lý trong thời gian cam kết"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: "Xác nhận & Feedback",
      description: "Đại lý kiểm tra và xác nhận đơn hàng, cung cấp phản hồi để cải thiện chất lượng dịch vụ"
    }
  ];

  return (
    <div className="py-6">
      <div className="relative">
        {/* Desktop Process Diagram */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg shadow-sm p-5 h-full">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <h4 className="font-bold mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Process Diagram */}
        <div className="md:hidden">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative pl-14 pb-8">
                <div className="absolute left-0 top-0">
                  <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-12 left-1/2 h-12 border-l-2 border-dashed border-primary transform -translate-x-1/2"></div>
                  )}
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h4 className="font-bold mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholesaleProcessDiagram;
