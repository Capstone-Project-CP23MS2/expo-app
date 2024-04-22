import activitiesApi from "@/api/activities";
import { ActivitiesResponse, ActivityResponse, ActivityUpdateRequest, requestParams } from "@/api/type";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeObjectFromArrayById } from "@/utils";
import { UseGetMyUserInfo } from "./users";
import { ActivitiesParams, GetActivitiesByLocationParams } from "@/api/activities/type";


type UseGetActivitiesType = 'all' | 'my-activities' | 'joined-activities' | 'past-activities' | undefined;
export function UseGetActivities(params = { pageSize: 50 } as ActivitiesParams, type: UseGetActivitiesType = undefined) {
  return useQuery({
    queryKey: ['activities', type],
    queryFn: () => activitiesApi.getActivities(params),
    select: (data) => {
      const { content, ...paginationData } = data;
      return { activities: content, paginationData };
    },
  });
};

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
      queryClient.setQueryData(['activities'], (oldData: ActivitiesResponse) => ({
        ...oldData,
        content: removeObjectFromArrayById(oldData.content, Number(activityId), 'activityId')
      }));
    },
  });
}

export function UseGetActivityParticipants(activityId: string | string[]) {
  return useQuery({
    queryKey: ['activityParticipants', activityId],
    queryFn: () => activitiesApi.getActivityParticipants(activityId),
    enabled: !!activityId,
  });
};

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
