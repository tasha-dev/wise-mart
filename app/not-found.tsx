// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
import Container from "@/components/ui/container";

// Creating and exporting 404 page as default
export default function NotFoundPage():ReactNode {
    // Returning JSX
    return (
        <Container className={'mt-20 mb-5'}>
            <p className="text-2xl">
                The page you're looking for, <br/>
                Is not found.
            </p>
        </Container>
    );
}