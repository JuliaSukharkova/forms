import { getAuth, signOut } from "firebase/auth";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({
  isMobile,
  title,
}: {
  isMobile?: boolean;
  title: string;
}) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return isMobile ? (
    <div
      onClick={handleLogout}
      className="flex gap-0.5 justify-center items-center hover:text-primary cursor-pointer"
    >
      <LogOutIcon className="h-5 w-5" />
      {title}
    </div>
  ) : (
    <button
      className="cursor-pointer [&_svg]:shrink-0 hover:bg-accent rounded-md p-2 flex items-center"
      onClick={handleLogout}
    >
      <LogOutIcon className="h-[18px] w-[18px] stroke-primary" />
    </button>
  );
};
export default LogoutButton;
