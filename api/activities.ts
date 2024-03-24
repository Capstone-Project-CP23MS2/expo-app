import { requestParams, ActivityResponse, ActivitiesResponse, ParticipantResponse, ParticipantsResponse, ActivityUpdateRequest } from './type';
import apiClient from "./apiClient";
import { objToFormData } from '@/utils';
const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;

//TODO: ย้าย Formdata มาที่นี่ทั้งหมด
type ParticipantRequestBody = {
  userId: string;
  activityId: string;
  status?: string;
};

class ActivitiesApi {

  async getActivities(params: requestParams) {
    const { data } = await apiClient.get<ActivitiesResponse>('/activities', { params });
    return data;
  }

  async getActivityById(id: string | string[]) {
    const { data } = await apiClient.get<ActivityResponse>(`/activities/${id}`);
    return data;
  }


  // Example: /activities/search?categoryId=9395&locationId=1908612&sort=1&date=2024-01-05
  // async getActivitiesBySearch(params: requestParams) {
  //   const { data } = await apiClient.get<ActivitiesResponse>('/activities/search', { params });
  //   return data;
  // }

  async createActivity(activity: FormData) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const { data } = await apiClient.post<ActivityResponse>(
      'activities', activity, { headers }
    );
    return data;
  }

  async updateActivity(activityId: number, updateRequest: ActivityUpdateRequest) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const { data } = await apiClient.patch<ActivityResponse>(
      `activities/${activityId}`, objToFormData(updateRequest), { headers }
    );
    return data;
  }

  async deleteActivity(activityId: string | number) {
    const url = `${API_URL}/activities/${activityId}`;
    await apiClient.delete(url);
  }

  async deleteUser(id: string | number) {
    await apiClient.delete(`/users/${id}`);
  }

  async getActivityParticipants(activityId: string | string[]) {
    const url = `${API_URL}/participants`;
    const { data } = await apiClient.get<ParticipantsResponse>(
      url,
      { params: { activityId: activityId } }
    );
    return data;
  }

  async createActivityParticipant(participant: FormData) {
    const url = `${API_URL}/participants`;
    const { data } = await apiClient.post<ParticipantResponse>(
      url, participant,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  };

  async deleteActivityParticipant(params: any) {
    const { activityId, userId } = params;
    const url = `${API_URL}/participants/${activityId}_${userId}`;
    // const { data } = await axios.delete(`${API_URL}/participants`, { params });
    const { data } = await apiClient.delete(url);
    return data;
  };
}
const activitiesApi = new ActivitiesApi();
export default activitiesApi;