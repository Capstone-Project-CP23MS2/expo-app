export type APIPaginationResponse<Data extends object> = {
  content: Data[]
  number: number
  size: number
  totalPages: number
  numberOfElements: number
  totalElements: number
  last: boolean
  first: boolean
}

export type requestParams =
  | {
      page?: number
      pageSize?: number
      sortBy?: string
      categoryIds?: string
      title?: string
      place?: string
    }
  | {}

type ActivitiesSortBy = 'activityId' | 'createdAt' | 'dateTime' | 'noOfMembers' | 'title';

export type ActivitiesRequestParams = {
  page?: number;
  pageSize?: number;
  sortBy?: ActivitiesSortBy;
  categoryIds?: Array<number>;
  //TODO: change name later
  title?: string;
};

// Activity
export type ActivityResponse = {
  activityId: number
  hostUserId: number
  categoryId: number
  title: string
  description: string
  location: Place
  dateTime: string
  duration: number
  createdAt: string
  updatedAt: string
  noOfMembers: number
  categoryName?: string
}

type Place = {
  locationId: number
  name: string
  latitude: number
  longitude: number
}

export type ActivitiesResponse = APIPaginationResponse<ActivityResponse>

export type ActivityUpdateRequest = {
  categoryId?: number
  title?: string
  description?: string
  place?: string
  dateTime?: string
  duration?: number
  noOfMembers?: number
}

export type ParticipantResponse = {
  userId: number
  username: string
  activityId: number
  status: string
  joinedAt: string
}
export type ParticipantsResponse = APIPaginationResponse<ParticipantResponse>

// Category
export type CategoryResponse = {
  categoryId: number
  name: string
  description: string
}

export type CategoriesResponse = APIPaginationResponse<CategoryResponse>

// User
export type Gender = 'Male' | 'Female' | 'Other' | 'NotApplicable' | 'Unknown'
export type UserResponse = {
  userId: number
  username: string
  email: string
  role: string
  profilePicture: string
  gender: Gender
  dateOfBirth: string
  phoneNumber: string
  lineId: string
  lastLogin: string
  registrationDate: string
}

export type NewUser = {
  username: string
  email: string
  role: string //?
  gender: Gender
  dateOfBirth: string
  phoneNumber: string
}

// export type UserResponse = User & { registrationDate: string; };

export type UsersResponse = APIPaginationResponse<UserResponse>

// Notification
export type NotificationResponse = {
  notificationId: number
  targetId: number
  unRead: boolean
  type: string
  message: string
  createdAt: string
}

export type NotificationsResponse = APIPaginationResponse<NotificationResponse>

export type NotificationUpdateRequest = {
  unRead?: boolean
}
