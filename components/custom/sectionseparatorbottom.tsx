import Image from 'next/image';

export default function SectionSeparatorBottom() {
  return (
    <div className="absolute bottom-0 z-40 w-full">
      <Image
        src="/icons/section-separator-bottom.png"
        alt="section separator"
        width={1000}
        height={50}
        className="h-auto w-full"
      />
    </div>
  );
}
