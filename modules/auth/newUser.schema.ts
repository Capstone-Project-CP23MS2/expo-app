import { z } from 'zod';

export const NewUserInfoSchema = z.object({
    username: z.string(),
    email: z.string(),
    role: z.string(),
    gender: z.string(),
    dateOfBirth: z.string(),
    phoneNumber: z.string(),
    locationId: z.string(),
});

// extract the inferred type
export type NewUserInfo = z.infer<typeof NewUserInfoSchema>;
