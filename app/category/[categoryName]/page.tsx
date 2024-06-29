// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import Page from "@/components/page";
import useFetch from "@/hooks/useFetch";
import {productType} from "@/types";
import ProductLoading from "@/components/loading/productLoading";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertTriangle} from "lucide-react";
import Product from "@/components/product";

// Creating and exporting category page as default
export default function CategoryPage({params: {categoryName}}):ReactNode {
    // Fetching data
    const products = useFetch<productType[]>({url: `https://fakestoreapi.com/products/category/${categoryName.replace('%20', " ")}`});

    // Returning JSX
    return (
        <Page>
            <h1 className="mb-10 scroll-m-20 border-b border-b-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{categoryName.replace('%20', " ")}</h1>
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
                        ) : (products.data?.length === 0)
                            ? (
                                <Alert className={'mb-10'}>
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Warning</AlertTitle>
                                    <AlertDescription>There is nothing to show.</AlertDescription>
                                </Alert>
                            ) : (
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
        </Page>
    );
}
