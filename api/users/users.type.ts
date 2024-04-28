import { Category } from "../categories/categories.type";
import { Place } from "../places/places.type";

export type UserInterestCreateRequest = {
  userId: number;
  categoryIds: number[];
};

export type Gender = 'Male' | 'Female' | 'Other' | 'NotApplicable' | 'Unknown';

export type UserBase = {
  userId: number;
  username: string;
  email: string;
  role: string;
  profilePicture: string;
  gender: Gender;
  dateOfBirth: string;
  phoneNumber: string;
  lineId: string;
};

export type User = UserBase & {
  lastLogin?: string;
  registrationDate?: string;
  userInterests?: UserInterest[];
  location?: Place;
  locationId?: number;
};

export type UserInterest = Category & {};