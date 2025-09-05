'use client'

import CardWithImage from "@/components/ui/card-with-image";
import { getCollection } from "@/data/art-data";
import { useParams, useRouter, usePathname } from 'next/navigation';
import { Suspense } from "react";
import ArtworkModal from "@/components/ui/artwork-modal";

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
    <div className="w-full h-lvh">
      {collectionImages.map((image, index) => {
        return (
          <div 
            key={index} 
            className="relative flex flex-col items-center mb-8 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleImageClick(image)}
          >
            <CardWithImage  
              src={`/art-images${image.pathName}`}
              title=""
              description=""
              dimensions=""
            />
          </div>
        );
      })}
      
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