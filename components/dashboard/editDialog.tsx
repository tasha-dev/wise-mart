// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {editDialogType} from "@/types";
import {z} from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {LoaderCircle} from "lucide-react";
import {toast} from "sonner";

// Defining form schema
const formSchema = z.object({
    title: z.string().min(3),
    price: z.string().min(1).refine((val) => !Number.isNaN(parseInt(val, 10)), {message: "Expected number, received a string"}),
    description: z.string().min(10),
    image: z.string().url(),
    category: z.string().min(3).max(30)
})

// Defining form type
type formType = z.infer<typeof formSchema>

// Creating and exporting edit Dialog for dashboard as default
export default function EditDialog({id, category, price, image, description, title, refresh}: editDialogType): ReactNode {
    // Defining form
    const form = useForm<formType>({
        resolver: zodResolver(formSchema),
        values: {category, price, image, description, title}
    })

    // Defining a function to handle submit event of form
    const onSubmitEventHandler:SubmitHandler<formType> = async (data) => {
        await fetch(`https://fakestoreapi.com/products/${id}`,{
            method:"PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: data.title,
                    price: data.price,
                    description: data.description,
                    image: data.image,
                    category: data.category
                }
            )
        })
            .then(() => {
                toast('The item is updated now.');
                refresh();
            })
            .catch(() => toast('There was an error while fetching the data'))
    }

    // Returning JSX
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={'w-full mb-3'}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>Make changes to Product here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className={'space-y-3'}
                        action="#"
                        onSubmit={form.handleSubmit(onSubmitEventHandler)}
                    >
                        <div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Title</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('title')} type={'text'}/>
                                </FormControl>
                            </div>
                            <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                        </div>
                        <div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Price</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input type={'number'} min={1}  {...form.register('price')} />
                                </FormControl>
                            </div>
                            <FormMessage>{form.formState.errors.price?.message}</FormMessage>
                        </div>
                        <div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Description</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('description')} type={'text'}/>
                                </FormControl>
                            </div>
                            <FormMessage>{form.formState.errors.description?.message}</FormMessage>
                        </div>
                        <div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Image</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('image')} type={'url'}/>
                                </FormControl>
                            </div>
                            <FormMessage>{form.formState.errors.image?.message}</FormMessage>
                        </div>
                        <div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Category</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('category')} type={'text'}/>
                                </FormControl>
                            </div>
                            <FormMessage>{form.formState.errors.category?.message}</FormMessage>
                        </div>
                        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
                        <Button disabled={form.formState.isSubmitting} className={'w-full'}>
                            {
                                (form.formState.isSubmitting)
                                    ? (
                                        <>
                                            <LoaderCircle className={'w-4 h-4 animate-spin mr-2'}/>
                                            Loading
                                        </>
                                    ) : 'Submit'
                            }
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}