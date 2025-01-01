// src/components/react/DashboardComponent.tsx
import { type DailyEntry } from "../../types/DailyEntry"
import { useState, type ChangeEvent } from "react"
import TextEntryComponent from "./TextEntryComponent"
import InsightComponent from "./InsightComponent"
import { useDailyEntry } from "./hooks/useDailyEntry"
import rightChevron from "../../assets/right-chevron.svg"
import { getAttributeLabel } from "../../util/daily-entry-util";
import DialogComponent from "./DialogComponent"

export default function DashboardComponent() {
    const entry = useDailyEntry(new Date(2024, 12, 31, 0, 0, 0, 0));
    const [dialog, setDialog] = useState(false)

    const [entryEdit, setEntryEdit] = useState<{attribute: string, label: string, value: string}>( { attribute: "", label: "", value: ""} )

    var checkList = [
        { attribute: "attention", value: entry?.attention },
        { attribute: "grateful", value: entry?.grateful },
        { attribute: "mantra", value: entry?.mantra },
        { attribute: "emotions", value: entry?.emotions },
        { attribute: "physicality", value: entry?.physicality },
        { attribute: "entry", value: entry?.entry },
    ]

    function handleEntryUpdate(value: string) {
        setEntryEdit(prev => ({ ...prev, value: value}))
        
        checkList.filter(x => x.attribute == entryEdit.attribute).forEach(x => x.value = value);
    }

    function handleEditClick(item : {attribute: string, value: any}) {
        setEntryEdit(prev => ({ 
                ...prev, 
                value: item.value, 
                attribute: item.attribute, 
                label: getAttributeLabel(item.attribute)
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
                { checkList.filter(item => item.attribute != undefined).map(item => {
                    return (
                        <div className="flex flex-row justify-between bg-slate-200 p-2 rounded-md" key={item.attribute}>
                            <div className="flex flex-row space-x-4">
                                <p>{!!item.value ? "✅" : "❌"}</p>
                                <p>{getAttributeLabel(item.attribute)}</p>
                            </div>
                            <button type="button" className="hover:bg-slate-300" onClick={(e) => handleEditClick(item)}>
                                <img src={rightChevron.src} width="24" height="24" alt="Right Chevron" />
                            </button>
                        </div>
                    )
                })}
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