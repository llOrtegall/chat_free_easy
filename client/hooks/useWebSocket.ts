import { useEffect, useRef, useState, useCallback } from 'react';
import { UserDataWs, MessageWs, MessageServerWs } from '../types/interfaces';

const URL_WS = 'ws://localhost:4050/ws';

interface UseWebSocketProps {
  name: string;
  email: string;
  image: string;
  selectedUser: UserDataWs | null;
  onOnlineUsersUpdate: (users: UserDataWs[]) => void;
  onNewMessage: (message: MessageWs) => void;
}

export function useWebSocket({
  name,
  email,
  image,
  selectedUser,
  onOnlineUsersUpdate,
  onNewMessage
}: UseWebSocketProps) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const selectedUserRef = useRef<UserDataWs | null>(selectedUser);

  // Update ref when selectedUser changes
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  const sendMessage = useCallback((message: string, receiver: string) => {
    if (ws && isConnected) {
      ws.send(JSON.stringify({
        type: 'send_message',
        message,
        sender: email,
        receiver
      }));
    }
  }, [ws, isConnected, email]);

  useEffect(() => {
    const wss = new WebSocket(URL_WS);
    setWs(wss);

    wss.onopen = () => {
      setIsConnected(true);
      wss.send(JSON.stringify({ type: 'join', name, email, image }));
    };

    wss.onclose = () => {
      setIsConnected(false);
    };

    wss.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    wss.onmessage = (event) => {
      const incoming = JSON.parse(event.data.toString());
      
      if (incoming instanceof Object && 'type' in incoming) {
        const messageData: MessageServerWs = incoming;
        
        if (messageData.type === 'online_users' && Array.isArray(messageData.data)) {
          const userWithoutMe = messageData.data.filter(user => user.email !== email);
          onOnlineUsersUpdate(userWithoutMe);
        }
        
        if (messageData.type === 'new_message' && messageData.data instanceof Object) {
          const { message, sender, receiver } = messageData.data as MessageWs;
          onNewMessage({ message, sender, receiver });
        }
      }
    };

    return () => {
      wss.close();
    };
  }, [name, email, image, onOnlineUsersUpdate, onNewMessage]);

  return {
    ws,
    isConnected,
    sendMessage
  };
}
