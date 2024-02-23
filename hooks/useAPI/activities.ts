import { createActivity, createParticipant, deleteActivity, deleteParticipant, getActivities, getActivity, getActivityParticipants } from "@/api/activities";
import { requestParams } from "@/api/type";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UseGetActivities = (params: requestParams) => {
  return useQuery({
    queryKey: ['activities'],
    queryFn: () => getActivities(params),
    // refetchInterval: 1000, // 1 second
  });
};

export const UseGetActivity = (activityId: string | string[]) => {
  return useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => getActivity(activityId),
    // queryFn: ({ queryKey }) => getActivity(queryKey[1]),
  });

};

export const UseCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['activities'],
    mutationFn: createActivity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

export function UseDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
}

export const UseGetActivityParticipants = (activityId: string | string[]) => {
  return useQuery({
    queryKey: ['activityParticipants', activityId],
    queryFn: () => getActivityParticipants(activityId),
  });
};

export const UseCreateParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationKey: ['activityParticipants'],
    mutationFn: createParticipant,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['activityParticipants', String(data.activityId)] });
    },
  });
};

export function UseDeleteParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteParticipant,
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['activityParticipants', String(variables.activityId)] });
    },
  });
}
