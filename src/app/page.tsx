import { Button } from "@/components/ui/button";
import MainMenu from "@/components/main-menu/main-menu";
import CardWithImage from "@/components/ui/card-with-image";
import { getThemeImages } from "@/data/art-data";



export default function Home() { 
  const themeImages = getThemeImages();

  return (
    <div className="w-full h-lvh">
      {themeImages.map((themeImage, index) => (
        <div key={index} className="relative flex flex-col items-center">
          <CardWithImage  
            src={`/art-images${themeImage.pathName}`}
            title={themeImage.title}
            description={themeImage.description}
            dimensions={themeImage.size}
          />
        </div>
      ))}
    </div>
  );
}
