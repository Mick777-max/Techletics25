import SectionLayout from '@/layouts/section-layout';
import Image from 'next/image';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <SectionLayout>
      <div className="flex flex-wrap items-center justify-between py-2 font-secondary text-4xl tracking-wide text-quarternary sm:text-5xl md:text-7xl lg:mt-12 xl:mt-8">
        <span className="mr-4">{title}</span>
        <div className="flex gap-1">
          <Image
            src="/icons/barcode.svg"
            width={424}
            height={128}
            alt="Barcode"
            priority
            className="hidden h-[88px] w-auto 2xl:flex 2xl:h-24"
          />
        </div>
      </div>
    </SectionLayout>
  );
};

export default Title;
