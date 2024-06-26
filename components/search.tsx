// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useState} from "react";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";

// Creating and exporting search component as default
export default function Search():ReactNode {
    // Defining states of component
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Defining router
    const router = useRouter();

    // Returning JSX
    return (
        <form
            action="#"
            onSubmit={() => router.push(`/s/${btoa(searchQuery)}`)}
        >
            <Input
                onChange={(e) => setSearchQuery(e.target.value)}
                required
                placeholder={'Search ...'}
                type={'text'}
            />
        </form>
    );
}