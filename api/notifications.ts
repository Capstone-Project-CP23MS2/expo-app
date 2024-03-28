import { NotificationsResponse, NotificationResponse } from './type'
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

  async createNotification(notification: FormData) {
    const url = `${API_URL}/notifications`
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    const { data } = await apiClient.post<NotificationResponse>(url, notification, { headers })
    return data
  }

  async updateNotification(notiId: number, unRead: boolean) {
    const url = `${API_URL}/notifications/${notiId}`
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    const body = { unRead }
    const { data } = await apiClient.patch<NotificationResponse>(url, body, {
      headers,
    })
    return data
  }
}

const notificationsApi = new NotificationsApi()
export default notificationsApi
