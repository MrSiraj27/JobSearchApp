import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { searchFilter } from "../../Redux/Slices/Jobs";

const SearchBar = () => {
  const [input, setInputs] = useState("");
  const dispatch = useDispatch();

  const HandelSearch = (e) => {
    setInputs(e.target.value);
    dispatch(searchFilter({ value: input }));
  };

  return (
    <>
      <div className="relative">
        <input
          className="cursor-pointer border-2 rounded-3xl px-4 sm:w-96 w-full py-1"
          type="search"
          placeholder="Search Here..."
          onChange={HandelSearch}
        />
        <CiSearch
          className={`absolute top-1 right-2 text-2xl hidden sm:block`}
        />
      </div>
    </>
  );
};

export default SearchBar;
