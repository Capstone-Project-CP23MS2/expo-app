import activitiesApi from "@/api/activities";
import { ActivityUpdateRequest, requestParams } from "@/api/type";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { initialDataAPIPagination } from "./type";

export function UseGetActivities(params = { pageSize: 50 } as ActivitiesRequestParameters) {
  return useQuery({
    queryKey: ['activities'],
    queryFn: () => activitiesApi.getActivities(params),
    select: (data) => {
      const { content, ...paginationData } = data;
      return { activities: content, paginationData };
    },
    initialData: initialDataAPIPagination,
  });
};

type ActivitiesSortBy = 'activityId' | 'createdAt' | 'dateTime' | 'noOfMembers' | 'title';

type ActivitiesRequestParameters = {
  page?: number;
  pageSize?: number;
  sortBy?: ActivitiesSortBy;
  categoryIds?: [number];
  //TODO: change name later
  title?: string;
};

export function UseSearchActivities(params: ActivitiesRequestParameters = {}, test: any = '') {
  console.log('🚚 UseSearchActivities:');
  const { data, ...rest } = useQuery({
    queryKey: ['activities-search'],
    queryFn: () => activitiesApi.getActivities(params),
  });

  const { content: activities, ...paginationData } = data!;
  console.log(activities);

  return { activities, paginationData, ...rest };
};

export function UseGetActivity(activityId: string | string[]) {
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
    mutationFn: activitiesApi.deleteActivity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
}

export function UseGetActivityParticipants(activityId: string | string[]) {
  return useQuery({
    queryKey: ['activityParticipants', activityId],
    queryFn: () => activitiesApi.getActivityParticipants(activityId),
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
