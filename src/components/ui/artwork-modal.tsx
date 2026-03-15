'use client'

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArtworkTabs from "@/components/ui/artwork-tabs";
import { getItemBySlug, getItem } from "@/data/art-data";
import { capitalizeFirstLetterOfEachWord } from "@/lib/formatting";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";

interface ArtworkModalProps {
  imageName: string;
  collectionName: string;
  onClose: () => void;
}

export default function ArtworkModal({ imageName, collectionName, onClose }: ArtworkModalProps) {
  // Try slug-based lookup first, fall back to title reverse-engineering
  const imageData = getItemBySlug(imageName)
    || getItem(capitalizeFirstLetterOfEachWord(imageName.replace(/-/g, ' ')));

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

  if (!imageData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-black p-6 rounded-lg">
          <p className="text-white">Image not found</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </div>
      </div>
    );
  }

  const { title, description, size, theme, pathName } = imageData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-black border-b p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
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
            pathName={pathName}
          />
          
          <CardFooter className="pt-6 mt-8 rounded-lg border bg-black text-white shadow-sm">
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