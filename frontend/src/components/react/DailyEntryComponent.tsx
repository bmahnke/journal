// src/components/react/DailyEntryComponent.jsx
import { type DailyEntry } from "../../types/DailyEntry"
import { useState, type ChangeEvent } from "react"
import TextEntryComponent from "./TextEntryComponent"
import { getAttributeLabel } from "../../util/daily-entry-util";
import { DatePicker } from "../ui/date-picker";

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

    // TODO: need to fix this... utc date right now
    function handleDateUpdate(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.valueAsDate) {
            const d = event.target.valueAsDate.toLocaleDateString("en-us", {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
            setEntry(prevEntry => ({ ...prevEntry, date: new Date(d)}));
        }
    }

    function onDateChange(date: Date | undefined) {
        if (date) {
            setEntry(prevEntry => ({ ...prevEntry, date: date }));
        }
    }

    return (
        <div>
            {/* TODO: switch to shadcn form... lots of work i think */}
            <form>
                <div className="flex flex-row mb-4">
                    <h1 className="text-2xl grow">Daily Check-In</h1>
                    <div className="flex flex-row space-x-2 items-center" data-date={entry?.date}>
                        <DatePicker onChange={v => onDateChange(v)} value={entry?.date} />

                        {/* TODO: this is utc... need to be local date
                        <Label htmlFor="date-selection" className="text-sm">Date</Label>
                        <input id="date-selection" 
                                type="date" 
                                className="p-1 rounded-md min-w-16" 
                                onChange={v => handleDateUpdate(v)} value={entry.date?.toISOString().slice(0, 10)} /> */}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <TextEntryComponent label={getAttributeLabel('emotions')} onUpdate={handleEmotionsUpdate} value={entry.emotions} maxLength={9} />
                    <TextEntryComponent label={getAttributeLabel('physicality')} onUpdate={handlePhysicalityUpdate} value={entry.physicality} maxLength={9} />

                    <div className="lg:col-span-2 pt-2">
                        <TextEntryComponent label={getAttributeLabel('attention')} onUpdate={handleAttentionUpdate} value={entry.attention} maxLength={9}/>
                    </div>

                    <TextEntryComponent label={getAttributeLabel('mantra')} onUpdate={handleMantraUpdate} value={entry.mantra} maxLength={9} />
                    <TextEntryComponent label={getAttributeLabel('grateful')} onUpdate={handleGratefulUpdate} value={entry.grateful} maxLength={9} />

                    <div className="lg:col-span-2 pt-2">
                        <TextEntryComponent label={getAttributeLabel('entry')} onUpdate={handleEntryUpdate} value={entry.entry} maxLength={9} />
                    </div>
                </div>
            </form>
        </div>
    )
}
