import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { PaginateResponse } from "../type";
import { Place, PlacesParams } from "./places.type";
class PlacesApi {

  async getPlaces(params = {} as PlacesParams) {
    const { data } = await apiClient.get<PaginateResponse<Place>>('/locations', { params });
    return data;
  }

  // async getPlaceById(id: string | number | string[] | undefined) {
  //   const { data } = await apiClient.get<PlacesResponseBody>(`/locations/${id}`);
  //   return data;
  // }

}

const placesApi = new PlacesApi();
export default placesApi;


