import { z } from 'zod';

export const DailyEntrySchema = z.object({
    date: z.date(),
    attention: z.string(),
    emotions: z.string(),
    physicality: z.string(),
    mantra: z.string(),
    grateful: z.string(),
    entry: z.string()
});

export type DailyEntry = z.infer<typeof DailyEntrySchema>;
