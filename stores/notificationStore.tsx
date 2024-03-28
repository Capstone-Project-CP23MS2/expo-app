import { createStore } from 'zustand-x'

export const useNotificationStore = createStore('unreadCount')({
  unreadCount: 0,
})
