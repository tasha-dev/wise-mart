// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import Page from "@/components/page";
import {productPageType, productType} from "@/types";
import useFetch from "@/hooks/useFetch";
import {AlertTriangle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import Link from "next/link";
import {Star, Plus, Minus} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {useCart} from "@/app/store";

// Creating and exporting product page as default
export default function ProductPage({params: {productID}}:productPageType):ReactNode {
    // Defining states of component
    const cart = useCart();

    // Fetching data
    const {loading, error, data} = useFetch<productType>({url: `https://fakestoreapi.com/products/${productID}`})

    // Returning JSX
    return (
        <Page>
            <h1 className="mb-10 scroll-m-20 border-b border-b-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Product</h1>
            {
                (loading)
                    ? (
                        <div className={'space-y-5'}>
                            <div className={'w-full h-[200px] rounded-md border border-foreground bg-gray-500 animate-pulse'}/>
                            <div className={'w-full h-5 bg-gray-500 animate-pulse'}/>
                            <div className={'w-[30%] h-3 bg-gray-500 animate-pulse'}/>
                            <div className={'w-full h-10 bg-gray-500 animate-pulse'}/>
                            <div className={'w-[30%] h-3 bg-gray-500 animate-pulse'}/>
                            <div className={'flex items-center justify-between'}>
                                <div className={'lg:w-[20%] w-[30%] h-5 bg-gray-500 animate-pulse'}/>
                                <div className={'lg:w-[20%] w-[30%] h-5 bg-gray-500 animate-pulse'}/>
                            </div>
                            <div className={'w-full h-10 rounded-md bg-gray-500 animate-pulse'}/>
                        </div>
                    ) : (error)
                        ? (
                            <Alert>
                            <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>There was an error while fetching the data</AlertDescription>
                            </Alert>
                        ) : (
                            <div className={'space-y-5'}>
                                <img alt={data?.title} src={data?.image} className={'w-full h-[200px] border border-foreground rounded-md object-cover'}/>
                                <h1 className={'text-foreground text-2xl font-bold'}>{data?.title}</h1>
                                <h2 className={'text-foreground text-xl'}>${data?.price}</h2>
                                <p>{data?.description}</p>
                                <Link href={`/category/${data?.category}`} className={'block text-foreground text-xl'}>{data?.category}</Link>
                                <div className={'flex items-center justify-between'}>
                                    <span>Rating</span>
                                    <div className={'flex items-center justify-start gap-2'}>
                                        <span>{data?.rating?.rate}</span>
                                        <Star className={'w-4 h-4'} />
                                    </div>
                                </div>
                                <p>
                                </p>
                                {
                                    (Object.values(cart.cart).map(item => item.item.id).includes(Number(productID)))
                                        ? (
                                            <div className={'flex gap-3'}>
                                                <div className={'flex w-full items-center justify-between border border-foreground rounded-md overflow-hidden'}>
                                                    <Button
                                                        onClick={() => cart.removeQuantity(Number(productID))}
                                                        className={'rounded-none'}
                                                        size={'icon'}
                                                        variant={'ghost'}
                                                    >
                                                        <Minus className={'w-4 h-4'}/>
                                                    </Button>
                                                    <span>{cart.cart.find(item => item.item.id === Number(productID))?.count}</span>
                                                    <Button
                                                        onClick={() => cart.addQuantity(Number(productID))}
                                                        className={'rounded-none'}
                                                        size={'icon'}
                                                        variant={'ghost'}
                                                    >
                                                        <Plus className={'w-4 h-4'}/>
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button
                                                className={'w-full'}
                                                onClick={() => cart.addItem({item: {...data}, count: 1})}
                                            >
                                                Add To Cart
                                            </Button>
                                        )
                                }
                            </div>
                        )
            }
        </Page>
    );
}