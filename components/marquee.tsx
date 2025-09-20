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
      className={clsx('z-50 w-full min-w-80 overflow-visible', {
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
              className={clsx('py-2 text-4xl md:text-5xl', {
                'text-tertiary': textColor === 'light',
                'text-primary': textColor === 'dark',
              })}
            >
              <div className="relative flex items-center justify-center gap-5">
                <span
                  className="ml-5 text-white"
                  style={{
                    WebkitTextStroke: '2px black',
                  }}
                >
                  ✦
                </span>
                <span>
                  <Image
                    src="/icons/techletics25.svg"
                    alt="Techletics 25"
                    width={1000}
                    height={1000}
                    priority
                    className="w-56 md:w-72"
                  />
                </span>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="relative flex items-center justify-center py-2 text-4xl md:text-5xl"
            >
              <span
                className="ml-5 text-white"
                style={{
                  WebkitTextStroke: '2px black',
                }}
              >
                ✦
              </span>
              <span>
                <Image
                  src="/icons/ignite.svg"
                  alt="Techletics 25"
                  width={1000}
                  height={1000}
                  priority
                  className="h-10 w-40"
                />
              </span>
              <span
                className="text-white"
                style={{
                  WebkitTextStroke: '2px black',
                }}
              >
                ✦
              </span>
              <span>
                <Image
                  src="/icons/inspire.svg"
                  alt="Techletics 25"
                  width={1000}
                  height={1000}
                  priority
                  className="h-10 w-40"
                />
              </span>
              <span
                className="text-white"
                style={{
                  WebkitTextStroke: '2px black',
                }}
              >
                ✦
              </span>
              <span>
                <Image
                  src="/icons/illuminate.svg"
                  alt="Techletics 25"
                  width={1000}
                  height={1000}
                  priority
                  className="ml-5 h-10 w-40"
                />
              </span>
            </div>
          ),
        )}
      </Marquee>
    </section>
  );
};

export default TextMarquee;
