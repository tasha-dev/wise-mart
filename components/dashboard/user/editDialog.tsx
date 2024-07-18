// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {z} from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {LoaderCircle} from "lucide-react";
import {toast} from "sonner";
import {editDialogUserType} from "@/types";

// Defining form schema
const formSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(50),
    password: z.string().min(8).max(12),
    firstname: z.string().min(3).max(50),
    lastname: z.string().min(3).max(50),
    zipcode: z.string().min(1).refine((val) => !Number.isNaN(parseInt(val, 10)), {message: "Expected number, received a string"}),
    lat: z.string().min(3).max(50),
    long: z.string().min(3).max(50),
    city: z.string().min(3).max(50),
    street: z.string().min(3).max(50),
    number: z.string().min(1).refine((val) => !Number.isNaN(parseInt(val, 10)), {message: "Expected number, received a string"}),
    phone: z.string().min(11).max(12)
})

// Defining form type
type formType = z.infer<typeof formSchema>

// Creating and exporting edit dialog of user dashboard as default
export default function EditDialog({email, username, password, firstname, lastname, city, street, number, zipcode, lat, long, phone, refresh}:editDialogUserType):ReactNode {
  // Defining form
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    values: {
        email,
        username,
        password,
        firstname,
        lastname,
        city,
        street,
        number: `${number}`,
        zipcode, 
        lat,
        long,
        phone
    }
  })

  // Defining a function to handle submit event of form
    const onSubmitEventHandler:SubmitHandler<formType> = async (data) => {
        await fetch('https://fakestoreapi.com/users/',{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    name:{
                        firstname: data.firstname,
                        lastname: data.lastname
                    },
                    address:{
                        city: data.city,
                        street: data.street,
                        number: data.number,
                        zipcode: data.zipcode,
                        geolocation:{
                            lat: data.lat,
                            long:data.long
                        }
                    },
                    phone: data.phone
                }
            )
        })
            .then(() => {
              toast('The User is added now.');
              refresh();
            })
            .catch(() => toast('There was an error while fetching the data'))
    }

  // Returning JSX
  return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={'w-full'}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>Create new User here. Click Submit when you're done.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className={'space-y-3'}
                        action="#"
                        onSubmit={form.handleSubmit(onSubmitEventHandler)}
                    >
                        <div className={'h-[50vh] overflow-auto'}>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Email</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('email')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.email?.message}</FormMessage>
                            </div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Username</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('username')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.username?.message}</FormMessage>
                            </div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Password</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('password')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.password?.message}</FormMessage>
                            </div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Firstname</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('firstname')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.firstname?.message}</FormMessage>
                            </div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Lastname</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('lastname')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.lastname?.message}</FormMessage>
                            </div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Zipcode</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('zipcode')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.zipcode?.message}</FormMessage>
                            </div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Lat</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('lat')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.lat?.message}</FormMessage>
                            </div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Long</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('long')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.long?.message}</FormMessage>
                            </div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                            <FormLabel className="text-base">City</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('city')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.city?.message}</FormMessage>
                            </div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Street</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('street')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.street?.message}</FormMessage>
                            </div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Number</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('number')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.number?.message}</FormMessage>
                            </div>
                            <div className={'grid lg:grid-cols-4 grid-cols-1 gap-3 mb-3 items-center'}>
                                <FormLabel className="text-base">Phone</FormLabel>
                                <FormControl className={'w-full col-span-3'}>
                                    <Input {...form.register('phone')} type={'text'}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors?.phone?.message}</FormMessage>
                            </div> 
                            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
                        </div>
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
