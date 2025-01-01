const attributeText = [
    { attribute: "emotions", label: "Reflect on the emotions of the day." },
    { attribute: "physicality", label: "Reflect on your feelings of physicality for today." },
    { attribute: "attention", label: "What needs my attention today?" },
    { attribute: "mantra", label: "Today's mantra." },
    { attribute: "grateful", label: "What am I grateful for today?" },
    { attribute: "entry", label: "Thoughts and Feelings." },
];

export function getAttributeLabel(attribute: string) : string {
    const opt = attributeText.find(opt => opt.attribute == attribute);

    if (!opt) return "Unknown";

    return opt.label;
}