export type PaginateResponse<T extends object> = {
  content: T[];
  number: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  last: boolean;
  first: boolean;
};

export type PaginateParams = {
  page?: number;
  pageSize?: number;
};

// Activity
export type ActivityResponse = {
  activityId: number;
  hostUserId: number;
  categoryId: number;
  title: string;
  description: string;
  location: Place;
  dateTime: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  noOfMembers: number;
  categoryName?: string;
  users: {
    userId: number;
    username: string;
    email: string;
  }[];
};

type Place = {
  locationId: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type ActivitiesResponse = PaginateResponse<ActivityResponse>;

export type ActivityUpdateRequest = {
  categoryId?: number;
  title?: string;
  description?: string;
  place?: string;
  dateTime?: string;
  duration?: number;
  noOfMembers?: number;
};

export type ParticipantResponse = {
  userId: number;
  username: string;
  activityId: number;
  status: string;
  joinedAt: string;
};
export type ParticipantsResponse = PaginateResponse<ParticipantResponse>;

// Category
export type CategoryResponse = {
  categoryId: number;
  name: string;
  description: string;
};

export type CategoriesResponse = PaginateResponse<CategoryResponse>;

// User
export type Gender = 'Male' | 'Female' | 'Other' | 'NotApplicable' | 'Unknown';
export type UserResponse = {
  userId: number;
  username: string;
  email: string;
  role: string;
  profilePicture: string;
  gender: Gender;
  dateOfBirth: string;
  phoneNumber: string;
  lineId: string;
  lastLogin: string;
  registrationDate: string;
};

export type NewUser = {
  username: string;
  email: string;
  role: string; //?
  gender: Gender;
  dateOfBirth: string;
  phoneNumber: string;
};

export type UserUpdateRequest = {
  username?: string;
  // profilePicture?: string;
  gender?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  lineId?: string;
  // userInterests?: number[];
};

// export type UserResponse = User & { registrationDate: string; };

export type UsersResponse = PaginateResponse<UserResponse>;

// Notification
export type NotificationResponse = {
  notificationId: number;
  targetId: number;
  unRead: boolean;
  type: string;
  message: string;
  createdAt: string;
};

export type NotificationsResponse = PaginateResponse<NotificationResponse>;

export type NotificationUpdateRequest = {
  unRead?: boolean;
};
