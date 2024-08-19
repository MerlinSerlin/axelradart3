import { Button } from "@/components/ui/button";
import Image from "next/image";
import MainMenu from "@/components/main-menu/main-menu";
import fs from 'fs'

export default function Home() {

  return (
    <div className="w-full h-dvh">
      <div className="relative h-1/2 rounded-lg overflow-hidden">
      <Button className="absolute z-10 bottom-3 right-3 bg-slate-600 border-2 border-white">
          <h1 className="text-white text-2xl font-bold">Fabric Art</h1>
        </Button>
        <Image
            src='/other-images/Merle_Working.jpeg'
            layout="fill"
            objectFit="cover"
            alt="Mount Everest"
        />
      </div>
      <div className="relative h-1/2 rounded-lg overflow-hidden">
        <Button className="absolute z-10 bottom-3 right-3 bg-slate-600 border-2 border-white">
          <h1 className="text-white text-2xl font-bold">Collections</h1>
        </Button>
        <Image
            src='/art-images/Mount_Everest_600w.jpg'
            layout="fill"
            objectFit="cover"
            alt="Mount Everest"
        />
      </div>
      <div className="absolute z-20">
        <MainMenu />
      </div>
    </div>
  );
}
