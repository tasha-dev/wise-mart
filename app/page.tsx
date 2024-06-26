// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
import Container from "@/components/ui/container";

// Creating and exporting home page as default
export default function HomePage():ReactNode {
    // Returning JSX
    return (
        <Container className={'mt-20 mb-5'}>
            <h1>Home Page</h1>
        </Container>
    );
}