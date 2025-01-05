// src/components/react/DashboardComponent.tsx
import { type DailyEntry, EmptyDailyEntry } from "../../types/DailyEntry"
import { useState } from "react"
import TextEntryComponent from "./TextEntryComponent"
import InsightComponent from "./InsightComponent"
import { getAttributeLabel, attributeOnDashboard } from "../../types/DailyEntry"
import DialogComponent from "./DialogComponent"
import { Button } from "../ui/button"
import EntryItemDisplayComponent from "./EntryItemDisplayComponent"
import { getValue } from "../../lib/utils"

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

    const [entryEdit, setEntryEdit] = useState<{attribute: string, label: string, value: string | Date | number}>( { attribute: "", label: "", value: ""} )

    function handleEntryUpdate(value: string) {
        setEntryEdit(prev => ({ ...prev, value: value}))
        setEntry(prev => ({ ...prev, [entryEdit.attribute] : value }))
    }

    function handleEditClick(attribute: string) : void {
        const value = getValue(entry, attribute as keyof DailyEntry)
        
        if (typeof value === "string") {
            setEntryEdit(prev => ({ 
                ...prev, 
                value: value, 
                attribute: attribute, 
                label: getAttributeLabel(attribute)
            }))
        }

        setDialog(true)
    }

    return (
        <div className="space-y-4 flex flex-col">
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
                            emoji={entry.emoji} 
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
                    <form method="dialog" className="flex flex-col text-primary-foreground">
                        <div className="border-b border-gray-400 p-4 text-lg">
                            Add some context to today.
                        </div>
                        <div className="text-center p-4 pb-8">
                            <TextEntryComponent label={entryEdit.label} value={entryEdit.value} maxLength={9} onUpdate={handleEntryUpdate} />
                        </div>
                        <div className="flex justify-between border-t border-gray-400 p-4">
                            <Button variant="secondary" onClick={(e) => setDialog(false)} value="cancel" className="py-1 px-2 border rounded-md" formMethod="dialog">Cancel</Button>
                            <Button onClick={(e) => setDialog(false)} id="confirmBtn" className="py-1 px-2 border rounded-md" value="default">Confirm</Button>
                        </div>
                    </form>
                </DialogComponent>
            }
        </div>
    )
};