// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import {productType, searchPageType} from "@/types";
import Product from "@/components/product";
import {AlertTriangle} from "lucide-react"
import {Alert, AlertDescription, AlertTitle,} from "@/components/ui/alert"
import ProductLoading from "@/components/loading/productLoading";
import Page from "@/components/page";

// Creating and exporting search page as default
export default function SearchPage({params: {searchQuery}}:searchPageType):ReactNode {
    // Defining states of component
    const [filterdProducts, setFilterdProducts] = useState<productType[]>([]);

    // Fetching data
    const products = useFetch<productType[]>({url: "https://fakestoreapi.com/products"})

    // Using useEffect hook to filter products base on search query
    useEffect(() => {
        if (!products.loading && products.error === undefined && products.data) {
            const filtredItems = products.data.filter((product) => product.title?.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilterdProducts(filtredItems);
        }
    }, [products.loading]);

    // Returning JSX
    return (
        <Page>
            <h1 className="mb-10 scroll-m-20 border-b border-b-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Result</h1>
            {
                (products.loading)
                    ? (
                        <div className={'grid lg:grid-cols-2 grid-cols-1 gap-3'}>
                            <ProductLoading />
                            <ProductLoading />
                            <ProductLoading />
                            <ProductLoading />
                        </div>
                    ) : (products.error)
                        ? (
                            <Alert>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>There was an error while fetching the data</AlertDescription>
                            </Alert>
                        ) : (filterdProducts.length === 0) ? (
                            <Alert className={'mb-10'}>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Warning</AlertTitle>
                                <AlertDescription>We couldn't find the item you are looking for.</AlertDescription>
                            </Alert>
                        ) : (
                            <div className={'grid lg:grid-cols-2 grid-cols-1 gap-3'}>
                                {
                                    filterdProducts.map((item, index) => (
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
        </Page>
    );
}