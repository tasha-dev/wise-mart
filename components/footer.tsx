// Codes by mahdi tasha
// Importing part
import {ReactNode} from "react";
import Container from "@/components/ui/container";

// Creating and exporting footer component as default
export default function Footer():ReactNode {
    // Returning JSX
    return (
        <footer className={'bg-background/20 backdrop-blur-2xl border-t border-t-foreground/20 mt-10'}>
            <Container size={'lg'}>
                <div className={'flex gap-3 items-center justify-between flex-wrap'}>
                    <p>
                        Made by
                        <a
                            className="font-medium text-primary underline underline-offset-4 ml-2"
                            href="https://tasha.vercel.app"
                        >
                            Mahdi Tasha
                        </a>
                    </p>
                    <p>
                        Backend by
                        <a
                            className="font-medium text-primary underline underline-offset-4 ml-2"
                            href="https://linkedin.com/in/keikaavousi"
                        >
                            MohammadReza Keikavousi
                        </a>
                    </p>
                </div>
            </Container>
        </footer>
    );
}