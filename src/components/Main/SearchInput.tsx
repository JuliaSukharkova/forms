import { SearchIcon } from "lucide-react";

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
  return (
    <div aria-disabled={isEmpty} className="flex w-full sm:w-72">
      <input
        type="text"
        value={searchForm}
        placeholder="Search"
        onChange={(e) => setSearchForm(e.target.value)}
        className="rounded-l-md border w-full  border-border-light px-3 hover:border-primary bg-muted backdrop-blur-lg cursor-pointer focus:outline-none focus:ring-0"
      />
      <button
        onClick={onSearch}
        className="bg-muted border border-border-light hover:border-primary rounded-r-md px-2 cursor-pointer backdrop-blur-lg"
      >
        <SearchIcon className="w-4 h-4 hover:stroke-primary stroke-ring" />
      </button>
    </div>
  );
};
