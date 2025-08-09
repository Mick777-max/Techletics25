import { CommitteeCard } from "@/components/cards";
import { committees } from "./commitees";

export default function Committee() {
  return (
    <>
      {committees.map((item, index) => (
        <div key={index} className="px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col items-center justify-center py-6 lg:py-12">
            <h2 className="text-3xl font-bold text-center sm:text-4xl lg:text-5xl">
              <span className="text-primary">{item.title}</span>
              &nbsp;committee
            </h2>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              {item.details.map((info, index) => (
                <CommitteeCard info={info} key={index} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}