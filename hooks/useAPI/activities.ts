import activitiesApi from "@/api/activities";
import { requestParams } from "@/api/type";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function UseGetActivities(params: requestParams) {
  return useQuery({
    queryKey: ['activities'],
    queryFn: () => activitiesApi.getActivities(params),
    // refetchInterval: 1000, // 1 second
  });
};

export function UseGetActivity(activityId: string | string[]) {
  return useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => activitiesApi.getActivityById(activityId),
  });
};

export function UseCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['activities'],
    mutationFn: activitiesApi.createActivity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

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
    // mutationKey: ['activityParticipants'],
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
