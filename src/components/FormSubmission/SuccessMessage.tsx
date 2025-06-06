import { Check } from "lucide-react";

export const SuccessMessage = () => (
  <div className="flex flex-col justify-center items-center gap-5">
    <div className="flex justify-center items-center rounded-full w-20 h-20 bg-green">
      <Check className="w-10 h-10 stroke-primary-dark" />
    </div>
    <h1 className="text-xl">Response sent successfully!</h1>
  </div>
);
