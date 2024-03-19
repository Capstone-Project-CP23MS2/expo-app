import { useMutation, useQuery } from "@tanstack/react-query";
import { CategoryResponse, CategoriesResponse, requestParams } from "./type";
import apiClient from "./apiClient";
class CategoriesApi {

  async getCategories(params: requestParams) {
    const { data } = await apiClient.get<CategoriesResponse>('/categories', { params });
    return data;
  }

  async getCategoryById(id: string | number | string[] | undefined) {
    const { data } = await apiClient.get<CategoryResponse>(`/categories/${id}`);
    return data;
  }

}
const categoriesApi = new CategoriesApi();
export default categoriesApi;