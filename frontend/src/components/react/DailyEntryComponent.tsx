// src/components/react/DailyEntryComponent.jsx
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"

import { type DailyEntry, DailyEntrySchema, getAttributeLabel } from "@/types/DailyEntry"
import { type Tag } from "@/types/Tag";

import { DatePicker } from "@/components/ui/date-picker";
import TextEntryComponent from "@/components/react/TextEntryComponent"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"

interface DailyEntryComponentProps {
    dailyEntry: DailyEntry
}
  
export default function DailyEntryComponent(props: DailyEntryComponentProps) {
    const [entry, setEntry] = useState<DailyEntry>(props.dailyEntry)

    function handleEntryUpdate(value: string) {
        setEntry(prevEntry => ({ ...prevEntry, entry: value }));
    }

    function handleGratefulUpdate(value: string) {
        setEntry(prevEntry => ({ ...prevEntry, grateful: value }));
    }

    function handleMantraUpdate(value: string) {
        setEntry(prevEntry => ({ ...prevEntry, mantra: value }));
    }

    function handleAttentionUpdate(value: string) {
        setEntry(prevEntry => ({ ...prevEntry, attention: value }));
    }

    function handleEmotionsUpdate(value: string) {
        setEntry(prevEntry => ({ ...prevEntry, emotions: value }));
    }

    function handlePhysicalityUpdate(value: string) {
        setEntry(prevEntry => ({ ...prevEntry, physicality: value }));
    }

    function onDateChange(date: Date | undefined) {
        if (date) {
            setEntry(prevEntry => ({ ...prevEntry, date: date }));
        }
    }

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

    return (
        <>
            {/* TODO: switch to shadcn form... lots of work i think */}
            <Form {...form}>
                <form>              
                    <div className="flex flex-row mb-4">
                        <h1 className="text-2xl grow">Daily Check-In</h1>
                        <div className="flex flex-row space-x-2 items-center">
                            <FormField 
                                control={form.control} 
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">Date</FormLabel>
                                        <FormControl>
                                            <DatePicker onChange={v => onDateChange(v)} value={field.value}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />      
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <FormField control={form.control} name="emotions"
                            render={({ field }) => (
                                <TextEntryComponent 
                                    label={getAttributeLabel('emotions')} 
                                    onUpdate={handleEmotionsUpdate} 
                                    value={field.value} 
                                    maxLength={9} />
                            )}
                        />

                        <FormField control={form.control} name="physicality"
                            render={({ field }) => (
                                <TextEntryComponent 
                                    label={getAttributeLabel('physicality')} 
                                    onUpdate={handlePhysicalityUpdate} 
                                    value={field.value} 
                                    maxLength={9} />
                            )}
                        />

                        <div className="lg:col-span-2 pt-2">
                            <FormField control={form.control} name="attention"
                                render={({ field }) => (
                                    <TextEntryComponent 
                                        label={getAttributeLabel('attention')} 
                                        onUpdate={handleAttentionUpdate} 
                                        value={field.value} 
                                        maxLength={9} />
                                )}
                            />
                        </div>

                        <FormField control={form.control} name="mantra"
                            render={({ field }) => (
                                <TextEntryComponent 
                                    label={getAttributeLabel('mantra')} 
                                    onUpdate={handleMantraUpdate} 
                                    value={field.value} 
                                    maxLength={9} />
                            )}
                        />

                        <FormField control={form.control} name="grateful"
                            render={({ field }) => (
                                <TextEntryComponent 
                                    label={getAttributeLabel('grateful')} 
                                    onUpdate={handleGratefulUpdate} 
                                    value={field.value} 
                                    maxLength={9} />
                            )}
                        />

                        <div className="lg:col-span-2 pt-2">
                            <FormField control={form.control} name="entry"
                                render={({ field }) => (
                                    <TextEntryComponent 
                                        label={getAttributeLabel('entry')} 
                                        onUpdate={handleEntryUpdate} 
                                        value={field.value} 
                                        maxLength={9} />
                                )}
                            />
                        </div>
                    </div>
                </form>
            </Form>

        </>
    )
}
