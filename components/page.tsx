// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useEffect} from "react";
import Container from "@/components/ui/container";
import {useUser} from "@/app/store";
import {pageType} from "@/types";

// Creating and exporting page component as default
export default function Page({children}:pageType):ReactNode {
    // Defining stores
    const user = useUser();

    // Setting user uid on store based on local storage
    useEffect(() => {
        const uidLocalStorage = localStorage.getItem('uid');
        if (uidLocalStorage) {user.login(uidLocalStorage);}
    }, []);

    // Returning JSX
    return (
        <Container className={'mt-20 mb-5'}>
            {children}
        </Container>
    );
}
