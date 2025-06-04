import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = ({ isMobile }: { isMobile?: boolean }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toogleTheme = () => {
    setDark((prev) => !prev);
  };
  return isMobile ? (
    <div
      onClick={toogleTheme}
      className="flex gap-0.5 justify-center items-center hover:text-primary cursor-pointer"
    >
      {dark ? (
        <>
          <Sun className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
          Dark theme
        </>
      ) : (
        <>
          <Moon className="stroke-gray-900 w-5 h-5" />
          Light theme
        </>
      )}
    </div>
  ) : (
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
