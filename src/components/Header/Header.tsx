import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { AlignJustify, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const formId = uuidv4();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

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
          <button
            className="flex justify-center items-center p-2 rounded-md"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <AlignJustify className="w-6 h-6 stroke-primary-text hover:stroke-primary cursor-pointer" />
          </button>
          {open && (
            <div
              className="fixed inset-0 bg-muted flex flex-col items-center justify-center z-50 p-6"
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute cursor-pointer top-6 right-6 p-2 rounded-md hover:bg-muted/80"
              >
                <X className="w-6 h-6 hover:stroke-primary stroke-primary-text" />
              </button>

              <nav className="flex flex-col justify-center items-center gap-6 text-primary-text text-xl">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className="hover:text-primary"
                >
                  {t("header.mainTitle")}
                </NavLink>
                <NavLink
                  to={`/form/${formId}/edit`}
                  onClick={() => setOpen(false)}
                  className="hover:text-primary"
                >
                  {t("header.newFormTitle")}
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="hover:text-primary"
                >
                  {t("header.userTitle")}
                </NavLink>
                <ThemeToggle
                  isMobile={isMobile}
                  darkTitle={t("header.darkTitle")}
                  lightTitle={t("header.lightTitle")}
                />
                <LogoutButton
                  isMobile={isMobile}
                  title={t("header.logOutButton")}
                />
              </nav>
            </div>
          )}
        </>
      ) : (
        <nav className="flex items-center h-8 gap-7">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "hover:text-primary"
            }
          >
            {t("header.mainTitle")}
          </NavLink>
          <NavLink
            to={`/form/${formId}/edit`}
            className={({ isActive }) =>
              isActive ? "text-primary" : "hover:text-primary"
            }
          >
            {t("header.newFormTitle")}
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-primary" : "hover:text-primary"
            }
          >
            {t("header.userTitle")}
          </NavLink>
          <div className="flex items-center gap-5">
            <ThemeToggle
              darkTitle={t("header.darkTitle")}
              lightTitle={t("header.lightTitle")}
            />
            <LogoutButton title={t("header.logOutButton")} />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
