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
    rating: z.number(),
    emoji: z.string(),
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
        rating: 1,
        emoji: "😖",
        tags: new Array<Tag>()
    }
}

const attributeText = [
    { attribute: "date", label: "Date", dashboard: false },
    { attribute: "emotions", label: "Reflect on the emotions of the day.", dashboard: true },
    { attribute: "physicality", label: "Reflect on your feelings of physicality for today.", dashboard: true },
    { attribute: "attention", label: "What needs my attention today?", dashboard: true },
    { attribute: "mantra", label: "Today's mantra.", dashboard: true },
    { attribute: "grateful", label: "What am I grateful for today?", dashboard: true },
    { attribute: "entry", label: "Thoughts and Feelings.", dashboard: true },
    { attribute: "tags", label: "Add tags for categorization.", dashboard: false },
    { attribute: "rating", label: "Rating", dashboard: false },
    { attribute: "emoji", label: "Emoji", dashboard: false }
];

export function getAttributeLabel(attribute: string) : string {
    const opt = attributeText.find(opt => opt.attribute == attribute);

    if (!opt) return "Unknown";

    return opt.label;
}

export function attributeOnDashboard(attribute: string) : boolean {
    const opt = attributeText.find(opt => opt.attribute == attribute);

    if (!opt) return false;
    return opt.dashboard;
}