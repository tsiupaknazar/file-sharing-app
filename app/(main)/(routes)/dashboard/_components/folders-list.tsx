"use client";
import { Folder } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export const FoldersList: React.FC = () => {
    return (
        <Carousel>
            <div className="w-full my-4 h-auto flex items-center justify-start flex-wrap gap-4 border border-yellow-400">
                <CarouselContent>
                    <CarouselItem className="basis-1/6">
                        <div className="w-40 h-40 p-4 border border-pink-700">
                            <Folder width={100} height={100} />
                            <p className="text-lg font-bold text-center">Folder Name</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="basis-1/6">
                        <div className="w-40 h-40 p-4 border border-pink-700">
                            <Folder width={100} height={100} />
                            <p className="text-lg font-bold text-center">Folder Name</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="basis-1/6">
                        <div className="w-40 h-40 p-4 border border-pink-700">
                            <Folder width={100} height={100} />
                            <p className="text-lg font-bold text-center">Folder Name</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="basis-1/6">
                        <div className="w-40 h-40 p-4 border border-pink-700">
                            <Folder width={100} height={100} />
                            <p className="text-lg font-bold text-center">Folder Name</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="basis-1/6">
                        <div className="w-40 h-40 p-4 border border-pink-700">
                            <Folder width={100} height={100} />
                            <p className="text-lg font-bold text-center">Folder Name</p>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </div >
        </Carousel>
    );
}