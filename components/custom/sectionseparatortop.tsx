import Image from 'next/image';

export default function SectionSeparatorTop() {
  return (
    <div className="absolute top-0 z-40 w-full">
      <Image
        src="/icons/section-separator-top.png"
        alt="section separator"
        width={1000}
        height={50}
        className="h-auto w-full"
      />
    </div>
  );
}
