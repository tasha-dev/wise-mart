// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import Page from "@/components/dashboard/page";
import useFetch from "@/hooks/useFetch";
import {userType} from "@/types";
import {AlertTriangle, LoaderCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import AddDialog from "@/components/dashboard/user/addDialog";

// Creating and exporting cart page of dashboard as default
export default function CartPage():ReactNode {
    // Fetching api
    const users = useFetch<userType[]>({url: 'https://fakestoreapi.com/users'});

    // Returning JSX
    return (
        <Page>
            <h1 className="mb-10 scroll-m-20 border-b border-b-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Users</h1>
            {
                (users.loading)
                    ? (
                        <div className={'flex items-center justify-center'}>
                            <LoaderCircle className={'w-10 h-10 animate-spin text-foreground'} />
                        </div>
                    ) : (users.error)
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
                                        <TableHead>Email</TableHead>
                                        <TableHead>UserName</TableHead>
                                        <TableHead>Password</TableHead>
                                        <TableHead>FullName</TableHead>
                                        <TableHead>City</TableHead>
                                        <TableHead>PhoneNumber</TableHead>
                                        <TableHead className="text-right">Control</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        users.data?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="w-[100px]">{item.id}</TableCell>
                                                <TableCell>{JSON.stringify(item.username)}</TableCell>
                                                <TableCell>{item.username}</TableCell>
                                                <TableCell>{item.password}</TableCell>
                                                <TableCell>{`${item.name.firstname} , ${item.name.lastname}`}</TableCell>
                                                <TableCell>{item.address.city}</TableCell>
                                                <TableCell>{item.phone}</TableCell>
                                                <TableCell>
                                                    <Button className={'w-full mb-3'}>Edit</Button>
                                                    <Button className={'w-full'} variant={'destructive'}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        )
            }
            <AddDialog refresh={users.refresh} />
        </Page>
    );
}
