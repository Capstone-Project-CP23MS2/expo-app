import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User, UsersResponse } from "./type";

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

export const getUser = async (id: string): Promise<UsersResponse> => {
    const { data } = await axios.get(`${API_URL}/users/${id}`);
    return data;
};

export const UseGetUser = (userId: any) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUser(userId),
    });
};

export const getUserByEmail = async (email: any): Promise<UsersResponse> => {
    const { data } = await axios.get(`${API_URL}/users`, { params: { email } });
    return data;
};

// export const getUserByEmail = async (email: any): Promise<User> => {
//     const { data } = await axios.get(`${API_URL}/users/getByEmail/${email}`);
//     return data;
// };
export const UseGetUserByEmail = (email: any) => {
    return useQuery({
        queryKey: ['user', email],
        queryFn: () => getUserByEmail(email),
    });
};

export const postUser = async (users: FormData): Promise<any> => {
    const { data } = await axios.post(`${API_URL}/users`, users, {
        headers: {
            'Content-Type': 'multipart/form-data',
            // "Content-Type": "application/json"
        },
    });
    return data;
};

export const UseCreateUser = () => {
    return useMutation({
        mutationKey: ['createUser'],
        mutationFn: postUser,
        onSuccess: () => {

        },
        onError: () => {

        }
    });
};