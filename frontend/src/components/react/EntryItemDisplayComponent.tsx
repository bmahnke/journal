// src/components/react/EntryItemDisplayComponent.tsx

import { Button } from "../ui/button"

export interface EntryItemDisplayComponentProps {
    header: string,
    content: string,
    date: string,
    emoji: string
}

export default function EntryItemDisplayComponent(props: EntryItemDisplayComponentProps) {

    return (
        <div className="flex flex-col rounded-md bg-muted">
            {/* some header */}
            <div className="flex flex-row justify-between">
                <div className="
                    p-2
                    bg-destructive
                    text-destructive
                    inverted-border-radius
                    inverted-border-radius-left
                    rounded-br-xl rounded-tl-md z-10"
                ><span className="text-destructive-foreground">{props.header}</span></div>
                
                <Button variant="icon2" size="icon" type="button" className="mt-2 mr-2 bg-muted hover:bg-card/30">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.25C13.5188 2.25 14.75 3.48122 14.75 5C14.75 6.51878 13.5188 7.75 12 7.75C10.4812 7.75 9.25 6.51878 9.25 5C9.25 3.48122 10.4812 2.25 12 2.25ZM13.25 5C13.25 4.30964 12.6904 3.75 12 3.75C11.3096 3.75 10.75 4.30964 10.75 5C10.75 5.69036 11.3096 6.25 12 6.25C12.6904 6.25 13.25 5.69036 13.25 5Z" fill="currentColor"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12C9.25 10.4812 10.4812 9.25 12 9.25ZM13.25 12C13.25 11.3096 12.6904 10.75 12 10.75C11.3096 10.75 10.75 11.3096 10.75 12C10.75 12.6904 11.3096 13.25 12 13.25C12.6904 13.25 13.25 12.6904 13.25 12Z" fill="currentColor"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.75 19C14.75 17.4812 13.5188 16.25 12 16.25C10.4812 16.25 9.25 17.4812 9.25 19C9.25 20.5188 10.4812 21.75 12 21.75C13.5188 21.75 14.75 20.5188 14.75 19ZM12 17.75C12.6904 17.75 13.25 18.3096 13.25 19C13.25 19.6904 12.6904 20.25 12 20.25C11.3096 20.25 10.75 19.6904 10.75 19C10.75 18.3096 11.3096 17.75 12 17.75Z" fill="currentColor"/>
                    </svg>
                </Button>
            </div>

            {/* content */}
            <div className="p-2 italic ">
                <p className="line-clamp-2">{props.content}</p>
            </div>

            {/* footer */}
            <div className="flex items-center justify-between p-2 mr-2">
                <span className="text-xs uppercase">{props.date}</span>
                <span>{props.emoji}</span>
            </div>
        </div>
    )
}
