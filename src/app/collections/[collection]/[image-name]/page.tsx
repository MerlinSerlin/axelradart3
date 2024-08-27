'use client'

import CardWithImage from "@/components/ui/card-with-image";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, usePathname } from 'next/navigation'
import { getCollection } from "@/data/art-data";
import Link from "next/link";

export default function Page() {

  const { imageName } = useParams();
//   const collectionImages = getCollection(collection.toString());

  return (
    <div className="w-full h-lvh">
        <div className="relative flex flex-col items-center mb-6">
            <CardWithImage  
            src={`/art-images${imageName.pathName}`}
            title={imageName.title}
            description={imageName.description}
            dimensions={imageName.size}
            />
            <CardFooter className="pt-6 w-11/12 rounded-lg border bg-card text-card-foreground shadow-sm">
            <Link href={`/collections/${imageName.theme}`} className="w-full">
                <Button className="w-full">
                View Full Image
                </Button>
            </Link>
            </CardFooter>
        </div>
    </div>
  );
}