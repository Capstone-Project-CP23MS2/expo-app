import { UserResponse, UsersResponse } from "./type";
import apiClient from "./apiClient";

const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;

export const getUsers = async (): Promise<UsersResponse> => {
    const { data } = await apiClient.get('/users', { params: { pageSize: 100 } });
    return data;
};


export const getUser = async (id: string) => {
    const { data } = await apiClient.get<UserResponse>(`${API_URL}/users/${id}`);
    return data;
};


export const getUserByEmail = async (email: any): Promise<UsersResponse> => {
    const { data } = await apiClient.get<UsersResponse>('/users', { params: { email } });
    return data;
};

// export const getUserByEmail = async (email: any): Promise<User> => {
//     const { data } = await apiClient.get(`${API_URL}/users/getByEmail/${email}`);
//     return data;
// };


export const createUser = async (users: FormData) => {
    const { data } = await apiClient.post<UserResponse>('/users', users, {
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

class UsersApi {

    async getUsers() {
        const { data } = await apiClient.get<UsersResponse>('/users/', { params: { pageSize: 100 } });
        return data;
    }

    async getUserById(id: string) {
        const { data } = await apiClient.get<UserResponse>(`/users/${id}`);
        return data;
    }

    async getMyUserInfo() {
        // const { data } = await apiClient.get<UserResponse>('/users/me');
        const { data } = await apiClient.post<UserResponse>('/auth/login');
        return data;
    }

    async getUserByEmail(email: any) {
        const { data } = await apiClient.get<UsersResponse>('/users', { params: { email } });
        return data;
    }

    async createUser(users: FormData) {
        const { data } = await apiClient.post<UserResponse>('/users', users, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // "Content-Type": "application/json"
                // requiresToken: false
            },
        });
        return data;
    }
    async deleteUser(id: string | number) {
        await apiClient.delete(`/users/${id}`);
    }
}
const usersApi = new UsersApi();
export default usersApi;