// src/components/react/DialogComponent.tsx

import { type ReactNode } from "react"

interface DialogComponentProps {
    isOpen: boolean,
    size: "small" | "medium" | "large" | "xlarge",
    autofocus: boolean,
    children: ReactNode
}

const sizeToVw = {
    small: "20vw",
    medium: "40vw",
    large: "60vw",
    xlarge: "80vw"
}
  
export default function DialogComponent(props: DialogComponentProps) {
    const dialogStyle = {
        width: sizeToVw[props.size],
        background: "hsl(var(--background))",
        "zIndex": "20",
        border: "1px solid hsl(var(--border))",
        "borderRadius": "0.375rem",
        filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))"
    };

    return (
        <dialog open={props.isOpen} style={dialogStyle} autoFocus={props.autofocus}>
            {props.children}
        </dialog>
    )
};