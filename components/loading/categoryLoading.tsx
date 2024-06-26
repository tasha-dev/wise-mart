// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";

// Creating and exporting loading state of category component as default
export default function CategoryLoading():ReactNode {
    // Returning JSX
    return (
        <div className={'shrink-0 flex flex-col items-center justify-center'}>
            <div className={'w-[70px] h-[70px] rounded-full mb-3 bg-gray-500 animate-pulse'}/>
            <div className={'h-4 w-[100px] bg-gray-500 animate-pulse'} />
        </div>
    );
}