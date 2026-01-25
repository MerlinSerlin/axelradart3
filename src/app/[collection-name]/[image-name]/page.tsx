'use client'

import { Button } from "@/components/ui/button";
import ArtworkTabs from "@/components/ui/artwork-tabs";
import { getItem } from "@/data/art-data";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { useCart } from '@/contexts/cart-context';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Page() {
  const { openCartManagementModal } = useCart()

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  function capitalizeFirstLetterOfEachWord(input: string): string {
    return input
      .split(' ')                      // Split the string into an array of words
      .map(word => {
        // Check if the word starts with '(' and capitalize the letter after it
        if (word.startsWith('(')) {
          return '(' + word.charAt(1).toUpperCase() + word.slice(2);
        }
        // Handle Roman numerals
        if (word.toLowerCase() === 'ii') {
          return 'II';
        }
        if (word.toLowerCase() === 'iii') {
          return 'III';
        }
        if (word.toLowerCase() === 'iv') {
          return 'IV';
        }
        // Otherwise, capitalize the first letter as usual
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');                      // Join the array of words back into a single string
  }

  const imageName = useParams()['image-name'].toString();
  const collectionName = useParams()['collection-name'].toString();
  const formattedImageName = imageName.replace(/-/g, ' ');
  const finalTitleForLookup = capitalizeFirstLetterOfEachWord(formattedImageName);

  const formatCollectionName = (name: string) => {
    return name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const imageData = getItem(finalTitleForLookup);

  if (!imageData) { 
    return (
      <div className="w-full min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-red-600">Image not found</h1>
            <p>Looking for: &ldquo;{finalTitleForLookup}&rdquo;</p>
            <p>URL: {imageName}</p>
          </div>
        </div>
      </div>
    );
  }

  const { title, description, size, pathName, eCommData } = imageData;

  const handleBuyPrintsClick = () => {
    if (eCommData) {
      openCartManagementModal(title, pathName, eCommData)
    }
  }

  return (
    <div className="w-full min-h-screen pt-2 pb-6 md:py-6 bg-black">
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-4 md:mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${collectionName}`}>{formatCollectionName(collectionName)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

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
      </div>
    </div>
  );
}