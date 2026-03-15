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
