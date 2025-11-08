import Image from 'next/image';

export default function Filler() {
  return (
    <div className="relative mx-auto h-full max-w-screen-xl bg-[url('/image/image.png')] bg-cover bg-center"></div>
  );
}
