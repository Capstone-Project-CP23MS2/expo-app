import { set } from 'react-hook-form';
import activitiesApi from "@/api/activities";
import { ActivitiesResponse, ActivityResponse, ActivityUpdateRequest, PaginateResponse } from "@/api/type";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeObjectFromArrayById } from "@/utils";
import { UseGetMyUserInfo } from "./users";
import { ActivitiesParams, ActivitiesParamsDateStatus, AttendanceStatus, GetActivitiesByLocationParams, ParticipantUpdateParams, ParticipantUpdateRequest, ParticipantsParams, RSVPStatus } from "@/api/activities/type";
import { useCallback, useState } from 'react';
import { useDebounce } from '@/modules/explore/hooks/useDebounce';

//default option
// const getNextPageParam = useCallback((lastPage: PaginateResponse<object>) => {
//   return lastPage.last ? undefined : lastPage.number + 1;
// }, []);

type UseGetActivitiesType = 'all' | 'my-activities' | 'joined-activities' | 'past-activities' | undefined;
export function UseGetActivities(params = {} as ActivitiesParams, type: UseGetActivitiesType = undefined) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateStatus, setDateStatus] = useState<ActivitiesParamsDateStatus | undefined>(params.dateStatus);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  console.log(params);
  console.log({
    ...params,
    title: searchQuery ? searchQuery : undefined,
    categoryIds: selectedCategoryIds.length ? selectedCategoryIds : undefined,
    dateStatus: dateStatus ? dateStatus : undefined,
  });

  const query = useInfiniteQuery({
    queryKey: ['activities', type, debouncedSearchQuery, selectedCategoryIds, dateStatus],
    queryFn: ({ pageParam }) => activitiesApi.getActivities({
      ...params,
      page: pageParam,
      title: searchQuery ? searchQuery : undefined,
      categoryIds: selectedCategoryIds.length ? selectedCategoryIds : undefined,
      dateStatus: dateStatus ? dateStatus : undefined,
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    select: (data) => {
      const activities = data.pages.flatMap(page => page.content);
      return { activities, ...data };
    }
  });

  return {
    ...query,
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    selectedCategoryIds,
    setSelectedCategoryIds,
    dateStatus,
    setDateStatus
  };
}

//TODO: รอ backend
// export function UseGetActivitiesByPlaceId(params = { pageSize: 50, } as ActivitiesParams,) {
//   return useQuery({
//     queryKey: ['activities', 'place', params.placeId],
//     queryFn: () => activitiesApi.getActivities(params),
//     select: (data) => {
//       const { content, ...paginationData } = data;
//       return { activities: content, paginationData };
//     },
//   });
// };


export function UseGetActivitiesByLocation(params = {} as GetActivitiesByLocationParams) {
  return useQuery({
    queryKey: ['activities', 'user-location'],
    queryFn: () => activitiesApi.getActivitiesByLocation(params),
  });
};


export function UseGetMyActivities(params = { pageSize: 50 } as ActivitiesParams) {
  const { data: user } = UseGetMyUserInfo();

  return useQuery({
    queryKey: ['activities', 'my-activities'],
    queryFn: () => activitiesApi.getActivities({ ...params, hostId: user?.userId, }),
    select: (data) => {
      const { content, ...paginationData } = data;
      return { activities: content, paginationData };
    },
  });
};

export function UseGetJoinedActivities(params = { pageSize: 50 } as ActivitiesParams) {
  const { data: user } = UseGetMyUserInfo();

  return useQuery({
    queryKey: ['activities', 'my-activities'],
    queryFn: () => activitiesApi.getActivities({ ...params, userId: user?.userId, }),
    select: (data) => {
      const { content, ...paginationData } = data;
      return { activities: content, paginationData };
    },
  });
};

// TODO: https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query
// https://tanstack.com/query/latest/docs/framework/react/guides/initial-query-data
// https://tanstack.com/query/latest/docs/framework/react/guides/placeholder-query-data
export function UseGetActivity(activityId: number | string | string[]) {
  return useQuery({
    queryKey: ['activities', Number(activityId)],
    queryFn: () => activitiesApi.getActivityById(activityId),
  });
};


export function UseCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createActivity'],
    mutationFn: activitiesApi.createActivity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

export function UseUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateActivity'],
    mutationFn: ({
      activityId, updateRequest
    }: {
      activityId: number, updateRequest: ActivityUpdateRequest;
    }) => activitiesApi.updateActivity(activityId, updateRequest),

    onSuccess: async (activity) => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}

