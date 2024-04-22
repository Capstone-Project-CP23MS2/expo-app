import { Place } from "../places/places.type";
import { PaginateParams } from "../type";

export type Activity = {
  activityId: number;
  hostUserId: number;
  categoryId: number;
  title: string;
  description: string;
  location: Place;
  dateTime: string;
  duration: number;
  noOfMembers: number;
  memberCounts?: number;
  categoryName?: string;
  users: {
    userId: number;
    username: string;
    email: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

type ActivitiesSortBy = 'activityId' | 'createdAt' | 'dateTime' | 'noOfMembers' | 'title';

export type ActivitiesParams = PaginateParams & {
  sortBy?: ActivitiesSortBy;
  categoryIds?: number[];
  title?: string; //TODO: change name later
  hostId?: number;
  userId?: number;
  dateStatus?: 'all' | 'upcoming' | 'past';
  date?: string;
};

export type GetActivitiesByLocationParams = {
  lat: number;
  lng: number;
  radius: number;
};

export type ActivityCreateRequest = {
  hostUserId: number;
  categoryId: number;
  title: string;
  description?: string;
  locationId: number;
  dateTime: string;
  duration: number;
  noOfMembers: number;
};

