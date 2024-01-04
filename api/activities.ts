import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;

type Activity = {
    activityId: number;
    hostUserId: number;
    categoryId: number;
    title: string;
    description: string;
    place: string;
    dateTime: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
    noOfMembers: number;
};
type ApiPaginationResponse<Data extends object> = {
    content: Data[];
    number: number;
    size: number;
    totalPages: number;
    numberOfElements: number;
    totalElements: number;
    last: boolean;
    first: boolean;

};

type ActivityResponse = ApiPaginationResponse<Activity>;
type TestResponse = ApiPaginationResponse<any>;

interface requestParams {
    pageNum: number;
    pageSize: number;
    sortBy: string;
}

export const getActivities = async (): Promise<ActivityResponse> => {
    const { data } = await axios.get(`${API_URL}/activities`, { params: { pageSize: 100 } });
    return data;
};

export const UseGetActivities = () => {
    return useQuery({
        queryKey: ['activities'],
        queryFn: getActivities,
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

export const getActivityParticipants = async (activityId: string | string[]): Promise<TestResponse> => {
    const { data } = await axios.get(`${API_URL}/participants`, { params: { activityId: activityId } });
    return data;
};

export const UseGetActivityParticipants = (activityId: string | string[]) => {
    return useQuery({
        queryKey: ['activityParticipants', activityId],
        queryFn: () => getActivityParticipants(activityId),
    });
};