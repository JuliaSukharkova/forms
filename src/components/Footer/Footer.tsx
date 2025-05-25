import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ boxShadow: '0 -4px 16px var(--shadow-color)' }}
    className="bottom-0 left-0 w-full z-50 backdrop-blur-[4px] flex justify-center items-center h-14 bg-muted transition-shadow"
  >
      ©2025
      <Link
        to="https://github.com/JuliaSukharkova"
        className="cursor-pointer pl-1.5"
      >
        Julia Sukharkova
      </Link>
      . All rights reserved.
    </footer>
  );
};

export default Footer;
