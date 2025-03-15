
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ZapIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChatMessage } from './ChatMessage';
import { useChatbot } from '@/hooks/useChatbot';
import { storeInfo } from '@/lib/data';
import { Textarea } from '@/components/ui/textarea';
import ZaloContact from '@/components/product/ZaloContact';
import { useToast } from '@/hooks/use-toast';

const Chatbot = () => {
  const { messages, sendMessage, loading, error } = useChatbot();
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Show initial message when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendMessage({
        role: 'assistant',
        content: `Xin chào! Tôi là trợ lý bán hàng của ${storeInfo.name}. Tôi có thể giúp gì cho bạn hôm nay? Bạn có thể hỏi tôi về sản phẩm, giá cả, hoặc chính sách của chúng tôi.`
      });
    }
  }, [isOpen, messages.length, sendMessage]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput('');
    await sendMessage({
      role: 'user',
      content: input
    });
  };

  const handleZaloRedirect = () => {
    toast({
      title: "Chuyển sang Zalo",
      description: "Bạn sẽ được chuyển sang Zalo để trò chuyện với nhân viên tư vấn",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            className="h-14 w-14 rounded-full shadow-lg"
            variant="default"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md p-0 flex flex-col h-[80vh] max-h-[600px]" side="bottom">
          <SheetHeader className="border-b p-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src="/images/chatbot-avatar.jpg" alt="Trợ lý AI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <SheetTitle className="text-left">Trợ lý bán hàng</SheetTitle>
                <p className="text-sm text-muted-foreground">Trả lời tức thì 24/7</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {loading && (
              <div className="flex items-center text-muted-foreground text-sm">
                <div className="animate-pulse flex space-x-1">
                  <div className="h-2 w-2 bg-current rounded-full"></div>
                  <div className="h-2 w-2 bg-current rounded-full"></div>
                  <div className="h-2 w-2 bg-current rounded-full"></div>
                </div>
                <span className="ml-2">Đang trả lời...</span>
              </div>
            )}
            {error && (
              <div className="text-destructive text-sm">
                Đã xảy ra lỗi. Vui lòng thử lại sau.
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4 space-y-2">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 text-primary"
              onClick={handleZaloRedirect}
            >
              <ZapIcon className="h-4 w-4" />
              <span>Chuyển sang tư vấn qua Zalo</span>
            </Button>
            
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                className="min-h-[40px] max-h-[120px] flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={loading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Chatbot;
