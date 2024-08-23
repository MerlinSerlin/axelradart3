'use client'

import { Button } from "@/components/ui/button";
import CardWithImage from "@/components/ui/card-with-image";
import { getThemeImages } from "@/data/art-data";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";

import { useCollectionStore } from "@/store/collection";
import { useParams } from "next/navigation";

export default function Page() { 
    const themeImages = getThemeImages();
    // const {setCurrentCollection} = useCollectionStore();

    // const setCurrentCollectionHandler = (collectionID:string) => {
    //     setCurrentCollection(collectionID);
    // };

  return (
    <div className="w-full h-lvh">
      {themeImages.map((image, index) => (
        <div key={index} className="relative flex flex-col items-center mb-6">
          <CardWithImage  
            src={`/art-images${image.pathName}`}
            title={image.title}
            description={image.description}
            dimensions={image.size}
          />
          <CardFooter className="pt-6 w-11/12 rounded-lg border bg-card text-card-foreground shadow-sm">
            <Button className="w-full">
              <Link href={`/collections/${image.theme}`}>
                View Collection
              </Link>
            </Button>
          </CardFooter>
        </div>
      ))}
    </div>
  );
}