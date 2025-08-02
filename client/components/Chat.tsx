'use client';

import { UserDataWs, MessageWs, MessageServerWs, SaveStorage, StorageKey } from "../types/interfaces";
import { useEffect, useRef, useState } from "react";
import SelectUser from "./SelectUser";
import Image from "next/image";

const URL_WS = 'ws://localhost:4050/ws';

// Helper functions for localStorage
function getStorageKey({ userEmail, key }: StorageKey) {
  return `chat_${userEmail}_${key}`;
}

function saveToStorage({ userEmail, key, data }: SaveStorage) {
  try {
    localStorage.setItem(getStorageKey({ userEmail, key }), JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

function loadFromStorage<T>({ userEmail, key, defaultValue }: StorageKey & { defaultValue: T }): T {
  try {
    const stored = localStorage.getItem(getStorageKey({ userEmail, key }));
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

export default function Chat({ name, email, image }: { name: string, email: string, image: string }) {
  const [onlineUsers, setOnlineUsers] = useState<UserDataWs[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDataWs | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageWs[]>([]);
  const [unreadByEmail, setUnreadByEmail] = useState<Record<string, number>>(() =>
    loadFromStorage({ userEmail: email, key: 'unread', defaultValue: {} })
  );
  const [messagesByEmail, setMessagesByEmail] = useState<Record<string, MessageWs[]>>(() =>
    loadFromStorage({ userEmail: email, key: 'messages', defaultValue: {} })
  );
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const selectedUserRef = useRef<UserDataWs | null>(null);

  // Save to localStorage whenever messagesByEmail or unreadByEmail changes
  useEffect(() => {
    saveToStorage({ userEmail: email, key: 'messages', data: messagesByEmail });
  }, [messagesByEmail, email]);

  useEffect(() => {
    saveToStorage({ userEmail: email, key: 'unread', data: unreadByEmail });
  }, [unreadByEmail, email]);

  useEffect(() => {
    const wss = new WebSocket(URL_WS);
    setWs(wss);

    wss.onopen = () => {
      wss.send(JSON.stringify({ type: 'join', name, email, image }));
    }

    wss.onmessage = (event) => {
      const incoming = JSON.parse(event.data.toString());
      if (incoming instanceof Object && 'type' in incoming && incoming.type === 'online_users') {
        const newData: MessageServerWs = incoming;
        if (newData.type === 'online_users' && newData.data instanceof Array) {
          const userWithoutMe = newData.data.filter(user => user.email !== email);
          setOnlineUsers(userWithoutMe);
        }
      }

      if (incoming instanceof Object && 'type' in incoming && incoming.type === 'new_message') {
        const newData: MessageServerWs = incoming;
        if (newData.type === 'new_message' && newData.data instanceof Object) {
          const { message, sender, receiver } = newData.data as MessageWs;

          const isForMe = receiver === email;
          const isFromMe = sender === email;
          const currentSelected = selectedUserRef.current;
          const isOpenConversation = currentSelected && (
            (isFromMe && receiver === currentSelected.email) ||
            (isForMe && sender === currentSelected.email)
          );

          const otherEmail = isFromMe ? receiver : sender;
          setMessagesByEmail((prev) => {
            const list = prev[otherEmail] || [];
            return { ...prev, [otherEmail]: [...list, { message, sender, receiver }] };
          });

          if (isOpenConversation) {
            setMessages((prev) => [...prev, { message, sender, receiver }]);
          } else if (isForMe) {
            // Increment unread count for sender
            setUnreadByEmail((prev) => ({
              ...prev,
              [sender]: (prev[sender] || 0) + 1,
            }));
          }
        }
      }
    }

    wss.onclose = () => {
      console.log('Disconnected from WebSocket server');
    }

    return () => {
      try { wss.close(); } catch { /* noop */ }
    }
  }, [name, email, image])

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (!selectedUser || message.trim() === '') return;
    ws?.send(JSON.stringify({
      type: 'new_message', data: {
        message,
        sender: email,
        receiver: selectedUser.email
      }
    }));
    // Optimistic update: show message immediately
    setMessages((prev) => [...prev, { message, sender: email, receiver: selectedUser.email }]);
    setMessagesByEmail((prev) => {
      const list = prev[selectedUser.email] || [];
      return { ...prev, [selectedUser.email]: [...list, { message, sender: email, receiver: selectedUser.email }] };
    });
    setMessage('');
  }

  const handleSelectUser = (user: UserDataWs) => {
    setSelectedUser(user);
    selectedUserRef.current = user;
    setMessages(messagesByEmail[user.email] || []);
    // Clear unread counter when opening the conversation
    setUnreadByEmail((prev) => {
      if (!prev[user.email]) return prev;
      const { [user.email]: _, ...rest } = prev;
      return rest;
    });
  }

  const handleCloseConversation = () => {
    setSelectedUser(null);
    selectedUserRef.current = null;
    setMessages([]);
    // Don't clear all data when closing conversation - keep localStorage intact
  }

  // Keep ref in sync with selectedUser changes
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  return (
    <section className="flex h-[calc(100vh-125px)] w-full gap-4 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Sidebar: usuarios conectados */}
      <nav className="w-full max-w-xs shrink-0 rounded-2xl border border-zinc-200/60 bg-white/70 p-3 shadow-sm backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/60">
        <div className="mb-3 flex items-center justify-between px-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Conectados</h3>
          <span
            className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-medium text-white shadow">
            {onlineUsers.length}
          </span>
        </div>
        <ul className="space-y-2 overflow-y-auto pr-1 max-h-[calc(100vh-140px)] [&_::-webkit-scrollbar]:w-2 [&_::-webkit-scrollbar-thumb]:rounded-full [&_::-webkit-scrollbar-thumb]:bg-zinc-300/50 hover:[&_::-webkit-scrollbar-thumb]:bg-zinc-400/60 dark:[&_::-webkit-scrollbar-thumb]:bg-zinc-700/50 dark:hover:[&_::-webkit-scrollbar-thumb]:bg-zinc-600/60">
          {onlineUsers.map((user) => (
            <li key={user.id} onClick={() => handleSelectUser(user)}>
              <div className="group flex items-center gap-3 rounded-xl border border-transparent bg-white/60 p-2 transition-all hover:border-zinc-200 hover:bg-white dark:bg-zinc-900/50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900">
                <div className="relative">
                  <Image
                    src={user.image}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-zinc-200 transition-shadow group-hover:shadow-sm dark:ring-zinc-800"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    {user.name}
                    {unreadByEmail[user.email] ? (
                      <span className="ml-1 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow">
                        {unreadByEmail[user.email]}
                      </span>
                    ) : null}
                  </p>
                  <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">{user.email}</p>
                </div>
                <span className="ml-auto hidden text-zinc-400 transition-opacity group-hover:inline dark:text-zinc-500">•••</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Panel principal */}
      <article className="flex-1 rounded-2xl border p-2 border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/60">
        {
          selectedUser ? (
            <section className="flex flex-col h-full rounded-2xl p-3 bg-gradient-to-b from-background/60 to-background/80 dark:from-zinc-950/60 dark:to-zinc-900/70">
              <header className="relative border-b border-black/5 dark:border-white/10 p-2">
                <div className="pointer-events-none absolute inset-x-0 -top-px h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70" aria-hidden />
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image src={selectedUser.image} alt={selectedUser.name} width={40} height={40} className="rounded-full ring-2 ring-indigo-500/20" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold tracking-tight">{selectedUser.name}</p>
                    <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{selectedUser.email}</p>
                  </div>
                  <button
                    aria-label="Cerrar conversación"
                    onClick={handleCloseConversation}
                    className="cursor-pointer group ml-auto inline-flex items-center justify-center rounded-full bg-foreground/5 p-2 text-zinc-500 transition-all hover:bg-foreground/10 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 active:scale-95 dark:text-zinc-400 dark:hover:text-zinc-300"
                    title="Cerrar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </button>
                </div>
              </header>

              <main className="flex-1 overflow-y-auto p-3">
                <section className="flex flex-col gap-2">
                  {messages.map((m, index) => {
                    const isOwn = m.sender === email;
                    return (
                      <div key={index} className={`flex w-full ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow transition-colors ${isOwn ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm' : 'bg-foreground/10 text-foreground rounded-bl-sm'}`}>
                          <p className="whitespace-pre-wrap break-words">{m.message}</p>
                          <span className={`mt-1 block text-[10px] ${isOwn ? 'text-indigo-100/80' : 'text-foreground/70'}`}>
                            {isOwn ? 'Tú' : selectedUser?.name.split(' ')[0] || m.sender.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </section>
              </main>

              <footer className="flex items-center gap-2 px-2 py-0.5">
                <input
                  type="text"
                  placeholder="Escribe un mensaje"
                  className="p-2 rounded-md border border-black/10 dark:border-white/10 flex-1 bg-foreground/5 placeholder:text-foreground/50"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(message);
                    }
                  }}
                />
                <button
                  disabled={!selectedUser || message.trim() === ''}
                  className="p-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white disabled:opacity-50"
                  onClick={() => handleSendMessage(message)}
                >
                  Enviar
                </button>
              </footer>
            </section>
          ) : (
            <SelectUser />
          )
        }
      </article>
    </section>
  )
}