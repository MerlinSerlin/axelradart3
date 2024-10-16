'use client'

import { Button } from "@/components/ui/button";
import CardWithImage from "@/components/ui/card-with-image";
import { getItem } from "@/data/art-data";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from 'next/navigation';

export default function Page() { 
  function capitalizeFirstLetterOfEachWord(input: string): string {
    return input
      .split(' ')                      // Split the string into an array of words
      .map(word => {
        // Check if the word starts with '(' and capitalize the letter after it
        if (word.startsWith('(')) {
          return '(' + word.charAt(1).toUpperCase() + word.slice(2);
        }
        // Otherwise, capitalize the first letter as usual
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');                      // Join the array of words back into a single string
  }

  const imageName = useParams()['image-name'].toString();
  const formattedImageName = imageName.replace(/-/g, ' ');
  console.log(capitalizeFirstLetterOfEachWord(formattedImageName));
  const imageData = getItem(capitalizeFirstLetterOfEachWord(formattedImageName));

  console.log(imageData);

  if (!imageData) { return <div>Image not found</div> }

  const { title, description, size, theme, pathName } = imageData;

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
            <Link href="#" className="w-full">
                <Button className="w-full">
                Buy Prints
                </Button>
            </Link>
          </CardFooter>
        </div>
    </div>
  );
}