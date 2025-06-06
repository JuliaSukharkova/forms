import { formatTimeString } from "@/hooks/useTime";
import { Button } from "../ui/button";

export const TimeWarning = ({
  time,
  onStart,
}: {
  time: string;
  onStart: () => void;
}) => (
  <div className="flex flex-col justify-center items-center gap-3">
    <h1 className="text-xl font-medium">Attention!</h1>
    <p>You have {formatTimeString(time)} to fill out this form!</p>
    <Button onClick={onStart} className="py-1 px-8 cursor-pointer">
      Start
    </Button>
  </div>
);
