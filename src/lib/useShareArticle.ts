
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareOptions {
  url: string;
  title: string;
  description?: string;
  via?: string;
}

export function useShareArticle() {
  const [copied, setCopied] = useState(false);

  const generateShareLinks = (options: ShareOptions) => {
    const { url, title, description = '', via = '' } = options;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    const encodedVia = encodeURIComponent(via);

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${encodedVia ? `&via=${encodedVia}` : ''}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A${encodedUrl}`
    };
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Đã sao chép liên kết');
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      
      return true;
    } catch (error) {
      console.error('Failed to copy: ', error);
      toast.error('Không thể sao chép liên kết');
      return false;
    }
  };

  const share = async (options: ShareOptions) => {
    const { url, title, description = '' } = options;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
        return true;
      } catch (error) {
        console.error('Share failed:', error);
        return false;
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      return copyToClipboard(url);
    }
  };

  return {
    copied,
    generateShareLinks,
    copyToClipboard,
    share
  };
}
