
export type StarRatingProps = {
    value: number,
    onChange: (value: number) => void
}

export function StarRating(props: StarRatingProps) {
    return (
        <div className="flex flex-row space-x-4">
            <button onClick={() => props.onChange(1)} aria-label="1 Star">⭐</button>
            <button onClick={() => props.onChange(2)} aria-label="2 Stars">⭐⭐</button>
            <button onClick={() => props.onChange(3)} aria-label="3 Stars">⭐⭐⭐</button>
            <button onClick={() => props.onChange(4)} aria-label="4 Stars">⭐⭐⭐⭐</button>
            <button onClick={() => props.onChange(5)} aria-label="5 Stars">⭐⭐⭐⭐⭐</button>
        </div>
    )
}