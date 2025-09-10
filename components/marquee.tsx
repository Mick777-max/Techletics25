import clsx from 'clsx';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

interface TextMarqueeProps {
  textColor?: 'light' | 'dark';
  type?: 'primary' | 'secondary';
  bgColor?:
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quarternary'
  | 'transparent';
}

const TextMarquee = ({
  textColor = 'light',
  type = 'primary',
  bgColor = 'primary',
}: TextMarqueeProps) => {
  return (
    <section
      className={clsx('w-full min-w-80 overflow-visible', {
        'bg-primary': bgColor === 'primary',
        'bg-secondary': bgColor === 'secondary',
        'border-b border-secondary border-opacity-30 bg-tertiary':
          bgColor === 'tertiary',
        'bg-quarternary': bgColor === 'quarternary',
        'bg-transparent': bgColor === 'transparent',
      })}
    >
      <Marquee>
        {[...Array(10)].map((index) =>
          type === 'primary' ? (
            <div
              key={index}
              className={clsx('font-primary flex gap-10 text-7xl py-1', {
                'text-tertiary': textColor === 'light',
                'text-primary': textColor === 'dark',
              })}
            >
              <Image
                src="/icons/diamondw.svg"
                alt="Diamond Icon"
                width={30}
                height={30}
                className="ml-[2.5rem]"
              />
              <div className='relative'>
                <span
                  className="font-extrabold font-secondary text-white"
                  style={
                    {
                      WebkitTextStroke: "3px black"
                    }
                  }
                >
                  TECHLETICS&apos; 25
                </span>

              </div>
            </div>
          ) : (
            <p
              key={index}
              className={clsx(
                'font-primary flex gap-3 py-1 text-4xl md:py-2 md:text-5xl',
                {
                  'text-tertiary': textColor === 'light',
                  'text-primary': textColor === 'dark',
                },
              )}
            >
              <span className="ml-4">◌</span>
              <span>IGNIͲς</span>
              <span>✺</span>
              <span>INSPIRe</span>
              <span>🌞</span>
              <span>ILLUMINⱭͲς</span>
            </p>
          ),
        )}
      </Marquee>
    </section>
  );
};

export default TextMarquee;
