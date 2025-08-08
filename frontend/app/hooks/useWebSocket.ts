import { url } from 'inspector';
import { useEffect, useRef, useState, useCallback } from 'react';

interface Message {
  type: string;
  message: string;
  timestamp?: string;
  user?: string;
}

interface UseWebSocketReturn {
  messages: Message[];
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  sendMessage: (message: string) => void;
  clearMessages: () => void;
}

const URL_WS = process.env.NEXT_PUBLIC_URL_WS || 'ws://localhost:4000/api/ws';

export const useWebSocket = (email: string, name: string, image: string): UseWebSocketReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error' >('disconnected');

  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    try {
      setConnectionStatus('connecting');
      ws.current = new WebSocket(URL_WS);

      // cuando se conecta un nuevo usuario
      ws.current.onopen = () => {
        ws.current?.send(JSON.stringify({
          type: 'join',
          data: { email, name, image }
        }))
        setConnectionStatus('connected');
      };

      // cuando recibe un mensaje del servidor ws
      ws.current.onmessage = (event) => {
        try {
          const data: Message = JSON.parse(event.data);
          setMessages(prev => [...prev, data]);
        } catch (error) {
          console.error('❌ Error al parsear mensaje:', error);
        }
      };

      // cuando se cierra la conexión
      ws.current.onclose = () => {
        console.log('🔌 Conexión cerrada');
        setConnectionStatus('disconnected');

        // Reconectar automáticamente en 3 segundos
        reconnectTimeoutId.current = setTimeout(() => {
          connect();
        }, 3000);
      };

      ws.current.onerror = (error) => {
        console.error('❌ Error WebSocket:', error);
        setConnectionStatus('error');
      };

    } catch (error) {
      console.error('❌ Error al conectar:', error);
      setConnectionStatus('error');
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

  return { messages, connectionStatus, sendMessage, clearMessages };
};