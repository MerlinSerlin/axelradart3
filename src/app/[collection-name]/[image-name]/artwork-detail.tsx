'use client'

import { Button } from "@/components/ui/button";
import ArtworkTabs from "@/components/ui/artwork-tabs";
import { CardFooter } from "@/components/ui/card";
import { useCart } from '@/contexts/cart-context';
import type { CollectionItem, ECommData } from "@/data/art-data";

export default function ArtworkDetail({ imageData }: { imageData: CollectionItem }) {
  const { openCartManagementModal } = useCart();
  const { title, description, size, pathName, eCommData } = imageData;

  const handleBuyPrintsClick = () => {
    if (eCommData) {
      openCartManagementModal(title, pathName, eCommData)
    }
  }

  return (
    <>
      <ArtworkTabs
        title={title}
        description={description}
        size={size}
        src={`/art-images${pathName}`}
        pathName={pathName}
        eCommData={eCommData}
      />

      <CardFooter className="pt-3 mt-3 rounded-lg border bg-card text-card-foreground shadow-sm lg:hidden">
        <Button
          className="w-full"
          onClick={handleBuyPrintsClick}
          disabled={!eCommData}
        >
          Buy Prints
        </Button>
      </CardFooter>
    </>
  );
}
