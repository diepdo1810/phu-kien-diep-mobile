
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Search, Calendar, Loader2, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { products, categories } from '@/lib/data';
import { formatPrice } from '@/lib/product-utils';
import ZaloContact from '@/components/product/ZaloContact';
import ProductSearchResults from '@/components/order/ProductSearchResults';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Vui lòng nhập tên của bạn',
  }),
  phone: z.string().min(10, {
    message: 'Vui lòng nhập số điện thoại hợp lệ',
  }),
  email: z.string().email({
    message: 'Vui lòng nhập email hợp lệ',
  }),
  address: z.string().min(5, {
    message: 'Vui lòng nhập địa chỉ giao hàng',
  }),
  city: z.string().min(2, {
    message: 'Vui lòng chọn thành phố',
  }),
  shippingMethod: z.string({
    required_error: 'Vui lòng chọn phương thức vận chuyển',
  }),
  deliveryDate: z.date({
    required_error: 'Vui lòng chọn ngày nhận hàng',
  }),
  note: z.string().optional(),
  wholesalePricing: z.boolean().default(false),
  products: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number().min(1),
    })
  ).min(1, {
    message: 'Vui lòng chọn ít nhất một sản phẩm',
  }),
});

type OrderFormValues = z.infer<typeof formSchema>;

const cities = [
  'Hà Nội', 'TP Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
  'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu',
  'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước',
  'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông',
  'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang',
  'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình',
  'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu',
  'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
  'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên',
  'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị',
  'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên',
  'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang',
  'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
];

const shippingMethods = [
  { id: 'standard', name: 'Giao hàng tiêu chuẩn (2-3 ngày)', price: 30000 },
  { id: 'express', name: 'Giao hàng nhanh (1-2 ngày)', price: 60000 },
  { id: 'sameday', name: 'Giao hàng trong ngày', price: 100000 },
];

interface OrderFormProps {
  onSubmit: (data: OrderFormValues) => void;
}

const OrderForm = ({ onSubmit }: OrderFormProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      shippingMethod: '',
      note: '',
      wholesalePricing: false,
      products: [],
    },
  });

  // Simulate a query to fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return new Promise<typeof categories>(resolve => {
        setTimeout(() => resolve(categories), 200);
      });
    },
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      const results = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast.info('Không tìm thấy sản phẩm nào phù hợp');
      }
    }, 500);
  };

  const handleAddProduct = (product: typeof products[0]) => {
    const currentProducts = form.getValues('products');
    const existingProduct = currentProducts.find(p => p.id === product.id);
    
    if (existingProduct) {
      // Cập nhật số lượng nếu sản phẩm đã tồn tại
      const updatedProducts = currentProducts.map(p => 
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      form.setValue('products', updatedProducts);
    } else {
      // Thêm sản phẩm mới
      form.setValue('products', [
        ...currentProducts,
        { 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          quantity: 1 
        }
      ]);
    }
    
    // Xóa kết quả tìm kiếm
    setSearchResults([]);
    setSearchQuery('');
    
    toast.success(`Đã thêm ${product.name}`);
  };

  const handleRemoveProduct = (productId: number) => {
    const currentProducts = form.getValues('products');
    form.setValue(
      'products',
      currentProducts.filter((p) => p.id !== productId)
    );
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    const currentProducts = form.getValues('products');
    const updatedProducts = currentProducts.map(p => 
      p.id === productId ? { ...p, quantity } : p
    );
    
    form.setValue('products', updatedProducts);
  };

  const calculateTotal = () => {
    const products = form.getValues('products');
    const productsTotal = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    
    const shippingMethod = form.getValues('shippingMethod');
    const shippingCost = shippingMethods.find(m => m.id === shippingMethod)?.price || 0;
    
    return productsTotal + shippingCost;
  };

  const handleSubmitForm = (values: OrderFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(values);
    }, 1500);
  };

  const selectedProducts = form.watch('products');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-8">
        {/* Thông tin liên hệ */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập họ và tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập số điện thoại" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="wholesalePricing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Tôi muốn nhận báo giá sỉ</FormLabel>
                      <FormDescription>
                        Chọn mục này để nhận mức giá ưu đãi dành cho đơn hàng số lượng lớn
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Tìm kiếm và chọn sản phẩm */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Chọn sản phẩm</h2>
            
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Tìm kiếm sản phẩm theo tên hoặc mã"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button type="button" onClick={handleSearch} disabled={isSearching}>
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>
            
            {searchResults.length > 0 && (
              <ProductSearchResults
                products={searchResults}
                onAddProduct={handleAddProduct}
              />
            )}
            
            {form.formState.errors.products && (
              <p className="text-sm font-medium text-destructive mt-2">
                {form.formState.errors.products.message}
              </p>
            )}
            
            {/* Danh sách sản phẩm đã chọn */}
            {selectedProducts.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2">Sản phẩm đã chọn</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thành tiền</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="py-4 px-4 whitespace-nowrap">{product.name}</td>
                          <td className="py-4 px-4 whitespace-nowrap">{formatPrice(product.price)}</td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => updateProductQuantity(product.id, product.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{product.quantity}</span>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => updateProductQuantity(product.id, product.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">{formatPrice(product.price * product.quantity)}</td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveProduct(product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Xóa
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="py-4 px-4 text-right font-medium">Tổng tiền sản phẩm:</td>
                        <td colSpan={2} className="py-4 px-4 font-bold">{formatPrice(calculateTotal())}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Thông tin giao hàng */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ giao hàng</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa chỉ giao hàng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tỉnh/thành phố" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="shippingMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phương thức vận chuyển</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phương thức vận chuyển" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {shippingMethods.map((method) => (
                          <SelectItem key={method.id} value={method.id}>
                            {method.name} - {formatPrice(method.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Ngày nhận hàng dự kiến</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: vi })
                            ) : (
                              <span>Chọn ngày</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            // Disable past dates and dates more than 1 month in the future
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const maxDate = new Date();
                            maxDate.setMonth(maxDate.getMonth() + 1);
                            return date < today || date > maxDate;
                          }}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mt-6">
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Nhập ghi chú đặc biệt cho đơn hàng (nếu có)" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Hỗ trợ và gửi đơn hàng */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:justify-between gap-8">
              <div className="max-w-xs">
                <h3 className="text-lg font-semibold mb-2">Cần hỗ trợ?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi để được hỗ trợ.
                </p>
                <div className="mt-4">
                  <ZaloContact 
                    productName="Đơn đặt hàng sỉ" 
                    productUrl={window.location.href} 
                  />
                </div>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mr-2" />
                  <span>Thời gian phản hồi: 15-30 phút trong giờ làm việc</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-end justify-end space-y-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Tổng tiền đơn hàng:</p>
                  <p className="text-2xl font-bold">{formatPrice(calculateTotal())}</p>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    "Xem lại đơn hàng"
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center md:text-right">
                  Đơn hàng của bạn sẽ được xác nhận qua email và điện thoại
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default OrderForm;
