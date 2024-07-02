// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
import Page from "@/components/dashboard/page";

// Creating and exporting home page of dashboard as default
export default function DashboardPage():ReactNode {
    // Returning JSX
    return (
        <Page>
            <div className={'w-full aspect-square rounded-md border-foreground/20 border-dashed border-4 p-3 flex items-center justify-center'}>
                <h1 className={'font-bold text-center'}>Please select a side panel</h1>
            </div>
        </Page>
    );
}
