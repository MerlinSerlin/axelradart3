import { Button } from "@/components/ui/button";
import Image from "next/image";
import MainMenu from "@/components/main-menu/main-menu";
import HomePageHero from "@/components/hero/homepage-hero";



export default function Home() {

  return (
    <div className="w-full h-lvh">
      <div className="relative h-1/2 rounded-lg overflow-hidden">
      <Button className="absolute z-10 bottom-3 right-3 bg-slate-600 border-2 border-white">
          <h1 className="text-white text-2xl font-bold">Fabric Art</h1>
        </Button>
        <HomePageHero imageURL='/other-images/Merle_Working.jpeg'/>
      </div>
      <div className="relative h-1/2 rounded-lg overflow-hidden">
        <Button className="absolute z-10 bottom-3 right-3 bg-slate-600 border-2 border-white">
          <h1 className="text-white text-2xl font-bold">Collections</h1>
        </Button>
        <HomePageHero imageURL='/art-images/Mount_Everest_600w.jpg'/>
      </div>
      <div className="absolute z-20">
        <MainMenu />
      </div>
    </div>
  );
}
