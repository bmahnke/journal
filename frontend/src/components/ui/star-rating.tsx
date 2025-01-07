import { Button } from "./button"

export type StarRatingProps = {
    value: number,
    onChange: (value: number) => void
}

export function StarRating(props: StarRatingProps) {
    const selected = props.value ? `` : ``;

    return (
        <div className="flex flex-row space-x-4">
            <Button variant="icon" size="icon" className={props.value == 1 ? selected : ''} onClick={() => props.onChange(1)} aria-label="1 Star">⭐</Button>
            <Button variant="icon" size="icon" className={props.value == 2 ? selected : ''} onClick={() => props.onChange(2)} aria-label="2 Stars">⭐</Button>
            <Button variant="icon" size="icon" className={props.value == 3 ? selected : ''} onClick={() => props.onChange(3)} aria-label="3 Stars">⭐</Button>
            <Button variant="icon" size="icon" className={props.value == 4 ? selected : ''} onClick={() => props.onChange(4)} aria-label="4 Stars">⭐</Button>
            <Button variant="icon" size="icon" className={props.value == 5 ? selected : ''} onClick={() => props.onChange(5)} aria-label="5 Stars">⭐</Button>
        </div>
    )
}