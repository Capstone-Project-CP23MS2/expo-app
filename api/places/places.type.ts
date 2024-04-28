import { PaginateParams, PaginateResponse } from "../type";

export type PlacesParams = PaginateParams & {

};

export type Place = {
  locationId: number,
  name: string,
  latitude: number,
  longitude: number;
};

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