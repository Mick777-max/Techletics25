'use client';

import { useEffect, useState } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);

      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col gap-8 font-orbitron text-7xl font-bold text-quarternary md:flex-row">
      <div className="flex flex-col items-center justify-center">
        <span>{timeLeft.days.toString().padStart(2, '0')}:</span>
        <span className="text-base leading-none">Days</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <span>{timeLeft.hours.toString().padStart(2, '0')}:</span>
        <span className="text-base leading-none">Hours</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <span>{timeLeft.minutes.toString().padStart(2, '0')}:</span>
        <span className="text-base leading-none">Minutes</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className="text-base leading-none">Seconds</span>
      </div>
    </div>
  );
}
