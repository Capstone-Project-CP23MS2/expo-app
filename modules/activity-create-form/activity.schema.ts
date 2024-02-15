import { z } from 'zod';

export const ActivityInfoSchema = z.object({
    hostUserId: z.number(),
    categoryId: z.number(),
    title: z.string({ required_error: 'Required' }).min(3).max(100),
    description: z.string().max(500).optional(),
    place: z.string().min(3).max(100),
    dateTime: z.string().datetime(),
    duration: z.number().min(1),
    noOfMembers: z.number(),
});

// extract the inferred type
export type ActivityInfo = z.infer<typeof ActivityInfoSchema>;
