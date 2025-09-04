'use client'

import { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArtworkTabs from "@/components/ui/artwork-tabs";
import { getItem } from "@/data/art-data";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";

interface ArtworkModalProps {
  imageName: string;
  collectionName: string;
  onClose: () => void;
}

export default function ArtworkModal({ imageName, collectionName, onClose }: ArtworkModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view') || 'artwork';

  function capitalizeFirstLetterOfEachWord(input: string): string {
    return input
      .split(' ')
      .map(word => {
        if (word.startsWith('(')) {
          return '(' + word.charAt(1).toUpperCase() + word.slice(2);
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  const formattedImageName = imageName.replace(/-/g, ' ');
  const imageData = getItem(capitalizeFirstLetterOfEachWord(formattedImageName));

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleViewChange = (view: string) => {
    const newUrl = `/${collectionName}/${imageName}?view=${view}`;
    router.push(newUrl, { scroll: false });
  };

  if (!imageData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">
          <p>Image not found</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </div>
      </div>
    );
  }

  const { title, description, size, theme, pathName } = imageData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-gray-600">Dimensions: {size}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6">
          <ArtworkTabs
            title={title}
            description={description}
            size={size}
            src={`/art-images${pathName}`}
            activeView={currentView}
            onViewChange={handleViewChange}
          />
          
          <CardFooter className="pt-6 mt-8 rounded-lg border bg-card text-card-foreground shadow-sm">
            <Link href="#" className="w-full">
              <Button className="w-full">
                Buy Prints
              </Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </div>
  );
}