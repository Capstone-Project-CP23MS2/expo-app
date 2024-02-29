import { useMutation, useQuery } from "@tanstack/react-query";
import { CategoryResponse, CategoriesResponse } from "./type";
import apiClient from "./apiClient";

const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;

export const getCategories = async (): Promise<CategoriesResponse> => {
    const { data } = await apiClient.get<CategoriesResponse>(`${API_URL}/categories`, { params: { pageSize: 100 } });
    return data;
};

export const getCategory = async (id: string | number | string[] | undefined): Promise<CategoryResponse> => {
    const { data } = await apiClient.get(`${API_URL}/categories/${id}`);
    return data;
};
