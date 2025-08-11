import { useEffect, useRef, useState, useCallback } from 'react';

interface User {
  email: string;
  name: string;
  image: string;
}

interface Message {
  type: string;
  message: string;
  timestamp?: string;
  user?: string;
}

interface UseWebSocketReturn {
  messages: Message[];
  sendMessage: (message: string) => void;
  clearMessages: () => void;
  onlineUsers: User[];
}

const URL_WS = process.env.NEXT_PUBLIC_URL_WS || 'ws://localhost:4000/api/ws';

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
          
          if(messageData.type === 'onlineUsers' && messageData.data instanceof Array){
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
  }, [URL_WS]);

  const sendMessage = useCallback((message: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const messageData = {
        text: message,
        user: 'React Client',
        timestamp: new Date().toISOString()
      };

      ws.current.send(JSON.stringify(messageData));

      // Agregar mensaje propio a la lista
      setMessages(prev => [...prev, {
        type: 'sent',
        message: message,
        timestamp: messageData.timestamp,
        user: 'Tú'
      }]);
    }
  }, []);

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