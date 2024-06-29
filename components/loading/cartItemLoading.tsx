// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";

// Creating and exporting loading state of cart item component as default
export default function CartItemLoading():ReactNode {
    // Returning JSX
    return (
        <div className={'rounded-md border border-foreground p-3 space-y-3'}>
            <div className={'w-full h-[100px] rounded-md bg-gray-500 animate-pulse'} />
            <div className={'w-full h-3 bg-gray-500 animate-pulse'} />
            <div className={'w-full h-5 bg-gray-500 animate-pulse'} />
        </div>
    );
}