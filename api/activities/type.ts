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

export type ActivitiesParamsDateStatus = 'all' | 'upcoming' | 'past';
export type ActivitiesParams = PaginateParams & {
  sortBy?: ActivitiesSortBy;
  categoryIds?: number[];
  title?: string; //TODO: change name later
  hostId?: number;
  userId?: number;
  dateStatus?: ActivitiesParamsDateStatus;
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

export type AttendanceStatus = 'arrived' | 'not_arrived' | 'waiting' | 'none';
export type RSVPStatus = 'going' | 'interesting' | 'unconfirmed';

export type Participant = {
  userId: number;
  username: string;
  activityId: number;
  status: AttendanceStatus;
  rsvpStatus: RSVPStatus;
  joinedAt: string;
};

export type ParticipantsParams = PaginateParams & {
  activityId?: number;
  userId?: number;
  status?: AttendanceStatus;
  rsvpStatus?: RSVPStatus;
};