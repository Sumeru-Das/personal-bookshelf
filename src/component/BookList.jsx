import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books, bookshelfKeys, addToBookshelf }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-[3rem] px-[9rem]">
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
