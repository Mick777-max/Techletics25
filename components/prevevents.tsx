export default function PrevEvents() {
  return (
    <div className="relative mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-[4rem] p-4 xl:flex-row">
      <div className="min-h-64 min-w-[20rem] animate-slowBounce bg-secondary [clip-path:polygon(0_0,calc(100%-6%)_0,100%_6%,100%_100%,6%_100%,0_calc(100%-6%))] xl:w-full xl:flex-1"></div>
      <div className="min-h-64 min-w-[20rem] animate-reverseBounce bg-secondary [clip-path:polygon(0_0,calc(100%-6%)_0,100%_6%,100%_100%,6%_100%,0_calc(100%-6%))] xl:w-full xl:flex-1"></div>
      <div className="min-h-64 min-w-[20rem] animate-slowBounce bg-secondary [clip-path:polygon(0_0,calc(100%-6%)_0,100%_6%,100%_100%,6%_100%,0_calc(100%-6%))] xl:w-full xl:flex-1"></div>
    </div>
  );
}
