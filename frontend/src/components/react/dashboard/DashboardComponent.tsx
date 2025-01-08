// src/components/react/DashboardComponent.tsx
import { useState } from "react"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type Tag } from "@/types/Tag";
import { 
    type DailyEntry, 
    DailyEntrySchema, 
    EmptyDailyEntry, 
    getAttributeLabel, 
    attributeOnDashboard,
    NumberToEmoji
} from "@/types/DailyEntry"

import { Button } from "@/components/ui/button"
import TextEntryComponent from "@/components/react/TextEntryComponent"
import InsightComponent from "@/components/react/insights/InsightComponent"
import DialogComponent from "@/components/react/dialog/DialogComponent"
import EntryItemDisplayComponent from "@/components/react/EntryItemDisplayComponent"

import {
    Form,
    FormField,
  } from "@/components/ui/form"

import { getValue } from "@/lib/utils"

export default function DashboardComponent() {
    const [entry, setEntry] = useState<DailyEntry>(EmptyDailyEntry())

    const form = useForm<z.infer<typeof DailyEntrySchema>>({
        resolver: zodResolver(DailyEntrySchema),
        defaultValues: {
            date: new Date(),
            attention: 'test',
            emotions: "",
            physicality: "",
            mantra: "",
            grateful: "",
            entry: "",
            rating: 0,
            emoji: 0,
            tags: new Array<Tag>()
        },
    }); 

    // TODO... fetch actual daily entry
    // useEffect(() => {
    //     setEntry({
    //         date: new Date(2025, 1, 1, 0, 0, 0, 0),
    //         attention: 'test',
    //         emotions: "",
    //         physicality: "",
    //         mantra: "",
    //         grateful: "",
    //         entry: "",
    //         tags: new Array<Tag>()
    //     })
    // }, []);

    const [dialog, setDialog] = useState(false)

    const [entryEdit, setEntryEdit] = useState<{attribute: string, label: string, value: string | Date | number}>( { attribute: "", label: "", value: ""} )

    function handleEntryUpdate(value: string) {
        setEntryEdit(prev => ({ ...prev, value: value}))
        setEntry(prev => ({ ...prev, [entryEdit.attribute] : value }))
    }

    function handleEditClick(attribute: string) : void {
        const value = getValue(entry, attribute as keyof DailyEntry)

        if (typeof value !== "string") {
            return;
        }

        form.reset();
        form.setValue(attribute as keyof DailyEntry, value);

        setEntryEdit(prev => ({ 
            ...prev, 
            value: value, 
            attribute: attribute, 
            label: getAttributeLabel(attribute)
        }))

        setDialog(true)
    }

    return (
        <div className="space-y-4 flex flex-col">
            {/* 
                New LAYOUT:

                    Display:
                        - Insights
                            - Daily Streak
                            - Longest Streak
                            - Mood
                                - Today
                                - Yesterday
                                - Calendar of the month
                                - Average Mood
                            - Weekly Ratings
                                - This week
                                - Last week
                                - Past Month
                        
                        - Missing Entries/Prompts to go fill out yesterday's entry
                            - If yesterday's entry is missing, prompt to fill it out via a card callout that will take you to
                              ~/journey/:day
                            - If yesterday's entry is filled out this is not displayed

                        - Daily Entry for the attrbutes we're collecting (EntryItemDisplayComponent)
                            - Emoji
                            - Emotions
                            - Physicality
                            - Mantra
                            - Grateful
                            - Attention
                            - Thoughts and Feelings
                            
                        
            */}
            <div className="grid grid-cols-3 gap-4 justify-items-center rounded-md bg-gray-200 dark:bg-gray-900">
                <InsightComponent insight="Daily Streak" value="START ONE!" />
                <InsightComponent insight="Longest Streak" value="START ONE!" />
                <InsightComponent insight="Average Mood" value="😁" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
                {entry && Object.entries(entry)
                    .filter(([a, v]) => attributeOnDashboard(a) && typeof v === "string")
                    .map(([attribute, value]) => (
                        <EntryItemDisplayComponent 
                            key={attribute}
                            emoji={NumberToEmoji(entry.emoji)} 
                            attribute={attribute}
                            date={entry.date}
                            content={value} 
                            header={attribute[0].toUpperCase() + attribute.slice(1)}
                            onEditClick={() => handleEditClick(attribute)} 
                        />
                    ))}
            </div>

            {dialog && !!entryEdit.label && typeof entryEdit.value === "string" &&
                <DialogComponent autofocus size="large" isOpen={dialog}>
                    <Form {...form}>
                        <form method="dialog" className="flex flex-col bg-background text-foreground">
                            <div className="border-b border-gray-400 p-4 text-lg">
                                Add some context to today.
                            </div>
                            <div className="text-center p-4 pb-8">
                                <FormField name={entryEdit.attribute}
                                    render={({ field }) => (
                                        <TextEntryComponent 
                                            label={getAttributeLabel(entryEdit.attribute)} 
                                            onUpdate={handleEntryUpdate} 
                                            value={field.value} 
                                            maxLength={9} />
                                    )}
                                />
                            </div>
                            <div className="flex justify-between border-t border-gray-400 p-4">
                                <Button variant="secondary" onClick={(e) => setDialog(false)} value="cancel" className="py-1 px-2 border rounded-md" formMethod="dialog">Cancel</Button>
                                <Button onClick={(e) => setDialog(false)} id="confirmBtn" className="py-1 px-2 border rounded-md" value="default">Confirm</Button>
                            </div>
                        </form>
                    </Form>
                </DialogComponent>
            }
        </div>
    )
};