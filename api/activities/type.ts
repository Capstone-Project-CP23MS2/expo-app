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

export type ActivitiesParams = PaginateParams & {
  categoryIds?: number[];
  title?: string;
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
