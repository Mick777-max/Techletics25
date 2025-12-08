import Image from 'next/image';

export default function HomeGalleryImageView({
  src,
  index,
}: {
  src: string;
  index: number;
}) {
  const delayClass =
    index === 0 ? 'delay-0' : index === 1 ? 'delay-200' : 'delay-300';

  return (
    <div
      className={`imagePolygonWrapper h-64 min-h-fit min-w-80 animate-slowBounce bg-secondary p-2 xl:w-full xl:flex-1 ${delayClass}`}
    >
      <Image
        src={src}
        width={1500}
        height={1500}
        alt="Gallery Image 1"
        className="imagePolygonWrapper size-full object-cover"
      />
    </div>
  );
}
