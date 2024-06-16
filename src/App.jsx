import React from "react";
import BookSearch from "./component/BookSearch";
import { Link } from "react-router-dom";

import message from "./assets/icons/Message.svg";

const App = () => {
  return (
    <div className="App">
      <header className="bg-[#6B08F0] text-white px-5 py-5 flex flex-col justify-center items-center h-[246px] gap-4 leading-6">
        <h1 className="text-[10vw] sm:text-7xl tracking-tighter">
          Book Search App
        </h1>
        <p className="text-[3vw] sm:text-2xl sm:font-normal font-semibold">
          including the young adult dystopian novel Departures and the
        </p>
        <div className="py-5 flex">
          <Link
            to="/bookshelf"
            className="bg-zinc-100 h-[38px] sm:h-[58px] pr-5 py-5 text-black rounded-[44px] font-semibold flex items-center overflow-hidden"
          >
            <div className="sm:h-[58px] sm:w-[80px]  bg-[#40C9FF] hidden lg:block">
              <img src={message} alt="" className="pl-4 pt-1"/>
            </div>
            <h1 className="pl-5">Go to My Bookshelf</h1>
          </Link>
        </div>
      </header>
      <main>
        <BookSearch />
      </main>
    </div>
  );
};

export default App;
