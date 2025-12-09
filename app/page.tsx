import SectionSeparator from '@/components/custom/sectionSeparator';
import Hero from '@/components/hero';
import Memories from '@/components/memories';
import Stats from '@/components/stats';
import Image from 'next/image';
import type { Metadata } from 'next';
import Filler from '@/components/filler';
import HomeGalleryImageView from '@/components/homeGalleryImageView';
import { GalleryImages } from './data';
import DynamicTextMarquee from '@/components/custom/marquee';

export const metadata: Metadata = {
  title: 'Home',
  description:
    "Welcome to Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function HomePage() {
  return (
    <div className="w-full min-w-80">
      <section className="relative bg-black">
        <Hero />
        <SectionSeparator position="bottom" />
      </section>

      <DynamicTextMarquee type="ignite" />

      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparator position="top" />

        <main className="pb-50 relative mx-auto flex h-auto max-w-7xl flex-col items-start overflow-hidden max-md:items-center">
          <div className="text-3xl md:text-5xl">
            <h1 className="pt-10 font-orbitron font-medium text-quarternary max-xl-wide:mx-3 md:pt-20">
              ARE YOU A{' '}
              <span className="text-secondary">TECH ENTHUSIAST?{'  '}</span>THEN{' '}
              <span className="text-secondary">TECHLETICS &apos;26</span> IS FOR
              YOU.
            </h1>
          </div>

          <div className="flex max-w-[90%] items-center justify-center pb-6 max-md:flex-col">
            <div className="shrink-0">
              <Image
                src="/logos/techletics-logo.svg"
                alt="logo"
                width={500}
                height={500}
                className="h-auto w-96"
              />
            </div>

            <div className="max-md:mx-3">
              <p className="font-orbitron text-[1.125rem] text-quarternary">
                Join us for the fourth edition of Techletics, the
                techno-cultural festival of Christ College of Engineering.
                Explore, learn, and enjoy the latest innovations and trends in
                technology and culture. Participate in workshops, competitions,
                exhibitions, performances, and more. Win prizes and awards.
                Ignite your passion, inspire your future and illuminate your
                mind. Techletics &apos;26 is the ultimate rendezvous of
                innovation and zest. Don&apos;t miss it.
              </p>
              <p className="pt-5 font-orbitron text-[1.125rem] text-quarternary">
                Techletics &apos;26 is a techno-cultural techfest organized by
                Christ College of Engineering, Irinjalakuda in 2026. The
                techfest aims to provide a platform for technical students and
                develop students and people from all walks of life
              </p>
            </div>
          </div>
        </main>

        <SectionSeparator position="bottom" />
      </section>

      <DynamicTextMarquee type="techletics" />

      <section className="relative bg-[url('/image/ruins-bg-grey.png')] bg-cover bg-center py-[4rem] max-xl-wide:pb-[11rem] max-md:pb-[35rem]">
        <SectionSeparator position="top" />

        <span id="stats"></span>

        <Stats />

        <SectionSeparator position="bottom" />
      </section>

      <DynamicTextMarquee type="ignite" />

      <section className="relative flex h-[100vh] flex-col items-center justify-center bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparator position="top" />

        <Memories />

        <SectionSeparator position="bottom" />
      </section>

      <section className="relative bg-quarternary bg-[url('/image/footer.png')] bg-cover bg-center py-[5rem]">
        <SectionSeparator position="top" />
        <div className="relative mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-16 p-4 xl:flex-row">
          {GalleryImages.slice(-3).map((imageData, imageIndex) => (
            <HomeGalleryImageView
              src={imageData}
              key={imageData}
              index={imageIndex}
            />
          ))}
        </div>

        {/* <SectionSeparator position="bottom" /> */}
      </section>

      {/* <TextMarquee type="ignite" /> */}

      <section className="relative h-[90vh] bg-black">
        <Filler />
      </section>

      {/* <TextMarquee type="techletics" /> */}

      {/* <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparator position="top" />

        <Media />

        <SectionSeparator position="bottom" />
      </section> */}

      <DynamicTextMarquee type="ignite" />
    </div>
  );
}
