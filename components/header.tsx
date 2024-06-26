// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
import Container from "@/components/ui/container";
import Link from 'next/link';
import Search from "@/components/search";
import ThemeToggle from "@/components/ui/themeToggle";
import Auth from "@/components/ui/auth";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import {AlignJustify} from "lucide-react";

// Creating and exporting header component as default
export default function Header():ReactNode {
    // Returning JSX
    return (
        <header className={'fixed top-0 left-0 w-full bg-background/20 backdrop-blur-2xl border-b border-b-foreground/20'}>
            <Container size={'lg'} className={'flex items-center justify-between gap-3'}>
                <Link className={'text-xl font-normal text-foreground'} href={'/'}>Wise Mart</Link>
                <div className={'lg:flex hidden items-center gap-3 justify-start'}>
                    <Search />
                    <ThemeToggle  />
                    <Auth  />
                </div>
                <div className={'lg:hidden block'}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                size={'icon'}
                            >
                                <AlignJustify className={'w-4 h-4 text-foreground'} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className={'lg:hidden flex flex-col gap-3 mt-3'}>
                            <Search />
                            <ThemeToggle hasText />
                            <Auth hasText />
                        </PopoverContent>
                    </Popover>
                </div>
            </Container>
        </header>
    );
}
