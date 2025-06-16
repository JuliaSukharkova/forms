import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";

export const LanguageButton = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const sortLabel = {
    en: "English",
    ru: "Русский",
    pl: "Polski",
  } as const;

  type SortType = keyof typeof sortLabel;

  const handleChange = (lang: SortType) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 cursor-pointer [&_svg]:shrink-0 hover:bg-primary-text/10 rounded-md p-2 text-primary-text">
          <Globe className="w-5 h-5" />
          <ChevronDown className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={4}
        className="w-fit p-1 bg-muted text-foreground border border-border shadow-md rounded-md"
      >
        <PopoverArrow className="fill-popover" />
        <div className="flex flex-col text-left gap-1">
          {Object.entries(sortLabel).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleChange(key as SortType)}
              className={`cursor-pointer px-4 py-2 rounded-md text-primary-text text-left hover:bg-primary/10 ${
                i18n.language === key ? "font-medium bg-primary/10" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
