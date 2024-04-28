import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import reviewsApi from "@/api/reviews";
import { ReviewsUserParams } from "@/api/reviews/type";

export function UseGetReviewsUserByUserId(params: ReviewsUserParams) {

  const query = useInfiniteQuery({
    queryKey: ['reviews_users', params.userId],
    queryFn: ({ pageParam }) => reviewsApi.getReviewsUserByUserId({
      ...params, page: pageParam,
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    select: (data) => {
      const reviews = data.pages.flatMap(page => page.content);
      return { reviews, ...data };
    }
  });
  return { ...query };
};
