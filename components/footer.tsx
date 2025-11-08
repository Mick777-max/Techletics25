'use client';

import Image from 'next/image';
import { SocialIcon } from './svg/icons';
import SectionLayout from '@/layouts/section-layout';
import { CustomLink, CustomText } from '@/components/custom';

// const SocialConnect = () => {
//   return (
//     <SectionLayout full className="bg-quarternary">
//       <div className="flex w-full flex-col overflow-clip lg:flex-row">
//         {/* Left Section */}
//         <div className="flex flex-col items-center justify-center gap-6 border-r border-transparent px-12 py-6 lg:w-1/2 lg:flex-row lg:border-quarternary lg:p-12">
//           <CustomLink href="https://cce.edu.in" target="_blank">
//             <Image
//               src="https://dnbca6q7do6n.cloudfront.net/media/techletics24/cce-logo-landscape.png"
//               width={248}
//               height={64}
//               alt="Christ College of Engineering Logo"
//               priority
//             />
//           </CustomLink>
//           <Image
//             src="/icons/join.svg"
//             width={16}
//             height={16}
//             alt="Join Icon"
//             priority
//           />
//           <Image
//             src="https://dnbca6q7do6n.cloudfront.net/media/techletics24/advaya-logo_MTHagDV.png"
//             width={88}
//             height={88}
//             alt="Advaya Logo"
//             priority
//           />
//         </div>

//         {/* Right Section */}
//         <div className="relative z-0 flex flex-wrap items-center justify-center gap-4 px-12 py-6 md:gap-8 lg:w-1/2 lg:p-12">
//           <p className="text-md whitespace-nowrap font-medium text-tertiary lg:text-lg">
//             FOLLOW US
//           </p>

//           <div className="z-[1] flex gap-6">
//             <CustomLink
//               href="https://www.instagram.com/techleticscce"
//               target="_blank"
//             >
//               <SocialIcon logo="instagram" />
//             </CustomLink>
//             <CustomLink
//               href="https://www.linkedin.com/school/christcollegeofengineering/"
//               target="_blank"
//             >
//               <SocialIcon logo="linkedin" />
//             </CustomLink>
//             {/* <Image
//               src="/logos/logo.png"
//               width={500}
//               height={500}
//               alt="Techetics Logo"
//               priority
//               className="absolute -bottom-12 left-0 right-0 z-[-1] -rotate-[35deg] opacity-15 md:-bottom-52 md:left-1/3"
//             /> */}
//           </div>
//         </div>
//       </div>
//     </SectionLayout>
//   );
// };

// const Connect = () => {
//   return (
//     <SectionLayout full className="bg-quarternary">
//       <div className="font-primary flex w-full flex-col justify-center gap-12 p-3 text-secondary md:p-6 lg:py-12">
//         <div className="flex flex-wrap justify-center align-middle">
//           <CustomText title className="text-white">
//             WANT TO&nbsp;
//             <CustomText highlightedTitle className="text-secondary">
//               KNOW MORE?
//             </CustomText>
//             CONNECT WITH US.
//           </CustomText>
//           {/* <Image
//             src="/image/dolls.svg"
//             width={500}
//             height={500}
//             alt="Techetics Logo"
//             priority
//             className="z-20 hidden h-64 w-auto md:block"
//           /> */}
//         </div>
//         <div className="flex w-fit flex-col gap-4">
//           <p className="w-fit text-justify font-secondary text-lg font-medium text-tertiary md:text-xl">
//             GET IN TOUCH
//           </p>
//           <div className="flex flex-wrap gap-4 md:gap-6 lg:justify-center lg:gap-12">
//             <div className="flex gap-4">
//               <Image
//                 src="/icons/arrow.svg"
//                 width={24}
//                 height={24}
//                 alt="Arrow Icon"
//                 priority
//               />
//               <CustomLink
//                 href="https://cce.edu.in/"
//                 target="_blank"
//                 className="font-secondary text-xl font-semibold text-primary hover:text-tertiary md:text-2xl xl:text-3xl"
//               >
//                 cce.edu.in
//               </CustomLink>
//             </div>
//             <div className="flex gap-4 self-center">
//               <Image
//                 src="/icons/arrow.svg"
//                 width={24}
//                 height={24}
//                 alt="Arrow Icon"
//                 priority
//               />
//               <div className="flex flex-wrap font-secondary text-lg font-extrabold md:text-xl xl:text-2xl">
//                 <CustomLink
//                   href="tel:+91 9400336647"
//                   className="whitespace-nowrap text-primary hover:text-tertiary"
//                 >
//                   +91 9400336647
//                 </CustomLink>
//                 <p>,&nbsp;</p>
//                 <CustomLink
//                   href="tel:+91 9072809994"
//                   className="whitespace-nowrap text-primary hover:text-tertiary"
//                 >
//                   +91 9072809994
//                 </CustomLink>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </SectionLayout>
//   );
// };

