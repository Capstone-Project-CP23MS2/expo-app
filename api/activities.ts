import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { requestParams, ActivityResponse, ActivitiesResponse, ParticipantResponse, ParticipantsResponse } from './type';
import apiClient from "./apiClient";
const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;

export async function getActivities(params: requestParams) {
  const url = `${API_URL}/activities`;
  const { data } = await apiClient.get<ActivitiesResponse>(url, { params });
  return data;
};

export async function getActivity(id: string | string[]) {
  const url = `${API_URL}/activities/${id}`;
  const { data } = await apiClient.get<ActivityResponse>(url);
  return data;
};

export async function createActivity(activity: FormData) {
  const url = `${API_URL}/activities`;
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const { data } = await apiClient.post<ActivityResponse>(
    url, activity, { headers }
  );
  return data;
};


// export const updateActivity = async (id: number, activity: FormData): Promise<Activity> => {
//     const { data } = await axios.put(`${API_URL}/activities/${id}`, activity, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     });
//     return data;
// }

// export const UseUpdateActivity = () => {
//     return useMutation({
//         mutationKey: ['updateActivity'],
//         mutationFn: updateActivity,
//         onSuccess: () => {

//         },
//         onError: () => {

//         }
//     });
// };

export async function deleteActivity(activityId: string | number): Promise<any> {
  const url = `${API_URL}/activities/${activityId}`;
  await axios.delete(url);
};

export async function getActivityParticipants(activityId: string | string[]) {
  const url = `${API_URL}/participants`;
  const { data } = await axios.get<ParticipantsResponse>(
    url,
    { params: { activityId: activityId } }
  );
  return data;
};

//TODO: ย้าย Formdata มาที่นี่ทั้งหมด
type ParticipantRequestBody = {
  userId: string;
  activityId: string;
  status?: string;
};
export async function createParticipant(participant: FormData) {
  const url = `${API_URL}/participants`;
  const { data } = await axios.post<ParticipantResponse>(
    url, participant,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};

// export const updateParticipant = async (id: string, participant: ParticipantRequestBody): Promise<Participant> => {
//     const { data } = await axios.put(`${API_URL}/participants/${id}`, participant);
//     return data;
// };  

export async function deleteParticipant(params: any): Promise<any> {
  const { activityId, userId } = params;
  const url = `${API_URL}/participants/${activityId}_${userId}`;
  // const { data } = await axios.delete(`${API_URL}/participants`, { params });
  const { data } = await axios.delete(url);
  return data;
};