import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books, bookshelfKeys, addToBookshelf }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-x-[9rem] gap-y-[5rem] pt-[3rem] px-[5rem] sm:px-[.2rem]">
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
