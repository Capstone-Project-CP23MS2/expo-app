import { useMutation, useQuery } from '@tanstack/react-query';
import { PaginateResponse } from '../type';
import apiClient from '../apiClient';
import { Category, CategoriesParams } from './categories.type';

class CategoriesApi {
  async getCategories(params: CategoriesParams) {
    const { data } = await apiClient.get<PaginateResponse<Category>>('/categories', { params });
    return data;
  }

  async getCategoryById(id: string | number | string[]) {
    const { data } = await apiClient.get<Category>(`/categories/${id}`);
    return data;
  }
}

const categoriesApi = new CategoriesApi();
export default categoriesApi;
