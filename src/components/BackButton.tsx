import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <CircleArrowLeft
      onClick={() => navigate(-1)}
      className="w-10 h-10 text-primary hover:text-primary/70 transition-colors cursor-pointer"
    />
  );
};
