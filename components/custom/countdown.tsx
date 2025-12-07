'use client';

import { useEffect, useState } from 'react';

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const totalHours = Math.floor(diff / (1000 * 60 * 60)); // FULL HOURS LEFT

      setTimeLeft({
        hours: totalHours,
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-8 font-orbitron text-[5rem] font-bold text-quarternary max-md:flex-col max-md:gap-0">
      <div className="flex flex-col items-center justify-center">
        <span>{timeLeft.hours}:</span>
        <span className="text-[1rem] leading-none">Hours</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <span>{timeLeft.minutes}:</span>
        <span className="text-[1rem] leading-none">Minutes</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <span>{timeLeft.seconds}</span>
        <span className="text-[1rem] leading-none">Seconds</span>
      </div>
    </div>
  );
}
