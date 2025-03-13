
import { MessageCircle, Trash2 } from 'lucide-react';
import { useProductSelection } from '@/hooks/useProductSelection';
import { Button } from '@/components/ui/button';
import { zaloInfo } from '@/lib/data';

const ShareProductsButton = () => {
  const { selectedProducts, shareViaZalo, clearSelection } = useProductSelection();
  
  if (selectedProducts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center gap-3">
        <div className="text-sm font-medium">
          {selectedProducts.length} sản phẩm đã chọn
        </div>
        
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={clearSelection}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Xóa tất cả</span>
        </Button>
        
        <Button 
          onClick={shareViaZalo}
          className="flex items-center gap-2 bg-[#0068ff] hover:bg-[#0054cc]"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Chia sẻ qua Zalo</span>
        </Button>
      </div>
    </div>
  );
};

export default ShareProductsButton;
