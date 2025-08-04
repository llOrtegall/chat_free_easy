import React from 'react';
import Image from 'next/image';
import { useChatContext } from '../contexts/ChatContext';

const UserList = React.memo(() => {
  const { onlineUsers: users, selectedUser, unreadByEmail, handleUserSelect: onUserSelect } = useChatContext();
  return (
    <div className="w-80 bg-background/60 backdrop-blur border-r border-black/10 dark:border-white/10 p-4 overflow-y-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Usuarios en línea</h2>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span className="text-xs text-foreground/60">{users.length}</span>
        </div>
      </div>
      
      {users.length === 0 ? (
        <div className="text-center py-8">
          <div className="h-12 w-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-foreground/40">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
          <p className="text-sm text-foreground/60">No hay usuarios conectados</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => {
            const unreadCount = unreadByEmail[user.email] || 0;
            const isSelected = selectedUser?.email === user.email;
            
            return (
              <li
                key={user.email}
                className={`group p-3 rounded-xl cursor-pointer transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20'
                    : 'bg-background/40 hover:bg-foreground/5 border border-transparent hover:border-black/5 dark:hover:border-white/5'
                }`}
                onClick={() => onUserSelect(user)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full ring-2 ring-background shadow-sm"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isSelected ? 'text-foreground' : 'text-foreground'}`}>
                      {user.name}
                    </p>
                    <p className="text-xs text-foreground/60 truncate">{user.email}</p>
                  </div>
                  {unreadCount > 0 && (
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-medium shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <div className="absolute inset-x-0 -top-px h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl"></div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

UserList.displayName = 'UserList';

export default UserList;
