import { APIPaginationResponse } from "../type";

export type PlacesRequestParameters = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
};

export type Place = {
  locationId: number,
  name: string,
  latitude: number,
  longitude: number;
};

export type PlacesResponseBody = APIPaginationResponse<Place>;

// export type PlacesRequestParameters = PlaceRequestParameters;