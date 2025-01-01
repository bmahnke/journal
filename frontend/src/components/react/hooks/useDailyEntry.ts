import { useEffect, useState } from "react";
import { type DailyEntry } from "../../../types/DailyEntry";
import { type Tag } from "../../../types/Tag";

export function useDailyEntry(date: Date) : DailyEntry | null {
    const [entry, setEntry] = useState<DailyEntry | null>(null);

    useEffect(() => {
        setEntry({
            date: date,
            attention: "test",
            emotions: "",
            physicality: "",
            mantra: "",
            grateful: "",
            entry: "",
            tags: new Array<Tag>()
        })
    }, []);

    return entry;
}