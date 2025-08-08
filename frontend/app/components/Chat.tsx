'use client';

import { useWebSocket } from '@/app/hooks/useWebSocket';
import { useState } from 'react';

export function Chat({ email, name, image }: { email: string; name: string; image: string  }) {
  const [inputMsg, setInputMsg] = useState('');
  const {
    messages,
    clearMessages,
    sendMessage,
    connectionStatus
  } = useWebSocket(email, name, image);

  // para enviar el mensaje
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMsg.trim()) {
      sendMessage(inputMsg);
      setInputMsg('');
    }
  };

  const getStatusStyles = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'connecting':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'disconnected':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return '🟢 Conectado';
      case 'connecting': return '🟡 Conectando...';
      case 'error': return '🔴 Error de conexión';
      case 'disconnected': return '⚫ Desconectado';
      default: return '⚫ Desconectado';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 p-4">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-t-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">💬</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Chat en Tiempo Real
              </h1>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusStyles()}`}>
              {getStatusText()}
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white/60 backdrop-blur-sm border-x border-gray-200/50 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">💭</span>
                </div>
                <p className="text-gray-500 text-lg font-medium">No hay mensajes aún</p>
                <p className="text-gray-400 text-sm mt-2">¡Envía tu primer mensaje para comenzar!</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.user === 'Tú' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${msg.user === 'Tú'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-l-2xl rounded-tr-2xl'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-r-2xl rounded-tl-2xl shadow-sm'
                    } p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-semibold ${msg.user === 'Tú' ? 'text-blue-100' : 'text-gray-600'
                        }`}>
                        {msg.user || 'Servidor'}
                      </span>
                      <span className={`text-xs ${msg.user === 'Tú' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : ''}
                      </span>
                    </div>
                    <div className="text-sm leading-relaxed">{msg.message}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input Form */}
          <div className="p-6 border-t border-gray-200/50 bg-white/40">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  disabled={connectionStatus !== 'connected'}
                  className="w-full px-4 py-3 text-gray-800 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                />
              </div>
              <button
                type="submit"
                disabled={connectionStatus !== 'connected' || !inputMsg.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center space-x-2">
                  <span>Enviar</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="bg-white/80 backdrop-blur-sm rounded-b-2xl shadow-lg border border-gray-200/50 p-4">
          <div className="flex justify-center">
            <button
              onClick={clearMessages}
              className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Limpiar mensajes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}