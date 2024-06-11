

import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { MailPlus, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";


export default function LinkedAccountsComponent() {
    return (
        <div className="space-y-4">
            <div>
                <p className="font-medium text-sm">
                    Linked Email Accounts
                </p>
                <p className="text-[0.8rem] text-muted-foreground mt-3">
                    Link your Gmail accounts to your Uprolld profile.
                </p>
            </div>
            <div className="flex items-center justify-between space-x-4  w-full">
                <div className="flex-col items-center space-y-4  w-full">
                    <div className="flow-root w-full">  
                        <div className="float-left flex items-center space-x-4">
                            <Avatar className="bg-slate-100 dark:bg-slate-700 p-1">
                                <AvatarImage src="/avatars/gmail.svg" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                                <p className="text-sm text-muted-foreground">m@example.com</p>
                            </div>
                        </div> 
                        <div className="float-right">
                            <Button variant="destructive">
                                <Trash2Icon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flow-root w-full">  
                        <div className="float-left flex items-center space-x-4">
                            <Avatar className="bg-slate-100 dark:bg-slate-700 p-1">
                                <AvatarImage src="/avatars/gmail.svg" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                                <p className="text-sm text-muted-foreground">m@example.com</p>
                            </div>
                        </div> 
                        <div className="float-right">
                            <Button variant="destructive">
                                <Trash2Icon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Button
                type="button"
                className="mt-2"
            >
                <MailPlus className="mr-2 w-4 h-4" />
                Add Account
            </Button>
        </div>
    )
}