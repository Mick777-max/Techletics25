'use client';

import Image from 'next/image';

interface Details {
  role: string;
  name: string;
  src: string;
  profileUrl?: string;
}

interface CommitteeCardProps {
  info: Details;
  title?: string; // <-- new optional prop
}

export default function CommitteeCard({ info, title }: CommitteeCardProps) {
  return title === 'Executive' ? (
    <div
      className="group relative flex min-h-[320px] w-[214px] cursor-pointer flex-col items-center gap-2 overflow-hidden border border-[#D4AF4080] bg-[#fff9d3] shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
      style={{
        clipPath:
          'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
      }}
    >
      <div className="absolute left-0 top-0 h-5 w-5 border-l-4 border-t-4 border-[#D4AF4080] transition-colors duration-300 group-hover:border-quarternary"></div>
      <div className="absolute bottom-0 right-0 h-5 w-5 border-b-4 border-r-4 border-[#D4AF4080] transition-colors duration-300 group-hover:border-quarternary"></div>

      <div className="mt-8 flex justify-center">
        <div className="h-[8.5rem] w-[8.5rem] overflow-hidden rounded-full border border-secondary bg-quarternary shadow-[0_0_20px_4px_rgba(199,154,66,0.6)] transition-all duration-300">
          {/* Member Image */}
          <Image
            className="h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
            src="/image/mohanlal.png"
            alt="name"
            width={300}
            height={300}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 px-3 text-center">
        <span className="mx-1 text-wrap font-orbitron text-[1.1rem] font-semibold text-quarternary">
          {info.name}
        </span>

        <span className="px-2 font-opensans tracking-wide text-secondary md:text-base">
          {info.role.toUpperCase()}
        </span>
      </div>
    </div>
  ) : (
    <div
      className="group relative flex min-h-[280px] w-[274px] cursor-pointer flex-col items-center gap-2 overflow-hidden border border-[#A6A6A670] bg-[#f8f0be] shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
      style={{
        clipPath:
          'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
      }}
    >
      {/* <div className="absolute left-0 top-0 h-5 w-5 border-l-4 border-t-4 border-[#A6A6A670] transition-colors duration-300 group-hover:border-quarternary"></div>
      <div className="absolute bottom-0 right-0 h-5 w-5 border-b-4 border-r-4 border-[#A6A6A670] transition-colors duration-300 group-hover:border-quarternary"></div> */}

      <div className="absolute right-0 top-0 h-[3rem] w-[3rem] border-r-[0.15rem] border-t-[0.15rem] border-[#A6A6A670] transition-colors duration-300 group-hover:border-quarternary"></div>
      <div className="absolute bottom-0 left-0 h-[3rem] w-[3rem] border-b-[0.15rem] border-l-[0.15rem] border-[#A6A6A670] transition-colors duration-300 group-hover:border-quarternary"></div>

      <div className="mt-6 flex justify-center">
        <div className="h-[8.5rem] w-[8.5rem] overflow-hidden rounded-full border border-secondary bg-[#403302] shadow-[0_0_20px_4px_rgba(199,154,66,0.6)] transition-all duration-300">
          <Image
            className="h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
            src="/image/mohanlal.png"
            alt="name"
            width={300}
            height={300}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center px-3 text-center">
        <span className="text-wrap font-orbitron text-lg font-semibold text-quarternary">
          {info.name}
        </span>
        <span className="font-opensans text-sm tracking-wide text-secondary md:text-base">
          {info.role.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
