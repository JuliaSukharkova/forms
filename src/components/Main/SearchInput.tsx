import { SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SearchInput = ({
  isEmpty,
  searchForm,
  setSearchForm,
  onSearch,
}: {
  isEmpty: boolean;
  searchForm: string;
  setSearchForm: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div aria-disabled={isEmpty} className="flex w-[400px] max-sm:w-full">
      <input
        type="text"
        value={searchForm}
        placeholder={t("mainPage.search")}
        onChange={(e) => setSearchForm(e.target.value)}
        className="rounded-l-md border w-full  border-border-light px-3 py-1.5 hover:border-primary bg-muted cursor-pointer focus:outline-none focus:ring-0"
      />
      <button
        onClick={onSearch}
        className="bg-muted border border-border-light hover:border-primary rounded-r-md px-2 max-sm:px-1 cursor-pointer backdrop-blur-lg"
      >
        <SearchIcon className="w-4 h-4 hover:stroke-primary stroke-ring" />
      </button>
    </div>
  );
};
