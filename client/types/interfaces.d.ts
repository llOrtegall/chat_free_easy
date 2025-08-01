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