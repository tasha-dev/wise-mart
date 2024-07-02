// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";

// Creating and exporting type of props in components
export interface rootLayoutType {children: ReactNode;}
export interface hasTextType {hasText?: boolean;}
export interface categoryType {category: string;}
export interface categoryPageType {params: { categoryName: string; }}
export interface productPageType {params: { productID: string; }}
export interface searchPageType {params: { searchQuery: string; }}
export interface pageType {children: ReactNode}
export interface addDialogType {refresh: () => void;}
export interface containerType {
    size?: 'sm' | 'lg';
    children: ReactNode;
    className?: string;
}

export interface productType {
    id?: number,
    title?: string,
    price?: number,
    description?: string,
    category?: string,
    image?: string,
    rating?: {
        rate: number,
        count: number
    }
}

export interface cartItemType {
    item: productType;
    count: number;
}

export interface editDialogType {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    refresh: () => void;
}