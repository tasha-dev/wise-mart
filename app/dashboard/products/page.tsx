// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import Page from "@/components/dashboard/page";
import useFetch from "@/hooks/useFetch";
import {AlertTriangle, LoaderCircle} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {productType} from "@/types";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import EditDialog from "@/components/dashboard/product/editDialog";
import AddDialog from "@/components/dashboard/product/addDialog";

// Creating and exporting dashboard products page as default
export default function DashboardProductPage():ReactNode {
    // Fetching api
    const products = useFetch<productType[]>({url: 'https://fakestoreapi.com/products'});

    // Handling button clicks
    function handleDelete(id:number) {
        fetch(`https://fakestoreapi.com/products/${id}`,{
            method:"DELETE",
            headers: {'Content-Type': 'application/json'},
        })
            .then((data) => data.json())
            .then(() => {
                toast('The Product is deleted now');
                products.refresh();
            })
            .catch(() => toast('There was an error while fetching the data'))
    }

    // Returning JSX
    return (
        <Page>
            <h1 className="mb-10 scroll-m-20 border-b border-b-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Product</h1>
            {
                (products.loading)
                    ? (
                        <div className={'flex items-center justify-center'}>
                            <LoaderCircle className={'w-10 h-10 animate-spin text-foreground'} />
                        </div>
                    ) : (products.error)
                        ? (
                            <Alert>
                                <AlertTriangle className="h-4 w-4"/>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>There was an error while fetching the data</AlertDescription>
                            </Alert>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">ID</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead className="text-right">Control</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        products.data?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{item.id}</TableCell>
                                                <TableHead><span className={'truncate block w-[20ch]'}>{item.title}</span></TableHead>
                                                <TableHead>${item.price}</TableHead>
                                                <TableHead><span className={'truncate block w-[20ch]'}>{item.description}</span></TableHead>
                                                <TableHead><span className={'truncate block w-[20ch]'}>{item.category}</span></TableHead>
                                                <TableHead><img src={item.image} alt={item.title} className={'w-full h-[75px] rounded-md object-cover'}/></TableHead>
                                                <TableHead>{item.rating?.rate}</TableHead>
                                                <TableCell className="text-right">
                                                    <EditDialog
                                                        refresh={products.refresh}
                                                        image={(item.image) ? item.image : ''}
                                                        description={(item.description) ? item.description : ''}
                                                        category={(item.category) ? item.category : ''}
                                                        price={(item.price) ? item.price : 0}
                                                        title={(item.title) ? item.title : ''}
                                                        id={(item?.id) ? item.id : 0}
                                                    />
                                                    <Button onClick={() => (item.id) ? handleDelete(item.id) : false}
                                                            className={'w-full'} variant={'destructive'}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        )
            }
            <AddDialog refresh={products.refresh}  />
        </Page>
    );
}