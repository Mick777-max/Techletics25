export default function Memories() {
  return (
    <div className="relative mx-auto flex h-[80%] w-full max-w-screen-xl flex-col items-center justify-center bg-[url('/image/ruins-bg-grey.png')] bg-cover bg-center px-4">
      <div className="relative flex flex-col items-center justify-center break-words text-center font-orbitron text-[3rem] font-bold leading-none text-quarternary max-md:text-[2.6rem]">
        <div
          className="absolute z-20 flex flex-col items-center justify-center break-words bg-blue-800 text-center font-orbitron text-[3rem] font-bold leading-none text-secondary max-md:text-[2.6rem]"
          style={{
            clipPath: 'polygon(50% 15%, 66% 50%, 50% 85%, 34% 50%)',
          }}
        >
          {/* <div className="h-[4rem] w-[4rem] absolute">
              <Image
              src="/logos/techletics-light-logo.svg"
              alt="logo"
              width={30}
              height={30}
              className="h-full w-full absolute z-30 opacity-50"/>
            </div> */}

          {/* 50% 15% - Top point of the diamond

50% = horizontally centered (middle of the width)
15% = 15% down from the top edge


66% 50% - Right point of the diamond

66% = 66% across from the left (34% from right edge)
50% = vertically centered (middle of the height)


50% 85% - Bottom point of the diamond

50% = horizontally centered
85% = 85% down from the top (15% from bottom edge)


34% 50% - Left point of the diamond

34% = 34% from the left edge
50% = vertically centered */}

          <div className="z-20 w-full break-words text-secondary">
            GLIMPSE INTO
          </div>
          <div className="z-20 w-full break-words text-secondary">
            THE MEMORIES
          </div>
          <div className="z-20 w-full break-words text-secondary">WE HAVE</div>
          <div className="z-20 w-full break-words text-secondary">CREATED</div>
        </div>

        <div className="relative w-full break-words">GLIMPSE INTO</div>

        <div className="relative w-full break-words">THE MEMORIES</div>

        <div className="relative w-full break-words">WE HAVE</div>

        <div className="relative w-full break-words">CREATED</div>
      </div>
    </div>
  );
}
