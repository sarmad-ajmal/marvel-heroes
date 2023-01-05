import React, { useCallback, useState } from "react";
import { debounce, noop } from "../../utils";

import { ISearchInputProps } from "./interface";

const useSearchInput = (props: ISearchInputProps) => {
  const { onSearch, onClearSearch = noop } = props;
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      onSearch(searchValue);
      // on search emp api here
    }, 300),
    []
  );

  const onSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value || "";
    setQuery(value);
    //@ts-ignore
    debouncedSearch(value);
    if (!!value) {
      setShowSearch(false);
      return;
    }
    setShowSearch(true);
  };
  const onCloseClickHandler = () => {
    onClearSearch();
    setShowSearch(true);
    setQuery('');
  };
  return {
    showSearch,
    query,
    onCloseClickHandler,
    onSearchChange,
  };
};

export default useSearchInput;
