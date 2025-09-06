import Image from "next/image"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ImageWithZoom from "@/components/ui/image-with-zoom"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface CardWithImageProps {
    src: string,
    title: string,
    dimensions?: string,
    description?: string,
    theme?: string,
    enableZoom?: boolean
}

type CardProps = React.ComponentProps<typeof Card>

type ButtonProps = React.ComponentProps<typeof Button>

export default function CardWithImage({ className, ...props }: CardWithImageProps & CardProps & ButtonProps) {
  const hasHeaderContent = props.title || props.dimensions || props.description;
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <Card className={cn("w-11/12", className)} {...props}>
      {hasHeaderContent && (
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.dimensions}</CardDescription>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
      )}
      <CardContent >
        {props.enableZoom ? (
          <ImageWithZoom 
            src={props.src}
            alt={props.description || props.title}
          />
        ) : (
          <div className="rounded-md border">
            <div className="relative h-[400px] w-full">
              {isLoading && (
                <Skeleton className="absolute inset-0 h-full w-full rounded-md" />
              )}
              <Image 
                src={props.src}
                fill
                alt={props.description!}
                style={{objectFit: 'cover', borderRadius: '0.375rem'}}
                className={cn(
                  "transition-opacity duration-200",
                  isLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
