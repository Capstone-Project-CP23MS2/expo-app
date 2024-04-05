
import { PaginateResponse, UserUpdateRequest } from "../type";
import apiClient from "../apiClient";
import { objToFormData } from "@/utils";
import { User, UserInterestCreateRequest } from './users.type';
import { AxiosRequestConfig } from "axios";

class UsersApi {

  async getUsers() {
    const { data } = await apiClient.get<PaginateResponse<User>>('/users/', { params: { pageSize: 100 } });
    return data;
  }

  async getUserById(id: number | string) {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
  }

  async getMyUserInfo() {
    // const { data } = await apiClient.get<UserResponse>('/users/me');
    const { data } = await apiClient.post<User>('/auth/login');
    return data;
  }

  async getUserByEmail(email: any) {
    const { data } = await apiClient.get<PaginateResponse<User>>('/users', { params: { email } });
    return data;
  }

  async updateUser({ userId, updateRequest }: { userId: number, updateRequest: UserUpdateRequest; }) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const { data } = await apiClient.patch<User>(
      `users/${userId}`, objToFormData(updateRequest), { headers }
    );
    return data;
  }

  async createUser(users: FormData) {
    const { data: user } = await apiClient.post<User>('/users', users, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // "Content-Type": "application/json"
        // requiresToken: false
      },
    });
    return user;
  }

  async deleteUser(id: string | number) {
    await apiClient.delete(`/users/${id}`);
  }

  async createUserInterest(createRequest: UserInterestCreateRequest) {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    };
    const { data } = await apiClient.post(`/interests/create`, objToFormData(createRequest), config);
    return data;
  }

}


const usersApi = new UsersApi();
export default usersApi;