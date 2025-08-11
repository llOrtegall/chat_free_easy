'use client';

import { useWebSocket } from '@/app/hooks/useWebSocket';
import { useState } from 'react';
import Image from 'next/image';

interface UserProps {
  email: string;
  name: string;
  image: string;
}

export function Chat({ email, name, image }: UserProps) {
  const [inputMsg, setInputMsg] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);

  const {
    sendMessage,
    onlineUsers
  } = useWebSocket(email, name, image);

  // para enviar el mensaje
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMsg.trim()) {
      sendMessage(inputMsg);
      setInputMsg('');
    }
  };

  const handleSelectUser = (user: UserProps) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex w-full h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Online Users Sidebar */}
      <div className="w-80 h-full bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <h2 className="text-lg font-semibold text-white">
              Usuarios Online ({onlineUsers.length})
            </h2>
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {onlineUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-slate-400 text-sm">No hay otros usuarios conectados</p>
            </div>
          ) : (
            onlineUsers.map((user, index) => (
              <button
                key={index}
                className="group flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-slate-700/50 to-slate-800/50 hover:from-purple-600/20 hover:to-blue-600/20 transition-all duration-300 border border-slate-600/30 hover:border-purple-500/50 cursor-pointer transform hover:scale-[1.02]"
                onClick={() => handleSelectUser(user)}
              >
                <div className="relative">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full ring-2 ring-slate-600 group-hover:ring-purple-400 transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800 shadow-lg"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate group-hover:text-purple-200 transition-colors">
                    {user.name}
                  </p>
                  <p className="text-slate-400 text-xs truncate">
                    {user.email}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 h-full flex flex-col">
        {
          selectedUser ? (

            <section className="flex-1 flex flex-col bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/20 via-transparent to-blue-100/20"></div>
              
              {/* Chat Header */}
              <header className="bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-xl relative z-10">
                <div className="flex items-center space-x-4 p-6">
                  <div className="relative">
                    <Image
                      src={selectedUser.image}
                      alt={selectedUser.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full ring-2 ring-purple-400 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800 shadow-lg animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-1">
                      {selectedUser.name}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {selectedUser.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-green-400 text-sm font-medium">En línea</span>
                  </div>
                </div>
              </header>

              {/* Chat Messages Area */}
              <main className='flex-1 overflow-y-auto relative z-10'>
                <div className="p-6">
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6 shadow-xl">
                      <span className="text-3xl">💬</span>
                    </div>
                    <h3 className="text-slate-600 text-lg font-semibold mb-2">
                      Conversación con {selectedUser.name}
                    </h3>
                    <p className="text-slate-500 text-sm max-w-md">
                      Envía tu primer mensaje para comenzar la conversación
                    </p>
                  </div>
                </div>
              </main>

              {/* Message Input Footer */}
              <footer className="bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 shadow-xl relative z-10">
                <div className="p-6">
                  <form onSubmit={handleSendMessage} className="flex space-x-4">
                    <div className="flex-1 relative">
                      <input 
                        type="text" 
                        value={inputMsg} 
                        onChange={(e) => setInputMsg(e.target.value)}
                        placeholder={`Escribe un mensaje a ${selectedUser.name}...`}
                        className="w-full px-6 py-4 text-slate-800 bg-white/95 backdrop-blur-sm border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 shadow-lg placeholder-slate-400 font-medium"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={!inputMsg.trim()}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 disabled:transform-none"
                    >
                      <span className="flex items-center space-x-2">
                        <span>Enviar</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                    </button>
                  </form>
                </div>
              </footer>
            </section>

          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/20 via-transparent to-blue-100/20"></div>
              
              <div className="text-center relative z-10">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-8 shadow-2xl mx-auto">
                  <span className="text-6xl">👋</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">
                  ¡Bienvenido al Chat!
                </h2>
                <p className="text-slate-500 text-lg max-w-md mx-auto mb-6">
                  Selecciona un usuario de la lista para comenzar una conversación
                </p>
                <div className="flex items-center justify-center space-x-2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8l-4 4 4 4m0 0l4-4-4-4m0 8h11a4 4 0 000-8H7" />
                  </svg>
                  <span className="text-sm font-medium">Elige un contacto para empezar</span>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}