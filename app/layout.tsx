// Codes by mahdi tasha
// Importing part
import "@/styles/globals.css"
import {Inter} from "next/font/google"
import {cn} from "@/lib/utils";
import {rootLayoutType} from "@/types";
import {ReactNode} from "react";
import {siteConfig} from "@/configs";
import {Metadata} from "next";
import Header from "@/components/header";

// Defining fonts
const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
})

// Defining metadata of pages
export const metadata:Metadata = {
    title: {
        template: '%s | WiseMart',
        default: siteConfig.name
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
    return (
        <html lang="en" suppressHydrationWarning className={'dark'}>
            <body className={cn(
                "min-h-screen bg-background",
                fontSans.className
            )}>
                <Header />
                {children}
            </body>
        </html>
    )
}