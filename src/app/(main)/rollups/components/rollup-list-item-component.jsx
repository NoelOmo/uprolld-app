
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { timeAgo } from "@/lib/time-ago";
import Link from "next/link";
import { getEmailsByRollUpId } from "../backend/rollups-be";

export default async function RollupListItemComponent({rollup}) {

    const rollupEmails = await getEmailsByRollUpId(rollup.$id);

    function getTitle() {
        let emails = [];
        rollupEmails.documents.map((email) => {
            emails.push(email.sender.split("<")[0].replaceAll("\"", ""));
        });
        const uniqueItems = [...new Set(emails)];
        if (uniqueItems.length <= 3) {
            return uniqueItems.join(', ');
        } else {
            const firstThree = uniqueItems.slice(0, 3).join(', ');
            return `${firstThree} and more`;
        }
    }

    return (
        <>
            <AccordionItem value={rollup.$id}>
                <AccordionTrigger className="hover:bg-slate-50 hover:dark:bg-slate-900 rounded-md py-1">
                    <div role="status" className="w-full dark:divide-gray-700 dark:border-gray-700 p-2 md:px-4">
                        <div className="flex items-center justify-between">
                            <div className="flex">
                                <div className="hidden rounded-full bg-slate-300 mr-4 dark:bg-slate-800 md:block h-12 w-12">
                                    <Image
                                        src="/scroll.svg"
                                        alt="Scroll"
                                        className="m-2"
                                        width={30}
                                        height={24}
                                        priority
                                    />
                                </div>
                                <div>
                                    <div className="rounded-full mb-0">
                                        <h3 className="text-md font-medium text-left">
                                            {rollupEmails.documents.length} Newsletters from {getTitle()}
                                            {rollup.status === "CREATED" && 
                                                <span className="inline-flex items-center bg-amber-100 text-amber-800 text-xs font-medium px-1py-1 rounded-full dark:bg-amber-900 dark:text-amber-300 ml-2">
                                                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                                </span>
                                            }
                                            {rollup.status === "READY" && 
                                                <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-1 py-1 rounded-full dark:bg-green-900 dark:text-green-300 ml-2">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                </span>
                                            }
                                        </h3>
                                    </div>
                                    <div className="">
                                        <p className="text-sm text-muted-foreground text-left">
                                            Sent to: {rollup.recipient}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <h3 className="text-xs font-medium text-muted-foreground">{timeAgo(rollup.$createdAt)}</h3>
                            </div>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="bg-slate-50 dark:bg-slate-900 ">
                    <div className="px-2 md:px-4 ml-0 md:ml-16 flex">
                        <CornerDownRight className="w-4 h-4" />
                        <ul className="ml-2 pt-[4px] text-xs font-medium text-muted-foreground space-y-2">
                            {rollupEmails.documents.slice(0, 5).map((email) => (
                                <li className="">{email.subject} - <span className="font-light">{timeAgo(email.$createdAt)}</span> by <b>{email.sender}</b></li>
                            ))}
                            <Link href={`/rollups/${rollup.$id}`} >
                                <Button variant="outline" size="sm" className="mt-4">
                                        <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Open
                                </Button>
                            </Link>
                        </ul>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </>
    )
}