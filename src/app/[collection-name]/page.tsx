import { Metadata } from "next";
import Link from "next/link";
import { getCollection, COLLECTION_NAMES } from "@/data/art-data";
import { formatCollectionName } from "@/lib/formatting";
import CollectionContent from "./collection-content";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageProps {
  params: Promise<{ "collection-name": string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "collection-name": collectionName } = await params;
  const displayName = formatCollectionName(collectionName);

  return {
    title: displayName,
    description: `Browse the ${displayName} collection by Merle Axelrad. Original mixed media collage artwork available as fine art prints.`,
  };
}

export function generateStaticParams() {
  return COLLECTION_NAMES.map((name) => ({
    "collection-name": name,
  }));
}

export default async function Page({ params }: PageProps) {
  const { "collection-name": collectionName } = await params;
  const collectionImages = getCollection(collectionName);
  const displayName = formatCollectionName(collectionName);

  return (
    <div className="w-full min-h-screen" style={{overscrollBehaviorY: 'contain', touchAction: 'pan-y', WebkitOverflowScrolling: 'touch'}}>
      <div className="max-w-6xl mx-auto px-8 pt-2 pb-8 md:py-8">
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
                <BreadcrumbPage>{displayName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <CollectionContent
          collectionName={collectionName}
          collectionImages={collectionImages}
        />
      </div>
    </div>
  );
}
