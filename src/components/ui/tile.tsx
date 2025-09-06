import Image from 'next/image';
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface TileProps {
    src: string,
    alt: string,
    theme: string,
}

export function Tile(props: TileProps) {
    const [isLoading, setIsLoading] = useState(true);
    
    return (
        <div className="relative">
            {isLoading && (
                <Skeleton className="absolute inset-0 h-full w-full" />
            )}
            <Image 
                src="/art-images/Forest-Floor.jpg"
                alt="An Image of Forest Floor"
                fill
                priority
                style={{objectFit: 'cover'}}
                className={cn(
                    "transition-opacity duration-200",
                    isLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
            />
        </div>
    )
}