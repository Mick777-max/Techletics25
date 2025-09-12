'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import SectionLayout from '@/layouts/section-layout';
import { CustomSelect, CustomText } from '@/components/custom';
import { eventList } from './eventlist';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    <SectionLayout>
      <div className="flex flex-col justify-center gap-6 bg-primary pt-6 lg:pt-12">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-center gap-2">
            <CustomText title>
              WITNESS THE&nbsp;
              <span className="text-secondary">TECH CULTURE</span>
              EXTRAVAGNAZA.
            </CustomText>
            <CustomText description>
              Explore, Learn, and Enjoy: The Events of Techletics &apos;24
            </CustomText>
          </div>
          <Image
            src="/image/dolls.svg"
            width={500}
            height={500}
            alt="Divider"
            priority
            className="mt-2 hidden h-64 w-auto md:block"
          />
        </div>

        <motion.div
          layout
          className="mx-auto mt-4 flex items-center justify-between rounded-full border border-secondary p-1 text-sm lowercase tracking-wider text-secondary sm:mt-8 md:mt-12 md:p-2 md:text-lg lg:w-fit lg:text-xl relative"
        >
          {categories.map((category) => (
            <div
              key={category}
              className="relative cursor-pointer uppercase px-6 py-1 lg:px-8"
              onClick={() => handleCategoryChange(category)}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="category-underline"
                  className="rounded-full absolute bottom-0 left-0 h-full bg-secondary w-full"
                  transition={
                    { type: 'spring', stiffness: 200, damping: 30 }
                  }
                />
              )}
              <span className={`relative z-10 ${activeCategory === category ? 'text-tertiary' : ''}`}>
                {category}
              </span>
            </div>
          ))}
        </motion.div>

        {activeCategory === 'TECHNICAL' && (
          <div className="flex justify-end gap-6 xl:absolute xl:right-16 xl:top-[348px]">
            <CustomSelect
              className="text-md cursor-pointer bg-primary text-secondary focus:outline-none focus:ring-0 md:text-xl"
              onChange={(e) => handleBranchChange(e.target.value)}
            >
              {branches.map((branch) => (
                <option key={branch} value={branch} className="cursor-pointer">
                  {branch}
                </option>
              ))}
            </CustomSelect>

            <CustomSelect
              className="text-md cursor-pointer bg-primary text-secondary focus:outline-none focus:ring-0 md:text-xl"
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

        <div className="my-10 flex flex-wrap justify-center gap-5">
          {eventList
            .filter(
              (event) =>
                event.category === activeCategory &&
                (activeBranch === 'ALL' || event.branch === activeBranch) &&
                (activeType === 'ALL EVENTS' || event.type === activeType),
            )
            .map((event) => (
              <Link href={event.url} key={event.name} target="_blank">
                <div className="relative h-[18rem] w-[16rem] p-2 transition-all duration-200 ease-in hover:scale-125">
  
{/*   
  <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-secondary"></div>
  
  
  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-secondary"></div>
  
  
  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-secondary"></div>
  
  
  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-secondary"></div> */}

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
        </div>
      </div>
    </SectionLayout>
  );
};

export default Events;
