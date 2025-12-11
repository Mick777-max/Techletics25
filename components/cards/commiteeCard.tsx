import Image from 'next/image';

interface Details {
  role: string;
  name: string;
  src: string;
  profileUrl?: string;
}

interface CommitteeCardProps {
  info: Details;
  title?: string;
}

export default function CommitteeCard({ info, title }: CommitteeCardProps) {
  return title === 'Executive' ? (
    <div className="clipPolygon group relative flex min-h-80 w-52 cursor-pointer flex-col items-center gap-2 overflow-hidden border border-[#D4AF4080] bg-[#fff9d3] transition-all duration-300 hover:scale-110">
      <div className="absolute left-0 top-0 size-5 border-l-4 border-t-4 border-[#D4AF4080] transition-colors duration-300 group-hover:border-quarternary"></div>
      <div className="absolute bottom-0 right-0 size-5 border-b-4 border-r-4 border-[#D4AF4080] transition-colors duration-300 group-hover:border-quarternary"></div>

      <div className="mt-8 flex justify-center">
        <div className="size-36 overflow-hidden rounded-full border-2 border-[#79662f] bg-quarternary shadow-[0_0_20px_4px_rgba(199,154,66,0.6)] transition-all duration-300">
          <Image
            className="size-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
            src={info.src}
            alt="name"
            width={300}
            height={300}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 px-3 text-center">
        <span className="mx-1 text-wrap font-orbitron text-base font-semibold text-quarternary">
          {info.name}
        </span>

        <span className="px-2 font-opensans tracking-wide text-secondary md:text-base">
          {info.role.toUpperCase()}
        </span>
      </div>
    </div>
  ) : (
    <div className="clipPolygon group relative flex min-h-72 w-64 cursor-pointer flex-col items-center gap-2 overflow-hidden border border-[#A6A6A670] bg-[#f8f0be] transition-all duration-300 hover:scale-110">
      <div className="absolute left-0 top-0 size-12 border-l-2 border-t-2 border-[#A6A6A670] transition-colors duration-300 group-hover:border-quarternary"></div>
      <div className="absolute bottom-0 right-0 size-12 border-b-2 border-r-2 border-[#A6A6A670] transition-colors duration-300 group-hover:border-quarternary"></div>

      <div className="mt-8 flex justify-center">
        <div className="size-36 overflow-hidden rounded-full border border-secondary bg-[#403302] shadow-[0_0_20px_4px_rgba(199,154,66,0.6)] transition-all duration-300">
          <Image
            className="size-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
            src={info.src}
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
