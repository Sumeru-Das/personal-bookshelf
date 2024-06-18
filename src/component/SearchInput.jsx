import React from "react";
import search from "../assets/icons/search.svg";
import microphone from "../assets/icons/microphone.svg";
import tally from "../assets/icons/tally.svg";

const SearchInput = ({ query, setQuery }) => {
  return (
    <div className="relative sm:pt-16 py-10">
      <input
        type="text"
        className="w-full py-4 px-5 border border-gray-300 rounded-[10px] bg-zinc-100 placeholder:text-black placeholder:font-semibold mb-4 focus:outline-none focus:border-black focus:ring-2 focus:ring-black"
        placeholder="What are You Reading Today?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute top-[5.9rem] right-[9rem] transform -translate-y-1/2 hidden lg:block">
        <img src={search} alt="Search" />
      </div>
      <div className="absolute top-[5.9rem] right-[6rem] transform -translate-y-1/2 hidden lg:block">
        <img src={tally} alt="Tally" />
      </div>
      <div className="absolute top-[5.9rem] right-[4rem] transform -translate-y-1/2 hidden lg:block">
        <img src={microphone} alt="Microphone" />
      </div>
    </div>
  );
};

export default SearchInput;
