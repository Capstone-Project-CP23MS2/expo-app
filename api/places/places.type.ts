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

export type PlacesParams = PlacesRequestParameters;
//TODO:
// export type ActivitiesParams = PaginateParams & {
//   sortBy?: ActivitiesSortBy;
//   categoryIds?: number[];
//   title?: string;
//   hostId?: number;
//   userId?: number;
//   dateStatus?: ActivitiesParamsDateStatus;
//   date?: string;
// };