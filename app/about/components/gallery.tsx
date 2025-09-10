'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { images } from '../../_components/images/images';

type ImageBatch = { src: string }[];

const getRandomIndexes = (max: number, count: number): number[] => {
  const indexes = Array.from({ length: max }, (_, i) => i);
  const shuffledIndexes = indexes.sort(() => Math.random() - 0.5);
  return shuffledIndexes.slice(0, count);
};

const Gallery: React.FC = () => {
  const [currentBatch, setCurrentBatch] = useState<ImageBatch>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    // Set initial batch and mark as client-side
    setIsClient(true);
    const initialIndexes = getRandomIndexes(images.length, 3);
    const initialImages = initialIndexes.map((index) => images[index]);
    setCurrentBatch(initialImages);

    // Set up interval for changing images
    const timer = setInterval(() => {
      const randomIndexes = getRandomIndexes(images.length, 3);
      const randomImages = randomIndexes.map((index) => images[index]);
      setCurrentBatch(randomImages);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="h-96 w-full animate-pulse rounded bg-gray-200"></div>
        <div className="h-96 w-full animate-pulse rounded bg-gray-200"></div>
        <div className="h-96 w-full animate-pulse rounded bg-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {currentBatch.length === 0 ? (
        <>
          <div className="h-96 w-full animate-pulse rounded bg-gray-200"></div>
          <div className="h-96 w-full animate-pulse rounded bg-gray-200"></div>
          <div className="h-96 w-full animate-pulse rounded bg-gray-200"></div>
        </>
      ) : (
        currentBatch.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="col-span-1 transition duration-500 ease-in-out"
          >
            <div className="saturate-0 transition duration-500 ease-in-out hover:saturate-100">
              <Image
                src={image.src}
                alt={`Gallery image ${index + 1}`}
                width={500}
                height={400}
                className="h-96 w-full scale-95 transform rounded object-cover transition-all duration-500 hover:scale-100"
                priority={index === 0}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Gallery;
