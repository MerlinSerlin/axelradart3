import Image from 'next/image';

export interface TileProps {
    src: string,
    alt: string,
    theme: string,
}

export function Tile(props: TileProps) {
    return (
        <div>
            <Image 
                src="/art-images/Forest-Floor.jpg"
                alt="An Image of Forest Floor"
                fill
                priority
                style={{objectFit: 'cover'}}
            />
        </div>
    )
}