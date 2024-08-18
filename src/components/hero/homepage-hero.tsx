import Image from "next/image";

export interface HomePageHeroProps {
    imageURL: string;
}

const HomePageHero = (props: HomePageHeroProps) => {
    return (
        <Image
            src={props.imageURL}
            layout="fill"
            objectFit="cover"
            alt="Mount Everest"
        />
    );
}

export default HomePageHero;