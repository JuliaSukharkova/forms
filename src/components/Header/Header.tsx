import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { AlignJustify } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Header = () => {
  const formId = uuidv4();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-[4px] bg-muted flex justify-between items-center px-6 py-4 transition-shadow shadow-[var(--shadow)] h-20 text-base font-light">
      <NavLink to="/" className="cursor-pointer">
        <Logo />
      </NavLink>
      {isMobile ? (
        <>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              className="flex justify-center items-center"
              asChild
            >
              <button className="cursor-pointer [&_svg]:shrink-0 rounded-md p-2">
                <AlignJustify className="w-6 h-6 stroke-primary-text hover:stroke-primary cursor-pointer" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="center"
              sideOffset={4}
              className="w-fit p-2.5 bg-popover rounded-md  transition-shadow shadow-[var(--shadow)]"
            >
              <nav className="flex flex-col justify-center items-center gap-2.5">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "hover:text-primary"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to={`/form/${formId}/edit`}
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "hover:text-primary"
                  }
                >
                  New Form
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "hover:text-primary"
                  }
                >
                  Profile
                </NavLink>
                <ThemeToggle isMobile={isMobile} />
                <LogoutButton isMobile={isMobile} />
              </nav>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <nav className="flex items-center h-8 gap-7">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "hover:text-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={`/form/${formId}/edit`}
            className={({ isActive }) =>
              isActive ? "text-primary" : "hover:text-primary"
            }
          >
            New Form
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-primary" : "hover:text-primary"
            }
          >
            Profile
          </NavLink>
          <div className="flex items-center gap-5">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
