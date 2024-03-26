import notificationsApi from '@/api/notifications'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

export function UseGetNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.getNotifications,
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
