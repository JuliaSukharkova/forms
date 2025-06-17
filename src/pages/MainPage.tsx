import { getUserForms } from "@/api/formApi";
import { FormList } from "@/components/Main/FormList";
import { SearchInput } from "@/components/Main/SearchInput";
import { SortedMenu } from "@/components/SortMenu";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/hooks/useAuthUser";
import { type FormFromDB } from "@/types/type";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const MainPage = () => {
  const { t } = useTranslation();
  const formId = uuidv4();
  const user = useAuthUser();
  const [formElements, setFormElements] = useState<FormFromDB[]>([]);
  const [searchForm, setSearchForm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortType>("new");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sortLabel = {
    new: t("mainPage.sort.new"),
    old: t("mainPage.sort.old"),
    az: t("mainPage.sort.az"),
    za: t("mainPage.sort.za"),
  } as const;
  type SortType = keyof typeof sortLabel;

  const sortedForms = [...formElements].sort((a, b) => {
    switch (sortOrder) {
      case "new":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "old":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "az":
        return a.name.localeCompare(b.name);
      case "za":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const filterForm = sortedForms.filter((item) =>
    item.name.toLowerCase().includes(searchForm.toLowerCase())
  );

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);
  };

  useEffect(() => {
    const fetchForms = async () => {
      try {
        if (!user) return;
        setIsLoading(true);
        const data = await getUserForms(user.uid);
        setFormElements(data);
      } catch (error) {
        console.error("Error getting form:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchForms();
  }, [user]);

  return (
    <div className="m-5">
      <Title text={t("mainPage.title")} className="my-5 text-primary-text" />
      <div className="relative w-full rounded-xl border border-primary-light backdrop-blur-[4px] bg-muted/40 p-5 transition-shadow shadow-[var(--shadow)]">
        <div className="flex justify-between gap-1.5 max-sm:flex-col max-sm:gap-2.5 w-full">
          <SearchInput
            searchForm={searchForm}
            setSearchForm={setSearchForm}
            isEmpty={formElements.length > 0}
            onSearch={handleSearch}
          />
          <SortedMenu<SortType>
            value={sortOrder}
            onChange={setSortOrder}
            sortLabel={sortLabel}
            isDisabled={filterForm.length === 0}
            className="max-sm:w-full"
          />
        </div>
        {isSearching ? (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin my-5" />
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin my-5" />
          </div>
        ) : filterForm.length > 0 ? (
          <div className="flex flex-wrap justify-start max-sm:justify-center w-full gap-4 mt-5">
            {filterForm.map((el, index) => (
              <FormList
                key={index}
                formName={el.name}
                formDesc={el.description}
                formId={el.id}
                setFormElements={setFormElements}
              />
            ))}
          </div>
        ) : (
          <div className="w-full text-center text-muted-foreground mb-1.5">
            {t("mainPage.noForms")}
          </div>
        )}
        {filterForm.length === 0 && (
          <div className="flex justify-center items-center">
            <Button asChild>
              <Link to={`/form/${formId}/edit`}>
                {t("mainPage.createForm")}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
