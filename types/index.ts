// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";

// Creating and exporting type of props in components
export interface rootLayoutType {children: ReactNode;}
export interface hasTextType {hasText?: boolean;}
export interface containerType {
    size?: 'sm' | 'lg';
    children: ReactNode;
    className?: string;
}

export interface productType {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}