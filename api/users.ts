import { UserResponse, UsersResponse } from "./type";
import apiClient from "./apiClient";

const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;

export const getUsers = async (): Promise<UsersResponse> => {
    const { data } = await apiClient.get(`${API_URL}/users`, { params: { pageSize: 100 } });
    return data;
};


export const getUser = async (id: string) => {
    const { data } = await apiClient.get<UserResponse>(`${API_URL}/users/${id}`);
    return data;
};


export const getUserByEmail = async (email: any): Promise<UsersResponse> => {
    const { data } = await apiClient.get<UsersResponse>(`${API_URL}/users`, { params: { email } });
    return data;
};

// export const getUserByEmail = async (email: any): Promise<User> => {
//     const { data } = await apiClient.get(`${API_URL}/users/getByEmail/${email}`);
//     return data;
// };


export const createUser = async (users: FormData) => {
    const { data } = await apiClient.post<UserResponse>(`${API_URL}/users`, users, {
        headers: {
            'Content-Type': 'multipart/form-data',
            // "Content-Type": "application/json"
        },
    });
    return data;
};

export const deleteUser = async (id: string | number): Promise<any> => {
    const url = `${API_URL}/users/${id}`;
    await apiClient.delete(url);
};
