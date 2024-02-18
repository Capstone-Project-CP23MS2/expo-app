import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CategoriesResponse, Category } from "./type";

const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;

export const getCategories = async (): Promise<CategoriesResponse> => {
    const { data } = await axios.get(`${API_URL}/categories`, { params: { pageSize: 100 } });
    return data;
};

export const UseGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
};

export const getCategory = async (id: string | number | string[] | undefined): Promise<Category> => {
    const { data } = await axios.get(`${API_URL}/categories/${id}`);
    return data;
};

export const UseGetCategory = (id: string | number | string[] | undefined) => {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => getCategory(id),
    });
};