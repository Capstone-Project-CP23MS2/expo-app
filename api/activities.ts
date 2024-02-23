import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { requestParams, Activity, Participant, ActivitiesResponse, ParticipantsResponse } from './type';
const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;


export const getActivities = async (params: requestParams): Promise<ActivitiesResponse> => {
  const { data } = await axios.get(`${API_URL}/activities`, { params });
  return data;
};

export const getActivity = async (id: string | string[]): Promise<Activity> => {
  const { data } = await axios.get(`${API_URL}/activities/${id}`,);
  return data;
};


export const createActivity = async (activity: FormData): Promise<Activity> => {
  const { data } = await axios.post(`${API_URL}/activities`, activity, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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

export const deleteActivity = async (id: string): Promise<any> => {
  const { data } = await axios.delete(`${API_URL}/activities/${id}`);
  return data;
};

export const getActivityParticipants = async (activityId: string | string[]): Promise<ParticipantsResponse> => {
  const { data } = await axios.get(`${API_URL}/participants`, { params: { activityId: activityId } });
  return data;
};

//TODO: ย้าย Formdata มาที่นี่ทั้งหมด
type ParticipantRequestBody = {
  userId: string;
  activityId: string;
  status?: string;
};
export const createParticipant = async (participant: FormData): Promise<Participant> => {
  const { data } = await axios.post(`${API_URL}/participants`, participant, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// export const updateParticipant = async (id: string, participant: ParticipantRequestBody): Promise<Participant> => {
//     const { data } = await axios.put(`${API_URL}/participants/${id}`, participant);
//     return data;
// };  

export const deleteParticipant = async (params: any): Promise<any> => {
  const { activityId, userId } = params;
  // const { data } = await axios.delete(`${API_URL}/participants`, { params });
  const { data } = await axios.delete(`${API_URL}/participants/${activityId}_${userId}`,);
  return data;
};