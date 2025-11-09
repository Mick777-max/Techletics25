import { CommitteeCard } from '@/components/cards';
import { committees } from './commitees';
import TextMarquee from '@/components/marquee';

export default function Committee() {
  return (
    <div className="relative mx-auto max-w-screen-xl px-2">
      {committees.map((item, index) => (
        <div key={index} className="px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col justify-center py-6 lg:py-12">
            <h2 className="font-orbitron text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl">
              <span className="text-quarternary">{item.title}</span>
              &nbsp;Committee
            </h2>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-9">
              {item.details.map((info, index) => (
                <CommitteeCard info={info} key={index} title={item.title} />
              ))}
            </div>
          </div>

          {index !== committees.length - 1 ? (
            <div className="h-[0.3rem] w-[60%] bg-gradient-to-r from-secondary to-transparent"></div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}
