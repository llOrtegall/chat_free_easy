import { useEffect, useRef, useState, useCallback } from 'react';

interface User {
  email: string;
  name: string;
  image: string;
}

interface Message {
  message: string;
  receiver: string;
  sender: string;
  timestamp: string;
}

interface UseWebSocketReturn {
  messages: Message[];
  sendMessage: (message: string, receiver: string) => void;
  clearMessages: () => void;
  onlineUsers: User[];
}

const DEFAULT_WS_URL =
  typeof window !== 'undefined'
    ? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/api/ws`
    : 'ws://localhost:4000/api/ws';

const URL_WS = process.env.NEXT_PUBLIC_WS_URL ?? DEFAULT_WS_URL;

export const useWebSocket = (email: string, name: string, image: string): UseWebSocketReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    try {
      ws.current = new WebSocket(URL_WS);

      // cuando se conecta un nuevo usuario
      ws.current.onopen = () => {
        ws.current?.send(JSON.stringify({
          type: 'join',
          data: { email, name, image }
        }))
      };

      // cuando recibe un mensaje del servidor ws
      ws.current.onmessage = (event) => {
        try {
          const messageData = JSON.parse(event.data.toString());

          if (messageData.type === 'onlineUsers' && messageData.data instanceof Array) {
            const onlineUsers: User[] = messageData.data;

            // Crear un Map para deduplicación más eficiente
            const uniqueUsersMap = new Map<string, User>();

            onlineUsers.forEach(user => {
              // Solo agregar si no es el usuario actual
              if (user.email !== email) {
                uniqueUsersMap.set(user.email, user);
              }
            });

            // Convertir Map a array
            const filteredUsers = Array.from(uniqueUsersMap.values());
            setOnlineUsers(filteredUsers);
          }

          if(messageData.type === 'newMessage' && messageData.data instanceof Object){
            const message = messageData.data as Message;
            setMessages(prev => [...prev, message]);
          }

        } catch (error) {
          console.error('❌ Error al parsear mensaje:', error);
        }
      };

      // cuando se cierra la conexión
      ws.current.onclose = () => {
        console.log('🔌 Conexión cerrada');

        // Reconectar automáticamente en 3 segundos
        reconnectTimeoutId.current = setTimeout(() => {
          connect();
        }, 3000);
      };

      ws.current.onerror = (error) => {
        console.error('❌ Error WebSocket:', error);
      };

    } catch (error) {
      console.error('❌ Error al conectar:', error);
    }
  }, [email, name, image]);

  const sendMessage = useCallback((message: string, receiver: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const messageData = {
        type: 'newMessage',
        data: {
          message,
          receiver,
          sender: email,
          timestamp: new Date().toISOString()
        }
      };

      ws.current.send(JSON.stringify(messageData));

      setMessages(prev => [...prev, messageData.data]);
    }
  }, [email]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutId.current) {
        clearTimeout(reconnectTimeoutId.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  return { messages, sendMessage, clearMessages, onlineUsers };
};