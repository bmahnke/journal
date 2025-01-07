import { z } from 'zod';

export const TagSchema = z.object({
    tag: z.string(),
    color: z.string(),
});

export type Tag = z.infer<typeof TagSchema>;
