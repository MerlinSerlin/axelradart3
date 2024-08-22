import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
    alt?: string,
    dimensions?: string,
    description?: string,
}


type CardProps = React.ComponentProps<typeof Card>

export default function CardWithImage({ className, ...props }: CardWithImageProps & CardProps) {
  return (
    <Card className={cn("w-11/12 mt-12", className)} {...props}>
      <CardHeader>
      <CardTitle>{props.title}</CardTitle>
      <CardDescription>{props.dimensions}</CardDescription>
      <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="rounded-md border pt-6">
        <div className="relative h-[400px] w-full">
          <Image 
              src={props.src}
              fill
              alt="Mount Everest"
              style={{objectFit: 'cover', borderRadius: '0.375rem'}}   
          />
        </div>
      </CardContent>
      <CardFooter className="pt-6">
        <Button className="w-full">
            View Full Image
        </Button>
      </CardFooter>
    </Card>
  )
}
