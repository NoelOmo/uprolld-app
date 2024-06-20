import React, { useState } from 'react';
import { useDialog } from '@/app/context/dialog-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
import { ArrowRight, CheckCheck } from 'lucide-react';
import { ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons';
import { addPreferences, createMailbox } from '@/app/(main)/global-be';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

  const emailForm = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    })
    .refine((value) => !/\s/.test(value), {
        message: "Username must not contain spaces.",
      })
    .transform(
        value => value.replaceAll(' ', '')
    ),
  });

  const preferenceForm = z.object({
    rollups: z.string().optional(),
    frequency: z.string().optional(),
  });

const fadeVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
};

const CompleteProfileDialog = () => {
  const { isDialogOpen, hideDialog } = useDialog();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const form = useForm({
    resolver: zodResolver(emailForm),
    defaultValues: {
        email: "",
    },
    mode: "onChange"
  });

  const prefForm = useForm({
    resolver: zodResolver(preferenceForm),
    defaultValues: {
      rollups: '1',
      frequency: 'day',
    },
    mode: "onChange"
  });

  const onEmailFormSubmit = async (data) => {
    setIsLoading(true);
    const res = await createMailbox(data);
    if(res.success === false) {
      if (res.error === "document_already_exists") {
        setError("This email address is already taken, please choose another one.");
      }else if (res.error === "user_has_mailbox") {
        handleNext();
      }
      else {
        setError(res.body);
      }
    }
    localStorage.setItem("uprolld.mailbox", JSON.stringify(res.body))
    handleNext();
    setIsLoading(false);

  }

  const onPreferenceFormSubmit = async (data) => {
    setIsLoading(true);
    
    const mailbox = JSON.parse(localStorage.getItem("uprolld.mailbox")).mailbox
    const res = await addPreferences(data, mailbox);
    if(res.success) {
      localStorage.setItem("uprolld.mailbox", res.body)
    }

    setIsLoading(false);
    hideDialog();
  }

  const handleTextChange = (e) => {
    setError("");
    form.setValue('email', e.target.value);
  }

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="min-w-full md:min-w-[670px] min-h-[200px]">
        <div className="grid gap-4 py-4">
          <AnimatePresence mode='wait'>
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeVariants}
              >
                <h3 className="text-xl font-semibold">Complete Your Profile</h3>
                <p className="text-muted-foreground text-sm mb-2">In order to start using Uprolld, you need to complete your profile by filling in the following information.</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onEmailFormSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <div className="flex items-center w-full max-w-md rounded-md border bg-background text-foreground">
                                    <Input
                                      {...field} 
                                      disabled={isLoading}
                                      onChange={handleTextChange}
                                      type="text"
                                      placeholder="username"
                                      className="flex-1 px-4 py-2 rounded-l-md border-r border-muted focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                    <div className="px-4 py-2 text-muted-foreground">@uprolld.email</div>
                                </div>
                            </FormControl>
                            <FormDescription>
                                You will use this email address to subscribe to any newsletter.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         {error !== "" &&
                          <Alert variant="destructive">
                              <ExclamationTriangleIcon className="h-4 w-4" />
                              <AlertTitle>Error</AlertTitle>
                              <AlertDescription>
                                {error}
                              </AlertDescription>
                          </Alert>
                         }
                        <div className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 flex justify-between">
                            <Button type="submit" disabled={isLoading}>
                                Next {isLoading && <ReloadIcon className="ml-2 w-4 h-4 animate-spin" /> } 
                                {!isLoading && <ArrowRight className="ml-2 w-4 h-4" /> } 
                            </Button>
                        </div>
                    </form>
                </Form>
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeVariants}
              >
                <h3 className="text-xl font-semibold">Rollup Preferences</h3>
                <p className="text-muted-foreground text-sm mb-2">
                Configure your account preferences below. You can choose how often you would like to be notified of rollups and how many newsletters should be contained in a single rollup.<br /><br />
            Your rollups will be delivered to your default email address in the <b>Profile</b> tab.
                </p>
                <Form {...prefForm}>
      <form onSubmit={prefForm.handleSubmit(onPreferenceFormSubmit)} className="space-y-8">
        
        {/* Select Component for Rollups */}
        <FormField
          control={prefForm.control}
          name="rollups"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!mt-4 inline-block">I would like to receive a maximum of:</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 rollup</SelectItem>
                    <SelectItem value="2">2 rollups</SelectItem>
                    <SelectItem value="3">3 rollups</SelectItem>
                    <SelectItem value="4">4 rollups</SelectItem>
                    <SelectItem value="5">5 rollups</SelectItem>
                    <SelectItem value="6">6 rollups</SelectItem>
                    <SelectItem value="7">7 rollups</SelectItem>
                    <SelectItem value="8">8 rollups</SelectItem>
                    <SelectItem value="9">9 rollups</SelectItem>
                    <SelectItem value="10">10 rollups</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Select the maximum number of rollups you would like to receive in a given period.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Select Component for Frequency */}
        <FormField
          control={prefForm.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="inline-block">Every:</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Select how often you would like to receive the rollups.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 flex justify-between">
          <Button variant="outline" onClick={handlePrevious}>
            Previous
          </Button>
          <Button type="submit" disabled={isLoading}>
            Submit {isLoading && <ReloadIcon className="ml-2 w-4 h-4 animate-spin" />} 
            {!isLoading && <CheckCheck className="ml-2 w-4 h-4" />} 
          </Button>
        </div>
      </form>
    </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteProfileDialog;
