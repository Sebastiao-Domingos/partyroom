'use client';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Carrossel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="w-full mx-auto /max-w-xs">
      <Carousel
        setApi={setApi}
        className="w-full relative"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="w-full ">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="w-full h-[450px] bg-transparent"
            >
              <Image
                src={`/images/image-${index + 1}.jpg`}
                alt="ola como estas"
                width={1000}
                height={1000}
                loading="lazy"
                className="w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          size={'lg'}
          className="hidden md:block text-3xl absolute top-[50%] -translate-y-1/2 /rounded-full p-3 -left-2"
        />
        <CarouselNext
          size={'lg'}
          className="hidden md:block absolute top-[50%] -translate-y-1/2 /rounded-full p-3 right-0"
        />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}
