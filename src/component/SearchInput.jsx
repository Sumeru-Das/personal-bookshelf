import React from "react";
import search from "../assets/icons/search.svg";
import microphone from "../assets/icons/microphone.svg";
import tally from "../assets/icons/tally.svg";

const SearchInput = ({ query, setQuery }) => {
  return (
    <div className="relative sm:ml-[8.5rem] pt-[2rem]">
      <input
        type="text"
        className="w-full p-2 pl-5 pr-5 border border-gray-300 rounded-[10px] bg-zinc-100 placeholder:text-black placeholder:font-semibold mb-4 focus:outline-none focus:border-black focus:ring-2 focus:ring-black"
        placeholder="What are You Reading Today?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute top-[3.4rem] right-20 transform -translate-y-1/2 hidden lg:block">
        <img src={search} alt="" />
      </div>
      <div className="absolute top-[3.4rem] right-9 transform -translate-y-1/2 hidden lg:block">
        <img src={tally} alt="" />
      </div>
      <div className="absolute top-[3.4rem] right-3 transform -translate-y-1/2">
        <img src={microphone} alt="" />
      </div>
    </div>
  );
};

export default SearchInput;
