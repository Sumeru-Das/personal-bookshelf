import React from "react";
import BookSearch from "./component/BookSearch";

const App = () => {
  return (
    <div className="App">
      <header className="bg-[#6B08F0] text-white p-4 flex flex-col justify-center items-center h-[166px] gap-4 leading-6">
        <h1 className="text-[10vw] sm:text-7xl tracking-tighter">Book Search App</h1>
        <p className="text-[3vw] sm:text-2xl sm:font-normal font-semibold">including the young adult dystopian novel Departures and the</p>
      </header>
      <main className="p-4">
        <BookSearch />
      </main>
    </div>
  );
};

export default App;
