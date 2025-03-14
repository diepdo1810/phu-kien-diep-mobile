
import { Check, ChevronLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/product-utils';
import { shippingMethods } from '@/lib/shipping-data';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface OrderSummaryProps {
  formData: any;
  onEdit: () => void;
  onConfirm: () => void;
}

const OrderSummary = ({ formData, onEdit, onConfirm }: OrderSummaryProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  
  const calculateTotal = () => {
    // Tính tổng tiền sản phẩm
    const productsTotal = formData.products.reduce(
      (acc: number, product: any) => acc + product.price * product.quantity,
      0
    );
    
    // Tính phí vận chuyển
    const shippingCost = shippingMethods.find(m => m.id === formData.shippingMethod)?.price || 0;
    
    return productsTotal + shippingCost;
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Đơn hàng đã được gửi thành công!', {
        description: 'Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng trong thời gian sớm nhất.'
      });
      setIsConfirming(false);
      onConfirm();
    }, 2000);
  };

  const shippingMethod = shippingMethods.find(m => m.id === formData.shippingMethod);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Xác nhận đơn hàng</h2>
            <Button variant="outline" onClick={onEdit}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Sửa đơn hàng
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Thông tin khách hàng</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Họ và tên:</dt>
                  <dd className="font-medium">{formData.fullName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Số điện thoại:</dt>
                  <dd className="font-medium">{formData.phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Email:</dt>
                  <dd className="font-medium">{formData.email}</dd>
                </div>
                {formData.wholesalePricing && (
                  <div className="mt-2 bg-primary/10 p-2 rounded-md">
                    <p className="text-primary text-sm font-medium flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Đã yêu cầu báo giá sỉ
                    </p>
                  </div>
                )}
              </dl>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Thông tin giao hàng</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Địa chỉ:</dt>
                  <dd className="font-medium">{formData.address}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Tỉnh/Thành phố:</dt>
                  <dd className="font-medium">{formData.city}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Phương thức vận chuyển:</dt>
                  <dd className="font-medium">{shippingMethod?.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Ngày giao hàng:</dt>
                  <dd className="font-medium">
                    {format(new Date(formData.deliveryDate), 'PPP', { locale: vi })}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          
          {formData.note && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-medium mb-2">Ghi chú</h3>
              <p className="text-muted-foreground">{formData.note}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Danh sách sản phẩm</h3>
          
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.products.map((product: any) => (
                  <tr key={product.id}>
                    <td className="py-4 px-4 whitespace-nowrap">{product.name}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{formatPrice(product.price)}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{product.quantity}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{formatPrice(product.price * product.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="py-4 px-4 text-right font-medium">Tạm tính:</td>
                  <td className="py-4 px-4 font-medium">
                    {formatPrice(formData.products.reduce(
                      (acc: number, product: any) => acc + product.price * product.quantity,
                      0
                    ))}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="py-4 px-4 text-right font-medium">Phí vận chuyển:</td>
                  <td className="py-4 px-4 font-medium">{formatPrice(shippingMethod?.price || 0)}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="py-4 px-4 text-right font-bold">Tổng tiền:</td>
                  <td className="py-4 px-4 font-bold text-primary">{formatPrice(calculateTotal())}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
            <Button variant="outline" onClick={onEdit}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Quay lại chỉnh sửa
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={isConfirming}
              className="bg-primary hover:bg-primary/90"
            >
              {isConfirming ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Xác nhận và gửi đơn hàng
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
