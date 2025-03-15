
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Họ tên phải có ít nhất 2 ký tự" }),
  phone: z.string()
    .min(10, { message: "Số điện thoại phải có ít nhất 10 số" })
    .regex(/^[0-9]+$/, { message: "Số điện thoại không hợp lệ" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  storeName: z.string().min(2, { message: "Tên cửa hàng phải có ít nhất 2 ký tự" }),
  address: z.string().min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" }),
  city: z.string().min(2, { message: "Vui lòng chọn tỉnh/thành phố" }),
  type: z.string().min(1, { message: "Vui lòng chọn loại đại lý" }),
  businessType: z.string().min(1, { message: "Vui lòng chọn loại hình kinh doanh" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const WholesaleRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      storeName: "",
      address: "",
      city: "",
      type: "",
      businessType: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form data submitted:", data);
      
      toast({
        title: "Đăng ký thành công!",
        description: "Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Đã xảy ra lỗi",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ và tên <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Nguyễn Văn A" {...field} />
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
                <FormLabel>Số điện thoại <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="0901234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên cửa hàng/doanh nghiệp <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Tên cửa hàng của bạn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Số nhà, đường, phường/xã" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tỉnh/Thành phố <span className="text-red-500">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tỉnh/thành phố" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hanoi">Hà Nội</SelectItem>
                    <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                    <SelectItem value="danang">Đà Nẵng</SelectItem>
                    <SelectItem value="cantho">Cần Thơ</SelectItem>
                    <SelectItem value="haiphong">Hải Phòng</SelectItem>
                    <SelectItem value="other">Tỉnh/Thành phố khác</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại đại lý mong muốn <span className="text-red-500">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại đại lý" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="level1">Đại lý cấp 1</SelectItem>
                    <SelectItem value="level2">Đại lý cấp 2</SelectItem>
                    <SelectItem value="notSure">Chưa xác định</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại hình kinh doanh <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại hình kinh doanh" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="offlineStore">Cửa hàng offline</SelectItem>
                  <SelectItem value="onlineStore">Cửa hàng online</SelectItem>
                  <SelectItem value="both">Cả online và offline</SelectItem>
                  <SelectItem value="marketplace">Sàn thương mại điện tử</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nội dung bổ sung</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Mô tả thêm về nhu cầu kinh doanh, doanh số dự kiến hoặc câu hỏi của bạn" 
                  className="min-h-[80px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Cung cấp thêm thông tin sẽ giúp chúng tôi hiểu rõ hơn nhu cầu của bạn
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang gửi...
            </>
          ) : (
            "Đăng ký ngay"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default WholesaleRegistrationForm;
