import React from "react";
import "../Styles/BookList.css";

import BookCard from "./BookCard";

const BookList = ({ books, bookshelfKeys, addToBookshelf }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          bookshelfKeys={bookshelfKeys}
          addToBookshelf={addToBookshelf}
        />
      ))}
    </div>
  );
};

export default BookList;

// grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-9 pt-3 px-4.5 sm:px-0
