
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { storeInfo } from '@/lib/data';
import { Message } from '@/hooks/useChatbot';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && (
          <Avatar className="h-8 w-8">
            <AvatarImage src="/images/chatbot-avatar.jpg" alt={`${storeInfo.name} AI`} />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        )}
        
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          }`}
        >
          <div className="whitespace-pre-wrap text-sm break-words">
            {message.content}
          </div>
        </div>
        
        {isUser && (
          <Avatar className="h-8 w-8">
            <AvatarFallback>Bạn</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};
