// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import Container from "@/components/ui/container";
import useFetch from "@/hooks/useFetch";
import {productType} from "@/types";
import Product from "@/components/product";
import {LoaderCircle} from "lucide-react";

// Creating and exporting home page as default
export default function HomePage():ReactNode {
    // Fetching data
    const products = useFetch<productType[]>({url: "https://fakestoreapi.com/products"})

    // Returning JSX
    return (
        <Container className={'mt-20 mb-5'}>
            <h1 className="mb-10 scroll-m-20 border-b border-b-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Products</h1>
            {
                (products.loading)
                    ? (
                        <div className={'flex items-center justify-center w-full'}>
                            <LoaderCircle className={'w-10 h-10 text-foreground animate-spin'}/>
                        </div>
                    ) : (products.error)
                        ? <h1>There was an error</h1>
                        : (
                            <div className={'grid lg:grid-cols-2 grid-cols-1 gap-3'}>
                                {
                                    products.data?.map((item, index) => (
                                        <Product
                                            key={index}
                                            id={item.id}
                                            title={item.title}
                                            price={item.price}
                                            description={item.description}
                                            image={item.image}
                                        />
                                    ))
                                }
                            </div>
                        )
            }
        </Container>
    );
}