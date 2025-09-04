import Image from 'next/image';

export default function Homeabout() {
  return (
    <main className="h-screen w-full bg-primary px-3 md:relative">
      <div className="text-4xl md:text-6xl">
        <h1 className="pt-10 font-secondary text-quarternary md:pt-20">
          ARE YOU A <span className="text-secondary">TECH ENTHUSIAST?</span>{' '}
          THEN{' '}
        </h1>
        <h1 className="font-secondary text-quarternary">
          <span className="text-secondary">TECHLETICS &apos;25</span> IS FOR
          YOU.
        </h1>
      </div>
      <div className="hidden md:absolute md:-top-10 md:right-0 md:block">
        <Image
          src="/image/flower.svg"
          alt="flower"
          width={250}
          height={250}
          className="-z-10"
        />
      </div>
      <div className="max-w-screen-sm">
        <p className="text-quarternary md:pt-10">
          Join us for the third edition of Techletics, the techno-cultural
          festival of Christ College of Engineering. Explore, learn, and enjoy
          the latest innovations and trends in technology and culture.
          Participate in workshops, competitions, exhibitions, performances, and
          more. Win prizes and awards. Ignite your passion, inspire your future
          and illuminate your mind. Techletics &apos;24 is the ultimate
          rendezvous of innovation and zest. Don&apos;t miss it.
        </p>
        <p className="pt-5 text-quarternary">
          Techletics &apos;24 is a techno-cultural techfest organized by Christ
          College of Engineering, Irinjalakuda in 2024. The techfest aims to
          provide a platform for technical students and develop students and
          people from all walks of life
        </p>
      </div>
    </main>
  );
}
