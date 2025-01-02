import { z } from 'zod';
import { TagSchema, type Tag } from "./Tag";

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

export function EmptyDailyEntry() : DailyEntry {
    return {
        date: new Date(),
        attention: 'test',
        emotions: "",
        physicality: "",
        mantra: "",
        grateful: "",
        entry: "",
        tags: new Array<Tag>()
    }
}
