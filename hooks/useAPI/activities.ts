import { set } from 'react-hook-form';
import activitiesApi from "@/api/activities";
import { ActivitiesResponse, ActivityResponse, ActivityUpdateRequest, PaginateResponse, requestParams } from "@/api/type";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeObjectFromArrayById } from "@/utils";
import { UseGetMyUserInfo } from "./users";
import { ActivitiesParams, AttendanceStatus, GetActivitiesByLocationParams, ParticipantsParams, RSVPStatus } from "@/api/activities/type";
import { useCallback, useState } from 'react';
import { useDebounce } from '@/modules/Explore/hooks/useDebounce';

//default option
// const getNextPageParam = useCallback((lastPage: PaginateResponse<object>) => {
//   return lastPage.last ? undefined : lastPage.number + 1;
// }, []);

type UseGetActivitiesType = 'all' | 'my-activities' | 'joined-activities' | 'past-activities' | undefined;
export function UseGetActivities(params = {} as ActivitiesParams, type: UseGetActivitiesType = undefined) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const query = useInfiniteQuery({
    queryKey: ['activities', type, debouncedSearchQuery, selectedCategoryIds],
    queryFn: ({ pageParam }) => activitiesApi.getActivities({
      ...params,
      page: pageParam,
      title: searchQuery ? searchQuery : undefined,
      categoryIds: selectedCategoryIds.length ? selectedCategoryIds : undefined,
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

//ใช้ initialData 
export function UseSearchActivities(params: ActivitiesParams = {}, test: any = '') {
  console.log('🚚 UseSearchActivities:');
  const { data, ...rest } = useQuery({
    queryKey: ['activities-search'],
    queryFn: () => activitiesApi.getActivities(params),
  });

  const { content: activities, ...paginationData } = data!;
  console.log(activities);

  return { activities, paginationData, ...rest };
};

// TODO: https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query
// https://tanstack.com/query/latest/docs/framework/react/guides/initial-query-data
// https://tanstack.com/query/latest/docs/framework/react/guides/placeholder-query-data
export function UseGetActivity(activityId: number | string | string[]) {
  return useQuery({
    queryKey: ['activities', activityId],
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
      await queryClient.setQueryData(['activities'], (oldData: ActivitiesResponse) => ({
        ...oldData,
        content: removeObjectFromArrayById(oldData.content, Number(activityId), 'activityId')
      }));
    },
  });
}


export function UseGetActivityParticipants(params = {} as ParticipantsParams) {
  const [selectedAttendanceStatus, setSelectedAttendanceStatus] = useState<AttendanceStatus | undefined>(undefined);
  const [selectedRSVPStatus, setSelectedRSVPStatus] = useState<RSVPStatus | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const query = useInfiniteQuery({
    queryKey: ['activities', params.activityId, selectedRSVPStatus],
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

export function UseCreateParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createActivityParticipants'],
    mutationFn: activitiesApi.createActivityParticipant,
    onSuccess: async (data) => {

      await queryClient.invalidateQueries({ queryKey: ['activityParticipants', String(data.activityId)] });
    },
  });
};

export function UseDeleteParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activitiesApi.deleteActivityParticipant,
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['activityParticipants', String(variables.activityId)] });
    },
  });
}
