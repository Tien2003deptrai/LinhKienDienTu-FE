import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

type Props = {
  filter: string;
  onFilterChange: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

const Search = ({ filter, onFilterChange, className }: Props) => {
  return (
    <div className={className}>
      <div className="relative mx-auto w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BiSearchAlt2 className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="block w-full rounded-full border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
          placeholder="Tìm kiếm sản phẩm..."
        />
      </div>
    </div>
  );
};

export default Search;
