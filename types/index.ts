// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";

// Creating and exporting type of props in components
export interface rootLayoutType {children: ReactNode;}
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

export interface hasTextType {
    hasText?: boolean;
    variant?: 'outline' | 'ghost';
}

export interface dashboardCartType {
    id: number;
    userId: number;
    date: string;
    products: {productId: number, quantity: number}[];
}

export interface userType {
    id: number,
    email: string,
    username: string,
    password: string,
    name:{ firstname: string, lastname: string },
    address:{
        city: string,
        street: string,
        number: number,
        zipcode: string,
        geolocation:{
            lat: string,
            long: string
        }
    },
    phone:string
}

export interface editDialogUserType {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  city: string;
  street: string;
  number: number;
  zipcode: string;
  lat: string;
  long: string; 
  phone: string; 
  refresh: () => void;
}
