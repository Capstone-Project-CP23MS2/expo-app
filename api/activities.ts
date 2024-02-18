import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { requestParams, Activity, Participant, ActivitiesResponse, ParticipantsResponse } from './type';
const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;


export const getActivities = async (params: requestParams): Promise<ActivitiesResponse> => {
    const { data } = await axios.get(`${API_URL}/activities`, { params });
    return data;
};

export const UseGetActivities = (params: requestParams) => {
    return useQuery({
        queryKey: ['activities'],
        queryFn: () => getActivities(params),
        // refetchInterval: 1000, // 1 second
    });
};

export const getActivity = async (id: string | string[]): Promise<Activity> => {
    const { data } = await axios.get(`${API_URL}/activities/${id}`,);
    return data;
};

export const UseGetActivity = (activityId: string | string[]) => {
    return useQuery({
        queryKey: ['activity', activityId],
        queryFn: () => getActivity(activityId),
        // queryFn: ({ queryKey }) => getActivity(queryKey[1]),
    });

};

export const createActivity = async (activity: FormData): Promise<Activity> => {
    // const response = await fetch(`${API_URL}/activities`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(activity),
    // });
    // return response.json();
    const { data } = await axios.post(`${API_URL}/activities`, activity, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};
export const UseCreateActivity = () => {
    return useMutation({
        mutationKey: ['createActivity'],
        mutationFn: createActivity,
        onSuccess: () => {

        },
        onError: () => {

        }
    });
};


export const deleteActivity = async (id: number): Promise<any> => {
    const { data } = await axios.delete(`${API_URL}/activities/${id}`);
    return data;
};

export const getActivityParticipants = async (activityId: string | string[]): Promise<ParticipantsResponse> => {
    const { data } = await axios.get(`${API_URL}/participants`, { params: { activityId: activityId } });
    return data;
};

export const UseGetActivityParticipants = (activityId: string | string[]) => {
    return useQuery({
        queryKey: ['activityParticipants', activityId],
        queryFn: () => getActivityParticipants(activityId),
    });
};

export const createParticipant = async (participant: FormData): Promise<Participant> => {
    const { data } = await axios.post(`${API_URL}/participants`, participant, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};