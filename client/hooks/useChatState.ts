import { useState, useEffect, useCallback, useRef } from 'react';
import { UserDataWs, MessageWs } from '../types/interfaces';
import { saveToStorage, loadFromStorage } from '../utils/storage';

interface UseChatStateProps {
  userEmail: string;
}

export function useChatState({ userEmail }: UseChatStateProps) {
  const [onlineUsers, setOnlineUsers] = useState<UserDataWs[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDataWs | null>(null);
  const [messages, setMessages] = useState<MessageWs[]>([]);
  const [unreadByEmail, setUnreadByEmail] = useState<Record<string, number>>(() =>
    loadFromStorage({ userEmail, key: 'unread', defaultValue: {} })
  );
  const [messagesByEmail, setMessagesByEmail] = useState<Record<string, MessageWs[]>>(() =>
    loadFromStorage({ userEmail, key: 'messages', defaultValue: {} })
  );
  
  const selectedUserRef = useRef<UserDataWs | null>(null);

  // Save to localStorage whenever messagesByEmail or unreadByEmail changes
  useEffect(() => {
    saveToStorage({ userEmail, key: 'messages', data: messagesByEmail });
  }, [messagesByEmail, userEmail]);

  useEffect(() => {
    saveToStorage({ userEmail, key: 'unread', data: unreadByEmail });
  }, [unreadByEmail, userEmail]);

  // Update ref when selectedUser changes
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  const handleUserSelect = useCallback((user: UserDataWs) => {
    setSelectedUser(user);
    const userMessages = messagesByEmail[user.email] || [];
    setMessages(userMessages);
    
    // Clear unread count for this user
    setUnreadByEmail((prev) => {
      const updated = { ...prev };
      delete updated[user.email];
      return updated;
    });
  }, [messagesByEmail]);

  const handleOnlineUsersUpdate = useCallback((users: UserDataWs[]) => {
    setOnlineUsers(users);
  }, []);

  const handleNewMessage = useCallback((newMessage: MessageWs) => {
    const { message, sender, receiver } = newMessage;
    const isForMe = receiver === userEmail;
    const isFromMe = sender === userEmail;
    const currentSelected = selectedUserRef.current;
    
    const isOpenConversation = currentSelected && (
      (isFromMe && receiver === currentSelected.email) ||
      (isForMe && sender === currentSelected.email)
    );

    const otherEmail = isFromMe ? receiver : sender;
    
    setMessagesByEmail((prev) => {
      const list = prev[otherEmail] || [];
      return { ...prev, [otherEmail]: [...list, newMessage] };
    });

    if (isOpenConversation) {
      setMessages((prev) => [...prev, newMessage]);
    } else if (isForMe) {
      // Increment unread count for sender
      setUnreadByEmail((prev) => ({
        ...prev,
        [sender]: (prev[sender] || 0) + 1
      }));
    }
  }, [userEmail]);

  return {
    onlineUsers,
    selectedUser,
    messages,
    unreadByEmail,
    messagesByEmail,
    handleUserSelect,
    handleOnlineUsersUpdate,
    handleNewMessage,
    selectedUserRef
  };
}
