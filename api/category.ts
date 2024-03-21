import { useMutation, useQuery } from "@tanstack/react-query";
import { CategoryResponse, CategoriesResponse, requestParams } from "./type";
import apiClient from "./apiClient";
class CategoriesApi {

  async getCategories() {
    const { data } = await apiClient.get<CategoriesResponse>('/categories');
    return data;
  }

  async getCategoryById(id: string | number | string[] | undefined) {
    const { data } = await apiClient.get<CategoryResponse>(`/categories/${id}`);
    return data;
  }

}
const categoriesApi = new CategoriesApi();
export default categoriesApi;