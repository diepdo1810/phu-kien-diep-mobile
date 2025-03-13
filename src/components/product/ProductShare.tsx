
import { useState } from 'react';
import { Share2, Copy, Check, Facebook, Twitter, Send } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { generateShareLinks } from '@/lib/product-utils';
import { toast } from 'sonner';

interface ProductShareProps {
  url: string;
  title: string;
}

const ProductShare = ({ url, title }: ProductShareProps) => {
  const [copied, setCopied] = useState(false);
  const shareLinks = generateShareLinks(url, title);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Đã sao chép liên kết');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Chia sẻ:</span>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={shareLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-blue-50 text-blue-600"
              aria-label="Chia sẻ lên Facebook"
            >
              <Facebook size={18} />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Facebook</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={shareLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-blue-50 text-blue-400"
              aria-label="Chia sẻ lên Twitter"
            >
              <Twitter size={18} />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Twitter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={shareLinks.telegram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-blue-50 text-sky-500"
              aria-label="Chia sẻ qua Telegram"
            >
              <Send size={18} />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Telegram</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={handleCopyLink}
              className="p-2 rounded-full hover:bg-blue-50 text-gray-600"
              aria-label="Sao chép liên kết"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? 'Đã sao chép' : 'Sao chép liên kết'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ProductShare;
