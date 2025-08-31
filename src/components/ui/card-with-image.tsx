import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ImageWithZoom from "@/components/ui/image-with-zoom"
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
  return (
    <Card className={cn("w-11/12", className)} {...props}>
      <CardHeader>
      <CardTitle>{props.title}</CardTitle>
      <CardDescription>{props.dimensions}</CardDescription>
      <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {props.enableZoom ? (
          <ImageWithZoom 
            src={props.src}
            alt={props.description || props.title}
          />
        ) : (
          <div className="rounded-md border">
            <div className="relative h-[400px] w-full">
              <Image 
                src={props.src}
                fill
                alt={props.description!}
                style={{objectFit: 'cover', borderRadius: '0.375rem'}}   
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
