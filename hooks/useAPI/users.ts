import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import usersApi from '@/api/users';
import { UserUpdateRequest } from '@/api/type';

export function UseGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: usersApi.getUsers,
    });
};

export function UseGetUser(userId: any) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => usersApi.getUserById(userId),
    });
};

export function UseGetUserByEmail(email: any) {
    return useQuery({
        queryKey: ['user', email],
        queryFn: () => usersApi.getUserByEmail(email),
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

export function UseUpdateMyUserInfo() {
    const queryClient = useQueryClient();

    return useMutation({
        // mutationKey: ['updateUser'],
        mutationFn: usersApi.updateUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["user-info"] });
        },
    });
}

export function UseDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: usersApi.deleteUser,
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
