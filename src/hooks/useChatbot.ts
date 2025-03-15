
import { useState, useCallback } from 'react';
import { products, storeInfo } from '@/lib/data';
import { searchProducts } from '@/lib/product-utils';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatbotState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (message: Message) => Promise<void>;
}

export const useChatbot = (): ChatbotState => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create system prompt that gives the AI context about its role and available data
  const systemPrompt: Message = {
    role: 'system',
    content: `Bạn là trợ lý bán hàng AI của ${storeInfo.name}, một cửa hàng chuyên kinh doanh phụ kiện điện thoại. 
    
Hãy trả lời khách hàng một cách nhiệt tình, thân thiện và chuyên nghiệp. Tập trung vào việc giúp khách hàng tìm sản phẩm phù hợp, trả lời câu hỏi về đặc điểm sản phẩm, và hỗ trợ quy trình mua hàng.

Thông tin cửa hàng:
- Tên: ${storeInfo.name}
- Địa chỉ: ${storeInfo.address}
- Số điện thoại: ${storeInfo.phone}
- Email: ${storeInfo.email}
- Giờ làm việc: ${storeInfo.workingHours}

Luôn trả lời bằng tiếng Việt. Khi khách hàng hỏi về sản phẩm cụ thể, hãy cung cấp thông tin chi tiết về giá cả, đặc điểm, và tính năng. Nếu khách có câu hỏi phức tạp hoặc cần tư vấn chuyên sâu, gợi ý họ liên hệ qua Zalo để được hỗ trợ trực tiếp.`
  };

  // Send message to AI and get response
  const sendMessage = useCallback(async (message: Message) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add user message to chat
      if (message.role === 'user') {
        setMessages(prev => [...prev, message]);
      } else {
        // If it's a system or assistant message, just add it without AI processing
        setMessages(prev => [...prev, message]);
        setLoading(false);
        return;
      }

      // In a production environment, this would be an API call to OpenAI or another AI service
      // For now, we'll simulate the AI response with some basic product info lookup
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Generate a simple response based on the message content
      let aiResponse = '';
      const userQuery = message.content.toLowerCase();
      
      // Simple product search simulation
      if (userQuery.includes('sản phẩm') || userQuery.includes('mua') || userQuery.includes('giá')) {
        // Extract product keywords
        const matchedProducts = searchProducts(userQuery);
        
        if (matchedProducts && matchedProducts.length > 0) {
          const topProduct = matchedProducts[0];
          aiResponse = `Chúng tôi có sản phẩm "${topProduct.name}" với giá ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(topProduct.price)}.
            
Đặc điểm sản phẩm:
- ${topProduct.description}
- Số lượng còn: ${topProduct.stock} chiếc
${topProduct.discount > 0 ? `- Đang giảm giá: ${topProduct.discount}%` : ''}

Bạn có muốn biết thêm thông tin gì về sản phẩm này không?`;
        } else {
          aiResponse = `Xin lỗi, tôi không tìm thấy thông tin sản phẩm phù hợp với yêu cầu của bạn. Bạn có thể mô tả kỹ hơn về sản phẩm bạn đang tìm kiếm không?`;
        }
      } else if (userQuery.includes('liên hệ') || userQuery.includes('zalo')) {
        aiResponse = `Bạn có thể liên hệ với chúng tôi qua:
- Số điện thoại: ${storeInfo.phone}
- Email: ${storeInfo.email}
- Zalo: Nhấn nút "Chuyển sang tư vấn qua Zalo" bên dưới
- Địa chỉ: ${storeInfo.address}`;
      } else if (userQuery.includes('giờ') || userQuery.includes('thời gian')) {
        aiResponse = `Cửa hàng chúng tôi mở cửa vào: ${storeInfo.workingHours}`;
      } else if (userQuery.includes('chính sách') || userQuery.includes('bảo hành') || userQuery.includes('đổi trả')) {
        aiResponse = `Chúng tôi có chính sách bảo hành cho các sản phẩm từ 1-12 tháng tùy loại. Sản phẩm được đổi trả trong vòng 7 ngày nếu có lỗi từ nhà sản xuất. Để biết thêm chi tiết về từng sản phẩm cụ thể, vui lòng cho tôi biết bạn đang quan tâm đến sản phẩm nào.`;
      } else {
        aiResponse = `Cảm ơn bạn đã liên hệ với ${storeInfo.name}. Tôi có thể giúp bạn tìm hiểu về các sản phẩm phụ kiện điện thoại của chúng tôi, chính sách giá cả, bảo hành và vận chuyển. Bạn đang quan tâm đến sản phẩm nào?`;
      }
      
      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Đã xảy ra lỗi khi gửi tin nhắn');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage
  };
};
