// src/components/react/DashboardComponent.tsx

interface InsightComponentProps {
    insight: string,
    value: string
}
  
export default function InsightComponent(props: InsightComponentProps) {
    return (
        <div className="flex flex-col min-w-28 lg:min-w-40 p-2 rounded-md text-center">
            <span className="text-sm mb-2">{props.insight}</span>
            <span>{props.value}</span>
        </div>
    )
};