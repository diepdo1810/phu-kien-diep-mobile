
import React from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, ExternalLink } from "lucide-react";
import { storeInfo, zaloInfo } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import ContactForm from "@/components/contact/ContactForm";
import StoreLocation from "@/components/contact/StoreLocation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Contact = () => {
  const { toast } = useToast();
  const isStoreOpen = isBusinessHoursNow(storeInfo.workingHours);

  const openZaloChat = () => {
    const zaloUrl = `https://zalo.me/${zaloInfo.phoneNumber}`;
    window.open(zaloUrl, "_blank");
    toast({
      title: "Đang mở Zalo",
      description: "Đang chuyển hướng đến Zalo chat",
    });
  };

  return (
    <div className="container px-4 py-12 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight text-center mb-8">
        Liên Hệ Với Chúng Tôi
      </h1>
      
      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Thông Tin Liên Hệ</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Địa Chỉ</p>
                  <p className="text-muted-foreground">{storeInfo.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Số Điện Thoại</p>
                  <p className="text-muted-foreground">{storeInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{storeInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Giờ Làm Việc</p>
                  <p className="text-muted-foreground">{storeInfo.workingHours}</p>
                  <Badge variant={isStoreOpen ? "default" : "outline"} className="mt-1">
                    {isStoreOpen ? "Đang mở cửa" : "Đã đóng cửa"} 
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Zalo Contact */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Kết Nối Zalo</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-14 w-14">
                <AvatarImage src="/placeholder.svg" alt={zaloInfo.displayName} />
                <AvatarFallback>{zaloInfo.displayName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{zaloInfo.displayName}</p>
                <p className="text-sm text-muted-foreground">{zaloInfo.phoneNumber}</p>
              </div>
              <Button className="ml-auto gap-2" onClick={openZaloChat}>
                <MessageSquare className="h-4 w-4" />
                Chat Ngay
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="bg-white p-2 rounded-md w-32 h-32 border">
                <img 
                  src="/placeholder.svg" 
                  alt="Zalo QR Code" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-medium">Quét mã QR để kết nối</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Hoặc tham gia nhóm Zalo của chúng tôi để nhận thông tin khuyến mãi
                </p>
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Tham Gia Nhóm Zalo
                </Button>
              </div>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Kết Nối Mạng Xã Hội</h3>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" asChild>
                <a href={storeInfo.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={storeInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={storeInfo.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tiktok"><path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M15 8v8a4 4 0 0 1-4 4"/><path d="M15 8h-4"/></svg>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={storeInfo.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Contact Form and Map */}
        <div className="space-y-8">
          {/* Contact Form */}
          <ContactForm />
          
          {/* Location Map */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Vị Trí Cửa Hàng</h3>
            <p className="text-muted-foreground mb-4">
              Dễ dàng tìm thấy chúng tôi tại địa chỉ bên dưới:
            </p>
            <div className="h-[300px] mb-4 overflow-hidden rounded-md">
              <StoreLocation />
            </div>
            <p className="text-sm text-muted-foreground">
              Địa chỉ: {storeInfo.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility function to check if the current time is within business hours
function isBusinessHoursNow(hoursString: string): boolean {
  try {
    // Example format: "08:00 - 21:00, Thứ 2 - Chủ Nhật"
    const timeRange = hoursString.split(',')[0].trim();
    const [startTime, endTime] = timeRange.split('-').map(t => t.trim());
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    
    return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
  } catch (error) {
    console.error("Error parsing business hours:", error);
    return false;
  }
}

export default Contact;
