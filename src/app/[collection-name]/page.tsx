'use client'

import CardWithImage from "@/components/ui/card-with-image";
import { getCollection } from "@/data/art-data";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import ArtworkModal from "@/components/ui/artwork-modal";

export default function Page() { 
  const collectionName = useParams()['collection-name'];
  const router = useRouter();
  const collectionImages = getCollection(collectionName.toString());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const formatTitleForURL = (title: string) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  }

  const handleImageClick = (image: any) => {
    // Store current scroll position before navigating away
    sessionStorage.setItem(`scroll-${collectionName}`, window.scrollY.toString());
    
    const imageUrl = formatTitleForURL(image.title);
    setSelectedImage(imageUrl);
    router.push(`/${image.theme}/${imageUrl}`);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
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