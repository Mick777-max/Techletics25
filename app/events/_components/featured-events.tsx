'use client';
import { CustomText } from '@/components/custom';
import { featuredEventList } from './eventlist';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const FeaturedEvents = () => {
  return (
    <section className="relative mx-auto max-w-screen-2xl items-center justify-center px-5">
      <div className="font-primary flex w-full flex-col items-center justify-center gap-12 py-6 text-secondary lg:py-12">
        <CustomText title>
          FEATURED &nbsp;<CustomText highlightedTitle>EVENT WEBITES</CustomText>
        </CustomText>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="flex flex-wrap justify-center gap-5"
      >
        {featuredEventList.map((event) => (
          <motion.div key={event.name} layout variants={itemVariant}>
            <Link
              href="/register"

              // target="_blank"
            >
              <div className="group relative h-[18.5rem] w-[15rem] bg-quarternary p-2 transition-all duration-300 ease-in hover:z-20 hover:scale-125 hover:border-[0.1px] hover:border-secondary hover:bg-secondary">
                <div className="absolute left-0 top-0 h-5 w-5 border-l-4 border-t-4 border-secondary group-hover:border-quarternary"></div>

                <div className="absolute right-0 top-0 h-5 w-5 border-r-4 border-t-4 border-secondary group-hover:border-quarternary"></div>

                <div className="absolute bottom-0 left-0 h-5 w-5 border-b-4 border-l-4 border-secondary group-hover:border-quarternary"></div>

                <div className="absolute bottom-0 right-0 h-5 w-5 border-b-4 border-r-4 border-secondary group-hover:border-quarternary"></div>
                <Image
                  className="h-full w-full object-fill grayscale hover:grayscale-0"
                  src={event.src}
                  alt={event.name}
                  width={300}
                  height={300}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedEvents;
