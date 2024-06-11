
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
    Accordion,
  } from "@/components/ui/accordion"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import RollupListItemComponent from "./rollup-list-item-component";
import { Separator } from "@/components/ui/separator";
import { RollupListFilterComponent } from "./rollup-list-filter-component";

  
export default function RollupListComponent({rollups}) {
    return (
        <Card className="rounded-lg border-none mt-6">
            <CardContent className="p-6">
                <div className="flex justify-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] max-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] overflow-y-scroll overflow-x-hidden no-scrollbar">
                <div className="flex flex-col relative w-full">
                    <div>
                        <h3 className="text-lg font-medium">Rollups</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                            Hey <b>Noel!</b>  welcome back.<br />
                            We have rolled up your newsletters into easy to read format below.
                        </p>
                    </div>
                    <RollupListFilterComponent />
                    <Separator />
                    <Accordion type="single" collapsible>
                        {rollups.documents.map((rollup) => (
                            rollup.emails.length > 0 && <RollupListItemComponent rollup={rollup} />
                        ))}
                    </Accordion>
                    <div className="my-2 flow-root">
                        <Pagination className="w-full md:max-w-52 mx-auto md:mx-8 float-right ">
                            <PaginationContent>
                                <PaginationItem>
                                <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>

                </div>
                </div>
            </CardContent>
        </Card>
    )
}