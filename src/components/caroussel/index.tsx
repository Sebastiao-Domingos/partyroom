'use client';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useRef } from 'react';
import Image from 'next/image';

export default function Carrossel() {
  const plugin = useRef(Autoplay({ delay: 2000 }));

  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="w-full h-[750px] bg-transparent"
            >
              <Image
                src={`/images/image-${index + 1}.jpg`}
                alt="ola como estas"
                width={1000}
                height={1000}
                loading="lazy"
                className="w-full h-[100vh] md:h-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}