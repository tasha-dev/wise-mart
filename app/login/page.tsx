// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import {toast} from "sonner"
import {z} from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {LoaderCircle} from "lucide-react";
import {useRouter} from "next/navigation";
import {useUser} from "@/app/store";
import Page from "@/components/page";

// Defining form schema
const formSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(6).max(12)
})

// Creating and exporting login page as default
export default function LoginPage():ReactNode {
    // Defining states of component
    const userStore = useUser();

    // Defining useForm hook to handle form
    const form = useForm<z.infer<typeof formSchema>>({resolver: zodResolver(formSchema)});

    // Defining a router
    const router = useRouter();

    // Defining a function to handle submit
    const submitEventHandler:SubmitHandler<z.infer<typeof formSchema>> = async ({username, password}) => {
        await fetch('https://fakestoreapi.com/auth/login', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then((data) => data.json())
            .then((data) => {
                userStore.login(data.token);
                router.push('/dashboard');
                toast('Your logged in now');
            })
            .catch(() => form.setError('root', {message: 'There was an error while fetching the data'}))
    }

    // Returning JSX
    return (
        <Page>
            <h1 className="mb-10 scroll-m-20 border-b border-b-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Login</h1>
            <div className={'border border-foreground/20 bg-background p-3 rounded-xl'}>
                <Form {...form}>
                    <form action="#" onSubmit={form.handleSubmit(submitEventHandler)} className={'space-y-8'}>
                        <FormField
                            control={form.control}
                            name={'username'}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type={'text'} placeholder="tashaDev" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={'password'}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type={'password'} placeholder="12345678" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.formState.errors.root?.message && (
                            <p className={'text-sm font-medium text-destructive'}>
                                {form.formState.errors.root.message}
                            </p>
                        )}
                        <Button className={'w-full'} type="submit" disabled={form.formState.isSubmitting}>
                            {
                                (form.formState.isSubmitting)
                                    ? (
                                        <>
                                            <LoaderCircle className={'mr-2 w-4 h-4 animate-spin'} />
                                            <span>Loading</span>
                                        </>
                                    ) : 'Submit'
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </Page>
    );
}
