// Codes by mahdi tasha
// Importing part
import "@/styles/globals.css"
import {Inter} from "next/font/google"
import {cn} from "@/lib/utils";
import {rootLayoutType} from "@/types";
import {ReactNode} from "react";
import {siteConfig} from "@/configs";
import {Metadata} from "next";
import {Toaster} from "@/components/ui/sonner"
import {Barcode, ShoppingBasket, Users, LogOut} from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/container";
import {Button} from "@/components/ui/button";

// Defining fonts
const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
})

// Defining metadata of pages
export const metadata:Metadata = {
    title: {
        template: '%s | Dashboard',
        default: 'Dashboard | Wise Mart'
    },
    description: siteConfig.description,
    keywords: ["Wise-Mart", "online shopping", "smart shopping", "best deals", "e-commerce", "secure payments", "fast delivery", "product recommendations", "shop online", "smart search"],
    themeColor: '#00000',
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
    }
}

// Creating and exporting root layout component as default
export default function RootLayout({children}: rootLayoutType):ReactNode {
    // Defining content of menu
    const menuContent:{
        title: string,
        link: string,
        icon: JSX.Element
    }[] = [
        {
            title: 'Products',
            link: '/dashboard/products',
            icon: <Barcode className={'w-4 h-4 shrink-0'} />
        },
        {
            title: 'Cart',
            link: '/dashboard/cart',
            icon: <ShoppingBasket className={'w-4 h-4 shrink-0'} />
        },
        {
            title: 'Users',
            link: '/dashboard/users',
            icon: <Users className={'w-4 h-4 shrink-0'} />
        }
    ];

    // Returning JSX
    return (
        <html lang="en" suppressHydrationWarning className={'dark'}>
            <body className={cn(
                "bg-background overflow-hidden",
                fontSans.className
            )}>
                <Toaster />
                <div className={'w-full grid grid-cols-5 h-dvh overflow-hidden'}>
                    <div className={'col-span-1 border-r border-r-foreground p-3 flex flex-col items-start justify-between'}>
                        <div className={'overflow-auto h-[80dvh] w-full'}>
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
                        <Button variant={'destructive'} className={'flex items-center justify-start gap-2 w-full'}>
                            <LogOut className={'w-4 shrink-0 h-4'} />
                            <span className={'truncate'}>Log out</span>
                        </Button>
                    </div>
                    <div className={'col-span-4 overflow-auto'}>
                        <Container size={'sm'}>
                            {children}
                        </Container>
                    </div>
                </div>
            </body>
        </html>
    )
}