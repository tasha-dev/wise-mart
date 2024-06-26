// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";

// Creating and exporting loading state of product component as default
export default function ProductLoading():ReactNode {
    // Returning JSX
    return (
        <div className={'border border-foreground/20 bg-background p-3 rounded-xl'}>
            <div className={'h-[250px] animate-pulse bg-gray-500 mb-3'} />
            <div className={'h-4 bg-gray-500 animate-pulse w-full mb-5'} />
            <div className={'h-8 bg-gray-500 animate-pulse w-full mb-2'} />
            <div className={'h-4 bg-gray-500 animate-pulse w-full'} />
        </div>
    );
}