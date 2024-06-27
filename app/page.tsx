// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import Container from "@/components/ui/container";
import useFetch from "@/hooks/useFetch";
import {productType} from "@/types";
import Category from "@/components/category";
import Product from "@/components/product";
import {AlertTriangle} from "lucide-react"
import {Alert, AlertDescription, AlertTitle,} from "@/components/ui/alert"
import ProductLoading from "@/components/loading/productLoading";
import CategoryLoading from "@/components/loading/categoryLoading";

// Creating and exporting home page as default
export default function HomePage():ReactNode {
    // Fetching data
    const products = useFetch<productType[]>({url: "https://fakestoreapi.com/products"})
    const categories = useFetch<string[]>({url: "https://fakestoreapi.com/products/categories"})

    // Returning JSX
    return (
        <Container className={'mt-20 mb-5'}>
            <h1 className="mb-10 scroll-m-20 border-b border-b-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Category</h1>
            {
                (categories.loading)
                    ? (
                        <div className={'flex mb-10 items-center justify-start overflow-auto gap-5'}>
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                        </div>
                    ) : (categories.error)
                        ? (
                            <Alert className={'mb-10'}>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>There was an error while fetching the data</AlertDescription>
                            </Alert>
                        ) : (categories.data?.length === 0)
                            ? (
                                <Alert className={'mb-10'}>
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Warning</AlertTitle>
                                    <AlertDescription>There is nothing to show.</AlertDescription>
                                </Alert>
                            ) : (
                                <div className={'flex mb-10 items-center justify-start overflow-auto gap-5'}>
                                    {categories.data?.map((item, index) => <Category category={item} key={index} />)}
                                </div>
                            )
            }
            <h1 className="mb-10 scroll-m-20 border-b border-b-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Products</h1>
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
        </Container>
    );
}