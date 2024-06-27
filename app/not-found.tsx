// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
import {Metadata} from "next";
import Page from "@/components/page";

// Defining metadata
export const metadata:Metadata = {title: 'Not Found'}

// Creating and exporting 404 page as default
export default function NotFoundPage():ReactNode {
    // Returning JSX
    return (
        <Page>
            <p className="text-2xl">
                The page you're looking for, <br/>
                Is not found.
            </p>
        </Page>
    );
}