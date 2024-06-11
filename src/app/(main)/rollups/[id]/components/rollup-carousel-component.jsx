"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import SingleRollupComponent from "./single-rollup-component";
import HeaderRollupComponent from "./header-rollup-component";


export default function RollupCarouselComponent({rollup}) {

    return(
        <div className="parent mt-4 flex items-center justify-center">
        <div className="child h-full w-[100%] md:w-[80%]">
            <Carousel className="w-full max-w-full">
                <CarouselContent>
                    {rollup.map((letter, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                               <HeaderRollupComponent index={index} letter={letter} />
                                <Card className="shadow-none">
                                    <CardContent className="flex aspect-square items-center justify-center rounded-md p-0 py-4 md:py-2 w-[100%] h-[80vh]">
                                        <div className="w-full h-full overflow-y-hidden overflow-x-hidden">
                                           <SingleRollupComponent index={index} letter={letter} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
    </div>
    )
}


export function CarouselHtmlContent({letter}) {
    return(
        <>{ReactHtmlParser(letter.htmlBody)}</>
    )
}