import { z } from 'zod';

export const UpdateActivityInfoSchema = z.object({
    categoryId: z.number(),
    title: z.string({ required_error: 'Required' }).min(3).max(100),
    description: z.string().max(500).optional(),
    locationId: z.number(),
    dateTime: z.string().datetime(),
    duration: z.number().min(1),
    noOfMembers: z.number(),
});

// extract the inferred type
export type UpdateActivityInfo = z.infer<typeof UpdateActivityInfoSchema>;