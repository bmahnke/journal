import { z } from 'zod';
import { TagSchema } from "./Tag";

export const DailyEntrySchema = z.object({
    date: z.date(),
    attention: z.string(),
    emotions: z.string(),
    physicality: z.string(),
    mantra: z.string(),
    grateful: z.string(),
    entry: z.string(),
    tags: z.array(TagSchema)
});

export type DailyEntry = z.infer<typeof DailyEntrySchema>;
