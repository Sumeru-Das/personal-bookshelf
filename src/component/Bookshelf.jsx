import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(savedBooks);
  }, []);

  const removeFromBookshelf = (bookToRemove) => {
    const updatedBookshelf = bookshelf.filter(
      (book) => book.key !== bookToRemove.key
    );
    setBookshelf(updatedBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookshelf</h1>
      {bookshelf.length === 0 ? (
        <p className="text-center text-gray-500">
          No book present in the shelf
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookshelf.map((book, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded shadow"
            >
              <h3 className="font-bold text-lg">{book.title}</h3>
              <p className="text-sm">
                Author: {book.author_name?.join(", ") || "Unknown"}
              </p>
              <p className="text-sm">
                First Published: {book.first_publish_year || "N/A"}
              </p>
              <button
                onClick={() => removeFromBookshelf(book)}
                className="mt-2 bg-red-500 text-white p-2 rounded"
              >
                Remove from Bookshelf
              </button>
            </div>
          ))}
        </div>
      )}
      <Link to="/" className="text-blue-500 underline mt-4 block text-center">
        Go to My BookSearch
      </Link>
    </div>
  );
};

export default Bookshelf;
