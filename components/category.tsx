// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
import {categoryType} from "@/types";
import Link from "next/link";
import {getRandomRgbColor} from "@/lib/utils";

// Creating and exporting category component as default
export default function Category({category}:categoryType):ReactNode {
    // Returning JSX
    return (
        <Link href={`/category/${category}`} className={'shrink-0 flex flex-col items-center justify-center'}>
            <div
                style={{background: getRandomRgbColor()}}
                className={'w-[70px] h-[70px] rounded-full mb-3'}
            />
            <span className={'capitalize text-sm text-foreground'}>{category}</span>
        </Link>
    );
}