import { ActivitiesResponse, ParticipantResponse, ActivityUpdateRequest, PaginateResponse } from '../type';
import apiClient from "../apiClient";
import { objToFormData } from '@/utils';
import { AxiosRequestConfig } from 'axios';
import { ActivitiesParams, Activity, ActivityCreateRequest, GetActivitiesByLocationParams, Participant, ParticipantUpdateParams, ParticipantUpdateRequest, ParticipantsParams } from './type';

class ActivitiesApi {
  async getActivities(params: ActivitiesParams) {
    const config: AxiosRequestConfig = {
      params: {
        ...params,
        pageSize: 10,

      } as ActivitiesParams,
      paramsSerializer: {
        indexes: null,
      }
    };
    const { data } = await apiClient.get<PaginateResponse<Activity>>('/activities', config);
    return data;
  }


  async getActivityById(id: number | string | string[]) {
    const { data } = await apiClient.get<Activity>(`/activities/${id}`);
    return data;
  }

  async getActivitiesByLocation(params: GetActivitiesByLocationParams) {
    const { data } = await apiClient.get<Activity[]>('/location/getList', { params });
    return data;
  }

  async createActivity(createRequest: ActivityCreateRequest) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const { data } = await apiClient.post<Activity>(
      'activities', objToFormData(createRequest), { headers }
    );
    return data;
  }

  async updateActivity(activityId: number, updateRequest: ActivityUpdateRequest) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const { data } = await apiClient.patch<Activity>(
      `activities/${activityId}`, objToFormData(updateRequest), { headers }
    );
    return data;
  }

  async deleteActivity(activityId: string | number) {
    await apiClient.delete<void>(`activities/${activityId}`);
  }







  // Example: /activities/search?categoryId=9395&locationId=1908612&sort=1&date=2024-01-05
  // async getActivitiesBySearch(params: requestParams) {
  //   const { data } = await apiClient.get<ActivitiesResponse>('/activities/search', { params });
  //   return data;
  // }




  async deleteUser(id: string | number) {
    await apiClient.delete<void>(`/users/${id}`);
  }

  async getActivityParticipants(params: ParticipantsParams) {
    const { data } = await apiClient.get<PaginateResponse<Participant>>(
      'participants',
      { params }
    );
    return data;
  }

  async createActivityParticipant(participant: FormData) {
    const { data } = await apiClient.post<ParticipantResponse>(
      'participants', participant,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  };

  async updateParticipant(params: ParticipantUpdateParams, updateRequest: ParticipantUpdateRequest) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const { data } = await apiClient.patch<Participant>(
      `participants/${params.activityId}_${params.userId}`, objToFormData(updateRequest), { headers }
    );
    return data;
  }

  async deleteActivityParticipant(params: any) {
    const { activityId, userId } = params;
    const url = `participants/${activityId}_${userId}`;
    // const { data } = await axios.delete(`${API_URL}/participants`, { params });
    const { data } = await apiClient.delete(url);
    return data;
  };


}

const activitiesApi = new ActivitiesApi();
export default activitiesApi;