'use client'

import { useEffect } from "react";
import CardWithImage from "@/components/ui/card-with-image";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, usePathname } from 'next/navigation'
import Link from "next/link";
import { useCollectionStore } from "@/store/collection";
import { getCollection } from "@/data/art-data";

export default function Page() {

  const { collection } = useParams();
  const collectionImages = getCollection(collection.toString());

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
            <Button className="w-full">
              {/* <Link href={`/collections/${image.theme}`}>
              View Full Image
              </Link> */}
            </Button>
          </CardFooter>
        </div>
      ))}
    </div>
  );
}