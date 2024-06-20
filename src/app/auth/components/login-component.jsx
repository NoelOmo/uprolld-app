"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { loginWithEmailAndPassword } from "../backend/auth-be"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/app/context/auth-context"
import { useDialog } from "@/app/context/dialog-context"

export default function LoginComponent({ authComponents, setAuthComponents, updateDisplayedPanel }) {

  const disallowedDomains = ['example.com', 'test.com', 'uprolld.email'];
  const { showDialog } = useDialog();
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    email: z.string()
    .email({ message: "Please enter a valid email address." })
    .refine((email) => {
      const domain = email.split('@')[1];
      return !disallowedDomains.includes(domain);
    }, { message: "This email domain is not allowed." }),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password must be no more than 100 characters long" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const res = await loginWithEmailAndPassword(data.email, data.password);
    
    if (!res.success) {
      showErrorToast(res.error);
      setIsLoading(false);
      return;
    }

    login(
      res.body.$id, 
      {
      "email": res.body.email,
      "id": res.body.$id,
      "name": res.body.name,
      }
    );
    setIsLoading(false);
    showSuccessToast("Successfully logged in.");
    showDialog();
    router.push('/rollups');
  }

  const showErrorToast = (message) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: message,
    });
  }

  const showSuccessToast = (message) => {
    toast({
      title: "Success",
      description: message,
    });
  }

    return (
        <>
        <div className="grid gap-6">
         <div className="grid gap-2 text-center">
            <h1 className="text-xl font-medium">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="me@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <p
                          onClick={() => updateDisplayedPanel("resetPasswordPanel")}
                          className="ml-auto inline-block text-sm underline cursor-pointer"
                      >
                        Forgot your password?
                      </p>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit"className="w-full" disabled={isLoading}>
                Login
                {isLoading && <ReloadIcon className="animate-spin ml-2"/>}
              </Button>
            </form>
          </Form>
          {/* <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <p
                    onClick={() => updateDisplayedPanel("resetPasswordPanel")}
                    className="ml-auto inline-block text-sm underline cursor-pointer"
                >
                  Forgot your password?
                </p>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div> */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <span 
                onClick={() => updateDisplayedPanel("signUpPanel")}
                className="ml-auto inline-block text-sm underline cursor-pointer" >
              Sign up
            </span>
          </div>
        </div>
        </>
    )
}