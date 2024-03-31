export type UserInterestCreateRequest = {
  userId: number;
  categoryIds: number[];
};

export type Gender = 'Male' | 'Female' | 'Other' | 'NotApplicable' | 'Unknown';

export type UserInfoResponse = {
  userId: number;
  username: string;
  email: string;
  role: string;
  profilePicture: string;
  gender: Gender;
  dateOfBirth: string;
  phoneNumber: string;
  lineId: string;
  userInterests: number[];
  lastLogin: string;
  registrationDate: string;
};