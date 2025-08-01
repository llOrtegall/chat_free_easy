'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { UserDataWs, MessageWs, MessageServerWs } from "../types/interfaces";

const URL_WS = 'ws://localhost:4050/ws';

export default function Chat({ name, email, image }: { name: string, email: string, image: string }) {
  const [onlineUsers, setOnlineUsers] = useState<UserDataWs[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDataWs | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageWs[]>([]);
  const [unreadByEmail, setUnreadByEmail] = useState<Record<string, number>>({});
  const [messagesByEmail, setMessagesByEmail] = useState<Record<string, MessageWs[]>>({});
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const selectedUserRef = useRef<UserDataWs | null>(null);

  useEffect(() => {
    const wss = new WebSocket(URL_WS);
    setWs(wss);

    wss.onopen = () => {
      console.log('Connected to WebSocket server');
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
  }, [])

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    console.log(message);
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
    console.log(user);
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
                  <img
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
              <header className="border-b border-black/5 dark:border-white/10 p-2">
                <div className="flex items-center gap-2">
                  <Image src={selectedUser.image} alt={selectedUser.name} width={40} height={40} className="rounded-full" />
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                  </div>
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
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-90 shadow-md" />
                <h2 className="text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">Selecciona un chat</h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Elige un usuario de la izquierda para comenzar a conversar.</p>
              </div>
            </div>
          )
        }
      </article>
    </section>
  )
}