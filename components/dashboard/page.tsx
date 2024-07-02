// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useEffect} from "react";
import {pageType} from "@/types";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Barcode, LogOut, ShoppingBasket, Users} from "lucide-react";
import Container from "@/components/ui/container";
import {useUser} from "@/app/store";

// Creating and exporting page layout of dashboard pages as default
export default function Page({children}: pageType): ReactNode {
    // Defining states of component
    const user = useUser();

    // Defining content of menu
    const menuContent: {
        title: string,
        link: string,
        icon: JSX.Element
    }[] = [
        {
            title: 'Products',
            link: '/dashboard/products',
            icon: <Barcode className={'w-4 h-4 shrink-0'}/>
        },
        {
            title: 'Cart',
            link: '/dashboard/cart',
            icon: <ShoppingBasket className={'w-4 h-4 shrink-0'}/>
        },
        {
            title: 'Users',
            link: '/dashboard/users',
            icon: <Users className={'w-4 h-4 shrink-0'}/>
        }
    ];

    // Setting user uid on store based on local storage
    useEffect(() => {
        const uidLocalStorage = localStorage.getItem('uid');
        if (uidLocalStorage) {user.login(uidLocalStorage);}
    }, []);

    // Returning JSX
    return (
        <div className={'w-full lg:grid flex flex-col lg:grid-cols-5 h-dvh overflow-hidden'}>
            <div className={'lg:col-span-1 lg:border-r lg:border-b-0 border-b shrink-0 border-foreground/20 p-3 flex flex-col items-start justify-between lg:overflow-hidden overflow-auto'}>
                <div className={'lg:hidden flex gap-3 justify-start'}>
                    {
                        menuContent.map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                className={'flex shrink-0 items-center justify-center w-[40px] h-[40px] rounded-md bg-transparent transition-all duration-500 hover:bg-foreground/20'}
                            >
                                {item.icon}
                            </Link>
                        ))
                    }
                    <Button
                        size={'icon'}
                        onClick={() => user.logOut()}
                        variant={'destructive'}
                        className={'shrink-0'}
                    >
                        <LogOut className={'w-4 h-4'}/>
                    </Button>
                </div>
                <div className={'overflow-auto h-[80dvh] w-full lg:block hidden'}>
                    {
                        menuContent.map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                className={'flex items-center justify-start p-3 rounded-md gap-3 bg-transparent transition-all duration-500 hover:bg-foreground/20'}
                            >
                                {item.icon}
                                <span className={'block truncate'}>{item.title}</span>
                            </Link>
                        ))
                    }
                </div>
                <Button
                    onClick={() => user.logOut()}
                    variant={'destructive'}
                    className={'lg:flex hidden items-center justify-start gap-2 w-full'}
                >
                    <LogOut className={'w-4 shrink-0 h-4'}/>
                    <span className={'truncate'}>Log out</span>
                </Button>
            </div>
            <div className={'lg:col-span-4 overflow-auto h-full'}>
                <Container size={'sm'}>
                    {children}
                </Container>
            </div>
        </div>
    );
}