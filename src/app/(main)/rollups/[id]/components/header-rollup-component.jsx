import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { ComponentPlaceholderIcon, StopIcon } from "@radix-ui/react-icons";
import { StopCircle } from "lucide-react";


export default function HeaderRollupComponent({letter, index}) {
    
    let domain = letter.sender.split("@")[1].replace(">", "");
    if (domain.includes("gmail")) {
        domain = domain.replace("gmail", "google")
    }
    const favicon = "https://" + domain + "/favicon.ico";

    return (
        <Card className="mb-2 shadow-none">
            <CardContent className="flex aspect-square items-center justify-center rounded-md p-0 py-4 md:py-2 w-[100%] h-24">
                <div className="w-full h-24 p-2 flex items-center">
                    <div className="flow-root w-full">
                        <div className="float-left flex items-center  max-w-[100%] md:max-w-[60%]">
                            <Avatar>
                                <AvatarImage src={favicon} />
                                <AvatarFallback>...</AvatarFallback>
                            </Avatar>
                            <div className=" text-slate-700">
                                <h4 className="text-wrap h-[100%] leading-4 ml-4 font-semibold mb-2 text-xs md:text-[14px]" >{letter.subject}</h4>
                                <p className="font-medium text-[12px] text-wrap h-[100%] leading-4 ml-4 text-muted-foreground" ><b>To:</b> {letter.recipient}</p>
                                <p className="font-medium text-[12px] text-wrap h-[100%] leading-4 ml-4 text-muted-foreground" ><b>From:</b> {letter.sender}</p>
                            </div>
                        </div>
                        <div className="float-right hidden md:flex items-center h-[100%] mt-2">
                           <Button variant="destructive"><StopCircle className="w-4 h-4 mr-2" /> Unsubscribe</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}