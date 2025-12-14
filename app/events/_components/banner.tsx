'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: 'WITNESS THE TECH-CULTURE EXTRAVAGANZA.',
    subtitle: 'Explore, Learn, and Enjoy: The Events of Techletics ’25',
    image:
      'https://sgp.cloud.appwrite.io/v1/storage/buckets/693509e5002a3858aa64/files/1765159043577-d4e5pm/view?project=6934f5ee0031b4cec180',
    link: 'https://pdflink.to/55720c13/', // Add your link here
  },
  // {
  //   id: 2,
  //   title: 'INNOVATE. INSPIRE. IGNITE.',
  //   subtitle: 'Where technology meets creativity at Techletics ’25',
  //   image:
  //     'https://dnbca6q7do6n.cloudfront.net/media/techletics24/WhatsApp_Image_2024-02-18_at_22.29.08_791165df.jpg',
  //   link: 'https://hacknite.cce.edu.in/', // Add your link here
  // },
  // {
  //   id: 3,
  //   title: 'THE FUTURE IS HERE.',
  //   subtitle: 'Discover, Build, and Lead the next big revolution.',
  //   image:
  //     'https://dnbca6q7do6n.cloudfront.net/media/techletics24/Untitled-2.png',
  //   link: 'https://bellfort-of-wallstreet.netlify.app/', // Add your link here
  // },
];

const highlightWords = ['TECH-CULTURE', 'TECHLETICS', 'FUTURE', 'INSPIRE'];

export default function TechleticsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
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
    <div className="relative mt-16 h-[85vh] w-full overflow-hidden font-orbitron text-white">
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

        {/* Link Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href={slides[current].link}
            className="mt-6 inline-block rounded-full border-2 border-[#d2a84b] px-6 py-2 text-lg font-semibold text-[#d2a84b] transition-all duration-300 hover:bg-[#d2a84b] hover:text-black"
            target="_blank"
          >
            Learn More &rarr;
          </Link>
        </motion.div>
      </div>

      {/* Dots / Indicators */}
      {/* <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-5">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => setCurrent(index)}
            className="cursor-pointer rounded-full"
            initial={false}
            animate={{
              width: current === index ? 32 : 10,
              height: 10,
              backgroundColor: current === index ? '#d2a84b' : '#9ca3af',
              borderRadius: 9999,
            }}
            transition={{
              type: 'tween',
              ease: 'easeInOut',
              duration: current === index ? 0.6 : 0.4,
            }}
          />
        ))}
      </div> */}
    </div>
  );
}
