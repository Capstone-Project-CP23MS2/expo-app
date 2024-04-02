import { z } from 'zod';

export const UpdateUserInfoSchema = z.object({
    username: z.string({ required_error: 'Required' }).min(3).max(100),
    gender: z.string(),
    dateOfBirth: z.string(),
    phoneNumber: z.string(),
    lineId: z.string().nullable().optional().transform(x => x ?? undefined),

    // duration: z.number().min(1),
    // description: z.string().max(500).optional(),
    // title: z.string({ required_error: 'Required' }).min(3).max(100),
});

// extract the inferred type
export type UpdateUserInfo = z.infer<typeof UpdateUserInfoSchema>;