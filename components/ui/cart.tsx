// Codes by Mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useState} from "react";
import {Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {AlertTriangle, LoaderCircle, ShoppingCart} from "lucide-react";
import {useCart} from "@/app/store";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import CartItem from "@/components/cartItem";
import {toast} from "sonner";

// Creating and exporting cart component as default
export default function Cart():ReactNode {
    // Defining states of component
    const cart = useCart();
    const [isSubmiting, setSubmiting] = useState<boolean>(false);

    // Returning JSX
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size={'icon'} variant={'outline'} className={'relative'}>
                    <ShoppingCart className={'w-4 h-4'} />
                    {
                        (cart.cart.length === 0)
                            ? false
                            : (
                                <div className={'w-[20px] h-[20px] absolute top-0 -translate-y-[50%] translate-x-[50%] right-0 bg-red-600 rounded-full flex items-center justify-center'}>
                                    <span className={'text-[10px]'}>
                                        {
                                            (cart.cart.length > 5)
                                                ? '5+'
                                                : cart.cart.length
                                        }
                                    </span>
                                </div>
                            )
                    }
                </Button>
            </SheetTrigger>
            <SheetContent className={'overflow-auto space-y-5'}>
                <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                    <SheetDescription>Your cart is stored here until they are conformed by you and are added to real list</SheetDescription>
                </SheetHeader>
                <div className={'space-y-5'}>
                    {
                        (cart.cart.length === 0)
                            ? (
                                <Alert>
                                    <AlertTriangle className="h-4 w-4"/>
                                    <AlertTitle>Warning</AlertTitle>
                                    <AlertDescription>There is nothing in cart</AlertDescription>
                                </Alert>
                            ) : cart.cart.map((item, index) => (
                                <CartItem
                                    key={index}
                                    item={{
                                        id : item.item.id,
                                        title : item.item.title,
                                        image : item.item.image,
                                        price : item.item.price
                                    }}
                                    count={item.count}
                                />
                            ))
                    }
                </div>
                {
                    (cart.cart.length === 0)
                        ? false
                        : (
                            <SheetFooter>
                                <Button
                                    onClick={() => {
                                        setSubmiting(true);
                                        console.log(cart.cart.map((item) => {
                                            return {
                                                productId: item.item.id,
                                                quantity: item.item.id
                                            }
                                        }))
                                        fetch('https://fakestoreapi.com/carts',{
                                            method:"POST",
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify({
                                                    userId: localStorage.getItem('uid'),
                                                    date: new Date().toISOString().split('T')[0],
                                                    products: cart.cart.map((item) => {
                                                        return {
                                                            productId: item.item.id,
                                                            quantity: item.item.id
                                                        }
                                                    })
                                            })
                                        })
                                            .then((data) => {
                                                setSubmiting(false);
                                                data.json();
                                            })
                                            .then((data) => toast('The cart is submitted now'))
                                            .catch((error) => toast('There was an error while fetching the data'))
                                    }}
                                    className={'w-full'}
                                    disabled={isSubmiting}
                                >
                                    {
                                        (isSubmiting)
                                            ? (
                                                <>
                                                    <LoaderCircle className={'w-4 h-4 mr-2 animate-spin'} />
                                                    Submitting
                                                </>
                                            ) : 'Submit'
                                    }
                                </Button>
                            </SheetFooter>
                        )
                }
            </SheetContent>
        </Sheet>
    );
}