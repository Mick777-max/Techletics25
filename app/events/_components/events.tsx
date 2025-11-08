'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import SectionLayout from '@/layouts/section-layout';
import { CustomSelect, CustomText } from '@/components/custom';
import { eventList } from './eventlist';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

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
    <section className='relative bg-[url("/image/bg-white.png")] bg-auto bg-center px-5'>
      <div className="flex flex-col justify-center gap-6 pt-6 lg:pt-12">
        <div className="flex flex-wrap items-center justify-between p-2 font-orbitron text-4xl tracking-wide text-quarternary sm:text-5xl md:text-7xl lg:mt-12 xl:mt-8">
          <span className="mr-4">EVENTS</span>
          <div className="flex gap-1">
            <Image
              src="/icons/barcode.svg"
              width={424}
              height={128}
              alt="Barcode"
              priority
              className="hidden h-[88px] w-auto 2xl:flex 2xl:h-24"
            />
          </div>
        </div>

        <motion.div
          layout
          className="relative mx-auto flex items-center justify-between rounded-full border border-secondary p-1 text-sm lowercase tracking-wider text-secondary sm:mt-8 md:mt-12 md:p-2 md:text-lg lg:w-fit lg:text-xl"
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
                className={`relative z-10 transition-all delay-100 ${activeCategory === category ? 'text-tertiary' : ''}`}
              >
                {category}
              </span>
            </div>
          ))}
        </motion.div>

        {activeCategory === 'TECHNICAL' && (
          <div className="flex justify-end gap-6 max-sm:justify-center xl:absolute xl:right-16 xl:top-[348px]">
            <CustomSelect
              className="text-md cursor-pointer rounded-lg bg-primary text-secondary focus:outline-none focus:ring-0 md:text-xl"
              onChange={(e) => handleBranchChange(e.target.value)}
            >
              {branches.map((branch) => (
                <option key={branch} value={branch} className="cursor-pointer">
                  {branch}
                </option>
              ))}
            </CustomSelect>

            <CustomSelect
              className="text-md cursor-pointer rounded-lg bg-primary text-secondary focus:outline-none focus:ring-0 md:text-xl"
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'tween', duration: 0.2 }} // Fast tween, no delay
            className="my-10 flex flex-wrap justify-center gap-5"
          >
            {eventList
              .filter(
                (event) =>
                  event.category === activeCategory &&
                  (activeBranch === 'ALL' || event.branch === activeBranch) &&
                  (activeType === 'ALL EVENTS' || event.type === activeType),
              )
              .map((event) => (
                <Link href={event.url} key={event.name} target="_blank">
                  <div className="relative h-[18rem] w-[16rem] p-1 transition-all duration-200 ease-in hover:z-20 hover:scale-125 hover:bg-tertiary">
                    {/* <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                      <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div> */}

                    <div className="absolute left-0 top-0 h-5 w-5 border-l-4 border-t-4 border-secondary"></div>

                    <div className="absolute right-0 top-0 h-5 w-5 border-r-4 border-t-4 border-secondary"></div>

                    <div className="absolute bottom-0 left-0 h-5 w-5 border-b-4 border-l-4 border-secondary"></div>

                    <div className="absolute bottom-0 right-0 h-5 w-5 border-b-4 border-r-4 border-secondary"></div>

                    <Image
                      className="h-full w-full object-cover grayscale hover:grayscale-0"
                      src={event.src}
                      alt={event.name}
                      width={300}
                      height={300}
                    />
                  </div>
                </Link>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Events;
