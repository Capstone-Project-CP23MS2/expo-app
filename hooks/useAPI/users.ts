import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import usersApi, { createUser, deleteUser, getUser, getUserByEmail, getUsers } from '@/api/users';

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

export function UseGetMyUserInfo() {
    return useQuery({
        queryKey: ['user-info'],
        queryFn: () => usersApi.getMyUserInfo(),
    });
};


export function UseCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: usersApi.createUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["user-info"], type: 'all' });
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

// export function UseSignInUser(userId: any) {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: usersApi.createUser,
//         onSuccess: async () => {
//             await queryClient.invalidateQueries({ queryKey: ["user-info"], type: 'all' });
//         },
//     });
// };
