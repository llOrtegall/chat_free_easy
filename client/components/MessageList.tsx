import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useChatContext } from '../contexts/ChatContext';

interface MessageListProps {
  currentUserEmail: string;
  currentUserImage: string;
}

const MessageList = React.memo(({ currentUserEmail, currentUserImage }: MessageListProps) => {
  const { messages, selectedUser } = useChatContext();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background/30">
        <div className="text-center max-w-sm">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-foreground/40">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground/80 mb-2">No hay mensajes aún</h3>
          <p className="text-sm text-foreground/60">¡Inicia la conversación enviando tu primer mensaje!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/30">
      {messages.map((msg, index) => {
        const isFromMe = msg.sender === currentUserEmail;
        
        return (
          <div
            key={index}
            className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-3 max-w-xs lg:max-w-md ${isFromMe ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className="flex-shrink-0">
                <Image
                  src={isFromMe ? currentUserImage : selectedUser?.image || ''}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full ring-1 ring-background shadow-sm"
                />
              </div>
              <div
                className={`px-4 py-2 rounded-2xl shadow-sm ${
                  isFromMe
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-sm'
                    : 'bg-background/80 backdrop-blur text-foreground border border-black/5 dark:border-white/5 rounded-bl-sm'
                }`}
              >
                <p className="text-sm break-words leading-relaxed">{msg.message}</p>
                <div className={`text-xs mt-1 ${isFromMe ? 'text-indigo-100/70' : 'text-foreground/50'}`}>
                  {new Date().toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