const Copyright = () => {
  return (
    <div className="relative mx-auto flex min-h-16 w-full max-w-screen-xl items-center justify-center overflow-clip border-t-[1px] border-tertiary bg-quarternary">
      <div className="absolute mt-2 flex w-full justify-center md:mt-8">
        <span
          className="whitespace-nowrap pt-8 align-middle font-secondary text-8xl leading-none tracking-widest text-transparent opacity-40 md:text-[9rem]"
          style={{ WebkitTextStroke: '1px rgba(231,230,228,0.4)' }} // instead of #e7e6e4
        >
          TECHLETICS
        </span>
      </div>
      <div>
        <span className="sm:text-md flex flex-wrap items-center justify-center text-sm text-secondary md:text-lg">
          <span className="whitespace-nowrap text-primary">
            Copyright © 2025&nbsp;
          </span>
          <CustomLink
            href="https://cce.edu.in"
            target="_blank"
            className="z-10 whitespace-nowrap text-secondary"
          >
            Christ College of Engineering.&nbsp;
          </CustomLink>
          <span className="whitespace-nowrap text-primary">
            All Rights Reserved
          </span>
        </span>
      </div>
    </div>
  );
};

const SocialAndConnect = () => {
  return (
    <SectionLayout full className="mx-auto max-w-screen-2xl bg-quarternary">
      <div className="flex w-full flex-col justify-center gap-12 text-secondary md:p-6 lg:py-12">
        <div className="flex flex-col flex-wrap justify-center gap-0 align-middle font-orbitron text-[3.9rem] font-bold text-tertiary">
          <div className="w-full">
            <span>
              WANT TO <span className="text-secondary">KNOW MORE?</span>
            </span>
          </div>

          <div className="w-full text-tertiary">
            <span>CONNECT WITH US.</span>
          </div>
        </div>

        <div className="flex w-fit flex-col gap-4">
          <p className="w-fit text-justify font-orbitron text-[2rem] font-medium text-secondary">
            GET IN TOUCH
          </p>

          <div className="flex flex-wrap gap-4 md:gap-6 lg:justify-center lg:gap-12">
            <div className="flex gap-4">
              <Image
                src="/icons/arrow.svg"
                width={24}
                height={24}
                alt="Arrow Icon"
                priority
              />
              <CustomLink
                href="https://cce.edu.in/"
                target="_blank"
                className="font-opensans text-xl font-semibold text-tertiary hover:text-secondary"
              >
                cce.edu.in
              </CustomLink>
            </div>

            <div className="flex gap-4 self-center">
              <Image
                src="/icons/arrow.svg"
                width={24}
                height={24}
                alt="Arrow Icon"
                priority
              />

              <div className="flex flex-wrap gap-4 font-opensans text-xl font-extrabold">
                <CustomLink
                  href="tel:+91 9400336647"
                  className="whitespace-nowrap text-tertiary hover:text-secondary"
                >
                  +91 9400336647
                </CustomLink>

                <CustomLink
                  href="tel:+91 9072809994"
                  className="whitespace-nowrap text-tertiary hover:text-secondary"
                >
                  +91 9072809994
                </CustomLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col overflow-clip lg:flex-row lg:justify-end">
        {/* <div className="flex flex-col items-center justify-center gap-6 border-r border-transparent px-12 py-6 lg:w-1/2 lg:flex-row lg:border-quarternary lg:p-12">
          <CustomLink href="https://cce.edu.in" target="_blank">
            <Image
              src="https://dnbca6q7do6n.cloudfront.net/media/techletics24/cce-logo-landscape.png"
              width={248}
              height={64}
              alt="Christ College of Engineering Logo"
              priority
            />
          </CustomLink>
          <Image
            src="/icons/join.svg"
            width={16}
            height={16}
            alt="Join Icon"
            priority
          />
          <Image
            src="https://dnbca6q7do6n.cloudfront.net/media/techletics24/advaya-logo_MTHagDV.png"
            width={88}
            height={88}
            alt="Advaya Logo"
            priority
          />
        </div> */}

        <div className="relative z-0 flex flex-wrap items-center justify-end gap-4 px-12 py-6 md:gap-8 lg:w-1/2 lg:p-12">
          <p className="text-md whitespace-nowrap font-medium text-tertiary lg:text-lg">
            FOLLOW US
          </p>

          <div className="z-[1] flex gap-6">
            <CustomLink
              href="https://www.instagram.com/techleticscce"
              target="_blank"
            >
              <SocialIcon logo="instagram" />
            </CustomLink>

            <CustomLink
              href="https://www.linkedin.com/school/christcollegeofengineering/"
              target="_blank"
            >
              <SocialIcon logo="linkedin" />
            </CustomLink>

            <CustomLink
              href="https://www.linkedin.com/school/christcollegeofengineering/"
              target="_blank"
            >
              <SocialIcon logo="x" />
            </CustomLink>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export { SocialAndConnect, Copyright };
