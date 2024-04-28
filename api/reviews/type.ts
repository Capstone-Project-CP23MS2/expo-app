import { PaginateParams } from "../type";

export type ReviewUser = {
  reviewId: number;
  userReviewed: {
    userId: number;
    username: string;
  };
  reviewer: {
    userId: number;
    username: string;
  };
  comment: string;
  createdAt: string;
};

export type ReviewsUserParams = PaginateParams & {
  userId?: number;
};