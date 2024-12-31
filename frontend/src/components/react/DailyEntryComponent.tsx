// src/components/react/DailyEntryComponent.jsx
import { type DailyEntry } from "../../types/DailyEntry"
import { useState, type ChangeEvent } from "react"
import TextEntryComponent from "./TextEntryComponent"

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

    function handleDateUpdate(event: ChangeEvent<HTMLInputElement>) {
        setEntry(prevEntry => ({ ...prevEntry, emotions: event.target.value }));
    }

    return (
        <div>
            <form>
                <div className="flex flex-row mb-4">
                    <h1 className="text-2xl grow">Daily Check-In</h1>
                    <div className="flex flex-row space-x-2 items-center">
                        <label htmlFor="date-selection text-sm">Date</label>
                        <input type="date" className="p-1 rounded-md min-w-16" onChange={v => handleDateUpdate(v)} value={entry.date?.toISOString().slice(0, 10)} id="date-selection"></input>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">

                    <TextEntryComponent label="Reflect on the emotions of the day." onUpdate={handleEmotionsUpdate} value={entry.emotions} maxLength={9} />
                    <TextEntryComponent label="Reflect on your feelings of physicality for today." onUpdate={handlePhysicalityUpdate} value={entry.physicality} maxLength={9} />

                    <div className="col-span-2">
                        <TextEntryComponent label="What needs my attention today?" onUpdate={handleAttentionUpdate} value={entry.attention} maxLength={9}/>
                    </div>

                    <TextEntryComponent label="Today's Mantra." onUpdate={handleMantraUpdate} value={entry.mantra} maxLength={9} />
                    <TextEntryComponent label="What am I grateful for today?" onUpdate={handleGratefulUpdate} value={entry.grateful} maxLength={9} />

                    <div className="col-span-2">
                        <TextEntryComponent label="Thoughts and Feelings" onUpdate={handleEntryUpdate} value={entry.entry} maxLength={9} />
                    </div>
                </div>
            </form>
        </div>
    )
}
