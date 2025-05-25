import { cn } from "@/lib/utils";

interface IText {
  text?: string;
  className?: string;
}

export const Title = ({ text, className }: IText) => {
  return <h1 className={cn("text-2xl font-semibold text-foreground", className)}>{text}</h1>;
};