export function UseDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteActivity'],
    mutationFn: (activityId: string) => activitiesApi.deleteActivity(activityId),
    onSuccess: async (data, activityId) => {
      // await queryClient.setQueryData(['activities'], (oldData: ActivitiesResponse) => ({
      //   ...oldData,
      //   content: removeObjectFromArrayById(oldData.content, Number(activityId), 'activityId')
      // }));
      await queryClient.invalidateQueries({ queryKey: ['activities'], type: 'all' });
      // queryClient.setQueriesData(
      //   { queryKey: ['activities'], type: 'all' },
      //   (oldData: ActivitiesResponse) => ({
      //     ...oldData,
      //     content: removeObjectFromArrayById(oldData.content, Number(activityId), 'activityId')
      //   }));
    },
  });
}


export function UseGetActivityParticipants(params = {} as ParticipantsParams) {
  const [selectedAttendanceStatus, setSelectedAttendanceStatus] = useState<AttendanceStatus | undefined>(undefined);
  const [selectedRSVPStatus, setSelectedRSVPStatus] = useState<RSVPStatus | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const query = useInfiniteQuery({
    queryKey: ['activity-participants', params.activityId, selectedRSVPStatus],
    queryFn: ({ pageParam }) => activitiesApi.getActivityParticipants({
      ...params,
      page: pageParam,
      status: selectedAttendanceStatus,
      rsvpStatus: selectedRSVPStatus,
    }),
    enabled: !!params.activityId,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    select: (data) => {
      const participants = data.pages.flatMap(page => page.content);
      return { participants, ...data };
    },
  });

  return {
    ...query,
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    selectedAttendanceStatus,
    setSelectedAttendanceStatus,
    selectedRSVPStatus, setSelectedRSVPStatus
  };
}

export function UseGetParticipant(activityId: number, userId: number, isParticipant = false) {
  return useQuery({
    queryKey: ['activity-participants', Number(activityId), Number(userId),],
    queryFn: () => activitiesApi.getActivityParticipants({ activityId, userId }),
    enabled: isParticipant,
    select: (data) => {
      return data.content[0];
    },
    // select: (data) => {
    //   const { content, ...paginationData } = data;
    //   return { activities: content, paginationData };
    // },
  });
};

export function UseCreateParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createActivityParticipant'],
    mutationFn: activitiesApi.createActivityParticipant,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['activity-participants', Number(data.activityId)] });
      await queryClient.invalidateQueries({ queryKey: ["activities", Number(data.activityId)] });
    },
  });
};

export function UseUpdateParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateActivityParticipant'],
    mutationFn: ({
      params, updateRequest
    }: {
      params: ParticipantUpdateParams, updateRequest: ParticipantUpdateRequest;
    }) => activitiesApi.updateParticipant(params, updateRequest),

    onSuccess: async (activity) => {
      await queryClient.invalidateQueries({ queryKey: ['activity-participants', Number(activity.activityId)] });
      await queryClient.invalidateQueries({ queryKey: ["activities", Number(activity.activityId)] });
    },
  });
}

export function UseDeleteParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activitiesApi.deleteActivityParticipant,
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['activity-participants', Number(variables.activityId)] });
      await queryClient.invalidateQueries({ queryKey: ["activities", Number(variables.activityId)] });

    },
  });
}
