'use client'

import { Button } from "@/components/ui/button";
import CardWithImage from "@/components/ui/card-with-image";
import { getCollection } from "@/data/art-data";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from 'next/navigation';

export default function Page() { 
  const collectionName = useParams()['collection-name'];
  const collectionImages = getCollection(collectionName.toString());

  const formatTitleForURL = (title: string) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  }

  return (
    <div className="w-full h-lvh">
      {collectionImages.map((image, index) => (
        <div key={index} className="relative flex flex-col items-center mb-6">
          <CardWithImage  
            src={`/art-images${image.pathName}`}
            title={image.title}
            description={image.description}
            dimensions={image.size}
          />
          <CardFooter className="pt-6 w-11/12 rounded-lg border bg-card text-card-foreground shadow-sm">
            <Link href={`/${image.theme}/${formatTitleForURL(image.title)}`} className="w-full">
                <Button className="w-full">
                View Image
                </Button>
            </Link>
          </CardFooter>
        </div>
      ))}
    </div>
  );
}