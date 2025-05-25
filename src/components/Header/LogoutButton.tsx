import { getAuth, signOut } from "firebase/auth";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
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

  return (
    <button
      className="cursor-pointer [&_svg]:shrink-0 hover:bg-accent rounded-md p-2"
      onClick={handleLogout}
    >
      <LogOutIcon className="h-[18px] w-[18px] stroke-amber-600" />
    </button>
  );
};
export default LogoutButton;
