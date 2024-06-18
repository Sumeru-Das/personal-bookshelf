import React from "react";
import BookSearch from "./component/BookSearch";

import Header from "./component/Header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <BookSearch />
      </main>
    </div>
  );
};

export default App;
