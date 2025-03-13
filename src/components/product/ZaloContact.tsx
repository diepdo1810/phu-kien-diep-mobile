
import { LogIn } from 'lucide-react';
import { zaloInfo } from '@/lib/data';

interface ZaloContactProps {
  productName: string;
  productUrl: string;
}

const ZaloContact = ({ productName, productUrl }: ZaloContactProps) => {
  const { phoneNumber, shareMessage } = zaloInfo;
  
  const getMessage = () => {
    return `${shareMessage}${productName}\n${productUrl}`;
  };
  
  const zaloUrl = `https://zalo.me/${phoneNumber}?text=${encodeURIComponent(getMessage())}`;
  
  return (
    <a 
      href={zaloUrl}
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full bg-[#0068ff] hover:bg-[#0054cc] text-white font-medium py-3 rounded-lg transition-colors duration-200"
    >
      <LogIn className="h-5 w-5" />
      <span>Liên hệ qua Zalo</span>
    </a>
  );
};

export default ZaloContact;
