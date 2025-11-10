import Image from 'next/image';

export default function Filler() {
  return (
    <div className="relative mx-auto h-full max-w-screen-xl bg-[url('/image/image2.png')] bg-cover bg-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-slowBounce rounded-full">
          <Image
            src="/logos/techletics-logo.png"
            alt="Techletics Logo"
            height={300}
            width={300}
            className="animate-glow rounded-full object-contain py-[0.75rem] pl-[1.75rem]"
          />
        </div>
      </div>
    </div>
  );
}
