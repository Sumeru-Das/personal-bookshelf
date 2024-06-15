import React from "react";
import BookSearch from "./component/BookSearch";

const App = () => {
  return (
    <div className="App">
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1 className="text-2xl">Book Search App</h1>
      </header>
      <main className="p-4">
        <BookSearch />
      </main>
    </div>
  );
};

export default App;
