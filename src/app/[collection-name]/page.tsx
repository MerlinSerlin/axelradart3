'use client'

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getCollection } from "@/data/art-data";
import { useParams, useRouter, usePathname } from 'next/navigation';
import { Suspense } from "react";
import ArtworkModal from "@/components/ui/artwork-modal";

function ImageCard({ image, onClick }: { image: any; onClick: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className="relative cursor-pointer hover:opacity-90 transition-opacity"
      onClick={onClick}
    >
      <div className="relative w-full h-[50vh] rounded-md border bg-black overflow-hidden">
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

function CollectionContent() {
  const collectionName = useParams()['collection-name'];
  const router = useRouter();
  const pathname = usePathname();
  const collectionImages = getCollection(collectionName.toString());
  
  // Determine modal state directly from URL without local state
  const pathParts = pathname.split('/').filter(Boolean);
  const selectedImage = pathParts.length === 2 && pathParts[0] === collectionName ? pathParts[1] : null;

  const formatTitleForURL = (title: string) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  }

  const handleImageClick = (image: any) => {
    // Store current scroll position before navigating away
    sessionStorage.setItem(`scroll-${collectionName}`, window.scrollY.toString());
    
    const imageUrl = formatTitleForURL(image.title);
    router.push(`/${image.theme}/${imageUrl}`);
  };

  const handleCloseModal = () => {
    router.push(`/${collectionName}`, { scroll: false });
  };


  return (
    <div className="w-full min-h-screen" style={{overscrollBehaviorY: 'contain'}}>
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {collectionImages.map((image, index) => {
            return (
              <ImageCard
                key={index}
                image={image}
                onClick={() => handleImageClick(image)}
              />
            );
          })}
        </div>
      </div>
      
      {selectedImage && (
        <ArtworkModal
          imageName={selectedImage}
          collectionName={collectionName.toString()}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="w-full h-lvh bg-black"></div>}>
      <CollectionContent />
    </Suspense>
  );
}