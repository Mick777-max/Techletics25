'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: 'WITHNESS THE TECH-CULTURE EXTRAVAGANZA.',
    subtitle: 'Explore, Learn, and Enjoy: The Events of Techletics ’25',
    image:
      'https://dnbca6q7do6n.cloudfront.net/media/techletics24/designathon.png',
  },
  {
    id: 2,
    title: 'INNOVATE. INSPIRE. IGNITE.',
    subtitle: 'Where technology meets creativity at Techletics ’25',
    image:
      'https://dnbca6q7do6n.cloudfront.net/media/techletics24/WhatsApp_Image_2024-02-18_at_22.29.08_791165df.jpg',
  },
  {
    id: 3,
    title: 'THE FUTURE IS HERE.',
    subtitle: 'Discover, Build, and Lead the next big revolution.',
    image:
      'https://dnbca6q7do6n.cloudfront.net/media/techletics24/Untitled-2.png',
  },
];

const highlightWords = ['TECH-CULTURE', 'TECHLETICS', 'FUTURE', 'INSPIRE'];

export default function TechleticsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const highlightText = (text: string) => {
    const regex = new RegExp(`(${highlightWords.join('|')})`, 'gi');
    return text.split(regex).map((part, i) =>
      highlightWords.some(
        (word) =>
          word.toLowerCase() === part.toLowerCase().replace(/[.,!?]/g, ''),
      ) ? (
        <span key={i} className="text-[#d2a84b]">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  return (
    <div className="relative mt-[4rem] h-[85vh] w-full overflow-hidden font-orbitron text-white">
      {/* Background Image */}
      <Image
        src={slides[current].image}
        alt={slides[current].title}
        fill
        priority
        className="object-cover grayscale-[60%] transition-opacity duration-700 ease-in-out"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-6 text-start md:px-20">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-6xl">
          {highlightText(slides[current].title)}
        </h1>
        <p className="mt-4 max-w-2xl text-justify text-lg text-gray-300 md:text-xl">
          {slides[current].subtitle}
        </p>
      </div>

      {/* Dots / Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-5">
        {slides.map((_, index) => (
          <div key={index} className="relative">
            <div
              className="h-3 w-3 cursor-pointer rounded-full bg-gray-500"
              onClick={() => setCurrent(index)}
            ></div>

            {current === index && (
              <motion.div
                layoutId="active-dot"
                className="absolute left-0 top-0 h-3 w-3 rounded-full bg-secondary"
                transition={{
                  type: 'tween',
                  stiffness: 400,
                  damping: 25,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
