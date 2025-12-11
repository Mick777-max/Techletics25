'use client';

import { container, exitItem, zoomOutAndExit } from '@/app/utlis/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function StripeCurtain() {
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="exit"
      className="absolute inset-0 z-40 flex size-full items-center justify-center overflow-clip"
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          variants={exitItem}
          className={`h-full flex-1 border-2 border-gray-500 border-opacity-15 ${i % 2 == 0 ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-black to-stone-950`}
        />
      ))}

      <motion.div
        className="absolute z-50 h-24"
        initial="hidden"
        animate={['show', 'exit']}
        variants={zoomOutAndExit}
      >
        <Image
          src="/logos/techletics-metal.svg"
          alt="logo"
          width={100}
          height={100}
          className="h-full w-auto"
        />
      </motion.div>
    </motion.div>
  );
}
