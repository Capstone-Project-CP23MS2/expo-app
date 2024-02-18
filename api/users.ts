import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UsersResponse } from "./type";

const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;

export const getUsers = async (): Promise<UsersResponse> => {
    const { data } = await axios.get(`${API_URL}/users`, { params: { pageSize: 100 } });
    return data;
};

export const UseGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });
};

export const createUser = async (users: FormData): Promise<UsersResponse> => {
    const { data } = await axios.post(`${API_URL}/users`, users, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export const UseCreateUser = () => {
    return useMutation({
        mutationKey: ['createUser'],
        mutationFn: createUser,
        onSuccess: () => {

        },
        onError: () => {

        }
    });
};