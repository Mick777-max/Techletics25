import { CommitteeCard } from '@/components/cards';
import DynamicTextMarquee from '@/components/custom/marquee';
import { CommitteeData } from '@/app/data';

export default function Committee() {
  return (
    <div className="relative mx-auto max-w-screen-xl overflow-visible px-2 pt-6">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-secondary to-transparent"></div>

      {CommitteeData.map((item, index) => (
        <div key={index} className="relative px-4 py-6 sm:px-6 lg:px-12">
          <div className="flex flex-col justify-center py-6 lg:py-12">
            <h2 className="font-orbitron text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl">
              <span className="text-quarternary">{item.title}</span>
              &nbsp;Committee
            </h2>

            <div className="mt-2 h-[0.2rem] w-[15%] bg-gradient-to-r from-secondary to-transparent"></div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              {item.details.map((info, index) => (
                <div key={index}>
                  <CommitteeCard info={info} title={item.title} />
                </div>
              ))}
            </div>
          </div>

          {index !== CommitteeData.length - 1 ? (
            <div className="relative left-1/2 right-1/2 -ml-[50vw] mt-2 w-screen">
              <DynamicTextMarquee
                type="techletics"
                bg="black"
                text="tertiary"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}
