import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";
import {v4 as uuidv4} from 'uuid'

const Header = () => {
  const formId = uuidv4()
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-[4px] bg-muted flex justify-between items-center px-6 py-4 transition-shadow shadow-[var(--shadow)] h-20 text-base font-light">
      <NavLink to="/" className="cursor-pointer">
        <Logo />
      </NavLink>
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
    </header>
  );
};

export default Header;
