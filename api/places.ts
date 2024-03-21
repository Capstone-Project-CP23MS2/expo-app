import { useMutation, useQuery } from "@tanstack/react-query";
import { CategoryResponse, CategoriesResponse, requestParams } from "./type";
import apiClient from "./apiClient";
class PlacesApi {

  async getPlaces() {
    const { data } = await apiClient.get<CategoriesResponse>('/locations');
    return data;
  }

  async getPlaceById(id: string | number | string[] | undefined) {
    const { data } = await apiClient.get<CategoryResponse>(`/locations/${id}`);
    return data;
  }

}
const placesApi = new PlacesApi();
export default placesApi;