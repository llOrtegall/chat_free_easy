export interface UserDataWs {
  id: string
  name: string
  email: string
  image: string
}

export interface MessageWs {
  message: string
  sender: string
  receiver: string
}

export interface MessageServerWs {
  type: 'online_users' | 'new_message'
  data: UserDataWs[] | MessageWs
}

export interface StorageKey {
  userEmail: string;
  key: string;
}

export interface SaveStorage {
  userEmail: string;
  key: string;
  data: Record<string, number> | Record<string, MessageWs[]>;
}
