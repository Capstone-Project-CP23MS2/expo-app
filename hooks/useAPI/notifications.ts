import notificationsApi from '@/api/notifications'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

export function UseGetNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.getNotifications,
  })
}

export function UseGetNotificationById(notiId: any) {
  return useQuery({
    queryKey: ['notifications', notiId],
    queryFn: () => notificationsApi.getNotificationById(notiId),
  })
}

export function UseDeleteNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: notificationsApi.deleteNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function UseCreateNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createNotification'],
    mutationFn: notificationsApi.createNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function UseUpdateNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateNotification'],
    mutationFn: ({ notiId, unRead }: { notiId: number; unRead: boolean }) =>
      notificationsApi.updateNotification(notiId, unRead),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}
