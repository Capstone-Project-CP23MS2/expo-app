import usersApi from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function UseCreateUserInterests() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.createUserInterest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });
};
