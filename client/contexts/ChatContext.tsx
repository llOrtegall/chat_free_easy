'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { UserDataWs, MessageWs } from '../types/interfaces';
import { useChatState } from '../hooks/useChatState';
import { useWebSocket } from '../hooks/useWebSocket';

interface ChatContextType {
  // State
  onlineUsers: UserDataWs[];
  selectedUser: UserDataWs | null;
  messages: MessageWs[];
  unreadByEmail: Record<string, number>;
  isConnected: boolean;
  
  // Actions
  handleUserSelect: (user: UserDataWs) => void;
  sendMessage: (message: string, receiver: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  name: string;
  email: string;
  image: string;
}

export function ChatProvider({ children, name, email, image }: ChatProviderProps) {
  const {
    onlineUsers,
    selectedUser,
    messages,
    unreadByEmail,
    handleUserSelect,
    handleOnlineUsersUpdate,
    handleNewMessage
  } = useChatState({ userEmail: email });

  const { isConnected, sendMessage } = useWebSocket({
    name,
    email,
    image,
    selectedUser,
    onOnlineUsersUpdate: handleOnlineUsersUpdate,
    onNewMessage: handleNewMessage
  });

  const contextValue: ChatContextType = {
    onlineUsers,
    selectedUser,
    messages,
    unreadByEmail,
    isConnected,
    handleUserSelect,
    sendMessage
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
