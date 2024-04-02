import { APIPaginationResponse } from "../type";

export type PlaceRequestParameters = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
};

export type PlaceResponseBody = {
  locationId: number,
  name: string,
  latitude: number,
  longitude: number;
};

export type PlacesResponseBody = APIPaginationResponse<PlaceResponseBody>;
