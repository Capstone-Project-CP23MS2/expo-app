export type ApiPaginationResponse<Data extends object> = {
    content: Data[];
    number: number;
    size: number;
    totalPages: number;
    numberOfElements: number;
    totalElements: number;
    last: boolean;
    first: boolean;
};

export type requestParams = {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    categoryIds?: string;
    title?: string;
    place?: string;
} | {};

// Activity
export type Activity = {
    activityId: number;
    hostUserId: number;
    categoryId: number;
    title: string;
    description: string;
    place: string;
    dateTime: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
    noOfMembers: number;
};

export type Participant = {
    userId: number;
    username: string;
    activityId: number;
    status: string;
    joinedAt: string;
};

export type ActivitiesResponse = ApiPaginationResponse<Activity>;
export type ParticipantsResponse = ApiPaginationResponse<Participant>;

// Category
export type Category = {
    categoryId: number;
    name: string;
    description: string;
};

export type CategoriesResponse = ApiPaginationResponse<Category>;

// User
export type Gender = "Male" | "Female" | "Other" | "NotApplicable" | "Unknown";

export type User = {
    userId: number,
    username: string,
    email: string,
    role: string,
    profilePicture: string,
    gender: Gender,
    dateOfBirth: string,
    phoneNumber: string,
    lineId: string,
    lastLogin: string;
    registrationDate: string;
};

export type NewUser = {
    username: string,
    email: string,
    role: string, //?
    gender: Gender,
    dateOfBirth: string,
    phoneNumber: string,
};

// export type UserResponse = User & { registrationDate: string; };

export type UsersResponse = ApiPaginationResponse<User>;