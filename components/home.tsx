'use client';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-[90vh] w-full bg-primary gap-8 px-6">
      <Image
        src="/image/womanbg-1.png"
        alt="Woman"
        width={600}
        height={1000}
        className="h-[90%] w-auto object-cover -rotate-6" // rotate-6 rotates ~6 degrees
      />
      
      <div className="flex flex-col items-center md:items-start gap-2">
        <div className="flex items-center gap-4">
 <span className="leading-none -rotate-6 font-secondary text-quarternary text-[80px] font-extrabold">
          IGNITE.INSPIRE.
        </span>
        <Image
            src="/icons/Vector.svg"
            alt="Spark icon"
            width={100}
            height={100}
            className="h-[100px] w-auto"
          />
        </div>

       

        
        <div className="flex items-center gap-4">
          <span className="leading-none font-secondary text-quarternary text-[120px] font-extrabold">
            ILLUMINATE.
          </span>
          
        </div>
      </div>

      


    </div>




  );
}
