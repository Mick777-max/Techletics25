import Home from '@/components/home';
import Homeabout from '@/components/homeabout';
import TextMarquee from '@/components/marquee';
import Stats from '@/components/statsnew';
import type { Metadata } from 'next';
import Image from 'next/image';
import Stars from '@/components/canvas/Stars';
import StarsCanvas from '@/components/canvas/Stars';

export const metadata: Metadata = {
  title: 'Home',
  description:
    "Welcome to Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function HomePage() {
  return (
    <div className="w-full min-w-80">
      <section className="relative bg-[url('/image/bg-about.png')] bg-cover bg-center">
        {/* <StarsCanvas color="#ff1282" /> */}
        {/* <Image
          src="/image/Grid.svg"
          alt="bg"
          width={1000}
          height={500}
          className="absolute inset-0 z-10 h-full w-full bg-cover bg-center bg-no-repeat opacity-50"
        /> */}
        <Home />
      </section>

      {/* <TextMarquee bgColor="secondary" /> */}
      <TextMarquee type="ignite" />

      {/* <div className='w-full'>
        <Image 
         src='/icons/section-separator-top.png'
         alt="section separator"
         width={1000}
         height={50}
         className='w-full h-auto'/>
      </div> */}

      <section className="relative bg-[url('/image/bg-about.png')] bg-cover bg-center">
        {/* <div className="hidden xl:absolute xl:right-0 xl:top-[10px] xl:z-20 xl:block">
          <Image
            src="/image/flower.svg"
            alt="flower"
            width={250}
            height={250}
            className=""
          />
        </div> */}

        <div className="absolute top-0 w-full">
          <Image
            src="/icons/section-separator-top.png"
            alt="section separator"
            width={1000}
            height={50}
            className="h-auto w-full"
          />
        </div>

        <Homeabout />

        <div className="absolute bottom-0 w-full">
          <Image
            src="/icons/section-separator-bottom.png"
            alt="section separator"
            width={1000}
            height={50}
            className="h-auto w-full"
          />
        </div>
      </section>

      <TextMarquee type="ignite" />

      <section className="relative bg-[url('/image/bg-stats.png')] bg-cover bg-center py-[4rem] max-cmd:pb-[11rem] max-md:pb-[35rem]">
        <div className="absolute top-0 w-full">
          <Image
            src="/icons/section-separator-top.png"
            alt="section separator"
            width={1000}
            height={50}
            className="h-auto w-full"
          />
        </div>

        <span id="stats"></span>

        <Stats />

        <div className="absolute bottom-0 w-full">
          <Image
            src="/icons/section-separator-bottom.png"
            alt="section separator"
            width={1000}
            height={50}
            className="h-auto w-full"
          />
        </div>
      </section>

      <TextMarquee type="techletics" />

      <section className="relative bg-quarternary">
        <div className="absolute top-0 w-full">
          <Image
            src="/icons/section-separator-top.png"
            alt="section separator"
            width={1000}
            height={50}
            className="h-auto w-full"
          />
        </div>

        <div className="absolute bottom-0 w-full">
          <Image
            src="/icons/section-separator-bottom.png"
            alt="section separator"
            width={1000}
            height={50}
            className="h-auto w-full"
          />
        </div>
      </section>
    </div>
  );
}
