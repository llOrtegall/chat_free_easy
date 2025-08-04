'use client';

import React from 'react';
import { ChatProvider, useChatContext } from '../contexts/ChatContext';
import UserList from './UserList';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatProps {
  name: string;
  email: string;
  image: string;
}

function ChatContent({ email, image }: { email: string; image: string }) {
  const { selectedUser } = useChatContext();

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <UserList />

      <div className="flex-1 flex flex-col bg-background/40 backdrop-blur">
        <ChatHeader />
        
        {selectedUser ? (
          <>
            <MessageList
              currentUserEmail={email}
              currentUserImage={image}
            />
            <MessageInput />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-foreground/40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground/90 mb-3">¡Bienvenido al Chat!</h3>
              <p className="text-foreground/60 leading-relaxed">Selecciona un usuario de la lista para comenzar una conversación en tiempo real</p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-foreground/40">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>Conectado y listo para chatear</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Chat({ name, email, image }: ChatProps) {
  return (
    <ChatProvider name={name} email={email} image={image}>
      <ChatContent email={email} image={image} />
    </ChatProvider>
  );
}