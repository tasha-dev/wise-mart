// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {User} from "lucide-react";
import {useUser} from "@/app/store";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {hasTextType} from "@/types";

// Creating and exporting auth component as default
export default function Auth({hasText}:hasTextType):ReactNode {
    // Defining states of component
    const {uid} = useUser();

    // Returning JSX
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={(uid) ? '/dashboard' : '/login'}>
                        <Button
                            className={cn((hasText) ? 'flex items-center justify-start gap-2 lg:w-auto w-full' : '')}
                            size={(hasText) ? "default" : "icon"}
                            variant="outline"
                        >
                            <User className={'w-4 h-4 text-foreground'} />
                            {
                                (hasText)
                                    ? (
                                        <span className={'text-foreground'}>
                                            {(uid) ? 'Dashboard' : 'Login'}
                                        </span>
                                    ) : false
                            }
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent className={cn((hasText) ? 'lg:block hidden' : '')}>
                    <p>{(uid) ? 'Dashboard' : 'Login'}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}