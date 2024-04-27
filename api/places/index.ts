import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { APIPaginationResponse } from "../type";
import { PlacesParams, PlacesRequestParameters, PlacesResponseBody } from "./places.type";
class PlacesApi {

  async getPlaces(params = {} as PlacesParams) {
    const { data } = await apiClient.get<PlacesResponseBody>('/locations', { params });
    return data;
  }

  // async getPlaceById(id: string | number | string[] | undefined) {
  //   const { data } = await apiClient.get<PlacesResponseBody>(`/locations/${id}`);
  //   return data;
  // }

}

const placesApi = new PlacesApi();
export default placesApi;


