
export type EmojiPickerProps = {
    onEmojiSelect: (emoji: string) => void,
    label: string
}

export function EmojiPicker(props: EmojiPickerProps) {

    return (
        <div className="flex flex-row space-x-4">
            <button onClick={() => props.onEmojiSelect("😍")} aria-label="Loved">😍</button>
            <button onClick={() => props.onEmojiSelect("😁")} aria-label="Great">😁</button>
            <button onClick={() => props.onEmojiSelect("🙂")} aria-label='Happy'>🙂</button>
            <button onClick={() => props.onEmojiSelect("😐")} aria-label="Content">😐</button>
            <button onClick={() => props.onEmojiSelect("🙁")} aria-label="Sad">🙁</button>
            <button onClick={() => props.onEmojiSelect("😡")} aria-label='Angry'>😡</button>
            <button onClick={() => props.onEmojiSelect("🤬")} aria-label='Furious'>🤬</button>
        </div>
    )
}