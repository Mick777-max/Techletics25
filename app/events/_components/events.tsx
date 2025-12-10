'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { CustomSelect } from '@/components/custom';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { EventList } from '@/app/data';

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

const branches = ['ALL', 'CSE', 'ME', 'CE', 'ECE', 'EEE', 'BSH'];
const types = ['ALL EVENTS', 'COMPETITION', 'WORKSHOP', 'TECH-TALK', 'EXPO'];
const categories = ['TECHNICAL', 'CULTURAL'];

const Events = () => {
  const [activeBranch, setActiveBranch] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('TECHNICAL');
  const [activeType, setActiveType] = useState('ALL EVENTS');

  const handleBranchChange = useCallback((branch: string) => {
    setActiveBranch(branch);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleTypeChange = useCallback((type: string) => {
    setActiveType(type);
  }, []);

  return (
    <section className="relative mx-auto max-w-screen-2xl items-center justify-center px-10">
      <div className="flex flex-col justify-center gap-6 pt-6 lg:pt-12">
        <div className="flex flex-wrap items-center justify-between p-2 font-orbitron text-4xl font-bold tracking-wide text-quarternary sm:text-5xl md:text-7xl lg:mt-12 xl:mt-8">
          <span className="mr-4">EVENTS</span>
          <div className="flex gap-1">
            <Image
              src="/icons/barcode.svg"
              width={424}
              height={128}
              alt="Barcode"
              priority
              className="hidden h-20 w-auto 2xl:flex 2xl:h-24"
            />
          </div>
        </div>

        <motion.div
          layout
          className="relative mx-auto flex items-center justify-between rounded-full border border-secondary p-1 font-orbitron text-sm lowercase tracking-wider text-secondary sm:mt-8 md:mt-12 md:p-2 md:text-lg lg:w-fit lg:text-xl"
        >
          {categories.map((category) => (
            <div
              key={category}
              className="relative cursor-pointer px-6 py-1 uppercase lg:px-8"
              onClick={() => handleCategoryChange(category)}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="category-underline"
                  className="absolute bottom-0 left-0 h-full w-full rounded-full bg-secondary"
                  transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-all delay-100 ${activeCategory === category ? 'font-bold text-tertiary' : ''}`}
              >
                {category}
              </span>
            </div>
          ))}
        </motion.div>

        {activeCategory === 'TECHNICAL' && (
          <div className="flex justify-end gap-6 max-sm:justify-center xl:absolute xl:right-16 xl:top-[21.75rem]">
            <CustomSelect
              className="cursor-pointer rounded-lg border border-secondary bg-primary px-2 py-1 font-orbitron font-bold text-secondary focus:outline-none focus:ring-0 md:text-sm"
              onChange={(e) => handleBranchChange(e.target.value)}
            >
              {branches.map((branch) => (
                <option key={branch} value={branch} className="cursor-pointer">
                  {branch}
                </option>
              ))}
            </CustomSelect>

            <CustomSelect
              className="cursor-pointer rounded-lg border border-secondary bg-primary px-2 py-1 font-orbitron font-bold text-secondary focus:outline-none focus:ring-0 md:text-sm"
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              {types.map((type) => (
                <option key={type} value={type} className="cursor-pointer">
                  {type}
                </option>
              ))}
            </CustomSelect>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="my-10 flex flex-wrap justify-center gap-5"
          >
            {EventList.filter(
              (event) =>
                event.category === activeCategory &&
                (activeBranch === 'ALL' || event.branch === activeBranch) &&
                (activeType === 'ALL EVENTS' || event.type === activeType),
            ).map((event) => (
              <motion.div key={event.name} layout variants={itemVariant}>
                <Link
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w- group relative h-[18.5rem] bg-quarternary p-2 transition-all duration-300 ease-in hover:z-20 hover:scale-125 hover:border-[0.1px] hover:border-secondary hover:bg-secondary">
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
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Events;
