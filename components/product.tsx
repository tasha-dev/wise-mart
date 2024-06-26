// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
import Image from 'next/image';
import {productType} from "@/types";
import Link from "next/link";

// Creating and exporting product component as default
export default function Product({description, title, id, price, image}:productType):ReactNode {
    // Returning JSX
    return (
        <Link
            className={'border border-foreground/20 bg-background p-3 rounded-xl transition-all duration-500 lg:hover:scale-110 hover:border-foreground'}
            href={`/product/${id}`}
        >
            <img className={'h-[250px] w-full object-cover mb-3 rounded-xl'} src={image} alt={title}/>
            <h3 className="mb-5 truncate scroll-m-20 text-xl font-semibold tracking-tight">{title}</h3>
            <p className={'leading-7 line-clamp-2 mb-2'}>{description}</p>
            <h3 className="truncate scroll-m-20 font-semibold tracking-tight text-2xl">$ {price}</h3>
        </Link>
    );
}