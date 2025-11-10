import { useState, useEffect } from "react";

// A simple search hook that filters an array of items based on a search term
export const useSearch = <T,>(items: T[], searchFields: (keyof T)[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(items);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = items.filter(item =>
      searchFields.some(field =>
        String(item[field]).toLowerCase().includes(term)
      )
    );

    setFilteredItems(filtered);
  }, [searchTerm, items, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems
  };
};
