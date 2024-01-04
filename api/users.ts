import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";


interface UserResponse {
    content: any[];
    number: number;
    size: number;
    totalPages: number;
    numberOfElements: number;
    totalElements: number;
    last: boolean;
    first: boolean;
}
const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;

export const getUsers = async (): Promise<UserResponse> => {
    const { data } = await axios.get(`${API_URL}/users`, { params: { pageSize: 100 } });
    return data;
};

export const UseGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });
};