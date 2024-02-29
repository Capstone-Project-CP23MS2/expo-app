import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, deleteUser, getUser, getUserByEmail, getUsers } from '@/api/users';

export function UseGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });
};

export function UseGetUser(userId: any) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUser(userId),
    });
};

export function UseGetUserByEmail(email: any) {
    return useQuery({
        queryKey: ['user', email],
        queryFn: () => getUserByEmail(email),
    });
};

export function UseCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['users'],
        mutationFn: createUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export function UseDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}