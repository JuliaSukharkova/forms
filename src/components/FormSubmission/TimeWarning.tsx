import { formatTimeString } from "@/hooks/useTime";
import { Button } from "../ui/button";

export const TimeWarning = ({
  time,
  onStart,
  title,
  titleDescOne,
  titleDescSecond,
  timeButton,
  hourTitle,
  minTitle,
  secTitle,
  plural,
  secondsTitle,
}: {
  time: string;
  onStart: () => void;
  title: string;
  titleDescOne: string;
  titleDescSecond: string;
  timeButton: string;
  hourTitle: string;
  minTitle: string;
  secTitle: string;
  plural: string;
  secondsTitle: string;
}) => (
  <div className="flex flex-col justify-center items-center gap-3">
    <h1 className="text-xl font-medium">{title}</h1>
    <p>
      {titleDescOne}{" "}
      {formatTimeString(
        time,
        hourTitle,
        minTitle,
        secTitle,
        plural,
        secondsTitle
      )}
      {titleDescSecond}
    </p>
    <Button onClick={onStart} className="py-1 px-8 cursor-pointer">
      {timeButton}
    </Button>
  </div>
);
