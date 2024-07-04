// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import {useTheme} from "@/app/store";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {Button} from "@/components/ui/button";
import {Moon, Sun} from 'lucide-react';
import {hasTextType} from "@/types";
import {cn} from "@/lib/utils";

// Creating and exporting theme toggle component as default
export default function ThemeToggle({hasText = false, variant = 'outline'}:hasTextType):ReactNode {
    // Defining states of component
    const {theme, toggleTheme} = useTheme();

    // Returning JSX
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size={(hasText) ? "default" : "icon"}
                        variant={variant}
                        className={cn((hasText) ? 'flex items-center justify-start gap-2 lg:w-full w-full' : '')}
                        onClick={() => {
                            const htmlElement = document.documentElement;

                            toggleTheme();
                            (theme === 'dark')
                                ? htmlElement.classList.remove('dark')
                                : htmlElement.classList.add('dark')
                        }}
                    >
                        {
                            (theme === 'dark')
                                ? <Moon className={'w-4 h-4 text-foreground'} />
                                : <Sun className={'w-4 h-4 text-foreground'} />
                        }
                        {
                            (hasText)
                                ? <span className={'text-foreground'}>Toggle Theme</span>
                                : false
                        }
                    </Button>
                </TooltipTrigger>
                <TooltipContent className={'lg:block hidden'}>
                    <p>Toggle Theme</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}