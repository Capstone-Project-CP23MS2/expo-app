import { CategoryResponse, CategoriesResponse, requestParams } from './type';
import apiClient from './apiClient';

type Interests = {
  userId: number;
  categoryId: number;
  email: "string";
  categoryName: "string";

};

class InterestsApi {
  async getInterests() {
    const { data } = await apiClient.get<CategoriesResponse>('/interests');
    return data;
  }


  async getCategories() {
    const { data } = await apiClient.get<CategoriesResponse>('/categories');
    return data;
  }

  async getCategoryById(id: string | number | string[] | undefined) {
    const { data } = await apiClient.get<CategoryResponse>(`/categories/${id}`);
    return data;
  }
}
const interestsApi = new InterestsApi();
export default interestsApi;
