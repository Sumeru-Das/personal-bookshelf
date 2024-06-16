import React from "react";

const BookCard = ({ book, bookshelfKeys, addToBookshelf }) => {
  const authorNames = book.author_name
    ? book.author_name.slice(0, 2).join(", ") +
      (book.author_name.length > 2 ? "..." : "")
    : "Unknown";

  return (
    <div className="h-[250px] w-[390px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-zinc-100 shadow flex justify-center items-center rounded-[8px]">
      <div className="h-[230px] w-[370px] hover:size-full hover:bg-zinc-100 hover:text-zinc-950 bg-[#10100f] rounded-[8px] ">
        <div className="p-5">
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p className="text-sm">Author: {authorNames}</p>
          <p className="text-sm">
            First Published: {book.first_publish_year || "N/A"}
          </p>
          <button
            onClick={() => addToBookshelf(book)}
            className={`mt-2 p-2 rounded ${
              bookshelfKeys.includes(book.key)
                ? "bg-green-500"
                : "bg-blue-500 text-white"
            }`}
            disabled={bookshelfKeys.includes(book.key)}
          >
            {bookshelfKeys.includes(book.key)
              ? "Added to Bookshelf"
              : "Add to Bookshelf"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
