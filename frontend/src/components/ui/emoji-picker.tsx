import { Button } from "./button"

export type EmojiPickerProps = {
    onEmojiSelect: (emoji: number) => void,
    label: string,
    value?: number
}

export function EmojiPicker(props: EmojiPickerProps) {
    const selected = props.value ? `` : ``;

    return (
        <div className="flex flex-row space-x-4">
            <Button variant="icon" size="icon" className={props.value == 1 ? selected : ''} onClick={() => props.onEmojiSelect(1)} aria-label="Loved">😍</Button>
            <Button variant="icon" size="icon" className={props.value == 2 ? selected : ''} onClick={() => props.onEmojiSelect(2)} aria-label="Great">😁</Button>
            <Button variant="icon" size="icon" className={props.value == 3 ? selected : ''} onClick={() => props.onEmojiSelect(3)} aria-label='Happy'>🙂</Button>
            <Button variant="icon" size="icon" className={props.value == 4 ? selected : ''} onClick={() => props.onEmojiSelect(4)} aria-label="Content">😐</Button>
            <Button variant="icon" size="icon" className={props.value == 5 ? selected : ''} onClick={() => props.onEmojiSelect(5)} aria-label="Sad">🙁</Button>
            <Button variant="icon" size="icon" className={props.value == 6 ? selected : ''} onClick={() => props.onEmojiSelect(6)} aria-label='Angry'>😡</Button>
            <Button variant="icon" size="icon" className={props.value == 7 ? selected : ''} onClick={() => props.onEmojiSelect(7)} aria-label='Furious'>🤬</Button>
        </div>
    )
}