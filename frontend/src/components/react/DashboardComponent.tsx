// src/components/react/DashboardComponent.tsx
import { type DailyEntry, EmptyDailyEntry } from "../../types/DailyEntry"
import { useState, useEffect, type ChangeEvent } from "react"
import TextEntryComponent from "./TextEntryComponent"
import InsightComponent from "./InsightComponent"
import { useDailyEntry } from "./hooks/useDailyEntry"
import rightChevron from "../../assets/right-chevron.svg"
import { getAttributeLabel } from "../../util/daily-entry-util";
import DialogComponent from "./DialogComponent"
import { type Tag } from "../../types/Tag"

export default function DashboardComponent() {
    const [entry, setEntry] = useState<DailyEntry>(EmptyDailyEntry())

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

    const [entryEdit, setEntryEdit] = useState<{attribute: string, label: string, value: string}>( { attribute: "", label: "", value: ""} )

    function handleEntryUpdate(value: string) {
        setEntryEdit(prev => ({ ...prev, value: value}))
        setEntry(prev => ({ ...prev, [entryEdit.attribute] : value }))
    }

    function handleEditClick(attribute: string, value: any) {
        setEntryEdit(prev => ({ 
                ...prev, 
                value: value, 
                attribute: attribute, 
                label: getAttributeLabel(attribute)
            }) 
        )

        setDialog(true)
    }

    return (
        <div className="space-y-4 flex flex-col">
            <div className="grid grid-cols-3 gap-4 justify-items-center rounded-md bg-slate-200">
                <InsightComponent insight="Daily Streak" value="START ONE!" />
                <InsightComponent insight="Longest Streak" value="START ONE!" />
                <InsightComponent insight="Average Mood" value="😁" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {entry && Object.entries(entry).map(([attribute, value]) => {
                    return (
                        <div className={`${['tags', 'date'].includes(attribute) ? 'hidden' : '' } flex flex-row justify-between bg-slate-200 p-2 rounded-md`} key={attribute}>
                            <div className="flex flex-row space-x-4">
                                <p>{!!value ? "✅" : "❌"}</p>
                                <p>{getAttributeLabel(attribute)}</p>
                            </div>
                            <button type="button" className="hover:bg-slate-300" onClick={(e) => handleEditClick(attribute, value)}>
                                <img src={rightChevron.src} width="24" height="24" alt="Right Chevron" />
                            </button>
                        </div>
                    )
                }) }
            </div>

            {dialog && !!entryEdit.label &&
                <DialogComponent autofocus size="large" isOpen={dialog}>
                    <form method="dialog" className="flex flex-col">
                        <div className="border-b border-slate-800 p-2 text-lg">
                            Add some context to today.
                        </div>
                        <div className="p-2 text-center">
                            <TextEntryComponent label={entryEdit.label} value={entryEdit.value} maxLength={9} onUpdate={handleEntryUpdate} />
                        </div>
                        <div className="flex justify-between border-t border-slate-800 p-2">
                            <button onClick={(e) => setDialog(false)} value="cancel" className="py-1 px-2 border rounded-md border-slate-400 hover:bg-slate-200" formMethod="dialog">Cancel</button>
                            <button onClick={(e) => setDialog(false)} id="confirmBtn" className="py-1 px-2 border rounded-md bg-emerald-300 border-emerald-800 hover:bg-emerald-400" value="default">Confirm</button>
                        </div>
                    </form>
                </DialogComponent>
            }
        </div>
    )
};