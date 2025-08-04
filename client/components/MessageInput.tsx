import React, { useState, useCallback } from 'react';
import { useChatContext } from '../contexts/ChatContext';

const MessageInput = React.memo(() => {
  const { selectedUser, sendMessage, isConnected } = useChatContext();
  const disabled = !isConnected || !selectedUser;
  const [message, setMessage] = useState<string>('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && selectedUser) {
      sendMessage(message.trim(), selectedUser.email);
      setMessage('');
    }
  }, [message, disabled, selectedUser, sendMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-black/5 dark:border-white/10 bg-background/60 backdrop-blur">
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            disabled={disabled}
            className="w-full px-4 py-3 rounded-2xl border border-black/10 dark:border-white/10 bg-background/80 backdrop-blur text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 resize-none"
            style={{ minHeight: '48px' }}
          />
          {message.trim() && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-foreground/40">
        <span>Presiona Enter para enviar</span>
        {disabled && (
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
            Desconectado
          </span>
        )}
      </div>
    </form>
  );
});

MessageInput.displayName = 'MessageInput';

export default MessageInput;
