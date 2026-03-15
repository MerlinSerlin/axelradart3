'use client'

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, usePathname } from 'next/navigation';
import ArtworkModal from "@/components/ui/artwork-modal";
import type { CollectionItem } from "@/data/art-data";

function ImageCard({ image, onClick }: { image: CollectionItem; onClick: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="relative cursor-pointer hover:opacity-90 transition-opacity"
      onClick={onClick}
    >
      <div className="relative w-full h-[45vh] sm:h-[50vh] rounded-md border bg-black overflow-hidden">
        {isLoading && (
          <Skeleton className="absolute inset-0 h-full w-full" />
        )}
        <Image
          src={`/art-images${image.pathName}`}
          alt={image.title}
          fill
          style={{ objectFit: 'cover' }}
          className={cn(
            "transition-opacity duration-200",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}

export default function CollectionContent({
  collectionName,
  collectionImages,
}: {
  collectionName: string;
  collectionImages: CollectionItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const pathParts = pathname.split('/').filter(Boolean);
  const selectedImage = pathParts.length === 2 && pathParts[0] === collectionName ? pathParts[1] : null;

  const handleImageClick = (image: CollectionItem) => {
    sessionStorage.setItem(`scroll-${collectionName}`, window.scrollY.toString());
    router.push(`/${image.theme}/${image.slug}`);
  };

  const handleCloseModal = () => {
    router.push(`/${collectionName}`, { scroll: false });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        {collectionImages.map((image, index) => (
          <ImageCard
            key={index}
            image={image}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {selectedImage && (
        <ArtworkModal
          imageName={selectedImage}
          collectionName={collectionName}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
