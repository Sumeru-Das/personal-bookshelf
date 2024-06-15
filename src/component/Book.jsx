// src/components/Book.jsx
import React from "react";

const Book = ({ book, isAdded, onAdd }) => {
  return (
    <div className="p-4 border border-gray-200 rounded shadow">
      <h3 className="font-bold text-lg">{book.title}</h3>
      <p className="text-sm">
        Author: {book.author_name?.join(", ") || "Unknown"}
      </p>
      <p className="text-sm">
        First Published: {book.first_publish_year || "N/A"}
      </p>
      <button
        onClick={() => onAdd(book)}
        className={`mt-2 p-2 rounded ${
          isAdded ? "bg-green-500" : "bg-blue-500 text-white"
        }`}
        disabled={isAdded}
      >
        {isAdded ? "Added to Bookshelf" : "Add to Bookshelf"}
      </button>
    </div>
  );
};

export default Book;
