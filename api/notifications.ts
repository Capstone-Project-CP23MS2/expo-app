import { NotificationsResponse } from './type'
import apiClient from './apiClient'
const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!

class NotificationsApi {
  async getNotifications() {
    const { data } = await apiClient.get<NotificationsResponse>('/notifications')
    return data
  }

  async deleteNotification(notiId: string | number) {
    const url = `${API_URL}/notifications/${notiId}`
    await apiClient.delete(url)
  }

  async postNotification(targetId: number, message: string) {
    const { data } = await apiClient.post<NotificationsResponse>('/notifications', {
      targetId,
      message,
    })
    return data
  }
}

const notificationsApi = new NotificationsApi()
export default notificationsApi
