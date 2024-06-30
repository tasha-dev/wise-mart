// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import {cartItemType, productType} from "@/types";
import Link from "next/link";
import {CopyX} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useCart} from "@/app/store";

// Creating and exporting cart item component as default
export default function CartItem({item: {title, id, price, image}, count}:cartItemType):ReactNode {
    // Defining states of component
    const cart = useCart();

    // Returning JSX
    return (
        <Link href={`/product/${id}`} className={'block rounded-md border border-foreground p-3 space-y-3'}>
            <div className={'flex justify-end'}>
                <Button onClick={() => cart.removeItem(Number(id))} size={'icon'} variant={'destructive'}>
                    <CopyX className={'w-4 h-4'} />
                </Button>
            </div>
            <img src={image} alt={title} className={'w-full h-[150px] rounded-md object-cover'}/>
            <span className={'block truncate font-normal text-foreground'}>{title}</span>
            <span className={'block truncate text-xl font-bold text-foreground'}>${price}</span>
            <span className={'block truncate text-xl font-bold text-foreground'}>{count}</span>
        </Link>
    );
}