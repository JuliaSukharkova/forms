import { secondsToTime } from "@/hooks/useTime";
import { useEffect, useState } from "react";

type TimerProps = {
  timeLimit: number;
  onTimeEnd: () => void;
  title:  string
};

export const Timer = ({ timeLimit, onTimeEnd, title }: TimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(timeLimit);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeEnd();
    }
  }, [onTimeEnd, secondsLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center border border-border rounded-md ml-5 gap-1 w-[140px] h-20 py-5 transition-shadow shadow-[var(--shadow)] backdrop-blur-[4px]">
      <h1>{title}</h1>
      <p className="font-mono">{secondsToTime(secondsLeft)}</p>
    </div>
  );
};
