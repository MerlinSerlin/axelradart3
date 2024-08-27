import { Button } from "@/components/ui/button";
import MainMenu from "@/components/main-menu/main-menu";
import CardWithImage from "@/components/ui/card-with-image";
import Image from "next/image";



export default function Home() { 
  return (
    <div className="relative w-screen h-lvh">
      <Image 
      style={{objectFit: 'cover'}}
      src="/art-images/Forest-Floor.jpg"
      alt="An Image of Forest Floor"
      fill
      priority
      />
    </div>
  )
  
}
