// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";

// const slides = [
//   {
//     id: 1,
//     title: "WITHNESS THE TECH-CULTURE EXTRAVAGANZA.",
//     subtitle: "Explore, Learn, and Enjoy: The Events of Techletics ’25",
//     image: "https://dnbca6q7do6n.cloudfront.net/media/techletics24/designathon.png", // replace with your image path
//   },
//   {
//     id: 2,
//     title: "INNOVATE. INSPIRE. IGNITE.",
//     subtitle: "Where technology meets creativity at Techletics ’25",
//     image: "https://dnbca6q7do6n.cloudfront.net/media/techletics24/WhatsApp_Image_2024-02-18_at_22.29.08_791165df.jpg",
//   },
//   {
//     id: 3,
//     title: "THE FUTURE IS HERE.",
//     subtitle: "Discover, Build, and Lead the next big revolution.",
//     image: "https://dnbca6q7do6n.cloudfront.net/media/techletics24/Untitled-2.png",
//   },
// ];

// export default function TechleticsCarousel() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 4000); // Auto-slide every 4s
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full h-[85vh] overflow-hidden bg-quarternary text-white flex items-center justify-center mt-10">
//       {/* Content Wrapper */}
//       <div className="flex w-full max-w-7xl items-center justify-between px-10 lg:px-20">
//         {/* Left Text Section */}
//         <div className="flex flex-col w-full lg:w-1/2 space-y-4">
//           <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
//             {slides[current].title.split("TECH-CULTURE")[0]}
//             <span className="text-[#d2a84b]">
//               TECH-CULTURE
//             </span>
//             {slides[current].title.split("TECH-CULTURE")[1]}
//           </h1>
//           <p className="text-gray-300 text-base lg:text-lg">
//             {slides[current].subtitle}
//           </p>
//         </div>

//         {/* Right Image Section */}
//         <div className="hidden lg:flex w-[50%] h-[400px] relative rounded-lg overflow-hidden shadow-lg">
//           <Image
//             src={slides[current].image}
//             alt={slides[current].title}
//             height={100} width={100}
//             className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100 grayscale-[50%]"
//           />
//           {/* Optional overlay gradient for style */}
//           {/* <div className="absolute inset-0 bg-gradient-to-l from-quarternary to-transparent"></div> */}
//           <div className="absolute inset-0 bg-gradient-to-r from-quarternary to-transparent"></div>

//         </div>
//       </div>

//       {/* Dots / Indicators */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
//               current === index ? "bg-[#d2a84b]" : "bg-gray-500"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";

// const slides = [
//   {
//     id: 1,
//     title: "WITHNESS THE TECH-CULTURE EXTRAVAGANZA.",
//     subtitle: "Explore, Learn, and Enjoy: The Events of Techletics ’25",
//     image: "https://dnbca6q7do6n.cloudfront.net/media/techletics24/designathon.png",
//   },
//   {
//     id: 2,
//     title: "INNOVATE. INSPIRE. IGNITE.",
//     subtitle: "Where technology meets creativity at Techletics ’25",
//     image: "https://dnbca6q7do6n.cloudfront.net/media/techletics24/WhatsApp_Image_2024-02-18_at_22.29.08_791165df.jpg",
//   },
//   {
//     id: 3,
//     title: "THE FUTURE IS HERE.",
//     subtitle: "Discover, Build, and Lead the next big revolution.",
//     image: "https://dnbca6q7do6n.cloudfront.net/media/techletics24/Untitled-2.png",
//   },
// ];

// export default function TechleticsCarousel() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full h-[85vh] overflow-hidden text-white">
//       {/* Fullscreen Image */}
//       <Image
//         src={slides[current].image}
//         alt={slides[current].title}
//         fill
//         priority
//         className="object-cover transition-opacity duration-700 ease-in-out grayscale-[60%]"
//       />

//       {/* Dark overlay for text visibility */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>

//       {/* Centered Text */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-start px-6 md:px-20">
//         <h1 className="text-4xl md:text-6xl font-extrabold leading-tight ">
//           {slides[current].title.split("TECH-CULTURE")[0]}
//           <span className="text-[#d2a84b]">TECH-CULTURE</span>
//           {slides[current].title.split("TECH-CULTURE")[1]}
//         </h1>
//         <p className="text-gray-300 text-lg md:text-xl mt-4 max-w-3xl">
//           {slides[current].subtitle}
//         </p>
//       </div>

//       {/* Dots / Indicators */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
//               current === index ? "bg-[#d2a84b]" : "bg-gray-500"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

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

// 🟡 Words you want highlighted
const highlightWords = ['TECH-CULTURE', 'TECHLETICS', 'FUTURE', 'INSPIRE'];

export default function TechleticsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 🟡 Function to color highlight words dynamically
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
      {/* Fullscreen Image */}
      <Image
        src={slides[current].image}
        alt={slides[current].title}
        fill
        priority
        className="object-cover grayscale-[60%] transition-opacity duration-700 ease-in-out"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>

      {/* Left-centered Text */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-6 text-start md:px-20">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-6xl">
          {highlightText(slides[current].title)}
        </h1>
        <p className="mt-4 max-w-2xl text-justify text-lg text-gray-300 md:text-xl">
          {slides[current].subtitle}
        </p>
      </div>

      {/* Dots / Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-3">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 cursor-pointer rounded-full transition-all duration-300 ${
              current === index ? 'bg-[#d2a84b]' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
