import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getItemBySlug, getItem, getAllSlugs } from "@/data/art-data";
import { formatCollectionName, capitalizeFirstLetterOfEachWord } from "@/lib/formatting";
import ArtworkDetail from "./artwork-detail";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageProps {
  params: Promise<{ "collection-name": string; "image-name": string }>;
}

function resolveImageData(slug: string) {
  // Try slug-based lookup first
  const bySlug = getItemBySlug(slug);
  if (bySlug) return bySlug;

  // Fallback: reverse-engineer title from URL for backward compatibility
  const formattedName = slug.replace(/-/g, ' ');
  const titleGuess = capitalizeFirstLetterOfEachWord(formattedName);
  return getItem(titleGuess);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "image-name": imageName } = await params;
  const imageData = resolveImageData(imageName);

  if (!imageData) {
    return { title: "Artwork Not Found" };
  }

  return {
    title: imageData.title,
    description: imageData.description,
  };
}

export function generateStaticParams() {
  return getAllSlugs().map(({ collectionName, slug }) => ({
    "collection-name": collectionName,
    "image-name": slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { "image-name": imageName, "collection-name": collectionName } = await params;
  const imageData = resolveImageData(imageName);

  if (!imageData) {
    notFound();
  }

  const { title } = imageData;

  return (
    <div className="w-full pt-2 pb-6 md:py-6 bg-black">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="hidden md:block md:mb-6">
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

        <ArtworkDetail imageData={imageData} />
      </div>
    </div>
  );
}
