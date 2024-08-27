'use client'

import CardWithImage from "@/components/ui/card-with-image";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from 'next/navigation'
import Link from "next/link";
import { getItem } from "@/data/art-data";

export default function Page() {
  function capitalizeFirstLetterOfEachWord(input: string): string {
    return input
      .split(' ')                   
      .map(word =>                  
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ');
  }

  const imageName = useParams()['image-name'];
  const formattedImageName = imageName.toString().replace(/-/g, ' ');
  const collectionItem = getItem(capitalizeFirstLetterOfEachWord(formattedImageName.toString()));

  if (!collectionItem) {
    return <div>Item not found</div>; // Handle the case where item is not found
  }

  // Destructure properties to ensure non-null values
  const { pathName, title, description, size, theme } = collectionItem;

  return (
    <div className="w-full h-lvh">
        <div className="relative flex flex-col items-center mb-6">
            <CardWithImage  
            src={`/art-images${pathName}`}
            title={title}
            description={description}
            dimensions={size}
            />
            <CardFooter className="pt-6 w-11/12 rounded-lg border bg-card text-card-foreground shadow-sm">
            <Link href={`/collections/${theme}`} className="w-full">
                <Button className="w-full">
                View Full Image
                </Button>
            </Link>
            </CardFooter>
        </div>
    </div>
  );
}