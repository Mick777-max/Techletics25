import Image from 'next/image';

export default function sectionSeparator({
  position,
}: {
  position: 'top' | 'bottom';
}) {
  return (
    <div
      className={`absolute ${position === 'top' ? 'top-0 rotate-180' : 'bottom-0'} z-40 w-full`}
    >
      <Image
        src="/icons/section-separator.png"
        alt="section separator"
        width={1000}
        height={50}
        className="h-auto w-full"
      />
    </div>
  );
}
