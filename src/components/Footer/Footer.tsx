import { Link } from "react-router-dom";
import { LanguageButton } from "./LangugeButton";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer
      style={{ boxShadow: "0 -4px 16px var(--shadow-color)" }}
      className="bottom-0 left-0 w-full z-30 backdrop-blur-[4px] flex flex-wrap justify-center items-center h-14 bg-muted transition-shadow"
    >
      ©2025
      <Link
        to="https://github.com/JuliaSukharkova"
        className="cursor-pointer pl-1.5"
      >
        {t("footer.title")}
      </Link>
      {t("footer.description")}
      <div className="ml-2.5">
        <LanguageButton />
      </div>
    </footer>
  );
};

export default Footer;
