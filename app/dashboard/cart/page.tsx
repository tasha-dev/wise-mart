// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import Page from "@/components/dashboard/page";
import useFetch from "@/hooks/useFetch";
import {dashboardCartType, productType} from "@/types";
import {AlertTriangle, LoaderCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import EditDialog from "@/components/dashboard/product/editDialog";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

// Creating and exporting cart dashboard page of dashboard as default
export default function CartDashboardPage():ReactNode {
    // Fetching api
    const carts = useFetch<dashboardCartType[]>({url: 'https://fakestoreapi.com/carts'});
    const products = useFetch<productType[]>({url: 'https://fakestoreapi.com/products'});

    // Returning JSX
    return (
        <Page>
            <h1 className="mb-10 scroll-m-20 border-b border-b-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Carts</h1>
            {
                (carts.loading)
                    ? (
                        <div className={'flex items-center justify-center'}>
                            <LoaderCircle className={'w-10 h-10 animate-spin text-foreground'} />
                        </div>
                    ) : (carts.error)
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
                                        <TableHead>User ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Products</TableHead>
                                        <TableHead className="text-right">Control</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {
                                    carts.data?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.id}</TableCell>
                                            <TableHead>{item.userId}</TableHead>
                                            <TableHead>{new Date(item.date).toLocaleDateString()}</TableHead>
                                            <TableHead>{item.products.map((item) => item.productId).join(',')}</TableHead>
                                            <TableCell className="text-right">
                                                <Button onClick={() => {
                                                    fetch(`https://fakestoreapi.com/carts/${item.id}`,{
                                                        method:"DELETE"
                                                    })
                                                        .then((data) => data.json())
                                                        .then(() => {
                                                            toast('The Cart is deleted now');
                                                            carts.refresh();
                                                        })
                                                        .catch(() => toast('There was an error while fetching the data'))

                                                }} className={'w-full'} variant={'destructive'}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </Table>
                        )
            }
        </Page>
    );
}
