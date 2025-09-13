import { CustomText } from '@/components/custom';
import { featuredEventList } from './eventlist';
import Link from 'next/link';
import Image from 'next/image';
import SectionLayout from '@/layouts/section-layout';

const FeaturedEvents = () => {
  return (
    <SectionLayout>
      <div className="font-primary flex w-full flex-col items-center justify-center gap-12 py-6 text-secondary lg:py-12">
        <CustomText title>
          FEATURED &nbsp;<CustomText highlightedTitle>EVENT WEBITES</CustomText>
        </CustomText>
      </div>

      <div className="my-10 flex flex-wrap justify-center gap-5">
        {featuredEventList.map((event) => (
          <Link href={event.url} key={event.name} target="_blank">
            <div className="relative h-[18rem] w-[16rem] p-2 transition-all duration-200 ease-in hover:scale-125 hover:bg-tertiary hover:z-20 hover:border-[0.1px] hover:border-secondary group">
            
                              <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            
                              <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            
                              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            
                              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            
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
    </SectionLayout>
  );
};

export default FeaturedEvents;
