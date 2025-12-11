import Image from 'next/image';

export default function GlassCapsules() {
  return (
    <div className="relative mx-auto h-full max-w-screen-xl bg-glassCapsules bg-cover bg-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/logos/techletics-logo.svg"
          alt="Techletics Logo"
          height={300}
          width={300}
          className="animate-slowBounce object-contain"
        />
      </div>
    </div>
  );
}
