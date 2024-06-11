

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { initiateResetPassword, loginWithEmailAndPassword } from "../backend/auth-be"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/app/context/auth-context"

export default function ForgotPasswordComponent({ authComponents, setAuthComponents, updateDisplayedPanel }) {


  const disallowedDomains = ['example.com', 'test.com', 'uprolld.email'];
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
    }, { message: "This email domain is not allowed." })
  });

  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const res = await initiateResetPassword(data.email);
    
    if (!res.success) {
      showErrorToast(res.error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    showSuccessToast("Successfully requested password reset email");
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


    return(
        <>
        <div className="grid gap-2 text-center">
            <h1 className="text-xl font-medium">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to reset your password
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
              <Button type="submit"className="w-full" disabled={isLoading}>
                Submit
                {isLoading && <ReloadIcon className="animate-spin ml-2"/>}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Changed your mind?{" "}
            <span 
                onClick={() => updateDisplayedPanel("loginPanel")}
                className="ml-auto inline-block text-sm underline cursor-pointer" >
              Go Back
            </span>
          </div>
        </>
    )
}