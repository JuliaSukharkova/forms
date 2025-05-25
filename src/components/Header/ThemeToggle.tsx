import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toogleTheme = () => {
    setDark((prev) => !prev);
  };
  return (
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent  group/toggle cursor-pointer p-2"
      onClick={toogleTheme}
    >
      {dark ? (
        <Sun className="stroke-yellow-400 fill-yellow-400 w-[18px] h-[18px]" />
      ) : (
        <Moon className="stroke-gray-900 w-[18px] h-[18px]" />
      )}
    </button>
  );
};
export default ThemeToggle;
