import React from 'react';
import Image from 'next/image';
import { useChatContext } from '../contexts/ChatContext';

const ChatHeader = React.memo(() => {
  const { selectedUser, isConnected } = useChatContext();
  if (!selectedUser) {
    return (
      <div className="p-4 border-b border-black/5 dark:border-white/10 bg-background/60 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-foreground/40">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground/80">
                Selecciona un usuario para chatear
              </h3>
              <p className="text-sm text-foreground/50">Elige a alguien de la lista para comenzar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground/40">
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-4 border-b border-black/5 dark:border-white/10 bg-background/60 backdrop-blur">
      <div className="absolute inset-x-0 -top-px h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70"></div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={selectedUser.image}
              alt={selectedUser.name}
              width={44}
              height={44}
              className="rounded-full ring-2 ring-indigo-500/20 shadow-sm"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background"></span>
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight truncate">{selectedUser.name}</h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-foreground/60 truncate">{selectedUser.email}</p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">En línea</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground/40">
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          </div>
          <button className="p-2 rounded-lg hover:bg-foreground/5 transition-colors text-foreground/60 hover:text-foreground/80">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

ChatHeader.displayName = 'ChatHeader';

export default ChatHeader;
