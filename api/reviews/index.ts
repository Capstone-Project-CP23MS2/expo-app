import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { PaginateResponse } from "../type";
import { ReviewUser, ReviewsUserParams } from "./type";
class ReviewsApi {

  async getReviewsUserByUserId(params: ReviewsUserParams) {
    const { data } = await apiClient.get<PaginateResponse<ReviewUser>>(`/reviews_users`, { params });
    return data;
  }

}

const reviewsApi = new ReviewsApi();
export default reviewsApi;


